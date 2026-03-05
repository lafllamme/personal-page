<script setup lang="ts">
import { computed, ref, toRefs, useAttrs, watch } from 'vue'
import DsIcon from './DsIcon.vue'
import DsTypography from './DsTypography.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  modelValue?: string
  type?: 'text' | 'email' | 'password' | 'search' | 'url' | 'tel'
  variant?: 'default' | 'floating'
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
  type: 'text',
  variant: 'default',
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
}>()

const {
  modelValue,
  type,
  variant,
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
const isFocused = ref(false)
const isHovered = ref(false)
const errorShakeKey = ref(0)

const inputId = computed(() => {
  const rawId = attrs.id
  return typeof rawId === 'string' ? rawId : ''
})
const hasError = computed(() => Boolean(error.value) || invalid.value)
const hasValue = computed(() => String(modelValue.value || '').length > 0)
const isFloating = computed(() => variant.value === 'floating')
const isFloatingActive = computed(() => (
  isFloating.value
  && (isFocused.value || hasValue.value || previewState.value === 'focus-visible')
))
const showFloatingFillText = computed(() => (
  isFloating.value
  && !hasValue.value
  && (isFocused.value || previewState.value === 'focus-visible')
))
const floatingLabelText = computed(() => {
  if (!label.value)
    return ''

  return required.value ? `${label.value} *` : label.value
})
const resolvedFillText = computed(() => fillText.value || placeholder.value || '')
const resolvedPlaceholder = computed(() => {
  if (!isFloating.value)
    return placeholder.value

  return showFloatingFillText.value ? resolvedFillText.value : ''
})
const hintId = computed(() => (inputId.value && hint.value && !hasError.value ? `${inputId.value}-hint` : ''))
const errorId = computed(() => (inputId.value && hasError.value && error.value ? `${inputId.value}-error` : ''))
const describedBy = computed(() => {
  if (errorId.value)
    return errorId.value

  if (hintId.value)
    return hintId.value

  return undefined
})
const inputAttrs = computed(() => attrs)

const shellClass = computed(() => [
  'ds-input-shell',
  isFloating.value ? 'ds-input-shell--floating' : 'ds-input-shell--default',
  disabled.value && 'is-disabled',
  hasError.value && 'is-invalid',
  (previewState.value === 'hover' || isHovered.value) && !disabled.value && !hasError.value && 'is-hover',
  (previewState.value === 'focus-visible' || isFocused.value) && !disabled.value && !hasError.value && 'is-focus',
])

const controlClass = computed(() => [
  'ds-input-control',
  isFloating.value ? 'ds-input-control--floating' : 'ds-input-control--default',
  isFloating.value && isFloatingActive.value && 'is-floating-active',
  isFloating.value && showFloatingFillText.value && 'is-fill-visible',
])

const floatingLabelClass = computed(() => [
  'ds-input-floating-label',
  isFloatingActive.value && 'is-active',
])
const errorAnimationKey = computed(() => `ds-input-error-${errorShakeKey.value}`)

function onInput(event: Event): void {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function onMouseEnter(): void {
  isHovered.value = true
}

function onMouseLeave(): void {
  isHovered.value = false
}

watch(error, (next, prev) => {
  if (next && next !== prev)
    errorShakeKey.value += 1
})
</script>

<template>
  <div class="grid gap-$space-2">
    <label
      v-if="label && !isFloating"
      :for="inputId || undefined"
      class="grid gap-1"
    >
      <div class="flex items-center gap-1">
        <DsTypography
          as="span"
          role="meta"
          size="2xs"
          weight="regular"
          uppercase
        >
          {{ label }}
        </DsTypography>
        <DsTypography
          v-if="required"
          as="span"
          role="meta"
          size="2xs"
          :tone="hasError ? 'default' : 'muted'"
        >
          *
        </DsTypography>
      </div>
    </label>

    <label
      v-if="isFloating"
      :for="inputId || undefined"
      class="block"
    >
      <div :class="shellClass">
        <input
          v-bind="inputAttrs"
          :value="modelValue"
          :type="type"
          :placeholder="resolvedPlaceholder"
          :disabled="disabled"
          :aria-invalid="hasError ? 'true' : 'false'"
          :aria-describedby="describedBy"
          :class="controlClass"
          @mouseenter="onMouseEnter"
          @mouseleave="onMouseLeave"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @input="onInput"
        >
        <span
          v-if="floatingLabelText"
          :class="floatingLabelClass"
        >
          {{ floatingLabelText }}
        </span>
      </div>
    </label>

    <div
      v-else
      :class="shellClass"
    >
      <input
        v-bind="inputAttrs"
        :value="modelValue"
        :type="type"
        :placeholder="resolvedPlaceholder"
        :disabled="disabled"
        :aria-invalid="hasError ? 'true' : 'false'"
        :aria-describedby="describedBy"
        :class="controlClass"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @input="onInput"
      >
    </div>

    <div
      v-if="error"
      :id="errorId || undefined"
      :key="errorAnimationKey"
      class="ds-input-error-row color-$color-error-text"
    >
      <DsIcon
        name="iconoir:warning-triangle"
        size="sm"
        variant="inherit"
        class="ds-input-error-icon"
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
      v-if="!error && Boolean(hint)"
      :id="hintId || undefined"
      as="p"
      role="meta"
      size="2xs"
      :tone="disabled ? 'muted' : 'default'"
      class="opacity-70"
    >
      {{ hint }}
    </DsTypography>
  </div>
</template>

<style scoped>
.ds-input-shell {
  position: relative;
  width: 100%;
  border: var(--control-border-width) solid var(--border-input-idle);
  border-radius: var(--radius-lg);
  background: transparent;
  padding-inline: var(--space-3_5);
  transition:
    border-color 160ms ease,
    background-color 160ms ease,
    box-shadow 160ms ease,
    color 160ms ease;
}

.ds-input-shell--default {
  min-height: var(--size-control-md);
}

.ds-input-shell--floating {
  min-height: calc(var(--size-control-lg) + var(--space-2));
}

.ds-input-shell.is-hover:not(.is-disabled):not(.is-invalid) {
  border-color: var(--border-accent-hover);
  box-shadow: 0 0 0 1px var(--border-accent-hover);
}

.ds-input-shell.is-focus:not(.is-disabled):not(.is-invalid) {
  border-color: var(--border-accent);
  box-shadow: 0 0 0 var(--focus-ring-inner-width) var(--border-accent);
}

.ds-input-shell.is-invalid {
  border-color: var(--border-error);
  background: var(--bg-input-error-soft, color-mix(in srgb, var(--border-error) 12%, transparent));
  box-shadow: none;
}

.ds-input-shell.is-disabled {
  cursor: not-allowed;
  color: var(--color-disabled);
  background: var(--bg-soft-disabled);
  border-color: var(--border-disabled);
  box-shadow: none;
}

.ds-input-control {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--color-primary);
  font-family: 'Manrope', sans-serif;
  font-size: var(--type-size-md);
  line-height: var(--type-leading-md);
  font-weight: 300;
  outline: none;
}

.ds-input-control::placeholder {
  color: var(--color-input-placeholder);
  opacity: 1;
}

.ds-input-control--default {
  padding-block: calc(var(--space-2) - 1px);
}

.ds-input-control--floating {
  padding-top: calc(var(--space-4_75) - 1px);
  padding-bottom: calc(var(--space-2) - 1px);
}

.ds-input-control--floating::placeholder {
  font-family: 'Manrope', sans-serif;
  font-size: inherit;
  line-height: inherit;
}

.ds-input-control--floating:not(.is-fill-visible)::placeholder {
  opacity: 0;
}

.ds-input-control--floating.is-fill-visible::placeholder {
  opacity: 1;
}

.ds-input-floating-label {
  pointer-events: none;
  position: absolute;
  left: var(--space-3_5);
  top: 50%;
  transform: translateY(-50%);
  transform-origin: left center;
  font-family: 'Manrope', sans-serif;
  font-size: var(--type-size-sm);
  line-height: var(--type-leading-sm);
  font-weight: 300;
  color: var(--color-input-placeholder);
  transition:
    transform var(--motion-input-floating-duration) var(--motion-input-floating-ease),
    top var(--motion-input-floating-duration) var(--motion-input-floating-ease),
    left var(--motion-input-floating-duration) var(--motion-input-floating-ease),
    color var(--motion-input-floating-duration) var(--motion-input-floating-ease),
    font-size var(--motion-input-floating-duration) var(--motion-input-floating-ease),
    line-height var(--motion-input-floating-duration) var(--motion-input-floating-ease),
    letter-spacing var(--motion-input-floating-duration) var(--motion-input-floating-ease),
    text-transform var(--motion-input-floating-duration) var(--motion-input-floating-ease),
    font-family var(--motion-input-floating-duration) var(--motion-input-floating-ease),
    font-weight var(--motion-input-floating-duration) var(--motion-input-floating-ease);
}

.ds-input-floating-label.is-active {
  left: calc(var(--space-3_5) + 1px);
  top: calc(var(--space-1) + 1px);
  transform: translateY(0) scale(0.82);
  font-family: 'Space Grotesk', sans-serif;
  font-size: var(--type-size-2xs);
  line-height: var(--type-leading-2xs);
  letter-spacing: var(--type-track-meta-2xs);
  font-weight: 400;
  text-transform: uppercase;
  color: var(--color-input-floating-label);
}

.ds-input-error-row {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1_5);
  animation: ds-input-error-shake-in var(--motion-input-error-shake-duration) var(--motion-input-error-shake-ease) both;
}

.ds-input-error-icon {
  flex-shrink: 0;
}

@keyframes ds-input-error-shake-in {
  from {
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
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
