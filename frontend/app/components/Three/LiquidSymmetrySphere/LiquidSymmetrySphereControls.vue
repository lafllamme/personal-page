<script setup lang="ts">
import type { LiquidSymmetrySettings } from './LiquidSymmetrySphere.model'

const props = defineProps<{ settings: LiquidSymmetrySettings }>()
const settings = toRef(props, 'settings')

const isCollapsed = ref(false)
const activeSection = ref<string | null>(null)

function toggleSection(section: string) {
  activeSection.value = activeSection.value === section ? null : section
}
</script>

<template>
  <div>
    <div v-if="isCollapsed" class="fixed left-4 top-4 z-50">
      <button
        class="border-white/10 bg-slate-800/90 hover:bg-slate-700/90 border rounded-lg px-4 py-2 color-pureBlack transition-colors dark:color-pureWhite"
        @click="isCollapsed = false"
      >
        Show Controls
      </button>
    </div>

    <div
      v-else
      class="border-white/10 bg-slate-900/95 fixed left-4 top-4 z-50 max-h-[90vh] w-96 overflow-y-auto border rounded-lg shadow-2xl backdrop-blur-md"
    >
      <div class="border-white/10 bg-slate-900/95 sticky top-0 flex items-center justify-between border-b p-4 backdrop-blur-md">
        <h3 class="text-lg color-pureBlack font-semibold dark:color-pureWhite">
          Animation Controls
        </h3>
        <button
          class="bg-slate-800 hover:bg-slate-700 rounded px-3 py-1 text-sm color-pureBlack transition-colors dark:color-pureWhite"
          @click="isCollapsed = true"
        >
          Hide
        </button>
      </div>

      <div class="p-4 space-y-2">
        <div class="border-white/10 overflow-hidden border rounded-lg">
          <button
            class="bg-slate-800/50 hover:bg-slate-800 w-full flex items-center justify-between px-4 py-3 text-left color-pureBlack font-medium transition-colors dark:color-pureWhite"
            @click="toggleSection('mesh')"
          >
            <span>Mesh Settings</span>
            <span class="text-sm">{{ activeSection === 'mesh' ? '-' : '+' }}</span>
          </button>
          <div v-if="activeSection === 'mesh'" class="bg-slate-800/30 p-4 space-y-3">
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                Mesh Density: {{ settings.meshDensity }}
              </label>
              <input
                v-model.number="settings.meshDensity"
                type="range"
                min="16"
                max="256"
                step="16"
                class="w-full"
              >
            </div>
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                Sphere Size: {{ settings.sphereSize.toFixed(2) }}
              </label>
              <input
                v-model.number="settings.sphereSize"
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                class="w-full"
              >
            </div>
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                Camera Distance: {{ settings.cameraDistance.toFixed(1) }}
              </label>
              <input
                v-model.number="settings.cameraDistance"
                type="range"
                min="2"
                max="8"
                step="0.1"
                class="w-full"
              >
            </div>
            <div class="flex items-center space-x-2">
              <input
                v-model="settings.wireframe"
                type="checkbox"
                class="h-4 w-4"
              >
              <label class="text-sm color-pureBlack dark:color-pureWhite">Wireframe Mode</label>
            </div>
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                Transparency: {{ settings.transparency.toFixed(2) }}
              </label>
              <input
                v-model.number="settings.transparency"
                type="range"
                min="0"
                max="1"
                step="0.01"
                class="w-full"
              >
            </div>
          </div>
        </div>

        <div class="border-white/10 overflow-hidden border rounded-lg">
          <button
            class="bg-slate-800/50 hover:bg-slate-800 w-full flex items-center justify-between px-4 py-3 text-left color-pureBlack font-medium transition-colors dark:color-pureWhite"
            @click="toggleSection('speed')"
          >
            <span>Animation Speed</span>
            <span class="text-sm">{{ activeSection === 'speed' ? '-' : '+' }}</span>
          </button>
          <div v-if="activeSection === 'speed'" class="bg-slate-800/30 p-4 space-y-3">
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                Master Speed: {{ settings.animationSpeed.toFixed(3) }}
              </label>
              <input
                v-model.number="settings.animationSpeed"
                type="range"
                min="0"
                max="0.05"
                step="0.001"
                class="w-full"
              >
            </div>
          </div>
        </div>

        <div class="border-white/10 overflow-hidden border rounded-lg">
          <button
            class="bg-slate-800/50 hover:bg-slate-800 w-full flex items-center justify-between px-4 py-3 text-left color-pureBlack font-medium transition-colors dark:color-pureWhite"
            @click="toggleSection('bubble1')"
          >
            <span>Bubble Wave 1</span>
            <span class="text-sm">{{ activeSection === 'bubble1' ? '-' : '+' }}</span>
          </button>
          <div v-if="activeSection === 'bubble1'" class="bg-slate-800/30 p-4 space-y-3">
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                Speed: {{ settings.bubble1Speed.toFixed(2) }}
              </label>
              <input
                v-model.number="settings.bubble1Speed"
                type="range"
                min="0"
                max="5"
                step="0.1"
                class="w-full"
              >
            </div>
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                Amount: {{ settings.bubble1Amount.toFixed(3) }}
              </label>
              <input
                v-model.number="settings.bubble1Amount"
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                class="w-full"
              >
            </div>
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                Frequency: {{ settings.bubble1Frequency.toFixed(1) }}
              </label>
              <input
                v-model.number="settings.bubble1Frequency"
                type="range"
                min="0"
                max="10"
                step="0.5"
                class="w-full"
              >
            </div>
          </div>
        </div>

        <div class="border-white/10 overflow-hidden border rounded-lg">
          <button
            class="bg-slate-800/50 hover:bg-slate-800 w-full flex items-center justify-between px-4 py-3 text-left color-pureBlack font-medium transition-colors dark:color-pureWhite"
            @click="toggleSection('bubble2')"
          >
            <span>Bubble Wave 2</span>
            <span class="text-sm">{{ activeSection === 'bubble2' ? '-' : '+' }}</span>
          </button>
          <div v-if="activeSection === 'bubble2'" class="bg-slate-800/30 p-4 space-y-3">
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                Speed: {{ settings.bubble2Speed.toFixed(2) }}
              </label>
              <input
                v-model.number="settings.bubble2Speed"
                type="range"
                min="0"
                max="5"
                step="0.1"
                class="w-full"
              >
            </div>
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                Amount: {{ settings.bubble2Amount.toFixed(3) }}
              </label>
              <input
                v-model.number="settings.bubble2Amount"
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                class="w-full"
              >
            </div>
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                Frequency: {{ settings.bubble2Frequency.toFixed(1) }}
              </label>
              <input
                v-model.number="settings.bubble2Frequency"
                type="range"
                min="0"
                max="10"
                step="0.5"
                class="w-full"
              >
            </div>
          </div>
        </div>

        <div class="border-white/10 overflow-hidden border rounded-lg">
          <button
            class="bg-slate-800/50 hover:bg-slate-800 w-full flex items-center justify-between px-4 py-3 text-left color-pureBlack font-medium transition-colors dark:color-pureWhite"
            @click="toggleSection('bubble3')"
          >
            <span>Bubble Wave 3</span>
            <span class="text-sm">{{ activeSection === 'bubble3' ? '-' : '+' }}</span>
          </button>
          <div v-if="activeSection === 'bubble3'" class="bg-slate-800/30 p-4 space-y-3">
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                Speed: {{ settings.bubble3Speed.toFixed(2) }}
              </label>
              <input
                v-model.number="settings.bubble3Speed"
                type="range"
                min="0"
                max="5"
                step="0.1"
                class="w-full"
              >
            </div>
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                Amount: {{ settings.bubble3Amount.toFixed(3) }}
              </label>
              <input
                v-model.number="settings.bubble3Amount"
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                class="w-full"
              >
            </div>
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                Frequency: {{ settings.bubble3Frequency.toFixed(1) }}
              </label>
              <input
                v-model.number="settings.bubble3Frequency"
                type="range"
                min="0"
                max="10"
                step="0.5"
                class="w-full"
              >
            </div>
          </div>
        </div>

        <div class="border-white/10 overflow-hidden border rounded-lg">
          <button
            class="bg-slate-800/50 hover:bg-slate-800 w-full flex items-center justify-between px-4 py-3 text-left color-pureBlack font-medium transition-colors dark:color-pureWhite"
            @click="toggleSection('pulse')"
          >
            <span>Pulse Wave</span>
            <span class="text-sm">{{ activeSection === 'pulse' ? '-' : '+' }}</span>
          </button>
          <div v-if="activeSection === 'pulse'" class="bg-slate-800/30 p-4 space-y-3">
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                Speed: {{ settings.pulseSpeed.toFixed(2) }}
              </label>
              <input
                v-model.number="settings.pulseSpeed"
                type="range"
                min="0"
                max="3"
                step="0.1"
                class="w-full"
              >
            </div>
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                Amount: {{ settings.pulseAmount.toFixed(3) }}
              </label>
              <input
                v-model.number="settings.pulseAmount"
                type="range"
                min="0"
                max="0.2"
                step="0.01"
                class="w-full"
              >
            </div>
          </div>
        </div>

        <div class="border-white/10 overflow-hidden border rounded-lg">
          <button
            class="bg-slate-800/50 hover:bg-slate-800 w-full flex items-center justify-between px-4 py-3 text-left color-pureBlack font-medium transition-colors dark:color-pureWhite"
            @click="toggleSection('breathing')"
          >
            <span>Breathing Effect</span>
            <span class="text-sm">{{ activeSection === 'breathing' ? '-' : '+' }}</span>
          </button>
          <div v-if="activeSection === 'breathing'" class="bg-slate-800/30 p-4 space-y-3">
            <div class="flex items-center space-x-2">
              <input
                v-model="settings.breathingEnabled"
                type="checkbox"
                class="h-4 w-4"
              >
              <label class="text-sm color-pureBlack dark:color-pureWhite">Enable Breathing</label>
            </div>
            <div v-if="settings.breathingEnabled" class="space-y-3">
              <div>
                <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                  Speed: {{ settings.breathingSpeed.toFixed(2) }}
                </label>
                <input
                  v-model.number="settings.breathingSpeed"
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  class="w-full"
                >
              </div>
              <div>
                <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                  Intensity: {{ settings.breathingIntensity.toFixed(2) }}
                </label>
                <input
                  v-model.number="settings.breathingIntensity"
                  type="range"
                  min="0.05"
                  max="0.3"
                  step="0.01"
                  class="w-full"
                >
              </div>
            </div>
          </div>
        </div>

        <div class="border-white/10 overflow-hidden border rounded-lg">
          <button
            class="bg-slate-800/50 hover:bg-slate-800 w-full flex items-center justify-between px-4 py-3 text-left color-pureBlack font-medium transition-colors dark:color-pureWhite"
            @click="toggleSection('rotation')"
          >
            <span>Rotation</span>
            <span class="text-sm">{{ activeSection === 'rotation' ? '-' : '+' }}</span>
          </button>
          <div v-if="activeSection === 'rotation'" class="bg-slate-800/30 p-4 space-y-3">
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                Y-Axis Speed: {{ settings.rotationYSpeed.toFixed(4) }}
              </label>
              <input
                v-model.number="settings.rotationYSpeed"
                type="range"
                min="-0.02"
                max="0.02"
                step="0.001"
                class="w-full"
              >
            </div>
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                X-Axis Wobble Speed: {{ settings.rotationXSpeed.toFixed(2) }}
              </label>
              <input
                v-model.number="settings.rotationXSpeed"
                type="range"
                min="0"
                max="1"
                step="0.05"
                class="w-full"
              >
            </div>
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                X-Axis Wobble Amount: {{ settings.rotationXAmount.toFixed(3) }}
              </label>
              <input
                v-model.number="settings.rotationXAmount"
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                class="w-full"
              >
            </div>
          </div>
        </div>

        <div class="border-white/10 overflow-hidden border rounded-lg">
          <button
            class="bg-slate-800/50 hover:bg-slate-800 w-full flex items-center justify-between px-4 py-3 text-left color-pureBlack font-medium transition-colors dark:color-pureWhite"
            @click="toggleSection('colors')"
          >
            <span>Colors & Gradient</span>
            <span class="text-sm">{{ activeSection === 'colors' ? '-' : '+' }}</span>
          </button>
          <div v-if="activeSection === 'colors'" class="bg-slate-800/30 p-4 space-y-4">
            <div>
              <label class="mb-2 block text-sm color-pureBlack dark:color-pureWhite">Gradient Mode</label>
              <select
                v-model="settings.gradientMode"
                class="border-white/10 bg-slate-700 w-full border rounded px-3 py-2 color-pureBlack dark:color-pureWhite"
              >
                <option value="vertical">
                  Vertical
                </option>
                <option value="horizontal">
                  Horizontal
                </option>
                <option value="radial">
                  Radial
                </option>
                <option value="diagonal">
                  Diagonal
                </option>
              </select>
            </div>
            <div>
              <label class="mb-2 block text-sm color-pureBlack dark:color-pureWhite">Color 1</label>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <span class="w-8 text-xs color-pureBlack dark:color-pureWhite">R:</span>
                  <input
                    v-model.number="settings.color1R"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    class="flex-1"
                  >
                  <span class="w-10 text-xs color-pureBlack dark:color-pureWhite">{{ settings.color1R.toFixed(2) }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-8 text-xs color-pureBlack dark:color-pureWhite">G:</span>
                  <input
                    v-model.number="settings.color1G"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    class="flex-1"
                  >
                  <span class="w-10 text-xs color-pureBlack dark:color-pureWhite">{{ settings.color1G.toFixed(2) }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-8 text-xs color-pureBlack dark:color-pureWhite">B:</span>
                  <input
                    v-model.number="settings.color1B"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    class="flex-1"
                  >
                  <span class="w-10 text-xs color-pureBlack dark:color-pureWhite">{{ settings.color1B.toFixed(2) }}</span>
                </div>
                <div
                  class="border-white/10 h-8 w-full border rounded"
                  :style="{
                    backgroundColor: `rgb(${settings.color1R * 255}, ${settings.color1G * 255}, ${settings.color1B * 255})`,
                  }"
                />
              </div>
            </div>
            <div>
              <label class="mb-2 block text-sm color-pureBlack dark:color-pureWhite">Color 2</label>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <span class="w-8 text-xs color-pureBlack dark:color-pureWhite">R:</span>
                  <input
                    v-model.number="settings.color2R"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    class="flex-1"
                  >
                  <span class="w-10 text-xs color-pureBlack dark:color-pureWhite">{{ settings.color2R.toFixed(2) }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-8 text-xs color-pureBlack dark:color-pureWhite">G:</span>
                  <input
                    v-model.number="settings.color2G"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    class="flex-1"
                  >
                  <span class="w-10 text-xs color-pureBlack dark:color-pureWhite">{{ settings.color2G.toFixed(2) }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-8 text-xs color-pureBlack dark:color-pureWhite">B:</span>
                  <input
                    v-model.number="settings.color2B"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    class="flex-1"
                  >
                  <span class="w-10 text-xs color-pureBlack dark:color-pureWhite">{{ settings.color2B.toFixed(2) }}</span>
                </div>
                <div
                  class="border-white/10 h-8 w-full border rounded"
                  :style="{
                    backgroundColor: `rgb(${settings.color2R * 255}, ${settings.color2G * 255}, ${settings.color2B * 255})`,
                  }"
                />
              </div>
            </div>
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                Glow Speed: {{ settings.glowSpeed.toFixed(2) }}
              </label>
              <input
                v-model.number="settings.glowSpeed"
                type="range"
                min="0"
                max="2"
                step="0.1"
                class="w-full"
              >
            </div>
            <div>
              <label class="mb-1 block text-sm color-pureBlack dark:color-pureWhite">
                Glow Amount: {{ settings.glowAmount.toFixed(2) }}
              </label>
              <input
                v-model.number="settings.glowAmount"
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                class="w-full"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
