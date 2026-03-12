<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed, ref, toRefs, useAttrs, watch } from 'vue'
import DsIcon from './DsIcon.vue'
import DsTypography from './DsTypography.vue'

type RadioVariant = 'default' | 'accent' | 'mixed'
type RadioSize = 'sm' | 'md' | 'lg'

interface RadioOption {
  label: string
  value: string
  disabled?: boolean
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  modelValue?: string
  options?: RadioOption[]
  variant?: RadioVariant
  size?: RadioSize
  label?: string
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
  invalid?: boolean
}>(), {
  modelValue: '',
  options: () => [],
  variant: 'default',
  size: 'md',
  label: '',
  hint: '',
  error: '',
  required: false,
  disabled: false,
  invalid: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

const {
  modelValue,
  options,
  variant,
  size,
  label,
  hint,
  error,
  required,
  disabled,
  invalid,
} = toRefs(props)

const attrs = useAttrs()
const touched = ref(false)
const errorShakeKey = ref(0)
const groupEl = ref<HTMLElement | null>(null)
const controlRefs = ref<(HTMLElement | null)[]>([])

const sizeRootClassMap: Record<RadioSize, string> = {
  sm: 'ui-radio-size-sm',
  md: 'ui-radio-size-md',
  lg: 'ui-radio-size-lg',
}

const variantClassMap: Record<RadioVariant, string> = {
  default: 'ui-radio-control-variant-default',
  accent: 'ui-radio-control-variant-accent',
  mixed: 'ui-radio-control-variant-mixed',
}

const radioId = computed(() => {
  const rawId = attrs.id
  return typeof rawId === 'string' ? rawId : ''
})

const optionList = computed(() => options.value || [])
const selectedIndex = computed(() => optionList.value.findIndex(option => option.value === modelValue.value))
const hasValue = computed(() => selectedIndex.value >= 0)
const missingRequiredValue = computed(() => touched.value && required.value && !hasValue.value)
const hasError = computed(() => Boolean(error.value) || invalid.value || missingRequiredValue.value)
const resolvedErrorText = computed(() => {
  if (error.value)
    return error.value

  if (missingRequiredValue.value)
    return 'Please choose an option.'

  return ''
})
const errorAnimationKey = computed(() => `ds-radio-error-${errorShakeKey.value}`)
const hintId = computed(() => (radioId.value && hint.value && !hasError.value ? `${radioId.value}-hint` : ''))
const errorId = computed(() => (radioId.value && hasError.value && resolvedErrorText.value ? `${radioId.value}-error` : ''))
const describedBy = computed(() => {
  if (errorId.value)
    return errorId.value

  if (hintId.value)
    return hintId.value

  return undefined
})

function isOptionDisabled(option: RadioOption): boolean {
  return disabled.value || Boolean(option.disabled)
}

function findFirstEnabledIndex(): number {
  return optionList.value.findIndex(option => !isOptionDisabled(option))
}

function findNextEnabledIndex(from: number, direction: 1 | -1): number {
  const total = optionList.value.length
  if (!total)
    return -1

  for (let step = 1; step <= total; step += 1) {
    const next = (from + step * direction + total) % total
    if (!isOptionDisabled(optionList.value[next]!))
      return next
  }

  return -1
}

function resolveTabIndex(index: number): number {
  const option = optionList.value[index]
  if (!option || isOptionDisabled(option))
    return -1

  if (selectedIndex.value >= 0)
    return index === selectedIndex.value ? 0 : -1

  return index === findFirstEnabledIndex() ? 0 : -1
}

function setControlRef(index: number, element: Element | { $el?: Element } | null): void {
  if (!element) {
    controlRefs.value[index] = null
    return
  }

  if (element instanceof HTMLElement) {
    controlRefs.value[index] = element
    return
  }

  const candidate = '$el' in element ? element.$el : null
  controlRefs.value[index] = candidate instanceof HTMLElement ? candidate : null
}

function focusControl(index: number): void {
  controlRefs.value[index]?.focus()
}

function selectAt(index: number): void {
  const option = optionList.value[index]
  if (!option || isOptionDisabled(option))
    return

  emit('update:modelValue', option.value)
}

function onControlFocus(event: FocusEvent): void {
  emit('focus', event)
}

function onControlBlur(event: FocusEvent): void {
  const related = event.relatedTarget
  if (groupEl.value && related instanceof Node && groupEl.value.contains(related)) {
    emit('blur', event)
    return
  }

  touched.value = true
  emit('blur', event)
}

function onControlKeydown(index: number, event: KeyboardEvent): void {
  if (disabled.value)
    return

  let targetIndex = -1

  switch (event.key) {
    case 'ArrowDown':
    case 'ArrowRight':
      event.preventDefault()
      targetIndex = findNextEnabledIndex(index, 1)
      break
    case 'ArrowUp':
    case 'ArrowLeft':
      event.preventDefault()
      targetIndex = findNextEnabledIndex(index, -1)
      break
    case 'Home':
      event.preventDefault()
      targetIndex = findFirstEnabledIndex()
      break
    case 'End':
      event.preventDefault()
      for (let cursor = optionList.value.length - 1; cursor >= 0; cursor -= 1) {
        if (!isOptionDisabled(optionList.value[cursor]!)) {
          targetIndex = cursor
          break
        }
      }
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      selectAt(index)
      return
    default:
      return
  }

  if (targetIndex < 0)
    return

  selectAt(targetIndex)
  focusControl(targetIndex)
}

watch([hasError, resolvedErrorText], ([nextHasError, nextError], [prevHasError, prevError]) => {
  if (!nextHasError || !nextError)
    return

  if (!prevHasError || nextError !== prevError)
    errorShakeKey.value += 1
})
</script>

<template>
  <div class="ui-radio-root" :class="sizeRootClassMap[size]">
    <DsTypography
      v-if="label"
      as="p"
      role="body"
      size="sm"
      weight="light"
    >
      {{ label }}{{ required ? ' *' : '' }}
    </DsTypography>

    <div
      ref="groupEl"
      role="radiogroup"
      class="ui-radio-group"
      :aria-invalid="hasError ? 'true' : 'false'"
      :aria-describedby="describedBy"
    >
      <label
        v-for="(option, index) in optionList"
        :key="option.value"
        class="ui-radio-item"
      >
        <div class="ui-radio-main-row">
          <Motion
            :id="radioId ? `${radioId}-${index}` : undefined"
            as="button"
            type="button"
            role="radio"
            class="ui-radio-control-base"
            :class="[
              variantClassMap[variant],
              modelValue !== option.value && !hasError && !isOptionDisabled(option) && 'ui-radio-control-hoverable',
              modelValue === option.value && 'ui-radio-control-checked',
              hasError && !isOptionDisabled(option) && 'ui-radio-control-invalid',
              isOptionDisabled(option) && 'ui-radio-control-disabled',
            ]"
            :aria-checked="modelValue === option.value ? 'true' : 'false'"
            :aria-disabled="isOptionDisabled(option) ? 'true' : 'false'"
            :tabindex="resolveTabIndex(index)"
            :disabled="isOptionDisabled(option)"
            :ref="element => setControlRef(index, element)"
            :while-hover="isOptionDisabled(option) ? undefined : { scale: 1.05 }"
            :while-tap="isOptionDisabled(option) ? undefined : { scale: 0.95 }"
            @click="selectAt(index)"
            @keydown="onControlKeydown(index, $event)"
            @focus="onControlFocus"
            @blur="onControlBlur"
          >
            <Motion
              as="span"
              class="ui-radio-indicator"
              :initial="{ scale: 0, opacity: 0 }"
              :animate="modelValue === option.value ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }"
              :transition="{ type: 'spring', stiffness: 200, damping: 16 }"
            />
          </Motion>

          <DsTypography
            as="span"
            role="body"
            size="sm"
            weight="light"
            class="ui-radio-label"
            :class="isOptionDisabled(option) && 'ui-radio-label-disabled'"
          >
            {{ option.label }}
          </DsTypography>
        </div>
      </label>
    </div>

    <div
      v-if="hint || hasError"
      class="ui-radio-meta-wrap"
    >
      <div
        v-if="hasError && Boolean(resolvedErrorText)"
        :id="errorId || undefined"
        :key="errorAnimationKey"
        class="ui-field-error-row color-$color-error-text"
      >
        <DsIcon
          name="iconoir:warning-triangle"
          size="sm"
          variant="inherit"
          class="ui-field-error-icon"
        />
        <DsTypography
          as="p"
          role="meta"
          size="2xs"
        >
          {{ resolvedErrorText }}
        </DsTypography>
      </div>

      <DsTypography
        v-else-if="hint"
        :id="hintId || undefined"
        as="p"
        role="meta"
        size="2xs"
        :tone="disabled ? 'muted' : 'default'"
      >
        {{ hint }}
      </DsTypography>
    </div>
  </div>
</template>
