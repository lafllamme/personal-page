<template>
  <blockquote :dir="node.direction" class="border-l-4 border-blue-400 pl-4 italic my-4 bg-blue-50 dark:bg-blue-900/20 rounded">
    <NodeRenderer v-for="(cn, i) in node.children" :key="i" :node="cn" />
  </blockquote>
</template>
<script setup lang="ts">
import NodeRenderer from './NodeRenderer.vue'
const props = defineProps<{ node: any }>()
</script> 