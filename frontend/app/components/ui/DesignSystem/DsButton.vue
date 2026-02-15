<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'tertiary' | 'quartery' | 'quaternary'
  previewState?: 'default' | 'hover' | 'active' | 'focus-visible'
  disabled?: boolean
}>(), {
  variant: 'primary',
  previewState: 'default',
  disabled: false,
})

const { variant, previewState, disabled } = toRefs(props)

const normalizedVariant = computed(() =>
  variant.value === 'quaternary' ? 'quartery' : variant.value,
)

const normalizedPreviewState = computed(() => `is-state-${previewState.value}`)
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    class="space-grotesk-regular ds-btn rounded-full px-4 py-2 text-[11px] tracking-[0.16em] uppercase disabled:cursor-not-allowed"
    :class="[`is-${normalizedVariant}`, normalizedPreviewState]"
  >
    <slot />
  </button>
</template>

<style scoped>
.ds-btn {
  /* Light scale references from DsColorScheme */
  --teal-1: #fafefd;
  --teal-2: #f3fbf9;
  --teal-3: #e0f8f3;
  --teal-4: #ccf3ea;
  --teal-5: #b8eae0;
  --teal-6: #a1ded2;
  --teal-7: #83cdc1;
  --teal-8: #53b9ab;
  --teal-9: #12a594;
  --teal-10: #0d9b8a;
  --teal-11: #008573;
  --teal-12: #0d3d38;
  --teal-dark-1: #0d1514;
  --teal-dark-2: #111c1b;
  --teal-dark-3: #0d2d2a;
  --teal-dark-4: #023b37;
  --teal-dark-5: #084843;
  --teal-dark-6: #145750;
  --teal-dark-7: #1c6961;
  --teal-dark-8: #207e73;
  --teal-dark-9: #12a594;
  --teal-dark-10: #0eb39e;
  --teal-dark-11: #0bd8b6;
  --teal-dark-12: #adf0dd;
  --ink: #111111;
  --paper: #ffffff;

  border: 1px solid;
  border-color: color-mix(in srgb, currentColor 18%, transparent);
  text-decoration: none;
  text-decoration-color: transparent;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.24em;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    border-color 160ms ease,
    text-decoration-color 160ms ease,
    box-shadow 160ms ease,
    transform 120ms ease;
  display: inline-flex;
  width: auto;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.ds-btn:focus-visible {
  outline: none;
}

.ds-btn:active:enabled {
  transform: translateY(1px);
}

/* Primary: black/white base with subtle accent influence */
.ds-btn.is-primary {
  background: var(--ink);
  border-color: var(--ink);
  color: var(--paper);
}

.dark .ds-btn.is-primary {
  background: var(--paper);
  border-color: var(--paper);
  color: var(--ink);
}

.ds-btn.is-primary:hover:enabled,
.ds-btn.is-primary.is-state-hover:enabled {
  background: color-mix(in srgb, var(--ink) 90%, var(--teal-9));
  border-color: color-mix(in srgb, var(--ink) 90%, var(--teal-9));
}

.ds-btn.is-primary:active:enabled,
.ds-btn.is-primary.is-state-active:enabled {
  background: color-mix(in srgb, var(--ink) 84%, var(--teal-10));
  border-color: color-mix(in srgb, var(--ink) 84%, var(--teal-10));
}

.dark .ds-btn.is-primary:hover:enabled,
.dark .ds-btn.is-primary.is-state-hover:enabled {
  background: color-mix(in srgb, var(--paper) 90%, var(--teal-dark-11));
  border-color: color-mix(in srgb, var(--paper) 90%, var(--teal-dark-11));
}

.dark .ds-btn.is-primary:active:enabled,
.dark .ds-btn.is-primary.is-state-active:enabled {
  background: color-mix(in srgb, var(--paper) 84%, var(--teal-dark-10));
  border-color: color-mix(in srgb, var(--paper) 84%, var(--teal-dark-10));
}

.ds-btn.is-primary:focus-visible,
.ds-btn.is-primary.is-state-focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--teal-9) 30%, transparent);
}

.dark .ds-btn.is-primary:focus-visible,
.dark .ds-btn.is-primary.is-state-focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, #0bd8b6 30%, transparent);
}

.ds-btn.is-primary:disabled {
  background: #232323;
  border-color: #232323;
  color: #949494;
}

.dark .ds-btn.is-primary:disabled {
  background: #c4c4c4;
  border-color: #c4c4c4;
  color: #5c5c5c;
}

/* Secondary: outlined accent */
.ds-btn.is-secondary {
  background: transparent;
  border-color: var(--teal-11);
  color: var(--teal-11);
}

.ds-btn.is-secondary:hover:enabled,
.ds-btn.is-secondary.is-state-hover:enabled {
  border-color: var(--teal-10);
  color: var(--teal-10);
  background: color-mix(in srgb, var(--teal-9) 14%, transparent);
}

.ds-btn.is-secondary:active:enabled,
.ds-btn.is-secondary.is-state-active:enabled {
  border-color: var(--teal-11);
  color: var(--teal-11);
  background: color-mix(in srgb, var(--teal-9) 20%, transparent);
}

.ds-btn.is-secondary:focus-visible,
.ds-btn.is-secondary.is-state-focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--teal-11) 30%, transparent);
}

.dark .ds-btn.is-secondary {
  border-color: var(--teal-dark-11);
  color: var(--teal-dark-11);
}

.dark .ds-btn.is-secondary:hover:enabled,
.dark .ds-btn.is-secondary.is-state-hover:enabled {
  border-color: var(--teal-dark-10);
  color: var(--teal-dark-10);
  background: color-mix(in srgb, var(--teal-dark-11) 14%, transparent);
}

.dark .ds-btn.is-secondary:active:enabled,
.dark .ds-btn.is-secondary.is-state-active:enabled {
  border-color: var(--teal-dark-11);
  color: var(--teal-dark-11);
  background: color-mix(in srgb, var(--teal-dark-11) 20%, transparent);
}

.dark .ds-btn.is-secondary:focus-visible,
.dark .ds-btn.is-secondary.is-state-focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, #0bd8b6 32%, transparent);
}

.ds-btn.is-secondary:disabled {
  border-color: #7ea9a3;
  color: #7ea9a3;
  background: transparent;
}

.dark .ds-btn.is-secondary:disabled {
  border-color: #2e5e58;
  color: #2e5e58;
  background: transparent;
}

/* Tertiary: neutral utility */
.ds-btn.is-tertiary {
  background: transparent;
  border-color: transparent;
  color: inherit;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, currentColor 36%, transparent);
}

.ds-btn.is-tertiary:hover:enabled,
.ds-btn.is-tertiary.is-state-hover:enabled {
  background: transparent;
  text-decoration-color: currentColor;
}

.ds-btn.is-tertiary:active:enabled,
.ds-btn.is-tertiary.is-state-active:enabled {
  background: transparent;
  text-decoration-color: currentColor;
  color: color-mix(in srgb, currentColor 82%, var(--teal-11));
}

.ds-btn.is-tertiary:focus-visible,
.ds-btn.is-tertiary.is-state-focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--teal-9) 22%, transparent);
  text-decoration-color: currentColor;
}

.ds-btn.is-tertiary:disabled {
  border-color: transparent;
  color: color-mix(in srgb, currentColor 42%, transparent);
  background: transparent;
  text-decoration-color: color-mix(in srgb, currentColor 20%, transparent);
}

/* Quartery: soft tag pill utility */
.ds-btn.is-quartery {
  background: var(--teal-3);
  border-color: var(--teal-7);
  color: var(--teal-12);
}

.ds-btn.is-quartery:hover:enabled,
.ds-btn.is-quartery.is-state-hover:enabled {
  background: var(--teal-4);
  border-color: var(--teal-8);
  color: var(--teal-12);
}

.ds-btn.is-quartery:active:enabled,
.ds-btn.is-quartery.is-state-active:enabled {
  background: var(--teal-5);
  border-color: var(--teal-8);
}

.ds-btn.is-quartery:focus-visible,
.ds-btn.is-quartery.is-state-focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--teal-10) 28%, transparent);
}

.dark .ds-btn.is-quartery {
  background: var(--teal-dark-3);
  border-color: var(--teal-dark-7);
  color: var(--teal-dark-12);
}

.dark .ds-btn.is-quartery:hover:enabled,
.dark .ds-btn.is-quartery.is-state-hover:enabled {
  background: var(--teal-dark-4);
  border-color: var(--teal-dark-8);
}

.dark .ds-btn.is-quartery:active:enabled,
.dark .ds-btn.is-quartery.is-state-active:enabled {
  background: var(--teal-dark-5);
  border-color: var(--teal-dark-8);
}

.dark .ds-btn.is-quartery:focus-visible,
.dark .ds-btn.is-quartery.is-state-focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--teal-dark-10) 28%, transparent);
}

.ds-btn.is-quartery:disabled {
  background: #f2f6f5;
  border-color: #dbe5e3;
  color: #90a19e;
}

.dark .ds-btn.is-quartery:disabled {
  background: var(--teal-dark-2);
  border-color: color-mix(in srgb, var(--teal-dark-7) 48%, transparent);
  color: color-mix(in srgb, var(--teal-dark-12) 45%, transparent);
}
</style>
