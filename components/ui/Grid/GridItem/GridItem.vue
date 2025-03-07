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
        'justify-between flex flex-col space-y-4 row-span-1 rounded-xl',
        'transition-colors duration-900 ease-[cubic-bezier(0.77,0,0.18,1)]',
        'group/bento  transition duration-200  border border-transparent',
        'dark:shadow-none p-4 bg-pureWhite dark:bg-pureBlack dark:border-pureWhite/[0.2]',
        'focus:outline-none focus:ring-4  focus:ring-pureBlack dark:focus:ring-pureWhite',
        'hover:shadow-[rgba(0,0,0,0.19)_0px_10px_20px,rgba(0,0,0,0.23)_0px_6px_6px] hover:dark:shadow-[rgba(255,255,255,0.15)_0px_10px_20px,rgba(255,255,255,0.2)_0px_6px_6px]',
        props.class,
      )
    "
    tabindex="0"
  >
    <slot name="header" />
    <div class="transition duration-200 group-hover/bento:translate-x-2">
      <slot name="icon" />
      <div class="my-2 color-pureBlack font-bold font-sans dark:color-pureWhite">
        <slot name="title" />
      </div>
      <div class="text-xs color-pureBlack font-normal font-sans dark:color-pureWhite">
        <slot name="description" />
      </div>
    </div>
  </div>
</template>
