<script setup lang="ts">
import { computed, toRefs } from 'vue'
import DsSectionBody from '@/components/ui/DesignSystem/DsSectionBody.vue'
import DsSectionShell from '@/components/ui/DesignSystem/DsSectionShell.vue'
import { useClsx } from '@/composables/useClsx'

const props = withDefaults(defineProps<{
  as?: 'section' | 'header' | 'div'
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  fullViewport?: boolean
  bordered?: boolean
  mode?: 'contained' | 'fluid' | 'bleed'
  /** @deprecated use mode */
  contained?: boolean
  max?: '5xl' | '6xl' | '7xl' | 'full'
  gutter?: 'none' | 'sm' | 'md' | 'lg'
  /** @deprecated use mode */
  bleed?: boolean
  layout?: 'grid' | 'flex' | 'block'
  gap?: 'none' | 'sm' | 'md' | 'lg'
  debug?: boolean
}>(), {
  as: 'section',
  spacing: 'lg',
  fullViewport: false,
  bordered: true,
  mode: undefined,
  contained: undefined,
  max: '7xl',
  gutter: 'md',
  bleed: undefined,
  layout: 'grid',
  gap: 'md',
  debug: false,
})

const {
  as,
  spacing,
  fullViewport,
  bordered,
  mode,
  contained,
  max,
  gutter,
  bleed,
  layout,
  gap,
  debug,
} = toRefs(props)

const gapClasses = {
  none: '',
  sm: 'gap-4 md:gap-5',
  md: 'gap-6 md:gap-7',
  lg: 'gap-8 md:gap-10',
} as const

const contentClass = computed(() => {
  const base = layout.value === 'flex'
    ? useClsx('flex flex-col', gapClasses[gap.value])
    : layout.value === 'block'
      ? useClsx('block', gap.value !== 'none' && 'space-y-6 md:space-y-7')
      : useClsx('grid', gapClasses[gap.value])

  return useClsx(
    base,
    debug.value && 'bg-[#10b981]/8 dark:bg-[#10b981]/12 outline outline-1 outline-[#10b981]/80 dark:outline-[#34d399]/80',
  )
})

const resolvedMode = computed<'contained' | 'fluid' | 'bleed'>(() => {
  if (mode.value)
    return mode.value
  if (bleed.value === true)
    return 'bleed'
  if (contained.value === false)
    return 'fluid'
  return 'contained'
})
</script>

<template>
  <!-- Legacy wrapper. Prefer composing DsSectionShell + DsSectionBody directly. -->
  <DsSectionShell
    :as="as"
    :spacing="spacing"
    :screen="fullViewport"
    :bordered="bordered"
    :debug="debug"
  >
    <DsSectionBody
      :mode="resolvedMode"
      :max="max"
      :gutter="gutter"
      :debug="debug"
    >
      <div :class="contentClass">
        <slot />
      </div>
    </DsSectionBody>
  </DsSectionShell>
</template>
