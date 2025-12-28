<script setup lang="ts">
import type { RibbonTextProps } from './RibbonText.model'
import { RibbonTextDefaultProps } from './RibbonText.model'
import RibbonText from './RibbonText.vue'

const props = withDefaults(defineProps<RibbonTextProps>(), RibbonTextDefaultProps)
const emit = defineEmits<{ (e: 'ready'): void }>()
</script>

<template>
  <RibbonText
    v-bind="props"
    @ready="emit('ready')"
  />
</template>
