<script setup lang="ts">
import type {Ref} from 'vue'

interface RibbonSettingsBindings {
  panelHidden: Ref<boolean>
  panelCollapsed: Ref<boolean>
  camX: Ref<number>
  camY: Ref<number>
  camZOffset: Ref<number>
  camZoom: Ref<number>
  rotX: Ref<number>
  rotY: Ref<number>
  rotZ: Ref<number>
  scaler: Ref<number>
  shiftX: Ref<number>
  shiftY: Ref<number>
  shiftZ: Ref<number>
  lengthStretch: Ref<number>
  widthStretch: Ref<number>
  col1: Ref<string>
  col2: Ref<string>
  col3: Ref<string>
  col4: Ref<string>
  ribbonText: Ref<string>
  selectedFont: Ref<string>
  textWeight: Ref<number>
  showText: Ref<boolean>
  textColor: Ref<string>
  textOpacity: Ref<number>
  textSize: Ref<number>
  textStroke: Ref<number>
  textWidth: Ref<number>
  textSpacing: Ref<number>
  tracking: Ref<number>
  typeHeight: Ref<number>
  textFlipX: Ref<boolean>
  textFlipY: Ref<boolean>
  textBoost: Ref<number>
  textMix: Ref<number>
  textFollowScroll: Ref<boolean>
  textSnapTexel: Ref<boolean>
  textMultiSample: Ref<boolean>
  textSampleStrength: Ref<number>
  showSegmentFrame: Ref<boolean>
  frameStrength: Ref<number>
  frameMode: Ref<0 | 1 | 2>
  showBands: Ref<boolean>
  bandStrength: Ref<number>
  speed: Ref<number>
  timeScale: Ref<number>
  alt: Ref<boolean>
  bgA: Ref<string>
  bgB: Ref<string>
  bgC: Ref<string>
}

interface FontOption {
  label: string
  family: string
}

const {settings, fontOptions, onDrawTextTexture} = defineProps<{
  settings: RibbonSettingsBindings
  fontOptions: FontOption[]
  onDrawTextTexture?: () => void
}>()

const {
  panelHidden,
  panelCollapsed,
  camX,
  camY,
  camZOffset,
  camZoom,
  rotX,
  rotY,
  rotZ,
  scaler,
  shiftX,
  shiftY,
  shiftZ,
  lengthStretch,
  widthStretch,
  col1,
  col2,
  col3,
  col4,
  ribbonText,
  selectedFont,
  textWeight,
  showText,
  textColor,
  textOpacity,
  textSize,
  textStroke,
  textWidth,
  textSpacing,
  tracking,
  typeHeight,
  textFlipX,
  textFlipY,
  textBoost,
  textMix,
  textFollowScroll,
  textSnapTexel,
  textMultiSample,
  textSampleStrength,
  showSegmentFrame,
  frameStrength,
  frameMode,
  showBands,
  bandStrength,
  speed,
  timeScale,
  alt,
  bgA,
  bgB,
  bgC,
} = settings
</script>

<template>
  <div class="pointer-events-none absolute inset-0">
    <button
        v-if="panelHidden"
        class="bg-black/60 pointer-events-auto absolute right-4 bottom-4 z-30 border border-pureWhite/10 rounded-full px-3 py-1 text-[11px] color-pureBlack/80 dark:color-pureWhite/80 tracking-[0.2em] font-mono uppercase shadow-lg backdrop-blur-md"
        @click="panelHidden = false"
    >
      Show Controls
    </button>
    <div
        v-if="!panelHidden"
        class="bg-black/75 pointer-events-auto absolute right-4 bottom-0 z-30 max-h-[80vh] w-72 overflow-auto border border-pureWhite/10 rounded-lg p-3 text-[12px] color-pureBlack dark:color-pureWhite shadow-xl backdrop-blur-md space-y-2"
    >
      <div class="flex items-center justify-between gap-2 pb-1">
        <div class="text-xs color-pureBlack/70 dark:color-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Ribbon Controls
        </div>
        <div class="flex items-center gap-2">
          <button
              class="border border-pureWhite/10 rounded px-2 py-1 text-[10px] color-pureBlack/70 dark:color-pureWhite/70 tracking-[0.18em] font-mono uppercase hover:color-pureBlack/90 dark:hover:color-pureWhite/90"
              @click="panelCollapsed = !panelCollapsed"
          >
            {{ panelCollapsed ? 'Expand' : 'Collapse' }}
          </button>
          <button
              class="border border-pureWhite/10 rounded px-2 py-1 text-[10px] color-pureBlack/70 dark:color-pureWhite/70 tracking-[0.18em] font-mono uppercase hover:color-pureBlack/90 dark:hover:color-pureWhite/90"
              @click="panelHidden = true"
          >
            Hide
          </button>
        </div>
      </div>

      <div v-show="!panelCollapsed" class="space-y-2">
        <div class="text-xs color-pureBlack/70 dark:color-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Camera
        </div>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>X</span>
          <input v-model.number="camX" type="range" min="-1000" max="1000" step="1">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              camX.toFixed(0)
            }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Y</span>
          <input v-model.number="camY" type="range" min="-1000" max="1000" step="1">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              camY.toFixed(0)
            }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Z</span>
          <input v-model.number="camZOffset" type="range" min="-2000" max="2000" step="5">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              camZOffset.toFixed(0)
            }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Zoom</span>
          <input v-model.number="camZoom" type="range" min="0.25" max="3" step="0.01">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              camZoom.toFixed(2)
            }}</span>
        </label>

        <div class="pt-1 text-xs color-pureBlack/70 dark:color-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Tilt
        </div>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>RX</span>
          <input v-model.number="rotX" type="range" min="-3.14" max="3.14" step="0.01">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              rotX.toFixed(2)
            }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>RY</span>
          <input v-model.number="rotY" type="range" min="-3.14" max="3.14" step="0.01">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              rotY.toFixed(2)
            }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>RZ</span>
          <input v-model.number="rotZ" type="range" min="-6.28" max="6.28" step="0.01">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              rotZ.toFixed(2)
            }}</span>
        </label>

        <div class="pt-1 text-xs color-pureBlack/70 dark:color-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Debug
        </div>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Scale</span>
          <input v-model.number="scaler" type="range" min="0.2" max="3" step="0.01">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              scaler.toFixed(2)
            }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Shift X</span>
          <input v-model.number="shiftX" type="range" min="-2000" max="2000" step="5">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              shiftX.toFixed(0)
            }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Shift Y</span>
          <input v-model.number="shiftY" type="range" min="-2000" max="2000" step="5">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              shiftY.toFixed(0)
            }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Shift Z</span>
          <input v-model.number="shiftZ" type="range" min="-2000" max="2000" step="5">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              shiftZ.toFixed(0)
            }}</span>
        </label>

        <div class="pt-1 text-xs color-pureBlack/70 dark:color-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Band Stretch
        </div>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Length</span>
          <input v-model.number="lengthStretch" type="range" min="0.5" max="3" step="0.01">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              lengthStretch.toFixed(2)
            }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Width</span>
          <input v-model.number="widthStretch" type="range" min="0.5" max="3" step="0.01">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              widthStretch.toFixed(2)
            }}</span>
        </label>

        <div class="pt-1 text-xs color-pureBlack/70 dark:color-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Ribbon Look
        </div>

        <div class="grid grid-cols-2 gap-2">
          <label class="grid grid-cols-[auto,1fr] items-center gap-2">
            <span>C1</span>
            <input v-model="col1" type="color" class="h-6 w-full">
          </label>
          <label class="grid grid-cols-[auto,1fr] items-center gap-2">
            <span>C2</span>
            <input v-model="col2" type="color" class="h-6 w-full">
          </label>
          <label class="grid grid-cols-[auto,1fr] items-center gap-2">
            <span>C3</span>
            <input v-model="col3" type="color" class="h-6 w-full">
          </label>
          <label class="grid grid-cols-[auto,1fr] items-center gap-2">
            <span>C4</span>
            <input v-model="col4" type="color" class="h-6 w-full">
          </label>
        </div>

        <div class="pt-1 text-xs color-pureBlack/70 dark:color-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Text Input
        </div>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Text</span>
          <input v-model="ribbonText" type="text"
                 class="w-full border border-pureWhite/10 rounded bg-pureWhite/10 px-2 py-1 text-[12px] color-pureBlack dark:color-pureWhite">
        </label>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Font</span>
          <select v-model="selectedFont"
                  class="w-full border border-pureWhite/10 rounded bg-pureWhite/10 px-2 py-1 text-[12px] color-pureBlack dark:color-pureWhite">
            <option v-for="opt in fontOptions" :key="opt.family" :value="opt.family">
              {{ opt.label }}
            </option>
          </select>
        </label>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Weight</span>
          <input v-model.number="textWeight" type="range" min="100" max="900" step="50"
                 @input="onDrawTextTexture?.()">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              textWeight
            }}</span>
        </label>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Text</span>
          <input v-model="showText" type="checkbox" @change="onDrawTextTexture?.()">
        </label>

        <div class="grid grid-cols-2 gap-2">
          <label class="grid grid-cols-[auto,1fr] items-center gap-2">
            <span>TC</span>
            <input v-model="textColor" type="color" class="h-6 w-full"
                   @change="onDrawTextTexture?.()">
          </label>
          <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
            <span>Op</span>
            <input v-model.number="textOpacity" type="range" min="0" max="1" step="0.01"
                   @input="onDrawTextTexture?.()">
            <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
                textOpacity.toFixed(2)
              }}</span>
          </label>
        </div>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Size</span>
          <input v-model.number="textSize" type="range" min="24" max="140" step="1"
                 @input="onDrawTextTexture?.()">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              textSize
            }}</span>
        </label>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Stroke</span>
          <input v-model.number="textStroke" type="range" min="0" max="22" step="1"
                 @input="onDrawTextTexture?.()">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              textStroke
            }}</span>
        </label>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Width</span>
          <input v-model.number="textWidth" type="range" min="0.35" max="2.5" step="0.01">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              textWidth.toFixed(2)
            }}</span>
        </label>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Space</span>
          <input v-model.number="textSpacing" type="range" min="0" max="0.45" step="0.01">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              textSpacing.toFixed(2)
            }}</span>
        </label>

        <div class="pt-1 text-xs color-pureBlack/70 dark:color-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          p5 Glyph Padding
        </div>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Tracking</span>
          <input v-model.number="tracking" type="range" min="0" max="80" step="1">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              tracking
            }}</span>
        </label>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Height</span>
          <input v-model.number="typeHeight" type="range" min="0" max="80" step="1">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              typeHeight
            }}</span>
        </label>

        <div class="pt-1 text-xs color-pureBlack/70 dark:color-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Text Fix
        </div>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Flip X</span>
          <input v-model="textFlipX" type="checkbox">
        </label>
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Flip Y</span>
          <input v-model="textFlipY" type="checkbox">
        </label>

        <div class="pt-1 text-xs color-pureBlack/70 dark:color-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Text Pop
        </div>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Boost</span>
          <input v-model.number="textBoost" type="range" min="0.8" max="2.2" step="0.01">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              textBoost.toFixed(2)
            }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Mix</span>
          <input v-model.number="textMix" type="range" min="0" max="1" step="0.01">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              textMix.toFixed(2)
            }}</span>
        </label>

        <div class="pt-1 text-xs color-pureBlack/70 dark:color-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Text Lock
        </div>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Follow</span>
          <input v-model="textFollowScroll" type="checkbox">
        </label>
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Snap</span>
          <input v-model="textSnapTexel" type="checkbox">
        </label>

        <div class="pt-1 text-xs color-pureBlack/70 dark:color-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Text AA
        </div>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Multi</span>
          <input v-model="textMultiSample" type="checkbox">
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Strength</span>
          <input v-model.number="textSampleStrength" type="range" min="0" max="2" step="0.01">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              textSampleStrength.toFixed(2)
            }}</span>
        </label>

        <div class="pt-1 text-xs color-pureBlack/70 dark:color-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Frame
        </div>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Frame</span>
          <input v-model="showSegmentFrame" type="checkbox">
        </label>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Str</span>
          <input v-model.number="frameStrength" type="range" min="0" max="1" step="0.01">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              frameStrength.toFixed(2)
            }}</span>
        </label>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Mode</span>
          <select v-model.number="frameMode" class="bg-black/30 border border-pureWhite/10 rounded px-2 py-1">
            <option :value="0">Off</option>
            <option :value="1">Tiles</option>
            <option :value="2">Outer</option>
          </select>
        </label>

        <div class="pt-1 text-xs color-pureBlack/70 dark:color-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Bands
        </div>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Bands</span>
          <input v-model="showBands" type="checkbox">
        </label>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Str</span>
          <input v-model.number="bandStrength" type="range" min="0" max="1" step="0.01">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              bandStrength.toFixed(2)
            }}</span>
        </label>

        <div class="pt-1 text-xs color-pureBlack/70 dark:color-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Motion
        </div>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Speed</span>
          <input v-model.number="speed" type="range" min="0" max="1" step="0.01">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              speed.toFixed(2)
            }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Time</span>
          <input v-model.number="timeScale" type="range" min="0" max="2" step="0.05">
          <span class="text-[10px] color-pureBlack/60 dark:color-pureWhite/60 font-mono tabular-nums">{{
              timeScale.toFixed(2)
            }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Alt</span>
          <input v-model="alt" type="checkbox">
        </label>

        <div class="pt-1 text-xs color-pureBlack/70 dark:color-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Background
        </div>

        <div class="grid grid-cols-3 gap-2">
          <label class="grid grid-cols-[auto,1fr] items-center gap-2">
            <span>A</span>
            <input v-model="bgA" type="color" class="h-6 w-full">
          </label>
          <label class="grid grid-cols-[auto,1fr] items-center gap-2">
            <span>B</span>
            <input v-model="bgB" type="color" class="h-6 w-full">
          </label>
          <label class="grid grid-cols-[auto,1fr] items-center gap-2">
            <span>C</span>
            <input v-model="bgC" type="color" class="h-6 w-full">
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
