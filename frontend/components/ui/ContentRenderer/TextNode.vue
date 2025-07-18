<template>
  <span v-if="!isSuper && !isSub" :class="classes" :style="node.style">
    {{ node.text }}
  </span>
  <sup v-else-if="isSuper" :class="classes" :style="node.style">
    {{ node.text }}
  </sup>
  <sub v-else :class="classes" :style="node.style">
    {{ node.text }}
  </sub>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ node: any }>()
const f = props.node.format || 0
const isSuper = computed(() => Boolean(f & 64))
const isSub = computed(() => Boolean(f & 32))
const classes = computed(() => ({
  'font-bold': f & 1,
  italic: f & 2,
  underline: f & 4,
  'line-through': f & 8,
  'font-mono bg-gray-100 px-1 rounded': f & 16,
}))
</script> 