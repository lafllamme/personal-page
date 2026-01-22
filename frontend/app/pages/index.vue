<script setup lang="ts">
import GlassMetaballs from '@/components/Three/Glass/GlassMetaballs.vue'
import PageBleed from '@/components/ui/Partials/PageContainer/PageBleed.vue'
import HorizontalScroll from '@/components/ui/Scroll/HorizontalScroll/HorizontalScroll.vue'

useHead({
  title: 'Liquid Symmetry',
})
const headlineFontClass = 'zalando-sans-expanded'
const sublineFontClass = 'font-baskerville'
</script>

<template>
  <section class="touch-pan-y">
    <PageBleed>
      <section class="relative min-h-[100svh] flex items-start justify-center px-8 pb-24 pt-32">
        <div class="pointer-events-none absolute bottom-0 left-0 right-0 z-0 mx-[calc(50%-50vw)] h-[calc(100%+var(--header-height,0px))] w-screen overflow-visible -top-[var(--header-height,0px)]">
          <GlassMetaballs controls-mode="fixed" class="h-full w-full" />
        </div>

        <h1 class="relative z-10 whitespace-nowrap text-center text-[clamp(3.5rem,10vw,9rem)] color-pureBlack uppercase dark:color-pureWhite">
          <span :class="headlineFontClass" class="block font-semibold">Web evolves.</span>
          <span :class="sublineFontClass" class="block color-pureBlack/85 italic dark:color-pureWhite/85">We track it.</span>
        </h1>

        <div class="absolute bottom-24 left-1/2 z-10 flex flex-col items-center gap-2 -translate-x-1/2">
          <span class="font-clash-regular text-xs color-gray-10 font-light tracking-widest uppercase">SCROLL</span>
          <div class="h-12 w-px from-gray-6 to-transparent bg-gradient-to-b dark:from-gray-9" />
        </div>
      </section>
    </PageBleed>
    <HorizontalScroll />
  </section>
</template>
