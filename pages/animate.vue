<script lang="ts" setup>
import Spline from '@/components/ui/Background/Spline/Spline.vue'

const sceneUrl = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'
definePageMeta({
  layout: 'custom',
  title: 'TecNews - Animation News',
  meta: [
    {
      name: 'description',
      content: 'Read about latest news in animations with style.',
    },
    {
      name: 'keywords',
      content: 'animation, news, latest, style, TecNews',
    },
  ],
})
</script>

<template>
  <div class="relative w-full overflow-hidden rounded-lg bg-pureWhite/96 pt-20 dark:bg-pureBlack/96">
    <div
      class="font-heading text-pureblack absolute w-full flex flex-col items-center justify-center gap-2 p-8 text-center dark:text-pureWhite"
    >
      <span class="geist-regular text-4xl !font-bold">TecNews</span>
      <span class="font-light font-mono font-sans">Read about latest news in animations with style.</span>
    </div>
    <div class="flex">
      <Spline
        :scene="sceneUrl"
        class="mt-24 size-full"
      />
    </div>
  </div>
</template>
