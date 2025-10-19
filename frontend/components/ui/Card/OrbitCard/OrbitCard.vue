<script setup lang="ts">
import { Motion, useAnimationControls, useMotionValue } from 'motion-v'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

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
const cardRef = ref<HTMLElement | null>(null)
const velocityRef = ref({ x: 0, y: 0 })

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
  const el = cardRef.value
  if (!el)
    return

  const rect = el.getBoundingClientRect()
  const margin = 50
  let needsBounce = false
  let newX = x.get()
  let newY = y.get()

  if (rect.left < margin) {
    newX = x.get() + (margin - rect.left) * 1.5
    velocityRef.value.x = Math.abs(velocityRef.value.x) * 0.6
    needsBounce = true
  }
  if (rect.right > window.innerWidth - margin) {
    newX = x.get() - (rect.right - (window.innerWidth - margin)) * 1.5
    velocityRef.value.x = -Math.abs(velocityRef.value.x) * 0.6
    needsBounce = true
  }
  if (rect.top < margin) {
    newY = y.get() + (margin - rect.top) * 1.5
    velocityRef.value.y = Math.abs(velocityRef.value.y) * 0.6
    needsBounce = true
  }
  if (rect.bottom > window.innerHeight - margin) {
    newY = y.get() - (rect.bottom - (window.innerHeight - margin)) * 1.5
    velocityRef.value.y = -Math.abs(velocityRef.value.y) * 0.6
    needsBounce = true
  }

  if (needsBounce) {
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
  const float = () => {
    const currentX = x.get()
    const currentY = y.get()

    const moveRange = 165 + (Math.random() - 0.5) * 30
    const targetX = currentX + (Math.random() - 0.5) * moveRange
    const targetY = currentY + (Math.random() - 0.5) * moveRange

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
    float()
    floatIntervalRef.value = setInterval(float, 18000)
  }, 2500 + props.index * 200)

  hoverTimerRef.value = initialDelay as unknown as ReturnType<typeof setTimeout>
}

onMounted(() => {
  boundaryCheckIntervalRef.value = setInterval(checkBoundaries, 500) as unknown as ReturnType<typeof setInterval>
  startFloating()
})

onBeforeUnmount(() => {
  if (hoverTimerRef.value)
    clearTimeout(hoverTimerRef.value)
  if (floatIntervalRef.value)
    clearInterval(floatIntervalRef.value)
  if (boundaryCheckIntervalRef.value)
    clearInterval(boundaryCheckIntervalRef.value)
})

// Drag handlers
interface PanInfo {
  velocity: { x: number, y: number }
}

function handleDragStart() {
  isDragging.value = true
  if (hoverTimerRef.value)
    clearTimeout(hoverTimerRef.value)
  isHoverActive.value = false
  emit('update:hoveredId', null)
  if (floatIntervalRef.value)
    clearInterval(floatIntervalRef.value)
}

function handleDragEnd(_: any, info: PanInfo) {
  isDragging.value = false
  emit('update:hoveredId', null)

  velocityRef.value = {
    x: info.velocity.x,
    y: info.velocity.y,
  }

  setTimeout(checkBoundaries, 50)
  startFloating()
}

// Hover with native mouse events (robust across SSR/builds)
function handleMouseEnter() {
  if (hoverTimerRef.value)
    clearTimeout(hoverTimerRef.value)
  hoverTimerRef.value = setTimeout(() => {
    isHoverActive.value = true
    emit('update:hoveredId', props.post.id)
  }, 2000)
}

function handleMouseLeave() {
  if (hoverTimerRef.value)
    clearTimeout(hoverTimerRef.value)
  isHoverActive.value = false
  emit('update:hoveredId', null)
}

const isHovered = computed(() => isHoverActive.value && props.hoveredId === props.post.id)
const isOtherHovered = computed(() => props.hoveredId !== null && props.hoveredId !== props.post.id)
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
    :initial="{ opacity: 0, scale: 0.8, x: startPos.x, y: startPos.y }"
    :while-in-view="{
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: props.index * 0.15, ease: [0.22, 1, 0.36, 1] },
    }"
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
      :animate="{
        opacity: isOtherHovered ? 0.08 : 1,
        scale: isOtherHovered ? 0.88 : 1,
        filter: isOtherHovered ? 'blur(16px)' : 'blur(0px)',
        borderColor: isHovered ? 'hsl(var(--foreground) / 0.5)' : 'hsl(var(--border))',
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
        {{ String(props.index + 1).padStart(2, '0') }}
      </Motion>

      <div class="pointer-events-none relative z-10 h-full flex flex-col">
        <Motion
          tag="h2"
          class="text-balance text-4xl text-foreground font-extralight leading-[1.1] tracking-tight md:text-5xl"
          :animate="{
            opacity: isHovered ? 0 : 1,
            y: isHovered ? -40 : 0,
            textAlign: isHovered ? 'left' : 'center',
          }"
          :transition="{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }"
          :style="{
            position: isHovered ? 'relative' : 'absolute',
            top: isHovered ? '0' : '50%',
            left: isHovered ? '0' : '50%',
            transform: isHovered ? 'none' : 'translate(-50%, -50%)',
            width: '100%',
            paddingLeft: isHovered ? '0' : '2rem',
            paddingRight: isHovered ? '0' : '2rem',
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
