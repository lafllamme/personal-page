<script lang="ts" setup>
import type { OverlayTextProps } from './OverlayText.model'
import { computed, onBeforeUnmount, onMounted, ref, toRefs, watchEffect } from 'vue'
import { OverlayTextDefaultProps } from './OverlayText.model'

const props = withDefaults(defineProps<OverlayTextProps>(), OverlayTextDefaultProps)
const { class: classNames } = toRefs(props)

const isMounted = ref(false)
const isVisible = ref(true)
type AnimationPhase = 'typing' | 'settlePre' | 'collide' | 'settlePost' | 'band'
type OverlayLineKey = 'top' | 'bottom'

const animationPhase = ref<AnimationPhase>('typing')

const topText = 'TECNEWS'
const bottomText = 'tecnews'
const columns = [-4, -3, -2, -1, 0, 1, 2, 3, 4]
const columnGap = 50

const topSize = 7
const bottomSize = 5.5

const introTopOffset = `-${20 + topSize / 2}vh`
const introBottomOffset = `${20 + bottomSize / 2}vh`

const smoothEasing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
const weightEasing = 'cubic-bezier(0.33, 1, 0.68, 1)'
const bounceEasing = 'cubic-bezier(0.34, 1.56, 0.64, 1)'
const bandEasing = 'cubic-bezier(0.26, 0.86, 0.28, 1)'
const bandDurationMs = 1400
const bandDelayMs = 220
const bandHoldMs = 0
const bandFadeDelayMs = 0 // delay after band ends before fade-out stagger
const letterFadeDurationMs = 640
const letterStaggerMs = 60
const overlayFadeOutMs = 260
const bandDurationSec = bandDurationMs / 1000
const bandDelaySec = bandDelayMs / 1000
const bandHoldSec = bandHoldMs / 1000
const bandFadeDelaySec = bandFadeDelayMs / 1000
const letterFadeDurationSec = letterFadeDurationMs / 1000
const letterStaggerSec = letterStaggerMs / 1000
const mobileSizeMultiplier = 1.15
const mobileBandColumnGap = 56
const mobileBandColumns = [-2, -1, 0, 1, 2]
const mobileStacks = [-1, 0, 1]
const mobileStackGapVh = 16

interface LetterDistortion {
  scaleX: number
  scaleY: number
  rotateY: number
  depth: number
}

interface OverlayLine {
  key: OverlayLineKey
  size: number
  letters: string[]
}

const textLines: OverlayLine[] = [
  { key: 'top', size: topSize, letters: topText.split('') },
  { key: 'bottom', size: bottomSize, letters: bottomText.split('') },
]

const allLetters = [...topText.split(''), ...bottomText.split('')]
const maxLineLetters = Math.max(...textLines.map(line => line.letters.length))
const lastLetterDelayMs = letterStaggerMs * Math.max(0, maxLineLetters - 1)
const bandPhaseDurationMs = bandDelayMs + bandDurationMs + bandHoldMs + bandFadeDelayMs + letterFadeDurationMs + lastLetterDelayMs
const topLetterCount = textLines.find(line => line.key === 'top')?.letters.length ?? 0
const centerColumns = columns.filter(col => col >= -1 && col <= 1)
const lineGap = '0.5vw'
const phases: Array<{ name: AnimationPhase, duration: number }> = [
  { name: 'typing', duration: 720 },
  { name: 'settlePre', duration: 160 }, // pause after fade/bounce before collision
  { name: 'collide', duration: 520 },
  { name: 'settlePost', duration: 0 }, // brief pause after collision before band
  { name: 'band', duration: bandPhaseDurationMs },
]

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

function generateDistortions() {
  const columnDistortions: Record<number, Record<number, LetterDistortion>> = {}

  columns.forEach((col) => {
    const distortions: Record<number, LetterDistortion> = {}
    const intensity = Math.max(0.35, 1 - Math.abs(col) * 0.2)

    allLetters.forEach((_, i) => {
      const scaleX = clamp(1 + (Math.random() * 0.4 - 0.2) * intensity, 0.8, 1.3)
      const scaleY = clamp(1 + (Math.random() * 0.26 - 0.13) * intensity, 0.86, 1.18)
      const rotateY = clamp((col * -3.2) + (Math.random() * 10 - 5) * intensity, -14, 14)
      const depth = clamp((8 + Math.random() * 18) * intensity, 0, 28)

      distortions[i] = { scaleX, scaleY, rotateY, depth }
    })

    columnDistortions[col] = distortions
  })

  return columnDistortions
}

const letterDistortions = ref<Record<number, Record<number, LetterDistortion>>>({})

let timeoutId: ReturnType<typeof setTimeout> | null = null
let rafId: number | null = null
let exitTimeoutId: ReturnType<typeof setTimeout> | null = null
const isExiting = ref(false)
const waitingForComplete = ref(false)

watchEffect(() => {
  if (!props.autoHide)
    return
  if (!props.canComplete)
    return
  if (!waitingForComplete.value)
    return
  if (!isVisible.value)
    return
  hide()
})

const introWeight = computed(() => (animationPhase.value === 'typing' || animationPhase.value === 'settlePre' ? 400 : 800))

function getIntroLineStyle(position: OverlayLineKey) {
  const offset = position === 'top' ? introTopOffset : introBottomOffset
  const isTyping = animationPhase.value === 'typing'
  const isSettlingPre = animationPhase.value === 'settlePre'
  const isColliding = animationPhase.value === 'collide'
  const isIntroPhase = isTyping || isSettlingPre || isColliding
  const animations: string[] = []

  if (isColliding) {
    animations.push(`${position === 'top' ? 'meetBounceTop' : 'meetBounceBottom'} 0.52s ${bounceEasing} forwards`)
  }

  return {
    '--intro-offset': offset,
    'transform': isIntroPhase ? `translateY(${offset})` : 'translateY(0)',
    'fontWeight': introWeight.value,
    'fontVariationSettings': `"wght" ${introWeight.value}`,
    'transition': `font-weight 0.8s ${weightEasing}, font-variation-settings 0.8s ${weightEasing}`,
    'animation': animations.join(', '),
    'willChange': 'transform, font-weight, font-variation-settings',
  }
}

function getIntroLetterStyle(index: number, size: number, multiplier = 1) {
  const isTyping = animationPhase.value === 'typing'
  const shouldAnimate = isMounted.value && isTyping

  const baseStyle: Record<string, string> = {
    fontSize: `${size * multiplier}vw`,
    opacity: isTyping ? '0' : '1',
    lineHeight: '1',
  }

  if (shouldAnimate) {
    baseStyle.animation = `kineticTypeIn 0.5s ${bounceEasing} ${index * 0.04}s forwards`
  }

  return baseStyle
}

function getColumnStyle(col: number, gap = columnGap) {
  return {
    left: '50%',
    top: '50%',
    transform: `translate(calc(-50% + ${col * gap}vw), -50%)`,
    gap: lineGap,
    perspective: '1200px',
    transformStyle: 'preserve-3d',
  }
}

function getMobileBandStackStyle(col: number, stack: number) {
  return {
    left: '50%',
    top: '50%',
    transform: `translate(calc(-50% + ${col * mobileBandColumnGap}vw), calc(-50% + ${stack * mobileStackGapVh}vh))`,
    gap: lineGap,
    perspective: '1200px',
    transformStyle: 'preserve-3d',
  }
}

function getBandAnimationStyle(columnGapOverride?: number) {
  return {
    animation: `carouselLoop ${bandDurationSec}s ${bandEasing} ${bandDelaySec}s forwards`,
    ...(columnGapOverride ? { '--column-gap': `${columnGapOverride}vw` } : {}),
  }
}

function getBandLetterStyle(line: OverlayLine, col: number, charIndex: number, multiplier = 1) {
  const offset = line.key === 'top' ? 0 : topLetterCount
  const distortion = letterDistortions.value[col]?.[charIndex + offset]
  const delay = bandDelaySec + bandDurationSec + bandFadeDelaySec + bandHoldSec + letterStaggerSec * charIndex

  return {
    'fontSize': `${line.size * multiplier}vw`,
    'fontWeight': '800',
    '--final-scaleX': String(distortion?.scaleX ?? 1),
    '--final-scaleY': String(distortion?.scaleY ?? 1),
    '--final-rotateY': `${distortion?.rotateY ?? 0}deg`,
    '--final-depth': `${distortion?.depth ?? 0}px`,
    'transformStyle': 'preserve-3d',
    'transform': `translateZ(var(--final-depth, 0px)) rotateY(var(--final-rotateY, 0deg)) translateY(0)`,
    'willChange': 'transform, opacity, filter',
    'animation': `letterBlurFade ${letterFadeDurationSec}s ease-in ${delay}s forwards`,
  }
}

function runPhases() {
  let currentPhaseIndex = 0

  const runPhase = () => {
    const phase = phases[currentPhaseIndex]
    animationPhase.value = phase.name

    timeoutId = setTimeout(() => {
      currentPhaseIndex += 1
      if (currentPhaseIndex >= phases.length) {
        if (props.autoHide) {
          if (props.canComplete) {
            hide()
            return
          }
          waitingForComplete.value = true
          return
        }
        letterDistortions.value = generateDistortions()
        currentPhaseIndex = 0
      }
      runPhase()
    }, phase.duration)
  }

  runPhase()
}
onMounted(() => {
  isMounted.value = true
  animationPhase.value = 'typing'
  waitingForComplete.value = false
  letterDistortions.value = generateDistortions()
  rafId = requestAnimationFrame(runPhases)
})

onBeforeUnmount(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
  }
  if (exitTimeoutId) {
    clearTimeout(exitTimeoutId)
  }
})

function hide() {
  if (isExiting.value) {
    return
  }

  isExiting.value = true
  waitingForComplete.value = false
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }

  exitTimeoutId = setTimeout(() => {
    isVisible.value = false
    props.onComplete?.()
  }, overlayFadeOutMs)
}
</script>

<template>
  <div
    v-if="isVisible"
    :class="useClsx(
      'fixed inset-0 z-[9999] overflow-hidden cursor-pointer',
      'bg-pureWhite dark:bg-pureBlack',
      classNames,
    )"
    :style="{
      '--column-gap': `${columnGap}vw`,
      'opacity': isExiting ? 0 : 1,
      'transition': `opacity ${overlayFadeOutMs}ms ${smoothEasing}`,
    }"
    @click="hide"
  >
    <div
      v-if="animationPhase !== 'band'"
      class="absolute inset-0 flex items-center justify-center"
      :style="{ height: '100vh' }"
    >
      <div class="absolute inset-0 flex items-center justify-center md:hidden">
        <template v-for="col in mobileBandColumns" :key="`intro-mobile-col-${col}`">
          <div
            v-for="stack in mobileStacks"
            :key="`intro-stack-${col}-${stack}`"
            class="absolute flex flex-col items-center"
            :style="getMobileBandStackStyle(col, stack)"
          >
            <div
              v-for="line in textLines"
              :key="`intro-${line.key}-mobile-${col}-${stack}`"
              class="flex justify-center"
              :style="getIntroLineStyle(line.key)"
            >
              <span
                v-for="(char, i) in line.letters"
                :key="`${line.key}-mobile-${col}-${stack}-${i}`"
                class="zalando-sans-expanded inline-block color-pureBlack tracking-tight dark:color-pureWhite"
                :style="getIntroLetterStyle(i, line.size, mobileSizeMultiplier)"
              >
                {{ char }}
              </span>
            </div>
          </div>
        </template>
      </div>
      <div class="absolute inset-0 hidden items-center justify-center md:flex">
        <div
          v-for="col in centerColumns"
          :key="col"
          class="absolute flex flex-col items-center"
          :style="getColumnStyle(col)"
        >
          <div
            v-for="line in textLines"
            :key="`intro-${line.key}-${col}`"
            class="flex justify-center"
            :style="getIntroLineStyle(line.key)"
          >
            <span
              v-for="(char, i) in line.letters"
              :key="`${line.key}-${col}-${i}`"
              class="zalando-sans-expanded inline-block color-pureBlack tracking-tight dark:color-pureWhite"
              :style="getIntroLetterStyle(i, line.size)"
            >
              {{ char }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="absolute inset-0 flex items-center justify-center">
      <div
        class="absolute inset-0 flex items-center justify-center md:hidden"
        :style="getBandAnimationStyle(mobileBandColumnGap)"
      >
        <template v-for="col in mobileBandColumns" :key="`band-mobile-col-${col}`">
          <div
            v-for="stack in mobileStacks"
            :key="`band-stack-${col}-${stack}`"
            class="absolute flex flex-col items-center leading-none"
            :style="getMobileBandStackStyle(col, stack)"
          >
            <div
              v-for="line in textLines"
              :key="`band-${line.key}-mobile-${col}-${stack}`"
              class="flex"
            >
              <span
                v-for="(char, charIndex) in line.letters"
                :key="`${line.key}-mobile-${col}-${stack}-${charIndex}`"
                class="zalando-sans-expanded inline-block color-pureBlack tracking-tight dark:color-pureWhite"
                :style="getBandLetterStyle(line, col, charIndex, mobileSizeMultiplier)"
              >
                {{ char }}
              </span>
            </div>
          </div>
        </template>
      </div>
      <div
        class="absolute inset-0 hidden md:block"
        :style="getBandAnimationStyle()"
      >
        <div
          v-for="col in columns"
          :key="col"
          class="absolute flex shrink-0 flex-col items-center leading-none"
          :style="getColumnStyle(col)"
        >
          <div
            v-for="line in textLines"
            :key="`band-${line.key}-${col}`"
            class="flex"
          >
            <span
              v-for="(char, charIndex) in line.letters"
              :key="`${line.key}-${col}-${charIndex}`"
              class="zalando-sans-expanded inline-block color-pureBlack tracking-tight dark:color-pureWhite"
              :style="getBandLetterStyle(line, col, charIndex)"
            >
              {{ char }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes kineticTypeIn {
  0% {
    opacity: 0;
    transform: translateY(-28px) scaleX(1.15) scaleY(0.8);
  }
  60% {
    opacity: 1;
    transform: translateY(-4px) scaleX(0.99) scaleY(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scaleX(1) scaleY(1);
  }
}

@keyframes carouselLoop {
  0% {
    transform: translateX(0);
  }
  80% {
    transform: translateX(var(--column-gap));
  }
  100% {
    transform: translateX(var(--column-gap));
  }
}

@keyframes letterBlurFade {
  0% {
    opacity: 1;
    filter: blur(0px);
  }
  50% {
    opacity: 0.5;
    filter: blur(4px);
  }
  100% {
    opacity: 0;
    filter: blur(8px);
  }
}

@keyframes meetBounceTop {
  0% {
    transform: translateY(var(--intro-offset));
  }
  68% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes meetBounceBottom {
  0% {
    transform: translateY(var(--intro-offset));
  }
  68% {
    transform: translateY(6px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
