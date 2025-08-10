<script lang="ts" setup>
import type { ScrollWordProps } from './ScrollWord.model'
import { ScrollWordPropsDefaults } from './ScrollWord.model'

const props = withDefaults(defineProps<ScrollWordProps>(), ScrollWordPropsDefaults)
const { word, opacity, activeClass } = toRefs(props)
</script>

<template>
  <span class="relative mx-1 lg:mx-2.5">
    <span class="absolute opacity-30">{{ word }}</span>
    <span :class="activeClass" :style="{ '--o': String(opacity) }">
      {{ word }}
    </span>
  </span>
</template>
