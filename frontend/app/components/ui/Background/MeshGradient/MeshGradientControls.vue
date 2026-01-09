<script setup lang="ts">
import type { MeshGradientAnimate, MeshGradientEnvPreset, MeshGradientGrainState, MeshGradientLightType, MeshGradientLoopMode, MeshGradientProps, MeshGradientRangeMode, MeshGradientType } from './MeshGradient.model'
import {

  meshGradientDefaults,

} from './MeshGradient.model'

const props = defineProps<{
  modelValue: MeshGradientProps
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: MeshGradientProps): void
}>()

const state = reactive<MeshGradientProps>({
  ...meshGradientDefaults,
  ...props.modelValue,
})

watch(
  () => props.modelValue,
  (value) => {
    Object.assign(state, meshGradientDefaults, value)
  },
  { deep: true },
)

watch(
  state,
  () => {
    emit('update:modelValue', { ...state })
  },
  { deep: true },
)

const typeOptions: MeshGradientType[] = ['sphere', 'plane', 'waterPlane']
const animateOptions: MeshGradientAnimate[] = ['on', 'off']
const loopOptions: MeshGradientLoopMode[] = ['off', 'on']
const rangeOptions: MeshGradientRangeMode[] = ['disabled', 'enabled']
const lightOptions: MeshGradientLightType[] = ['env', '3d']
const envOptions: MeshGradientEnvPreset[] = ['city', 'dawn', 'lobby']
const grainOptions: MeshGradientGrainState[] = ['on', 'off']

function resetControls() {
  Object.assign(state, meshGradientDefaults)
  emit('update:modelValue', { ...meshGradientDefaults })
}
</script>

<template>
  <div data-lenis-prevent class="border-black/5 bg-white/80 dark:border-white/10 dark:bg-black/40 border rounded-2xl p-4 shadow-xl backdrop-blur">
    <div class="mb-4 flex items-center justify-between gap-4">
      <div>
        <p class="text-sm text-muted-foreground font-semibold tracking-wide">
          Shader Controls
        </p>
        <p class="text-xs text-muted-foreground/70">
          Tweak props in real-time
        </p>
      </div>
      <button class="text-xs text-primary tracking-widest uppercase" type="button" @click="resetControls">
        Reset
      </button>
    </div>

    <div class="grid gap-4">
      <div class="grid gap-2">
        <label class="text-xs text-muted-foreground font-medium tracking-widest uppercase">
          Colors
        </label>
        <div class="grid grid-cols-3 gap-2">
          <input v-model="state.color1" type="color" aria-label="Color 1" class="border-black/10 h-10 w-full cursor-pointer border rounded bg-transparent p-0">
          <input v-model="state.color2" type="color" aria-label="Color 2" class="border-black/10 h-10 w-full cursor-pointer border rounded bg-transparent p-0">
          <input v-model="state.color3" type="color" aria-label="Color 3" class="border-black/10 h-10 w-full cursor-pointer border rounded bg-transparent p-0">
        </div>
      </div>

      <div class="grid gap-2 md:grid-cols-2">
        <label class="grid gap-1 text-xs text-muted-foreground font-medium tracking-widest uppercase">
          Type
          <select v-model="state.type" class="border-black/10 dark:border-white/10 border rounded bg-transparent px-2 py-1 text-sm">
            <option v-for="option in typeOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </label>

        <label class="grid gap-1 text-xs text-muted-foreground font-medium tracking-widest uppercase">
          Animate
          <select v-model="state.animate" class="border-black/10 dark:border-white/10 border rounded bg-transparent px-2 py-1 text-sm">
            <option v-for="option in animateOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </label>
      </div>

      <div class="grid gap-3 md:grid-cols-2">
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Speed
          <input v-model.number="state.speed" type="range" min="0" max="2" step="0.05">
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Strength
          <input v-model.number="state.strength" type="range" min="0" max="2" step="0.05">
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Density
          <input v-model.number="state.density" type="range" min="0" max="3" step="0.1">
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Frequency
          <input v-model.number="state.frequency" type="range" min="0" max="10" step="0.1">
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Amplitude
          <input v-model.number="state.amplitude" type="range" min="0" max="6" step="0.1">
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Reflection
          <input v-model.number="state.reflection" type="range" min="0" max="1" step="0.05">
        </label>
      </div>

      <div class="grid gap-2 md:grid-cols-3">
        <label class="grid gap-1 text-xs text-muted-foreground font-medium tracking-widest uppercase">
          Light Type
          <select v-model="state.lightType" class="border-black/10 dark:border-white/10 border rounded bg-transparent px-2 py-1 text-sm">
            <option v-for="option in lightOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-medium tracking-widest uppercase">
          Env Preset
          <select v-model="state.envPreset" class="border-black/10 dark:border-white/10 border rounded bg-transparent px-2 py-1 text-sm">
            <option v-for="option in envOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-medium tracking-widest uppercase">
          Brightness
          <input v-model.number="state.brightness" type="range" min="0" max="2" step="0.05">
        </label>
      </div>

      <div class="grid gap-3 md:grid-cols-3">
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Camera Distance
          <input v-model.number="state.cDistance" type="range" min="0.1" max="4" step="0.05">
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Polar Angle
          <input v-model.number="state.cPolarAngle" type="range" min="0" max="360" step="1">
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Azimuth Angle
          <input v-model.number="state.cAzimuthAngle" type="range" min="0" max="360" step="1">
        </label>
      </div>

      <div class="grid gap-2 md:grid-cols-3">
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Camera Zoom
          <input v-model.number="state.cameraZoom" type="range" min="1" max="25" step="0.5">
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Position X
          <input v-model.number="state.positionX" type="number" step="0.1" class="border-black/10 dark:border-white/10 border rounded bg-transparent px-2 py-1 text-sm">
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Position Y
          <input v-model.number="state.positionY" type="number" step="0.1" class="border-black/10 dark:border-white/10 border rounded bg-transparent px-2 py-1 text-sm">
        </label>
      </div>

      <div class="grid gap-2 md:grid-cols-3">
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Position Z
          <input v-model.number="state.positionZ" type="number" step="0.1" class="border-black/10 dark:border-white/10 border rounded bg-transparent px-2 py-1 text-sm">
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Rotation X
          <input v-model.number="state.rotationX" type="number" step="1" class="border-black/10 dark:border-white/10 border rounded bg-transparent px-2 py-1 text-sm">
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Rotation Y
          <input v-model.number="state.rotationY" type="number" step="1" class="border-black/10 dark:border-white/10 border rounded bg-transparent px-2 py-1 text-sm">
        </label>
      </div>

      <div class="grid gap-2 md:grid-cols-3">
        <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
          Rotation Z
          <input v-model.number="state.rotationZ" type="number" step="1" class="border-black/10 dark:border-white/10 border rounded bg-transparent px-2 py-1 text-sm">
        </label>
        <label class="flex items-center gap-2 text-xs text-muted-foreground font-semibold tracking-widest uppercase">
          <input v-model="state.wireframe" type="checkbox" class="accent-primary">
          <span>Wireframe</span>
        </label>
        <label class="flex items-center gap-2 text-xs text-muted-foreground font-semibold tracking-widest uppercase">
          <input v-model="state.toggleAxis" type="checkbox" class="accent-primary">
          <span>Axes Helper</span>
        </label>
      </div>

      <div class="grid gap-2 md:grid-cols-3">
        <label class="flex items-center gap-2 text-xs text-muted-foreground font-semibold tracking-widest uppercase">
          <input v-model="state.zoomOut" type="checkbox" class="accent-primary">
          <span>Zoom Out</span>
        </label>
      </div>

      <div class="grid gap-2 md:grid-cols-2">
        <label class="grid gap-1 text-xs text-muted-foreground font-medium tracking-widest uppercase">
          Loop
          <select v-model="state.loop" class="border-black/10 dark:border-white/10 border rounded bg-transparent px-2 py-1 text-sm">
            <option v-for="option in loopOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-medium tracking-widest uppercase">
          Loop Duration
          <input v-model.number="state.loopDuration" type="number" min="1" step="0.5" class="border-black/10 dark:border-white/10 border rounded bg-transparent px-2 py-1 text-sm">
        </label>
      </div>

      <div class="grid gap-2 md:grid-cols-3">
        <label class="grid gap-1 text-xs text-muted-foreground font-medium tracking-widest uppercase">
          Range Mode
          <select v-model="state.rangeMode" class="border-black/10 dark:border-white/10 border rounded bg-transparent px-2 py-1 text-sm">
            <option v-for="option in rangeOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-medium tracking-widest uppercase">
          Range Start
          <input v-model.number="state.rangeStart" type="number" step="0.1" class="border-black/10 dark:border-white/10 border rounded bg-transparent px-2 py-1 text-sm">
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-medium tracking-widest uppercase">
          Range End
          <input v-model.number="state.rangeEnd" type="number" step="0.1" class="border-black/10 dark:border-white/10 border rounded bg-transparent px-2 py-1 text-sm">
        </label>
      </div>

      <div class="grid gap-2 md:grid-cols-2">
        <label class="grid gap-1 text-xs text-muted-foreground font-medium tracking-widest uppercase">
          Grain
          <select v-model="state.grain" class="border-black/10 dark:border-white/10 border rounded bg-transparent px-2 py-1 text-sm">
            <option v-for="option in grainOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </label>
        <label class="grid gap-1 text-xs text-muted-foreground font-medium tracking-widest uppercase">
          Grain Blend
          <input v-model.number="state.grainBlending" type="range" min="0" max="1" step="0.05">
        </label>
      </div>
    </div>
  </div>
</template>
