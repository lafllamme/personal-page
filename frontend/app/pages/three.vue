<script setup lang="ts">
import RibbonDebug from '~/components/ui/RibbonDebug/RibbonDebug.vue'

useHead({
  title: 'Ribbon Debug',
})
</script>

<template>
  <div class="min-h-screen bg-pureBlack text-pureWhite">
    <div class="mx-auto w-full max-w-6xl px-4 py-10 space-y-6">
      <div class="space-y-2">
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-pureWhite/60">Debug</p>
        <h1 class="font-prata text-4xl font-bold">Ribbon Playground</h1>
        <p class="text-pureWhite/70 max-w-2xl">
          Single ribbon in 3D with sine-wave motion for tuning.
        </p>
      </div>

      <div class="relative left-1/2 w-screen -translate-x-1/2">
        <RibbonDebug full />
      </div>
    </div>
  </div>
</template>
