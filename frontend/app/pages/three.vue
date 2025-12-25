<script setup lang="ts">
import RibbonDebug from '~/components/ui/RibbonDebug/RibbonDebug.vue'

useHead({
  title: 'Ribbon Debug',
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-pureBlack text-pureWhite">
    <div class="pointer-events-none absolute left-4 top-4 z-20 space-y-1">
      <p class="text-xs text-pureWhite/60 tracking-[0.2em] font-mono uppercase">
        Debug
      </p>
      <h1 class="font-prata text-4xl font-bold">
        Ribbon Playground
      </h1>
      <p class="max-w-2xl text-pureWhite/70">
        Single ribbon in 3D with sine-wave motion for tuning.
      </p>
    </div>
    <RibbonDebug full />
  </div>
</template>
