<script lang="ts" setup>
import type { ScrollWordProps } from './ScrollWord.model'
import { ScrollWordPropsDefaults } from './ScrollWord.model'

const props = withDefaults(defineProps<ScrollWordProps>(), ScrollWordPropsDefaults)

const { word, progress, range } = toRefs(props)

const computedOpacity = computed(() => {
  const [start, end] = range.value

  // Calculate opacity based on the progress and range
  if (progress.value < start!)
    return 0
  if (progress.value > end!)
    return 1

  // Linear interpolation for opacity between 0 and 1
  return (progress.value - start!) / (end! - start!)
})
</script>

<template>
  <span class="xl:lg-3 relative mx-1 lg:mx-2.5">
    <span class="absolute opacity-30 dark:opacity-70">{{ word }}</span>
    <span
      :style="{ opacity: computedOpacity }"
      class="text-pureBlack dark:text-pureWhite"
    >
      {{ word }}
    </span>
  </span>
</template>
