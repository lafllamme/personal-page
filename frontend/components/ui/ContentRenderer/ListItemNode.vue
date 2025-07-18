<template>
  <li :dir="node.direction" class="my-1">
    <NodeRenderer v-for="(cn, i) in node.children" :key="i" :node="cn" />
  </li>
</template>
<script setup lang="ts">
import NodeRenderer from './NodeRenderer.vue'
const props = defineProps<{ node: any }>()
</script> 