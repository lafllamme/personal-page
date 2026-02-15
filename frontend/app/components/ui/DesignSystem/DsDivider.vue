<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useClsx } from '@/composables/useClsx'

const props = withDefaults(defineProps<{
  orientation?: 'horizontal' | 'vertical'
  tone?: 'subtle' | 'strong' | 'accent'
}>(), {
  orientation: 'horizontal',
  tone: 'subtle',
})

const { orientation, tone } = toRefs(props)

const rootClass = computed(() => useClsx(
  'ds-divider border-solid',
  orientation.value === 'horizontal' ? 'w-full border-t' : 'h-full min-h-5 border-l',
  tone.value === 'strong' && 'is-strong',
  tone.value === 'accent' && 'is-accent',
))
</script>

<template>
  <hr :class="rootClass">
</template>

<style scoped>
.ds-divider {
  border-color: color-mix(in srgb, currentColor 16%, transparent);
}

.ds-divider.is-strong {
  border-color: color-mix(in srgb, currentColor 28%, transparent);
}

.ds-divider.is-accent {
  border-color: color-mix(in srgb, #12a594 58%, transparent);
}

.dark .ds-divider.is-accent {
  border-color: color-mix(in srgb, #0bd8b6 62%, transparent);
}
</style>
