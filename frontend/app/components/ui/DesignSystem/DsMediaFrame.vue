<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = withDefaults(defineProps<{
  src?: string
  alt?: string
  ratio?: '16/9' | '4/3' | '3/2' | '1/1'
  caption?: string
}>(), {
  src: '',
  alt: '',
  ratio: '16/9',
  caption: '',
})

const { src, alt, ratio, caption } = toRefs(props)

const ratioClass = computed(() => {
  const map = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '1/1': 'aspect-square',
  } as const
  return map[ratio.value]
})
</script>

<template>
  <figure class="grid gap-2">
    <div class="overflow-hidden border border-pureBlack/14 rounded-lg border-solid dark:border-pureWhite/14" :class="ratioClass">
      <img
        v-if="src"
        :src="src"
        :alt="alt"
        class="h-full w-full object-cover"
      >
      <div v-else class="h-full w-full flex items-center justify-center bg-pureBlack/6 text-xs opacity-70 dark:bg-pureWhite/8">
        media placeholder
      </div>
    </div>
    <figcaption
      v-if="caption"
      class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-70"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>
