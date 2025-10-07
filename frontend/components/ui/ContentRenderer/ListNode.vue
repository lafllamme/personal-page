<script setup lang="ts">
import NodeRenderer from './NodeRenderer.vue'

const props = defineProps<{ node: any }>()

const listClass = computed(() => {
  if (props.node.listType === 'check') {
    return 'my-4 pl-6 list-none'
  }
  if ((props.node.tag || 'ul') === 'ol') {
    return 'my-4 pl-6 list-decimal list-inside'
  }
  return 'my-4 pl-6 list-disc list-inside'
})
</script>

<template>
  <component
    :is="node.tag || 'ul'"
    :dir="node.direction"
    :class="listClass"
  >
    <NodeRenderer v-for="(child, i) in node.children" :key="i" :node="child" />
  </component>
</template>
