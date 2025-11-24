<script setup lang="ts">
import { Motion } from 'motion-v'
import { useVisibilityObserver } from '~/composables/useVisibilityObserver'
import { CarouselKey } from './AppleCarouselContext'

interface Props {
  index: number
}

const props = defineProps<Props>()

const itemRef = ref<HTMLDivElement | null>(null)
const isVisible = ref(false)
useVisibilityObserver(itemRef, isVisible, 15)

// Get carousel context to coordinate animations
const carouselContext = inject(CarouselKey)
const hasBeenVisible = ref(false)

// Watch for visibility changes and coordinate with carousel context
watch(isVisible, (visible) => {
  if (visible && !hasBeenVisible.value) {
    hasBeenVisible.value = true
    if (carouselContext) {
      carouselContext.onCardVisible(props.index)
    }
  }
})
</script>

<template>
  <Motion
    ref="itemRef"
    as="div"
    :initial="{
      opacity: 0,
      y: 200,
    }"
    :animate="{
      opacity: isVisible ? 1 : 0,
      y: isVisible ? 0 : 200,
    }"
    :transition="{
      duration: 0.5,
      delay: 0.05 * props.index,
      ease: [0.25, 0.46, 0.45, 0.94],
    }"
    class="rounded-3xl last:pr-[5%] md:last:pr-[24%]"
  >
    <slot />
  </Motion>
</template>
