<script setup lang="ts">
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import MeshGradient from '@/components/ui/Background/MeshGradient/MeshGradient.vue'
import MeshGradientControls from '@/components/ui/Background/MeshGradient/MeshGradientControls.vue'
import { meshGradientDefaults, type MeshGradientProps } from '@/components/ui/Background/MeshGradient/MeshGradient.model'

definePageMeta({
  layout: 'empty',
})

useHead({
  title: 'Gradient Playground',
  meta: [
    {
      name: 'description',
      content: 'Experiment with the MeshGradient background shader.',
    },
  ],
})

const gradientSettings = useLocalStorage<MeshGradientProps>(
  'mesh-gradient-playground',
  { ...meshGradientDefaults },
  { deep: true },
)

const showControls = ref(true)
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-transparent text-pureBlack dark:text-pureWhite">
    <MeshGradient v-bind="gradientSettings" />

    <div class="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 py-16 text-center md:px-8 md:pl-[420px] md:text-left">
      <div class="flex flex-col gap-4">
        <p class="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Shader playground
        </p>
        <h1 class="text-4xl font-semibold leading-tight md:text-6xl">
          Mesh Gradient
        </h1>
        <p class="text-md max-w-3xl text-muted-foreground md:text-lg">
          Dieses Panel spiegelt die <code class="rounded bg-black/20 px-1 py-0.5">ShaderGradient</code> Props. Drehe an den Reglern, teste Presets und kopiere die Werte direkt in deine Komponenten.
        </p>
      </div>
    </div>

    <div
      :class="[
        'pointer-events-auto fixed z-20 w-[min(420px,calc(100%-2rem))] max-h-[85vh] overflow-y-auto transition-all duration-300',
        'left-1/2 -translate-x-1/2 bottom-24 md:left-6 md:top-1/2 md:bottom-auto md:w-[360px] md:-translate-y-1/2 md:translate-x-0',
        showControls ? 'opacity-100 translate-y-0 md:translate-x-0' : 'pointer-events-none opacity-0 translate-y-6 md:-translate-x-10',
      ]"
    >
      <MeshGradientControls v-model="gradientSettings" />
    </div>

    <button
      class="pointer-events-auto fixed left-1/2 bottom-6 z-30 -translate-x-1/2 rounded-full border border-white/40 bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900 shadow-lg backdrop-blur transition hover:bg-white md:left-6 md:translate-x-0"
      type="button"
      @click="showControls = !showControls"
    >
      {{ showControls ? 'Hide controls' : 'Show controls' }}
    </button>
  </div>
</template>
