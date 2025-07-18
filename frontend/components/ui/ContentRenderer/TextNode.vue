<template>
  <span :class="classes" :style="node.style">
    {{ node.text }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ node: any }>()
const f = props.node.format || 0
const classes = computed(() => ({
  'font-bold': f & 1,
  italic: f & 2,
  underline: f & 4,
  'line-through': f & 8,
  'font-mono bg-gray-100 px-1 rounded': f & 16,
}))
</script> 