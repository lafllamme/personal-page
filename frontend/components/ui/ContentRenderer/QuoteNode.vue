<script setup lang="ts">
import NodeRenderer from './NodeRenderer.vue'

interface QuoteNodeProps {
  node: {
    direction?: string
    children?: any[]
  }
}

const props = defineProps<QuoteNodeProps>()
const { node } = toRefs(props)
</script>

<template>
  <blockquote
    :dir="node.direction"
    class="geist-regular my-4 rounded-2xl bg-mint-9 p-2 text-center text-xl color-gray-12 font-medium tracking-normal antialiased"
  >
    <NodeRenderer
      v-for="(cn, i) in node.children"
      :key="i"
      :node="cn"
    />
  </blockquote>
</template>
