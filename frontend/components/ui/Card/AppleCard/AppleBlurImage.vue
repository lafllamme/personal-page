<script setup lang="ts">
import { useTimeoutFn, whenever } from '@vueuse/core'

interface Props {
  height?: number | string
  width?: number | string
  src: string
  class?: string
  alt?: string
  fill?: boolean
  onLoad?: () => void
  cardIndex?: number
  imageState?: { show: boolean, blur: boolean, grayscale: boolean }
}

const props = withDefaults(defineProps<Props>(), {
  height: undefined,
  width: undefined,
  class: '',
  alt: 'Background of a beautiful view',
  fill: false,
})

const { src, height, width, alt, fill, onLoad } = toRefs(props)

const imgRef = useTemplateRef('imgRef')

whenever(
  () => imgRef.value?.complete,
  () => {
    const { start } = useTimeoutFn(() => {
      onLoad.value!()
    }, 100)
    start()
  },
  { immediate: true },
)
</script>

<template>
  <img
    ref="imgRef"
    :class="
      useClsx(
        'transition-all duration-400 ease-out',
        props.imageState?.show ? 'opacity-100' : 'opacity-0',
        props.imageState?.blur ? 'blur-sm' : 'blur-0',
        props.imageState?.grayscale ? 'grayscale-25' : 'grayscale-0 saturate-115',
        props.class,
        fill ? 'h-full w-full' : '',
      )
    "
    :style="{
      transitionDelay: props.cardIndex !== undefined ? `${props.cardIndex * 100}ms` : '0ms',
    }"
    :src="src"
    :width="width"
    :height="height"
    loading="lazy"
    decoding="async"
    :alt="alt"
  >
</template>
