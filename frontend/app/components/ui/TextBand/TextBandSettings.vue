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
  alignChance,
  fitPadding,
} = settings
</script>

<template>
  <button
    type="button"
    class="pointer-events-auto absolute right-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-2 text-[10px] uppercase tracking-[0.2em] color-white/80 backdrop-blur-xl"
    @click="emit('toggle')"
  >
    {{ open ? 'Hide' : 'Show' }} controls
  </button>
  <div
    v-if="open"
    class="pointer-events-auto absolute right-4 top-14 w-[320px] max-w-[85vw] max-h-[78vh] overflow-y-auto rounded-2xl bg-black/75 p-4 text-xs color-white shadow-xl backdrop-blur-xl"
  >
    <div class="flex items-center justify-between">
      <div class="text-[11px] uppercase tracking-[0.2em] color-white/70">Text Band</div>
      <button
        type="button"
        class="rounded-full border border-white/20 px-2 py-1 text-[10px] uppercase tracking-[0.2em]"
        @click="emit('toggle')"
      >
        Close
      </button>
    </div>
    <p class="mt-2 text-[10px] leading-snug color-white/60">
      Pace = overall step speed. Smoothness softens the end of each push. Amplitude controls vertical travel.
    </p>
    <div class="mt-3 space-y-3">
      <label class="block">
        <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Text</span>
        <textarea
          v-model="text"
          rows="6"
          class="w-full rounded-lg border border-white/10 bg-black/60 p-2 font-mono text-[11px] text-white"
        />
        <span class="mt-1 block text-[10px] color-white/50">
          Multi-line text. Use line breaks or | to create segments.
        </span>
      </label>
      <div class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Background</span>
          <input v-model="backgroundColor" type="color" class="h-8 w-full rounded-md border border-white/10 bg-transparent">
          <span class="mt-1 block text-[10px] color-white/50">Canvas background color.</span>
        </label>
        <label class="block">
          <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Text</span>
          <input v-model="textColor" type="color" class="h-8 w-full rounded-md border border-white/10 bg-transparent">
          <span class="mt-1 block text-[10px] color-white/50">Text color for the band.</span>
        </label>
      </div>
      <label class="block">
        <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Font family</span>
        <input v-model="fontFamily" type="text" class="w-full rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] text-white">
        <span class="mt-1 block text-[10px] color-white/50">Font family name for the band text.</span>
      </label>
      <div class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Weight</span>
          <input v-model.number="fontWeight" type="number" min="100" max="900" step="50" class="w-full rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] text-white">
          <span class="mt-1 block text-[10px] color-white/50">Font weight for the text.</span>
        </label>
        <label class="block">
          <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Spacing</span>
          <input v-model.number="textSpacing" type="number" min="0" max="40" step="1" class="w-full rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] text-white">
          <span class="mt-1 block text-[10px] color-white/50">Extra spacing between letters.</span>
        </label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Min size</span>
          <input v-model.number="fontSizeMin" type="number" min="16" max="200" step="2" class="w-full rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] text-white">
          <span class="mt-1 block text-[10px] color-white/50">Minimum font size when fitting.</span>
        </label>
        <label class="block">
          <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Max size</span>
          <input v-model.number="fontSizeMax" type="number" min="40" max="320" step="2" class="w-full rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] text-white">
          <span class="mt-1 block text-[10px] color-white/50">Maximum font size when fitting.</span>
        </label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Pace</span>
          <input v-model.number="pace" type="range" min="0.1" max="2" step="0.05" class="w-full">
          <span class="mt-1 block text-[10px] color-white/50">Overall speed of the step motion.</span>
        </label>
        <label class="block">
          <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Row spacing</span>
          <input v-model.number="rowSpacing" type="range" min="0.6" max="1.2" step="0.02" class="w-full">
          <span class="mt-1 block text-[10px] color-white/50">Vertical spacing between repeated rows.</span>
        </label>
      </div>
      <div v-if="hasMultipleSegments" class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Switch ms</span>
          <input v-model.number="switchMs" type="number" min="400" max="8000" step="100" class="w-full rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] text-white">
          <span class="mt-1 block text-[10px] color-white/50">Wait time before switching segments.</span>
        </label>
        <label class="block">
          <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Fade ms</span>
          <input v-model.number="switchFadeMs" type="number" min="0" max="2000" step="50" class="w-full rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] text-white">
          <span class="mt-1 block text-[10px] color-white/50">Crossfade duration between segments.</span>
        </label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Columns</span>
          <input v-model.number="columnCount" type="number" min="1" max="15" step="1" class="w-full rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] text-white">
          <span class="mt-1 block text-[10px] color-white/50">Number of vertical columns.</span>
        </label>
        <label class="block">
          <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Column gap</span>
          <input v-model.number="columnGap" type="number" min="20" max="400" step="5" class="w-full rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] text-white">
          <span class="mt-1 block text-[10px] color-white/50">Horizontal distance between columns.</span>
        </label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Speed variance</span>
          <input v-model.number="speedVariance" type="range" min="0" max="0.8" step="0.05" class="w-full">
          <span class="mt-1 block text-[10px] color-white/50">Column speed variation amount.</span>
        </label>
        <label class="block">
          <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Amplitude</span>
          <input v-model.number="amplitude" type="range" min="0.6" max="3" step="0.05" class="w-full">
          <span class="mt-1 block text-[10px] color-white/50">Overall vertical travel distance.</span>
        </label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Amp variance</span>
          <input v-model.number="amplitudeVariance" type="range" min="0" max="0.8" step="0.05" class="w-full">
          <span class="mt-1 block text-[10px] color-white/50">Per-letter randomness for travel.</span>
        </label>
        <label class="block">
          <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Smoothness</span>
          <input v-model.number="stepEase" type="range" min="1" max="5" step="0.1" class="w-full">
          <span class="mt-1 block text-[10px] color-white/50">Higher = softer end of each push.</span>
        </label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Align chance</span>
          <input v-model.number="alignChance" type="range" min="0" max="1" step="0.05" class="w-full">
          <span class="mt-1 block text-[10px] color-white/50">Chance to align all rows for readability.</span>
        </label>
        <label class="block">
          <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Fit padding</span>
          <input v-model.number="fitPadding" type="range" min="0" max="0.12" step="0.01" class="w-full">
          <span class="mt-1 block text-[10px] color-white/50">Padding used when fitting to width.</span>
        </label>
      </div>
    </div>
  </div>
</template>
