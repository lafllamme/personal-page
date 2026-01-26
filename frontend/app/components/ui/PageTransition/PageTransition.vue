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
const hasPlayedInitial = ref(false)
const currentBackIndex = ref(0)
const lineRefs = ref<HTMLElement[]>([])
const lineHRefs = ref<HTMLElement[]>([])
const backRefs = ref<HTMLElement[]>([])
const { width, height } = useWindowSize()
const isPortrait = computed(() => width.value < height.value)
let stopBefore: void | (() => void)

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

function setTransitionColor(path: string) {
  const color = path === '/'
    ? '#CCFF79'
    : path.includes('about')
      ? '#e8d0ed'
      : '#FF49AB'
  document.documentElement.style.setProperty('--transi-color', color)
}

function triggerBackBlock() {
  const blocks = backRefs.value
  if (!blocks.length)
    return

  const block = blocks[currentBackIndex.value % blocks.length]
  currentBackIndex.value += 1

  const timeline = gsap.timeline()
  timeline
    .set(block, { scaleY: 0, transformOrigin: 'bottom' })
    .to(block, { scaleY: 1, duration: 0.3, ease: 'cubic.out' }, 0)
    .set(block, { transformOrigin: 'top' }, 0.32)
    .to(block, { scaleY: 0, duration: 0.3, ease: 'cubic.in' }, 0.32)
}

function triggerLines(path: string) {
  const useHorizontal = path.includes('about') || isPortrait.value
  const lines = useHorizontal ? lineHRefs.value : lineRefs.value
  if (!lines.length)
    return

  const axis = useHorizontal ? 'xPercent' : 'yPercent'
  const enterFrom = useHorizontal ? -100 : 100
  const exitTo = useHorizontal ? 100 : -100
  const isHome = path === '/'

  lines.forEach((line, index) => {
    gsap.killTweensOf(line)
    gsap.set(line, { autoAlpha: 1, [axis]: enterFrom })

    const baseDelay = useHorizontal
      ? index * 0.03
      : isHome
        ? Math.abs((index - (lines.length - 1) / 2) * 0.03)
        : index * 0.018
    const inDuration = useHorizontal ? 0.8 : (isHome ? 0.5 : 0.4)
    const outDuration = useHorizontal ? 0.4 : 0.5

    gsap.to(line, {
      [axis]: 0,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: inDuration,
      delay: baseDelay,
      ease: 'cubic.out',
      onComplete: () => {
        gsap.to(line, {
          [axis]: exitTo,
          scaleX: 1,
          scaleY: 1,
          duration: outDuration,
          delay: 0.2,
          ease: 'cubic.inOut',
          onComplete: () => {
            gsap.set(line, { autoAlpha: 0 })
          },
        })
      },
    })
  })
}

async function playTransition(path: string) {
  if (!import.meta.client)
    return

  isVisible.value = true
  await nextTick()
  await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))

  setTransitionColor(path)
  triggerBackBlock()
  triggerLines(path)
  await delay(TRANSITION_DELAY_MS)
  isVisible.value = false
}

onMounted(() => {
  if (!hasPlayedInitial.value)
    hasPlayedInitial.value = true

  const router = useRouter()
  stopBefore = router.beforeEach(async (to, from) => {
    const isHashOnlyNavigation = to.path === from.path && to.hash && to.hash !== from.hash
    if (isTransitioning.value || from === START_LOCATION || isHashOnlyNavigation)
      return true

    isTransitioning.value = true
    isPageTransitionActive.value = true
    await playTransition(to.path)
    isTransitioning.value = false
    isPageTransitionActive.value = false
    return true
  })
})

onBeforeUnmount(() => {
  if (typeof stopBefore === 'function')
    stopBefore()
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

.transition-blocks__back-el {
  position: fixed;
  inset: 0;
  background: #fffae6;
  transform: scaleY(0);
  transform-origin: bottom;
}

.transition-blocks__lines,
.transition-blocks__lines-h {
  position: fixed;
  inset: 0;
  display: flex;
  width: 100%;
  height: 100%;
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
