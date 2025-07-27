<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  height?: number | string
  width?: number | string
  src: string
  class?: string
  alt?: string
  fill?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  height: undefined,
  width: undefined,
  class: '',
  alt: 'Background of a beautiful view',
  fill: false,
})

const isLoading = ref(true)
const imgRef = ref<HTMLImageElement | null>(null)

// Get the card index from parent component
const cardIndex = inject('cardIndex', 0)

onMounted(() => {
  consola.debug('[AppleBlurImage] Component mounted [src]:', props.src)

  // Check if image is already loaded (cached)
  if (imgRef.value) {
    if (imgRef.value.complete) {
      consola.debug('[AppleBlurImage] Image already loaded (cached) [src]:', props.src)
      // Delay the unblur to avoid conflict with card animation
      setTimeout(() => {
        isLoading.value = false
      }, 2000 + (cardIndex * 200)) // 2s base + staggered delay
    }
  }
})

function handleLoad() {
  consola.debug('[AppleBlurImage] Image loaded [src]:', props.src)
  // Delay the unblur to avoid conflict with card animation
  setTimeout(() => {
    isLoading.value = false
  }, 2000 + (cardIndex * 200)) // 2s base + staggered delay
}
</script>

<template>
  <img
    ref="imgRef"
    :class="
      useClsx(
        'transition-[filter] duration-500 ease-out',
        isLoading ? 'blur-sm' : 'blur-0',
        props.class,
        fill ? 'h-full w-full' : '',
      )
    "
    :src="src"
    :width="width"
    :height="height"
    loading="lazy"
    decoding="async"
    :alt="alt"
    @load="handleLoad"
  >
</template>
