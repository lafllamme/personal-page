<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  rows?: number
  disabled?: boolean
  invalid?: boolean
  previewState?: 'default' | 'hover' | 'focus-visible'
}>(), {
  modelValue: '',
  placeholder: '',
  rows: 4,
  disabled: false,
  invalid: false,
  previewState: 'default',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const { modelValue, placeholder, rows, disabled, invalid, previewState } = toRefs(props)
const normalizedPreviewState = computed(() => `is-state-${previewState.value}`)

function onInput(event: Event): void {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <textarea
    :value="modelValue"
    :placeholder="placeholder"
    :rows="rows"
    :disabled="disabled"
    :aria-invalid="invalid ? 'true' : 'false'"
    class="ds-textarea w-full border rounded-lg border-solid bg-transparent px-3 py-2 text-sm outline-none"
    :class="[invalid && 'is-invalid', normalizedPreviewState]"
    @input="onInput"
  />
</template>

<style scoped>
.ds-textarea {
  resize: vertical;
  min-height: 6rem;
  border-color: color-mix(in srgb, currentColor 22%, transparent);
  transition:
    border-color 160ms ease,
    background-color 160ms ease,
    box-shadow 160ms ease;
}

.ds-textarea::placeholder {
  color: color-mix(in srgb, currentColor 45%, transparent);
}

.ds-textarea:hover:enabled,
.ds-textarea.is-state-hover:enabled {
  border-color: color-mix(in srgb, #12a594 45%, currentColor);
  background: color-mix(in srgb, #12a594 6%, transparent);
}

.ds-textarea:focus-visible,
.ds-textarea.is-state-focus-visible {
  border-color: #12a594;
  box-shadow: 0 0 0 3px color-mix(in srgb, #12a594 26%, transparent);
}

.dark .ds-textarea:hover:enabled,
.dark .ds-textarea.is-state-hover:enabled {
  border-color: color-mix(in srgb, #0bd8b6 45%, currentColor);
  background: color-mix(in srgb, #0bd8b6 8%, transparent);
}

.dark .ds-textarea:focus-visible,
.dark .ds-textarea.is-state-focus-visible {
  border-color: #0bd8b6;
  box-shadow: 0 0 0 3px color-mix(in srgb, #0bd8b6 28%, transparent);
}

.ds-textarea.is-invalid {
  border-color: #b42318;
}

.dark .ds-textarea.is-invalid {
  border-color: #ff8a80;
}

.ds-textarea:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
