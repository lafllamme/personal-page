<script lang="ts" setup>
interface Props {
  img: string
  name: string
  username: string
  body: string
}

defineProps<Props>()
</script>

<template>
  <figure
    :class="useClsx(
      'relative w-64 cursor-pointer',
      'border border-solid border-gray-3A bg-gray-2A hover:bg-gray-1A',
      'rounded-xl p-4 overflow-hidden',
    )"
  >
    <div class="flex flex-row items-center gap-2">
      <img
        :src="img"
        alt="example"
        class="rounded-full"
        height="32"
        width="32"
      >
      <div class="flex flex-col">
        <span class="geist-regular text-sm text-pureBlack font-medium dark:text-pureWhite">
          {{ name }}
        </span>
        <p class="geist-regular text-xs text-pureBlack/40 font-medium dark:text-pureWhite/40">
          {{ username }}
        </p>
      </div>
    </div>
    <blockquote
      class="geist-regular mt-2 text-sm text-pureBlack/80 dark:text-pureWhite/80"
    >
      {{ body }}
    </blockquote>
  </figure>
</template>
