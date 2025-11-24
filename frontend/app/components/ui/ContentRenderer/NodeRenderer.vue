<script setup lang="ts">
import { computed } from 'vue'
import CodeNode from './CodeNode.vue'
import DividerNode from './DividerNode.vue'
import HeadingNode from './HeadingNode.vue'
import ImageNode from './ImageNode.vue'
import LinkNode from './LinkNode.vue'
import ListItemNode from './ListItemNode.vue'
import ListNode from './ListNode.vue'
import ParagraphNode from './ParagraphNode.vue'
import QuoteNode from './QuoteNode.vue'
import TextNode from './TextNode.vue'

const props = defineProps<{ node: any }>()

const component = computed(() => {
  if (props.node.type === 'upload') {
    if (
      props.node.value
      && typeof props.node.value.mimeType === 'string'
      && props.node.value.mimeType.startsWith('image/')
    ) {
      return ImageNode
    }
    // TODO: Add a generic file node for other upload types if needed
    return ParagraphNode
  }
  switch (props.node.type) {
    case 'heading':
      return HeadingNode
    case 'paragraph':
      return ParagraphNode
    case 'list':
      return ListNode
    case 'listitem':
      return ListItemNode
    case 'text':
      return TextNode
    case 'link':
      return LinkNode
    case 'image':
      return ImageNode
    case 'code':
      return CodeNode
    case 'quote':
      return QuoteNode
    case 'horizontalrule':
      return DividerNode
    default:
      return ParagraphNode
  }
})
</script>

<template>
  <component
    :is="component"
    :node="node.type === 'upload' && component === ImageNode ? { ...node.value, direction: node.direction } : node"
  />
</template>
