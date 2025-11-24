<script lang="ts" setup>
import { breakpointsTailwind, useDebounceFn, useDocumentVisibility, useRafFn, useWindowSize } from '@vueuse/core'
// Removed useRenderLoop to avoid type issues; we update iTime via useRafFn
import consola from 'consola'
import { Vector3 } from 'three'

import { computed, onMounted, ref, shallowRef, watch } from 'vue'
// Import shader code
import fragmentDesktopDark from './Dark/fragment.glsl?raw'
import fragmentMobileDark from './Dark/fragmentMobile.glsl?raw'
import fragmentDesktop from './Light/fragment.glsl?raw'
import fragmentMobile from './Light/fragmentMobile.glsl?raw'
import vertexShader from './vertex.glsl?raw'

// Color mode and breakpoints
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const breakpoints = useBreakpoints(breakpointsTailwind)

// Choose the shader based on breakpoints and dark mode
const shader = computed(() => {
  const isMobile = breakpoints.smaller('md').value
  const selectedShader = isMobile
    ? isDark.value
      ? fragmentMobileDark
      : fragmentMobile
    : isDark.value
      ? fragmentDesktopDark
      : fragmentDesktop
  return selectedShader
})

// Shader reference
const shaderRef = shallowRef<any | null>(null)
const { width, height } = useWindowSize()
const aspectRatio = computed(() => width.value / height.value)

// GLSL uniforms
const uniforms = ref({
  iTime: { value: 0 },
  iResolution: { value: new Vector3(width.value, height.value, 1) },
  PIXEL_FILTER: { value: 800 }, // Default value; will be updated based on device performance
})

// Function to calculate the pixel filter value based on screen width and device capabilities
function calculatePixelFilter(screenWidth: number, isHighEndDevice: boolean) {
  let pixelFilter = isHighEndDevice ? 2 * screenWidth : 1.5 * screenWidth
  const maxPixelFilter = 2200
  if (pixelFilter > maxPixelFilter) {
    pixelFilter = maxPixelFilter
  }
  consola.debug(`[calculatePixelFilter] screenWidth: ${screenWidth}, isHighEndDevice: ${isHighEndDevice}, pixelFilter: ${pixelFilter}`)
  return pixelFilter
}

// Assess device performance
const isHighEndDevice = ref(false)
const targetFrameRate = ref(30) // Default to 30 FPS for low-end devices

function assessDevicePerformance() {
  if (typeof navigator !== 'undefined' && 'hardwareConcurrency' in navigator) {
    const hardwareConcurrency = navigator.hardwareConcurrency || 4 // Default to 4 if unavailable
    isHighEndDevice.value = hardwareConcurrency > 4 // Simplistic check; adjust threshold as needed
    targetFrameRate.value = isHighEndDevice.value ? 60 : 30
    uniforms.value.PIXEL_FILTER.value = calculatePixelFilter(width.value, isHighEndDevice.value)
    consola.debug(`[assessDevicePerformance] hardwareConcurrency: ${hardwareConcurrency}, isHighEndDevice: ${isHighEndDevice.value}, targetFrameRate: ${targetFrameRate.value}, PIXEL_FILTER: ${uniforms.value.PIXEL_FILTER.value}`)
  }
}

// Execute performance assessment on component mount
onMounted(() => {
  consola.debug('[onMounted] Component mounted')
  assessDevicePerformance()
})

// Watch for changes in window size to update uniforms
const updateResolution = useDebounceFn(() => {
  uniforms.value.iResolution.value.set(width.value, height.value, 1)
  uniforms.value.PIXEL_FILTER.value = calculatePixelFilter(width.value, isHighEndDevice.value)
  consola.debug(`[updateResolution] width: ${width.value}, height: ${height.value}, iResolution: ${uniforms.value.iResolution.value}, PIXEL_FILTER: ${uniforms.value.PIXEL_FILTER.value}`)
}, 0)

watch([width, height], updateResolution)

// Use document visibility to pause the render loop when the tab is inactive
const isVisible = useDocumentVisibility()

// Frame rate monitoring
const frameTimes = ref<number[]>([])
const frameCheckInterval = 1000 // Check every second

function monitorFrameRate() {
  const now = performance.now()
  frameTimes.value.push(now)
  frameTimes.value = frameTimes.value.filter(time => now - time <= frameCheckInterval)
  const fps = frameTimes.value.length
  // consola.debug(`[monitorFrameRate] fps: ${fps}, targetFrameRate: ${targetFrameRate.value}`)

  if (fps < targetFrameRate.value - 5) {
    uniforms.value.PIXEL_FILTER.value *= 0.9 // Reduce pixel density by 10%
    // consola.debug(`[monitorFrameRate] Reduced PIXEL_FILTER to ${uniforms.value.PIXEL_FILTER.value} due to low FPS`)
  }
  else if (fps > targetFrameRate.value + 5) {
    uniforms.value.PIXEL_FILTER.value *= 1.1 // Increase pixel density by 10%
    // consola.debug(`[monitorFrameRate] Increased PIXEL_FILTER to ${uniforms.value.PIXEL_FILTER.value} due to high FPS`)
  }
}

// Use requestAnimationFrame to monitor frame rate
useRafFn(monitorFrameRate)

// Update iTime uniform with RAF
const startTime = performance.now()
useRafFn(() => {
  if (!isVisible.value || !shaderRef.value)
    return
  const elapsed = (performance.now() - startTime) / 1000
  shaderRef.value.uniforms.iTime.value = elapsed
})
</script>

<template>
  <!-- Make the canvas fill the entire screen -->
  <TresCanvas
    :key="shader"
    clear-color="#000"
    preset="realistic"
    window-size
  >
    <!--
        <OrbitControls />
    -->
    <TresPerspectiveCamera
      :aspect="aspectRatio"
      :position="[0, 0, height]"
    />
    <TresMesh>
      <TresPlaneGeometry
        :args="[width, height]"
      />
      <TresShaderMaterial
        ref="shaderRef"
        :fragment-shader="shader"
        :uniforms="uniforms"
        :vertex-shader="vertexShader"
      />
    </TresMesh>
  </TresCanvas>
</template>
