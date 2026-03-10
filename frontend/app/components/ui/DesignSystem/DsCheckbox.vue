<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed, ref, toRefs, useAttrs, watch } from 'vue'
import DsIcon from './DsIcon.vue'
import DsTypography from './DsTypography.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  modelValue?: CheckboxValue
  variant?: 'default' | 'accent' | 'mixed'
  size?: 'sm' | 'md' | 'lg'
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
  (e: 'update:modelValue', value: CheckboxValue): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

type CheckboxValue = boolean

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
const errorShakeKey = ref(0)

const checkboxId = computed(() => {
  const rawId = attrs.id
  return typeof rawId === 'string' ? rawId : ''
})

const isChecked = computed(() => modelValue.value === true)
const hasValue = computed(() => isChecked.value)
const missingRequiredValue = computed(() => touched.value && required.value && !hasValue.value)
const hasError = computed(() => Boolean(error.value) || invalid.value || missingRequiredValue.value)
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

const resolvedErrorText = computed(() => {
  if (error.value)
    return error.value

  if (missingRequiredValue.value)
    return 'Please confirm this field.'

  return ''
})
const errorAnimationKey = computed(() => `ds-checkbox-error-${errorShakeKey.value}`)

const hintId = computed(() => (checkboxId.value && hint.value && !hasError.value ? `${checkboxId.value}-hint` : ''))
const errorId = computed(() => (checkboxId.value && hasError.value && resolvedErrorText.value ? `${checkboxId.value}-error` : ''))
const describedBy = computed(() => {
  if (errorId.value)
    return errorId.value

  if (hintId.value)
    return hintId.value

  return undefined
})

const controlClass = computed(() => [
  'ui-checkbox-control-base',
  size.value === 'sm' ? 'ui-checkbox-control-sm' : size.value === 'lg' ? 'ui-checkbox-control-lg' : 'ui-checkbox-control-md',
  variant.value === 'accent'
    ? 'ui-checkbox-control-variant-accent'
    : variant.value === 'mixed'
      ? 'ui-checkbox-control-variant-mixed'
      : 'ui-checkbox-control-variant-default',
  hasError.value && !disabled.value && 'ui-checkbox-control-invalid',
  disabled.value && 'ui-checkbox-control-disabled',
])

const labelClass = computed(() => [
  'ui-checkbox-label',
  disabled.value && 'ui-checkbox-label-disabled',
])

const smoothEase = [0.16, 1, 0.3, 1] as const
const isActive = computed(() => isChecked.value)

const idleSurfaceColor = computed(() => {
  if (disabled.value)
    return 'var(--bg-soft-disabled)'

  return 'var(--bg-inverse)'
})

const activeSurfaceColor = computed(() => {
  if (disabled.value)
    return 'var(--bg-soft-disabled)'

  if (variant.value === 'accent')
    return 'var(--color-accent-ui)'

  if (variant.value === 'mixed')
    return 'var(--bg-accent-soft)'

  return 'var(--color-primary)'
})

const checkboxMotion = computed(() => {
  const isCheckedOrMixed = isActive.value
  const hasInvalidState = hasError.value && !disabled.value
  const textColor
    = disabled.value
      ? 'var(--color-disabled)'
      : hasInvalidState
        ? 'var(--color-error-text)'
        : variant.value === 'accent' && isCheckedOrMixed
          ? 'var(--color-on-accent)'
          : variant.value === 'accent'
            ? 'var(--color-inverse)'
            : variant.value === 'mixed'
              ? 'var(--color-accent-strong)'
              : 'var(--color-inverse)'

  const borderColor
    = disabled.value
      ? 'var(--border-disabled)'
      : hasError.value
        ? 'var(--border-error)'
        : isCheckedOrMixed
          ? variant.value === 'default'
            ? 'var(--color-primary)'
            : 'var(--color-accent-ui)'
          : 'var(--border-input-idle)'

  return {
    backgroundColor: hasInvalidState
      ? 'var(--bg-input-error-soft)'
      : isCheckedOrMixed
        ? activeSurfaceColor.value
        : idleSurfaceColor.value,
    borderColor,
    color: textColor,
    transition: {
      duration: 0.5,
      ease: smoothEase,
    },
  }
})

const isIndicatorVisible = computed(() => isActive.value && !disabled.value)

const checkStrokeMotion = computed(() => (
  isIndicatorVisible.value
    ? {
        pathLength: 1,
        opacity: 1,
        transition: {
          duration: 0.2,
          delay: 0.2,
        },
      }
    : {
        pathLength: 0,
        opacity: 0,
        transition: {
          duration: 0.2,
        },
      }
))

function onToggle(): void {
  if (disabled.value)
    return

  if (isActive.value) {
    emit('update:modelValue', false)
    return
  }

  emit('update:modelValue', true)
}

function onFocus(event: FocusEvent): void {
  emit('focus', event)
}

function onBlur(event: FocusEvent): void {
  touched.value = true
  emit('blur', event)
}

watch([hasError, resolvedErrorText], ([nextHasError, nextError], [prevHasError, prevError]) => {
  if (!nextHasError || !nextError)
    return

  if (!prevHasError || nextError !== prevError)
    errorShakeKey.value += 1
})
</script>

<template>
  <div class="ui-checkbox-root">
    <label class="ui-checkbox-hit">
      <div class="ui-checkbox-main-row">
        <Motion
          v-bind="attrs"
          :id="checkboxId || undefined"
          :tabindex="resolvedTabIndex"
          as="button"
          type="button"
          role="checkbox"
          :class="controlClass"
          :data-checked="isChecked ? 'true' : 'false'"
          :aria-checked="isChecked ? 'true' : 'false'"
          :aria-invalid="hasError ? 'true' : 'false'"
          :aria-describedby="describedBy"
          :disabled="disabled"
          :while-hover="disabled ? undefined : { scale: 1.05 }"
          :while-tap="disabled ? undefined : { scale: 0.95 }"
          :animate="checkboxMotion"
          @click="onToggle"
          @focus="onFocus"
          @blur="onBlur"
        >
          <Motion
            as="svg"
            class="ui-checkbox-indicator"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            focusable="false"
            tabindex="-1"
          >
            <Motion
              as="path"
              d="m5 13l4 4L19 7"
              class="ui-checkbox-check-path"
              :initial="{ pathLength: 0, opacity: 0 }"
              :animate="checkStrokeMotion"
              focusable="false"
              tabindex="-1"
            />
          </Motion>
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
        class="ui-checkbox-meta-wrap grid gap-1"
      >
        <div
          v-if="hasError && Boolean(resolvedErrorText)"
          :id="errorId || undefined"
          :key="errorAnimationKey"
          class="ui-input-error-row color-$color-error-text"
        >
          <DsIcon
            name="iconoir:warning-triangle"
            size="sm"
            variant="inherit"
            class="ui-input-error-icon"
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
