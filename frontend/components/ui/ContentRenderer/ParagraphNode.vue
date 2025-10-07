<script setup lang="ts">
import NodeRenderer from './NodeRenderer.vue'

const props = defineProps<{ node: any }>()
</script>

<template>
  <p :dir="node.direction" class="my-2 leading-relaxed">
    <NodeRenderer v-for="(cn, i) in node.children" :key="i" :node="cn" />
  </p>
</template>
