<script setup lang="ts">
import type { CaveTunnelProps } from './CaveTunnel.model'
import { useVModel } from '@vueuse/core'
import { caveTunnelDefaults } from './CaveTunnel.model'

const props = defineProps<{
  modelValue: CaveTunnelProps
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: CaveTunnelProps): void
}>()

const state = useVModel(props, 'modelValue', emit, { deep: true, passive: true })

function resetControls() {
  state.value = { ...caveTunnelDefaults }
}
</script>

<template>
  <div
    data-lenis-prevent
    class="bg-white/80 border-black/5 dark:bg-black/50 dark:border-white/10 border rounded-2xl p-4 shadow-xl backdrop-blur"
  >
    <div class="mb-4 flex items-center justify-between gap-4">
      <div>
        <p class="text-sm text-muted-foreground font-semibold tracking-wide">
          Cave Tunnel Controls
        </p>
        <p class="text-xs text-muted-foreground/70">
          Match the original params while you tune
        </p>
      </div>
      <button
        class="text-xs text-primary tracking-widest uppercase"
        type="button"
        @click="resetControls"
      >
        Reset
      </button>
    </div>

    <div class="grid gap-4">
      <div class="grid gap-2">
        <label class="text-xs text-muted-foreground font-semibold">
          Speed: {{ state.speed.toFixed(1) }}
        </label>
        <input v-model.number="state.speed" type="range" min="0" max="50" step="0.1">
      </div>

      <div class="grid gap-2 md:grid-cols-3">
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Noise Scale
          <input v-model.number="state.scale" type="range" min="10" max="150" step="1">
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Height
          <input v-model.number="state.heightMultiplier" type="range" min="1" max="20" step="0.1">
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Detail
          <input v-model.number="state.detailStrength" type="range" min="0" max="1" step="0.01">
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Valley Width
          <input v-model.number="state.valleyWidth" type="range" min="5" max="50" step="0.5">
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Fog Density
          <input v-model.number="state.fogDensity" type="range" min="0" max="0.1" step="0.0005">
        </label>
      </div>

      <div class="grid gap-2 md:grid-cols-3">
        <label class="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
          <input v-model="state.showCeiling" type="checkbox" class="accent-black dark:accent-white">
          Show Ceiling
        </label>
        <label class="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
          <input v-model="state.flatShading" type="checkbox" class="accent-black dark:accent-white">
          Flat Shading
        </label>
        <label class="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
          <input v-model="state.wireframe" type="checkbox" class="accent-black dark:accent-white">
          Wireframe
        </label>
      </div>

      <div class="grid gap-2">
        <label class="text-xs text-muted-foreground font-medium tracking-widest uppercase">
          Colors
        </label>
        <div class="grid grid-cols-3 gap-2">
          <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
            Background
            <input v-model="state.bgColor" type="color" class="border-black/10 h-10 w-full cursor-pointer border rounded bg-transparent p-0">
          </label>
          <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
            Ground
            <input v-model="state.groundColor" type="color" class="border-black/10 h-10 w-full cursor-pointer border rounded bg-transparent p-0">
          </label>
          <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
            Ceiling
            <input v-model="state.ceilingColor" type="color" class="border-black/10 h-10 w-full cursor-pointer border rounded bg-transparent p-0">
          </label>
        </div>
      </div>

      <div class="grid gap-2 md:grid-cols-2">
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Ambient Intensity
          <input v-model.number="state.ambientInt" type="range" min="0" max="3" step="0.05">
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Camera Light Intensity
          <input v-model.number="state.camLightInt" type="range" min="0" max="3" step="0.05">
        </label>
      </div>
    </div>
  </div>
</template>
