<script setup lang="ts">
import type { PageContainerProps } from './PageContainer.model'
import { toRefs } from 'vue'
import {
  PageContainerDefaults,
  PageContainerGutterClasses,
  PageContainerMaxClasses,
} from './PageContainer.model'

const props = withDefaults(defineProps<PageContainerProps>(), PageContainerDefaults)
const { as: tag, max, gutter, bleed } = toRefs(props)
</script>

<template>
  <component
    :is="tag"
    :class="useClsx(
      'w-full relative',
      !bleed && PageContainerMaxClasses[max],
      !bleed && PageContainerGutterClasses[gutter],
    )"
  >
    <slot name="default" />
  </component>
</template>
