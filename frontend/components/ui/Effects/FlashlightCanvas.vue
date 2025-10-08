<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const radius = ref(180)
const dim = ref(0.85)
const mouseX = ref<number | null>(null)
const mouseY = ref<number | null>(null)

let ctx: CanvasRenderingContext2D | null = null
let dpr = 1

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

  if (mouseX.value !== null && mouseY.value !== null) {
    const r = radius.value
    const grad = ctx.createRadialGradient(
      mouseX.value,
      mouseY.value,
      r * 0.35,
      mouseX.value,
      mouseY.value,
      r,
    )
    grad.addColorStop(0, 'rgba(0,0,0,1)')
    grad.addColorStop(1, 'rgba(0,0,0,0)')

    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(mouseX.value, mouseY.value, r, 0, Math.PI * 2)
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
  mouseX.value = x
  mouseY.value = y
  requestAnimationFrame(draw)
}

function onMouseMove(e: MouseEvent) {
  updatePointer(e.clientX, e.clientY)
}

function onTouchMove(e: TouchEvent) {
  const t = e.touches[0] || e.changedTouches[0]
  if (t)
    updatePointer(t.clientX, t.clientY)
}

function onTouchStart(e: TouchEvent) {
  const t = e.touches[0] || e.changedTouches[0]
  if (t)
    updatePointer(t.clientX, t.clientY)
}

function onMouseLeave() {
  mouseX.value = null
  mouseY.value = null
  draw()
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === '+' || e.key === '=')
    radius.value = Math.min(radius.value + 10, 600)
  if (e.key === '-' || e.key === '_')
    radius.value = Math.max(radius.value - 10, 30)
}

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
  window.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMouseMove as any)
  window.removeEventListener('touchmove', onTouchMove as any)
  window.removeEventListener('touchstart', onTouchStart as any)
  window.removeEventListener('mouseleave', onMouseLeave as any)
  window.removeEventListener('keydown', onKeyDown as any)
})

watch([radius, dim], () => {
  requestAnimationFrame(draw)
})
</script>

<template>
  <canvas ref="canvasRef" class="pointer-events-none fixed inset-0 z-50 block h-screen w-screen" />

  <div
    class="border-white/8 fixed bottom-4 left-1/2 z-50 flex items-center gap-3 border rounded-full bg-gray-9/60 px-3 py-2 text-sm shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-[10px] -translate-x-1/2"
    role="group"
    aria-label="Flashlight options"
  >
    <label for="radius" class="opacity-80">Radius</label>
    <input
      id="radius"
      type="range"
      min="60"
      max="400"
      :value="radius"
      class="w-[min(48vw,420px)]"
      @input="(e:any) => radius = Number(e.target.value)"
    >
    <label for="dim" class="opacity-80">Dim</label>
    <input
      id="dim"
      type="range"
      min="0.4"
      max="0.98"
      step="0.01"
      :value="dim"
      class="w-[min(48vw,420px)]"
      @input="(e:any) => dim = Number(e.target.value)"
    >
  </div>
</template>

<style scoped>
</style>
