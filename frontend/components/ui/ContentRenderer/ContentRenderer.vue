<template>
  <div class="prose dark:prose-invert mx-auto p-4 rounded-xl bg-white dark:bg-neutral-900 shadow-md">
    <NodeRenderer
      v-for="(node, i) in content.root.children"
      :key="i"
      :node="node"
    />
  </div>
</template>

<script setup lang="ts">
import NodeRenderer from './NodeRenderer.vue'
const props = defineProps<{ content: any }>()
</script> 