<template>
  <figure :dir="node.direction" class="my-4 flex flex-col items-center">
    <img :src="node.src" :alt="node.alt || ''" class="max-w-full rounded shadow" />
    <figcaption v-if="node.caption" class="text-xs text-gray-500 mt-2">{{ node.caption }}</figcaption>
  </figure>
</template>
<script setup lang="ts">
const props = defineProps<{ node: any }>()
</script> 