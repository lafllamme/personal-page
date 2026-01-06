<script lang="ts" setup>
import type { LiquidSymmetrySettings } from './LiquidSymmetrySphere.model'
import { TresCanvas } from '@tresjs/core'
import {
  useDocumentVisibility,
  useIntersectionObserver,
  useMutationObserver,
  useRafFn,
  useWindowSize,
} from '@vueuse/core'
import consola from 'consola'
import { Mesh, ShaderMaterial, SphereGeometry, Vector3 } from 'three'
import { usePreferencesStore } from '~/stores/preferences'
import { LiquidSymmetryDefaults } from './LiquidSymmetrySphere.model'
import LiquidSymmetrySphereControls from './LiquidSymmetrySphereControls.vue'

type QualityPresetName = 'low' | 'mid' | 'high'

interface QualityPreset {
  dprCap: number
  meshSegments: number
}

interface FrameStats {
  avgMs: number
  p90Ms: number
}

/** Quality presets used for automatic boot selection. */
const QUALITY_PRESETS: Record<QualityPresetName, QualityPreset> = {
  low: { dprCap: 1, meshSegments: 56 },
  mid: { dprCap: 1.25, meshSegments: 64 },
  high: { dprCap: 1.75, meshSegments: 96 },
}

const QUALITY_ORDER: QualityPresetName[] = ['low', 'mid', 'high']
const QUALITY_CACHE_KEY = 'liquid-symmetry-quality:v1'

const TARGET_FRAME_MS = 16.7
const WARMUP_FRAMES = 20
const MEASURE_FRAMES = 60

const vanishEpsilon = 0.02
const vanishSpeed = 18
const appearSpeed = 10

/** Enable verbose visibility diagnostics in dev. */
const DEBUG_VIS = false

/** Required visible ratio to animate (0..1). High on purpose for debugging. */
const VISIBILITY_THRESHOLD = 0.3

const settings = reactive<LiquidSymmetrySettings>({ ...LiquidSymmetryDefaults })
const preferencesStore = usePreferencesStore()

const { width, height } = useWindowSize()
const aspectRatio = computed(() => width.value / height.value)

const canvasDpr = ref(1)
const initialPresetName = readCachedPreset()?.preset ?? 'low'
const currentPresetName = ref<QualityPresetName>(initialPresetName)
const lastLog = ref<QualityPresetName | null>(null)

/** Container observed for visibility. */
const container = ref<HTMLElement | null>(null)
const documentVisibility = useDocumentVisibility()

/** Live visible ratio from IntersectionObserver (0..1). */
const visibleRatio = ref(0)

/** Boolean derived from ratio. */
const isVisibleByRatio = computed(() => visibleRatio.value >= VISIBILITY_THRESHOLD)

/** Final animation gate. */
const shouldAnimate = computed(() => isVisibleByRatio.value && documentVisibility.value === 'visible')

/** Canvas render strategy. */
const renderMode = computed(() => (shouldAnimate.value ? 'always' : 'on-demand'))

/** Canvas invalidation callback, used when render mode is on-demand. */
const invalidateFrame = shallowRef<null | (() => void)>(null)

/** Reused temporary vector to avoid allocations. */
const tmpVec3 = new Vector3()

/** Shader enum mapping. */
const gradientModes = {
  vertical: 0,
  horizontal: 1,
  radial: 2,
  diagonal: 3,
} as const

/** Shader uniforms are mutated in place for performance. */
const uniforms = {
  time: { value: 0 },
  color1: { value: new Vector3(settings.color1R, settings.color1G, settings.color1B) },
  color2: { value: new Vector3(settings.color2R, settings.color2G, settings.color2B) },
  craterTint: { value: new Vector3() },
  gradientMode: { value: gradientModes[settings.gradientMode] },
  glowSpeed: { value: settings.glowSpeed },
  glowAmount: { value: settings.glowAmount },
  transparency: { value: settings.transparency },
  sphereSize: { value: settings.sphereSize },
  bubble1Speed: { value: settings.bubble1Speed },
  bubble1Amount: { value: settings.bubble1Amount },
  bubble1Frequency: { value: settings.bubble1Frequency },
  bubble2Speed: { value: settings.bubble2Speed },
  bubble2Amount: { value: settings.bubble2Amount },
  bubble2Frequency: { value: settings.bubble2Frequency },
  bubble3Speed: { value: settings.bubble3Speed },
  bubble3Amount: { value: settings.bubble3Amount },
  bubble3Frequency: { value: settings.bubble3Frequency },
  pulseSpeed: { value: settings.pulseSpeed },
  pulseAmount: { value: settings.pulseAmount },
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

/** Used to avoid rebuilding geometry if mesh density did not change. */
let lastGeometryKey = { meshDensity: settings.meshDensity }

/** Helper to avoid console spam. */
function createThrottle(ms = 500) {
  let last = 0
  return (fn: () => void) => {
    const now = performance.now()
    if (now - last >= ms) {
      last = now
      fn()
    }
  }
}

const throttleLog = createThrottle(400)

/** Requests a new frame when the canvas uses on-demand rendering. */
function requestRender() {
  if (renderMode.value === 'always')
    return
  invalidateFrame.value?.()
}

/** Mutates a vec3 uniform without allocations. */
function setVectorUniform(uniform: { value: Vector3 }, r: number, g: number, b: number) {
  uniform.value.set(r, g, b)
}

/** Builds or replaces the sphere geometry when mesh density changes. */
function buildGeometry(meshSegments = settings.meshDensity) {
  if (meshSegments === lastGeometryKey.meshDensity && geometry.value)
    return

  lastGeometryKey = { meshDensity: meshSegments }

  const next = new SphereGeometry(1, meshSegments, meshSegments)

  geometry.value?.dispose()
  geometry.value = next

  if (mesh.value)
    mesh.value.geometry = next

  requestRender()
}

/** Builds or replaces the shader material. */
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

  requestRender()
}

/** Applies scale driven by visibility and optional breathing. */
function updateMeshScale(breathScale = 1) {
  if (!mesh.value)
    return

  const visScale = 0.05 + 0.95 * sphereVisibility.value
  mesh.value.scale.setScalar(visScale * breathScale)
}

/** Creates a stable device key to cache the chosen quality preset. */
function getDeviceKey() {
  if (import.meta.server)
    return QUALITY_CACHE_KEY
  const ua = navigator.userAgent || 'unknown'
  const dpr = window.devicePixelRatio || 1
  const size = `${window.screen?.width ?? 0}x${window.screen?.height ?? 0}`
  return `${QUALITY_CACHE_KEY}:${ua}:${dpr}:${size}`
}

/** Reads a preset from cookie preferences, falling back to localStorage. */
function readCachedPreset(): { preset: QualityPresetName, source: 'cookie' | 'localStorage' } | null {
  const pref = preferencesStore.getPreferences().qualityPreset
  if (pref === 'low' || pref === 'mid' || pref === 'high')
    return { preset: pref, source: 'cookie' }

  if (import.meta.client) {
    try {
      const cached = localStorage.getItem(getDeviceKey())
      if (cached === 'low' || cached === 'mid' || cached === 'high')
        return { preset: cached, source: 'localStorage' }
    }
    catch {
      // ignore storage failures
    }
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

/** Logs preset decisions once to keep console noise low. */
function logPresetChange(presetName: QualityPresetName, reason: string, context?: Record<string, unknown>) {
  if (import.meta.server)
    return
  if (lastLog.value === presetName && reason === 'boot-safety')
    return

  if (context)
    consola.debug('[LiquidSymmetry] preset', presetName, 'reason:', reason, context)
  else
    consola.debug('[LiquidSymmetry] preset', presetName, 'reason:', reason)

  lastLog.value = presetName
}

/** Applies the chosen quality preset, optionally rebuilding geometry and persisting it. */
function applyPreset(
  presetName: QualityPresetName,
  options: {
    rebuildGeometry?: boolean
    reason?: string
    persist?: boolean
    log?: boolean
    context?: Record<string, unknown>
  } = {},
) {
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
    logPresetChange(presetName, options.reason ?? 'apply', options.context)
}

function pickPreset(stats: { p90Ms: number }, target = TARGET_FRAME_MS): QualityPresetName {
  if (stats.p90Ms > target * 1.30)
    return 'low'
  if (stats.p90Ms > target)
    return 'mid'
  return 'high'
}

/** Measures frame times to pick a sensible default quality on first boot. */
function measureFrames({ warmup = WARMUP_FRAMES, measure = MEASURE_FRAMES } = {}): Promise<FrameStats> {
  if (import.meta.server)
    return Promise.resolve({ avgMs: TARGET_FRAME_MS, p90Ms: TARGET_FRAME_MS })

  return new Promise<FrameStats>((resolve) => {
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

/** Picks a preset based on cached choice and measured performance. */
async function autoQualityBoot() {
  const cached = readCachedPreset()
  const stats = await measureFrames()
  const measured = pickPreset(stats)

  const cachedPreset = cached?.preset
  const chosen = cachedPreset
    ? QUALITY_ORDER[Math.max(QUALITY_ORDER.indexOf(cachedPreset), QUALITY_ORDER.indexOf(measured))]
    : measured

  if (chosen !== currentPresetName.value) {
    applyPreset(chosen, {
      reason: cached ? 'boot-upgrade' : 'boot-measured',
      context: {
        p90Ms: Number(stats.p90Ms.toFixed(2)),
        avgMs: Number(stats.avgMs.toFixed(2)),
        targetMs: TARGET_FRAME_MS,
        measured,
        cached: cachedPreset ?? null,
        chosen,
      },
    })
  }
  else {
    logPresetChange(chosen, 'boot-final', {
      p90Ms: Number(stats.p90Ms.toFixed(2)),
      avgMs: Number(stats.avgMs.toFixed(2)),
      targetMs: TARGET_FRAME_MS,
      measured,
      cached: cachedPreset ?? null,
      chosen,
    })
  }

  writeCachedPreset(chosen)
}

/** Receives Tres context once ready, used for on-demand invalidation. */
function onCanvasReady(ctx: any) {
  invalidateFrame.value = (ctx?.invalidate || ctx?.renderer?.invalidate || null) as null | (() => void)
}

/** Debug text shown as overlay. */
const debugText = computed(() => {
  const pct = Math.round(visibleRatio.value * 100)
  const thr = Math.round(VISIBILITY_THRESHOLD * 100)
  return `vis ${pct}%  thr ${thr}%  doc ${documentVisibility.value}  animate ${shouldAnimate.value ? 'on' : 'off'}  mode ${renderMode.value}`
})

if (import.meta.client) {
  useIntersectionObserver(
    container,
    ([entry]) => {
      const ratio = entry?.intersectionRatio ?? 0
      visibleRatio.value = ratio

      if (DEBUG_VIS) {
        throttleLog(() => {
          consola.debug('[LiquidSymmetry][vis]', {
            ratio: Number(ratio.toFixed(3)),
            pct: `${Math.round(ratio * 100)}%`,
            threshold: `${Math.round(VISIBILITY_THRESHOLD * 100)}%`,
            intersecting: entry?.isIntersecting ?? false,
          })
        })
      }
    },
    {
      threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    },
  )

  useMutationObserver(
    () => document.documentElement,
    () => {
      const isTransitioning = document.documentElement.dataset.themeTransitioning === 'true'
      targetVisibility.value = isTransitioning ? 0 : 1
    },
    { attributes: true, attributeFilter: ['data-theme-transitioning'] },
  )
}

watch(
  () => settings.meshDensity,
  density => buildGeometry(density),
)

watch(
  () => settings.wireframe,
  (value) => {
    if (material.value)
      material.value.wireframe = value
    requestRender()
  },
)

/**
 * Syncs all uniforms from reactive settings.
 * This stays centralized to keep the code DRY.
 */
watchEffect(() => {
  setVectorUniform(uniforms.color1, settings.color1R, settings.color1G, settings.color1B)
  setVectorUniform(uniforms.color2, settings.color2R, settings.color2G, settings.color2B)

  tmpVec3.set(
    settings.color1R * 0.35 + settings.color2R * 0.65,
    settings.color1G * 0.35 + settings.color2G * 0.65,
    settings.color1B * 0.35 + settings.color2B * 0.65,
  )
  uniforms.craterTint.value.copy(tmpVec3)

  uniforms.gradientMode.value = gradientModes[settings.gradientMode]

  uniforms.glowSpeed.value = settings.glowSpeed
  uniforms.glowAmount.value = settings.glowAmount

  baseTransparency.value = settings.transparency

  uniforms.craterDepth.value = settings.craterDepth
  uniforms.craterDarken.value = settings.craterDarken
  uniforms.craterTintMix.value = settings.craterTintMix

  uniforms.bubble1Speed.value = settings.bubble1Speed
  uniforms.bubble1Amount.value = settings.bubble1Amount
  uniforms.bubble1Frequency.value = settings.bubble1Frequency

  uniforms.bubble2Speed.value = settings.bubble2Speed
  uniforms.bubble2Amount.value = settings.bubble2Amount
  uniforms.bubble2Frequency.value = settings.bubble2Frequency

  uniforms.bubble3Speed.value = settings.bubble3Speed
  uniforms.bubble3Amount.value = settings.bubble3Amount
  uniforms.bubble3Frequency.value = settings.bubble3Frequency

  uniforms.pulseSpeed.value = settings.pulseSpeed
  uniforms.pulseAmount.value = settings.pulseAmount

  uniforms.sphereSize.value = settings.sphereSize

  requestRender()
})

const cameraPosition = computed(() => [0, 0, settings.cameraDistance] as const)

const vertexShader = `
  uniform float time;
  uniform float bubble1Speed;
  uniform float bubble1Amount;
  uniform float bubble1Frequency;
  uniform float bubble2Speed;
  uniform float bubble2Amount;
  uniform float bubble2Frequency;
  uniform float bubble3Speed;
  uniform float bubble3Amount;
  uniform float bubble3Frequency;
  uniform float pulseSpeed;
  uniform float pulseAmount;
  uniform float sphereSize;

  varying vec3 vPosition;
  varying vec3 vNormalV;
  varying vec3 vViewDir;
  varying float vCrater;

  void main() {
    vec3 scaledPos = position * sphereSize;

    float dist = length(scaledPos);
    float bubble1 = sin(time * bubble1Speed + scaledPos.x * bubble1Frequency + scaledPos.y * bubble1Frequency) * bubble1Amount;
    float bubble2 = sin(time * bubble2Speed + scaledPos.y * bubble2Frequency + scaledPos.z * bubble2Frequency) * bubble2Amount;
    float bubble3 = cos(time * bubble3Speed + scaledPos.z * bubble3Frequency + scaledPos.x * bubble3Frequency) * bubble3Amount;
    float radialPulse = sin(time * pulseSpeed + dist * 4.0) * pulseAmount;

    float displacement = bubble1 + bubble2 + bubble3 + radialPulse;
    float invDist = dist > 0.0001 ? 1.0 / dist : 0.0;

    vec3 displaced = scaledPos + scaledPos * (displacement * invDist);
    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);

    vPosition = displaced;
    vViewDir = normalize(-mvPosition.xyz);

    vec3 objectNormal = normalize(displaced);
    vNormalV = normalize(normalMatrix * objectNormal);

    vCrater = max(0.0, -displacement);

    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 craterTint;

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

let time = 0

/**
 * Main animation loop.
 * It updates uniforms and transforms without rebuilding geometry.
 */
const { pause, resume } = useRafFn(({ delta }) => {
  if (!mesh.value)
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

  mesh.value.rotation.y += settings.rotationYSpeed * frameScale
  mesh.value.rotation.x = Math.sin(time * settings.rotationXSpeed) * settings.rotationXAmount

  if (settings.breathingEnabled) {
    const breathScale = 1 + Math.sin(time * settings.breathingSpeed) * settings.breathingIntensity
    updateMeshScale(breathScale)
  }
  else {
    updateMeshScale()
  }

  if (DEBUG_VIS) {
    throttleLog(() => {
      consola.debug('[LiquidSymmetry][raf]', {
        running: true,
        time: Number(uniforms.time.value.toFixed(2)),
        ratio: Number(visibleRatio.value.toFixed(3)),
        pct: `${Math.round(visibleRatio.value * 100)}%`,
        mode: renderMode.value,
      })
    })
  }
}, { immediate: false })

onMounted(() => {
  const cached = readCachedPreset()
  const initialPreset = cached?.preset ?? 'low'

  applyPreset(initialPreset, {
    rebuildGeometry: false,
    reason: cached ? `boot-${cached.source}` : 'boot-safety',
    persist: false,
    log: false,
  })

  buildGeometry()
  buildMaterial()

  mesh.value = new Mesh(geometry.value!, material.value!)
  updateMeshScale()

  const isTransitioning = document.documentElement.dataset.themeTransitioning === 'true'
  targetVisibility.value = isTransitioning ? 0 : 1
  sphereVisibility.value = targetVisibility.value

  autoQualityBoot()

  watch(
    shouldAnimate,
    (active) => {
      if (DEBUG_VIS) {
        consola.debug('[LiquidSymmetry][gate]', {
          active,
          ratio: Number(visibleRatio.value.toFixed(3)),
          pct: `${Math.round(visibleRatio.value * 100)}%`,
          threshold: `${Math.round(VISIBILITY_THRESHOLD * 100)}%`,
          doc: documentVisibility.value,
        })
      }

      if (active)
        resume()
      else
        pause()

      requestRender()
    },
    { immediate: true },
  )
})

onBeforeUnmount(() => {
  pause()
  geometry.value?.dispose()
  material.value?.dispose()
  mesh.value = null
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
        :render-mode="renderMode"
        @ready="onCanvasReady"
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

    <div
      v-if="DEBUG_VIS"
      class="bg-black/70 text-white pointer-events-none absolute left-2 top-2 z-50 rounded px-2 py-1 text-xs"
    >
      {{ debugText }}
    </div>
  </div>
</template>
