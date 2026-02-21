<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useClsx } from '@/composables/useClsx'

const props = withDefaults(defineProps<{
  as?: 'section' | 'header' | 'div'
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  screen?: boolean
  bordered?: boolean
  debug?: boolean
}>(), {
  as: 'section',
  spacing: 'lg',
  screen: false,
  bordered: true,
  debug: false,
})

const {
  as,
  spacing,
  screen,
  bordered,
  debug,
} = toRefs(props)

const spacingClasses = {
  sm: 'py-8 md:py-10',
  md: 'py-10 md:py-14',
  lg: 'py-12 md:py-16',
  xl: 'py-16 md:py-20',
} as const

const rootClass = computed(() => useClsx(
  'w-full flow-root',
  spacingClasses[spacing.value],
  bordered.value && 'border-b border-pureBlack/14 border-solid dark:border-pureWhite/14',
  screen.value && 'min-h-[100dvh]',
  debug.value && 'outline outline-2 outline-[#2dd4bf]/80 dark:outline-[#2dd4bf]/90',
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
