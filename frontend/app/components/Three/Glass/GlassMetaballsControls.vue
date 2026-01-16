<script setup lang="ts">
import type { GlassMetaballsSettings, GlassPresetName } from './GlassMetaballs.model'

interface EnvironmentStatus {
  loading: boolean
  error: string | null
}

const props = defineProps<{
  envStatus: EnvironmentStatus
  onApplyPreset: (name: GlassPresetName) => void | Promise<void>
  onCopySettings: () => void | Promise<void>
  onApplyEnvironmentSettings: () => void | Promise<void>
  onQueuePhysicsRebuild: () => void | Promise<void>
  position?: 'absolute' | 'fixed'
}>()

const settings = defineModel<GlassMetaballsSettings>('settings', { required: true })
const presetName = defineModel<GlassPresetName>('presetName', { required: true })

const uiOpen = ref(false)

const positionClass = computed(() => props.position ?? 'absolute')
</script>

<template>
  <!-- Settings panel (UnoCSS / Tailwind compatible classes) -->
  <div
    v-if="uiOpen"
    data-lenis-prevent
    data-liquid-ui
    :class="useClsx(
      positionClass,
      'bottom-3 right-3 z-50 max-h-[70vh] w-[360px] overflow-auto border border-pureBlack/10 rounded-2xl bg-pureWhite/70 p-3 color-pureBlack/90 shadow-xl backdrop-blur dark:border-pureWhite/10 dark:bg-pureBlack/70 dark:color-pureWhite/90',
    )"
  >
    <div class="mb-2 flex items-start justify-between gap-3">
      <div class="min-w-0">
        <div class="text-sm font-semibold">
          Liquid Settings
        </div>
        <div class="mt-0.5 text-[10px] opacity-60">
          Debounced rebuilds • Pointer ignored over panel
        </div>
      </div>
      <div class="flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          class="border border-pureBlack/10 rounded-xl bg-pureBlack/5 px-2 py-1 text-[11px] transition-colors dark:border-pureWhite/10 dark:bg-pureWhite/5 hover:bg-pureBlack/10 dark:hover:bg-pureWhite/10"
          @click="props.onCopySettings()"
        >
          Copy
        </button>
        <button
          type="button"
          class="border border-pureBlack/10 rounded-xl bg-pureBlack/5 px-2 py-1 text-[11px] transition-colors dark:border-pureWhite/10 dark:bg-pureWhite/5 hover:bg-pureBlack/10 dark:hover:bg-pureWhite/10"
          @click="props.onApplyPreset('enhanced')"
        >
          Reset
        </button>
        <button
          type="button"
          class="border border-pureBlack/10 rounded-xl bg-pureBlack/5 px-2 py-1 text-[11px] transition-colors dark:border-pureWhite/10 dark:bg-pureWhite/5 hover:bg-pureBlack/10 dark:hover:bg-pureWhite/10"
          @click="uiOpen = false"
        >
          Close
        </button>
      </div>
    </div>

    <div class="mb-2 flex items-center gap-2">
      <div class="w-12 shrink-0 text-[10px] opacity-70">
        Preset
      </div>
      <select
        v-model="presetName"
        class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10"
      >
        <option value="enhanced">
          Enhanced
        </option>
        <option value="reference">
          Reference (bobbyroe)
        </option>
      </select>
      <button
        type="button"
        class="shrink-0 border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs transition-colors dark:border-pureWhite/10 dark:bg-pureWhite/5 hover:bg-pureBlack/10 dark:hover:bg-pureWhite/10"
        @click="props.onApplyPreset(presetName)"
      >
        Apply
      </button>
    </div>

    <details class="border border-pureBlack/10 rounded-xl bg-pureBlack/5 p-2 dark:border-pureWhite/10 dark:bg-pureWhite/5">
      <summary class="cursor-pointer select-none text-xs font-semibold opacity-90">
        Performance
      </summary>

      <div class="mt-2 space-y-3">
        <div>
          <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
            <span>DPR max</span><span>{{ settings.perf.dprMax.toFixed(2) }}</span>
          </div>
          <input v-model.number="settings.perf.dprMax" type="range" min="1" max="2" step="0.05" class="w-full">
        </div>

        <div>
          <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
            <span>Marching resolution</span><span>{{ settings.perf.marchingResolution }}</span>
          </div>
          <input v-model.number="settings.perf.marchingResolution" type="range" min="48" max="128" step="8" class="w-full">
          <div class="mt-1 text-[10px] opacity-60">
            Rebuilds marching cubes
          </div>
        </div>

        <div>
          <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
            <span>Max polys</span><span>{{ settings.perf.marchingMaxPoly }}</span>
          </div>
          <input v-model.number="settings.perf.marchingMaxPoly" type="range" min="30000" max="140000" step="5000" class="w-full">
          <div class="mt-1 text-[10px] opacity-60">
            Rebuilds marching cubes
          </div>
        </div>
      </div>
    </details>

    <div class="h-2" />

    <details class="border border-pureBlack/10 rounded-xl bg-pureBlack/5 p-2 dark:border-pureWhite/10 dark:bg-pureWhite/5">
      <summary class="cursor-pointer select-none text-xs font-semibold opacity-90">
        Environment
      </summary>

      <div class="mt-2 space-y-3">
        <div class="grid gap-2">
          <div class="text-[11px] opacity-70">
            Source
          </div>
          <select
            v-model="settings.environment.mode"
            class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10"
          >
            <option value="image">
              Image (equirect)
            </option>
            <option value="room">
              Room (procedural)
            </option>
          </select>
        </div>

        <label v-if="settings.environment.mode === 'image'" class="space-y-1">
          <div class="text-[10px] opacity-70">
            URL / public path
          </div>
          <input
            v-model="settings.environment.url"
            type="text"
            placeholder="/env/my-env.jpg or https://..."
            class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10"
          >
          <div class="text-[10px] opacity-60">
            Use a raw link (CORS) or place file in
            <code class="rounded bg-pureBlack/10 px-1 py-0.5 dark:bg-pureWhite/10">frontend/public</code>
          </div>
        </label>

        <label class="flex items-center gap-2 text-[11px] opacity-90">
          <input
            v-model="settings.environment.useAsBackground"
            type="checkbox"
            class="accent-pureBlack dark:accent-pureWhite"
          >
          Use as visible background
        </label>

        <label class="flex items-center gap-2 text-[11px] opacity-90">
          <input
            v-model="settings.environment.useAsBackdrop"
            type="checkbox"
            class="accent-pureBlack dark:accent-pureWhite"
          >
          Use as refraction source only (hide background)
        </label>

        <div class="space-y-1">
          <div class="flex items-center justify-between text-[11px] opacity-80">
            <span>Background blur</span><span>{{ settings.environment.backgroundBlurriness.toFixed(3) }}</span>
          </div>
          <input v-model.number="settings.environment.backgroundBlurriness" type="range" min="0" max="0.25" step="0.005" class="w-full">
          <div class="text-[10px] opacity-60">
            Works when background/backdrop is enabled
          </div>
        </div>

        <div class="space-y-1">
          <div class="flex items-center justify-between text-[11px] opacity-80">
            <span>Background intensity</span><span>{{ settings.environment.backgroundIntensity.toFixed(2) }}</span>
          </div>
          <input v-model.number="settings.environment.backgroundIntensity" type="range" min="0" max="2" step="0.05" class="w-full">
        </div>

        <div class="flex items-center justify-between gap-2">
          <div class="text-[10px] opacity-60">
            <span v-if="props.envStatus.loading">Loading…</span>
            <span v-else-if="props.envStatus.error">Error: {{ props.envStatus.error }}</span>
            <span v-else>Ready</span>
          </div>
          <button
            type="button"
            class="border border-pureBlack/10 rounded-xl bg-pureBlack/5 px-2 py-1 text-[11px] transition-colors dark:border-pureWhite/10 dark:bg-pureWhite/5 hover:bg-pureBlack/10 dark:hover:bg-pureWhite/10"
            @click="props.onApplyEnvironmentSettings()"
          >
            Apply
          </button>
        </div>
      </div>
    </details>

    <div class="h-2" />

    <details class="border border-pureBlack/10 rounded-xl bg-pureBlack/5 p-2 dark:border-pureWhite/10 dark:bg-pureWhite/5">
      <summary class="cursor-pointer select-none text-xs font-semibold opacity-90">
        Field
      </summary>

      <div class="mt-2 space-y-3">
        <div>
          <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
            <span>Scale</span><span>{{ settings.field.scale.toFixed(2) }}</span>
          </div>
          <input v-model.number="settings.field.scale" type="range" min="2.5" max="6.5" step="0.05" class="w-full">
        </div>

        <div>
          <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
            <span>Isolation</span><span>{{ settings.field.isolation.toFixed(0) }}</span>
          </div>
          <input v-model.number="settings.field.isolation" type="range" min="80" max="1400" step="5" class="w-full">
        </div>

        <div>
          <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
            <span>Meta mapping</span><span>{{ settings.field.metaMapMul.toFixed(3) }}</span>
          </div>
          <input v-model.number="settings.field.metaMapMul" type="range" min="0.05" max="0.12" step="0.001" class="w-full">
        </div>

        <div class="grid grid-cols-3 gap-2">
          <label class="space-y-1">
            <div class="text-[10px] opacity-70">
              Off X
            </div>
            <input v-model.number="settings.field.offsetX" type="number" step="0.01" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
          </label>
          <label class="space-y-1">
            <div class="text-[10px] opacity-70">
              Off Y
            </div>
            <input v-model.number="settings.field.offsetY" type="number" step="0.01" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
          </label>
          <label class="space-y-1">
            <div class="text-[10px] opacity-70">
              Off Z
            </div>
            <input v-model.number="settings.field.offsetZ" type="number" step="0.01" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
          </label>
        </div>
      </div>
    </details>

    <div class="h-2" />

    <details class="border border-pureBlack/10 rounded-xl bg-pureBlack/5 p-2 dark:border-pureWhite/10 dark:bg-pureWhite/5">
      <summary class="cursor-pointer select-none text-xs font-semibold opacity-90">
        Material
      </summary>

      <div class="mt-2 space-y-3">
        <div>
          <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
            <span>Transmission</span><span>{{ settings.material.transmission.toFixed(2) }}</span>
          </div>
          <input v-model.number="settings.material.transmission" type="range" min="0.5" max="1" step="0.01" class="w-full">
        </div>

        <div>
          <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
            <span>IOR</span><span>{{ settings.material.ior.toFixed(2) }}</span>
          </div>
          <input v-model.number="settings.material.ior" type="range" min="1.0" max="2.2" step="0.01" class="w-full">
        </div>

        <div>
          <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
            <span>Thickness</span><span>{{ settings.material.thickness.toFixed(2) }}</span>
          </div>
          <input v-model.number="settings.material.thickness" type="range" min="0.2" max="5" step="0.05" class="w-full">
        </div>

        <div>
          <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
            <span>Roughness</span><span>{{ settings.material.roughness.toFixed(2) }}</span>
          </div>
          <input v-model.number="settings.material.roughness" type="range" min="0" max="0.35" step="0.01" class="w-full">
        </div>

        <div>
          <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
            <span>Env intensity</span><span>{{ settings.material.envMapIntensity.toFixed(2) }}</span>
          </div>
          <input v-model.number="settings.material.envMapIntensity" type="range" min="0" max="3" step="0.05" class="w-full">
        </div>

        <div>
          <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
            <span>Clearcoat</span><span>{{ settings.material.clearcoat.toFixed(2) }}</span>
          </div>
          <input v-model.number="settings.material.clearcoat" type="range" min="0" max="1" step="0.01" class="w-full">
        </div>
      </div>
    </details>

    <div class="h-2" />

    <details class="border border-pureBlack/10 rounded-xl bg-pureBlack/5 p-2 dark:border-pureWhite/10 dark:bg-pureWhite/5">
      <summary class="cursor-pointer select-none text-xs font-semibold opacity-90">
        Bodies
      </summary>

      <div class="mt-2 space-y-3">
        <div>
          <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
            <span>Count</span><span>{{ settings.bodies.count }}</span>
          </div>
          <input v-model.number="settings.bodies.count" type="range" min="10" max="90" step="1" class="w-full">
        </div>

        <details class="border border-pureBlack/10 rounded-xl bg-pureBlack/3 p-2 dark:border-pureWhite/10 dark:bg-pureWhite/3">
          <summary class="cursor-pointer select-none text-[11px] font-semibold opacity-80">
            Spawn / size
          </summary>

          <div class="mt-2 space-y-3">
            <div class="grid grid-cols-2 gap-2">
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Range
                </div>
                <input v-model.number="settings.bodies.range" type="number" step="0.25" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Spawn Y bias
                </div>
                <input v-model.number="settings.bodies.spawnYBias" type="number" step="0.25" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Size min
                </div>
                <input v-model.number="settings.bodies.sizeMin" type="number" step="0.01" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Size max
                </div>
                <input v-model.number="settings.bodies.sizeMax" type="number" step="0.01" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
            </div>

            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>Size pow</span><span>{{ settings.bodies.sizePow.toFixed(2) }}</span>
              </div>
              <input v-model.number="settings.bodies.sizePow" type="range" min="1" max="3" step="0.05" class="w-full">
            </div>
          </div>
        </details>

        <details class="border border-pureBlack/10 rounded-xl bg-pureBlack/3 p-2 dark:border-pureWhite/10 dark:bg-pureWhite/3">
          <summary class="cursor-pointer select-none text-[11px] font-semibold opacity-80">
            Physics
          </summary>

          <div class="mt-2 space-y-3">
            <div class="grid grid-cols-2 gap-2">
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Density min
                </div>
                <input v-model.number="settings.bodies.densityMin" type="number" step="0.05" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Density max
                </div>
                <input v-model.number="settings.bodies.densityMax" type="number" step="0.05" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Lin damp min
                </div>
                <input v-model.number="settings.bodies.linDampMin" type="number" step="0.05" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Lin damp max
                </div>
                <input v-model.number="settings.bodies.linDampMax" type="number" step="0.05" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Ang damp min
                </div>
                <input v-model.number="settings.bodies.angDampMin" type="number" step="0.05" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Ang damp max
                </div>
                <input v-model.number="settings.bodies.angDampMax" type="number" step="0.05" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Max speed min
                </div>
                <input v-model.number="settings.bodies.maxSpeedMin" type="number" step="0.5" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Max speed max
                </div>
                <input v-model.number="settings.bodies.maxSpeedMax" type="number" step="0.5" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Max ang min
                </div>
                <input v-model.number="settings.bodies.maxAngMin" type="number" step="0.5" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Max ang max
                </div>
                <input v-model.number="settings.bodies.maxAngMax" type="number" step="0.5" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
            </div>
          </div>
        </details>

        <details class="border border-pureBlack/10 rounded-xl bg-pureBlack/3 p-2 dark:border-pureWhite/10 dark:bg-pureWhite/3">
          <summary class="cursor-pointer select-none text-[11px] font-semibold opacity-80">
            Pull / flow
          </summary>

          <div class="mt-2 space-y-3">
            <div class="grid grid-cols-2 gap-2">
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Pull base min
                </div>
                <input v-model.number="settings.bodies.pullBaseMin" type="number" step="0.02" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Pull base max
                </div>
                <input v-model.number="settings.bodies.pullBaseMax" type="number" step="0.02" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Pull boost mul min
                </div>
                <input v-model.number="settings.bodies.pullBoostMulMin" type="number" step="0.01" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Pull boost mul max
                </div>
                <input v-model.number="settings.bodies.pullBoostMulMax" type="number" step="0.01" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Pull boost cap min
                </div>
                <input v-model.number="settings.bodies.pullBoostCapMin" type="number" step="0.05" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Pull boost cap max
                </div>
                <input v-model.number="settings.bodies.pullBoostCapMax" type="number" step="0.05" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
            </div>

            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>Flow strength</span><span>{{ settings.bodies.flowStrength.toFixed(2) }}</span>
              </div>
              <input v-model.number="settings.bodies.flowStrength" type="range" min="0" max="0.6" step="0.01" class="w-full">
            </div>

            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>Flow speed</span><span>{{ settings.bodies.flowSpeed.toFixed(2) }}</span>
              </div>
              <input v-model.number="settings.bodies.flowSpeed" type="range" min="0" max="2" step="0.05" class="w-full">
            </div>

            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>Swirl strength</span><span>{{ settings.bodies.swirlStrength.toFixed(2) }}</span>
              </div>
              <input v-model.number="settings.bodies.swirlStrength" type="range" min="0" max="0.6" step="0.01" class="w-full">
            </div>

            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>Swirl speed</span><span>{{ settings.bodies.swirlSpeed.toFixed(2) }}</span>
              </div>
              <input v-model.number="settings.bodies.swirlSpeed" type="range" min="0" max="2" step="0.05" class="w-full">
            </div>
          </div>
        </details>

        <details class="border border-pureBlack/10 rounded-xl bg-pureBlack/3 p-2 dark:border-pureWhite/10 dark:bg-pureWhite/3">
          <summary class="cursor-pointer select-none text-[11px] font-semibold opacity-80">
            Meta strength
          </summary>

          <div class="mt-2 space-y-3">
            <div class="grid grid-cols-3 gap-2">
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Strength base
                </div>
                <input v-model.number="settings.bodies.strengthBase" type="number" step="0.01" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Size mul
                </div>
                <input v-model.number="settings.bodies.strengthSizeMul" type="number" step="0.05" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Rand
                </div>
                <input v-model.number="settings.bodies.strengthRand" type="number" step="0.01" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
            </div>

            <div class="grid grid-cols-3 gap-2">
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Subtract base
                </div>
                <input v-model.number="settings.bodies.subtractBase" type="number" step="0.2" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Inv size mul
                </div>
                <input v-model.number="settings.bodies.subtractInvSizeMul" type="number" step="0.5" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">
                  Rand
                </div>
                <input v-model.number="settings.bodies.subtractRand" type="number" step="0.2" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
              </label>
            </div>
          </div>
        </details>

        <button
          type="button"
          class="w-full border border-pureBlack/10 rounded-xl bg-pureBlack/5 px-3 py-2 text-xs transition-colors dark:border-pureWhite/10 dark:bg-pureWhite/5 hover:bg-pureBlack/10 dark:hover:bg-pureWhite/10"
          @click="props.onQueuePhysicsRebuild()"
        >
          Rebuild bodies now
        </button>
      </div>
    </details>

    <div class="h-2" />

    <details class="border border-pureBlack/10 rounded-xl bg-pureBlack/5 p-2 dark:border-pureWhite/10 dark:bg-pureWhite/5">
      <summary class="cursor-pointer select-none text-xs font-semibold opacity-90">
        Mouse
      </summary>

      <div class="mt-2 space-y-3">
        <div>
          <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
            <span>Lerp</span><span>{{ settings.mouse.lerp.toFixed(2) }}</span>
          </div>
          <input v-model.number="settings.mouse.lerp" type="range" min="0.02" max="0.6" step="0.01" class="w-full">
        </div>

        <div>
          <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
            <span>Radius</span><span>{{ settings.mouse.radius.toFixed(2) }}</span>
          </div>
          <input v-model.number="settings.mouse.radius" type="range" min="0.05" max="0.6" step="0.01" class="w-full">
          <div class="mt-1 text-[10px] opacity-60">
            Rebuilds mouse collider
          </div>
        </div>

        <div>
          <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
            <span>Collider mul</span><span>{{ settings.mouse.colliderMul.toFixed(2) }}</span>
          </div>
          <input v-model.number="settings.mouse.colliderMul" type="range" min="2.0" max="8.0" step="0.1" class="w-full">
          <div class="mt-1 text-[10px] opacity-60">
            Rebuilds mouse collider
          </div>
        </div>

        <div>
          <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
            <span>Edge deadzone</span><span>{{ settings.mouse.edgeDeadzoneNdc.toFixed(2) }}</span>
          </div>
          <input v-model.number="settings.mouse.edgeDeadzoneNdc" type="range" min="0.6" max="0.99" step="0.01" class="w-full">
        </div>

        <label class="space-y-1">
          <div class="text-[10px] opacity-70">
            Park Z (rebuild)
          </div>
          <input v-model.number="settings.mouse.parkZ" type="number" step="1" class="w-full border border-pureBlack/10 rounded-lg bg-pureBlack/5 px-2 py-1 text-xs dark:border-pureWhite/10 dark:bg-pureWhite/10">
        </label>
      </div>
    </details>

    <div class="mt-3 text-[10px] opacity-60">
      Tip: values marked “rebuild” recreate bodies/colliders (slightly heavier).
    </div>
  </div>

  <button
    v-else
    type="button"
    data-liquid-ui
    :class="useClsx(
      positionClass,
      'bottom-3 right-3 z-50 border border-pureBlack/10 rounded-2xl bg-pureBlack/5 px-3 py-2 text-xs color-pureBlack/90 shadow-lg backdrop-blur transition-colors dark:border-pureWhite/10 dark:bg-pureWhite/5 hover:bg-pureBlack/10 dark:color-pureWhite/90 dark:hover:bg-pureWhite/10',
    )"
    @click="uiOpen = true"
  >
    Settings
  </button>
</template>
