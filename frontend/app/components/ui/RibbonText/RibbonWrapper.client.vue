<script lang="ts" setup>
import type {RibbonTextProps} from './RibbonText.model'
import {RibbonTextDefaultProps} from './RibbonText.model'
import RibbonText from './RibbonText.vue'

const props = withDefaults(defineProps<RibbonTextProps>(), RibbonTextDefaultProps)
const emit = defineEmits<{ (e: 'ready'): void }>()
const attrs = useAttrs()
const ribbonHeight = computed(() => ({
  height: props.height ? props.height : '100%',
  width: '100%',
}))
</script>

<template>
  <div v-bind="attrs">
    <ClientOnly>
      <RibbonText
          v-bind="props"
          :style="ribbonHeight"
          @ready="emit('ready')"
      />
    </ClientOnly>
  </div>
</template>
