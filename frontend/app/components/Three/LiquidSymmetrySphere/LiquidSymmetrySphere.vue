<script lang="ts" setup>
import type { LiquidSymmetrySettings } from './LiquidSymmetrySphere.model'
import { TresCanvas } from '@tresjs/core'
import { useRafFn, useWindowSize } from '@vueuse/core'
import { BufferAttribute, Mesh, ShaderMaterial, SphereGeometry, Vector3 } from 'three'
import { LiquidSymmetryDefaults } from './LiquidSymmetrySphere.model'
import LiquidSymmetrySphereControls from './LiquidSymmetrySphereControls.vue'

const settings = reactive<LiquidSymmetrySettings>({ ...LiquidSymmetryDefaults })
const { width, height } = useWindowSize()
const aspectRatio = computed(() => width.value / height.value)

const gradientModes = {
  vertical: 0,
  horizontal: 1,
  radial: 2,
  diagonal: 3,
} as const

const uniforms = {
  time: { value: 0 },
  color1: { value: new Vector3(settings.color1R, settings.color1G, settings.color1B) },
  color2: { value: new Vector3(settings.color2R, settings.color2G, settings.color2B) },
  gradientMode: { value: gradientModes[settings.gradientMode] },
  glowSpeed: { value: settings.glowSpeed },
  glowAmount: { value: settings.glowAmount },
  transparency: { value: settings.transparency },
  sphereSize: { value: settings.sphereSize },
  craterDepth: { value: settings.craterDepth },
  craterDarken: { value: settings.craterDarken },
  craterTintMix: { value: settings.craterTintMix },
}

const mesh = shallowRef<Mesh | null>(null)
const material = shallowRef<ShaderMaterial | null>(null)
const geometry = shallowRef<SphereGeometry | null>(null)

let originalPositions = new Float32Array(0)
let positionAttribute: BufferAttribute | null = null
let craterAttribute: BufferAttribute | null = null

const vertexShader = `
  attribute float aCrater;
  varying vec3 vPosition;
  varying vec3 vNormalV;
  varying vec3 vViewDir;
  varying float vCrater;
  void main() {
    vPosition = position;
    vCrater = aCrater;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormalV = normalize(normalMatrix * normal);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform int gradientMode;
  uniform float glowSpeed;
  uniform float glowAmount;
  uniform float transparency;
  uniform float sphereSize;
  uniform float craterDepth;
  uniform float craterDarken;
  uniform float craterTintMix;
  varying vec3 vPosition;
  varying vec3 vNormalV;
  varying vec3 vViewDir;
  varying float vCrater;

  void main() {
    float gradientFactor;

    if (gradientMode == 0) {
      gradientFactor = (vPosition.y + sphereSize) / (2.0 * sphereSize);
    } else if (gradientMode == 1) {
      gradientFactor = (vPosition.x + sphereSize) / (2.0 * sphereSize);
    } else if (gradientMode == 2) {
      float dist = length(vPosition);
      gradientFactor = dist / (sphereSize * 1.2);
    } else {
      gradientFactor = (vPosition.x + vPosition.y + 2.0 * sphereSize) / (4.0 * sphereSize);
    }

    vec3 finalColor = mix(color1, color2, gradientFactor);
    float glow = 0.9 + sin(time * glowSpeed) * glowAmount;

    float crater = clamp(vCrater * craterDepth, 0.0, 1.0);
    vec3 craterTint = mix(color1, color2, 0.65);
    finalColor = mix(finalColor, craterTint, crater * craterTintMix);
    finalColor *= 1.0 - crater * craterDarken;

    vec3 N = normalize(vNormalV);
    vec3 V = normalize(vViewDir);
    vec3 L = normalize(vec3(0.4, 0.7, 0.5));
    float spec = pow(max(dot(reflect(-L, N), V), 0.0), 48.0);
    finalColor += vec3(1.0) * spec * 0.6;

    gl_FragColor = vec4(finalColor * glow, transparency);
  }
`

function buildGeometry() {
  const next = new SphereGeometry(settings.sphereSize, settings.meshDensity, settings.meshDensity)
  const attribute = next.getAttribute('position') as BufferAttribute
  const positions = new Float32Array(attribute.count * 3)
  craterAttribute = new BufferAttribute(new Float32Array(attribute.count), 1)
  next.setAttribute('aCrater', craterAttribute)

  for (let i = 0; i < attribute.count; i++) {
    positions[i * 3] = attribute.getX(i)
    positions[i * 3 + 1] = attribute.getY(i)
    positions[i * 3 + 2] = attribute.getZ(i)
  }

  geometry.value?.dispose()
  geometry.value = next
  originalPositions = positions
  positionAttribute = attribute
  uniforms.sphereSize.value = settings.sphereSize

  if (mesh.value)
    mesh.value.geometry = next
}

function buildMaterial() {
  const next = new ShaderMaterial({
    wireframe: settings.wireframe,
    transparent: true,
    uniforms,
    vertexShader,
    fragmentShader,
  })

  material.value?.dispose()
  material.value = next

  if (mesh.value)
    mesh.value.material = next
}

onMounted(() => {
  buildGeometry()
  buildMaterial()
  mesh.value = new Mesh(geometry.value!, material.value!)
})

onBeforeUnmount(() => {
  geometry.value?.dispose()
  material.value?.dispose()
  mesh.value = null
})

watch(
  () => [settings.meshDensity, settings.sphereSize],
  () => buildGeometry(),
)

watch(
  () => [settings.color1R, settings.color1G, settings.color1B],
  ([r, g, b]) => {
    uniforms.color1.value.set(r, g, b)
  },
)

watch(
  () => [settings.color2R, settings.color2G, settings.color2B],
  ([r, g, b]) => {
    uniforms.color2.value.set(r, g, b)
  },
)

watch(
  () => settings.gradientMode,
  (mode) => {
    uniforms.gradientMode.value = gradientModes[mode]
  },
)

watch(
  () => settings.glowSpeed,
  (value) => {
    uniforms.glowSpeed.value = value
  },
)

watch(
  () => settings.glowAmount,
  (value) => {
    uniforms.glowAmount.value = value
  },
)

watch(
  () => settings.transparency,
  (value) => {
    uniforms.transparency.value = value
  },
)

watch(
  () => settings.craterDepth,
  (value) => {
    uniforms.craterDepth.value = value
  },
)

watch(
  () => settings.craterDarken,
  (value) => {
    uniforms.craterDarken.value = value
  },
)

watch(
  () => settings.craterTintMix,
  (value) => {
    uniforms.craterTintMix.value = value
  },
)

watch(
  () => settings.wireframe,
  (value) => {
    if (material.value)
      material.value.wireframe = value
  },
)

const cameraPosition = computed(() => [0, 0, settings.cameraDistance] as const)

let time = 0
useRafFn(({ delta }) => {
  if (!mesh.value || !positionAttribute || originalPositions.length === 0)
    return

  const frameScale = Math.min(delta / 16.6667, 2)
  time += settings.animationSpeed * frameScale
  uniforms.time.value = time

  const count = positionAttribute.count
  for (let i = 0; i < count; i++) {
    const x = originalPositions[i * 3]
    const y = originalPositions[i * 3 + 1]
    const z = originalPositions[i * 3 + 2]

    const dist = Math.sqrt(x * x + y * y + z * z) || 1

    const bubble1 = Math.sin(time * settings.bubble1Speed + x * settings.bubble1Frequency + y * settings.bubble1Frequency) * settings.bubble1Amount
    const bubble2 = Math.sin(time * settings.bubble2Speed + y * settings.bubble2Frequency + z * settings.bubble2Frequency) * settings.bubble2Amount
    const bubble3 = Math.cos(time * settings.bubble3Speed + z * settings.bubble3Frequency + x * settings.bubble3Frequency) * settings.bubble3Amount

    const radialPulse = Math.sin(time * settings.pulseSpeed + dist * 4) * settings.pulseAmount

    const displacement = bubble1 + bubble2 + bubble3 + radialPulse
    const scale = displacement / dist

    positionAttribute.setXYZ(
      i,
      x + x * scale,
      y + y * scale,
      z + z * scale,
    )
    if (craterAttribute)
      craterAttribute.setX(i, Math.max(0, -displacement))
  }

  positionAttribute.needsUpdate = true
  if (craterAttribute)
    craterAttribute.needsUpdate = true

  mesh.value.rotation.y += settings.rotationYSpeed * frameScale
  mesh.value.rotation.x = Math.sin(time * settings.rotationXSpeed) * settings.rotationXAmount

  if (settings.breathingEnabled) {
    const breathScale = 1 + Math.sin(time * settings.breathingSpeed) * settings.breathingIntensity
    mesh.value.scale.set(breathScale, breathScale, breathScale)
  }
  else {
    mesh.value.scale.set(1, 1, 1)
  }
})
</script>

<template>
  <div class="relative h-full w-full">
    <ClientOnly>
      <TresCanvas
        :alpha="true"
        :clear-alpha="0"
        clear-color="#000000"
        render-mode="always"
      >
        <TresPerspectiveCamera
          :aspect="aspectRatio"
          :position="cameraPosition"
          :fov="75"
          :near="0.1"
          :far="1000"
        />
        <TresPointLight :intensity="1.2" :position="[5, 5, 5]" />
        <TresAmbientLight :intensity="0.5" />
        <primitive v-if="mesh" :object="mesh" />
      </TresCanvas>
    </ClientOnly>

    <LiquidSymmetrySphereControls :settings="settings" />
  </div>
</template>
