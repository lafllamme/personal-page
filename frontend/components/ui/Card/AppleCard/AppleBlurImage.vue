<script setup lang="ts">
interface Props {
  height?: number | string
  width?: number | string
  src: string
  class?: string
  alt?: string
  fill?: boolean
  onLoad?: () => void
  cardIndex?: number
  imageState?: { show: boolean, blur: boolean }
}

const props = withDefaults(defineProps<Props>(), {
  height: undefined,
  width: undefined,
  class: '',
  alt: 'Background of a beautiful view',
  fill: false,
})

const imgRef = ref<HTMLImageElement | null>(null)

onMounted(() => {
  // Check if image is already loaded (cached)
  if (imgRef.value?.complete) {
    const { start } = useTimeoutFn(() => {
      props.onLoad?.()
    }, 100)
    start()
  }
})

function handleLoad() {
  // Debug log
  console.log(`🖼️ [Card ${props.cardIndex}] Image loaded, state:`, props.imageState)

  // Small delay to ensure the load event is properly processed
  const { start } = useTimeoutFn(() => {
    props.onLoad?.()
  }, 100)
  start()
}
</script>

<template>
  <img
    ref="imgRef"
    :class="
      useClsx(
        'transition-opacity duration-500 ease-out',
        props.imageState?.show ? 'opacity-100' : 'opacity-0',
        props.imageState?.blur ? 'blur-sm' : 'blur-0',
        props.class,
        fill ? 'h-full w-full' : '',
      )
    "
    :style="{
      filter: props.imageState?.blur ? 'blur(16px)' : 'blur(0px)',
      transition: `filter 1.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease-out`,
      transitionDelay: props.cardIndex !== undefined ? `${props.cardIndex * 200}ms` : '0ms',
    }"
    :src="src"
    :width="width"
    :height="height"
    loading="lazy"
    decoding="async"
    :alt="alt"
    @load="handleLoad"
  >
</template>
