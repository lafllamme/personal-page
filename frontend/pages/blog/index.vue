<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { ref, watch } from 'vue'
import SpiralLayout from '@/components/ui/Card/Spiral/SpiralLayout.vue'
import FlashlightCanvas from '@/components/ui/Effects/FlashlightCanvas.vue'
import LightSwitch from '@/components/ui/Effects/LightSwitch.vue'
import { useClsx } from '@/composables/useClsx'
import { usePreferencesStore } from '@/stores/preferences'

// Preferences cookie facade; keep UI state local here
const prefs = usePreferencesStore()
const initial = prefs.getPreferences()
const flashlightEnabled = ref(initial.flashlight)
const controlsVisible = ref(true)
const flashlightRadius = ref(initial.radius)
const flashlightDim = ref(initial.dim)

// Debounced values to prevent flickering
const debouncedRadius = ref(flashlightRadius.value)

// VueUse debounced function for radius only
const updateRadius = useDebounceFn((value: number) => {
  debouncedRadius.value = value
}, 0) // ~60fps

function onRadiusInput(e: Event) {
  const value = Number((e.target as HTMLInputElement).value)
  flashlightRadius.value = value
  updateRadius(value)
  consola.debug('[flashlight] radius', value)
}

function onDimInput(e: Event) {
  const value = Number((e.target as HTMLInputElement).value)
  flashlightDim.value = value
  consola.debug('[flashlight] dim', value)
}

function onRadiusUpdate(newRadius: number) {
  flashlightRadius.value = newRadius
  debouncedRadius.value = newRadius
  consola.debug('[flashlight] radius updated from scroll', newRadius)
}

// Debug flashlight state changes
watch(flashlightEnabled, (newValue) => {
  consola.debug('[flashlight] enabled state changed:', newValue)
  prefs.setPreferences({ flashlight: newValue })
})

// Persist radius when it changes (debounced value drives canvas)
watch(debouncedRadius, (newValue) => {
  consola.debug('[flashlight] radius -> cookie', newValue)
  prefs.setPreferences({ radius: newValue })
})

// Persist dim when it changes
watch(flashlightDim, (newValue) => {
  consola.debug('[flashlight] dim -> cookie', newValue)
  prefs.setPreferences({ dim: newValue })
})

function toggleControls() {
  controlsVisible.value = !controlsVisible.value
}

// SpiralLayout posts data
const posts = [
  {
    id: 1,
    title: 'The Monochrome Revolution',
    date: 'October 26, 2024',
    category: 'Design',
    imageUrl: '/placeholder.svg',
  },
  {
    id: 2,
    title: 'Sleek Minimalism in Web Development',
    date: 'October 20, 2024',
    category: 'Tech',
    imageUrl: '/placeholder.svg',
  },
  {
    id: 3,
    title: 'Depth and Creativity through Animation',
    date: 'October 15, 2024',
    category: 'Animation',
    imageUrl: '/placeholder.svg',
  },
  {
    id: 4,
    title: 'The Art of Subtle Interaction',
    date: 'October 10, 2024',
    category: 'UX/UI',
    imageUrl: '/placeholder.svg',
  },
  {
    id: 5,
    title: 'Cinematic Scrolling Experiences',
    date: 'October 5, 2024',
    category: 'Design',
    imageUrl: '/placeholder.svg',
  },
  {
    id: 6,
    title: 'Eight Ways to Engage Your Reader',
    date: 'September 30, 2024',
    category: 'Content',
    imageUrl: '/placeholder.svg',
  },
  {
    id: 7,
    title: 'Fixed Elements and Fluid Motion',
    date: 'September 25, 2024',
    category: 'Tech',
    imageUrl: '/placeholder.svg',
  },
  {
    id: 8,
    title: 'Beyond the Scrollbar: New Navigation',
    date: 'September 20, 2024',
    category: 'UX/UI',
    imageUrl: '/placeholder.svg',
  },
]
</script>

<template>
  <div
    :class="useClsx(
      'relative min-h-screen overflow-x-hidden',
      'bg-pureWhite dark:bg-pureBlack',
    )"
  >
    <SpiralLayout :posts="posts" />

    <FlashlightCanvas
      v-model="flashlightEnabled"
      :radius="debouncedRadius"
      :dim="flashlightDim"
      @update:radius="onRadiusUpdate"
    />
  </div>

  <!-- Light Switch - fixed positioned at bottom right -->
  <div class="fixed bottom-5 left-8 z-10 w-fit -translate-y-full">
    <LightSwitch v-model="flashlightEnabled" />
  </div>

  <!-- Flashlight Controls - fixed positioned above the switch -->
  <div
    v-show="flashlightEnabled"
    class="fixed bottom-10 left-8 z-10 w-fit flex flex-col items-center gap-4 transition-opacity duration-500 -translate-y-full"
    :class="useClsx(
      'rounded-bl-[10px] rounded-br-[28px] rounded-tl-[30px] rounded-tr-[8px]',
      'bg-gray-8 dark:bg-gray-4 p-4 text-xs shadow-[0_10px_30px_rgba(0,0,0,0.35)]',
      'backdrop-blur-sm',
    )"
  >
    <!-- Show controls button (when controls are hidden) -->
    <button
      v-show="!controlsVisible"
      class="h-8 w-8 flex items-center justify-center rounded-full bg-gray-8 text-gray-12 transition-colors dark:bg-gray-4 hover:bg-gray-9 dark:text-gray-11 dark:hover:bg-gray-3"
      title="Show controls"
      @click="toggleControls"
    >
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
        />
      </svg>
    </button>

    <!-- Controls content (when visible) -->
    <div v-show="controlsVisible" class="flex flex-col items-center gap-4">
      <!-- Close button -->
      <button
        class="absolute h-6 w-6 flex items-center justify-center rounded-full bg-gray-10 text-gray-12 transition-colors -right-2 -top-2 dark:bg-gray-2 hover:bg-gray-11 dark:text-gray-11 dark:hover:bg-gray-1"
        title="Close controls"
        @click="toggleControls"
      >
        <span class="text-xs font-bold">×</span>
      </button>
      <div class="flex flex-col items-start gap-1">
        <label for="radius" class="space-grotesk-regular color-gray-12">Radius</label>
        <input
          id="radius"
          class="h-2 w-32 appearance-none rounded-full bg-sand-10 accent-mint-11"
          type="range"
          min="60"
          max="400"
          :value="flashlightRadius"
          @input="onRadiusInput"
        >
      </div>
      <div class="flex flex-col items-start gap-1">
        <label for="dim" class="space-grotesk-regular color-gray-12">Dim</label>
        <input
          id="dim"
          class="h-2 w-32 appearance-none rounded-full bg-sand-10 accent-mint-11"
          type="range"
          min="0.4"
          max="0.98"
          step="0.01"
          :value="flashlightDim"
          @input="onDimInput"
        >
      </div>
    </div>
  </div>
</template>
