<script lang="ts" setup>
import type { UnderlineProps } from '@/components/ui/Menu/Underline/Underline.model'
import { UnderlinePropsDefaults } from '@/components/ui/Menu/Underline/Underline.model'

const props = withDefaults(defineProps<UnderlineProps>(), UnderlinePropsDefaults)
const { className, color } = props
</script>

<template>
  <!-- Hover indicator -->
  <span
    :class="useClsx(
      color ? color : 'bg-mint-8',
      'absolute bottom-0 left-1/2 h-[2px]',
      'w-0 transform transition-all duration-300 media-mouse:group-hover:w-3/4 -translate-x-1/2',
      className,
    )"
  />
</template>
