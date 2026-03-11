<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed, ref, toRefs, useAttrs, watch } from 'vue'
import DsIcon from './DsIcon.vue'
import DsTypography from './DsTypography.vue'

type CheckboxValue = boolean
type CheckboxVariant = 'default' | 'accent' | 'mixed'
type CheckboxSize = 'sm' | 'md' | 'lg'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  modelValue?: CheckboxValue
  variant?: CheckboxVariant
  size?: CheckboxSize
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
const isHoveringHit = ref(false)
const isFocusVisible = ref(false)

interface CheckboxVisualState {
  backgroundColor: string
  borderColor: string
  color: string
}

const checkboxTokens = {
  bgInverse: 'var(--bg-inverse)',
  bgSoftDisabled: 'var(--bg-soft-disabled)',
  bgAccentSoft: 'var(--bg-accent-soft)',
  bgInputErrorSoft: 'var(--bg-input-error-soft)',
  colorPrimary: 'var(--color-primary)',
  colorInverse: 'var(--color-inverse)',
  colorAccentUi: 'var(--color-accent-ui)',
  colorAccentStrong: 'var(--color-accent-strong)',
  colorOnAccent: 'var(--color-on-accent)',
  colorErrorText: 'var(--color-error-text)',
  colorDisabled: 'var(--color-disabled)',
  borderInputIdle: 'var(--border-input-idle)',
  borderError: 'var(--border-error)',
  borderDisabled: 'var(--border-disabled)',
} as const

const neutralIdleState: CheckboxVisualState = {
  backgroundColor: checkboxTokens.bgInverse,
  borderColor: checkboxTokens.borderInputIdle,
  color: checkboxTokens.colorInverse,
}

const sizeClassMap: Record<CheckboxSize, string> = {
  sm: 'ui-checkbox-control-sm',
  md: 'ui-checkbox-control-md',
  lg: 'ui-checkbox-control-lg',
}

const variantClassMap: Record<CheckboxVariant, string> = {
  default: 'ui-checkbox-control-variant-default',
  accent: 'ui-checkbox-control-variant-accent',
  mixed: 'ui-checkbox-control-variant-mixed',
}

const variantColorMap: Record<CheckboxVariant, { idle: CheckboxVisualState, active: CheckboxVisualState }> = {
  default: {
    idle: neutralIdleState,
    active: {
      backgroundColor: checkboxTokens.colorPrimary,
      borderColor: checkboxTokens.colorPrimary,
      color: checkboxTokens.colorInverse,
    },
  },
  accent: {
    idle: neutralIdleState,
    active: {
      backgroundColor: checkboxTokens.colorAccentUi,
      borderColor: checkboxTokens.colorAccentUi,
      color: checkboxTokens.colorOnAccent,
    },
  },
  mixed: {
    idle: {
      backgroundColor: checkboxTokens.bgInverse,
      borderColor: checkboxTokens.borderInputIdle,
      color: checkboxTokens.colorAccentStrong,
    },
    active: {
      backgroundColor: checkboxTokens.bgAccentSoft,
      borderColor: checkboxTokens.colorAccentUi,
      color: checkboxTokens.colorAccentStrong,
    },
  },
}

const stateOverrideMap = {
  disabled: {
    backgroundColor: checkboxTokens.bgSoftDisabled,
    borderColor: checkboxTokens.borderDisabled,
    color: checkboxTokens.colorDisabled,
  },
  invalid: {
    backgroundColor: checkboxTokens.bgInputErrorSoft,
    borderColor: checkboxTokens.borderError,
    color: checkboxTokens.colorErrorText,
  },
} as const

const checkboxMotionConfig = {
  transitionDuration: 0.5,
  transitionEase: [0.16, 1, 0.3, 1] as const,
  ringWidth: 'var(--focus-ring-active-width)',
  ringDefaultColor: 'var(--border-accent)',
  ringHoverColor: 'var(--border-accent-hover)',
  noShadow: '0 0 0 0 rgba(0,0,0,0)',
} as const

function ringShadow(color: string): string {
  return `0 0 0 ${checkboxMotionConfig.ringWidth} ${color}`
}

type InteractionStateKey = 'blocked' | 'hoverUnchecked' | 'focusUnchecked' | 'focusCheckedAccent' | 'focusChecked' | 'idle'

const interactionMotionMap: Record<InteractionStateKey, () => Partial<CheckboxVisualState> & { boxShadow: string }> = {
  blocked: () => ({
    boxShadow: checkboxMotionConfig.noShadow,
  }),
  hoverUnchecked: () => ({
    borderColor: checkboxMotionConfig.ringHoverColor,
    boxShadow: ringShadow(checkboxMotionConfig.ringHoverColor),
  }),
  focusUnchecked: () => ({
    borderColor: checkboxMotionConfig.ringDefaultColor,
    boxShadow: ringShadow(checkboxMotionConfig.ringDefaultColor),
  }),
  focusCheckedAccent: () => ({
    boxShadow: ringShadow(checkboxMotionConfig.ringHoverColor),
  }),
  focusChecked: () => ({
    boxShadow: ringShadow(checkboxMotionConfig.ringDefaultColor),
  }),
  idle: () => ({
    boxShadow: checkboxMotionConfig.noShadow,
  }),
}

const checkboxId = computed(() => {
  const rawId = attrs.id
  return typeof rawId === 'string' ? rawId : ''
})

const isChecked = computed(() => modelValue.value)
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
  sizeClassMap[size.value],
  variantClassMap[variant.value],
  hasError.value && !disabled.value && 'ui-checkbox-control-invalid',
  disabled.value && 'ui-checkbox-control-disabled',
])

const labelClass = computed(() => [
  'ui-checkbox-label',
  disabled.value && 'ui-checkbox-label-disabled',
])

const isActive = computed(() => isChecked.value)

const interactionStateKey = computed<InteractionStateKey>(() => {
  if (disabled.value || hasError.value)
    return 'blocked'

  if (isFocusVisible.value) {
    if (!isActive.value)
      return 'focusUnchecked'

    return variant.value === 'accent' ? 'focusCheckedAccent' : 'focusChecked'
  }

  if (isHoveringHit.value && !isActive.value)
    return 'hoverUnchecked'

  return 'idle'
})

const stateOverrideKey = computed<'disabled' | 'invalid' | null>(() => {
  if (disabled.value)
    return 'disabled'

  if (hasError.value)
    return 'invalid'

  return null
})

const checkboxMotion = computed(() => {
  const baseVariantMotion = isActive.value
    ? variantColorMap[variant.value].active
    : variantColorMap[variant.value].idle
  const interactionMotion = interactionMotionMap[interactionStateKey.value]()
  const stateOverrideMotion = stateOverrideKey.value ? stateOverrideMap[stateOverrideKey.value] : undefined

  return {
    ...baseVariantMotion,
    ...interactionMotion,
    ...(stateOverrideMotion ?? {}),
    transition: {
      backgroundColor: {
        duration: checkboxMotionConfig.transitionDuration,
        ease: checkboxMotionConfig.transitionEase,
      },
      color: {
        duration: checkboxMotionConfig.transitionDuration,
        ease: checkboxMotionConfig.transitionEase,
      },
      borderColor: {
        duration: 0,
      },
      boxShadow: {
        duration: 0,
      },
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
  const target = event.target
  isFocusVisible.value = target instanceof HTMLElement && target.matches(':focus-visible')
  emit('focus', event)
}

function onBlur(event: FocusEvent): void {
  isFocusVisible.value = false
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
    <label
      class="ui-checkbox-hit"
      @mouseenter="isHoveringHit = true"
      @mouseleave="isHoveringHit = false"
    >
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
