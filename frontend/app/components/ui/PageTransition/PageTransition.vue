<script setup lang="ts">
import { START_LOCATION } from 'vue-router'

const stripCount = 20
const STRIP_DURATION_MS = 1300
const STRIP_STAGGER_MS = 35
const TOTAL_DURATION_MS = STRIP_DURATION_MS + (stripCount - 1) * STRIP_STAGGER_MS
const STAGGER_MAX_MS = STRIP_STAGGER_MS * (stripCount - 1)
const STAGGER_CURVE = 0.82
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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function delayFromOrigin(index: number, originIndex: number) {
  const maxDist = Math.max(originIndex, (stripCount - 1) - originIndex)
  if (maxDist <= 0)
    return 0
  const dist = Math.abs(index - originIndex) / maxDist
  return Math.pow(clamp(dist, 0, 1), STAGGER_CURVE) * STAGGER_MAX_MS
}

function delayForCover(index: number) {
  if (variant.value === 'center') {
    const centerIndex = (stripCount - 1) / 2
    return delayFromOrigin(index, centerIndex)
  }
  return delayFromOrigin(index, 0)
}

function delayForReveal(index: number) {
  if (variant.value === 'center') {
    const offCenter = Math.round((stripCount - 1) * 0.6)
    return delayFromOrigin(index, offCenter)
  }
  return delayFromOrigin(index, stripCount - 1)
}

function stripStyle(index: number) {
  return {
    '--strip-index': index,
    '--strip-count': stripCount,
    '--delay-in': `${delayForCover(index)}ms`,
    '--delay-out': `${delayForReveal(index)}ms`,
    'opacity': index % 2 === 0 ? '1' : '0.92',
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
  await delay(TOTAL_DURATION_MS)
}

async function playIn() {
  if (!import.meta.client)
    return

  phase.value = 'reveal'
  await delay(TOTAL_DURATION_MS)
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
    return true
  })

  stopAfter = router.afterEach(async () => {
    await nextTick()
    await playIn()
    isTransitioning.value = false
    isPageTransitionActive.value = false
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
    :style="{ '--strip-color': stripColor }"
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
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 1.3s;
  will-change: transform;
}

.transition-strips.is-cover .transition-strip {
  transform: scaleY(1);
  transition-delay: var(--delay-in);
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

.transition-strips.is-reveal .transition-strip {
  transform: scaleY(0);
  transition-delay: var(--delay-out);
  transition-timing-function: cubic-bezier(0.6, 0, 0.9, 0.3);
}
</style>
