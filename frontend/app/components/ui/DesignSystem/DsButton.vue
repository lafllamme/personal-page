<script setup lang="ts">
import { computed, toRefs } from 'vue'

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'quaternary'
type ButtonVariant = 'default' | 'accent'
type LegacyVariant = ButtonType | 'quartery'

const props = withDefaults(defineProps<{
  type?: ButtonType
  variant?: ButtonVariant | LegacyVariant
  previewState?: 'default' | 'hover' | 'active' | 'focus-visible'
  disabled?: boolean
}>(), {
  type: 'primary',
  variant: 'default',
  previewState: 'default',
  disabled: false,
})

const { type, variant, previewState, disabled } = toRefs(props)

const isLegacyTypeVariant = computed(() => {
  return ['primary', 'secondary', 'tertiary', 'quaternary', 'quartery'].includes(variant.value)
})

const normalizedType = computed<ButtonType>(() => {
  if (type.value)
    return type.value

  if (variant.value === 'quartery')
    return 'quaternary'

  if (isLegacyTypeVariant.value)
    return variant.value as ButtonType

  return 'primary'
})

const normalizedVariant = computed<ButtonVariant>(() => {
  if (isLegacyTypeVariant.value)
    return 'accent'

  return (variant.value as ButtonVariant) ?? 'default'
})

const normalizedPreviewState = computed(() => `is-state-${previewState.value}`)
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    class="space-grotesk-regular ds-btn rounded-full px-4 py-2 text-[11px] tracking-[0.16em] uppercase disabled:cursor-not-allowed"
    :class="[`is-type-${normalizedType}`, `is-variant-${normalizedVariant}`, normalizedPreviewState]"
  >
    <slot />
  </button>
</template>

<style scoped>
.ds-btn {
  --ink: #111111;
  --paper: #ffffff;
  --teal-3: #e0f8f3;
  --teal-4: #ccf3ea;
  --teal-5: #b8eae0;
  --teal-7: #83cdc1;
  --teal-8: #53b9ab;
  --teal-10: #0d9b8a;
  --teal-11: #008573;
  --teal-12: #0d3d38;
  --teal-dark-3: #0d2d2a;
  --teal-dark-4: #023b37;
  --teal-dark-5: #084843;
  --teal-dark-7: #1c6961;
  --teal-dark-8: #207e73;
  --teal-dark-10: #0eb39e;
  --teal-dark-11: #0bd8b6;
  --teal-dark-12: #adf0dd;

  display: inline-flex;
  width: auto;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
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
}

.ds-btn:focus-visible {
  outline: none;
}

.ds-btn:active:enabled {
  transform: translateY(1px);
}

/* Structure by type (independent of color family) */
.ds-btn.is-type-primary {
  text-decoration: none;
}

.ds-btn.is-type-secondary {
  text-decoration: none;
  background: transparent;
}

.ds-btn.is-type-tertiary {
  border-color: transparent;
  background: transparent;
  text-decoration: underline;
}

.ds-btn.is-type-quaternary {
  text-decoration: none;
}

/* DEFAULT variant (pure black/white driven) */
.ds-btn.is-variant-default.is-type-primary {
  background: var(--ink);
  border-color: var(--ink);
  color: var(--paper);
}

.dark .ds-btn.is-variant-default.is-type-primary {
  background: var(--paper);
  border-color: var(--paper);
  color: var(--ink);
}

.ds-btn.is-variant-default.is-type-primary:hover:enabled,
.ds-btn.is-variant-default.is-type-primary.is-state-hover:enabled {
  background: color-mix(in srgb, var(--ink) 88%, var(--paper));
}

.dark .ds-btn.is-variant-default.is-type-primary:hover:enabled,
.dark .ds-btn.is-variant-default.is-type-primary.is-state-hover:enabled {
  background: color-mix(in srgb, var(--paper) 88%, var(--ink));
}

.ds-btn.is-variant-default.is-type-primary:active:enabled,
.ds-btn.is-variant-default.is-type-primary.is-state-active:enabled {
  background: color-mix(in srgb, var(--ink) 78%, var(--paper));
}

.dark .ds-btn.is-variant-default.is-type-primary:active:enabled,
.dark .ds-btn.is-variant-default.is-type-primary.is-state-active:enabled {
  background: color-mix(in srgb, var(--paper) 78%, var(--ink));
}

.ds-btn.is-variant-default.is-type-primary:focus-visible,
.ds-btn.is-variant-default.is-type-primary.is-state-focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, currentColor 24%, transparent);
}

.ds-btn.is-variant-default.is-type-primary:disabled {
  background: #2b2b2b;
  border-color: #2b2b2b;
  color: #8f8f8f;
}

.dark .ds-btn.is-variant-default.is-type-primary:disabled {
  background: #c3c3c3;
  border-color: #c3c3c3;
  color: #595959;
}

.ds-btn.is-variant-default.is-type-secondary {
  border-color: var(--ink);
  color: var(--ink);
}

.dark .ds-btn.is-variant-default.is-type-secondary {
  border-color: var(--paper);
  color: var(--paper);
}

.ds-btn.is-variant-default.is-type-secondary:hover:enabled,
.ds-btn.is-variant-default.is-type-secondary.is-state-hover:enabled {
  background: color-mix(in srgb, var(--ink) 8%, transparent);
}

.dark .ds-btn.is-variant-default.is-type-secondary:hover:enabled,
.dark .ds-btn.is-variant-default.is-type-secondary.is-state-hover:enabled {
  background: color-mix(in srgb, var(--paper) 10%, transparent);
}

.ds-btn.is-variant-default.is-type-secondary:active:enabled,
.ds-btn.is-variant-default.is-type-secondary.is-state-active:enabled {
  background: color-mix(in srgb, var(--ink) 14%, transparent);
}

.dark .ds-btn.is-variant-default.is-type-secondary:active:enabled,
.dark .ds-btn.is-variant-default.is-type-secondary.is-state-active:enabled {
  background: color-mix(in srgb, var(--paper) 16%, transparent);
}

.ds-btn.is-variant-default.is-type-secondary:focus-visible,
.ds-btn.is-variant-default.is-type-secondary.is-state-focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, currentColor 22%, transparent);
}

.ds-btn.is-variant-default.is-type-secondary:disabled {
  border-color: #8f8f8f;
  color: #8f8f8f;
}

.dark .ds-btn.is-variant-default.is-type-secondary:disabled {
  border-color: #666;
  color: #666;
}

.ds-btn.is-variant-default.is-type-tertiary {
  color: var(--ink);
  text-decoration-color: color-mix(in srgb, var(--ink) 36%, transparent);
}

.dark .ds-btn.is-variant-default.is-type-tertiary {
  color: var(--paper);
  text-decoration-color: color-mix(in srgb, var(--paper) 36%, transparent);
}

.ds-btn.is-variant-default.is-type-tertiary:hover:enabled,
.ds-btn.is-variant-default.is-type-tertiary.is-state-hover:enabled,
.ds-btn.is-variant-default.is-type-tertiary:active:enabled,
.ds-btn.is-variant-default.is-type-tertiary.is-state-active:enabled,
.ds-btn.is-variant-default.is-type-tertiary:focus-visible,
.ds-btn.is-variant-default.is-type-tertiary.is-state-focus-visible {
  text-decoration-color: currentColor;
}

.ds-btn.is-variant-default.is-type-tertiary:focus-visible,
.ds-btn.is-variant-default.is-type-tertiary.is-state-focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, currentColor 20%, transparent);
}

.ds-btn.is-variant-default.is-type-tertiary:disabled {
  color: color-mix(in srgb, currentColor 44%, transparent);
  text-decoration-color: color-mix(in srgb, currentColor 22%, transparent);
}

.ds-btn.is-variant-default.is-type-quaternary {
  background: color-mix(in srgb, var(--ink) 6%, transparent);
  border-color: color-mix(in srgb, var(--ink) 22%, transparent);
  color: var(--ink);
}

.dark .ds-btn.is-variant-default.is-type-quaternary {
  background: color-mix(in srgb, var(--paper) 8%, transparent);
  border-color: color-mix(in srgb, var(--paper) 26%, transparent);
  color: var(--paper);
}

.ds-btn.is-variant-default.is-type-quaternary:hover:enabled,
.ds-btn.is-variant-default.is-type-quaternary.is-state-hover:enabled {
  background: color-mix(in srgb, var(--ink) 12%, transparent);
}

.dark .ds-btn.is-variant-default.is-type-quaternary:hover:enabled,
.dark .ds-btn.is-variant-default.is-type-quaternary.is-state-hover:enabled {
  background: color-mix(in srgb, var(--paper) 14%, transparent);
}

.ds-btn.is-variant-default.is-type-quaternary:active:enabled,
.ds-btn.is-variant-default.is-type-quaternary.is-state-active:enabled {
  background: color-mix(in srgb, var(--ink) 18%, transparent);
}

.dark .ds-btn.is-variant-default.is-type-quaternary:active:enabled,
.dark .ds-btn.is-variant-default.is-type-quaternary.is-state-active:enabled {
  background: color-mix(in srgb, var(--paper) 20%, transparent);
}

.ds-btn.is-variant-default.is-type-quaternary:focus-visible,
.ds-btn.is-variant-default.is-type-quaternary.is-state-focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, currentColor 20%, transparent);
}

.ds-btn.is-variant-default.is-type-quaternary:disabled {
  color: color-mix(in srgb, var(--ink) 42%, transparent);
  border-color: color-mix(in srgb, var(--ink) 14%, transparent);
  background: color-mix(in srgb, var(--ink) 4%, transparent);
}

.dark .ds-btn.is-variant-default.is-type-quaternary:disabled {
  color: color-mix(in srgb, var(--paper) 42%, transparent);
  border-color: color-mix(in srgb, var(--paper) 16%, transparent);
  background: color-mix(in srgb, var(--paper) 4%, transparent);
}

/* ACCENT variant (Radix teal family) */
.ds-btn.is-variant-accent.is-type-primary {
  background: var(--teal-11);
  border-color: var(--teal-11);
  color: var(--paper);
}

.dark .ds-btn.is-variant-accent.is-type-primary {
  background: var(--teal-dark-11);
  border-color: var(--teal-dark-11);
  color: #0d1514;
}

.ds-btn.is-variant-accent.is-type-primary:hover:enabled,
.ds-btn.is-variant-accent.is-type-primary.is-state-hover:enabled {
  background: var(--teal-10);
  border-color: var(--teal-10);
}

.dark .ds-btn.is-variant-accent.is-type-primary:hover:enabled,
.dark .ds-btn.is-variant-accent.is-type-primary.is-state-hover:enabled {
  background: var(--teal-dark-10);
  border-color: var(--teal-dark-10);
}

.ds-btn.is-variant-accent.is-type-primary:active:enabled,
.ds-btn.is-variant-accent.is-type-primary.is-state-active:enabled {
  background: var(--teal-12);
  border-color: var(--teal-12);
}

.dark .ds-btn.is-variant-accent.is-type-primary:active:enabled,
.dark .ds-btn.is-variant-accent.is-type-primary.is-state-active:enabled {
  background: var(--teal-dark-8);
  border-color: var(--teal-dark-8);
}

.ds-btn.is-variant-accent.is-type-primary:focus-visible,
.ds-btn.is-variant-accent.is-type-primary.is-state-focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--teal-11) 30%, transparent);
}

.dark .ds-btn.is-variant-accent.is-type-primary:focus-visible,
.dark .ds-btn.is-variant-accent.is-type-primary.is-state-focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--teal-dark-11) 30%, transparent);
}

.ds-btn.is-variant-accent.is-type-primary:disabled {
  background: #7ea9a3;
  border-color: #7ea9a3;
  color: #edf7f5;
}

.dark .ds-btn.is-variant-accent.is-type-primary:disabled {
  background: #2e5e58;
  border-color: #2e5e58;
  color: #9ac8bf;
}

.ds-btn.is-variant-accent.is-type-secondary {
  border-color: var(--teal-11);
  color: var(--teal-11);
}

.dark .ds-btn.is-variant-accent.is-type-secondary {
  border-color: var(--teal-dark-11);
  color: var(--teal-dark-11);
}

.ds-btn.is-variant-accent.is-type-secondary:hover:enabled,
.ds-btn.is-variant-accent.is-type-secondary.is-state-hover:enabled {
  border-color: var(--teal-10);
  color: var(--teal-10);
  background: color-mix(in srgb, var(--teal-9) 14%, transparent);
}

.dark .ds-btn.is-variant-accent.is-type-secondary:hover:enabled,
.dark .ds-btn.is-variant-accent.is-type-secondary.is-state-hover:enabled {
  border-color: var(--teal-dark-10);
  color: var(--teal-dark-10);
  background: color-mix(in srgb, var(--teal-dark-11) 14%, transparent);
}

.ds-btn.is-variant-accent.is-type-secondary:active:enabled,
.ds-btn.is-variant-accent.is-type-secondary.is-state-active:enabled {
  background: color-mix(in srgb, var(--teal-9) 20%, transparent);
}

.dark .ds-btn.is-variant-accent.is-type-secondary:active:enabled,
.dark .ds-btn.is-variant-accent.is-type-secondary.is-state-active:enabled {
  background: color-mix(in srgb, var(--teal-dark-11) 20%, transparent);
}

.ds-btn.is-variant-accent.is-type-secondary:focus-visible,
.ds-btn.is-variant-accent.is-type-secondary.is-state-focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--teal-11) 30%, transparent);
}

.dark .ds-btn.is-variant-accent.is-type-secondary:focus-visible,
.dark .ds-btn.is-variant-accent.is-type-secondary.is-state-focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--teal-dark-11) 32%, transparent);
}

.ds-btn.is-variant-accent.is-type-secondary:disabled {
  border-color: #7ea9a3;
  color: #7ea9a3;
}

.dark .ds-btn.is-variant-accent.is-type-secondary:disabled {
  border-color: #2e5e58;
  color: #2e5e58;
}

.ds-btn.is-variant-accent.is-type-tertiary {
  color: var(--teal-11);
  text-decoration-color: color-mix(in srgb, var(--teal-11) 36%, transparent);
}

.dark .ds-btn.is-variant-accent.is-type-tertiary {
  color: var(--teal-dark-11);
  text-decoration-color: color-mix(in srgb, var(--teal-dark-11) 36%, transparent);
}

.ds-btn.is-variant-accent.is-type-tertiary:hover:enabled,
.ds-btn.is-variant-accent.is-type-tertiary.is-state-hover:enabled,
.ds-btn.is-variant-accent.is-type-tertiary:active:enabled,
.ds-btn.is-variant-accent.is-type-tertiary.is-state-active:enabled,
.ds-btn.is-variant-accent.is-type-tertiary:focus-visible,
.ds-btn.is-variant-accent.is-type-tertiary.is-state-focus-visible {
  text-decoration-color: currentColor;
}

.ds-btn.is-variant-accent.is-type-tertiary:focus-visible,
.ds-btn.is-variant-accent.is-type-tertiary.is-state-focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--teal-11) 22%, transparent);
}

.dark .ds-btn.is-variant-accent.is-type-tertiary:focus-visible,
.dark .ds-btn.is-variant-accent.is-type-tertiary.is-state-focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--teal-dark-11) 22%, transparent);
}

.ds-btn.is-variant-accent.is-type-tertiary:disabled {
  color: #7ea9a3;
  text-decoration-color: color-mix(in srgb, #7ea9a3 40%, transparent);
}

.dark .ds-btn.is-variant-accent.is-type-tertiary:disabled {
  color: #2e5e58;
  text-decoration-color: color-mix(in srgb, #2e5e58 40%, transparent);
}

.ds-btn.is-variant-accent.is-type-quaternary {
  background: var(--teal-3);
  border-color: var(--teal-7);
  color: var(--teal-12);
}

.dark .ds-btn.is-variant-accent.is-type-quaternary {
  background: var(--teal-dark-3);
  border-color: var(--teal-dark-7);
  color: var(--teal-dark-12);
}

.ds-btn.is-variant-accent.is-type-quaternary:hover:enabled,
.ds-btn.is-variant-accent.is-type-quaternary.is-state-hover:enabled {
  background: var(--teal-4);
  border-color: var(--teal-8);
}

.dark .ds-btn.is-variant-accent.is-type-quaternary:hover:enabled,
.dark .ds-btn.is-variant-accent.is-type-quaternary.is-state-hover:enabled {
  background: var(--teal-dark-4);
  border-color: var(--teal-dark-8);
}

.ds-btn.is-variant-accent.is-type-quaternary:active:enabled,
.ds-btn.is-variant-accent.is-type-quaternary.is-state-active:enabled {
  background: var(--teal-5);
  border-color: var(--teal-8);
}

.dark .ds-btn.is-variant-accent.is-type-quaternary:active:enabled,
.dark .ds-btn.is-variant-accent.is-type-quaternary.is-state-active:enabled {
  background: var(--teal-dark-5);
  border-color: var(--teal-dark-8);
}

.ds-btn.is-variant-accent.is-type-quaternary:focus-visible,
.ds-btn.is-variant-accent.is-type-quaternary.is-state-focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--teal-10) 28%, transparent);
}

.dark .ds-btn.is-variant-accent.is-type-quaternary:focus-visible,
.dark .ds-btn.is-variant-accent.is-type-quaternary.is-state-focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--teal-dark-10) 28%, transparent);
}

.ds-btn.is-variant-accent.is-type-quaternary:disabled {
  background: #f2f6f5;
  border-color: #dbe5e3;
  color: #90a19e;
}

.dark .ds-btn.is-variant-accent.is-type-quaternary:disabled {
  background: var(--teal-dark-2);
  border-color: color-mix(in srgb, var(--teal-dark-7) 48%, transparent);
  color: color-mix(in srgb, var(--teal-dark-12) 45%, transparent);
}
</style>
