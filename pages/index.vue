<script lang="ts" setup>
import Spline from '@/components/ui/Background/Spline/Spline.vue'
import TextGenerate from '@/components/ui/Text/TextGenerate/TextGenerate.vue'

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
const sceneLoaded = ref(false)
const renderBackground = ref(false)

function handleLoad() {
  sceneLoaded.value = true
}

watch(sceneLoaded, (v) => {
  consola.debug('[Index] Scene loaded ?', v)
  if (v) {
    setTimeout(() => {
      renderBackground.value = true
    }, 1000)
  }
})
</script>

<template>
  <!-- 1) push everything down by header’s height -->
  <div
    class="bg-pureWhite h-svh dark:bg-pureBlack"
  >
    <!-- 2) center & gutter vertical breathing room -->
    <div
      class="flex flex-col items-center justify-center pt-20"
    >
      <!-- 3) “perfect circle” box -->
      <div
        :class="useClsx(renderBackground ? 'bg-mint-8' : 'bg-mint-1')"
        class="relative aspect-square w-screen overflow-hidden rounded-full transition-colors duration-[2000ms] ease-in-out"
      >
        <Spline
          :on-load="handleLoad"
          :scene="sceneUrl"
          render-on-demand
        />
      </div>
      <div class="pt-6 text-center space-y-2">
        <h1
          :class="useClsx(
            'geist-regular text-4xl px-3',
            'dark:text-pureWhite !font-bold',
            'text-pureBlack leading-tight tracking-tighter antialiased',
          )"
        >
          The Future of Tech is Here
        </h1>
        <p class="text-gray-10 font-300">
          <TextGenerate
            :delay="0.8"
            :duration="1.1"
            words="Exploring the cutting edge of technology, AI, and development. Stay ahead with insights from industry experts."
          />
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slide-in-bck-center {
  0% {
    transform: translateZ(600px);
    opacity: 0;
  }
  100% {
    transform: translateZ(0);
    opacity: 1;
  }
}

.slide-in-bck-center {
  -webkit-animation: slide-in-bck-center 2.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-bck-center 2.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
</style>
