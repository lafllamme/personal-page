<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed, ref, toRefs, useAttrs, watch } from 'vue'
import DsIcon from './DsIcon.vue'
import DsTypography from './DsTypography.vue'

type SwitchValue = boolean
type SwitchVariant = 'default' | 'accent' | 'mixed'
type SwitchSize = 'sm' | 'md' | 'lg'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  modelValue?: SwitchValue
  variant?: SwitchVariant
  size?: SwitchSize
  label?: string
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
  invalid?: boolean
}>(), {
  modelValue: false,
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
  (e: 'update:modelValue', value: SwitchValue): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

const {
  modelValue,
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
const isPressed = ref(false)
const errorShakeKey = ref(0)

const sizeClassMap: Record<SwitchSize, string> = {
  sm: 'ui-switch-size-sm',
  md: 'ui-switch-size-md',
  lg: 'ui-switch-size-lg',
}

const variantClassMap: Record<SwitchVariant, string> = {
  default: 'ui-switch-track-variant-default',
  accent: 'ui-switch-track-variant-accent',
  mixed: 'ui-switch-track-variant-mixed',
}

const switchId = computed(() => {
  const rawId = attrs.id
  return typeof rawId === 'string' ? rawId : ''
})

const isChecked = computed(() => Boolean(modelValue.value))
const hasValue = computed(() => isChecked.value)
const missingRequiredValue = computed(() => touched.value && required.value && !hasValue.value)
const hasError = computed(() => Boolean(error.value) || invalid.value || missingRequiredValue.value)
const resolvedErrorText = computed(() => {
  if (error.value)
    return error.value

  if (missingRequiredValue.value)
    return 'Please confirm this field.'

  return ''
})
const errorAnimationKey = computed(() => `ds-switch-error-${errorShakeKey.value}`)

const hintId = computed(() => (switchId.value && hint.value && !hasError.value ? `${switchId.value}-hint` : ''))
const errorId = computed(() => (switchId.value && hasError.value && resolvedErrorText.value ? `${switchId.value}-error` : ''))
const describedBy = computed(() => {
  if (errorId.value)
    return errorId.value

  if (hintId.value)
    return hintId.value

  return undefined
})

const resolvedTabIndex = computed(() => {
  if (disabled.value)
    return -1

  const rawTabIndex = attrs.tabindex
  if (typeof rawTabIndex === 'number')
    return Number.isFinite(rawTabIndex) ? rawTabIndex : 0

  if (typeof rawTabIndex === 'string') {
    const parsed = Number.parseInt(rawTabIndex, 10)
    return Number.isNaN(parsed) ? 0 : parsed
  }

  return 0
})

const trackClass = computed(() => [
  'ui-switch-track-base',
  'ui-switch-track-focused',
  variantClassMap[variant.value],
  isChecked.value ? 'ui-switch-track-checked ui-switch-track-checked-colors' : 'ui-switch-track-unchecked-colors',
  !isChecked.value && !hasError.value && !disabled.value && 'ui-switch-track-hoverable',
  hasError.value && !disabled.value && 'ui-switch-track-invalid',
  disabled.value && 'ui-switch-track-disabled',
])

const labelClass = computed(() => [
  'ui-switch-label',
  disabled.value && 'ui-switch-label-disabled',
])

const thumbAnimate = computed(() => ({
  width: isPressed.value ? 'var(--ds-switch-thumb-size-pressed)' : 'var(--ds-switch-thumb-size)',
  height: 'var(--ds-switch-thumb-size)',
}))

function onToggle(): void {
  if (disabled.value)
    return

  emit('update:modelValue', !isChecked.value)
}

function onKeydown(event: KeyboardEvent): void {
  if (disabled.value)
    return

  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
    onToggle()
  }
}

function onFocus(event: FocusEvent): void {
  emit('focus', event)
}

function onBlur(event: FocusEvent): void {
  touched.value = true
  isPressed.value = false
  emit('blur', event)
}

function onPressStart(): void {
  if (disabled.value)
    return

  isPressed.value = true
}

function onPressEnd(): void {
  isPressed.value = false
}

watch([hasError, resolvedErrorText], ([nextHasError, nextError], [prevHasError, prevError]) => {
  if (!nextHasError || !nextError)
    return

  if (!prevHasError || nextError !== prevError)
    errorShakeKey.value += 1
})
</script>

<template>
  <div class="ui-switch-root" :class="sizeClassMap[size]">
    <label class="ui-switch-hit">
      <div class="ui-switch-main-row">
        <Motion
          v-bind="attrs"
          :id="switchId || undefined"
          :tabindex="resolvedTabIndex"
          as="button"
          type="button"
          role="switch"
          :class="trackClass"
          :aria-checked="isChecked ? 'true' : 'false'"
          :aria-invalid="hasError ? 'true' : 'false'"
          :aria-describedby="describedBy"
          :disabled="disabled"
          :while-tap="disabled ? undefined : { scale: 0.98 }"
          @click="onToggle"
          @keydown="onKeydown"
          @focus="onFocus"
          @blur="onBlur"
          @pointerdown="onPressStart"
          @pointerup="onPressEnd"
          @pointercancel="onPressEnd"
          @pointerleave="onPressEnd"
        >
          <Motion
            as="span"
            class="ui-switch-thumb"
            layout
            :animate="thumbAnimate"
            :transition="{ type: 'spring', stiffness: 300, damping: 24, mass: 0.9 }"
          />
        </Motion>

        <DsTypography
          v-if="label"
          as="span"
          role="body"
          size="sm"
          weight="light"
          :class="labelClass"
        >
          {{ label }}{{ required ? ' *' : '' }}
        </DsTypography>
      </div>

      <div
        v-if="hint || hasError"
        class="ui-switch-meta-wrap"
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
    </label>
  </div>
</template>
