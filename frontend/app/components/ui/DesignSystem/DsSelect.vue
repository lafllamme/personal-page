<script setup lang="ts">
import { computed, toRefs } from 'vue'

interface SelectOption {
  label: string
  value: string
}

const props = withDefaults(defineProps<{
  modelValue?: string
  options?: SelectOption[]
  disabled?: boolean
  invalid?: boolean
  previewState?: 'default' | 'hover' | 'focus-visible'
}>(), {
  modelValue: '',
  options: () => [],
  disabled: false,
  invalid: false,
  previewState: 'default',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const { modelValue, options, disabled, invalid, previewState } = toRefs(props)
const normalizedPreviewState = computed(() => `is-state-${previewState.value}`)

function onChange(event: Event): void {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="relative">
    <select
      :value="modelValue"
      :disabled="disabled"
      :aria-invalid="invalid ? 'true' : 'false'"
      class="ds-select w-full appearance-none border rounded-lg border-solid bg-transparent px-3 py-2 pr-9 text-sm outline-none"
      :class="[invalid && 'is-invalid', normalizedPreviewState]"
      @change="onChange"
    >
      <option value="" disabled>
        Select one
      </option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <span class="pointer-events-none absolute right-3 top-1/2 text-xs opacity-70 -translate-y-1/2">▼</span>
  </div>
</template>

<style scoped>
.ds-select {
  border-color: color-mix(in srgb, currentColor 22%, transparent);
  transition:
    border-color 160ms ease,
    background-color 160ms ease,
    box-shadow 160ms ease;
}

.ds-select:hover:enabled,
.ds-select.is-state-hover:enabled {
  border-color: color-mix(in srgb, #12a594 45%, currentColor);
  background: color-mix(in srgb, #12a594 6%, transparent);
}

.ds-select:focus-visible,
.ds-select.is-state-focus-visible {
  border-color: #12a594;
  box-shadow: 0 0 0 3px color-mix(in srgb, #12a594 26%, transparent);
}

.dark .ds-select:hover:enabled,
.dark .ds-select.is-state-hover:enabled {
  border-color: color-mix(in srgb, #0bd8b6 45%, currentColor);
  background: color-mix(in srgb, #0bd8b6 8%, transparent);
}

.dark .ds-select:focus-visible,
.dark .ds-select.is-state-focus-visible {
  border-color: #0bd8b6;
  box-shadow: 0 0 0 3px color-mix(in srgb, #0bd8b6 28%, transparent);
}

.ds-select.is-invalid {
  border-color: #b42318;
}

.dark .ds-select.is-invalid {
  border-color: #ff8a80;
}

.ds-select:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
