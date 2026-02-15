<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
  disabled?: boolean
}>(), {
  variant: 'primary',
  disabled: false,
})
</script>

<template>
  <button
    type="button"
    :disabled="props.disabled"
    class="space-grotesk-regular ds-btn rounded-lg px-4 py-2 text-[11px] tracking-[0.16em] uppercase disabled:cursor-not-allowed disabled:opacity-45"
    :class="`is-${props.variant}`"
  >
    <slot />
  </button>
</template>

<style scoped>
.ds-btn {
  border: 1px solid;
  border-color: color-mix(in srgb, currentColor 18%, transparent);
  transition:
    background-color 160ms ease,
    color 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.ds-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in srgb, #12a594 32%, transparent);
}

.dark .ds-btn:focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, #0bd8b6 32%, transparent);
}

.ds-btn.is-primary {
  background: #000;
  border-color: #000;
  color: #fff;
}

.dark .ds-btn.is-primary {
  background: #fff;
  border-color: #fff;
  color: #000;
}

.ds-btn.is-primary:hover:enabled {
  background: color-mix(in srgb, #000 80%, #12a594);
  border-color: color-mix(in srgb, #000 80%, #12a594);
}

.dark .ds-btn.is-primary:hover:enabled {
  background: color-mix(in srgb, #fff 80%, #0bd8b6);
  border-color: color-mix(in srgb, #fff 80%, #0bd8b6);
}

.ds-btn.is-secondary {
  background: transparent;
  color: inherit;
}

.ds-btn.is-secondary:hover:enabled {
  border-color: #12a594;
  color: #12a594;
  background: color-mix(in srgb, #12a594 10%, transparent);
}

.dark .ds-btn.is-secondary:hover:enabled {
  border-color: #0bd8b6;
  color: #0bd8b6;
  background: color-mix(in srgb, #0bd8b6 12%, transparent);
}

.ds-btn.is-tertiary {
  background: transparent;
  color: inherit;
  border-color: transparent;
}

.ds-btn.is-tertiary:hover:enabled {
  border-color: color-mix(in srgb, currentColor 24%, transparent);
  background: color-mix(in srgb, currentColor 6%, transparent);
}

.ds-btn.is-link {
  border-color: transparent;
  background: transparent;
  color: #12a594;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.dark .ds-btn.is-link {
  color: #0bd8b6;
}

.ds-btn.is-link:hover:enabled {
  color: color-mix(in srgb, #12a594 75%, #000);
}

.dark .ds-btn.is-link:hover:enabled {
  color: color-mix(in srgb, #0bd8b6 75%, #fff);
}
</style>
