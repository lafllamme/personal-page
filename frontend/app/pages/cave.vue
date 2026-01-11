<script setup lang="ts">
import type { CaveTunnelProps } from '@/components/Three/CaveTunnel/CaveTunnel.model'
import { caveTunnelDefaults } from '@/components/Three/CaveTunnel/CaveTunnel.model'
import CaveTunnel from '@/components/Three/CaveTunnel/CaveTunnel.vue'

definePageMeta({
  layout: 'empty',
})

useHead({
  title: 'Cave Tunnel',
  meta: [
    {
      name: 'description',
      content: 'TresJS cave tunnel port with live controls.',
    },
  ],
})

const caveSettings = ref<CaveTunnelProps>({ ...caveTunnelDefaults })
</script>

<template>
  <div
    class="relative min-h-screen overflow-hidden text-pureWhite"
    :style="{ backgroundColor: caveSettings.bgColor }"
  >
    <CaveTunnel v-model="caveSettings" class="absolute inset-0" />

    <div class="relative z-10 mx-auto max-w-5xl min-h-screen flex flex-col gap-4 px-6 py-16">
      <p class="text-xs text-pureWhite/70 tracking-[0.4em] uppercase">
        Cave
      </p>
      <h1 class="text-4xl font-semibold leading-tight md:text-6xl">
        Cave Tunnel
      </h1>
      <p class="max-w-2xl text-sm text-pureWhite/70 md:text-base">
        Adjust speed, terrain, and atmosphere to match the original tunnel generator.
      </p>
    </div>
  </div>
</template>
