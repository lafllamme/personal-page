<script lang="ts" setup>
import type { ScrollMarqueeProps } from './ScrollMarquee.model'
import {
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion-v'
import { useClsx } from '~/composables/useClsx'
import { ScrollMarqueePropsDefaults } from './ScrollMarquee.model'

const props = withDefaults(defineProps<ScrollMarqueeProps>(), ScrollMarqueePropsDefaults)

/**
 * Wraps a value between min and max, creating a seamless loop.
 * Equivalent to @motionone/utils wrap function.
 */
function wrap(min: number, max: number, value: number): number {
  const range = max - min
  return ((value - min) % range + range) % range + min
}

// Motion values - matching Framer Motion's approach
const baseX = useMotionValue(0)
const { scrollY } = useScroll()
const scrollVelocity = useVelocity(scrollY)
const smoothVelocity = useSpring(scrollVelocity, {
  damping: 50,
  stiffness: 400,
})
const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
  clamp: false,
})

const x = useTransform(baseX, v => `${wrap(-20, -45, v)}%`)

// Reactive value for template
const xTransform = ref('0%')

// Update transform value when motion value changes
useMotionValueEvent(x, 'change', (latest) => {
  xTransform.value = latest as string
})

// Direction factor (1 or -1)
const directionFactor = ref(1)

// Track if animation has started (for delay)
const hasStarted = ref(false)

// Handle delay
if (props.delay > 0) {
  setTimeout(() => {
    hasStarted.value = true
  }, props.delay)
}
else {
  hasStarted.value = true
}

// Animation frame loop - matching useAnimationFrame from Framer Motion
useAnimationFrame((time, delta) => {
  if (!hasStarted.value)
    return

  let moveBy = directionFactor.value * props.baseVelocity * (delta / 1000)

  // Reverse direction if scrollDependent is true
  if (props.scrollDependent) {
    const factor = velocityFactor.get()
    if (factor < 0) {
      directionFactor.value = -1
    }
    else if (factor > 0) {
      directionFactor.value = 1
    }
  }

  moveBy += directionFactor.value * moveBy * velocityFactor.get()

  baseX.set(baseX.get() + moveBy)
})
</script>

<template>
  <div class="flex flex-nowrap overflow-hidden whitespace-nowrap">
    <div
      class="flex flex-nowrap gap-10 whitespace-nowrap"
      :style="{ transform: `translateX(${xTransform})` }"
    >
      <span
        v-for="index in 4"
        :key="index"
        :class="useClsx('block sm:text-[8vw] text-[11vw]', props.className)"
      >
        <slot />
      </span>
    </div>
  </div>
</template>
