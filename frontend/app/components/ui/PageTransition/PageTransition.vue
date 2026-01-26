<script setup lang="ts">
import { START_LOCATION } from 'vue-router'
import gsap from 'gsap'

const LINE_COUNT = 17
const LINE_H_COUNT = 9
const BACK_BLOCK_COUNT = 3
const TRANSITION_DELAY_MS = 600

const isVisible = ref(false)
const isTransitioning = ref(false)
const isPageTransitionActive = useState('isPageTransitionActive', () => false)
const lineRefs = ref<HTMLElement[]>([])
const lineHRefs = ref<HTMLElement[]>([])
const backRefs = ref<HTMLElement[]>([])
const { width, height } = useWindowSize()
const isPortrait = computed(() => width.value < height.value)
let stopBefore: void | (() => void)
let hideTimeout: number | null = null
let fadeTimeout: number | null = null

onBeforeUpdate(() => {
  lineRefs.value = []
  lineHRefs.value = []
  backRefs.value = []
})

function setLineRef(el: HTMLElement | null) {
  if (el)
    lineRefs.value.push(el)
}

function setLineHRef(el: HTMLElement | null) {
  if (el)
    lineHRefs.value.push(el)
}

function setBackRef(el: HTMLElement | null) {
  if (el)
    backRefs.value.push(el)
}

function delay(ms: number) {
  return new Promise<void>(resolve => window.setTimeout(resolve, ms))
}

type TransitionVariant = {
  id: 'center' | 'sweep' | 'side'
  axis: 'xPercent' | 'yPercent'
  enterFrom: number
  exitTo: number
  inDuration: number
  outDuration: number
  exitDelay: number
  delayForIndex: (index: number, total: number) => number
  color: string
}

const variants: TransitionVariant[] = [
  {
    id: 'center',
    axis: 'yPercent',
    enterFrom: 100,
    exitTo: -100,
    inDuration: 0.5,
    outDuration: 0.53,
    exitDelay: 0.2,
    delayForIndex: (index, total) => Math.abs((index - (total - 1) / 2) * 0.03),
    color: '#CCFF79',
  },
  {
    id: 'sweep',
    axis: 'yPercent',
    enterFrom: 100,
    exitTo: -100,
    inDuration: 0.4,
    outDuration: 0.5,
    exitDelay: 0.2,
    delayForIndex: (index) => index * 0.018,
    color: '#FF49AB',
  },
  {
    id: 'side',
    axis: 'xPercent',
    enterFrom: -100,
    exitTo: 100,
    inDuration: 0.8,
    outDuration: 0.4,
    exitDelay: 0.1,
    delayForIndex: (index) => index * 0.03,
    color: '#e8d0ed',
  },
]

function pickVariant() {
  return variants[Math.floor(Math.random() * variants.length)]
}

function setTransitionColor(color: string) {
  document.documentElement.style.setProperty('--transi-color', color)
}

function triggerBackBlock() {
  const blocks = backRefs.value
  if (!blocks.length)
    return

  const block = blocks[Math.floor(Math.random() * blocks.length)]
  const timeline = gsap.timeline()
  timeline
    .set(block, { scaleY: 0, transformOrigin: 'bottom' })
    .to(block, { scaleY: 1, duration: 0.3, ease: 'cubic.out' }, 0)
    .set(block, { transformOrigin: 'top' }, 0.32)
    .to(block, { scaleY: 0, duration: 0.3, ease: 'cubic.in' }, 0.32)
}

function triggerLines(variant: TransitionVariant) {
  const useHorizontal = variant.axis === 'xPercent' || isPortrait.value
  const lines = useHorizontal ? lineHRefs.value : lineRefs.value
  if (!lines.length)
    return 0

  const axis = useHorizontal ? 'xPercent' : 'yPercent'
  const enterFrom = useHorizontal ? -100 : variant.enterFrom
  const exitTo = useHorizontal ? 100 : variant.exitTo
  let maxDuration = 0

  lines.forEach((line, index) => {
    gsap.killTweensOf(line)
    gsap.set(line, { autoAlpha: 1, [axis]: enterFrom })
    const baseDelay = variant.delayForIndex(index, lines.length)
    gsap.to(line, {
      [axis]: 0,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: variant.inDuration,
      delay: baseDelay,
      ease: 'cubic.out',
      onComplete: () => {
        gsap.to(line, {
          [axis]: exitTo,
          scaleX: 1,
          scaleY: 1,
          duration: variant.outDuration,
          delay: variant.exitDelay,
          ease: 'cubic.inOut',
          onComplete: () => {
            gsap.set(line, { autoAlpha: 0 })
          },
        })
      },
    })
    const total = baseDelay + variant.inDuration + variant.exitDelay + variant.outDuration
    if (total > maxDuration)
      maxDuration = total
  })
  return maxDuration
}

async function playTransition() {
  if (!import.meta.client)
    return

  isVisible.value = true
  await nextTick()
  await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))

  const variant = pickVariant()
  setTransitionColor(variant.color)
  triggerBackBlock()
  const totalDuration = triggerLines(variant)

  if (hideTimeout)
    window.clearTimeout(hideTimeout)
  hideTimeout = window.setTimeout(() => {
    isVisible.value = false
    hideTimeout = null
  }, Math.max(TRANSITION_DELAY_MS, totalDuration * 1000 + 100))

  document.body.classList.add('is-page-transitioning')
  if (fadeTimeout)
    window.clearTimeout(fadeTimeout)
  fadeTimeout = window.setTimeout(() => {
    document.body.classList.remove('is-page-transitioning')
    fadeTimeout = null
  }, Math.max(TRANSITION_DELAY_MS, totalDuration * 1000 + 100))

  await delay(TRANSITION_DELAY_MS)
}

onMounted(() => {
  const allLines = [...lineRefs.value, ...lineHRefs.value]
  allLines.forEach(line => gsap.set(line, { autoAlpha: 0 }))

  const router = useRouter()
  stopBefore = router.beforeEach(async (to, from) => {
    const isHashOnlyNavigation = to.path === from.path && to.hash && to.hash !== from.hash
    if (isTransitioning.value || from === START_LOCATION || isHashOnlyNavigation)
      return true

    isTransitioning.value = true
    isPageTransitionActive.value = true
    await playTransition()
    isTransitioning.value = false
    isPageTransitionActive.value = false
    return true
  })
})

onBeforeUnmount(() => {
  if (typeof stopBefore === 'function')
    stopBefore()
  if (hideTimeout)
    window.clearTimeout(hideTimeout)
  if (fadeTimeout)
    window.clearTimeout(fadeTimeout)
  document.body.classList.remove('is-page-transitioning')
})
</script>

<template>
  <div v-show="isVisible" class="transition-blocks">
    <div
      v-for="index in BACK_BLOCK_COUNT"
      :key="`back-${index}`"
      class="transition-blocks__back-el"
      :ref="setBackRef"
    />
    <div class="transition-blocks__lines">
      <div
        v-for="index in LINE_COUNT"
        :key="`line-${index}`"
        class="transition-blocks__line"
        :style="`animation-delay: ${(index - 1) * 0.08}s;`"
        :ref="setLineRef"
      />
    </div>
    <div class="transition-blocks__lines-h">
      <div
        v-for="index in LINE_H_COUNT"
        :key="`line-h-${index}`"
        class="transition-blocks__line-h"
        :style="`animation-delay: ${(index - 1) * 0.08}s;`"
        :ref="setLineHRef"
      />
    </div>
  </div>
</template>

<style>
.transition-blocks {
  position: fixed;
  inset: 0;
  z-index: 80;
  pointer-events: none;
  overflow: hidden;
}

:root {
  --transi-color: #fee3e3;
}

.is-page-transitioning .page-transition-root {
  opacity: 0.94;
  transition: opacity 0.25s linear;
  will-change: opacity;
}

.page-transition-root {
  transition: opacity 0.25s linear;
}

.transition-blocks__back-el {
  position: fixed;
  inset: 0;
  background: #fffae6;
  transform: scaleY(0);
  transform-origin: bottom;
  z-index: 0;
}

.transition-blocks__lines,
.transition-blocks__lines-h {
  position: fixed;
  inset: 0;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.transition-blocks__lines-h {
  flex-direction: column;
}

.transition-blocks__line,
.transition-blocks__line-h {
  visibility: hidden;
  flex: 1;
  background-image: linear-gradient(80deg, #fff, var(--transi-color));
  background-size: 300% 100%;
  animation: gradient2 2s ease infinite;
  will-change: transform, opacity;
}

.transition-blocks__line {
  width: 100%;
  height: 100%;
  transform: scaleX(1.1);
}

.transition-blocks__line-h {
  width: 100%;
  height: 100%;
  transform: scale(1.01);
  background-size: 300% 200%;
  animation-duration: 1s;
}

@keyframes gradient2 {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
