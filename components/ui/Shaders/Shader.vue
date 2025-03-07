<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints, useDebounceFn, useDocumentVisibility, useWindowSize } from '@vueuse/core'
import { Vector3 } from 'three'
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
  if (breakpoints.smaller('md').value) {
    return isDark.value ? fragmentMobileDark : fragmentMobile
  }
  return isDark.value ? fragmentDesktopDark : fragmentDesktop
})

const shaderRef = shallowRef<TresObject | null>(null)
const { width, height } = useWindowSize()
const aspectRatio = computed(() => width.value / height.value)

// GLSL uniforms
const uniforms = {
  iTime: { value: 0 },
  iResolution: { value: new Vector3(width.value, height.value, 1) },
}

// Use document visibility to pause the render loop when the tab is inactive
const isVisible = useDocumentVisibility()

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  if (!isVisible.value)
    return
  if (shaderRef.value) {
    shaderRef.value.uniforms.iTime.value = elapsed
  }
})

// Debounced watcher for resolution updates to prevent too many recalculations on resize
const updateResolution = useDebounceFn(() => {
  uniforms.iResolution.value.set(width.value, height.value, 1)
}, 0)

watch([width, height], updateResolution)
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
