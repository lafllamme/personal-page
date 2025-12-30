<script setup lang="ts">
import { useDevicePixelRatio, useResizeObserver } from '@vueuse/core'
import type { TextBandProps } from './TextBand.model'
import { TextBandDefaultProps } from './TextBand.model'

interface Glyph {
  char: string
  width: number
  x: number
  phase: number
  amplitude: number
}

interface Column {
  xOffset: number
  baseDurationMs: number
  durationMs: number
  progress: number
  starts: number[]
  targets: number[]
  alignPulse: boolean
}

const props = withDefaults(defineProps<TextBandProps>(), TextBandDefaultProps)
const {
  text,
  segments,
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
  class: className,
} = toRefs(props)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)
const context = ref<CanvasRenderingContext2D | null>(null)
const canvasSize = reactive({ w: 0, h: 0 })
const { pixelRatio } = useDevicePixelRatio()

let rafId = 0
let fontSize = 120
let lineStep = 100
let repeats = 8
let columns: Column[] = []
let currentIndex = 0
let currentGlyphs: Glyph[] = []
let nextGlyphs: Glyph[] = []
let switchStart = 0
let fadeStart = 0
let isFading = false
let lastFrameTime = 0

const activeSegments = computed(() => {
  if (text.value && text.value.trim().length > 0) {
    const parsed = text.value
      .split(/\r?\n|\s*\|\s*/g)
      .map(item => item.trim())
      .filter(Boolean)
    return parsed.length ? parsed : ['']
  }
  if (segments.value?.length)
    return segments.value
  return ['']
})
const hasMultipleSegments = computed(() => activeSegments.value.length > 1)

function randomRange(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function measureTextWidth(textValue: string, size: number) {
  if (!context.value)
    return 0
  context.value.font = `${fontWeight.value} ${size}px ${fontFamily.value}`
  let width = 0
  for (const char of textValue) {
    width += context.value.measureText(char).width + textSpacing.value
  }
  if (textValue.length > 0)
    width -= textSpacing.value
  return width
}

function fitFontSizeFromSegments() {
  const minSize = Math.max(8, fontSizeMin.value)
  const maxSize = Math.max(minSize, fontSizeMax.value)
  const pad = Math.max(0, Math.min(0.2, fitPadding.value))
  const available = Math.max(1, canvasSize.w * (1 - pad * 2))
  const longest = activeSegments.value.reduce((acc, item) => (item.length > acc.length ? item : acc), '')
  let size = minSize

  for (let next = minSize; next <= maxSize; next += 2) {
    if (measureTextWidth(longest, next) <= available)
      size = next
    else
      break
  }

  fontSize = size
  lineStep = fontSize * rowSpacing.value
  repeats = Math.ceil((canvasSize.h * 2) / lineStep) + 3
}

function buildGlyphs(textValue: string, prevGlyphs: Glyph[] = []) {
  if (!context.value)
    return []
  const chars = Array.from(textValue)
  const totalWidth = measureTextWidth(textValue, fontSize)
  let x = (canvasSize.w - totalWidth) / 2

  return chars.map((char, index) => {
    const prev = prevGlyphs[index]
    context.value!.font = `${fontWeight.value} ${fontSize}px ${fontFamily.value}`
    const width = context.value!.measureText(char).width
    const glyph = {
      char,
      width,
      x,
      phase: prev ? prev.phase : randomRange(0, Math.PI * 2),
      amplitude: prev
        ? prev.amplitude
        : amplitude.value * (1 + randomRange(-amplitudeVariance.value, amplitudeVariance.value)),
    }
    x += width + textSpacing.value
    return glyph
  })
}

function buildColumns() {
  const count = Math.max(1, Math.floor(columnCount.value))
  const gap = Math.max(0, columnGap.value)
  const baseDuration = 1800 / Math.max(0.1, pace.value)
  const variance = Math.max(0, speedVariance.value)
  const start = -((count - 1) / 2) * gap

  columns = Array.from({ length: count }, (_, i) => {
    const durationMs = baseDuration * (1 + randomRange(-variance, variance))
    return {
      xOffset: start + i * gap,
      baseDurationMs: baseDuration,
      durationMs,
      progress: randomRange(0, 1),
      starts: [],
      targets: [],
      alignPulse: false,
    }
  })
}

function prepareText() {
  fitFontSizeFromSegments()
  currentIndex = 0
  currentGlyphs = buildGlyphs(activeSegments.value[currentIndex] || '')
  nextGlyphs = []
  switchStart = performance.now()
  fadeStart = 0
  isFading = false
  lastFrameTime = 0
}

function resizeCanvas() {
  if (!containerRef.value || !canvasRef.value || !context.value)
    return

  canvasSize.w = Math.max(1, containerRef.value.offsetWidth)
  canvasSize.h = Math.max(1, containerRef.value.offsetHeight)
  canvasRef.value.width = canvasSize.w * pixelRatio.value
  canvasRef.value.height = canvasSize.h * pixelRatio.value
  canvasRef.value.style.width = `${canvasSize.w}px`
  canvasRef.value.style.height = `${canvasSize.h}px`
  context.value.setTransform(pixelRatio.value, 0, 0, pixelRatio.value, 0, 0)

  buildColumns()
  prepareText()
}

function updateSwitch(now: number) {
  if (!hasMultipleSegments.value)
    return
  if (!switchStart)
    switchStart = now

  if (!isFading && now - switchStart >= switchMs.value) {
    const nextIndex = (currentIndex + 1) % activeSegments.value.length
    nextGlyphs = buildGlyphs(activeSegments.value[nextIndex] || '', currentGlyphs)
    fadeStart = now
    isFading = true
  }

  if (isFading) {
    const fadeDuration = Math.max(1, switchFadeMs.value)
    const t = Math.min(1, (now - fadeStart) / fadeDuration)
    if (t >= 1) {
      currentIndex = (currentIndex + 1) % activeSegments.value.length
      currentGlyphs = nextGlyphs
      nextGlyphs = []
      isFading = false
      switchStart = now
    }
  }
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function easeInOutPow(t: number, power: number) {
  const p = Math.max(1, power)
  if (t < 0.5)
    return 0.5 * Math.pow(2 * t, p)
  return 1 - 0.5 * Math.pow(2 - 2 * t, p)
}

function ensureColumnIndex(column: Column, index: number, glyph: Glyph) {
  const spread = glyph.amplitude * fontSize
  if (column.starts[index] == null)
    column.starts[index] = randomRange(-spread, spread)
  if (column.targets[index] == null)
    column.targets[index] = randomRange(-spread, spread)
}

function updateColumns(now: number, referenceGlyphs: Glyph[]) {
  if (!columns.length)
    return
  const dt = lastFrameTime ? now - lastFrameTime : 16
  lastFrameTime = now

  const cycledColumns: Column[] = []
  for (const column of columns) {
    column.progress += dt / column.durationMs
    if (column.progress >= 1) {
      column.progress %= 1
      cycledColumns.push(column)
    }
  }

  if (cycledColumns.length === 0)
    return

  const shouldAlign = Math.random() < alignChance.value
  const variance = Math.max(0, speedVariance.value)
  for (const column of cycledColumns) {
    column.alignPulse = shouldAlign
    const maxCount = Math.max(column.starts.length, column.targets.length, referenceGlyphs.length)
    for (let i = 0; i < maxCount; i++) {
      const glyph = referenceGlyphs[i]
      const spread = glyph ? glyph.amplitude * fontSize : fontSize
      const current = column.targets[i] ?? randomRange(-spread, spread)
      column.starts[i] = current
      column.targets[i] = randomRange(-spread, spread)
    }
    column.durationMs = column.baseDurationMs * (1 + randomRange(-variance, variance))
  }
}

function resolveGlyphX(glyphs: Glyph[], index: number, fromGlyphs: Glyph[] | null, t: number) {
  if (!fromGlyphs || !fromGlyphs[index])
    return glyphs[index].x
  return lerp(fromGlyphs[index].x, glyphs[index].x, t)
}

function drawGlyphs(glyphs: Glyph[], now: number, alpha = 1, fromGlyphs: Glyph[] | null = null, t = 1) {
  if (!context.value || glyphs.length === 0)
    return

  const centerY = canvasSize.h / 2
  const half = repeats / 2

  context.value.save()
  context.value.globalAlpha = alpha
  context.value.fillStyle = textColor.value
  context.value.textBaseline = 'middle'
  context.value.textAlign = 'left'
  context.value.font = `${fontWeight.value} ${fontSize}px ${fontFamily.value}`

  for (const column of columns) {
    const eased = easeInOutPow(Math.min(1, Math.max(0, column.progress)), stepEase.value)
    const alignFactor = column.alignPulse ? Math.sin(Math.PI * column.progress) : 0
    for (let index = 0; index < glyphs.length; index++) {
      const glyph = glyphs[index]
      ensureColumnIndex(column, index, glyph)
      const offset = lerp(column.starts[index], column.targets[index], eased) * (1 - alignFactor)
      const baseX = resolveGlyphX(glyphs, index, fromGlyphs, t)
      for (let i = 0; i < repeats; i++) {
        const y = centerY + offset + (i - half) * lineStep
        context.value.fillText(glyph.char, baseX + column.xOffset, y)
      }
    }
  }

  context.value.restore()
}

function drawFrame(now: number) {
  if (!context.value)
    return

  const referenceGlyphs = nextGlyphs.length ? nextGlyphs : currentGlyphs
  updateColumns(now, referenceGlyphs)
  updateSwitch(now)

  context.value.clearRect(0, 0, canvasSize.w, canvasSize.h)
  context.value.fillStyle = backgroundColor.value
  context.value.fillRect(0, 0, canvasSize.w, canvasSize.h)

  if (isFading && nextGlyphs.length) {
    const fadeDuration = Math.max(1, switchFadeMs.value)
    const t = Math.min(1, (now - fadeStart) / fadeDuration)
    drawGlyphs(currentGlyphs, now, 1 - t)
    drawGlyphs(nextGlyphs, now, t, currentGlyphs, t)
  }
  else {
    drawGlyphs(currentGlyphs, now, 1)
  }

  rafId = window.requestAnimationFrame(drawFrame)
}

onMounted(() => {
  if (!canvasRef.value)
    return
  context.value = canvasRef.value.getContext('2d')
  if (!context.value)
    return
  resizeCanvas()
  rafId = window.requestAnimationFrame(drawFrame)
})

onBeforeUnmount(() => {
  if (rafId)
    window.cancelAnimationFrame(rafId)
})

useResizeObserver(containerRef, () => resizeCanvas())

watch(
  [
    text,
    segments,
    fontFamily,
    fontWeight,
    textSpacing,
    fontSizeMin,
    fontSizeMax,
    rowSpacing,
    amplitude,
    amplitudeVariance,
    fitPadding,
  ],
  () => {
    prepareText()
  },
)

watch([columnCount, columnGap, pace, speedVariance], () => {
  buildColumns()
})

watch(pixelRatio, () => resizeCanvas())
</script>

<template>
  <div ref="containerRef" :class="className" class="relative h-full w-full">
    <canvas ref="canvasRef" class="absolute inset-0 h-full w-full" />
  </div>
</template>
