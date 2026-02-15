<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = withDefaults(defineProps<{
  active?: boolean
  disabled?: boolean
  variant?: 'default' | 'accent'
  previewState?: 'default' | 'hover' | 'active' | 'focus-visible'
}>(), {
  active: false,
  disabled: false,
  variant: 'default',
  previewState: 'default',
})

const { active, disabled, variant, previewState } = toRefs(props)
const normalizedPreviewState = computed(() => `is-state-${previewState.value}`)
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    class="space-grotesk-regular ds-tag inline-flex items-center border rounded-full border-solid px-2.5 py-1 text-[10px] tracking-[0.14em] uppercase"
    :class="[`is-variant-${variant}`, active && 'is-active', normalizedPreviewState]"
  >
    <slot />
  </button>
</template>

<style scoped>
.ds-tag {
  border-color: color-mix(in srgb, currentColor 22%, transparent);
  background: transparent;
  color: currentColor;
  transition:
    border-color 160ms ease,
    background-color 160ms ease,
    box-shadow 160ms ease,
    color 160ms ease;
}

.ds-tag:hover:enabled,
.ds-tag.is-state-hover:enabled {
  background: color-mix(in srgb, currentColor 8%, transparent);
}

.ds-tag.is-active,
.ds-tag.is-state-active {
  background: color-mix(in srgb, currentColor 14%, transparent);
  border-color: color-mix(in srgb, currentColor 30%, transparent);
}

.ds-tag:focus-visible,
.ds-tag.is-state-focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in srgb, currentColor 22%, transparent);
}

.ds-tag.is-variant-accent {
  border-color: #008573;
  color: #008573;
}

.ds-tag.is-variant-accent:hover:enabled,
.ds-tag.is-variant-accent.is-state-hover:enabled {
  background: color-mix(in srgb, #12a594 12%, transparent);
}

.ds-tag.is-variant-accent.is-active,
.ds-tag.is-variant-accent.is-state-active {
  background: color-mix(in srgb, #12a594 20%, transparent);
  border-color: #0d9b8a;
  color: #0d9b8a;
}

.dark .ds-tag.is-variant-accent {
  border-color: #0bd8b6;
  color: #0bd8b6;
}

.dark .ds-tag.is-variant-accent:hover:enabled,
.dark .ds-tag.is-variant-accent.is-state-hover:enabled {
  background: color-mix(in srgb, #0bd8b6 12%, transparent);
}

.dark .ds-tag.is-variant-accent.is-active,
.dark .ds-tag.is-variant-accent.is-state-active {
  background: color-mix(in srgb, #0bd8b6 20%, transparent);
  border-color: #0eb39e;
  color: #0eb39e;
}

.ds-tag:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}
</style>
