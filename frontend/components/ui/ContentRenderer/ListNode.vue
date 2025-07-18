<template>
  <component :is="node.tag || 'ul'" :dir="node.direction" class="my-4 pl-6 list-disc list-inside">
    <NodeRenderer v-for="(child, i) in node.children" :key="i" :node="child" />
  </component>
</template>
<script setup lang="ts">
import NodeRenderer from './NodeRenderer.vue'
const props = defineProps<{ node: any }>()
</script> 