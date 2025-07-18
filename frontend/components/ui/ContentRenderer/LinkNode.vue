<template>
  <a :href="node.url" target="_blank" rel="noopener" class="text-blue-600 underline hover:text-blue-800">
    <NodeRenderer v-for="(cn, i) in node.children" :key="i" :node="cn" />
  </a>
</template>
<script setup lang="ts">
import NodeRenderer from './NodeRenderer.vue'
const props = defineProps<{ node: any }>()
</script> 