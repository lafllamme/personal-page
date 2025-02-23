<script lang="ts" setup>
import { OrbitControls } from '@tresjs/cientos'
import { useWindowSize } from '@vueuse/core'
import { Vector3 } from 'three'
import fragmentShader from './fragment.glsl?raw'
import vertexShader from './vertex.glsl?raw'

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
    console.log('elapsed', elapsed)
    console.log('delta', delta)
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
    clear-color="#000"
    preset="realistic"
    window-size
  >
    <OrbitControls />
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
        :fragment-shader="fragmentShader"
        :uniforms="uniforms"
        :vertex-shader="vertexShader"
      />
    </TresMesh>
  </TresCanvas>
</template>
