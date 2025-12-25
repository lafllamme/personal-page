<script lang="ts" setup>
import type { OverlayTextProps } from './OverlayText.model'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, toRefs, watch } from 'vue'
import { OverlayTextDefaultProps } from './OverlayText.model'

const props = withDefaults(defineProps<OverlayTextProps>(), OverlayTextDefaultProps)
const { class: classNames } = toRefs(props)

const isVisible = ref(true)
const animationPhase = ref<'typing' | 'collide' | 'settle' | 'band'>('typing')
const renderKey = ref(0)
const containerRef = ref<HTMLDivElement | null>(null)

const topText = 'TECNEWS'
const bottomText = 'tecnews'
const columns = [-4, -3, -2, -1, 0, 1, 2, 3, 4]
const columnGap = 50

const topSize = 7
const bottomSize = 5.5

const introTopOffset = computed(() => `-${20 + topSize / 2}vh`)
const introBottomOffset = computed(() => `${20 + bottomSize / 2}vh`)

const smoothEasing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
const bounceEasing = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

interface LetterDistortion {
  scaleX: number
  scaleY: number
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
      const rotateY = clamp((col * -3.4) + (Math.random() * 14 - 7) * intensity, -18, 18)
      const depth = clamp((10 + Math.random() * 26) * intensity, 0, 36)

      distortions[i] = { scaleX, scaleY, rotateY, depth }
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

const introFontWeight = computed(() => {
  if (animationPhase.value === 'settle')
    return '900'
  return '300'
})

function getIntroLineStyle(position: 'top' | 'bottom') {
  const offset = position === 'top' ? introTopOffset.value : introBottomOffset.value
  const isTyping = animationPhase.value === 'typing'
  const isColliding = animationPhase.value === 'collide'

  return {
    '--intro-offset': offset,
    transform: isTyping || isColliding ? `translateY(${offset})` : 'translateY(0)',
    animation: isColliding
      ? `${position === 'top' ? 'meetBounceTop' : 'meetBounceBottom'} 0.48s ${bounceEasing} forwards`
      : '',
    willChange: 'transform',
  }
}

function getIntroLetterStyle(index: number, size: number) {
  const isTyping = animationPhase.value === 'typing'
  const isColliding = animationPhase.value === 'collide'

  const baseStyle: Record<string, string> = {
    fontSize: `${size}vw`,
    fontWeight: introFontWeight.value,
    opacity: isTyping ? '0' : '1',
    lineHeight: '1',
  }

  if (isTyping)
    baseStyle.animation = `kineticTypeIn 0.5s ${bounceEasing} ${index * 0.04}s forwards`
  else if (isColliding)
    baseStyle.animation = `mergeWeightSnap 0.26s ease-out ${0.04 * index + 0.08}s forwards`

  return baseStyle
}

function runPhases() {
  const phases = [
    { name: 'typing', duration: 650 },
    { name: 'collide', duration: 520 },
    { name: 'settle', duration: 300 },
    { name: 'band', duration: 2600 },
  ]

  let currentPhaseIndex = 0

  const runPhase = () => {
    const phase = phases[currentPhaseIndex]
    animationPhase.value = phase.name as 'typing' | 'collide' | 'settle' | 'band'

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
      v-if="animationPhase !== 'band'"
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
          :style="getIntroLineStyle('top')"
        >
          <span
            v-for="(char, i) in topText.split('')"
            :key="`top-${col}-${i}`"
            class="zalando-sans-expanded inline-block color-pureBlack tracking-tight dark:color-pureWhite"
            :style="getIntroLetterStyle(i, topSize)"
          >
            {{ char }}
          </span>
        </div>

        <div
          class="flex justify-center"
          :style="getIntroLineStyle('bottom')"
        >
          <span
            v-for="(char, i) in bottomText.split('')"
            :key="`bottom-${col}-${i}`"
            class="zalando-sans-expanded inline-block color-pureBlack tracking-tight dark:color-pureWhite"
            :style="getIntroLetterStyle(i, bottomSize)"
          >
            {{ char }}
          </span>
        </div>
      </div>
    </div>

    <div
      v-else
      class="absolute inset-0 flex items-center justify-center"
      :style="{ animation: `carouselLoop 2.2s cubic-bezier(0.28, 0.9, 0.62, 1) 0.8s forwards` }"
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
            class="zalando-sans-expanded inline-block color-pureBlack tracking-tight dark:color-pureWhite"
            :style="{
              'fontSize': `${topSize}vw`,
              'fontWeight': '900',
              '--final-scaleX': String(letterDistortions[col]?.[charIndex]?.scaleX ?? 1),
              '--final-scaleY': String(letterDistortions[col]?.[charIndex]?.scaleY ?? 1),
              '--final-rotateY': `${letterDistortions[col]?.[charIndex]?.rotateY ?? 0}deg`,
              '--final-depth': `${letterDistortions[col]?.[charIndex]?.depth ?? 0}px`,
              'transformStyle': 'preserve-3d',
              'transform': `translateZ(var(--final-depth, 0px)) rotateY(var(--final-rotateY, 0deg)) translateY(0)`,
              'animation': `letterSwoosh 0.46s ${smoothEasing} ${1.8 + 0.06 * charIndex}s forwards`,
            }"
          >
            {{ char }}
          </span>
        </div>
        <div class="flex">
          <span
            v-for="(char, charIndex) in bottomText.split('')"
            :key="`bottom-${charIndex}`"
            class="zalando-sans-expanded inline-block color-pureBlack tracking-tight dark:color-pureWhite"
            :style="{
              'fontSize': `${bottomSize}vw`,
              'fontWeight': '900',
              '--final-scaleX': String(letterDistortions[col]?.[charIndex + 7]?.scaleX ?? 1),
              '--final-scaleY': String(letterDistortions[col]?.[charIndex + 7]?.scaleY ?? 1),
              '--final-rotateY': `${letterDistortions[col]?.[charIndex + 7]?.rotateY ?? 0}deg`,
              '--final-depth': `${letterDistortions[col]?.[charIndex + 7]?.depth ?? 0}px`,
              'transformStyle': 'preserve-3d',
              'transform': `translateZ(var(--final-depth, 0px)) rotateY(var(--final-rotateY, 0deg)) translateY(0)`,
              'animation': `letterSwoosh 0.46s ${smoothEasing} ${1.8 + 0.06 * charIndex}s forwards`,
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
    transform: translateY(-35px) scaleX(1.2) scaleY(0.75);
  }
  60% {
    opacity: 1;
    transform: translateY(-3px) scaleX(0.97) scaleY(1.03);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scaleX(1) scaleY(1);
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
    transform: translateZ(var(--final-depth, 0px)) rotateY(var(--final-rotateY, 0deg)) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateZ(var(--final-depth, 0px)) rotateY(var(--final-rotateY, 0deg)) translateY(-25px);
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

@keyframes mergeWeightSnap {
  0% {
    font-weight: 300;
  }
  60% {
    font-weight: 950;
  }
  100% {
    font-weight: 900;
  }
}
</style>
