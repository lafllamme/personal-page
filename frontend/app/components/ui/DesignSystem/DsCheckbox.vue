<script setup lang="ts">
import { computed, ref, toRefs, useAttrs } from 'vue'
import { Motion } from 'motion-v'
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

type CheckboxValue = boolean | 'indeterminate'

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

const checkboxId = computed(() => {
  const rawId = attrs.id
  return typeof rawId === 'string' ? rawId : ''
})

const isChecked = computed(() => modelValue.value === true)
const isIndeterminate = computed(() => modelValue.value === 'indeterminate')
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

const smoothEase = [0.22, 1, 0.36, 1]

const checkMotion = computed(() => (
  isChecked.value
    ? {
        pathLength: 1,
        opacity: 1,
        transition: {
          duration: 0.24,
          delay: 0.3,
          ease: smoothEase,
        },
      }
    : {
        pathLength: 0,
        opacity: 0,
        transition: {
          duration: 0.16,
          ease: smoothEase,
        },
      }
) as any)

const indeterminateMotion = computed(() => (
  isIndeterminate.value
    ? {
        pathLength: 1,
        opacity: 1,
        transition: {
          duration: 0.22,
          delay: 0.28,
          ease: smoothEase,
        },
      }
    : {
        pathLength: 0,
        opacity: 0,
        transition: {
          duration: 0.16,
          ease: smoothEase,
        },
      }
) as any)

function onToggle(): void {
  if (disabled.value)
    return

  if (isChecked.value) {
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
</script>

<template>
  <div class="ui-checkbox-root">
    <label class="ui-checkbox-hit">
      <div class="ui-checkbox-main-row">
        <Motion
          as="button"
          v-bind="attrs"
          :id="checkboxId || undefined"
          type="button"
          role="checkbox"
          :class="controlClass"
          :while-hover="disabled ? undefined : { scale: 1.018 }"
          :while-tap="disabled ? undefined : { scale: 0.982 }"
          :data-checked="isChecked ? 'true' : 'false'"
          :data-indeterminate="isIndeterminate ? 'true' : 'false'"
          :aria-checked="isIndeterminate ? 'mixed' : (isChecked ? 'true' : 'false')"
          :aria-invalid="hasError ? 'true' : 'false'"
          :aria-describedby="describedBy"
          :disabled="disabled"
          @click="onToggle"
          @focus="onFocus"
          @blur="onBlur"
        >
          <Motion
            as="svg"
            class="ui-checkbox-indicator" :class="[
              (isChecked || isIndeterminate) && 'ui-checkbox-indicator-active',
            ]"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <Motion
              as="path"
              d="M4.5 12.75L9.25 17.5L19.5 7"
              class="ui-checkbox-check-path"
              :initial="{ pathLength: 0, opacity: 0 }"
              :animate="checkMotion"
            />
            <Motion
              as="line"
              x1="5"
              y1="12"
              x2="19"
              y2="12"
              class="ui-checkbox-indeterminate-line"
              :initial="{ pathLength: 0, opacity: 0 }"
              :animate="indeterminateMotion"
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
          tone="muted"
        >
          {{ hint }}
        </DsTypography>
      </div>
    </label>
  </div>
</template>
