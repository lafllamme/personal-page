<template>
  <li :dir="node.direction" class="my-1 items-start gap-2 list-item">
    <template v-if="typeof node.checked === 'boolean'">
      <input type="checkbox" :checked="node.checked" disabled class="accent-mint-6 w-4 h-4 mt-1 cursor-not-allowed" />
    </template>
    <NodeRenderer v-for="(cn, i) in node.children" :key="i" :node="cn" />
  </li>
</template>

<script setup lang="ts">
import NodeRenderer from './NodeRenderer.vue'
const props = defineProps<{ node: any }>()
</script> 