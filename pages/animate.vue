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
  <!-- 1) push everything down by header’s height -->
  <div class="bg-pureWhite p-16 h-svh dark:bg-pureBlack">
    <!-- 2) center & gutter vertical breathing room -->
    <div class="flex justify-center">
      <!-- 3) “perfect circle” box -->
      <div
        class="relative aspect-square max-w-6xl w-full overflow-hidden rounded-full bg-mint-8 dark:bg-mint-8"
      >
        <Spline
          :scene="sceneUrl"
          class="h-full w-full"
        />
      </div>
    </div>
  </div>
</template>
