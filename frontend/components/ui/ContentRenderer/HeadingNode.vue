<template>
  <component :is="node.tag || 'h2'" :dir="node.direction" class="font-bold my-4 text-xl md:text-2xl lg:text-3xl">
    <NodeRenderer v-for="(cn, i) in node.children" :key="i" :node="cn" />
  </component>
</template>

<script setup lang="ts">
import NodeRenderer from './NodeRenderer.vue'
const props = defineProps<{ node: any }>()
</script> 