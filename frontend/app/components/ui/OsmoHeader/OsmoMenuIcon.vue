<script setup lang="ts">
import { Motion } from 'motion-v'

const props = defineProps<{
  isOpen: boolean
  tone?: 'light' | 'dark'
}>()

const barClass = computed(() => (props.tone === 'light' ? 'bg-pureBlack' : 'bg-pureWhite'))
</script>

<template>
  <div class="relative h-6 w-6 flex flex-col items-center justify-center">
    <Motion
      as="span"
      :class="useClsx('absolute h-0.5 w-6 rounded-full', barClass)"
      :animate="{
        y: isOpen ? 0 : -4,
        rotate: isOpen ? 45 : 0,
      }"
      :transition="{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }"
    />
    <Motion
      as="span"
      :class="useClsx('absolute h-0.5 w-6 rounded-full', barClass)"
      :animate="{
        y: isOpen ? 0 : 4,
        rotate: isOpen ? -45 : 0,
      }"
      :transition="{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }"
    />
  </div>
</template>
