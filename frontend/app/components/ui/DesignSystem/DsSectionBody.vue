<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useClsx } from '@/composables/useClsx'

const props = withDefaults(defineProps<{
  as?: 'div' | 'section' | 'article'
  max?: '5xl' | '6xl' | '7xl' | 'full'
  gutter?: 'none' | 'sm' | 'md' | 'lg'
  mode?: 'contained' | 'fluid' | 'bleed'
  debug?: boolean
}>(), {
  as: 'div',
  max: '7xl',
  gutter: 'md',
  mode: 'contained',
  debug: false,
})

const {
  as,
  max,
  gutter,
  mode,
  debug,
} = toRefs(props)

const maxClasses = {
  '5xl': 'ui-l-body-5xl',
  '6xl': 'ui-l-body-6xl',
  '7xl': 'ui-l-body-7xl',
  'full': 'ui-l-body-full',
} as const

const gutterClasses = {
  none: 'ui-l-gx-0',
  sm: 'ui-l-gx-sm',
  md: 'ui-l-gx-md',
  lg: 'ui-l-gx-lg',
} as const

const bleedClasses = {
  none: 'ui-l-mode-bleed-0',
  sm: 'ui-l-mode-bleed-sm',
  md: 'ui-l-mode-bleed-md',
  lg: 'ui-l-mode-bleed-lg',
} as const

const rootClass = computed(() => useClsx(
  'w-full',
  mode.value === 'contained' && 'ui-l-mode-contained',
  mode.value === 'contained' && maxClasses[max.value],
  mode.value === 'contained' && gutterClasses[gutter.value],
  mode.value === 'fluid' && 'ui-l-mode-fluid',
  mode.value === 'bleed' && bleedClasses[gutter.value],
  debug.value && 'bg-[#6366f1]/8 dark:bg-[#6366f1]/12 outline outline-2 outline-[#6366f1]/70 dark:outline-[#818cf8]/80',
))
</script>

<template>
  <component
    :is="as"
    :class="rootClass"
  >
    <slot />
  </component>
</template>
