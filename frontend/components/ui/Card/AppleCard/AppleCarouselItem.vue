<script setup lang="ts">
import { Motion } from 'motion-v'
import { useVisibilityObserver } from '@/composables/useVisibilityObserver'

interface Props {
  index: number
}

const props = defineProps<Props>()

const itemRef = ref<HTMLDivElement | null>(null)
const isVisible = ref(false)
useVisibilityObserver(itemRef, isVisible, 15)
</script>

<template>
  <Motion
    ref="itemRef"
    as="div"
    :initial="{
      opacity: 0,
      y: 20,
    }"
    :animate="{
      opacity: isVisible ? 1 : 0,
      y: isVisible ? 0 : 20,
    }"
    :transition="{
      duration: 0.5,
      delay: 0.2 * props.index,
      ease: 'easeOut',
    }"
    class="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
  >
    <slot />
  </Motion>
</template>
