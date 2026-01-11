<script setup lang="ts">
import type { CaveTunnelProps } from '@/components/Three/CaveTunnel/CaveTunnel.model'
import { caveTunnelDefaults } from '@/components/Three/CaveTunnel/CaveTunnel.model'
import CaveTunnel from '@/components/Three/CaveTunnel/CaveTunnel.vue'
import CaveTunnelControls from '@/components/Three/CaveTunnel/CaveTunnelControls.vue'

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

const showControls = ref(true)
</script>

<template>
  <div
    class="relative min-h-screen overflow-hidden text-pureWhite"
    :style="{ backgroundColor: caveSettings.bgColor }"
  >
    <CaveTunnel v-bind="caveSettings" class="absolute inset-0" />

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

    <div
      class="pointer-events-auto fixed right-6 top-1/2 z-20 max-h-[85vh] w-[min(420px,calc(100%-2rem))] overflow-y-auto transition-all duration-300 -translate-y-1/2" :class="[
        showControls ? 'opacity-100 translate-x-0' : 'pointer-events-none opacity-0 translate-x-8',
      ]"
    >
      <CaveTunnelControls v-model="caveSettings" />
    </div>

    <button
      class="border-white/40 bg-white/80 text-slate-900 hover:bg-white pointer-events-auto fixed bottom-6 right-6 z-30 border rounded-full px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase shadow-lg backdrop-blur transition"
      type="button"
      @click="showControls = !showControls"
    >
      {{ showControls ? 'Hide controls' : 'Show controls' }}
    </button>
  </div>
</template>
