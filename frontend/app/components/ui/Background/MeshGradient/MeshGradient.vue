<script lang="ts" setup>
import { useRafFn } from '@vueuse/core'
import {
  DoubleSide,
  EquirectangularReflectionMapping,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  SphereGeometry,
  Texture,
} from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import {
  meshGradientDefaults,
  type MeshGradientEnvPreset,
  type MeshGradientProps,
} from './MeshGradient.model'
import { shaderGradientSphereFragment, shaderGradientSphereVertex } from './shaders'

type NumericUniform = { value: number }
type ShaderUniformMap = Record<string, NumericUniform>
type ColorUniformMap = Record<
  'uC1r' | 'uC1g' | 'uC1b' | 'uC2r' | 'uC2g' | 'uC2b' | 'uC3r' | 'uC3g' | 'uC3b',
  NumericUniform
>

const props = withDefaults(defineProps<MeshGradientProps>(), meshGradientDefaults)

const DEFAULT_SPHERE_DISTANCE = 14
const DEFAULT_PLANE_DISTANCE = 0.5
const ZOOM_OUT_SPHERE = { distance: 14, zoom: 5 }
const ZOOM_OUT_PLANE = { distance: 14, zoom: 1 }

const mesh = shallowRef<Mesh | null>(null)
const geometry = shallowRef<SphereGeometry | PlaneGeometry | null>(null)
const material = shallowRef<MeshPhysicalMaterial | null>(null)
const shaderUniforms = shallowRef<ShaderUniformMap | null>(null)
const colorUniforms = shallowRef<ColorUniformMap | null>(null)
const envTexture = shallowRef<Texture | null>(null)
const localTime = ref(props.uTime)
const cameraRef = shallowRef<PerspectiveCamera | null>(null)

const HDRI_URLS: Record<MeshGradientEnvPreset, string> = {
  city: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/venice_sunset_1k.hdr',
  dawn: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/royal_esplanade_1k.hdr',
  lobby: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/pisa_1k.hdr',
}

const ENV_LIGHTS: Record<
MeshGradientEnvPreset,
Array<{ position: [number, number, number]; intensity: number; color?: string }>
> = {
  city: [
    { position: [2.5, 3.5, 1.5], intensity: 1.4 },
    { position: [-3, -1, -2], intensity: 0.6, color: '#87a6ff' },
  ],
  dawn: [
    { position: [1.5, 2.5, 2.5], intensity: 1.2, color: '#ffd6a5' },
    { position: [-2.5, -0.5, -1], intensity: 0.5, color: '#7ec4ff' },
  ],
  lobby: [
    { position: [0, 3.5, 0], intensity: 1.3 },
    { position: [3, -1, 2], intensity: 0.7, color: '#c7fffb' },
  ],
}

const rgbLoader = new RGBELoader()

const cameraDistance = computed(() => {
  if (props.type === 'sphere')
    return props.zoomOut ? ZOOM_OUT_SPHERE.distance : DEFAULT_SPHERE_DISTANCE

  const base = Math.max(props.cDistance ?? DEFAULT_PLANE_DISTANCE, 0.1)
  return props.zoomOut ? ZOOM_OUT_PLANE.distance : base
})

const perspectiveZoom = computed(() => {
  if (props.type === 'sphere')
    return props.zoomOut ? ZOOM_OUT_SPHERE.zoom : props.cameraZoom

  return props.zoomOut ? ZOOM_OUT_PLANE.zoom : 1
})

const cameraPosition = computed(() => {
  const polar = degToRad(props.cPolarAngle)
  const azimuth = degToRad(props.cAzimuthAngle)
  const distance = cameraDistance.value

  const sinPolar = Math.sin(polar)
  const x = distance * sinPolar * Math.cos(azimuth)
  const y = distance * Math.sin(polar) * Math.sin(azimuth)
  const z = distance * Math.cos(polar)

  return [x, y, z] as const
})

const envDirectionalLights = computed(() => ENV_LIGHTS[props.envPreset] ?? [])

const grainOverlayStyle = computed(() => {
  const opacity = clamp(props.grain === 'on' ? props.grainBlending : 0, 0, 1)
  return {
    opacity,
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\' viewBox=\'0 0 160 160\'%3E%3Cfilter id=\'n\' x=\'0\' y=\'0\' width=\'1\' height=\'1\'%3E%3CfeTurbulence baseFrequency=\'0.8\' numOctaves=\'4\' seed=\'3\' type=\'fractalNoise\'/%3E%3C/filter%3E%3Crect width=\'160\' height=\'160\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
    backgroundSize: '140px 140px',
    backgroundRepeat: 'repeat',
    backgroundPosition: '0 0',
  }
})

const { pause, resume } = useRafFn(({ delta }) => {
  if (props.animate !== 'on' || !shaderUniforms.value)
    return
  advanceTime(delta)
}, { immediate: false })

function advanceTime(delta: number) {
  if (!shaderUniforms.value)
    return

  const seconds = delta / 1000
  let nextTime = localTime.value + seconds
  nextTime = normalizeTime(nextTime)

  localTime.value = nextTime
  shaderUniforms.value.uTime.value = nextTime
}

function normalizeTime(value: number) {
  let result = value
  if (props.rangeMode === 'enabled' && props.rangeEnd > props.rangeStart) {
    const length = props.rangeEnd - props.rangeStart
    result = props.rangeStart + ((value - props.rangeStart) % length + length) % length
  } else if (props.loop === 'on' && props.loopDuration > 0) {
    result = value % props.loopDuration
  }
  return result
}

async function syncEnvironment() {
  if (!material.value) {
    envTexture.value = null
    return
  }

  if (props.lightType !== 'env') {
    envTexture.value = null
    material.value.envMap = null
    material.value.needsUpdate = true
    return
  }

  const url = HDRI_URLS[props.envPreset]
  if (!url)
    return

  const texture = await rgbLoader.loadAsync(url)
  texture.mapping = EquirectangularReflectionMapping
  envTexture.value?.dispose()
  envTexture.value = texture
  material.value.envMap = texture
  material.value.needsUpdate = true
}

function buildScene() {
  const uniforms = createShaderUniforms()
  const colorMap = createColorUniforms([props.color1, props.color2, props.color3])

  shaderUniforms.value = uniforms
  colorUniforms.value = colorMap

  buildGeometry()
  buildMaterial()

  if (!geometry.value || !material.value)
    return

  mesh.value = new Mesh(geometry.value, material.value)
  updateTransforms()
  applyColorUniforms([props.color1, props.color2, props.color3])
  syncEnvironment()
}

function buildGeometry() {
  geometry.value?.dispose()
  if (props.type === 'plane' || props.type === 'waterPlane') {
    const size = props.type === 'waterPlane' ? 6 : 4
    geometry.value = new PlaneGeometry(size, size, 256, 256)
  } else {
    geometry.value = new SphereGeometry(1, 256, 256)
  }
}

function buildMaterial() {
  material.value?.dispose()
  material.value = new MeshPhysicalMaterial({
    metalness: 0.2,
    roughness: clamp(1 - props.reflection, 0, 1),
    envMapIntensity: props.brightness,
    side: DoubleSide,
    transparent: false,
    depthWrite: false,
    wireframe: props.wireframe,
    onBeforeCompile: (shader) => {
      if (shaderUniforms.value && colorUniforms.value) {
        shader.uniforms = {
          ...shader.uniforms,
          ...shaderUniforms.value,
          ...colorUniforms.value,
        }
      }
      shader.vertexShader = shaderGradientSphereVertex
      shader.fragmentShader = shaderGradientSphereFragment
    },
  })
  if (envTexture.value)
    material.value.envMap = envTexture.value
}

function updateTransforms() {
  if (!mesh.value)
    return

  mesh.value.position.set(props.positionX, props.positionY, props.positionZ)
  mesh.value.rotation.set(
    degToRad(props.rotationX),
    degToRad(props.rotationY),
    degToRad(props.rotationZ),
  )
}

function degToRad(value: number) {
  return (value * Math.PI) / 180
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max)
}

function createShaderUniforms(): ShaderUniformMap {
  return {
    uTime: { value: props.uTime },
    uSpeed: { value: props.speed },
    uLoadingTime: { value: 1 },
    uNoiseDensity: { value: props.density },
    uNoiseStrength: { value: props.strength },
    uFrequency: { value: props.frequency },
    uAmplitude: { value: props.amplitude },
    uIntensity: { value: 0.5 },
    uLoop: { value: props.loop === 'on' ? 1 : 0 },
    uLoopDuration: { value: props.loopDuration },
  }
}

function createColorUniforms(colors: string[]): ColorUniformMap {
  const [c1, c2, c3] = colors.map((hex) => hexToUnitColor(hex))

  return {
    uC1r: { value: c1.r },
    uC1g: { value: c1.g },
    uC1b: { value: c1.b },
    uC2r: { value: c2.r },
    uC2g: { value: c2.g },
    uC2b: { value: c2.b },
    uC3r: { value: c3.r },
    uC3g: { value: c3.g },
    uC3b: { value: c3.b },
  }
}

function applyColorUniforms([color1, color2, color3]: string[]) {
  if (!colorUniforms.value)
    return

  const c1 = hexToUnitColor(color1)
  const c2 = hexToUnitColor(color2)
  const c3 = hexToUnitColor(color3)

  colorUniforms.value.uC1r.value = c1.r
  colorUniforms.value.uC1g.value = c1.g
  colorUniforms.value.uC1b.value = c1.b
  colorUniforms.value.uC2r.value = c2.r
  colorUniforms.value.uC2g.value = c2.g
  colorUniforms.value.uC2b.value = c2.b
  colorUniforms.value.uC3r.value = c3.r
  colorUniforms.value.uC3g.value = c3.g
  colorUniforms.value.uC3b.value = c3.b
}

function hexToUnitColor(hex: string) {
  const formatted = hex.startsWith('#') ? hex.slice(1) : hex
  const bigint = Number.parseInt(formatted, 16)

  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return {
    r: r / 255,
    g: g / 255,
    b: b / 255,
  }
}

watch(
  () => [
    props.positionX,
    props.positionY,
    props.positionZ,
    props.rotationX,
    props.rotationY,
    props.rotationZ,
  ],
  () => updateTransforms(),
)

watch(
  () => [props.color1, props.color2, props.color3],
  (colors) => applyColorUniforms(colors),
  { immediate: true },
)

watch(
  () => [props.type],
  () => {
    if (!mesh.value)
      return
    buildGeometry()
    if (mesh.value && geometry.value)
      mesh.value.geometry = geometry.value
  },
)

watch(
  () => [props.speed, props.strength, props.density, props.frequency, props.amplitude],
  () => {
    if (!shaderUniforms.value || !material.value)
      return
    shaderUniforms.value.uSpeed.value = props.speed
    shaderUniforms.value.uNoiseStrength.value = props.strength
    shaderUniforms.value.uNoiseDensity.value = props.density
    shaderUniforms.value.uFrequency.value = props.frequency
    shaderUniforms.value.uAmplitude.value = props.amplitude
  },
)

watch(
  () => [props.reflection, props.brightness, props.wireframe],
  () => {
    if (!material.value)
      return
    material.value.roughness = clamp(1 - props.reflection, 0, 1)
    material.value.envMapIntensity = props.brightness
    material.value.wireframe = props.wireframe
  },
  { immediate: true },
)

watch(
  () => [props.lightType, props.envPreset],
  () => {
    if (import.meta.client)
      syncEnvironment()
  },
  { immediate: true },
)

watch(perspectiveZoom, (zoom) => {
  if (cameraRef.value) {
    cameraRef.value.zoom = zoom
    cameraRef.value.updateProjectionMatrix()
  }
})

watch(
  () => [props.loop, props.loopDuration, props.rangeMode, props.rangeStart, props.rangeEnd],
  () => {
    if (!shaderUniforms.value)
      return
    shaderUniforms.value.uLoop.value = props.loop === 'on' ? 1 : 0
    shaderUniforms.value.uLoopDuration.value = props.loopDuration
    localTime.value = normalizeTime(localTime.value)
    shaderUniforms.value.uTime.value = localTime.value
  },
  { immediate: true },
)

watch(() => props.animate, (value) => {
  if (value === 'on')
    resume()
  else
    pause()
})

watch(() => props.uTime, (value) => {
  localTime.value = value
  if (shaderUniforms.value)
    shaderUniforms.value.uTime.value = value
})

onMounted(() => {
  if (!import.meta.client)
    return

  buildScene()
  if (props.animate === 'on')
    resume()
})

onBeforeUnmount(() => {
  pause()
  geometry.value?.dispose()
  material.value?.dispose()
  envTexture.value?.dispose()
  cameraRef.value = null
  mesh.value = null
})
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-0 h-screen w-screen" aria-hidden="true">
    <ClientOnly>
      <TresCanvas
        class="size-full"
        :alpha="true"
        :clear-alpha="0"
        :antialias="true"
        :dpr="1"
        :window-size="true"
        :render-mode="'always'"
      >
        <TresPerspectiveCamera
          ref="cameraRef"
          :position="cameraPosition"
          :zoom="perspectiveZoom"
          :fov="45"
          :near="0.1"
          :far="50"
          :look-at="[props.positionX, props.positionY, props.positionZ]"
        />

        <template v-if="props.lightType === '3d'">
          <TresAmbientLight :intensity="props.brightness * 0.5" />
          <TresDirectionalLight :position="[2.5, 3, 2]" :intensity="props.brightness * 1.2" />
          <TresPointLight :position="[-1.5, -2, -1]" :intensity="props.brightness * 0.6" />
        </template>
        <template v-else>
          <TresAmbientLight :intensity="props.brightness * 0.35" />
          <TresHemisphereLight
            color="#ffffff"
            ground-color="#1a1a1a"
            :intensity="props.brightness * 0.5"
          />
          <TresDirectionalLight
            v-for="(light, index) in envDirectionalLights"
            :key="`env-light-${index}`"
            :position="light.position"
            :intensity="light.intensity"
            :color="light.color ?? '#ffffff'"
          />
        </template>

        <TresAxesHelper v-if="props.toggleAxis" :args="[1.5]" />
        <primitive v-if="mesh" :object="mesh" />
      </TresCanvas>
    </ClientOnly>
    <div
      v-if="props.grain === 'on'"
      class="pointer-events-none absolute inset-0 z-10 mix-blend-soft-light"
      :style="grainOverlayStyle"
    />
  </div>
</template>
