<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints, useElementBounding, useThrottleFn, useWindowSize } from '@vueuse/core'
import { consola } from 'consola'
import { animate, Motion, useMotionValue } from 'motion-v'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

interface Post {
  id: number
  title: string
  date: string
  category: string
  description: string
}

const props = defineProps<{
  post: Post
  index: number
  hoveredId: number | null
  setHoveredId: (id: number | null) => void
}>()

// Default grid positions (fallback)
const defaultGridPositions = [
  { x: 0, y: 0 },
  { x: 360, y: 0 },
  { x: 720, y: 0 },
  { x: 180, y: 300 },
  { x: 540, y: 300 },
]

// Motion values - initialize with default position
const initialPos = defaultGridPositions[props.index] ?? { x: 0, y: 0 }
const x = useMotionValue(initialPos.x)
const y = useMotionValue(initialPos.y)
const motionState = ref({ x: initialPos.x, y: initialPos.y })

// Throttled motion value listeners for debugging
let lastLogTime = 0
const logThrottle = 500 // Only log every 500ms

x.on('change', (latest) => {
  const now = Date.now()
  if (now - lastLogTime > logThrottle) {
    consola.debug(`[Card ${props.post.id}] Position:`, { x: latest, y: y.get() })
    lastLogTime = now
  }
})

// UI/interaction states
const isDragging = ref(false)
const isHoverActive = ref(false)
const hoverTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const floatInterval = ref<ReturnType<typeof setInterval> | null>(null)
const velocityRef = ref({ x: 0, y: 0 })
const cardRef = ref<HTMLElement | null>(null)

// VueUse utilities for performance
const { width: windowWidth, height: windowHeight } = useWindowSize()
const { left, right, top, bottom } = useElementBounding(cardRef)

// Tailwind default breakpoints
const breakpoints = useBreakpoints(breakpointsTailwind)

// Responsive starting grid positions
function getGridPositions() {
  const width = windowWidth.value

  if (width < 768) {
    // Mobile: 1 column, single card per row (< 768px)
    return [
      { x: 20, y: 20 },
      { x: 20, y: 200 },
      { x: 20, y: 380 },
      { x: 20, y: 560 },
      { x: 20, y: 740 },
    ]
  }
  else if (width < 1024) {
    // Tablet: 2 columns, medium spacing (768px - 1024px)
    return [
      { x: 30, y: 30 },
      { x: 250, y: 30 },
      { x: 30, y: 250 },
      { x: 250, y: 250 },
      { x: 30, y: 470 },
    ]
  }
  else {
    // Desktop: 3 columns, full spacing (>= 1024px)
    return defaultGridPositions
  }
}

const startPos = computed(() => {
  const positions = getGridPositions()
  return positions[props.index] ?? { x: 0, y: 0 }
})

// Update motion values when startPos changes (responsive)
watch(startPos, (newPos) => {
  x.set(newPos.x)
  y.set(newPos.y)
  motionState.value = { x: newPos.x, y: newPos.y }
}, { immediate: true })

// Responsive card dimensions
const cardWidth = computed(() => {
  const width = windowWidth.value
  if (width < 768)
    return 320 // Mobile: smaller cards
  if (width < 1024)
    return 360 // Tablet: medium cards
  return 420 // Desktop: full size
})

const cardHeight = computed(() => {
  const width = windowWidth.value
  if (width < 768)
    return 260 // Mobile: smaller height
  if (width < 1024)
    return 300 // Tablet: medium height
  return 340 // Desktop: full height
})

const softZone = computed(() => {
  const width = windowWidth.value
  if (width < 768)
    return 40 // Mobile: smaller soft zone
  if (width < 1024)
    return 50 // Tablet: medium soft zone
  return 60 // Desktop: full soft zone
})

const hardBoundary = computed(() => {
  const width = windowWidth.value
  if (width < 768)
    return 15 // Mobile: smaller hard boundary
  if (width < 1024)
    return 18 // Tablet: medium hard boundary
  return 20 // Desktop: full hard boundary
})

// Throttled boundary check for performance
const checkBoundaries = useThrottleFn(() => {
  if (!cardRef.value)
    return

  const currentX = x.get()
  const currentY = y.get()

  // Use VueUse reactive bounding values (much more efficient)
  const isVisuallyCutOff
    = left.value < 0
      || right.value > windowWidth.value
      || top.value < 0
      || bottom.value > windowHeight.value

  if (isVisuallyCutOff) {
    consola.debug(`[Card ${props.post.id}] VISUALLY CUT OFF:`, {
      visualPos: { left: left.value, right: right.value, top: top.value, bottom: bottom.value },
      viewport: { width: windowWidth.value, height: windowHeight.value },
      motionPos: { x: currentX, y: currentY },
    })

    // Calculate correction needed
    let correctionX = 0
    let correctionY = 0

    if (left.value < 0) {
      correctionX = -left.value + hardBoundary.value
    }
    else if (right.value > windowWidth.value) {
      correctionX = windowWidth.value - right.value - hardBoundary.value
    }

    if (top.value < 0) {
      correctionY = -top.value + hardBoundary.value
    }
    else if (bottom.value > windowHeight.value) {
      correctionY = windowHeight.value - bottom.value - hardBoundary.value
    }

    const newX = currentX + correctionX
    const newY = currentY + correctionY

    // Immediate correction
    x.set(newX)
    y.set(newY)
    motionState.value = { x: newX, y: newY }
    velocityRef.value = { x: 0, y: 0 }
    return
  }

  // Motion-based soft resistance (only when visually safe)
  const minX = hardBoundary.value
  const maxX = windowWidth.value - cardWidth.value - hardBoundary.value
  const minY = hardBoundary.value
  const maxY = windowHeight.value - cardHeight.value - hardBoundary.value

  const softMinX = softZone.value
  const softMaxX = windowWidth.value - cardWidth.value - softZone.value
  const softMinY = softZone.value
  const softMaxY = windowHeight.value - cardHeight.value - softZone.value

  let needsAdjustment = false
  let adjustmentX = 0
  let adjustmentY = 0
  let velocityDamping = 1

  // Soft resistance calculations
  if (currentX < softMinX) {
    const penetration = softMinX - currentX
    const resistance = Math.min(penetration / softZone.value, 1)
    adjustmentX = penetration * 0.15
    velocityDamping *= (0.95 - resistance * 0.1)
    needsAdjustment = true
  }
  else if (currentX > softMaxX) {
    const penetration = currentX - softMaxX
    const resistance = Math.min(penetration / softZone.value, 1)
    adjustmentX = -penetration * 0.15
    velocityDamping *= (0.95 - resistance * 0.1)
    needsAdjustment = true
  }

  if (currentY < softMinY) {
    const penetration = softMinY - currentY
    const resistance = Math.min(penetration / softZone.value, 1)
    adjustmentY = penetration * 0.15
    velocityDamping *= (0.95 - resistance * 0.1)
    needsAdjustment = true
  }
  else if (currentY > softMaxY) {
    const penetration = currentY - softMaxY
    const resistance = Math.min(penetration / softZone.value, 1)
    adjustmentY = -penetration * 0.15
    velocityDamping *= (0.95 - resistance * 0.1)
    needsAdjustment = true
  }

  // Hard boundary check
  const isHardOutOfBounds = currentX < minX || currentX > maxX || currentY < minY || currentY > maxY

  if (isHardOutOfBounds) {
    const newX = Math.max(minX, Math.min(maxX, currentX))
    const newY = Math.max(minY, Math.min(maxY, currentY))

    x.set(newX)
    y.set(newY)
    motionState.value = { x: newX, y: newY }
    velocityRef.value = { x: 0, y: 0 }
  }
  else if (needsAdjustment) {
    const newX = currentX + adjustmentX
    const newY = currentY + adjustmentY

    velocityRef.value.x *= velocityDamping
    velocityRef.value.y *= velocityDamping

    animate(motionState.value, { x: newX, y: newY }, {
      type: 'spring',
      stiffness: 15,
      damping: 60,
      mass: 4,
      duration: 0.3,
    })
  }
}, 16) // Throttle to 60fps

// --- Floating motion ---
onMounted(() => {
  if (isDragging.value)
    return

  const startFloating = () => {
    const float = () => {
      const currentX = x.get()
      const currentY = y.get()
      // Responsive move range based on window width
      const width = windowWidth.value
      const baseRange = width < 768 ? 80 : width < 1024 ? 120 : 165
      const moveRange = baseRange + (Math.random() - 0.5) * 30
      const targetX = currentX + (Math.random() - 0.5) * moveRange
      const targetY = currentY + (Math.random() - 0.5) * moveRange

      // Only log float motion occasionally
      if (Math.random() < 0.1) { // 10% chance to log
        consola.debug(`[Card ${props.post.id}] Float motion:`, {
          from: { x: currentX, y: currentY },
          to: { x: targetX, y: targetY },
        })
      }

      animate(motionState.value, { x: targetX, y: targetY }, {
        duration: 16 + Math.random() * 2,
        ease: [0.16, 0.84, 0.44, 1],
      })

      const boundaryCheck = setInterval(checkBoundaries, 200) // Even less frequent for floating motion
      setTimeout(() => clearInterval(boundaryCheck), 18000)
    }

    const initialDelay = setTimeout(() => {
      float()
      floatInterval.value = setInterval(float, 18000)
    }, 2500 + props.index * 200)

    onBeforeUnmount(() => {
      clearTimeout(initialDelay)
      if (floatInterval.value)
        clearInterval(floatInterval.value)
    })
  }

  startFloating()
})

// --- Interaction handlers ---
function handleDragStart() {
  consola.debug(`[Card ${props.post.id}] DRAG START:`, {
    position: { x: x.get(), y: y.get() },
    velocity: { x: velocityRef.value.x, y: velocityRef.value.y },
  })

  isDragging.value = true
  if (hoverTimer.value)
    clearTimeout(hoverTimer.value)
  isHoverActive.value = false
  props.setHoveredId(null)
  if (floatInterval.value)
    clearInterval(floatInterval.value)

  // Optimized boundary checks during drag (throttled function handles the throttling)
  const dragBoundaryCheck = setInterval(() => {
    if (isDragging.value) {
      checkBoundaries()
    }
    else {
      clearInterval(dragBoundaryCheck)
    }
  }, 8) // High frequency calls, but throttled function limits execution
}

function handleDragEnd(_e: any, info: any) {
  consola.debug(`[Card ${props.post.id}] DRAG END:`, {
    position: { x: x.get(), y: y.get() },
    dragVelocity: { x: info.velocity.x, y: info.velocity.y },
    currentVelocity: { x: velocityRef.value.x, y: velocityRef.value.y },
  })

  isDragging.value = false
  props.setHoveredId(null)

  // Check boundaries immediately after drag ends
  checkBoundaries()

  // Apply velocity only if card is within soft bounds
  const currentX = x.get()
  const currentY = y.get()
  a
  const isWithinSoftBounds
    = currentX >= softZone.value
      && currentX <= windowWidth.value - cardWidth.value - softZone.value
      && currentY >= softZone.value
      && currentY <= windowHeight.value - cardHeight.value - softZone.value

  consola.debug(`[Card ${props.post.id}] DRAG END BOUNDS CHECK:`, {
    position: { x: currentX, y: currentY },
    softZone,
    isWithinSoftBounds,
  })

  if (isWithinSoftBounds) {
    velocityRef.value = { x: info.velocity.x, y: info.velocity.y }
    consola.debug(`[Card ${props.post.id}] Applied drag velocity:`, velocityRef.value)
  }
  else {
    velocityRef.value = { x: 0, y: 0 }
    consola.debug(`[Card ${props.post.id}] Reset velocity to 0 (in soft resistance zone)`)
  }
}

function handleHoverStart() {
  if (hoverTimer.value)
    clearTimeout(hoverTimer.value)
  hoverTimer.value = setTimeout(() => {
    isHoverActive.value = true
    props.setHoveredId(props.post.id)
  }, 2000)
}

function handleHoverEnd() {
  if (hoverTimer.value)
    clearTimeout(hoverTimer.value)
  isHoverActive.value = false
  props.setHoveredId(null)
}

const isHovered = computed(
  () => isHoverActive.value && props.hoveredId === props.post.id,
)
const isOtherHovered = computed(
  () => props.hoveredId !== null && props.hoveredId !== props.post.id,
)
</script>

<template>
  <Motion
    ref="cardRef"
    :drag="true"
    :drag-momentum="true"
    :drag-elastic="0.05"
    :drag-transition="{ power: 0.15, timeConstant: 400 }"
    :style="{
      x,
      y,
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
    }"
    :animate="motionState"
    :initial="{ opacity: 0, scale: 0.8, x: startPos.x, y: startPos.y + 100 }"
    :while-in-view="{
      opacity: 1,
      scale: 1,
      x: startPos.x,
      y: startPos.y,
      transition: { duration: 0.8, delay: props.index * 0.15, ease: [0.22, 1, 0.36, 1] },
    }"
    class="absolute cursor-grab active:cursor-grabbing"
    :while-hover="{ scale: 1.02, zIndex: 50 }"
    :while-tap="{ scale: 0.98, cursor: 'grabbing' }"
    @drag-start="handleDragStart"
    @drag-end="handleDragEnd"
    @hover-start="handleHoverStart"
    @hover-end="handleHoverEnd"
  >
    <!-- Card surface -->
    <Motion
      class="relative overflow-hidden border border-border bg-card/95 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-md"
      :style="{
        height: `${cardHeight}px`,
        padding: windowWidth < 768 ? '1rem' : windowWidth < 1024 ? '1.5rem' : '2rem',
        borderRadius: '32px 8px 32px 8px',
      }"
      :animate="{
        opacity: isOtherHovered ? 0.08 : 1,
        scale: isOtherHovered ? 0.88 : 1,
        filter: isOtherHovered ? 'blur(16px)' : 'blur(0px)',
        borderColor: isHovered
          ? 'hsl(var(--foreground) / 0.5)'
          : 'hsl(var(--border))',
        boxShadow: isHovered
          ? '0 20px 60px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.1), 0 0 0 1px hsl(var(--foreground) / 0.15)'
          : '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
      }"
      :transition="{
        opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        filter: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        borderColor: { duration: 0.5 },
        boxShadow: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      }"
    >
      <Motion
        class="absolute inset-0 from-foreground/[0.04] via-transparent to-transparent bg-gradient-to-br"
        :style="{ borderRadius: '32px 8px 32px 8px' }"
        :animate="{ opacity: isHovered ? 1 : 0 }"
        :transition="{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }"
      />
      <Motion
        class="absolute right-6 top-6 select-none text-[120px] text-foreground/[0.08] font-extralight leading-none"
        :animate="{
          opacity: isHovered ? 0 : 1,
          scale: isHovered ? 0.7 : 1,
          x: isHovered ? 30 : 0,
          y: isHovered ? -20 : 0,
        }"
        :transition="{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }"
      >
        {{ String(props.index + 1).padStart(2, "0") }}
      </Motion>

      <div class="pointer-events-none relative z-10 h-full flex flex-col">
        <Motion
          class="text-balance text-foreground font-extralight leading-[1.1] tracking-tight"
          :style="{
            fontSize: windowWidth < 768 ? '1.5rem' : windowWidth < 1024 ? '2rem' : '2.5rem',
            position: isHovered ? 'relative' : 'absolute',
            top: isHovered ? '0' : '50%',
            left: isHovered ? '0' : '50%',
            transform: isHovered ? 'none' : 'translate(-50%, -50%)',
            width: '100%',
            paddingLeft: isHovered ? '0' : '2rem',
            paddingRight: isHovered ? '0' : '2rem',
          }"
          :animate="{
            opacity: isHovered ? 0 : 1,
            y: isHovered ? -40 : 0,
            textAlign: isHovered ? 'left' : 'center',
          }"
          :transition="{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }"
        >
          {{ props.post.title }}
        </Motion>

        <Motion
          class="flex flex-1 flex-col justify-center space-y-8"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: isHovered ? 1 : 0 }"
          :transition="{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: isHovered ? 0.3 : 0 }"
        >
          <div class="flex items-center gap-4">
            <Motion
              class="text-xl text-foreground/90 font-light tracking-[0.2em] uppercase"
              :initial="{ opacity: 0, x: -20 }"
              :animate="{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }"
              :transition="{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: isHovered ? 0.4 : 0 }"
            >
              {{ props.post.category }}
            </Motion>
            <Motion
              class="text-lg text-foreground/50"
              :initial="{ opacity: 0 }"
              :animate="{ opacity: isHovered ? 1 : 0 }"
              :transition="{ duration: 0.6, delay: isHovered ? 0.45 : 0 }"
            >
              •
            </Motion>
            <Motion
              class="text-lg text-foreground/70 font-light tracking-wide"
              :initial="{ opacity: 0, x: -20 }"
              :animate="{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }"
              :transition="{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: isHovered ? 0.5 : 0 }"
            >
              {{ props.post.date }}
            </Motion>
          </div>

          <Motion
            class="text-pretty text-foreground/85 font-light leading-relaxed tracking-wide"
            :style="{
              fontSize: windowWidth < 768 ? '0.875rem' : windowWidth < 1024 ? '1rem' : '1.25rem',
            }"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }"
            :transition="{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: isHovered ? 0.5 : 0 }"
          >
            {{ props.post.description }}
          </Motion>
        </Motion>
      </div>
    </Motion>
  </Motion>
</template>
