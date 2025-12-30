<script lang="ts" setup>
import {computed, ref, watch} from 'vue'
import OverlayText from '@/components/ui/Overlay/OverlayText.vue'
import TextBand from '@/components/ui/TextBand/TextBand.vue'

const showOverlay = ref(false)
const overlayKey = ref(0)
const showTextBand = ref(true)
const showTextBandControls = ref(false)
const textBandText = ref('TECNEWS')
const textBandBackground = ref('#000000')
const textBandColor = ref('#ffffff')
const textBandFontFamily = ref('Geist')
const textBandFontWeight = ref(500)
const textBandFontSizeMin = ref(40)
const textBandFontSizeMax = ref(300)
const textBandSpacing = ref(10)
const textBandPace = ref(0.7)
const textBandSwitchMs = ref(2200)
const textBandSwitchFadeMs = ref(600)
const textBandColumnCount = ref(1)
const textBandColumnGap = ref(180)
const textBandRowSpacing = ref(0.82)
const textBandSpeedVariance = ref(0.35)
const textBandAmplitude = ref(1.7)
const textBandAmplitudeVariance = ref(0.35)
const textBandStepEase = ref(2.6)
const textBandFitPadding = ref(0.03)

const textBandPreview = computed(() => ({
  text: textBandText.value,
  backgroundColor: textBandBackground.value,
  textColor: textBandColor.value,
  fontFamily: textBandFontFamily.value,
  fontWeight: textBandFontWeight.value,
  fontSizeMin: textBandFontSizeMin.value,
  fontSizeMax: textBandFontSizeMax.value,
  textSpacing: textBandSpacing.value,
  pace: textBandPace.value,
  switchMs: textBandSwitchMs.value,
  switchFadeMs: textBandSwitchFadeMs.value,
  columnCount: textBandColumnCount.value,
  columnGap: textBandColumnGap.value,
  rowSpacing: textBandRowSpacing.value,
  speedVariance: textBandSpeedVariance.value,
  amplitude: textBandAmplitude.value,
  amplitudeVariance: textBandAmplitudeVariance.value,
  stepEase: textBandStepEase.value,
  fitPadding: textBandFitPadding.value,
}))
const hasMultipleSegments = computed(() => {
  const segments = textBandText.value
    .split(/\r?\n|\s*\|\s*/g)
    .map(item => item.trim())
    .filter(Boolean)
  return segments.length > 1
})

watch(
    textBandPreview,
    (next) => {
      console.log('[TextBand settings]', JSON.stringify(next))
    },
    {deep: true},
)

function handleComplete() {
  showOverlay.value = false
}

function replayOverlay() {
  showOverlay.value = true
  overlayKey.value += 1
}

function toggleTextBand() {
  showTextBand.value = !showTextBand.value
  if (showTextBand.value)
    showOverlay.value = false
}

function toggleTextBandControls() {
  showTextBandControls.value = !showTextBandControls.value
}
</script>

<template>
  <div class="relative min-h-screen color-pureBlack dark:color-pureWhite">
    <div class="mx-auto max-w-4xl px-6 py-16">
      <div class="flex items-center justify-between gap-6">
        <div>
          <h1 class="font-prata text-4xl tracking-tight">
            Overlay Text Preview
          </h1>
          <p class="text-black/70 mt-2 text-base">
            Click the overlay to dismiss. Use replay to restart the animation.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button
              type="button"
              class="hover:bg-black/80 rounded-full px-5 py-2 text-sm font-semibold transition"
              @click="replayOverlay"
          >
            Replay overlay
          </button>
          <button
              type="button"
              class="border border-black/20 hover:bg-black/5 rounded-full px-5 py-2 text-sm font-semibold transition"
              @click="toggleTextBand"
          >
            {{ showTextBand ? 'Hide' : 'Show' }} text band
          </button>
        </div>
      </div>

      <div class="bg-white/70 border-black/10 mt-16 border rounded-3xl p-10 shadow-sm">
        <p class="text-black/75 text-lg leading-relaxed">
          This page is a sandbox to test the overlay animation without affecting the main home route.
        </p>
      </div>

    </div>

    <OverlayText
        v-if="showOverlay"
        :key="overlayKey"
        :on-complete="handleComplete"
    />

    <div
        v-if="showTextBand"
        class="fixed inset-0 z-[9998] overflow-hidden"
    >
      <ClientOnly>
        <TextBand
            v-bind="textBandPreview"
            class="pointer-events-none h-full w-full"
        />
      </ClientOnly>
      <button
          type="button"
          class="pointer-events-auto absolute right-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-2 text-[10px] uppercase tracking-[0.2em] color-white/80 backdrop-blur-xl"
          @click="toggleTextBandControls"
      >
        {{ showTextBandControls ? 'Hide' : 'Show' }} controls
      </button>
      <div
          v-if="showTextBandControls"
          class="pointer-events-auto absolute right-4 top-14 w-[320px] max-w-[85vw] max-h-[78vh] overflow-y-auto rounded-2xl bg-black/75 p-4 text-xs color-white shadow-xl backdrop-blur-xl">
        <div class="flex items-center justify-between">
          <div class="text-[11px] uppercase tracking-[0.2em] color-white/70">Text Band</div>
          <button
              type="button"
              class="rounded-full border border-white/20 px-2 py-1 text-[10px] uppercase tracking-[0.2em]"
              @click="toggleTextBandControls"
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
                v-model="textBandText"
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
              <input v-model="textBandBackground" type="color"
                     class="h-8 w-full rounded-md border border-white/10 bg-transparent"/>
              <span class="mt-1 block text-[10px] color-white/50">Canvas background color.</span>
            </label>
            <label class="block">
              <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Text</span>
              <input v-model="textBandColor" type="color"
                     class="h-8 w-full rounded-md border border-white/10 bg-transparent"/>
              <span class="mt-1 block text-[10px] color-white/50">Text color for the band.</span>
            </label>
          </div>
          <label class="block">
            <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Font family</span>
            <input v-model="textBandFontFamily" type="text"
                   class="w-full rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] text-white"/>
            <span class="mt-1 block text-[10px] color-white/50">Font family name for the band text.</span>
          </label>
          <div class="grid grid-cols-2 gap-3">
            <label class="block">
              <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Weight</span>
              <input v-model.number="textBandFontWeight" type="number" min="100" max="900" step="50"
                     class="w-full rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] text-white"/>
              <span class="mt-1 block text-[10px] color-white/50">Font weight for the text.</span>
            </label>
            <label class="block">
              <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Spacing</span>
              <input v-model.number="textBandSpacing" type="number" min="0" max="40" step="1"
                     class="w-full rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] text-white"/>
              <span class="mt-1 block text-[10px] color-white/50">Extra spacing between letters.</span>
            </label>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <label class="block">
              <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Min size</span>
              <input v-model.number="textBandFontSizeMin" type="number" min="16" max="200" step="2"
                     class="w-full rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] text-white"/>
              <span class="mt-1 block text-[10px] color-white/50">Minimum font size when fitting.</span>
            </label>
            <label class="block">
              <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Max size</span>
              <input v-model.number="textBandFontSizeMax" type="number" min="40" max="320" step="2"
                     class="w-full rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] text-white"/>
              <span class="mt-1 block text-[10px] color-white/50">Maximum font size when fitting.</span>
            </label>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <label class="block">
              <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Pace</span>
              <input v-model.number="textBandPace" type="range" min="0.1" max="2" step="0.05" class="w-full"/>
              <span class="mt-1 block text-[10px] color-white/50">Overall speed of the step motion.</span>
            </label>
            <label class="block">
              <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Row spacing</span>
              <input v-model.number="textBandRowSpacing" type="range" min="0.6" max="1.2" step="0.02" class="w-full"/>
              <span class="mt-1 block text-[10px] color-white/50">Vertical spacing between repeated rows.</span>
            </label>
          </div>
          <div v-if="hasMultipleSegments" class="grid grid-cols-2 gap-3">
            <label class="block">
              <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Switch ms</span>
              <input v-model.number="textBandSwitchMs" type="number" min="400" max="8000" step="100"
                     class="w-full rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] text-white"/>
              <span class="mt-1 block text-[10px] color-white/50">Wait time before switching segments.</span>
            </label>
            <label class="block">
              <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Fade ms</span>
              <input v-model.number="textBandSwitchFadeMs" type="number" min="0" max="2000" step="50"
                     class="w-full rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] text-white"/>
              <span class="mt-1 block text-[10px] color-white/50">Crossfade duration between segments.</span>
            </label>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <label class="block">
              <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Columns</span>
              <input v-model.number="textBandColumnCount" type="number" min="1" max="15" step="1"
                     class="w-full rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] text-white"/>
              <span class="mt-1 block text-[10px] color-white/50">Number of vertical columns.</span>
            </label>
            <label class="block">
              <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Column gap</span>
              <input v-model.number="textBandColumnGap" type="number" min="20" max="400" step="5"
                     class="w-full rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] text-white"/>
              <span class="mt-1 block text-[10px] color-white/50">Horizontal distance between columns.</span>
            </label>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <label class="block">
              <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Speed variance</span>
              <input v-model.number="textBandSpeedVariance" type="range" min="0" max="0.8" step="0.05" class="w-full"/>
              <span class="mt-1 block text-[10px] color-white/50">Column speed variation amount.</span>
            </label>
            <label class="block">
              <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Amplitude</span>
              <input v-model.number="textBandAmplitude" type="range" min="0.6" max="3" step="0.05" class="w-full"/>
              <span class="mt-1 block text-[10px] color-white/50">Overall vertical travel distance.</span>
            </label>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <label class="block">
              <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Amp variance</span>
              <input v-model.number="textBandAmplitudeVariance" type="range" min="0" max="0.8" step="0.05"
                     class="w-full"/>
              <span class="mt-1 block text-[10px] color-white/50">Per-letter randomness for travel.</span>
            </label>
            <label class="block">
              <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Smoothness</span>
              <input v-model.number="textBandStepEase" type="range" min="1" max="5" step="0.1" class="w-full"/>
              <span class="mt-1 block text-[10px] color-white/50">Higher = softer end of each push.</span>
            </label>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <label class="block">
              <span class="mb-1 block text-[10px] uppercase tracking-[0.2em] color-white/60">Fit padding</span>
              <input v-model.number="textBandFitPadding" type="range" min="0" max="0.12" step="0.01" class="w-full"/>
              <span class="mt-1 block text-[10px] color-white/50">Padding used when fitting to width.</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
