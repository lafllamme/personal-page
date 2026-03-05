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
  'ui-input-shell-base',
  isFloating.value ? 'ui-input-shell-floating' : 'ui-input-shell-default',
  disabled.value && 'ui-input-shell-disabled',
  hasError.value && 'ui-input-shell-invalid',
  (previewState.value === 'focus-visible' || isFocused.value) && !disabled.value && !hasError.value && 'ui-input-shell-focus',
  (
    !isFocused.value
    && previewState.value !== 'focus-visible'
    && (previewState.value === 'hover' || isHovered.value)
    && !disabled.value
    && !hasError.value
  ) && 'ui-input-shell-hover',
])

const controlClass = computed(() => [
  'ui-input-control-base',
  'ui-input-control-placeholder',
  isFloating.value ? 'ui-input-control-floating' : 'ui-input-control-default',
  isFloating.value && !showFloatingFillText.value && 'ui-input-control-floating-placeholder-hidden',
  isFloating.value && showFloatingFillText.value && 'ui-input-control-floating-placeholder-visible',
])

const floatingLabelClass = computed(() => [
  'ui-input-floating-label-base',
  isFloatingActive.value && 'ui-input-floating-label-active',
])
const floatingLabelRole = computed<'body' | 'meta'>(() => (isFloatingActive.value ? 'meta' : 'body'))
const floatingLabelSize = computed<'sm' | '2xs'>(() => (isFloatingActive.value ? '2xs' : 'sm'))
const floatingLabelWeight = computed<'light' | 'regular'>(() => (isFloatingActive.value ? 'regular' : 'light'))
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

watch([hasError, error], ([nextHasError, nextError], [prevHasError, prevError]) => {
  if (!nextHasError)
    return

  if (!prevHasError || nextError !== prevError)
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
        <DsTypography
          v-if="floatingLabelText"
          as="span"
          :role="floatingLabelRole"
          :size="floatingLabelSize"
          :weight="floatingLabelWeight"
          :uppercase="isFloatingActive"
          :class="floatingLabelClass"
        >
          {{ floatingLabelText }}
        </DsTypography>
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
      v-if="hasError && Boolean(error)"
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
