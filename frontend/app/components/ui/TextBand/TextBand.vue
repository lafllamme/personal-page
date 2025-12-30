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
  speed: number
  phase: number
  direction: number
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

function buildGlyphs(textValue: string) {
  if (!context.value)
    return []
  const chars = Array.from(textValue)
  const totalWidth = measureTextWidth(textValue, fontSize)
  let x = (canvasSize.w - totalWidth) / 2

  return chars.map((char) => {
    context.value!.font = `${fontWeight.value} ${fontSize}px ${fontFamily.value}`
    const width = context.value!.measureText(char).width
    const glyph = {
      char,
      width,
      x,
      phase: randomRange(0, Math.PI * 2),
      amplitude: amplitude.value * (1 + randomRange(-amplitudeVariance.value, amplitudeVariance.value)),
    }
    x += width + textSpacing.value
    return glyph
  })
}

function buildColumns() {
  const count = Math.max(1, Math.floor(columnCount.value))
  const gap = Math.max(0, columnGap.value)
  const base = pace.value
  const variance = Math.max(0, speedVariance.value)
  const start = -((count - 1) / 2) * gap

  columns = Array.from({ length: count }, (_, i) => {
    const direction = i % 2 === 0 ? 1 : -1
    return {
      xOffset: start + i * gap,
      speed: base * (1 + randomRange(-variance, variance)),
      phase: randomRange(0, Math.PI * 2),
      direction,
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
  if (!switchStart)
    switchStart = now

  if (!isFading && now - switchStart >= switchMs.value) {
    const nextIndex = (currentIndex + 1) % activeSegments.value.length
    nextGlyphs = buildGlyphs(activeSegments.value[nextIndex] || '')
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

function drawGlyphs(glyphs: Glyph[], now: number, alpha = 1) {
  if (!context.value || glyphs.length === 0)
    return

  const time = now / 1000
  const centerY = canvasSize.h / 2
  const half = repeats / 2

  context.value.save()
  context.value.globalAlpha = alpha
  context.value.fillStyle = textColor.value
  context.value.textBaseline = 'middle'
  context.value.textAlign = 'left'
  context.value.font = `${fontWeight.value} ${fontSize}px ${fontFamily.value}`

  for (const column of columns) {
    const timeOffset = time * column.speed * column.direction + column.phase
    for (const glyph of glyphs) {
      const offset = Math.sin(timeOffset + glyph.phase) * glyph.amplitude * fontSize
      for (let i = 0; i < repeats; i++) {
        const y = centerY + offset + (i - half) * lineStep
        context.value.fillText(glyph.char, glyph.x + column.xOffset, y)
      }
    }
  }

  context.value.restore()
}

function drawFrame(now: number) {
  if (!context.value)
    return

  updateSwitch(now)

  context.value.clearRect(0, 0, canvasSize.w, canvasSize.h)
  context.value.fillStyle = backgroundColor.value
  context.value.fillRect(0, 0, canvasSize.w, canvasSize.h)

  if (isFading && nextGlyphs.length) {
    const fadeDuration = Math.max(1, switchFadeMs.value)
    const t = Math.min(1, (now - fadeStart) / fadeDuration)
    drawGlyphs(currentGlyphs, now, 1 - t)
    drawGlyphs(nextGlyphs, now, t)
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
