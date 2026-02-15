<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useClsx } from '@/composables/useClsx'

const props = withDefaults(defineProps<{
  as?: 'article' | 'section' | 'div'
  variant?: 'default' | 'subtle' | 'accent'
  interactive?: boolean
  padded?: boolean
}>(), {
  as: 'article',
  variant: 'default',
  interactive: false,
  padded: true,
})

const { as, variant, interactive, padded } = toRefs(props)

const rootClass = computed(() => useClsx(
  'ds-card border rounded-xl border-solid',
  padded.value && 'p-4 md:p-5',
  variant.value === 'subtle' && 'is-subtle',
  variant.value === 'accent' && 'is-accent',
  interactive.value && 'is-interactive',
))
</script>

<template>
  <component :is="as" :class="rootClass">
    <slot />
  </component>
</template>

<style scoped>
.ds-card {
  border-color: color-mix(in srgb, currentColor 16%, transparent);
  background: color-mix(in srgb, currentColor 1.5%, transparent);
  transition:
    border-color 160ms ease,
    background-color 160ms ease,
    box-shadow 160ms ease;
}

.ds-card.is-subtle {
  background: color-mix(in srgb, currentColor 4%, transparent);
}

.ds-card.is-accent {
  border-color: color-mix(in srgb, #12a594 32%, currentColor);
  background: color-mix(in srgb, #12a594 9%, transparent);
}

.ds-card.is-interactive:hover,
.ds-card.is-interactive:focus-within {
  border-color: color-mix(in srgb, #12a594 42%, currentColor);
  background: color-mix(in srgb, #12a594 12%, transparent);
}

.ds-card.is-interactive:focus-within {
  box-shadow: 0 0 0 3px color-mix(in srgb, #12a594 22%, transparent);
}

.dark .ds-card.is-accent {
  border-color: color-mix(in srgb, #0bd8b6 42%, currentColor);
  background: color-mix(in srgb, #0bd8b6 10%, transparent);
}

.dark .ds-card.is-interactive:hover,
.dark .ds-card.is-interactive:focus-within {
  border-color: color-mix(in srgb, #0bd8b6 48%, currentColor);
  background: color-mix(in srgb, #0bd8b6 14%, transparent);
}

.dark .ds-card.is-interactive:focus-within {
  box-shadow: 0 0 0 3px color-mix(in srgb, #0bd8b6 24%, transparent);
}
</style>
