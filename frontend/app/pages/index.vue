<script setup lang="ts">
import Issues from '@/components/Issues.vue'
import GlassMetaballs from '@/components/Three/Glass/GlassMetaballs.vue'
import HorizontalScroll from '@/components/ui/Scroll/HorizontalScroll/HorizontalScroll.vue'

useHead({
  title: 'Liquid Symmetry',
})
const headlineFontClass = 'zalando-sans-expanded'
const sublineFontClass = 'font-baskerville'
</script>

<template>
  <!-- outer: kein touch-pan-y mehr -->
  <section>
    <section class="relative min-h-[100svh] flex items-center justify-center md:items-start md:pt-32">
      <!-- three wrapper: touch-none, damit pointer moves nicht vom Browser als scroll gesture gekapert werden -->
      <div
        class="absolute z-0 h-[calc(100%+var(--header-height,0px))] w-screen touch-none -top-[var(--header-height,0px)]"
      >
        <GlassMetaballs controls-mode="fixed" class="h-full w-full" />
      </div>

      <h1 class="relative z-10 text-center text-[clamp(2.6rem,9vw,4.8rem)] color-pureBlack uppercase md:mt-32 xl:mt-0 md:whitespace-nowrap md:text-[clamp(3.5rem,10vw,9rem)] dark:color-pureWhite <sm:-mt-12">
        <span :class="headlineFontClass" class="block font-semibold <sm:text-[clamp(3.4rem,11vw,6rem)]">Web evolves.</span>
        <span :class="sublineFontClass" class="block color-pureBlack/85 italic <sm:text-[clamp(2.2rem,7vw,3.8rem)] dark:color-pureWhite/85">We track it.</span>
      </h1>

      <div class="absolute bottom-24 left-1/2 z-10 flex flex-col items-center gap-2 -translate-x-1/2">
        <span class="font-clash-regular text-xs color-gray-10 font-light tracking-widest uppercase">SCROLL</span>
        <div class="h-12 w-px from-gray-6 to-transparent bg-gradient-to-b dark:from-gray-9" />
      </div>
    </section>

    <!-- horizontal scroll wrapper: nur hier touch-pan-y, damit vertikales scrollen sauber bleibt -->
    <section class="touch-pan-y">
      <HorizontalScroll />
    </section>

    <Issues />
  </section>
</template>
