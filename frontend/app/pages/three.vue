<script setup lang="ts">
import RibbonWrapper from '~/components/ui/RibbonText/RibbonWrapper.client.vue'

useHead({
  title: 'Ribbon Text',
})
</script>

<template>
  <div class="text-pureBlack dark:text-pureWhite">
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
    <RibbonWrapper
        :show-background="false"
        :style="{ height: '90dvh'}"
    />
  </div>
</template>
