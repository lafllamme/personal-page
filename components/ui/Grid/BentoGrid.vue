<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="
      useClsx(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 grid-flow-dense md:auto-rows-[18rem] gap-4 max-w-full py-6 px-12 mx-auto',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
