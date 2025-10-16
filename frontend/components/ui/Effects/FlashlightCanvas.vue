<script setup lang="ts">
import { useEventListener, useMediaQuery, useRafFn } from '@vueuse/core'
import { computed, onMounted, ref, watch } from 'vue'

interface Props {
  modelValue?: boolean
  radius?: number
  dim?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: true, // Default: flashlight is ON
  radius: 265,
  dim: 0.93,
})

// Animation constants
const ANIMATION_CONFIG = {
  LERP_FACTOR: 0.05, // Lower = smoother movement (was 0.08)
  MIN_DISTANCE: 0.3, // Minimum distance to continue animation (was 0.5)
  GRADIENT_INNER_RATIO: 0.35, // Inner radius ratio for gradient
} as const

const canvasRef = ref<HTMLCanvasElement | null>(null)
const radius = computed(() => props.radius)
const dim = computed(() => props.dim)

// Smooth mouse tracking with interpolation
const targetMouseX = ref<number | null>(null)
const targetMouseY = ref<number | null>(null)
const currentMouseX = ref<number | null>(null)
const currentMouseY = ref<number | null>(null)

// Mobile touch handling with VueUse
const isTouchDevice = useMediaQuery('(hover: none) and (pointer: coarse)')
const touchStartTime = ref(0)
const touchStartPosition = ref<{ x: number; y: number } | null>(null)
const isScrolling = ref(false)
const scrollThreshold = 10 // pixels
const touchTimeThreshold = 150 // ms

// Computed opacity for fade transitions
const canvasOpacity = computed(() => props.modelValue ? 1 : 0)

let ctx: CanvasRenderingContext2D | null = null
let dpr = 1

// Interpolation function for smooth mouse following
function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

const { pause: pauseAnimation, resume: resumeAnimation } = useRafFn(draw, { immediate: false })

function draw() {
  const canvas = canvasRef.value
  if (!canvas || !ctx)
    return

  const width = canvas.width
  const height = canvas.height

  ctx.clearRect(0, 0, width, height)

  // Dark overlay
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = `rgba(0,0,0,${dim.value})`
  ctx.fillRect(0, 0, width, height)

  // Smooth interpolation of mouse position
  if (targetMouseX.value !== null && targetMouseY.value !== null) {
    // Initialize current position if not set
    if (currentMouseX.value === null || currentMouseY.value === null) {
      currentMouseX.value = targetMouseX.value
      currentMouseY.value = targetMouseY.value
    }

    // Smooth interpolation with easing
    currentMouseX.value = lerp(currentMouseX.value, targetMouseX.value, ANIMATION_CONFIG.LERP_FACTOR)
    currentMouseY.value = lerp(currentMouseY.value, targetMouseY.value, ANIMATION_CONFIG.LERP_FACTOR)

    // Check if we're close enough to target to stop animation
    const distance = Math.sqrt(
      (targetMouseX.value - currentMouseX.value) ** 2
      + (targetMouseY.value - currentMouseY.value) ** 2,
    )

    // Continue animation if we're still moving
    if (distance > ANIMATION_CONFIG.MIN_DISTANCE) {
      resumeAnimation()
    }

    const r = radius.value
    const grad = ctx.createRadialGradient(
      currentMouseX.value,
      currentMouseY.value,
      r * ANIMATION_CONFIG.GRADIENT_INNER_RATIO,
      currentMouseX.value,
      currentMouseY.value,
      r,
    )
    grad.addColorStop(0, 'rgba(0,0,0,1)')
    grad.addColorStop(1, 'rgba(0,0,0,0)')

    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(currentMouseX.value, currentMouseY.value, r, 0, Math.PI * 2)
    ctx.fill()

    ctx.globalCompositeOperation = 'source-over'
  }
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas || !ctx)
    return
  const width = window.innerWidth
  const height = window.innerHeight
  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)
  canvas.style.width = '100vw'
  canvas.style.height = '100vh'
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.scale(dpr, dpr)
  draw()
}

function updatePointer(x: number, y: number) {
  targetMouseX.value = x
  targetMouseY.value = y
  resumeAnimation()
}

function onMouseMove(e: MouseEvent) {
  if (!props.modelValue)
    return
  updatePointer(e.clientX, e.clientY)
}

function onTouchStart(e: TouchEvent) {
  if (!props.modelValue)
    return
  
  const t = e.touches[0]
  if (!t) return
  
  touchStartTime.value = Date.now()
  touchStartPosition.value = { x: t.clientX, y: t.clientY }
  isScrolling.value = false
  
  // Only update flashlight on touch devices if it's a quick tap
  if (isTouchDevice.value) {
    // Don't immediately update - wait to see if it's a scroll gesture
    return
  }
  
  updatePointer(t.clientX, t.clientY)
}

function onTouchMove(e: TouchEvent) {
  if (!props.modelValue)
    return
  
  const t = e.touches[0]
  if (!t) return
  
  // Detect if this is a scroll gesture
  if (touchStartPosition.value) {
    const deltaX = Math.abs(t.clientX - touchStartPosition.value.x)
    const deltaY = Math.abs(t.clientY - touchStartPosition.value.y)
    
    // If movement is significant, it's probably scrolling
    if (deltaX > scrollThreshold || deltaY > scrollThreshold) {
      isScrolling.value = true
      // Clear flashlight position during scrolling
      targetMouseX.value = null
      targetMouseY.value = null
      currentMouseX.value = null
      currentMouseY.value = null
      pauseAnimation()
      return
    }
  }
  
  // Only update flashlight if not scrolling and it's a quick interaction
  const touchDuration = Date.now() - touchStartTime.value
  if (!isScrolling.value && touchDuration < touchTimeThreshold) {
    updatePointer(t.clientX, t.clientY)
  }
}

function onTouchEnd(e: TouchEvent) {
  if (!props.modelValue)
    return
  
  // Reset scroll detection
  isScrolling.value = false
  touchStartPosition.value = null
  touchStartTime.value = 0
  
  // On mobile, fade out flashlight after touch ends
  if (isTouchDevice.value) {
    setTimeout(() => {
      targetMouseX.value = null
      targetMouseY.value = null
      pauseAnimation()
      draw()
    }, 500) // Fade out after 500ms
  }
}

function onMouseLeave() {
  targetMouseX.value = null
  targetMouseY.value = null
  currentMouseX.value = null
  currentMouseY.value = null
  pauseAnimation()
  draw()
}

// Keyboard controls removed - now handled by parent component

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas)
    return
  ctx = canvas.getContext('2d')
  if (!ctx)
    return
  dpr = window.devicePixelRatio || 1
  resize()
})

// VueUse event listeners with automatic cleanup
useEventListener('resize', resize)
useEventListener('mousemove', onMouseMove, { passive: true })
useEventListener('touchmove', onTouchMove, { passive: true })
useEventListener('touchstart', onTouchStart, { passive: true })
useEventListener('touchend', onTouchEnd, { passive: true })
useEventListener('mouseleave', onMouseLeave)

watch([radius, dim], () => {
  resumeAnimation()
})

// Watch for flashlight toggle to reset positions
watch(() => props.modelValue, (newValue) => {
  if (!newValue) {
    targetMouseX.value = null
    targetMouseY.value = null
    currentMouseX.value = null
    currentMouseY.value = null
    pauseAnimation()
  }
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="pointer-events-none fixed inset-0 z-50 block h-screen w-screen transition-opacity duration-500"
    :style="{ opacity: canvasOpacity }"
  />
</template>

<style scoped>
</style>
