<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints, useWindowSize } from '@vueuse/core'
import { Vector3 } from 'three'
import fragmentDesktopDark from './Dark/fragment.glsl?raw'
import fragmentMobileDark from './Dark/fragmentMobile.glsl?raw'
import fragmentDesktop from './Light/fragment.glsl?raw'
import fragmentMobile from './Light/fragmentMobile.glsl?raw'

import vertexShader from './vertex.glsl?raw'

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const breakpoints = useBreakpoints(breakpointsTailwind)
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

const { onLoop } = useRenderLoop()

onLoop(({ delta, elapsed }) => {
  if (shaderRef.value) {
    /* console.log('elapsed', elapsed)
    console.log('delta', delta) */
    shaderRef.value.uniforms.iTime.value = elapsed
  }
})
watch([width, height], () => {
  uniforms.iResolution.value.set(width.value, height.value, 1)
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
