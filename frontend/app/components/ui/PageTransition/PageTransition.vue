<script setup lang="ts">
import { START_LOCATION } from 'vue-router'

const stripCount = 20
const STRIP_DURATION_MS = 1300
const STRIP_STAGGER_MS = 35
const TOTAL_DURATION_MS = STRIP_DURATION_MS + (stripCount - 1) * STRIP_STAGGER_MS
const colorMode = useColorMode()
const stripColor = computed(() => (colorMode.value === 'dark' ? '#012622' : '#9CE0D0'))

const isVisible = ref(false)
const isStripsAnimating = ref(false)
const isTransitioning = ref(false)
const isPageTransitionActive = useState('isPageTransitionActive', () => false)
const hasPlayedInitial = ref(false)
let stopBefore: void | (() => void)
let stopAfter: void | (() => void)

function stripStyle(index: number) {
  return {
    '--strip-index': index,
    '--strip-count': stripCount,
    'transform': isStripsAnimating.value ? 'translateY(100%)' : 'translateY(0)',
    'transition': `transform ${STRIP_DURATION_MS}ms cubic-bezier(0.83, 0, 0.17, 1) ${index * STRIP_STAGGER_MS}ms`,
  }
}

function delay(ms: number) {
  return new Promise<void>(resolve => window.setTimeout(resolve, ms))
}

async function playOut() {
  if (!import.meta.client)
    return

  isVisible.value = true
  isStripsAnimating.value = false
  await nextTick()
  await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
}

async function playIn() {
  if (!import.meta.client)
    return

  isStripsAnimating.value = true
  await delay(TOTAL_DURATION_MS)
  isVisible.value = false
}

onMounted(async () => {
  if (!hasPlayedInitial.value) {
    hasPlayedInitial.value = true
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
  will-change: transform;
}
</style>
