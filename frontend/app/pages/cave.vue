<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import CaveTunnel from '@/components/Three/CaveTunnel/CaveTunnel.vue'
import CaveTunnelControls from '@/components/Three/CaveTunnel/CaveTunnelControls.vue'
import { caveTunnelDefaults, type CaveTunnelProps } from '@/components/Three/CaveTunnel/CaveTunnel.model'

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

const caveSettings = useLocalStorage<CaveTunnelProps>(
  'cave-tunnel-settings',
  { ...caveTunnelDefaults },
  { deep: true },
)

const showControls = ref(true)
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-[#0b0f14] text-pureWhite">
    <CaveTunnel v-bind="caveSettings" class="absolute inset-0" />

    <div class="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col gap-4 px-6 py-16">
      <p class="text-xs uppercase tracking-[0.4em] text-pureWhite/70">
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
      :class="[
        'pointer-events-auto fixed z-20 w-[min(420px,calc(100%-2rem))] max-h-[85vh] overflow-y-auto transition-all duration-300',
        'right-6 top-1/2 -translate-y-1/2',
        showControls ? 'opacity-100 translate-x-0' : 'pointer-events-none opacity-0 translate-x-8',
      ]"
    >
      <CaveTunnelControls v-model="caveSettings" />
    </div>

    <button
      class="pointer-events-auto fixed right-6 bottom-6 z-30 rounded-full border border-white/40 bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900 shadow-lg backdrop-blur transition hover:bg-white"
      type="button"
      @click="showControls = !showControls"
    >
      {{ showControls ? 'Hide controls' : 'Show controls' }}
    </button>
  </div>
</template>
