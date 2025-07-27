<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  height?: number | string
  width?: number | string
  src: string
  class?: string
  alt?: string
  fill?: boolean
  imagesReady?: boolean
  onLoad?: () => void
  cardIndex?: number
  cardsInGrayPhase?: Set<number>
  newCardsAfterReady?: Set<number>
}

const props = withDefaults(defineProps<Props>(), {
  height: undefined,
  width: undefined,
  class: '',
  alt: 'Background of a beautiful view',
  fill: false,
  imagesReady: false,
})

const imgRef = ref<HTMLImageElement | null>(null)

onMounted(() => {
  consola.debug('[AppleBlurImage] Component mounted [src]:', props.src)
  
  // Check if image is already loaded (cached)
  if (imgRef.value?.complete) {
    console.log('[AppleBlurImage] Image already loaded (cached)')
    setTimeout(() => {
      props.onLoad?.()
    }, 100)
  }
})

function handleLoad() {
  consola.debug('[AppleBlurImage] Image loaded [src]:', props.src)
  console.log('[AppleBlurImage] Calling onLoad prop')
  
  // Small delay to ensure the load event is properly processed
  setTimeout(() => {
    props.onLoad?.()
  }, 100)
}
</script>

<template>
  <img
    ref="imgRef"
    :class="
      useClsx(
        'transition-all duration-700 ease-out',
        // Show image if: 
        // 1. Images are ready (for gray phase cards)
        // 2. OR this is a new card after imagesReady (show immediately)
        props.imagesReady || props.newCardsAfterReady?.has(props.cardIndex || 0) ? 'blur-0 opacity-100' : 'blur-md opacity-0',
        props.class,
        fill ? 'h-full w-full' : '',
      )
    "
    :style="
      props.imagesReady 
        ? { 
            transitionDelay: `${(props.cardIndex || 0) * 100}ms`,
            transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }
        : {
            transitionDelay: '0ms',
            transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }
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
