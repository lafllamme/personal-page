<script setup lang="ts">
import { computed, toRefs } from 'vue'
import DsSectionBody from '@/components/ui/DesignSystem/DsSectionBody.vue'

const props = withDefaults(defineProps<{
  as?: 'div' | 'section' | 'article'
  max?: '5xl' | '6xl' | '7xl' | 'full'
  gutter?: 'none' | 'sm' | 'md' | 'lg'
  mode?: 'contained' | 'fluid' | 'bleed'
  /** @deprecated use mode */
  contained?: boolean
  /** @deprecated use mode */
  bleed?: boolean
  debug?: boolean
}>(), {
  as: 'div',
  max: '7xl',
  gutter: 'md',
  mode: undefined,
  contained: undefined,
  bleed: undefined,
  debug: false,
})

const {
  mode,
  contained,
  bleed,
} = toRefs(props)

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
  <!-- Legacy alias. Prefer DsSectionBody. -->
  <DsSectionBody
    :as="as"
    :max="max"
    :gutter="gutter"
    :mode="resolvedMode"
    :debug="debug"
  >
    <slot />
  </DsSectionBody>
</template>
