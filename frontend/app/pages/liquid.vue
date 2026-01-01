<script setup lang="ts">
import LiquidSymmetrySphere from '@/components/Three/LiquidSymmetrySphere/LiquidSymmetrySphere.vue'

useHead({
  title: 'Liquid Symmetry',
})
</script>

<template>
  <main class="min-h-screen">
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0">
        <LiquidSymmetrySphere />
      </div>
      <div class="relative z-10 px-4 text-center">
        <h1 class="mb-4 text-balance text-6xl color-pureBlack font-bold md:text-8xl dark:color-pureWhite">
          UNFETTERED
          <br>
          <span class="font-serif italic">KNOWLEDGE</span>
        </h1>
        <button class="mt-8 border border-pureWhite/30 border-solid px-8 py-3 color-pureBlack transition-colors hover:bg-pureWhite/10 dark:color-pureWhite">
          ENTER ARCHIVE
        </button>
      </div>
    </section>
  </main>
</template>
