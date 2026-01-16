<script setup lang="ts">
import type { PageContainerGutter, PageContainerTag } from './PageContainer.model'
import { toRefs } from 'vue'
import { PageContainerBleedClasses, PageContainerDefaults } from './PageContainer.model'

const props = withDefaults(defineProps<{
  as?: PageContainerTag
  gutter?: PageContainerGutter
}>(), {
  as: 'div',
  gutter: PageContainerDefaults.gutter,
})

const { as: tag, gutter } = toRefs(props)
</script>

<template>
  <component
    :is="tag"
    :class="useClsx(
      'relative',
      PageContainerBleedClasses[gutter],
    )"
  >
    <slot name="default" />
  </component>
</template>
