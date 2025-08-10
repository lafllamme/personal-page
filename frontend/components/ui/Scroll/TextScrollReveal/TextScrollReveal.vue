<script lang="ts" setup>
import type { TextScrollRevealProps } from './TextScrollReveal.model'
import ScrollWord from '@/components/ui/Scroll/ScrollWord/ScrollWord.vue'
import { TextScrollRevealPropsDefaults } from './TextScrollReveal.model'

const props = withDefaults(defineProps<TextScrollRevealProps>(), TextScrollRevealPropsDefaults)
const { height } = useWindowSize()
const { class: classNames, text, heightClass, outroSpacingClass, smoothingMs } = toRefs(props)
const textScrollRevealRef = useTemplateRef('textScrollRevealRef')
const isVisible = useElementVisibility(textScrollRevealRef)

const words = computed(() => text.value.split(' '))
// Precompute stable ranges so we don't recreate arrays for each render
const ranges = computed(() => {
  const currentWords = words.value
  const length = currentWords.length || 1
  return currentWords.map((_, index) => [index / length, (index + 1) / length] as [number, number])
})
const scrollYProgress = ref(0)
const smoothedProgress = ref(0)

// Compute opacities for all words in one pass per frame
const opacities = computed(() => {
  const currentRanges = ranges.value
  const progress = smoothedProgress.value
  return currentRanges.map(([start, end]) => {
    if (progress < start)
      return 0
    if (progress > end)
      return 1
    return (progress - start) / (end - start)
  })
})

/**
 * @description 0 (element top enters viewport) -> 1 (element bottom leaves viewport)
 */
function updateScrollYProgress() {
  if (!textScrollRevealRef.value)
    return
  if (!isVisible.value)
    return

  const el = textScrollRevealRef.value
  const rect = el.getBoundingClientRect()
  const totalScroll = rect.height - height.value

  // Handle edge cases when the element height is smaller than the viewport
  if (totalScroll <= 0) {
    const fullyAbove = rect.bottom <= 0
    const fullyInOrBelow = rect.top >= 0
    scrollYProgress.value = fullyAbove ? 1 : (fullyInOrBelow ? 0 : 0)
    return
  }

  let progress = 1 - (rect.bottom - height.value) / totalScroll

  progress = Math.max(0, Math.min(1, progress))
  scrollYProgress.value = progress
}
// Throttle updates to at most once per frame
const throttledUpdate = useThrottleFn(updateScrollYProgress, 16)

// Smooth progress to avoid jumpy behavior on fast scrolls.
let rafId: number | null = null
let lastTimestamp = 0
function tick(timestamp: number) {
  if (!lastTimestamp)
    lastTimestamp = timestamp

  const delta = timestamp - lastTimestamp
  lastTimestamp = timestamp

  // Exponential smoothing factor based on desired time constant.
  const ms = Math.max(0, smoothingMs?.value ?? 0)
  const alpha = ms > 0 ? 1 - Math.exp(-delta / ms) : 1
  smoothedProgress.value += (scrollYProgress.value - smoothedProgress.value) * alpha

  rafId = requestAnimationFrame(tick)
}

// Passive listeners to avoid main-thread blocking
useEventListener(window, 'scroll', throttledUpdate, { passive: true })
// Resize recalculations: rely on reactive window size to trigger an update
watch(height, throttledUpdate, { immediate: true })
onMounted(() => {
  throttledUpdate()
  if (rafId == null)
    rafId = requestAnimationFrame(tick)
})
onUnmounted(() => {
  if (rafId != null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  lastTimestamp = 0
})
</script>

<template>
  <div
    ref="textScrollRevealRef"
    :class="useClsx('relative z-0', heightClass, classNames)"
  >
    <div class="max-w-8xl sticky top-0 flex items-center bg-transparent py-12 h-svh md:py-20">
      <p
        :class="useClsx(
          'color-mint-12A',
          'flex flex-wrap antialiased',
          'font-semibold uppercase leading-tight tracking-wide font-ginger text-pretty md:text-8vw text-8vh',
        )"
      >
        <ScrollWord
          v-for="(word, i) in words"
          :key="i"
          :word="word"
          :active-class="(i === 4 && scrollYProgress > 0.5) ? 'neon-glow color-purple-10 opacity-var' : 'opacity-var'"
          :opacity="opacities[i]"
        />
      </p>
    </div>
  </div>
  <!-- Outro spacing applied below wrapper to guarantee height contribution -->
  <div :class="useClsx(outroSpacingClass)" aria-hidden="true" />
</template>

<style>
@keyframes glow-pulse-purple {
  from {
    text-shadow:
      0 0 16px rgba(167, 139, 250, 0.64),
      /* slightly more blur, more alpha */ 0 0 32px rgba(139, 92, 246, 0.42),
      0 0 40px rgba(232, 121, 249, 0.18);
  }
  to {
    text-shadow:
      0 0 22px rgba(167, 139, 250, 0.82),
      0 0 40px rgba(139, 92, 246, 0.56),
      0 0 52px rgba(232, 121, 249, 0.32);
  }
}

.neon-glow {
  animation: glow-pulse-purple 2s ease-in-out infinite alternate;
  text-shadow:
    0 0 16px rgba(167, 139, 250, 0.64),
    0 0 32px rgba(139, 92, 246, 0.42),
    0 0 40px rgba(232, 121, 249, 0.18);
}

.opacity-var {
  opacity: var(--o);
  will-change: opacity;
}

@media (prefers-reduced-motion: reduce) {
  .neon-glow {
    animation: none;
  }
}
</style>
