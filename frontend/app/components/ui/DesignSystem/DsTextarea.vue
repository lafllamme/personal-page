<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { computed, ref, toRefs, useAttrs, useTemplateRef, watch } from 'vue'
import DsIcon from './DsIcon.vue'
import DsTypography from './DsTypography.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  modelValue?: string
  label?: string
  hint?: string
  error?: string
  required?: boolean
  placeholder?: string
  fillText?: string
  shape?: 'pill' | 'rounded'
  disabled?: boolean
  readonly?: boolean
  invalid?: boolean
  rows?: number
  maxLength?: number
}>(), {
  modelValue: '',
  label: '',
  hint: '',
  error: '',
  required: false,
  placeholder: '',
  fillText: '',
  shape: 'rounded',
  disabled: false,
  readonly: false,
  invalid: false,
  rows: 5,
  maxLength: 2000,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const {
  modelValue,
  label,
  hint,
  error,
  required,
  placeholder,
  fillText,
  shape,
  disabled,
  readonly,
  invalid,
  rows,
  maxLength,
} = toRefs(props)

const attrs = useAttrs()
const isFocused = ref(false)
const isResizing = ref(false)
const errorShakeKey = ref(0)
const textareaEl = useTemplateRef('textareaEl')
const resizeHandleEl = ref<HTMLElement | null>(null)
const textareaHeight = ref<number | null>(null)
const resizeStartY = ref(0)
const resizeStartHeight = ref(0)
const resizeMinHeight = ref(0)
const activePointerId = ref<number | null>(null)

const textareaId = computed(() => {
  const rawId = attrs.id
  return typeof rawId === 'string' ? rawId : ''
})

const hasError = computed(() => Boolean(error.value) || invalid.value)
const hasValue = computed(() => String(modelValue.value || '').length > 0)
const isFloatingActive = computed(() => isFocused.value || hasValue.value)
const showFloatingFillText = computed(() => (
  !hasValue.value
  && isFocused.value
  && !readonly.value
))

const floatingLabelText = computed(() => {
  if (!label.value)
    return ''

  return required.value ? `${label.value} *` : label.value
})

const resolvedFillText = computed(() => fillText.value || placeholder.value || '')
const resolvedPlaceholder = computed(() => (
  showFloatingFillText.value ? resolvedFillText.value : ''
))

const hintId = computed(() => (textareaId.value && hint.value && !hasError.value ? `${textareaId.value}-hint` : ''))
const errorId = computed(() => (textareaId.value && hasError.value && error.value ? `${textareaId.value}-error` : ''))
const describedBy = computed(() => {
  if (errorId.value)
    return errorId.value
  if (hintId.value)
    return hintId.value
  return undefined
})

const charCount = computed(() => String(modelValue.value || '').length)
const maxLengthValue = computed(() => Math.max(1, maxLength.value || 2000))
const counterText = computed(() => `${charCount.value}/${maxLengthValue.value}`)
const counterTone = computed(() => {
  if (disabled.value)
    return 'muted'
  if (hasError.value)
    return 'default'
  return 'muted'
})

const shellClass = computed(() => [
  'ui-input-shell-base',
  shape.value === 'rounded' ? 'ui-form-shape-rounded' : 'ui-form-shape-pill',
  'ui-textarea-shell-floating',
  !disabled.value && !readonly.value && !hasError.value && 'ui-input-shell-interactive',
  disabled.value && 'ui-input-shell-disabled',
  hasError.value && 'ui-input-shell-invalid',
  readonly.value && !disabled.value && !hasError.value && 'ui-input-shell-readonly',
])

const controlClass = computed(() => [
  'ui-textarea-control-base',
  'ui-input-control-placeholder',
  readonly.value && 'ui-input-control-readonly',
  isResizing.value && 'ui-textarea-control-resizing',
  !showFloatingFillText.value && 'ui-input-control-floating-placeholder-hidden',
  showFloatingFillText.value && 'ui-input-control-floating-placeholder-visible',
])

const floatingLabelClass = computed(() => [
  'ui-textarea-floating-label-base',
  isFloatingActive.value && 'ui-input-floating-label-active',
  readonly.value && 'ui-input-floating-label-readonly',
  disabled.value && 'ui-input-floating-label-disabled',
])

const floatingLabelRole = computed<'body' | 'meta'>(() => (isFloatingActive.value ? 'meta' : 'body'))
const floatingLabelSize = computed<'sm' | '2xs'>(() => (isFloatingActive.value ? '2xs' : 'sm'))
const floatingLabelWeight = computed<'light' | 'regular'>(() => (isFloatingActive.value ? 'regular' : 'light'))

const errorAnimationKey = computed(() => `ds-textarea-error-${errorShakeKey.value}`)

const textareaAttrs = computed(() => attrs)
const textareaInlineStyle = computed(() => {
  if (!textareaHeight.value)
    return undefined

  return { height: `${textareaHeight.value}px` }
})

function onInput(event: Event): void {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

function startResize(event: PointerEvent): void {
  if (disabled.value)
    return

  const textarea = textareaEl.value
  if (!textarea)
    return

  resizeStartY.value = event.clientY
  resizeStartHeight.value = textarea.getBoundingClientRect().height
  resizeMinHeight.value = Number.parseFloat(getComputedStyle(textarea).minHeight) || 0
  activePointerId.value = event.pointerId
  isResizing.value = true

  const handle = resizeHandleEl.value
  if (handle && handle.setPointerCapture)
    handle.setPointerCapture(event.pointerId)
}

function onResizeHandlePointerDown(event: PointerEvent): void {
  event.preventDefault()
  startResize(event)
}

function stopResize(): void {
  if (!isResizing.value)
    return

  const pointerId = activePointerId.value
  const handle = resizeHandleEl.value
  if (pointerId !== null && handle && handle.hasPointerCapture?.(pointerId))
    handle.releasePointerCapture(pointerId)

  activePointerId.value = null
  isResizing.value = false
}

watch([hasError, error], ([nextHasError, nextError], [prevHasError, prevError]) => {
  if (!nextHasError)
    return

  if (!prevHasError || nextError !== prevError)
    errorShakeKey.value += 1
})

useEventListener(window, 'pointermove', (event: PointerEvent) => {
  if (!isResizing.value)
    return

  const nextHeight = Math.max(
    resizeMinHeight.value,
    resizeStartHeight.value + (event.clientY - resizeStartY.value),
  )
  textareaHeight.value = nextHeight
})

useEventListener(window, 'pointerup', stopResize)
useEventListener(window, 'pointercancel', stopResize)
</script>

<template>
  <div class="grid gap-$space-2">
    <label
      :for="textareaId || undefined"
      class="block"
    >
      <div :class="shellClass">
        <textarea
          ref="textareaEl"
          v-bind="textareaAttrs"
          :value="modelValue"
          :rows="rows"
          :maxlength="maxLengthValue"
          :placeholder="resolvedPlaceholder"
          :disabled="disabled"
          :readonly="readonly"
          :aria-invalid="hasError ? 'true' : 'false'"
          :aria-readonly="readonly"
          :aria-describedby="describedBy"
          :class="controlClass"
          :style="textareaInlineStyle"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @input="onInput"
        />
        <div class="ui-textarea-meta-row">
          <slot
            name="counter"
            :count="charCount"
            :max="maxLengthValue"
            :remaining="maxLengthValue - charCount"
          >
            <DsTypography
              as="p"
              role="meta"
              size="2xs"
              :tone="counterTone"
              class="opacity-70"
            >
              {{ counterText }}
            </DsTypography>
          </slot>
          <button
            ref="resizeHandleEl"
            type="button"
            class="drag-cursor ui-textarea-resize-handle hidden md:inline-flex"
            :class="[
              isResizing && 'color-$color-accent-ui',
            ]"
            :disabled="disabled"
            :aria-hidden="disabled ? 'true' : 'false'"
            tabindex="-1"
            @pointerdown="onResizeHandlePointerDown"
          >
            <DsIcon
              name="iconoir:arrow-separate-vertical"
              size="sm"
              variant="inherit"
            />
          </button>
        </div>
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

    <div class="min-h-$space-4">
      <div
        v-if="hasError && Boolean(error)"
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
          {{ error }}
        </DsTypography>
      </div>

      <DsTypography
        v-else-if="Boolean(hint)"
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
  </div>
</template>
