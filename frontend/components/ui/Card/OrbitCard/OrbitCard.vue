<script setup lang="ts">
import { Motion, useAnimationControls, useMotionValue } from 'motion-v'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

interface Post {
  id: number
  title: string
  date: string
  category: string
  description: string
}

interface Props {
  post: Post
  index: number
  hoveredId: number | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:hoveredId', value: number | null): void
}>()

// Motion state
const x = useMotionValue(0)
const y = useMotionValue(0)
const controls = useAnimationControls()

const isDragging = ref(false)
const isHoverActive = ref(false)

const hoverTimerRef = ref<ReturnType<typeof setTimeout> | null>(null)
const floatIntervalRef = ref<ReturnType<typeof setInterval> | null>(null)
const boundaryCheckIntervalRef = ref<ReturnType<typeof setInterval> | null>(null)
// Motion component ref may be a component instance; resolve to DOM before use
const cardRef = ref<any>(null)
const velocityRef = ref({ x: 0, y: 0 })

// Guard hover so idle cursor doesn't trigger hover when cards float under it
const lastPointerMoveAt = ref(0)
const HOVER_GUARD_MS = 300

function handlePointerActivity() {
  lastPointerMoveAt.value = performance.now()
}

// Grid starting positions (same as React)
const gridPositions = [
  { x: 0, y: 0 },
  { x: 360, y: 0 },
  { x: 720, y: 0 },
  { x: 180, y: 300 },
  { x: 540, y: 300 },
]
const startPos = computed(() => gridPositions[props.index] || { x: 0, y: 0 })

// Boundary check + bounce
function checkBoundaries() {
  const maybe = cardRef.value as any
  const el: HTMLElement | null
    = maybe instanceof HTMLElement
      ? maybe
      : (maybe && maybe.$el instanceof HTMLElement)
          ? (maybe.$el as HTMLElement)
          : null
  if (!el) {
    consola.debug(`[OrbitCard ${props.index}] checkBoundaries - no element found`)
    return
  }

  const rect = el.getBoundingClientRect()
  const margin = 50
  let needsBounce = false
  let newX = x.get()
  let newY = y.get()

  if (rect.left < margin) {
    newX = x.get() + (margin - rect.left) * 1.5
    velocityRef.value.x = Math.abs(velocityRef.value.x) * 0.6
    needsBounce = true
    consola.debug(`[OrbitCard ${props.index}] boundary bounce LEFT - rect.left: ${rect.left}, newX: ${newX}`)
  }
  if (rect.right > window.innerWidth - margin) {
    newX = x.get() - (rect.right - (window.innerWidth - margin)) * 1.5
    velocityRef.value.x = -Math.abs(velocityRef.value.x) * 0.6
    needsBounce = true
    consola.debug(`[OrbitCard ${props.index}] boundary bounce RIGHT - rect.right: ${rect.right}, window.innerWidth: ${window.innerWidth}, newX: ${newX}`)
  }
  if (rect.top < margin) {
    newY = y.get() + (margin - rect.top) * 1.5
    velocityRef.value.y = Math.abs(velocityRef.value.y) * 0.6
    needsBounce = true
    consola.debug(`[OrbitCard ${props.index}] boundary bounce TOP - rect.top: ${rect.top}, newY: ${newY}`)
  }
  if (rect.bottom > window.innerHeight - margin) {
    newY = y.get() - (rect.bottom - (window.innerHeight - margin)) * 1.5
    velocityRef.value.y = -Math.abs(velocityRef.value.y) * 0.6
    needsBounce = true
    consola.debug(`[OrbitCard ${props.index}] boundary bounce BOTTOM - rect.bottom: ${rect.bottom}, window.innerHeight: ${window.innerHeight}, newY: ${newY}`)
  }

  if (needsBounce) {
    consola.debug(`[OrbitCard ${props.index}] boundary bounce triggered - newX: ${newX}, newY: ${newY}, isHoverActive: ${isHoverActive.value}, hoveredId: ${props.hoveredId}`)
    controls.start({
      x: newX,
      y: newY,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 25,
        mass: 1.5,
      },
    })
  }
}

// Floating loop
function startFloating() {
  consola.debug(`[OrbitCard ${props.index}] startFloating - isHoverActive: ${isHoverActive.value}, hoveredId: ${props.hoveredId}`)
  const float = () => {
    const currentX = x.get()
    const currentY = y.get()

    const moveRange = 165 + (Math.random() - 0.5) * 30
    const targetX = currentX + (Math.random() - 0.5) * moveRange
    const targetY = currentY + (Math.random() - 0.5) * moveRange

    consola.debug(`[OrbitCard ${props.index}] float movement - current: (${currentX}, ${currentY}) -> target: (${targetX}, ${targetY}), isHoverActive: ${isHoverActive.value}, hoveredId: ${props.hoveredId}`)

    controls.start({
      x: targetX,
      y: targetY,
      transition: {
        duration: 16 + Math.random() * 2,
        ease: [0.16, 0.84, 0.44, 1],
      },
    })

    const localCheck = setInterval(checkBoundaries, 100)
    setTimeout(() => clearInterval(localCheck), 18000)
  }

  const initialDelay = setTimeout(() => {
    consola.debug(`[OrbitCard ${props.index}] initial float starting - isHoverActive: ${isHoverActive.value}, hoveredId: ${props.hoveredId}`)
    float()
    floatIntervalRef.value = setInterval(float, 18000)
  }, 2500 + props.index * 200)

  hoverTimerRef.value = initialDelay as unknown as ReturnType<typeof setTimeout>
}

onMounted(async () => {
  consola.debug(`[OrbitCard ${props.index}] onMounted - initializing card`)
  window.addEventListener('pointermove', handlePointerActivity, { passive: true })
  window.addEventListener('pointerdown', handlePointerActivity, { passive: true })
  await nextTick()
  // Only start once DOM element is available
  checkBoundaries()
  boundaryCheckIntervalRef.value = setInterval(checkBoundaries, 500) as unknown as ReturnType<typeof setInterval>
  startFloating()
  consola.debug(`[OrbitCard ${props.index}] onMounted - card initialized`)
})

onBeforeUnmount(() => {
  consola.debug(`[OrbitCard ${props.index}] onBeforeUnmount - cleaning up timers`)
  if (hoverTimerRef.value)
    clearTimeout(hoverTimerRef.value)
  if (floatIntervalRef.value)
    clearInterval(floatIntervalRef.value)
  if (boundaryCheckIntervalRef.value)
    clearInterval(boundaryCheckIntervalRef.value)
  window.removeEventListener('pointermove', handlePointerActivity)
  window.removeEventListener('pointerdown', handlePointerActivity)
  consola.debug(`[OrbitCard ${props.index}] onBeforeUnmount - cleanup complete`)
})

// Drag handlers
interface PanInfo {
  velocity: { x: number, y: number }
}

function handleDragStart() {
  consola.debug(`[OrbitCard ${props.index}] handleDragStart - isHoverActive: ${isHoverActive.value}, hoveredId: ${props.hoveredId}`)
  isDragging.value = true
  if (hoverTimerRef.value)
    clearTimeout(hoverTimerRef.value)
  isHoverActive.value = false
  emit('update:hoveredId', null)
  if (floatIntervalRef.value)
    clearInterval(floatIntervalRef.value)
  consola.debug(`[OrbitCard ${props.index}] handleDragStart - isDragging: ${isDragging.value}, isHoverActive: ${isHoverActive.value}`)
}

function handleDragEnd(_: any, info: PanInfo) {
  consola.debug(`[OrbitCard ${props.index}] handleDragEnd - isHoverActive: ${isHoverActive.value}, hoveredId: ${props.hoveredId}`)
  isDragging.value = false
  emit('update:hoveredId', null)

  velocityRef.value = {
    x: info.velocity.x,
    y: info.velocity.y,
  }

  setTimeout(checkBoundaries, 50)
  startFloating()
  consola.debug(`[OrbitCard ${props.index}] handleDragEnd - isDragging: ${isDragging.value}, isHoverActive: ${isHoverActive.value}`)
}

// Hover with native mouse events (robust across SSR/builds)
function handleMouseEnter() {
  consola.debug(`[OrbitCard ${props.index}] handleMouseEnter - isHoverActive: ${isHoverActive.value}, hoveredId: ${props.hoveredId}`)
  const now = performance.now()
  const delta = now - lastPointerMoveAt.value
  if (delta > HOVER_GUARD_MS) {
    consola.debug(`[OrbitCard ${props.index}] handleMouseEnter - ignored (stale pointer, delta=${Math.round(delta)}ms)`)
    return
  }
  if (hoverTimerRef.value)
    clearTimeout(hoverTimerRef.value)
  hoverTimerRef.value = setTimeout(() => {
    consola.debug(`[OrbitCard ${props.index}] hover timeout triggered - setting hover active`)
    isHoverActive.value = true
    emit('update:hoveredId', props.post.id)
    consola.debug(`[OrbitCard ${props.index}] emitted hoveredId: ${props.post.id}, isHoverActive: ${isHoverActive.value}`)
  }, 2000)
  consola.debug(`[OrbitCard ${props.index}] hover timeout set for 2000ms`)
}

function handleMouseLeave() {
  consola.debug(`[OrbitCard ${props.index}] handleMouseLeave - isHoverActive: ${isHoverActive.value}, hoveredId: ${props.hoveredId}`)
  if (hoverTimerRef.value)
    clearTimeout(hoverTimerRef.value)
  isHoverActive.value = false
  emit('update:hoveredId', null)
  consola.debug(`[OrbitCard ${props.index}] emitted hoveredId: null, isHoverActive: ${isHoverActive.value}`)
}

const isHovered = computed(() => {
  const result = isHoverActive.value && props.hoveredId === props.post.id
  consola.debug(`[OrbitCard ${props.index}] isHovered computed - isHoverActive: ${isHoverActive.value}, hoveredId: ${props.hoveredId}, post.id: ${props.post.id}, result: ${result}`)
  return result
})

const isOtherHovered = computed(() => {
  const result = props.hoveredId !== null && props.hoveredId !== props.post.id
  consola.debug(`[OrbitCard ${props.index}] isOtherHovered computed - hoveredId: ${props.hoveredId}, post.id: ${props.post.id}, result: ${result}`)
  return result
})
</script>

<template>
  <Motion
    ref="cardRef"
    :drag="true"
    :drag-momentum="true"
    :drag-elastic="0.05"
    :drag-transition="{ power: 0.15, timeConstant: 400, modifyTarget: undefined }"
    :style="{ x, y }"
    :animate="controls"
    :initial="{ opacity: 1, scale: 1, x: startPos.x, y: startPos.y }"
    class="absolute w-[420px] cursor-grab active:cursor-grabbing"
    :while-hover="{ scale: 1.02, zIndex: 50 }"
    :while-tap="{ scale: 0.98, cursor: 'grabbing' }"
    @drag-start="handleDragStart"
    @drag-end="handleDragEnd"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <Motion
      class="relative h-[340px] overflow-hidden border border-border bg-card/95 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-md"
      :style="{ borderRadius: '32px 8px 32px 8px' }"
      :initial="{ opacity: 0, scale: 0.94 }"
      :animate="{
        opacity: isOtherHovered ? 0.6 : 1,
        scale: isOtherHovered ? 0.96 : 1,
        filter: isOtherHovered ? 'blur(4px)' : 'blur(0px)',
        borderColor: isHovered ? 'hsl(var(--foreground) / 0.5)' : 'hsl(var(--border))',
        boxShadow: isHovered
          ? '0 20px 60px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.1), 0 0 0 1px hsl(var(--foreground) / 0.15)'
          : '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
      }"
      :transition="{
        opacity: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: props.index * 0.12 },
        scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: props.index * 0.12 },
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
        {{ String(props.index + 1).padStart(2, '0') }}
      </Motion>

      <div class="pointer-events-none relative z-10 h-full flex flex-col">
        <Motion
          tag="h2"
          class="text-left text-balance text-4xl text-foreground font-extralight leading-[1.1] tracking-tight md:text-5xl"
          :animate="{ opacity: isHovered ? 0 : 1 }"
          :transition="{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }"
          :style="{
            position: 'relative',
            top: '0',
            left: '0',
            transform: 'none',
            width: '100%',
            paddingLeft: '2rem',
            paddingRight: '2rem',
          }"
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
              tag="span"
              class="text-xl text-foreground/90 font-light tracking-[0.2em] uppercase"
              :initial="{ opacity: 0, x: -20 }"
              :animate="{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }"
              :transition="{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: isHovered ? 0.4 : 0 }"
            >
              {{ props.post.category }}
            </Motion>
            <Motion
              tag="span"
              class="text-lg text-foreground/50"
              :initial="{ opacity: 0 }"
              :animate="{ opacity: isHovered ? 1 : 0 }"
              :transition="{ duration: 0.6, delay: isHovered ? 0.45 : 0 }"
            >
              •
            </Motion>
            <Motion
              tag="span"
              class="text-lg text-foreground/70 font-light tracking-wide"
              :initial="{ opacity: 0, x: -20 }"
              :animate="{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }"
              :transition="{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: isHovered ? 0.5 : 0 }"
            >
              {{ props.post.date }}
            </Motion>
          </div>

          <Motion
            tag="p"
            class="text-pretty text-xl text-foreground/85 font-light leading-relaxed tracking-wide md:text-2xl"
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
