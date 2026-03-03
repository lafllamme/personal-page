<script setup lang="ts">
import { computed, ref, toRefs, useAttrs } from 'vue'
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

    <DsTypography
      v-if="error"
      :id="errorId || undefined"
      as="p"
      role="meta"
      size="2xs"
      class="color-$color-error-text"
    >
      {{ error }}
    </DsTypography>

    <DsTypography
      v-else-if="hint"
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
  background: color-mix(in srgb, var(--bg-accent-soft) 14%, transparent);
  box-shadow: 0 0 0 1px var(--border-accent-hover);
}

.ds-input-shell.is-focus:not(.is-disabled):not(.is-invalid) {
  border-color: var(--border-accent);
  box-shadow: 0 0 0 var(--focus-ring-inner-width) var(--border-accent);
}

.ds-input-shell.is-invalid {
  border-color: var(--border-error);
  background: var(--bg-input-error-soft);
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
    transform 160ms ease,
    top 160ms ease,
    left 160ms ease,
    color 160ms ease,
    font-size 160ms ease,
    line-height 160ms ease,
    letter-spacing 160ms ease,
    text-transform 160ms ease,
    font-family 160ms ease,
    font-weight 160ms ease;
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
</style>
