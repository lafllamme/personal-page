<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = withDefaults(defineProps<{
  as?: 'div' | 'section'
  cols?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 'sm' | 'md' | 'lg'
  align?: 'start' | 'center' | 'end' | 'stretch'
}>(), {
  as: 'div',
  cols: 12,
  gap: 'md',
  align: 'start',
})

const { as, cols, gap, align } = toRefs(props)

const colClass = computed(() => {
  const map = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
    12: 'grid-cols-12',
  } as const
  return map[cols.value]
})

const gapClass = computed(() => {
  const map = {
    sm: 'gap-3 md:gap-4',
    md: 'gap-4 md:gap-6',
    lg: 'gap-6 md:gap-8',
  } as const
  return map[gap.value]
})

const alignClass = computed(() => {
  const map = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  } as const
  return map[align.value]
})
</script>

<template>
  <component :is="as" class="grid" :class="[colClass, gapClass, alignClass]">
    <slot />
  </component>
</template>
