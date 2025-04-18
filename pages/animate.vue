<script lang="ts" setup>
import Spline from '@/components/ui/Background/Spline/Spline.vue'

const sceneUrl = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'
</script>

<template>
  <div class="relative w-full overflow-hidden rounded-lg bg-pureWhite/96 pt-20 dark:bg-pureBlack/96">
    <div
      class="font-heading text-pureblack absolute w-full flex flex-col items-center justify-center gap-2 p-8 text-center dark:text-pureWhite"
    >
      <span class="text-4xl font-semibold"> TecNew </span>
      <span class="font-light font-sans">Read about latest news in animations with style.</span>
    </div>
    <div class="flex">
      <Spline
        :scene="sceneUrl"
        class="mt-24 size-full"
      />
    </div>
  </div>
</template>
