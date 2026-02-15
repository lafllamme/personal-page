<script setup lang="ts">
import { computed, toRefs } from 'vue'

type StackGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type StackAlign = 'start' | 'center' | 'end' | 'stretch'

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap
  gap?: StackGap
  align?: StackAlign
}>(), {
  as: 'div',
  gap: 'md',
  align: 'stretch',
})

const { gap, align } = toRefs(props)

const gapClasses: Record<StackGap, string> = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-5',
  xl: 'gap-8',
}

const alignClasses: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
}

const stackClasses = computed(() => {
  return ['flex', 'flex-col', gapClasses[gap.value], alignClasses[align.value]].join(' ')
})
</script>

<template>
  <component
    :is="as"
    :class="stackClasses"
  >
    <slot />
  </component>
</template>
