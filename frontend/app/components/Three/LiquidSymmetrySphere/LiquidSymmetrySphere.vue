<script lang="ts" setup>
import type { LiquidSymmetrySettings } from './LiquidSymmetrySphere.model'
import { TresCanvas } from '@tresjs/core'
import { useDocumentVisibility, useElementVisibility, useMutationObserver, useRafFn, useWindowSize } from '@vueuse/core'
import { BufferAttribute, Mesh, ShaderMaterial, SphereGeometry, Vector3 } from 'three'
import { LiquidSymmetryDefaults } from './LiquidSymmetrySphere.model'
import LiquidSymmetrySphereControls from './LiquidSymmetrySphereControls.vue'
import { usePreferencesStore } from '~/stores/preferences'

type QualityPresetName = 'low' | 'mid' | 'high'

interface QualityPreset {
  dprCap: number
  meshSegments: number
}

const QUALITY_PRESETS: Record<QualityPresetName, QualityPreset> = {
  low: {
    dprCap: 1,
    meshSegments: 24,
  },
  mid: {
    dprCap: 1.25,
    meshSegments: 28,
  },
  high: {
    dprCap: 2,
    meshSegments: 96,
  },
}

const QUALITY_ORDER: QualityPresetName[] = ['low', 'mid', 'high']
const QUALITY_CACHE_KEY = 'liquid-symmetry-quality:v1'
const TARGET_FRAME_MS = 16.7
const WARMUP_FRAMES = 20
const MEASURE_FRAMES = 60

const settings = reactive<LiquidSymmetrySettings>({ ...LiquidSymmetryDefaults })
const preferencesStore = usePreferencesStore()
const { width, height } = useWindowSize()
const aspectRatio = computed(() => width.value / height.value)
const canvasDpr = ref(1)
const currentPresetName = ref<QualityPresetName>('low')
const lastLog = ref<QualityPresetName | null>(null)

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
const baseTransparency = ref(settings.transparency)
const targetVisibility = ref(1)
const sphereVisibility = ref(1)
const lastGeometryKey = reactive({ meshDensity: settings.meshDensity, sphereSize: settings.sphereSize })
const vanishEpsilon = 0.02
const vanishSpeed = 18
const appearSpeed = 10
const container = ref<HTMLElement | null>(null)
const isVisible = useElementVisibility(container)
const documentVisibility = useDocumentVisibility()

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

function setVectorUniform(uniform: { value: Vector3 }, r: number, g: number, b: number) {
  uniform.value.set(r, g, b)
}

function buildGeometry(meshSegments = settings.meshDensity) {
  settings.meshDensity = meshSegments
  if (meshSegments === lastGeometryKey.meshDensity && settings.sphereSize === lastGeometryKey.sphereSize && geometry.value)
    return

  lastGeometryKey.meshDensity = meshSegments
  lastGeometryKey.sphereSize = settings.sphereSize

  const next = new SphereGeometry(settings.sphereSize, meshSegments, meshSegments)
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

function getDeviceKey() {
  if (import.meta.server)
    return QUALITY_CACHE_KEY
  const ua = navigator.userAgent || 'unknown'
  const dpr = window.devicePixelRatio || 1
  const size = `${window.screen?.width ?? 0}x${window.screen?.height ?? 0}`
  return `${QUALITY_CACHE_KEY}:${ua}:${dpr}:${size}`
}

function readCachedPreset(): { preset: QualityPresetName, source: 'cookie' | 'localStorage' } | null {
  if (import.meta.server)
    return null
  const pref = preferencesStore.getPreferences().qualityPreset
  if (pref === 'low' || pref === 'mid' || pref === 'high')
    return { preset: pref, source: 'cookie' }
  try {
    const key = getDeviceKey()
    const cached = localStorage.getItem(key)
    if (cached === 'low' || cached === 'mid' || cached === 'high')
      return { preset: cached, source: 'localStorage' }
  }
  catch {
    // ignore storage failures
  }
  return null
}

function writeCachedPreset(preset: QualityPresetName) {
  if (import.meta.server)
    return
  try {
    localStorage.setItem(getDeviceKey(), preset)
  }
  catch {
    // ignore storage failures
  }
}

function logPresetChange(presetName: QualityPresetName, reason: string) {
  if (import.meta.server)
    return
  if (lastLog.value === presetName && reason === 'boot-safety')
    return
  // eslint-disable-next-line no-console
  console.info('[LiquidSymmetry] preset', presetName, 'reason:', reason)
  lastLog.value = presetName
}

function applyPreset(presetName: QualityPresetName, options: { rebuildGeometry?: boolean, reason?: string, persist?: boolean, log?: boolean } = {}) {
  if (import.meta.server)
    return
  const preset = QUALITY_PRESETS[presetName]
  currentPresetName.value = presetName
  canvasDpr.value = Math.min(window.devicePixelRatio || 1, preset.dprCap)
  settings.meshDensity = preset.meshSegments
  if (options.rebuildGeometry !== false)
    buildGeometry(preset.meshSegments)
  if (options.persist !== false)
    preferencesStore.setPreferences({ qualityPreset: presetName })
  if (options.log !== false)
    logPresetChange(presetName, options.reason ?? 'apply')
}

function percentile(values: number[], p: number) {
  if (!values.length)
    return 0
  const sorted = [...values].sort((a, b) => a - b)
  const idx = Math.min(sorted.length - 1, Math.floor(sorted.length * p))
  return sorted[idx]
}

function pickPreset(stats: { p90Ms: number }, target = TARGET_FRAME_MS): QualityPresetName {
  if (stats.p90Ms > target * 1.35)
    return 'low'
  if (stats.p90Ms > target * 1.1)
    return 'mid'
  return 'high'
}

function measureFrames({ warmup = WARMUP_FRAMES, measure = MEASURE_FRAMES } = {}) {
  if (import.meta.server)
    return Promise.resolve({ avgMs: TARGET_FRAME_MS, p90Ms: TARGET_FRAME_MS })

  return new Promise<{ avgMs: number, p90Ms: number }>((resolve) => {
    let count = 0
    let last = performance.now()
    const samples: number[] = []

    function tick() {
      const now = performance.now()
      const dt = now - last
      last = now
      count += 1
      if (count > warmup)
        samples.push(dt)

      if (count >= warmup + measure) {
        samples.sort((a, b) => a - b)
        const avg = samples.reduce((sum, v) => sum + v, 0) / samples.length
        const p90 = samples[Math.floor(samples.length * 0.9)]
        resolve({ avgMs: avg, p90Ms: p90 })
        return
      }
      requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  })
}

async function autoQualityBoot() {
  const cached = readCachedPreset()
  const stats = await measureFrames()
  const measured = pickPreset(stats)
  const cachedPreset = cached?.preset
  const chosen = cachedPreset
    ? QUALITY_ORDER[Math.max(QUALITY_ORDER.indexOf(cachedPreset), QUALITY_ORDER.indexOf(measured))]
    : measured

  if (chosen !== currentPresetName.value)
    applyPreset(chosen, { reason: cached ? 'boot-upgrade' : 'boot-measured' })
  else
    logPresetChange(chosen, 'boot-final')

  writeCachedPreset(chosen)
}

onMounted(() => {
  const cached = readCachedPreset()
  const initialPreset = cached?.preset ?? 'low'
  applyPreset(initialPreset, { rebuildGeometry: false, reason: cached ? `boot-${cached.source}` : 'boot-safety', persist: false, log: false })
  buildGeometry()
  buildMaterial()
  mesh.value = new Mesh(geometry.value!, material.value!)
  const isTransitioning = document.documentElement.dataset.themeTransitioning === 'true'
  targetVisibility.value = isTransitioning ? 0 : 1
  sphereVisibility.value = targetVisibility.value
  autoQualityBoot()
})

onBeforeUnmount(() => {
  geometry.value?.dispose()
  material.value?.dispose()
  mesh.value = null
})

if (import.meta.client) {
  useMutationObserver(
    () => document.documentElement,
    () => {
      const isTransitioning = document.documentElement.dataset.themeTransitioning === 'true'
      targetVisibility.value = isTransitioning ? 0 : 1
    },
    {
      attributes: true,
      attributeFilter: ['data-theme-transitioning'],
    },
  )
}

watch(
  () => [settings.meshDensity, settings.sphereSize],
  () => buildGeometry(),
)

watch(
  () => [settings.color1R, settings.color1G, settings.color1B],
  ([r, g, b]) => {
    setVectorUniform(uniforms.color1, r, g, b)
  },
)

watch(
  () => [settings.color2R, settings.color2G, settings.color2B],
  ([r, g, b]) => {
    setVectorUniform(uniforms.color2, r, g, b)
  },
)

watch(
  () => settings.gradientMode,
  (mode) => {
    uniforms.gradientMode.value = gradientModes[mode]
  },
)

watch(
  () => [
    settings.glowSpeed,
    settings.glowAmount,
    settings.transparency,
    settings.craterDepth,
    settings.craterDarken,
    settings.craterTintMix,
  ],
  ([glowSpeed, glowAmount, transparency, craterDepth, craterDarken, craterTintMix]) => {
    uniforms.glowSpeed.value = glowSpeed
    uniforms.glowAmount.value = glowAmount
    baseTransparency.value = transparency
    uniforms.craterDepth.value = craterDepth
    uniforms.craterDarken.value = craterDarken
    uniforms.craterTintMix.value = craterTintMix
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
const { pause, resume } = useRafFn(({ delta }) => {
  if (!mesh.value || !positionAttribute || originalPositions.length === 0)
    return

  const frameScale = Math.min(delta / 16.6667, 2)
  time += settings.animationSpeed * frameScale
  uniforms.time.value = time
  const speed = targetVisibility.value === 0 ? vanishSpeed : appearSpeed
  const fadeStep = 1 - Math.exp(-speed * (delta / 1000))
  sphereVisibility.value += (targetVisibility.value - sphereVisibility.value) * fadeStep
  if (targetVisibility.value === 0 && sphereVisibility.value < vanishEpsilon)
    sphereVisibility.value = 0
  uniforms.transparency.value = baseTransparency.value * sphereVisibility.value

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
    const visScale = 0.05 + 0.95 * sphereVisibility.value
    mesh.value.scale.set(breathScale * visScale, breathScale * visScale, breathScale * visScale)
  }
  else {
    const visScale = 0.05 + 0.95 * sphereVisibility.value
    mesh.value.scale.set(visScale, visScale, visScale)
  }
}, { immediate: false })

const shouldAnimate = computed(() => {
  return isVisible.value && documentVisibility.value === 'visible'
})

onMounted(() => {
  watch(
    shouldAnimate,
    (active) => {
      if (active)
        resume()
      else
        pause()
    },
    { immediate: true },
  )
})
</script>

<template>
  <div ref="container" class="relative h-full w-full">
    <ClientOnly>
      <TresCanvas
        :dpr="canvasDpr"
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
