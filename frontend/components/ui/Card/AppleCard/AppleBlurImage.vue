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
        'transition-all duration-1000 ease-out',
        props.imageState?.show ? 'opacity-100' : 'opacity-0',
        props.imageState?.blur ? 'blur-md' : 'blur-0',
        props.class,
        fill ? 'h-full w-full' : '',
      )
    "
    :style="{
      transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
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
