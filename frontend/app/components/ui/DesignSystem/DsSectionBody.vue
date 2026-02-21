<script setup lang="ts">
import { computed, toRefs } from 'vue'
import {
  LayoutContainerBleedClasses,
  LayoutContainerGutterClasses,
  LayoutContainerMaxClasses,
} from '@/components/ui/Partials/PageContainer/PageContainer.contract'
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

const rootClass = computed(() => useClsx(
  'w-full',
  mode.value === 'contained' && 'mx-auto',
  mode.value === 'contained' && LayoutContainerMaxClasses[max.value],
  mode.value === 'contained' && LayoutContainerGutterClasses[gutter.value],
  mode.value === 'bleed' && LayoutContainerBleedClasses[gutter.value],
  mode.value === 'bleed' && 'relative',
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
