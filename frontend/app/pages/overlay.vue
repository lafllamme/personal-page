<script lang="ts" setup>
import {computed, ref, watch} from 'vue'
import OverlayText from '@/components/ui/Overlay/OverlayText.vue'
import TextBand from '@/components/ui/TextBand/TextBand.vue'
import TextBandSettings from '@/components/ui/TextBand/TextBandSettings.vue'

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
const textBandAlignChance = ref(0.5)
const textBandFitPadding = ref(0.01)

function toNumber(value: unknown, fallback: number) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const textBandPreview = computed(() => ({
  text: textBandText.value,
  backgroundColor: textBandBackground.value,
  textColor: textBandColor.value,
  fontFamily: textBandFontFamily.value,
  fontWeight: toNumber(textBandFontWeight.value, 500),
  fontSizeMin: toNumber(textBandFontSizeMin.value, 40),
  fontSizeMax: toNumber(textBandFontSizeMax.value, 250),
  textSpacing: toNumber(textBandSpacing.value, 8),
  pace: toNumber(textBandPace.value, 0.7),
  switchMs: toNumber(textBandSwitchMs.value, 2200),
  switchFadeMs: toNumber(textBandSwitchFadeMs.value, 600),
  columnCount: toNumber(textBandColumnCount.value, 1),
  columnGap: toNumber(textBandColumnGap.value, 180),
  rowSpacing: toNumber(textBandRowSpacing.value, 0.82),
  speedVariance: toNumber(textBandSpeedVariance.value, 0.35),
  amplitude: toNumber(textBandAmplitude.value, 1.7),
  amplitudeVariance: toNumber(textBandAmplitudeVariance.value, 0.35),
  stepEase: toNumber(textBandStepEase.value, 2.6),
  alignChance: toNumber(textBandAlignChance.value, 0.5),
  fitPadding: toNumber(textBandFitPadding.value, 0.01),
}))
const textBandSettings = {
  text: textBandText,
  backgroundColor: textBandBackground,
  textColor: textBandColor,
  fontFamily: textBandFontFamily,
  fontWeight: textBandFontWeight,
  fontSizeMin: textBandFontSizeMin,
  fontSizeMax: textBandFontSizeMax,
  textSpacing: textBandSpacing,
  pace: textBandPace,
  switchMs: textBandSwitchMs,
  switchFadeMs: textBandSwitchFadeMs,
  columnCount: textBandColumnCount,
  columnGap: textBandColumnGap,
  rowSpacing: textBandRowSpacing,
  speedVariance: textBandSpeedVariance,
  amplitude: textBandAmplitude,
  amplitudeVariance: textBandAmplitudeVariance,
  stepEase: textBandStepEase,
  alignChance: textBandAlignChance,
  fitPadding: textBandFitPadding,
}
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
      <TextBandSettings
        :settings="textBandSettings"
        :open="showTextBandControls"
        :has-multiple-segments="hasMultipleSegments"
        @toggle="toggleTextBandControls"
      />
    </div>
  </div>
</template>
