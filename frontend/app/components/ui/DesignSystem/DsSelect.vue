<script setup lang="ts">
import { onClickOutside, useEventListener } from '@vueuse/core'
import { computed, nextTick, ref, toRefs, useAttrs, watch } from 'vue'
import DsIcon from './DsIcon.vue'
import DsTypography from './DsTypography.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  modelValue?: string
  options?: SelectOption[]
  label?: string
  hint?: string
  error?: string
  required?: boolean
  placeholder?: string
  fillText?: string
  disabled?: boolean
  invalid?: boolean
  previewState?: 'default' | 'hover' | 'focus-visible'
}>(), {
  modelValue: '',
  options: () => [],
  label: '',
  hint: '',
  error: '',
  required: false,
  placeholder: '',
  fillText: '',
  disabled: false,
  invalid: false,
  previewState: 'default',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}>()

interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

const HEADER_HEIGHT = 56

const {
  modelValue,
  options,
  label,
  hint,
  error,
  required,
  placeholder,
  fillText,
  disabled,
  invalid,
  previewState,
} = toRefs(props)

const attrs = useAttrs()
const rootEl = ref<HTMLElement | null>(null)
const triggerEl = ref<HTMLElement | null>(null)
const bodyEl = ref<HTMLElement | null>(null)

const isOpen = ref(false)
const isFocused = ref(false)
const highlightedIndex = ref(-1)
const panelHeight = ref(HEADER_HEIGHT)
const errorShakeKey = ref(0)

const selectId = computed(() => {
  const rawId = attrs.id
  return typeof rawId === 'string' ? rawId : ''
})

const hasError = computed(() => Boolean(error.value) || invalid.value)
const optionList = computed(() => options.value || [])
const selectedIndex = computed(() => optionList.value.findIndex(option => option.value === modelValue.value))
const selectedOption = computed(() => {
  const index = selectedIndex.value
  return index >= 0 ? optionList.value[index] : null
})
const hasValue = computed(() => Boolean(selectedOption.value))
const floatingActive = computed(() => isOpen.value || hasValue.value)

const floatingLabelText = computed(() => {
  if (!label.value)
    return ''

  return required.value ? `${label.value} *` : label.value
})

const resolvedFillText = computed(() => fillText.value || placeholder.value || '')
const valueText = computed(() => {
  if (selectedOption.value)
    return selectedOption.value.label

  if (isOpen.value || !label.value)
    return resolvedFillText.value

  return ''
})

const hintId = computed(() => (selectId.value && hint.value && !hasError.value ? `${selectId.value}-hint` : ''))
const errorId = computed(() => (selectId.value && hasError.value && error.value ? `${selectId.value}-error` : ''))
const describedBy = computed(() => {
  if (errorId.value)
    return errorId.value

  if (hintId.value)
    return hintId.value

  return undefined
})

const listboxId = computed(() => (selectId.value ? `${selectId.value}-listbox` : 'ds-select-listbox'))
const activeDescendant = computed(() => {
  const index = highlightedIndex.value
  if (index < 0)
    return undefined

  return `${listboxId.value}-option-${index}`
})

const rootClass = computed(() => [
  'ds-select',
  isOpen.value && 'is-open',
  isFocused.value && 'is-focused',
  hasError.value && 'is-invalid',
  disabled.value && 'is-disabled',
  previewState.value === 'hover' && 'is-preview-hover',
  previewState.value === 'focus-visible' && 'is-preview-focus',
])

const panelClass = computed(() => [
  'ds-select-panel',
  isOpen.value ? 'is-expanded' : 'is-collapsed',
])

const errorAnimationKey = computed(() => `ds-select-error-${errorShakeKey.value}`)

function findFirstEnabledIndex(): number {
  return optionList.value.findIndex(option => !option.disabled)
}

function findNextEnabledIndex(from: number, direction: 1 | -1): number {
  const total = optionList.value.length
  if (!total)
    return -1

  for (let step = 1; step <= total; step += 1) {
    const next = (from + step * direction + total) % total
    if (!optionList.value[next]?.disabled)
      return next
  }

  return -1
}

function getInitialIndexForOpen(): number {
  if (selectedIndex.value >= 0 && !optionList.value[selectedIndex.value]?.disabled)
    return selectedIndex.value

  return findFirstEnabledIndex()
}

function measureOpenHeight(): void {
  const body = bodyEl.value
  if (!body) {
    panelHeight.value = HEADER_HEIGHT
    return
  }

  panelHeight.value = HEADER_HEIGHT + body.scrollHeight
}

async function openSelect(): Promise<void> {
  if (disabled.value || isOpen.value)
    return

  isOpen.value = true
  highlightedIndex.value = getInitialIndexForOpen()
  await nextTick()
  measureOpenHeight()
}

function closeSelect(restoreFocus = false): void {
  if (!isOpen.value)
    return

  isOpen.value = false
  highlightedIndex.value = -1
  panelHeight.value = HEADER_HEIGHT

  if (restoreFocus)
    nextTick(() => triggerEl.value?.focus())
}

function selectAt(index: number): void {
  const option = optionList.value[index]
  if (!option || option.disabled)
    return

  emit('update:modelValue', option.value)
  closeSelect(true)
}

function onTriggerClick(): void {
  if (disabled.value)
    return

  if (isOpen.value)
    closeSelect(true)
  else
    void openSelect()
}

function onTriggerFocus(event: FocusEvent): void {
  isFocused.value = true
  emit('focus', event)
}

function onTriggerBlur(event: FocusEvent): void {
  isFocused.value = false
  emit('blur', event)
}

function onTriggerKeydown(event: KeyboardEvent): void {
  if (disabled.value)
    return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        void openSelect()
      }
      else if (highlightedIndex.value >= 0) {
        highlightedIndex.value = findNextEnabledIndex(highlightedIndex.value, 1)
      }
      break

    case 'ArrowUp':
      event.preventDefault()
      if (!isOpen.value) {
        void openSelect()
      }
      else if (highlightedIndex.value >= 0) {
        highlightedIndex.value = findNextEnabledIndex(highlightedIndex.value, -1)
      }
      break

    case 'Home':
      if (!isOpen.value)
        return
      event.preventDefault()
      highlightedIndex.value = findFirstEnabledIndex()
      break

    case 'End':
      if (!isOpen.value)
        return
      event.preventDefault()
      for (let index = optionList.value.length - 1; index >= 0; index -= 1) {
        if (!optionList.value[index]?.disabled) {
          highlightedIndex.value = index
          break
        }
      }
      break

    case 'Enter':
    case ' ': {
      event.preventDefault()
      if (!isOpen.value) {
        void openSelect()
        return
      }

      if (highlightedIndex.value >= 0)
        selectAt(highlightedIndex.value)
      break
    }

    case 'Escape':
      if (!isOpen.value)
        return
      event.preventDefault()
      closeSelect(true)
      break

    case 'Tab':
      closeSelect(false)
      break
  }
}

function onOptionMouseEnter(index: number): void {
  highlightedIndex.value = index
}

watch([hasError, error], ([nextHasError, nextError], [prevHasError, prevError]) => {
  if (!nextHasError)
    return

  if (!prevHasError || nextError !== prevError)
    errorShakeKey.value += 1
})

watch([optionList, modelValue], () => {
  if (!isOpen.value)
    return

  nextTick(() => measureOpenHeight())
}, { deep: true })

onClickOutside(rootEl, () => closeSelect(false))

useEventListener(window, 'resize', () => {
  if (!isOpen.value)
    return

  measureOpenHeight()
})
</script>

<template>
  <div class="grid gap-2">
    <div
      ref="rootEl"
      :class="rootClass"
    >
      <div class="ds-select-slot" aria-hidden="true" />

      <div
        :class="panelClass"
        :style="{ maxHeight: `${panelHeight}px` }"
      >
        <button
          ref="triggerEl"
          v-bind="attrs"
          type="button"
          class="ds-select-header"
          :disabled="disabled"
          :aria-expanded="isOpen ? 'true' : 'false'"
          aria-haspopup="listbox"
          :aria-controls="listboxId"
          :aria-activedescendant="activeDescendant"
          :aria-invalid="hasError ? 'true' : 'false'"
          :aria-describedby="describedBy"
          @click="onTriggerClick"
          @keydown="onTriggerKeydown"
          @focus="onTriggerFocus"
          @blur="onTriggerBlur"
        >
          <span class="ds-select-content" :class="{ 'has-label': Boolean(label) }">
            <DsTypography
              v-if="floatingLabelText"
              as="span"
              role="meta"
              size="2xs"
              weight="regular"
              uppercase
              class="ds-select-label"
              :class="{ 'is-floating': floatingActive }"
            >
              {{ floatingLabelText }}
            </DsTypography>

            <DsTypography
              as="span"
              role="body"
              size="sm"
              class="ds-select-value"
              :class="{ 'is-placeholder': !hasValue }"
            >
              {{ valueText || '\u00A0' }}
            </DsTypography>
          </span>

          <DsIcon
            name="iconoir:nav-arrow-down"
            size="sm"
            variant="inherit"
            class="ds-select-chevron"
            :class="{ 'is-open': isOpen }"
          />
        </button>

        <div ref="bodyEl" class="ds-select-body" :class="{ 'is-open': isOpen }">
          <div class="ds-select-divider" />

          <ul
            :id="listboxId"
            class="ds-select-list"
            role="listbox"
            :aria-activedescendant="activeDescendant"
          >
            <li
              v-for="(option, index) in optionList"
              :id="`${listboxId}-option-${index}`"
              :key="option.value"
              role="option"
              :aria-selected="modelValue === option.value ? 'true' : 'false'"
            >
              <button
                type="button"
                class="ds-select-option"
                :class="[
                  modelValue === option.value && 'is-selected',
                  highlightedIndex === index && 'is-highlighted',
                ]"
                :style="{ '--stagger-index': String(index) }"
                :disabled="option.disabled"
                @mouseenter="onOptionMouseEnter(index)"
                @click="selectAt(index)"
              >
                <DsTypography as="span" role="body" size="sm">
                  {{ option.label }}
                </DsTypography>

                <DsIcon
                  name="iconoir:check"
                  size="xs"
                  variant="inherit"
                  class="ds-select-check"
                  :class="{ 'is-visible': modelValue === option.value }"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      v-if="hasError && Boolean(error)"
      :id="errorId || undefined"
      :key="errorAnimationKey"
      class="ds-select-error-row"
    >
      <DsIcon
        name="iconoir:warning-triangle"
        size="sm"
        variant="inherit"
      />
      <DsTypography
        as="p"
        role="meta"
        size="2xs"
      >
        {{ error }}
      </DsTypography>
    </div>

    <DsTypography
      v-else-if="Boolean(hint)"
      :id="hintId || undefined"
      as="p"
      role="meta"
      size="2xs"
      class="ds-select-hint"
    >
      {{ hint }}
    </DsTypography>
  </div>
</template>

<style scoped>
.ds-select {
  --ds-select-trigger-h: 56px;
  --ds-select-radius: 1.125rem;
  --ds-select-ring-w: 1px;
  --ds-select-ring: var(--border-input-idle, color-mix(in oklch, var(--foreground) 28%, transparent));
  --ds-select-ring-hover: var(--border-accent-hover, color-mix(in oklch, var(--foreground) 42%, transparent));
  --ds-select-ring-focus: var(--border-accent, color-mix(in oklch, var(--foreground) 56%, transparent));
  --ds-select-surface: var(--bg-inverse, var(--pure-white));
  --ds-select-text: hsl(var(--foreground));
  --ds-select-muted: var(--color-input-placeholder, hsl(var(--muted-foreground)));
  --ds-select-label: var(--color-input-floating-label, hsl(var(--muted-foreground)));
  --ds-select-shadow: var(--color-select-shadow, color-mix(in oklch, var(--foreground) 18%, transparent));

  position: relative;
  width: 100%;
  isolation: isolate;
  z-index: 0;
}

.ds-select.is-open {
  z-index: 80;
}

.ds-select-slot {
  height: var(--ds-select-trigger-h);
}

.ds-select-panel {
  position: absolute;
  inset: 0 auto auto 0;
  z-index: 1;
  width: 100%;
  border-radius: var(--ds-select-radius);
  overflow: hidden;
  background: var(--ds-select-surface);
  box-shadow: 0 0 0 var(--ds-select-ring-w) var(--ds-select-ring);
  transition:
    max-height 340ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 180ms ease;
}

.ds-select:not(.is-disabled):not(.is-invalid):not(.is-open) .ds-select-panel:hover,
.ds-select.is-preview-hover:not(.is-disabled):not(.is-invalid):not(.is-open) .ds-select-panel {
  box-shadow: 0 0 0 var(--focus-ring-inner-width, 2px) var(--ds-select-ring-hover);
}

.ds-select.is-focused:not(.is-disabled):not(.is-invalid) .ds-select-panel,
.ds-select.is-open:not(.is-disabled):not(.is-invalid) .ds-select-panel,
.ds-select.is-preview-focus:not(.is-disabled):not(.is-invalid) .ds-select-panel {
  box-shadow: 0 0 0 var(--focus-ring-inner-width, 2px) var(--ds-select-ring-focus);
}

.ds-select.is-invalid .ds-select-panel {
  box-shadow: 0 0 0 var(--ds-select-ring-w) var(--border-error, #ff4d94);
}

.ds-select.is-disabled .ds-select-panel {
  opacity: 0.65;
  box-shadow: 0 0 0 var(--ds-select-ring-w)
    var(--border-disabled, color-mix(in oklch, var(--foreground) 20%, transparent));
}

.ds-select-header {
  width: 100%;
  height: var(--ds-select-trigger-h);
  border: 0;
  background: var(--ds-select-surface);
  color: var(--ds-select-text);
  padding: 0 1.5rem;
  margin: 0;
  text-align: left;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.ds-select.is-disabled .ds-select-header {
  cursor: not-allowed;
}

.ds-select-content {
  min-width: 0;
  position: relative;
  display: grid;
}

.ds-select-content.has-label {
  padding-top: 1.125rem;
  padding-bottom: 0.4375rem;
}

.ds-select-label {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  transform-origin: left center;
  color: var(--ds-select-muted);
  transition:
    top 250ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 250ms cubic-bezier(0.22, 1, 0.36, 1),
    color 180ms ease;
  pointer-events: none;
}

.ds-select-label.is-floating {
  top: 0.625rem;
  transform: translateY(0);
  color: var(--ds-select-label);
}

.ds-select-value {
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--ds-select-text);
  line-height: 1.2;
}

.ds-select-value.is-placeholder {
  color: var(--ds-select-muted);
}

.ds-select-chevron {
  color: var(--ds-select-text);
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

.ds-select-chevron.is-open {
  transform: rotate(180deg);
}

.ds-select-body {
  background: var(--ds-select-surface);
  opacity: 0;
  transform: translateY(-6px);
  pointer-events: none;
  transition:
    opacity 170ms ease,
    transform 260ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 180ms ease;
}

.ds-select-body.is-open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.ds-select-divider {
  height: 1px;
  margin-inline: 1rem;
  background: color-mix(in oklch, var(--foreground) 16%, transparent);
}

.ds-select-list {
  list-style: none;
  margin: 0;
  padding: 0.5rem;
  display: grid;
  gap: 0.25rem;
  background: var(--ds-select-surface);
}

.ds-select-option {
  width: 100%;
  border: 0;
  background: transparent;
  color: var(--ds-select-text);
  min-height: 2.75rem;
  border-radius: 0.625rem;
  text-align: left;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.875rem;
  cursor: pointer;
  opacity: 0;
  transform: translateY(6px);
}

.ds-select-body.is-open .ds-select-option {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 210ms ease,
    transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 120ms ease;
  transition-delay: calc(var(--stagger-index) * 28ms + 45ms);
}

.ds-select-option:hover,
.ds-select-option.is-highlighted {
  background: color-mix(in oklch, var(--foreground) 7%, transparent);
}

.ds-select-option.is-selected {
  background: color-mix(in oklch, var(--foreground) 10%, transparent);
}

.ds-select-option:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.ds-select-check {
  opacity: 0;
  transition: opacity 120ms ease;
}

.ds-select-check.is-visible {
  opacity: 1;
}

.ds-select-error-row {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  color: var(--color-error-text, #ff6fa9);
  animation: dsSelectShakeIn 320ms ease-out;
}

.ds-select-hint {
  opacity: 0.7;
}

@keyframes dsSelectShakeIn {
  0% {
    opacity: 0;
    transform: translateX(-6px);
  }
  20% {
    opacity: 1;
    transform: translateX(4px);
  }
  40% {
    transform: translateX(-3px);
  }
  60% {
    transform: translateX(2px);
  }
  80% {
    transform: translateX(-1px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
