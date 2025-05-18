<script lang="ts" setup>
import type { UnderlineProps } from '@/components/ui/Menu/Underline/Underline.model'
import { UnderlinePropsDefaults } from '@/components/ui/Menu/Underline/Underline.model'

const props = withDefaults(defineProps<UnderlineProps>(), UnderlinePropsDefaults)
const { className, color, variant } = props

const underlineClasses = computed(() => {
  return useClsx(
    color || 'bg-mint-8',
    'absolute bottom-0 h-[2px] transition-all duration-300',
    // Width 0 by default */
    'w-0',

    /* ── show underline ─────────────────────────────────────────────── */
    /* 1. pointer-hover, but only while the button is NOT focus-visible */
    'media-mouse:peer-[&:hover:not(:focus-visible)]:w-3/4',

    /* 2. mouse/touch focus (focus without focus-visible and without hover) */
    'peer-[&:focus:not(:focus-visible):not(:hover)]:w-3/4',

    // Keep the default triggers
    'media-mouse:group-hover:w-3/4',

    // Positioning
    variant === 'left'
      ? 'left-0'
      : 'left-1/2 -translate-x-1/2',

    className,
  )
})
</script>

<template>
  <!-- Underline span -->
  <span :class="underlineClasses" />
</template>
