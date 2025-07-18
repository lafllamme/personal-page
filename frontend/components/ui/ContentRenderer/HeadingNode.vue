<script setup lang="ts">
import NodeRenderer from './NodeRenderer.vue'

interface HeadingNodeProps {
  node: {
    tag?: string
    direction?: string
    children?: any[]
  }
}

const props = defineProps<HeadingNodeProps>()

const { node } = toRefs(props)

const headingClass = computed(() => {
  const tag = node.value.tag || 'h2'
  const sizeMap: Record<string, string> = {
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl',
    h5: 'text-lg',
    h6: 'text-md',
  }
  return `font-bold my-4 ${sizeMap[tag] || 'text-2xl'}`
})

const baseClass = `font-ginger antialiased tracking tight color-mint-8 uppercase leading-tight`
</script>

<template>
  <component
    :is="node.tag || 'h2'"
    :dir="node.direction"
    :class="useClsx(headingClass, baseClass)"
  >
    <NodeRenderer
      v-for="(cn, i) in node.children"
      :key="i"
      :node="cn"
    />
  </component>
</template>
