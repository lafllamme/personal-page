<script setup lang="ts">
import { START_LOCATION } from 'vue-router'

const stripCount = 17
const STRIP_DURATION_MS = 700
const STRIP_STAGGER_MS = 16
const CENTER_DURATION_MS = 640
const CENTER_STAGGER_MS = 12
const CENTER_STAGGER_CURVE = 0.82
const SWEEP_STAGGER_CURVE = 1
const colorMode = useColorMode()
const stripColor = computed(() => (colorMode.value === 'dark' ? '#012622' : '#9CE0D0'))

const isVisible = ref(false)
const phase = ref<'idle' | 'cover' | 'reveal'>('idle')
const variant = ref<'center' | 'sweep'>('center')
const isTransitioning = ref(false)
const isPageTransitionActive = useState('isPageTransitionActive', () => false)
const hasPlayedInitial = ref(false)
let stopBefore: void | (() => void)
let stopAfter: void | (() => void)
let revealPromise: Promise<void> | null = null

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function getStripDurationMs() {
  return variant.value === 'center' ? CENTER_DURATION_MS : STRIP_DURATION_MS
}

function getStripStaggerMs() {
  return variant.value === 'center' ? CENTER_STAGGER_MS : STRIP_STAGGER_MS
}

function getTotalDurationMs() {
  const duration = getStripDurationMs()
  const stagger = getStripStaggerMs()
  return duration + (stripCount - 1) * stagger
}

function delayFromOrigin(index: number, originIndex: number, curve: number) {
  const maxDist = Math.max(originIndex, (stripCount - 1) - originIndex)
  if (maxDist <= 0)
    return 0
  const dist = Math.abs(index - originIndex) / maxDist
  const staggerMax = getStripStaggerMs() * (stripCount - 1)
  return Math.pow(clamp(dist, 0, 1), curve) * staggerMax
}

function delayForCover(index: number) {
  if (variant.value === 'center') {
    const centerIndex = (stripCount - 1) / 2
    return delayFromOrigin(index, centerIndex, CENTER_STAGGER_CURVE)
  }
  return delayFromOrigin(index, stripCount - 1, SWEEP_STAGGER_CURVE)
}

function delayForReveal(index: number) {
  return delayForCover(index)
}

function stripStyle(index: number) {
  return {
    '--strip-index': index,
    '--strip-count': stripCount,
    '--delay-in': `${delayForCover(index)}ms`,
    '--delay-out': `${delayForReveal(index)}ms`,
    '--strip-duration': `${getStripDurationMs()}ms`,
  }
}

function delay(ms: number) {
  return new Promise<void>(resolve => window.setTimeout(resolve, ms))
}

async function playOut() {
  if (!import.meta.client)
    return

  isVisible.value = true
  phase.value = 'idle'
  await nextTick()
  await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
  phase.value = 'cover'
  await delay(getTotalDurationMs())
}

async function playIn() {
  if (!import.meta.client)
    return

  phase.value = 'reveal'
  await delay(getTotalDurationMs())
  isVisible.value = false
  phase.value = 'idle'
}

onMounted(async () => {
  if (!hasPlayedInitial.value) {
    hasPlayedInitial.value = true
    variant.value = Math.random() > 0.5 ? 'center' : 'sweep'
    isPageTransitionActive.value = true
    await playOut()
    await playIn()
    isPageTransitionActive.value = false
  }

  const router = useRouter()
  stopBefore = router.beforeEach(async (to, from) => {
    const isHashOnlyNavigation = to.path === from.path && to.hash && to.hash !== from.hash
    if (isTransitioning.value || from === START_LOCATION || isHashOnlyNavigation)
      return true

    isTransitioning.value = true
    variant.value = Math.random() > 0.5 ? 'center' : 'sweep'
    isPageTransitionActive.value = true
    await playOut()
    revealPromise = (async () => {
      await playIn()
      isTransitioning.value = false
      isPageTransitionActive.value = false
      revealPromise = null
    })()
    return true
  })

  stopAfter = router.afterEach(() => {
    if (revealPromise)
      revealPromise.catch(() => {})
  })
})

onBeforeUnmount(() => {
  if (typeof stopBefore === 'function')
    stopBefore()
  if (typeof stopAfter === 'function')
    stopAfter()
})
</script>

<template>
  <div
    v-show="isVisible"
    class="transition-strips"
    :class="{
      'is-cover': phase === 'cover',
      'is-reveal': phase === 'reveal',
    }"
    :style="{
      '--strip-color': stripColor,
    }"
  >
    <div
      v-for="index in stripCount"
      :key="index"
      class="transition-strip"
      :style="stripStyle(index - 1)"
    />
  </div>
</template>

<style>
.transition-strips {
  position: fixed;
  inset: 0;
  z-index: 80;
  pointer-events: none;
  overflow: hidden;
}

.transition-strip {
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc((100% / var(--strip-count)) * var(--strip-index));
  width: calc(100% / var(--strip-count) + 1px);
  background: var(--strip-color);
  transform: translateY(100%);
  transition: transform var(--strip-duration);
  will-change: transform;
}

.transition-strips.is-cover .transition-strip {
  transform: translateY(0);
  transition-delay: var(--delay-in);
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

.transition-strips.is-reveal .transition-strip {
  transform: translateY(-100%);
  transition-delay: var(--delay-out);
  transition-timing-function: cubic-bezier(0.6, 0, 0.9, 0.3);
}
</style>
