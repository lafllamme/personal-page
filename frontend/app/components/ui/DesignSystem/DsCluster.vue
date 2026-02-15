<script setup lang="ts">
import { computed, toRefs } from 'vue'

type ClusterGap = 'xs' | 'sm' | 'md' | 'lg'
type ClusterAlign = 'start' | 'center' | 'end'
type ClusterJustify = 'start' | 'between' | 'end'

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap
  gap?: ClusterGap
  align?: ClusterAlign
  justify?: ClusterJustify
}>(), {
  as: 'div',
  gap: 'sm',
  align: 'center',
  justify: 'start',
})

const { gap, align, justify } = toRefs(props)

const gapClasses: Record<ClusterGap, string> = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-5',
}

const alignClasses: Record<ClusterAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
}

const justifyClasses: Record<ClusterJustify, string> = {
  start: 'justify-start',
  between: 'justify-between',
  end: 'justify-end',
}

const clusterClasses = computed(() => {
  return [
    'flex',
    'flex-wrap',
    gapClasses[gap.value],
    alignClasses[align.value],
    justifyClasses[justify.value],
  ].join(' ')
})
</script>

<template>
  <component
    :is="as"
    :class="clusterClasses"
  >
    <slot />
  </component>
</template>
