<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { Vector2 } from 'three'
import fragmentShader from './fragment.glsl?raw'
import vertexShader from './vertex.glsl?raw'

// Reactive window size
const { width, height } = useWindowSize()

const aspectRatio = computed(() => width.value / height.value)

// GLSL uniforms
const uniforms = reactive({
  iTime: { value: 0 },
  iResolution: { value: new Vector2(width.value, height.value) },
})

const animationFrame = ref(0)

// Animate iTime
function animate(t: number) {
  uniforms.iTime.value = t * 0.001
  animationFrame.value = requestAnimationFrame(animate)
}

onMounted(() => {
  animationFrame.value = requestAnimationFrame(animate)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrame.value)
})
// Keep iResolution in sync with the window size
watch([width, height], () => {
  uniforms.iResolution.value.set(width.value, height.value)
})
</script>

<template>
  <!-- Make the canvas fill the entire screen -->
  <TresCanvas
    window-size
    preset="realistic"
  >
    <TresPerspectiveCamera
      visible
      :position="[0, 0, 1]"
      :args="[45, aspectRatio, 0.1, 1000]"
    />
    <OrbitControls />
    <!-- A plane sized to the same width/height as the camera's boundaries -->
    <TresMesh>
      <TresPlaneGeometry :args="[width, height]" />
      <TresShaderMaterial
        :vertex-shader="vertexShader"
        :fragment-shader="fragmentShader"
        :uniforms="uniforms"
      />
    </TresMesh>
  </TresCanvas>
</template>
