<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const radius = ref(265)
const dim = ref(0.93)
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

function onRadiusInput(e: Event) {
  const value = Number((e.target as HTMLInputElement).value)
  radius.value = value
  // consola is auto-imported via nuxt imports preset
  consola.debug('[flashlight] radius', value)
}

function onDimInput(e: Event) {
  const value = Number((e.target as HTMLInputElement).value)
  dim.value = value
  consola.debug('[flashlight] dim', value)
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
    class="fixed right-8 top-1/2 z-50 flex flex-col items-center gap-4 rounded-bl-[10px] rounded-br-[28px] rounded-tl-[30px] rounded-tr-[8px] bg-gray-8 p-4 text-xs shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm -translate-y-1/2 dark:bg-gray-4"
    role="group"
    aria-label="Flashlight options"
  >
    <div class="flex flex-col items-start gap-1">
      <label for="radius" class="space-grotesk-regular color-gray-12">Radius</label>
      <input
        id="radius"
        class="h-2 w-32 appearance-none rounded-full bg-sand-10 accent-mint-11"
        type="range"
        min="60"
        max="400"
        :value="radius"
        @input="onRadiusInput"
      >
    </div>
    <div class="flex flex-col items-start gap-1">
      <label for="dim" class="space-grotesk-regular color-gray-12">Dim</label>
      <input
        id="dim"
        class="h-2 w-32 appearance-none rounded-full bg-sand-10 accent-mint-11"
        type="range"
        min="0.4"
        max="0.98"
        step="0.01"
        :value="dim"
        @input="onDimInput"
      >
    </div>
  </div>
</template>

<style scoped>
</style>
