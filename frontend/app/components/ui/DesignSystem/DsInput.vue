<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: string
  type?: 'text' | 'email' | 'password' | 'search' | 'url'
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  previewState?: 'default' | 'hover' | 'focus-visible'
}>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
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
  placeholder,
  disabled,
  invalid,
  previewState,
} = toRefs(props)

const normalizedPreviewState = computed(() => `is-state-${previewState.value}`)

function onInput(event: Event): void {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <input
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :aria-invalid="invalid ? 'true' : 'false'"
    class="ds-input w-full border rounded-lg border-solid bg-transparent px-3 py-2 text-sm outline-none"
    :class="[invalid && 'is-invalid', normalizedPreviewState]"
    @input="onInput"
  >
</template>

<style scoped>
.ds-input {
  border-color: color-mix(in srgb, currentColor 22%, transparent);
  transition:
    border-color 160ms ease,
    background-color 160ms ease,
    box-shadow 160ms ease;
}

.ds-input::placeholder {
  color: color-mix(in srgb, currentColor 45%, transparent);
}

.ds-input:hover:enabled,
.ds-input.is-state-hover:enabled {
  border-color: color-mix(in srgb, #12a594 45%, currentColor);
  background: color-mix(in srgb, #12a594 6%, transparent);
}

.ds-input:focus-visible,
.ds-input.is-state-focus-visible {
  border-color: #12a594;
  box-shadow: 0 0 0 3px color-mix(in srgb, #12a594 26%, transparent);
}

.dark .ds-input:hover:enabled,
.dark .ds-input.is-state-hover:enabled {
  border-color: color-mix(in srgb, #0bd8b6 45%, currentColor);
  background: color-mix(in srgb, #0bd8b6 8%, transparent);
}

.dark .ds-input:focus-visible,
.dark .ds-input.is-state-focus-visible {
  border-color: #0bd8b6;
  box-shadow: 0 0 0 3px color-mix(in srgb, #0bd8b6 28%, transparent);
}

.ds-input.is-invalid {
  border-color: #b42318;
}

.dark .ds-input.is-invalid {
  border-color: #ff8a80;
}

.ds-input:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
