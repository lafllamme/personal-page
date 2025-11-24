<script setup lang="ts">
const props = defineProps<{ node: any }>()
const { getImageUrl } = useImageUrl()
consola.debug('Image Url:', getImageUrl(props.node.url || props.node.src))
</script>

<template>
  <figure :dir="node.direction" class="my-4 flex flex-col items-center">
    <img :src="getImageUrl(node.url || node.src)" :alt="node.alt || ''" class="max-w-full rounded shadow">
    <figcaption v-if="node.caption" class="text-gray-500 mt-2 text-xs">
      {{ node.caption }}
    </figcaption>
  </figure>
</template>
