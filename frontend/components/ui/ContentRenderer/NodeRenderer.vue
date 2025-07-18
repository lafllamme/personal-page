<template>
  <component :is="component" :node="node" />
</template>

<script setup lang="ts">
import HeadingNode from './HeadingNode.vue'
import ParagraphNode from './ParagraphNode.vue'
import ListNode from './ListNode.vue'
import ListItemNode from './ListItemNode.vue'
import TextNode from './TextNode.vue'
import LinkNode from './LinkNode.vue'
import ImageNode from './ImageNode.vue'
import CodeNode from './CodeNode.vue'
import QuoteNode from './QuoteNode.vue'
import { computed } from 'vue'

const props = defineProps<{ node: any }>()

const component = computed(() => {
  switch (props.node.type) {
    case 'heading': return HeadingNode
    case 'paragraph': return ParagraphNode
    case 'list': return ListNode
    case 'listitem': return ListItemNode
    case 'text': return TextNode
    case 'link': return LinkNode
    case 'image': return ImageNode
    case 'code': return CodeNode
    case 'quote': return QuoteNode
    default: return ParagraphNode
  }
})
</script> 