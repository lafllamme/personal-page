<script setup lang="ts">
import NodeRenderer from './NodeRenderer.vue'

defineProps<{ node: any }>()
</script>

<template>
  <li :dir="node.direction" class="my-1 list-item items-start gap-2">
    <template v-if="typeof node.checked === 'boolean'">
      <input type="checkbox" :checked="node.checked" disabled class="mt-1 h-4 w-4 cursor-not-allowed accent-mint-6">
    </template>
    <NodeRenderer v-for="(cn, i) in node.children" :key="i" :node="cn" />
  </li>
</template>
