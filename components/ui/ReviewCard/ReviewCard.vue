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
      'relative w-48 sm:w-64 md:w-80 lg:w-92 cursor-pointer',
      'border border-solid border-gray-3A bg-gray-1A hover:bg-gray-3A dark:bg-gray-2A dark:hover:bg-gray-4A ',
      'rounded-xl p-2 sm:p-4 md:p-6 overflow-hidden',
    )"
    tabindex="0"
  >
    <div class="flex flex-row items-center gap-2">
      <img
        :src="img"
        alt="example"
        class="h-6 w-6 rounded-full lg:h-12 lg:w-12 md:h-10 md:w-10 sm:h-7 sm:w-7"
      >
      <div class="flex flex-col">
        <span
          class="geist-regular text-[8px] text-pureBlack font-medium lg:text-base md:text-sm sm:text-xs dark:text-pureWhite"
        >
          {{ name }}
        </span>
        <p class="geist-regular text-[8px] text-pureBlack/40 font-medium lg:text-base md:text-sm sm:text-[10px] dark:text-pureWhite/40">
          {{ username }}
        </p>
      </div>
    </div>
    <blockquote
      class="geist-regular mt-2 text-[10px] text-pureBlack/80 md:mt-4 lg:text-base md:text-sm sm:text-xs dark:text-pureWhite/80"
    >
      {{ body }}
    </blockquote>
  </figure>
</template>
