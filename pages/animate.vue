<script lang="ts" setup>
import Spline from '@/components/ui/Background/Spline/Spline.vue'

const sceneUrl = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'
definePageMeta({
  layout: 'custom',
})

useHead({
  title: 'TecNews – Animation News',
  meta: [
    { name: 'description', content: 'Read about latest news in animations with style.' },
    { name: 'keywords', content: 'animation, news, latest, style, TecNews' },
  ],
})
</script>

<template>
  <div class="relative w-full overflow-hidden">
    <div class="flex bg-pureWhite transition-colors duration-300 ease-in-out h-svh dark:bg-pureBlack">
      <Spline
        :scene="sceneUrl"
        class="mt-20 size-full rounded-full bg-mint-8 dark:bg-mint-8"
      />
    </div>
  </div>
</template>
