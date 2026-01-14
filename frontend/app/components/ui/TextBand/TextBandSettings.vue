<script setup lang="ts">
import type { Ref } from 'vue'

interface TextBandSettingsBindings {
  text: Ref<string>
  backgroundColor: Ref<string>
  textColor: Ref<string>
  fontFamily: Ref<string>
  fontWeight: Ref<number>
  fontSizeMin: Ref<number>
  fontSizeMax: Ref<number>
  textSpacing: Ref<number>
  pace: Ref<number>
  switchMs: Ref<number>
  switchFadeMs: Ref<number>
  columnCount: Ref<number>
  columnGap: Ref<number>
  rowSpacing: Ref<number>
  speedVariance: Ref<number>
  amplitude: Ref<number>
  amplitudeVariance: Ref<number>
  stepEase: Ref<number>
  stepHold: Ref<number>
  alignChance: Ref<number>
  fitPadding: Ref<number>
}

const { settings, open, hasMultipleSegments } = defineProps<{
  settings: TextBandSettingsBindings
  open: boolean
  hasMultipleSegments: boolean
}>()

const emit = defineEmits<{ (e: 'toggle'): void }>()

const {
  text,
  backgroundColor,
  textColor,
  fontFamily,
  fontWeight,
  fontSizeMin,
  fontSizeMax,
  textSpacing,
  pace,
  switchMs,
  switchFadeMs,
  columnCount,
  columnGap,
  rowSpacing,
  speedVariance,
  amplitude,
  amplitudeVariance,
  stepEase,
  stepHold,
  alignChance,
  fitPadding,
} = settings

const fontOptions = [
  'Electric',
  'Recoleta',
  'Ginger',
  'Prata',
  'Manrope',
  'Geist Regular',
  'Geist Thin',
  'Space Grotesk',
  'Boldonse',
  'Audiowide',
  'Zen Dots',
  'Bruno Ace SC',
  'Major Mono Display',
  'Nova Square',
  'Figtree',
  'JetBrains Mono',
  'Crimson Text',
  'Lora',
  'Libre Baskerville',
  'EB Garamond',
  'Cormorant Garamond',
  'Zalando Sans Expanded',
]

const selectedFontFamily = computed({
  get: () => (fontOptions.includes(fontFamily.value) ? fontFamily.value : ''),
  set: (value: string) => {
    if (value)
      fontFamily.value = value
  },
})
</script>

<template>
  <button
    type="button"
    class="bg-black/60 color-white/80 border-white/20 pointer-events-auto absolute right-4 top-4 border rounded-full px-3 py-2 text-[10px] tracking-[0.2em] uppercase backdrop-blur-xl"
    @click="emit('toggle')"
  >
    {{ open ? 'Hide' : 'Show' }} controls
  </button>
  <div
    v-if="open"
    class="bg-black/75 color-white pointer-events-auto absolute right-4 top-14 max-h-[78vh] max-w-[85vw] w-[320px] overflow-y-auto rounded-2xl p-4 text-xs shadow-xl backdrop-blur-xl"
  >
    <div class="flex items-center justify-between">
      <div class="color-white/70 text-[11px] tracking-[0.2em] uppercase">
        Text Band
      </div>
      <button
        type="button"
        class="border-white/20 border rounded-full px-2 py-1 text-[10px] tracking-[0.2em] uppercase"
        @click="emit('toggle')"
      >
        Close
      </button>
    </div>
    <p class="color-white/60 mt-2 text-[10px] leading-snug">
      Pace = overall step speed. Smoothness softens the end of each push. Amplitude controls vertical travel.
    </p>
    <div class="mt-3 space-y-3">
      <label class="block">
        <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Text</span>
        <textarea
          v-model="text"
          rows="6"
          class="bg-black/60 text-white border-white/10 w-full border rounded-lg p-2 text-[11px] font-mono"
        />
        <span class="color-white/50 mt-1 block text-[10px]">
          Multi-line text. Use line breaks or | to create segments.
        </span>
      </label>
      <div class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Background</span>
          <input v-model="backgroundColor" type="color" class="border-white/10 h-8 w-full border rounded-md bg-transparent">
          <span class="color-white/50 mt-1 block text-[10px]">Canvas background color.</span>
        </label>
        <label class="block">
          <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Text</span>
          <input v-model="textColor" type="color" class="border-white/10 h-8 w-full border rounded-md bg-transparent">
          <span class="color-white/50 mt-1 block text-[10px]">Text color for the band.</span>
        </label>
      </div>
      <label class="block">
        <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Font family</span>
        <select
          v-model="selectedFontFamily"
          class="border-white/10 bg-black/60 text-white mb-2 w-full border rounded-lg px-2 py-1 text-[11px]"
        >
          <option disabled value="">Select a font</option>
          <option v-for="font in fontOptions" :key="font" :value="font">
            {{ font }}
          </option>
        </select>
        <input v-model="fontFamily" type="text" class="border-white/10 bg-black/60 text-white w-full border rounded-lg px-2 py-1 text-[11px]">
        <span class="color-white/50 mt-1 block text-[10px]">Font family name for the band text.</span>
      </label>
      <div class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Weight</span>
          <input v-model.number="fontWeight" type="number" min="100" max="900" step="50" class="border-white/10 bg-black/60 text-white w-full border rounded-lg px-2 py-1 text-[11px]">
          <span class="color-white/50 mt-1 block text-[10px]">Font weight for the text.</span>
        </label>
        <label class="block">
          <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Spacing</span>
          <input v-model.number="textSpacing" type="number" min="0" max="40" step="1" class="border-white/10 bg-black/60 text-white w-full border rounded-lg px-2 py-1 text-[11px]">
          <span class="color-white/50 mt-1 block text-[10px]">Extra spacing between letters.</span>
        </label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Min size</span>
          <input v-model.number="fontSizeMin" type="number" min="16" max="200" step="2" class="border-white/10 bg-black/60 text-white w-full border rounded-lg px-2 py-1 text-[11px]">
          <span class="color-white/50 mt-1 block text-[10px]">Minimum font size when fitting.</span>
        </label>
        <label class="block">
          <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Max size</span>
          <input v-model.number="fontSizeMax" type="number" min="40" max="2400" step="2" class="border-white/10 bg-black/60 text-white w-full border rounded-lg px-2 py-1 text-[11px]">
          <span class="color-white/50 mt-1 block text-[10px]">Maximum font size when fitting.</span>
        </label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Pace</span>
          <input v-model.number="pace" type="range" min="0.1" max="2" step="0.05" class="w-full">
          <span class="color-white/50 mt-1 block text-[10px]">Overall speed of the step motion.</span>
        </label>
        <label class="block">
          <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Row spacing</span>
          <input v-model.number="rowSpacing" type="range" min="0.6" max="1.2" step="0.02" class="w-full">
          <span class="color-white/50 mt-1 block text-[10px]">Vertical spacing between repeated rows.</span>
        </label>
      </div>
      <div v-if="hasMultipleSegments" class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Switch ms</span>
          <input v-model.number="switchMs" type="number" min="400" max="8000" step="100" class="border-white/10 bg-black/60 text-white w-full border rounded-lg px-2 py-1 text-[11px]">
          <span class="color-white/50 mt-1 block text-[10px]">Wait time before switching segments.</span>
        </label>
        <label class="block">
          <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Fade ms</span>
          <input v-model.number="switchFadeMs" type="number" min="0" max="2000" step="50" class="border-white/10 bg-black/60 text-white w-full border rounded-lg px-2 py-1 text-[11px]">
          <span class="color-white/50 mt-1 block text-[10px]">Crossfade duration between segments.</span>
        </label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Columns</span>
          <input v-model.number="columnCount" type="number" min="1" max="15" step="1" class="border-white/10 bg-black/60 text-white w-full border rounded-lg px-2 py-1 text-[11px]">
          <span class="color-white/50 mt-1 block text-[10px]">Number of vertical columns.</span>
        </label>
        <label class="block">
          <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Column gap</span>
          <input v-model.number="columnGap" type="number" min="20" max="400" step="5" class="border-white/10 bg-black/60 text-white w-full border rounded-lg px-2 py-1 text-[11px]">
          <span class="color-white/50 mt-1 block text-[10px]">Horizontal distance between columns.</span>
        </label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Speed variance</span>
          <input v-model.number="speedVariance" type="range" min="0" max="0.8" step="0.05" class="w-full">
          <span class="color-white/50 mt-1 block text-[10px]">Column speed variation amount.</span>
        </label>
        <label class="block">
          <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Amplitude</span>
          <input v-model.number="amplitude" type="range" min="0.6" max="3" step="0.05" class="w-full">
          <span class="color-white/50 mt-1 block text-[10px]">Overall vertical travel distance.</span>
        </label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Amp variance</span>
          <input v-model.number="amplitudeVariance" type="range" min="0" max="0.8" step="0.05" class="w-full">
          <span class="color-white/50 mt-1 block text-[10px]">Per-letter randomness for travel.</span>
        </label>
        <label class="block">
          <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Smoothness</span>
          <input v-model.number="stepEase" type="range" min="1" max="5" step="0.1" class="w-full">
          <span class="color-white/50 mt-1 block text-[10px]">Higher = softer end of each push.</span>
        </label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Step hold</span>
          <input v-model.number="stepHold" type="range" min="0" max="0.6" step="0.02" class="w-full">
          <span class="color-white/50 mt-1 block text-[10px]">How long each step rests at the target.</span>
        </label>
        <label class="block">
          <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Align chance</span>
          <input v-model.number="alignChance" type="range" min="0" max="1" step="0.05" class="w-full">
          <span class="color-white/50 mt-1 block text-[10px]">Chance to align all rows for readability.</span>
        </label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="color-white/60 mb-1 block text-[10px] tracking-[0.2em] uppercase">Fit padding</span>
          <input v-model.number="fitPadding" type="range" min="0" max="0.12" step="0.01" class="w-full">
          <span class="color-white/50 mt-1 block text-[10px]">Padding used when fitting to width.</span>
        </label>
      </div>
    </div>
  </div>
</template>
