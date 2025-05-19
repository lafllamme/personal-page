<script lang="ts" setup>
import Spline from '@/components/ui/Background/Spline/Spline.vue'
import InteractiveButton from '@/components/ui/Buttons/InteractiveButton/InteractiveButton.vue'
import RippleButton from '@/components/ui/Buttons/RippleButton/RippleButton.vue'
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

const animate = ref(false)

onMounted(() => {
  setTimeout(() => {
    animate.value = true
  }, 1000)
})
</script>

<template>
  <div
    class="ease-[cubic-bezier(0.33,1,0.68,1) bg-pureWhite transition-colors duration-900 h-svh dark:bg-pureBlack"
  >
    <!-- 2) center & gutter vertical breathing room -->
    <div
      class="flex flex-col items-center justify-center px-4 pt-20 md:flex-row"
    >
      <!-- Circle Wrapper -->
      <div class="mx-auto max-w-[450px] w-full md:order-last md:max-w-[800px] md:w-1/2">
        <div
          :class="useClsx(renderBackground ? 'bg-mint-8' : 'bg-mint-1')"
          class="ease-[cubic-bezier(0.33,1,0.68,1) relative aspect-square w-full touch-none overflow-hidden rounded-full transition-colors transition-colors duration-[2000ms] duration-900 ease-in-out"
        >
          <Spline
            :on-load="handleLoad"
            :scene="sceneUrl"
            render-on-demand
          />
        </div>
      </div>

      <!-- Text Wrapper -->
      <div class="w-full pt-6 text-center md:w-1/2 space-y-4 md:px-6 md:text-left md:space-y-8">
        <h1
          :class="useClsx(
            'geist-regular text-[8vw] lg:text-[10vh] 2xl:text-[12vh] animate-clip-circle',
            'dark:text-pureWhite !font-bold',
            'text-pureBlack leading-tight tracking-tighter antialiased',
          )"
        >
          The Future of Tech is Here
        </h1>
        <TextGenerate
          :delay="0.8"
          :duration="1.1"
          class="text-md text-gray-10 font-300 md:text-justify lg:text-3xl md:text-2xl sm:text-lg"
          words="Exploring the cutting edge of technology, AI, and development. Stay ahead with insights from industry experts."
        />
        <div
          :class="useClsx(
            'transition-colors duration-900 ease-[cubic-bezier(0.33,1,0.68,1)',
            'dark:bg-pureBlack lg:text-xl sm:text-lg',
            'bg-pureWhite !my-8 lg:!my-16 !min-w-3/4 md:justify-start',
            'text-md flex justify-center gap-4 whitespace-nowrap',
            animate ? 'opacity-100 animate-fade-in' : 'opacity-0',
          )"
        >
          <InteractiveButton
            text="Latest Articles"
          />
          <RippleButton
            text="Subscribe to us"
          />
        </div>
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
