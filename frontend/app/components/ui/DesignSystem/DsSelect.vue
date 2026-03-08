<script setup lang="ts">
import { onClickOutside, useEventListener } from '@vueuse/core'
import { computed, nextTick, onBeforeUnmount, ref, toRefs, useAttrs, watch } from 'vue'
import DsIcon from './DsIcon.vue'
import DsTypography from './DsTypography.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  modelValue?: string
  options?: SelectOption[]
  shape?: 'pill' | 'rounded'
  label?: string
  hint?: string
  error?: string
  required?: boolean
  placeholder?: string
  fillText?: string
  emptyText?: string
  disabled?: boolean
  invalid?: boolean
  previewState?: 'default' | 'hover' | 'focus-visible'
}>(), {
  modelValue: '',
  options: () => [],
  shape: 'rounded',
  label: '',
  hint: '',
  error: '',
  required: false,
  placeholder: '',
  fillText: 'Please choose an option',
  emptyText: 'No entries available',
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

const HEADER_HEIGHT = 50

const {
  modelValue,
  options,
  shape,
  label,
  hint,
  error,
  required,
  placeholder,
  fillText,
  emptyText,
  disabled,
  invalid,
  previewState,
} = toRefs(props)

const attrs = useAttrs()
const rootEl = ref<HTMLElement | null>(null)
const triggerEl = ref<HTMLElement | null>(null)
const bodyEl = ref<HTMLElement | null>(null)

const isOpen = ref(false)
const isClosing = ref(false)
const isFocused = ref(false)
const highlightedIndex = ref(-1)
const highlightMode = ref<'idle' | 'pointer' | 'keyboard'>('idle')
const panelHeight = ref(HEADER_HEIGHT)
const errorShakeKey = ref(0)
const closeZIndexTimer = ref<ReturnType<typeof setTimeout> | null>(null)

const selectId = computed(() => {
  const rawId = attrs.id
  return typeof rawId === 'string' ? rawId : ''
})

const hasError = computed(() => Boolean(error.value) || invalid.value)
const optionList = computed(() => {
  const list = options.value || []
  return [...list].sort((left, right) =>
    left.label.localeCompare(right.label, undefined, { sensitivity: 'base' }),
  )
})
const selectedIndex = computed(() => optionList.value.findIndex(option => option.value === modelValue.value))
const selectedOption = computed(() => {
  const index = selectedIndex.value
  return index >= 0 ? optionList.value[index] : null
})
const hasValue = computed(() => Boolean(selectedOption.value))
const hasOptions = computed(() => optionList.value.length > 0)
const floatingActive = computed(() => isOpen.value || hasValue.value)

const floatingLabelBaseText = computed(() => label.value || placeholder.value || '')
const floatingLabelText = computed(() => {
  if (!floatingLabelBaseText.value)
    return ''

  return required.value ? `${floatingLabelBaseText.value} *` : floatingLabelBaseText.value
})
const floatingLabelRole = computed<'body' | 'meta'>(() => (floatingActive.value ? 'meta' : 'body'))
const floatingLabelSize = computed<'sm' | '2xs'>(() => (floatingActive.value ? '2xs' : 'sm'))
const floatingLabelWeight = computed<'light' | 'regular'>(() => (floatingActive.value ? 'regular' : 'light'))
const resolvedFillText = computed(() => fillText.value || 'Please choose an option')
const resolvedEmptyText = computed(() => emptyText.value || 'No entries available')

const valueText = computed(() => {
  if (selectedOption.value)
    return selectedOption.value.label

  if (isOpen.value)
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
  shape.value === 'rounded' ? 'shape-rounded' : 'shape-pill',
  isOpen.value && 'is-open',
  isClosing.value && 'is-closing',
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

const rootLayerClass = computed(() => (isOpen.value || isClosing.value) ? 'ui-select-current-root-layer' : '')

const panelVisualClass = computed(() => {
  if (disabled.value)
    return 'ui-select-current-panel-disabled'

  if (hasError.value)
    return 'ui-select-current-panel-invalid'

  if (isOpen.value || isFocused.value || previewState.value === 'focus-visible')
    return 'ui-select-current-panel-focus'

  if (previewState.value === 'hover')
    return 'ui-select-current-panel-hover'

  return 'ui-select-current-panel-idle'
})

const panelHoverableClass = computed(() => (
  !disabled.value
  && !hasError.value
  && !isOpen.value
  && previewState.value === 'default'
    ? 'ui-select-current-panel-hoverable'
    : ''
))

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

function clearCloseZIndexTimer(): void {
  if (!closeZIndexTimer.value)
    return

  clearTimeout(closeZIndexTimer.value)
  closeZIndexTimer.value = null
}

async function openSelect(): Promise<void> {
  if (disabled.value || isOpen.value)
    return

  clearCloseZIndexTimer()
  isClosing.value = false
  isOpen.value = true
  highlightMode.value = 'idle'
  highlightedIndex.value = getInitialIndexForOpen()
  await nextTick()
  measureOpenHeight()
}

function closeSelect(restoreFocus = false): void {
  if (!isOpen.value)
    return

  isOpen.value = false
  isClosing.value = true
  highlightMode.value = 'idle'
  highlightedIndex.value = -1
  panelHeight.value = HEADER_HEIGHT
  clearCloseZIndexTimer()
  closeZIndexTimer.value = setTimeout(() => {
    isClosing.value = false
    closeZIndexTimer.value = null
  }, 420)

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
        highlightMode.value = 'keyboard'
        highlightedIndex.value = findNextEnabledIndex(highlightedIndex.value, 1)
      }
      break

    case 'ArrowUp':
      event.preventDefault()
      if (!isOpen.value) {
        void openSelect()
      }
      else if (highlightedIndex.value >= 0) {
        highlightMode.value = 'keyboard'
        highlightedIndex.value = findNextEnabledIndex(highlightedIndex.value, -1)
      }
      break

    case 'Home':
      if (!isOpen.value)
        return
      event.preventDefault()
      highlightMode.value = 'keyboard'
      highlightedIndex.value = findFirstEnabledIndex()
      break

    case 'End':
      if (!isOpen.value)
        return
      event.preventDefault()
      highlightMode.value = 'keyboard'
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
  highlightMode.value = 'pointer'
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

onBeforeUnmount(() => {
  clearCloseZIndexTimer()
})
</script>

<template>
  <div class="grid gap-2">
    <div
      ref="rootEl"
      class="ui-select-current-root" :class="[rootClass, rootLayerClass]"
    >
      <div class="ds-select-slot ui-select-current-slot" aria-hidden="true" />

      <div
        class="ui-select-current-panel ui-select-current-panel-motion"
        :class="[panelClass, panelVisualClass, panelHoverableClass]"
        :style="{ maxHeight: `${panelHeight}px` }"
      >
        <button
          ref="triggerEl"
          v-bind="attrs"
          type="button"
          class="ds-select-header ui-select-current-header"
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
          <span
            class="ds-select-content ui-select-current-content"
            :class="[
              Boolean(floatingLabelText) && 'has-label',
              Boolean(floatingLabelText) && 'ui-select-current-content-labeled',
            ]"
          >
            <DsTypography
              v-if="floatingLabelText"
              as="span"
              :role="floatingLabelRole"
              :size="floatingLabelSize"
              :weight="floatingLabelWeight"
              :uppercase="floatingActive"
              class="ds-select-label"
              :class="{ 'is-floating': floatingActive }"
            >
              {{ floatingLabelText }}
            </DsTypography>

            <DsTypography
              as="span"
              role="body"
              size="md"
              weight="light"
              class="ds-select-value"
              :class="{ 'is-placeholder': !hasValue, 'is-empty': !valueText }"
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

        <div
          ref="bodyEl"
          class="ui-select-current-body"
          :class="[isOpen && 'ui-select-current-body-open']"
          :aria-hidden="isOpen ? 'false' : 'true'"
          :inert="!isOpen"
        >
          <ul
            :id="listboxId"
            class="ds-select-list ui-select-current-list"
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
                class="ui-select-current-option ui-select-current-option-disabled"
                :class="[
                  isOpen && 'ui-select-current-option-open',
                  modelValue === option.value && 'ui-select-current-option-selected',
                  highlightedIndex === index && highlightMode !== 'idle' && 'ui-select-current-option-highlighted',
                  modelValue === option.value && highlightedIndex === index && highlightMode !== 'idle' && 'ui-select-current-option-selected-highlighted',
                ]"
                :style="{ '--stagger-index': String(index) }"
                :disabled="option.disabled"
                :tabindex="isOpen ? 0 : -1"
                @mouseenter="onOptionMouseEnter(index)"
                @click="selectAt(index)"
              >
                <DsTypography as="span" role="body" size="md">
                  {{ option.label }}
                </DsTypography>

                <span
                  class="ui-select-current-indicator-dot"
                  :class="{ 'ui-select-current-indicator-dot-visible': modelValue === option.value }"
                  aria-hidden="true"
                />
              </button>
            </li>
            <li
              v-if="!hasOptions"
              class="ui-select-current-empty"
              role="presentation"
            >
              <DsTypography as="span" role="body" size="md" tone="muted">
                {{ resolvedEmptyText }}
              </DsTypography>
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
  --ds-select-trigger-h: calc(var(--size-control-lg) + var(--space-2));
  --ds-select-radius: var(--radius-form-pill);
  --ds-select-ring-w: 1px;
  --ds-select-ring: var(--border-input-idle, color-mix(in oklch, var(--foreground) 28%, transparent));
  --ds-select-ring-hover: var(--border-accent-hover, color-mix(in oklch, var(--foreground) 42%, transparent));
  --ds-select-ring-focus: var(--border-accent, color-mix(in oklch, var(--foreground) 56%, transparent));
  --ds-select-surface: var(--bg-inverse, var(--pure-white));
  --ds-select-text: hsl(var(--foreground));
  --ds-select-muted: var(--color-input-placeholder, hsl(var(--muted-foreground)));
  --ds-select-label: var(--color-input-floating-label, hsl(var(--muted-foreground)));
  --ds-select-shadow: var(--color-select-shadow, color-mix(in oklch, var(--foreground) 18%, transparent));
  --ds-select-indicator: var(--color-select-indicator, var(--toxic-11));
  --ds-select-indicator-column: 1rem;
  --ds-select-option-inline-pad: 0.875rem;
  --ds-select-list-inset-x: calc(var(--form-control-inset-x, var(--space-5)) - var(--ds-select-option-inline-pad));
  --ds-select-divider-inset-x: var(--form-control-inset-x, var(--space-5));
  --ds-select-motion-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

.ds-select.shape-rounded {
  --ds-select-radius: var(--radius-form-rounded);
}

.ds-select.shape-pill {
  --ds-select-radius: var(--radius-form-pill);
}

.ds-select-header {
  transition: transform 300ms var(--ds-select-motion-ease);
}

.ds-select-header:focus,
.ds-select-header:focus-visible {
  outline: none;
}

.ds-select.is-disabled .ds-select-header {
  cursor: not-allowed;
}

.ds-select-header::after {
  content: '';
  position: absolute;
  left: var(--ds-select-divider-inset-x);
  right: var(--ds-select-divider-inset-x);
  bottom: 0;
  height: 1px;
  background: var(--un-preset-radix-sand8);
  opacity: 0;
  transform: scaleX(0);
  transform-origin: center;
  transition:
    opacity 280ms ease,
    transform 420ms var(--ds-select-motion-ease);
}

.ds-select.is-open .ds-select-header::after {
  opacity: 1;
  transform: scaleX(1);
  transition-delay: 120ms;
}

.ds-select-label {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  transform-origin: left center;
  color: var(--ds-select-muted);
  transition-property:
    transform, top, color, font-size, line-height, letter-spacing, text-transform, font-family, font-weight;
  transition-duration: var(--motion-input-floating-duration);
  transition-timing-function: var(--motion-input-floating-ease);
  pointer-events: none;
}

.ds-select-label.is-floating {
  top: var(--space-1, 0.25rem);
  transform: translateY(0) scale(0.82);
  color: var(--ds-select-label);
}

.ds-select-value {
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--ds-select-text);
}

.ds-select-value.is-placeholder {
  color: var(--ds-select-muted);
}

.ds-select-value.is-empty {
  opacity: 0;
}

.ds-select-chevron {
  --ds-select-chevron-offset-closed: 1px;
  --ds-select-chevron-offset-open: 3px;
  color: var(--ds-select-text);
  justify-self: center;
  transform: translateY(var(--ds-select-chevron-offset-closed));
  transition: transform 300ms var(--ds-select-motion-ease);
}

.ds-select-chevron.is-open {
  transform: translateY(var(--ds-select-chevron-offset-open)) rotate(180deg);
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
