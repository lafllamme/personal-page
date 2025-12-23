<script lang="ts" setup>
import type { OverlayTextProps } from './OverlayText.model'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, toRefs, watch } from 'vue'
import { OverlayTextDefaultProps } from './OverlayText.model'

const props = withDefaults(defineProps<OverlayTextProps>(), OverlayTextDefaultProps)
const { class: classNames } = toRefs(props)

const isVisible = ref(true)
const animationPhase = ref<'typing' | 'merging' | 'band'>('typing')
const renderKey = ref(0)
const containerRef = ref<HTMLDivElement | null>(null)

const topText = 'TECNEWS'
const bottomText = 'tecnews'
const columns = [-4, -3, -2, -1, 0, 1, 2, 3, 4]
const columnGap = 50

const topSize = 7
const bottomSize = 5.5

const topOffset = computed(() => (animationPhase.value === 'typing' ? `-${20 + topSize / 2}vh` : '0'))
const bottomOffset = computed(() => (animationPhase.value === 'typing' ? `${20 + bottomSize / 2}vh` : '0'))

const smoothEasing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
const bounceEasing = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

interface LetterDistortion {
  scaleX: number
  scaleY: number
  skew: number
  rotateY: number
  depth: number
}

const centerColumns = computed(() => columns.filter(col => col >= -1 && col <= 1))

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

function generateDistortions() {
  const columnDistortions: Record<number, Record<string, LetterDistortion>> = {}

  columns.forEach((col) => {
    const distortions: Record<string, LetterDistortion> = {}
    const allLetters = [...topText.split(''), ...bottomText.split('')]
    const intensity = Math.max(0.35, 1 - Math.abs(col) * 0.14)

    allLetters.forEach((_, i) => {
      const scaleX = clamp(1 + (Math.random() * 0.5 - 0.25) * intensity, 0.72, 1.42)
      const scaleY = clamp(1 + (Math.random() * 0.32 - 0.16) * intensity, 0.82, 1.24)
      const skew = clamp((Math.random() * 24 - 12) * intensity, -16, 16)
      const rotateY = clamp((col * -3.4) + (Math.random() * 14 - 7) * intensity, -18, 18)
      const depth = clamp((10 + Math.random() * 26) * intensity, 0, 36)

      distortions[i] = { scaleX, scaleY, skew, rotateY, depth }
    })

    columnDistortions[col] = distortions
  })

  return columnDistortions
}

const letterDistortions = ref(generateDistortions())

let timeoutId: ReturnType<typeof setTimeout> | null = null
let rafId: number | null = null
const isMounted = ref(false)

watch(renderKey, () => {
  letterDistortions.value = generateDistortions()
})

function runPhases() {
  const phases = [
    { name: 'typing', duration: 650 },
    { name: 'merging', duration: 350 },
    { name: 'band', duration: 2600 },
  ]

  let currentPhaseIndex = 0

  const runPhase = () => {
    const phase = phases[currentPhaseIndex]
    animationPhase.value = phase.name as 'typing' | 'merging' | 'band'

    timeoutId = setTimeout(() => {
      currentPhaseIndex += 1
      if (currentPhaseIndex >= phases.length) {
        currentPhaseIndex = 0
        renderKey.value += 1
      }
      runPhase()
    }, phase.duration)
  }

  runPhase()
}

onMounted(async () => {
  await nextTick()
  isMounted.value = true
  rafId = requestAnimationFrame(() => runPhases())
})

onBeforeUnmount(() => {
  if (timeoutId)
    clearTimeout(timeoutId)
  if (rafId !== null)
    cancelAnimationFrame(rafId)
})

function hide() {
  isVisible.value = false
  props.onComplete?.()
}
</script>

<template>
  <div
    v-if="isVisible && isMounted"
    :key="renderKey"
    ref="containerRef"
    :class="useClsx(
      'fixed inset-0 z-[9999] overflow-hidden cursor-pointer',
      'bg-pureWhite dark:bg-pureBlack',
      classNames,
    )"
    :style="{ '--column-gap': `${columnGap}vw` }"
    @click="hide"
  >
    <div
      v-if="animationPhase === 'typing' || animationPhase === 'merging'"
      class="absolute inset-0 flex items-center justify-center"
      :style="{ height: '100vh' }"
    >
      <div
        v-for="col in centerColumns"
        :key="col"
        class="absolute flex flex-col items-center"
        :style="{
          left: '50%',
          top: '50%',
          transform: `translate(calc(-50% + ${col * columnGap}vw), -50%)`,
          gap: '0.5vw',
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }"
      >
        <div
          class="flex justify-center"
          :style="{
            transform: `translateY(${topOffset})`,
            transition: `transform 350ms ${smoothEasing}`,
            willChange: 'transform',
          }"
        >
          <span
            v-for="(char, i) in topText.split('')"
            :key="`top-${col}-${i}`"
            class="font-clash inline-block color-pureBlack font-normal tracking-tight dark:color-pureWhite"
            :style="{
              fontSize: `${topSize}vw`,
              opacity: '0',
              animation: `kineticTypeIn 0.5s ${bounceEasing} ${i * 0.04}s forwards`,
              lineHeight: '1',
            }"
          >
            {{ char }}
          </span>
        </div>

        <div
          class="flex justify-center"
          :style="{
            transform: `translateY(${bottomOffset})`,
            transition: `transform 350ms ${smoothEasing}`,
            willChange: 'transform',
          }"
        >
          <span
            v-for="(char, i) in bottomText.split('')"
            :key="`bottom-${col}-${i}`"
            class="font-clash inline-block color-pureBlack font-normal tracking-tight dark:color-pureWhite"
            :style="{
              fontSize: `${bottomSize}vw`,
              opacity: '0',
              animation: `kineticTypeIn 0.5s ${bounceEasing} ${i * 0.04}s forwards`,
              lineHeight: '1',
            }"
          >
            {{ char }}
          </span>
        </div>
      </div>
    </div>

    <div
      v-else
      class="absolute inset-0 flex items-center justify-center"
      :style="{ animation: `carouselLoop 2.2s ${smoothEasing} 0.8s forwards` }"
    >
      <div
        v-for="col in columns"
        :key="col"
        class="absolute flex shrink-0 flex-col items-center leading-none"
        :style="{
          left: `calc(50% + ${col * columnGap}vw)`,
          top: '50%',
          transform: 'translate(-50%, -50%)',
          gap: '0.5vw',
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }"
      >
        <div class="flex">
          <span
            v-for="(char, charIndex) in topText.split('')"
            :key="`top-${charIndex}`"
            class="font-clash inline-block color-pureBlack font-normal tracking-tight dark:color-pureWhite"
            :style="{
              'fontSize': `${topSize}vw`,
              '--final-scaleX': String(letterDistortions[col]?.[charIndex]?.scaleX ?? 1),
              '--final-scaleY': String(letterDistortions[col]?.[charIndex]?.scaleY ?? 1),
              '--final-skew': `${letterDistortions[col]?.[charIndex]?.skew ?? 0}deg`,
              '--final-rotateY': `${letterDistortions[col]?.[charIndex]?.rotateY ?? 0}deg`,
              '--final-depth': `${letterDistortions[col]?.[charIndex]?.depth ?? 0}px`,
              'transformStyle': 'preserve-3d',
              'animation': `letterWobbleDistortSmooth 1.05s ${smoothEasing} 0s 1 forwards, letterSwoosh 0.46s ${smoothEasing} ${1.8 + 0.06 * charIndex}s forwards`,
            }"
          >
            {{ char }}
          </span>
        </div>
        <div class="flex">
          <span
            v-for="(char, charIndex) in bottomText.split('')"
            :key="`bottom-${charIndex}`"
            class="font-clash inline-block color-pureBlack font-normal tracking-tight dark:color-pureWhite"
            :style="{
              'fontSize': `${bottomSize}vw`,
              '--final-scaleX': String(letterDistortions[col]?.[charIndex + 7]?.scaleX ?? 1),
              '--final-scaleY': String(letterDistortions[col]?.[charIndex + 7]?.scaleY ?? 1),
              '--final-skew': `${letterDistortions[col]?.[charIndex + 7]?.skew ?? 0}deg`,
              '--final-rotateY': `${letterDistortions[col]?.[charIndex + 7]?.rotateY ?? 0}deg`,
              '--final-depth': `${letterDistortions[col]?.[charIndex + 7]?.depth ?? 0}px`,
              'transformStyle': 'preserve-3d',
              'animation': `letterWobbleDistortSmooth 1.05s ${smoothEasing} 0s 1 forwards, letterSwoosh 0.46s ${smoothEasing} ${1.8 + 0.06 * charIndex}s forwards`,
            }"
          >
            {{ char }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes kineticTypeIn {
  0% {
    opacity: 0;
    transform: translateY(-35px) scaleX(1.2) scaleY(0.75) skewX(-6deg);
  }
  60% {
    opacity: 1;
    transform: translateY(-3px) scaleX(0.97) scaleY(1.03) skewX(2deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scaleX(1) scaleY(1) skewX(0deg);
  }
}

@keyframes containerWobbleSmooth {
  0% {
    transform: translateX(0);
  }
  12% {
    transform: translateX(-8px);
  }
  28% {
    transform: translateX(6px);
  }
  45% {
    transform: translateX(-4px);
  }
  62% {
    transform: translateX(3px);
  }
  78% {
    transform: translateX(-1px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes letterWobbleDistortSmooth {
  0% {
    transform: translateZ(0) rotateY(0deg) scaleX(1) scaleY(1) skewX(0deg);
  }
  15% {
    transform: translateZ(10px) rotateY(-7deg) scaleX(0.9) scaleY(1.08) skewX(-6deg);
  }
  32% {
    transform: translateZ(18px) rotateY(10deg) scaleX(1.12) scaleY(0.92) skewX(5deg);
  }
  48% {
    transform: translateZ(8px) rotateY(-5deg) scaleX(0.94) scaleY(1.05) skewX(-3deg);
  }
  100% {
    transform: translateZ(var(--final-depth, 0px)) rotateY(var(--final-rotateY, 0deg)) scaleX(var(--final-scaleX))
      scaleY(var(--final-scaleY)) skewX(var(--final-skew));
  }
}

@keyframes carouselLoop {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  80% {
    transform: translateX(var(--column-gap));
    opacity: 1;
  }
  100% {
    transform: translateX(var(--column-gap)) translateY(-15px);
    opacity: 0;
  }
}

@keyframes letterSwoosh {
  0% {
    opacity: 1;
    transform: translateZ(var(--final-depth, 0px)) rotateY(var(--final-rotateY, 0deg)) scaleX(var(--final-scaleX))
      scaleY(var(--final-scaleY)) skewX(var(--final-skew)) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateZ(var(--final-depth, 0px)) rotateY(var(--final-rotateY, 0deg)) scaleX(var(--final-scaleX))
      scaleY(var(--final-scaleY)) skewX(var(--final-skew)) translateY(-25px);
  }
}
</style>
