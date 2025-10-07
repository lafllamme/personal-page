<script setup lang="ts">
import NodeRenderer from './NodeRenderer.vue'

const props = defineProps<{ node: any }>()
</script>

<template>
  <a
    :href="node.fields?.url || node.url || '#'"
    :target="node.fields?.newTab ? '_blank' : '_self'"
    :rel="node.fields?.newTab ? 'noopener' : undefined"
    class="text-blue-600 hover:text-blue-800 underline"
  >
    <NodeRenderer v-for="(cn, i) in node.children" :key="i" :node="cn" />
  </a>
</template>
