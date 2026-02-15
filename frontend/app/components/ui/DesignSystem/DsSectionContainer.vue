<script setup lang="ts">
import { toRefs } from 'vue'
import DsContainer from '@/components/ui/DesignSystem/DsContainer.vue'

const props = withDefaults(defineProps<{
  as?: 'section' | 'header' | 'div'
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  fullViewport?: boolean
  centerContent?: boolean
  bordered?: boolean
  contained?: boolean
  max?: '7xl' | 'full'
  gutter?: 'none' | 'md' | 'lg'
  layout?: 'grid' | 'flex' | 'block'
  gap?: 'none' | 'sm' | 'md' | 'lg'
}>(), {
  as: 'section',
  spacing: 'lg',
  fullViewport: true,
  centerContent: false,
  bordered: true,
  contained: true,
  max: '7xl',
  gutter: 'md',
  layout: 'grid',
  gap: 'md',
})

const {
  as,
  spacing,
  fullViewport,
  centerContent,
  bordered,
  contained,
  max,
  gutter,
  layout,
  gap,
} = toRefs(props)

const spacingClasses = {
  sm: {
    flow: 'my-8 md:my-10',
    stage: 'py-8 md:py-10',
  },
  md: {
    flow: 'my-10 md:my-14',
    stage: 'py-10 md:py-14',
  },
  lg: {
    flow: 'my-12 md:my-16',
    stage: 'py-12 md:py-16',
  },
  xl: {
    flow: 'my-16 md:my-20',
    stage: 'py-16 md:py-20',
  },
} as const

const maxClasses = {
  '7xl': 'max-w-7xl',
  'full': 'max-w-full',
} as const

const gutterClasses = {
  none: '',
  md: 'px-4 md:px-12',
  lg: 'px-5 sm:px-8 md:px-12',
} as const

const gapClasses = {
  none: '',
  sm: 'gap-4 md:gap-5',
  md: 'gap-6 md:gap-7',
  lg: 'gap-8 md:gap-10',
} as const

const spacingClass = computed(() => {
  const mode = fullViewport.value ? 'stage' : 'flow'
  return spacingClasses[spacing.value][mode]
})
const maxClass = computed(() => maxClasses[max.value])
const gutterClass = computed(() => gutterClasses[gutter.value])
const gapClass = computed(() => gapClasses[gap.value])

const rootClass = computed(() => useClsx(
  'w-full flow-root',
  bordered.value && 'border-b border-pureBlack/14 border-solid dark:border-pureWhite/14',
  fullViewport.value && 'min-h-[100dvh] grid',
  fullViewport.value && (centerContent.value ? 'content-center' : 'content-start'),
))

const laneClass = computed(() => spacingClass.value)

const containerClass = computed(() => useClsx(
  contained.value && 'mx-auto',
  contained.value && maxClass.value,
  contained.value && gutterClass.value,
))

const contentClass = computed(() => {
  if (layout.value === 'flex')
    return useClsx('flex flex-col', gapClass.value)
  if (layout.value === 'block')
    return useClsx('block', gapClass.value && 'space-y-6 md:space-y-7')
  return useClsx('grid', gapClass.value)
})
</script>

<template>
  <component
    :is="as"
    :class="rootClass"
  >
    <div :class="laneClass">
      <DsContainer
        as="div"
        :class="containerClass"
      >
        <div :class="contentClass">
          <slot />
        </div>
      </DsContainer>
    </div>
  </component>
</template>
