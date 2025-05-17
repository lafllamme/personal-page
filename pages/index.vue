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
  <!-- 1) Main Container -->
  <div
    class="bg-pureWhite h-svh dark:bg-pureBlack"
  >
    <!-- 2) center & gutter vertical breathing room -->
    <div
      class="flex flex-col items-center justify-center px-4 pt-20 md:flex-row"
    >
      <!-- Circle Wrapper -->
      <div class="mx-auto max-w-[600px] w-full md:order-last md:max-w-[60rem] md:w-1/2 md:px-12">
        <div
          :class="useClsx(renderBackground ? 'bg-mint-8' : 'bg-mint-1')"
          class="relative aspect-square w-full overflow-hidden rounded-full transition-colors duration-[2000ms] ease-in-out"
        >
          <Spline
            :on-load="handleLoad"
            :scene="sceneUrl"
            render-on-demand
          />
        </div>
      </div>

      <!-- Text Wrapper -->
      <div class="w-full pt-6 text-center md:w-1/2 space-y-2 md:px-6 md:text-left">
        <h1
          :class="useClsx(
            'geist-regular text-[8vw] animate-clip-circle',
            'dark:text-pureWhite !font-bold',
            'text-pureBlack leading-tight tracking-tighter antialiased',
          )"
        >
          The Future of Tech is Here
        </h1>
        <p class="text-md text-gray-10 font-300 md:text-justify lg:text-3xl md:text-2xl sm:text-lg">
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
@keyframes clipPathCircle {
  0% {
    clip-path: circle(0% at 50% 50%);
  }
  100% {
    clip-path: circle(75% at 50% 50%);
  }
}

.animate-clip-circle {
  animation: clipPathCircle 3.2s cubic-bezier(0.77, 0, 0.175, 1) forwards;
}

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
