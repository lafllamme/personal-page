<script lang="ts" setup>
import type { UnderlineProps } from '@/components/ui/Menu/Underline/Underline.model'
import { UnderlinePropsDefaults } from '@/components/ui/Menu/Underline/Underline.model'

const props = withDefaults(defineProps<UnderlineProps>(), UnderlinePropsDefaults)
const { className, color, variant } = props

const underlineClasses = computed(() => {
  return useClsx(
    color || 'bg-mint-8',
    'absolute bottom-0 h-[2px] w-0 transform transition-all duration-300 media-mouse:group-hover:w-3/4',
    // Conditionally set starting position and transform based on variant
    variant === 'left'
      ? 'left-0' // For "left", position at left without centering transform.
      : 'left-1/2 -translate-x-1/2', // Default centered variant.
    className,
  )
})
</script>

<template>
  <!-- Underline span -->
  <span :class="underlineClasses" />
</template>
