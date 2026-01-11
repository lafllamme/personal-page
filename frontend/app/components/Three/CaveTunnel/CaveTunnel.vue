<script setup lang="ts">
import type { TresContext } from '@tresjs/core'
import type {
  PerspectiveCamera,
  PointLight,
  Scene,
} from 'three'
import type { CaveTunnelProps } from './CaveTunnel.model'
import { TresCanvas } from '@tresjs/core'
import { useDevicePixelRatio, useDocumentVisibility, useRafFn, useVModel, useWindowSize } from '@vueuse/core'
import { createNoise2D } from 'simplex-noise'
import {
  Color,
  DoubleSide,
  FogExp2,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
} from 'three'
import { caveTunnelDefaults } from './CaveTunnel.model'

interface CaveChunk {
  group: Group
  meshGround: Mesh<PlaneGeometry, MeshStandardMaterial>
  meshCeil: Mesh<PlaneGeometry, MeshStandardMaterial>
  index: number
}

const props = withDefaults(defineProps<{
  modelValue?: CaveTunnelProps
}>(), {
  modelValue: () => ({ ...caveTunnelDefaults }),
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: CaveTunnelProps): void
}>()

const state = useVModel(props, 'modelValue', emit, { deep: true, passive: true })

const CHUNK_WIDTH = 250
const CHUNK_LENGTH = 60
const SEGMENTS_W = 100
const SEGMENTS_L = 30
const CHUNK_COUNT = 6
const CAMERA_START_Z = 40
const GROUND_OFFSET = -5
const CEILING_OFFSET = 5

const noise2D = createNoise2D()

const tunnelGroup = shallowRef<Group | null>(null)
const cameraRef = shallowRef<PerspectiveCamera | null>(null)
const camLightRef = shallowRef<PointLight | null>(null)
const sceneRef = shallowRef<Scene | null>(null)
const fogRef = shallowRef<FogExp2 | null>(null)
const showControls = ref(true)
const copied = ref(false)

const chunks: CaveChunk[] = []

const { width, height } = useWindowSize()
const aspectRatio = computed(() => (height.value ? width.value / height.value : 1))
const { pixelRatio } = useDevicePixelRatio()
const dpr = computed(() => Math.min(pixelRatio.value || 1, 2))

function resetControls() {
  state.value = { ...caveTunnelDefaults }
}

async function copySettingsJson() {
  if (!import.meta.client)
    return

  try {
    const json = JSON.stringify(state.value, null, 2)
    await navigator.clipboard.writeText(json)
    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 1600)
  }
  catch (error) {
    console.error('Failed to copy cave settings JSON', error)
  }
}

function getElevation(x: number, z: number, isTop: boolean) {
  const settings = state.value
  const offset = isTop ? 9999 : 0
  let y = noise2D((x + offset) / settings.scale, (z + offset) / settings.scale) * settings.heightMultiplier

  const detailScale = settings.scale * 0.4
  y
    += noise2D((x + offset) / detailScale, (z + offset) / detailScale)
      * (settings.heightMultiplier * settings.detailStrength)

  const dist = Math.abs(x)
  const valley = (dist / settings.valleyWidth) ** 2.5
  y += valley

  return y
}

function createChunk(index: number): CaveChunk {
  const geometry = new PlaneGeometry(CHUNK_WIDTH, CHUNK_LENGTH, SEGMENTS_W, SEGMENTS_L)
  geometry.rotateX(-Math.PI / 2)

  const settings = state.value
  const matGround = new MeshStandardMaterial({
    color: settings.groundColor,
    roughness: 0.9,
    flatShading: settings.flatShading,
    wireframe: settings.wireframe,
    fog: true,
    side: DoubleSide,
    dithering: true,
  })

  const matCeil = new MeshStandardMaterial({
    color: settings.ceilingColor,
    roughness: 0.9,
    flatShading: settings.flatShading,
    wireframe: settings.wireframe,
    fog: true,
    side: DoubleSide,
    dithering: true,
  })

  const meshGround = new Mesh(geometry, matGround)
  const meshCeil = new Mesh(geometry.clone(), matCeil)
  meshCeil.visible = settings.showCeiling

  const group = new Group()
  group.add(meshGround)
  group.add(meshCeil)

  return {
    group,
    meshGround,
    meshCeil,
    index,
  }
}

function updateChunk(chunk: CaveChunk) {
  const zPosition = chunk.index * -CHUNK_LENGTH
  chunk.group.position.z = zPosition

  const geoG = chunk.meshGround.geometry
  const posG = geoG.attributes.position
  const geoC = chunk.meshCeil.geometry
  const posC = geoC.attributes.position

  for (let i = 0; i < posG.count; i++) {
    const x = posG.getX(i)
    const localZ = posG.getZ(i)
    const worldZ = zPosition + localZ

    const hGround = getElevation(x, worldZ, false)
    posG.setY(i, GROUND_OFFSET + hGround)

    const hCeil = getElevation(x, worldZ, true)
    posC.setY(i, CEILING_OFFSET - hCeil)
  }

  posG.needsUpdate = true
  geoG.computeVertexNormals()

  posC.needsUpdate = true
  geoC.computeVertexNormals()
}

function refreshTerrain() {
  if (!chunks.length)
    return

  chunks.forEach(chunk => updateChunk(chunk))
}

function syncCeilingVisibility() {
  if (!chunks.length)
    return

  const settings = state.value
  chunks.forEach((chunk) => {
    chunk.meshCeil.visible = settings.showCeiling
  })
}

function syncShading() {
  if (!chunks.length)
    return

  const settings = state.value
  chunks.forEach((chunk) => {
    chunk.meshGround.material.flatShading = settings.flatShading
    chunk.meshGround.material.needsUpdate = true
    chunk.meshCeil.material.flatShading = settings.flatShading
    chunk.meshCeil.material.needsUpdate = true
  })

  refreshTerrain()
}

function syncWireframe() {
  if (!chunks.length)
    return

  const settings = state.value
  chunks.forEach((chunk) => {
    chunk.meshGround.material.wireframe = settings.wireframe
    chunk.meshCeil.material.wireframe = settings.wireframe
  })
}

function syncMaterialColors() {
  if (!chunks.length)
    return

  const settings = state.value
  chunks.forEach((chunk) => {
    chunk.meshGround.material.color.set(settings.groundColor)
    chunk.meshCeil.material.color.set(settings.ceilingColor)
  })
}

function syncSceneAtmosphere() {
  const scene = sceneRef.value
  if (!scene)
    return

  const settings = state.value
  if (scene.background instanceof Color)
    scene.background.set(settings.bgColor)
  else
    scene.background = new Color(settings.bgColor)
}

function syncFog() {
  const settings = state.value
  if (!fogRef.value)
    fogRef.value = new FogExp2(settings.bgColor, settings.fogDensity)

  fogRef.value.color.set(settings.bgColor)
  fogRef.value.density = settings.fogDensity
}

function disposeTunnel() {
  chunks.forEach((chunk) => {
    chunk.meshGround.geometry.dispose()
    chunk.meshGround.material.dispose()
    chunk.meshCeil.geometry.dispose()
    chunk.meshCeil.material.dispose()
  })

  chunks.length = 0
  tunnelGroup.value = null
}

function buildTunnel() {
  disposeTunnel()

  const group = new Group()
  for (let i = 0; i < CHUNK_COUNT; i++) {
    const chunk = createChunk(i)
    updateChunk(chunk)
    chunks.push(chunk)
    group.add(chunk.group)
  }

  tunnelGroup.value = group
}

function onCanvasReady(ctx: TresContext) {
  sceneRef.value = ctx.scene.value
  syncSceneAtmosphere()
}

const { pause, resume } = useRafFn(({ delta }) => {
  const camera = cameraRef.value
  if (!camera || !chunks.length)
    return

  const dt = delta / 1000
  camera.position.z -= state.value.speed * dt
  camLightRef.value?.position.copy(camera.position)

  let maxIndex = 0
  chunks.forEach((chunk) => {
    if (chunk.index > maxIndex)
      maxIndex = chunk.index
  })

  chunks.forEach((chunk) => {
    if (chunk.group.position.z > camera.position.z + CHUNK_LENGTH) {
      chunk.index = maxIndex + 1
      maxIndex += 1
      updateChunk(chunk)
    }
  })
}, { immediate: false })

const documentVisibility = useDocumentVisibility()
watch(documentVisibility, (state) => {
  if (state === 'visible')
    resume()
  else
    pause()
}, { immediate: true })

watch(
  () => state.value.showCeiling,
  () => syncCeilingVisibility(),
  { immediate: true },
)

watch(
  () => state.value.flatShading,
  () => syncShading(),
  { immediate: true },
)

watch(
  () => state.value.wireframe,
  () => syncWireframe(),
  { immediate: true },
)

watch(
  () => [state.value.scale, state.value.heightMultiplier, state.value.detailStrength, state.value.valleyWidth],
  () => refreshTerrain(),
)

watch(
  () => [state.value.groundColor, state.value.ceilingColor],
  () => syncMaterialColors(),
  { immediate: true },
)

watch(
  () => [state.value.bgColor, state.value.fogDensity],
  () => {
    syncSceneAtmosphere()
    syncFog()
  },
  { immediate: true },
)

onMounted(() => {
  if (!import.meta.client)
    return

  buildTunnel()
  syncCeilingVisibility()
  syncShading()
  syncWireframe()
  syncMaterialColors()
  syncFog()
})

onBeforeUnmount(() => {
  pause()
  disposeTunnel()
})
</script>

<template>
  <div class="relative h-full w-full">
    <ClientOnly>
      <TresCanvas
        :dpr="dpr"
        :antialias="true"
        :alpha="false"
        :clear-alpha="1"
        :clear-color="state.bgColor"
        render-mode="always"
        power-preference="high-performance"
        precision="highp"
        window-size
        @ready="onCanvasReady"
      >
        <TresPerspectiveCamera
          ref="cameraRef"
          :aspect="aspectRatio"
          :position="[0, 0, CAMERA_START_Z]"
          :fov="60"
          :near="0.1"
          :far="300"
        />
        <TresHemisphereLight
          :color="state.ceilingColor"
          :ground-color="state.groundColor"
          :intensity="state.ambientInt"
        />
        <TresPointLight
          ref="camLightRef"
          color="#ffffff"
          :intensity="state.camLightInt"
          :distance="120"
          :decay="1.5"
          :position="[0, 0, CAMERA_START_Z]"
        />
        <primitive v-if="fogRef" :object="fogRef" attach="fog" />
        <primitive v-if="tunnelGroup" :object="tunnelGroup" />
      </TresCanvas>
    </ClientOnly>

    <div
      data-lenis-prevent
      class="pointer-events-auto fixed right-6 top-1/2 z-20 max-h-[85vh] w-[min(420px,calc(100%-2rem))] overflow-y-auto transition-all duration-300 -translate-y-1/2"
      :class="[
        showControls ? 'opacity-100 translate-x-0' : 'pointer-events-none opacity-0 translate-x-8',
      ]"
    >
      <div class="border-black/5 bg-white/80 dark:border-white/10 dark:bg-black/50 border rounded-2xl p-4 shadow-xl backdrop-blur">
        <div class="mb-4 flex items-center justify-between gap-4">
          <div>
            <p class="text-sm text-muted-foreground font-semibold tracking-wide">
              Cave Tunnel Controls
            </p>
            <p class="text-xs text-muted-foreground/70">
              Match the original params while you tune
            </p>
          </div>
          <div class="flex items-center gap-3">
            <button
              class="text-xs text-primary tracking-widest uppercase"
              type="button"
              @click="resetControls"
            >
              Reset
            </button>
            <button
              class="text-xs text-primary tracking-widest uppercase"
              type="button"
              @click="copySettingsJson"
            >
              {{ copied ? 'Copied' : 'Copy JSON' }}
            </button>
          </div>
        </div>

        <div class="grid gap-4">
          <div class="grid gap-2">
            <label class="text-xs text-muted-foreground font-semibold">
              Speed: {{ state.speed.toFixed(1) }}
            </label>
            <input v-model.number="state.speed" type="range" min="0" max="50" step="0.1">
          </div>

          <div class="grid gap-2 md:grid-cols-3">
            <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
              Noise Scale
              <input v-model.number="state.scale" type="range" min="10" max="150" step="1">
            </label>
            <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
              Height
              <input v-model.number="state.heightMultiplier" type="range" min="1" max="20" step="0.1">
            </label>
            <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
              Detail
              <input v-model.number="state.detailStrength" type="range" min="0" max="1" step="0.01">
            </label>
            <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
              Valley Width
              <input v-model.number="state.valleyWidth" type="range" min="5" max="50" step="0.5">
            </label>
            <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
              Fog Density
              <input v-model.number="state.fogDensity" type="range" min="0" max="0.1" step="0.0005">
            </label>
          </div>

          <div class="grid gap-2 md:grid-cols-3">
            <label class="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
              <input v-model="state.showCeiling" type="checkbox" class="accent-black dark:accent-white">
              Show Ceiling
            </label>
            <label class="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
              <input v-model="state.flatShading" type="checkbox" class="accent-black dark:accent-white">
              Flat Shading
            </label>
            <label class="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
              <input v-model="state.wireframe" type="checkbox" class="accent-black dark:accent-white">
              Wireframe
            </label>
          </div>

          <div class="grid gap-2">
            <label class="text-xs text-muted-foreground font-medium tracking-widest uppercase">
              Colors
            </label>
            <div class="grid grid-cols-3 gap-2">
              <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
                Background
                <input v-model="state.bgColor" type="color" class="border-black/10 h-10 w-full cursor-pointer border rounded bg-transparent p-0">
              </label>
              <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
                Ground
                <input v-model="state.groundColor" type="color" class="border-black/10 h-10 w-full cursor-pointer border rounded bg-transparent p-0">
              </label>
              <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
                Ceiling
                <input v-model="state.ceilingColor" type="color" class="border-black/10 h-10 w-full cursor-pointer border rounded bg-transparent p-0">
              </label>
            </div>
          </div>

          <div class="grid gap-2 md:grid-cols-2">
            <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
              Ambient Intensity
              <input v-model.number="state.ambientInt" type="range" min="0" max="3" step="0.05">
            </label>
            <label class="grid gap-1 text-xs text-muted-foreground font-semibold">
              Camera Light Intensity
              <input v-model.number="state.camLightInt" type="range" min="0" max="3" step="0.05">
            </label>
          </div>
        </div>
      </div>
    </div>

    <button
      class="border-white/40 bg-white/80 text-slate-900 hover:bg-white pointer-events-auto fixed bottom-6 right-6 z-30 border rounded-full px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase shadow-lg backdrop-blur transition"
      type="button"
      @click="showControls = !showControls"
    >
      {{ showControls ? 'Hide controls' : 'Show controls' }}
    </button>
  </div>
</template>
