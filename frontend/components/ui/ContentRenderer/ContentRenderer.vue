<script setup lang="ts">
import NodeRenderer from './NodeRenderer.vue'

const props = defineProps<{ content: any }>()
</script>

<template>
  <div class="bg-white dark:bg-neutral-900 mx-auto rounded-xl p-4 shadow-md prose dark:prose-invert">
    <NodeRenderer
      v-for="(node, i) in content.root.children"
      :key="i"
      :node="node"
    />
  </div>
</template>
