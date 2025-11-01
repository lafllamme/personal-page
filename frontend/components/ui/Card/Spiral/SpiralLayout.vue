<script setup lang="ts">
import SpiralCard from '@/components/ui/Card/Spiral/SpiralCard.vue'
import SpiralControls from '@/components/ui/Card/Spiral/SpiralControls.vue'

// Blog post definitions used to populate the spiral layout.  This
// matches the mock data from the original React application and
// provides a simple interface for type safety when working with
// TypeScript in Vue.
interface BlogPost {
  id: number
  title: string
  date: string
  category: string
  imageUrl: string
}

// Props
const props = defineProps<{ posts: BlogPost[] }>()

// Constants matching those in the React implementation.
const RADIUS = 600
const ROTATION_SPEED = 0.125
const CARD_HEIGHT = 550
const VERTICAL_SPACING = 150
const SMOOTHING = 0.15
const FRICTION = 0.95

// Reactive state
const displayRotation = ref(0)
const targetRotation = ref(0)
const velocity = ref(0)
const containerRef = ref<HTMLElement | null>(null)

// Derived values
const NUM_POSTS = computed(() => props.posts.length)
const ANGLE_STEP = computed(() => 360 / NUM_POSTS.value)

// Navigation handlers
function handleNext() {
  targetRotation.value -= ANGLE_STEP.value
  velocity.value = 0
}

function handlePrev() {
  targetRotation.value += ANGLE_STEP.value
  velocity.value = 0
}

// Wheel handler accumulates velocity based on scroll delta
function handleWheel(event: WheelEvent) {
  event.preventDefault()
  const rawDelta = event.deltaY
  const clampedDelta = Math.max(Math.min(rawDelta, 120), -120)
  const delta = clampedDelta * ROTATION_SPEED * -1
  velocity.value += delta * 0.1
}

// Utility to wrap degrees to the 0–360 range
function wrapDeg(deg: number) {
  let n = deg % 360
  if (n < 0)
    n += 360
  return n
}

// Computed values used in the template
const wrappedRotation = computed(() => wrapDeg(displayRotation.value))
const centerIndexFloat = computed(() => {
  if (ANGLE_STEP.value === 0)
    return 0
  let c = -displayRotation.value / ANGLE_STEP.value
  c = ((c % NUM_POSTS.value) + NUM_POSTS.value) % NUM_POSTS.value
  return c
})
const currentIndex = computed(() => {
  const idx = Math.round(centerIndexFloat.value)
  const mod = ((idx % NUM_POSTS.value) + NUM_POSTS.value) % NUM_POSTS.value
  return mod
})

/**
 * Compute the inline style for a given card index.  This function
 * matches the calculations in the React component but adapts them
 * for Vue.  It returns an object that can be bound directly to the
 * `style` attribute on a <div>.
 */
function getCardStyle(index: number) {
  const baseAngle = index * ANGLE_STEP.value
  const currentAngle = baseAngle + wrappedRotation.value

  // Compute the continuous difference between this card and the center
  let diffFloat = index - centerIndexFloat.value
  if (diffFloat > NUM_POSTS.value / 2) {
    diffFloat -= NUM_POSTS.value
  }
  else if (diffFloat < -NUM_POSTS.value / 2) {
    diffFloat += NUM_POSTS.value
  }
  const verticalOffset = diffFloat * VERTICAL_SPACING

  // Vertical fade/blur based on distance from centre
  const MAX_BLUR_PX = 10
  const MAX_STEPS = 3.0
  const FADE_START_STEPS = 2.0
  const absDiffFloat = Math.abs(diffFloat)
  let verticalFadeFactor = 1
  if (absDiffFloat > FADE_START_STEPS) {
    const fadeRange = MAX_STEPS - FADE_START_STEPS
    verticalFadeFactor = 1 - Math.min(1, (absDiffFloat - FADE_START_STEPS) / fadeRange)
  }

  // Depth, scale and opacity calculations
  const depthFactor = Math.cos((currentAngle * Math.PI) / 180)
  const scaleFactor = 0.8 + 0.2 * ((depthFactor + 1) / 2)
  const depthOpacity = 0.5 + 0.5 * ((depthFactor + 1) / 2)
  const combinedOpacity = depthOpacity * verticalFadeFactor
  const blurAmount = MAX_BLUR_PX * (1 - verticalFadeFactor)

  return {
    top: '50%',
    left: '50%',
    marginLeft: '-200px',
    marginTop: `calc(-${CARD_HEIGHT / 2}px + ${verticalOffset}px)`,
    transform: `rotateY(${baseAngle + wrappedRotation.value}deg) translateZ(${RADIUS}px) rotateY(-${baseAngle + wrappedRotation.value}deg) scale(${scaleFactor})`,
    opacity: combinedOpacity.toString(),
    filter: `blur(${blurAmount}px)`,
    pointerEvents: combinedOpacity < 0.1 ? 'none' : 'auto',
  }
}

// Animation loop and event listeners
onMounted(() => {
  let frame: number
  const tick = () => {
    // Apply friction to velocity
    velocity.value *= FRICTION
    if (Math.abs(velocity.value) < 0.01) {
      velocity.value = 0
    }
    // Update target rotation based on current velocity
    targetRotation.value += velocity.value
    // Smoothly interpolate display rotation towards the target
    const target = targetRotation.value
    displayRotation.value += (target - displayRotation.value) * SMOOTHING
    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
  // Attach wheel listener
  const container = containerRef.value
  if (container) {
    container.addEventListener('wheel', handleWheel, { passive: false })
  }
  // Clean up on unmount
  onUnmounted(() => {
    cancelAnimationFrame(frame)
    if (container) {
      container.removeEventListener('wheel', handleWheel)
    }
  })
})
</script>

<template>
  <div
    ref="containerRef"
    class="relative h-screen w-full touch-pan-y overflow-hidden overscroll-none bg-pureWhite dark:bg-pureBlack"
  >
    <!-- Controls positioned outside of the 3D container -->
    <SpiralControls
      :current-index="currentIndex"
      :total-posts="NUM_POSTS"
      :on-prev="handlePrev"
      :on-next="handleNext"
    />
    <div class="fixed inset-0 flex items-center justify-center">
      <div class="relative h-full w-full flex preserve-3d items-center justify-center -perspective-[90000px]">
        <div
          v-for="(post, index) in posts"
          :key="post.id"
          class="absolute cursor-pointer"
          :style="getCardStyle(index)"
        >
          <SpiralCard :post="post" />
        </div>
      </div>
    </div>
  </div>
</template>
