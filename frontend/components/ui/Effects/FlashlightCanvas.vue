<script setup lang="ts">
import { useRafFn } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

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

function onTouchMove(e: TouchEvent) {
  if (!props.modelValue)
    return
  const t = e.touches[0] || e.changedTouches[0]
  if (t)
    updatePointer(t.clientX, t.clientY)
}

function onTouchStart(e: TouchEvent) {
  if (!props.modelValue)
    return
  const t = e.touches[0] || e.changedTouches[0]
  if (t)
    updatePointer(t.clientX, t.clientY)
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

  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('touchmove', onTouchMove, { passive: true })
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('mouseleave', onMouseLeave)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMouseMove as any)
  window.removeEventListener('touchmove', onTouchMove as any)
  window.removeEventListener('touchstart', onTouchStart as any)
  window.removeEventListener('mouseleave', onMouseLeave as any)
})

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
