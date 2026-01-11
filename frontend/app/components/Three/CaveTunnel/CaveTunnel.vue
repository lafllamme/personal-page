<script setup lang="ts">
import type { TresContext } from '@tresjs/core'
import type {
  PerspectiveCamera,
  PointLight,
  Scene,
} from 'three'
import type { CaveTunnelProps } from './CaveTunnel.model'
import { TresCanvas } from '@tresjs/core'
import { useDevicePixelRatio, useDocumentVisibility, useRafFn, useWindowSize } from '@vueuse/core'
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

const props = withDefaults(defineProps<CaveTunnelProps>(), caveTunnelDefaults)

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

const chunks: CaveChunk[] = []

const { width, height } = useWindowSize()
const aspectRatio = computed(() => (height.value ? width.value / height.value : 1))
const { pixelRatio } = useDevicePixelRatio()
const dpr = computed(() => Math.min(pixelRatio.value || 1, 2))

function getElevation(x: number, z: number, isTop: boolean) {
  const offset = isTop ? 9999 : 0
  let y = noise2D((x + offset) / props.scale, (z + offset) / props.scale) * props.heightMultiplier

  const detailScale = props.scale * 0.4
  y
    += noise2D((x + offset) / detailScale, (z + offset) / detailScale)
      * (props.heightMultiplier * props.detailStrength)

  const dist = Math.abs(x)
  const valley = (dist / props.valleyWidth) ** 2.5
  y += valley

  return y
}

function createChunk(index: number): CaveChunk {
  const geometry = new PlaneGeometry(CHUNK_WIDTH, CHUNK_LENGTH, SEGMENTS_W, SEGMENTS_L)
  geometry.rotateX(-Math.PI / 2)

  const matGround = new MeshStandardMaterial({
    color: props.groundColor,
    roughness: 0.9,
    flatShading: props.flatShading,
    wireframe: props.wireframe,
    side: DoubleSide,
    dithering: true,
  })

  const matCeil = new MeshStandardMaterial({
    color: props.ceilingColor,
    roughness: 0.9,
    flatShading: props.flatShading,
    wireframe: props.wireframe,
    side: DoubleSide,
    dithering: true,
  })

  const meshGround = new Mesh(geometry, matGround)
  const meshCeil = new Mesh(geometry.clone(), matCeil)
  meshCeil.visible = props.showCeiling

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

  chunks.forEach((chunk) => {
    chunk.meshCeil.visible = props.showCeiling
  })
}

function syncShading() {
  if (!chunks.length)
    return

  chunks.forEach((chunk) => {
    chunk.meshGround.material.flatShading = props.flatShading
    chunk.meshGround.material.needsUpdate = true
    chunk.meshCeil.material.flatShading = props.flatShading
    chunk.meshCeil.material.needsUpdate = true
  })

  refreshTerrain()
}

function syncWireframe() {
  if (!chunks.length)
    return

  chunks.forEach((chunk) => {
    chunk.meshGround.material.wireframe = props.wireframe
    chunk.meshCeil.material.wireframe = props.wireframe
  })
}

function syncMaterialColors() {
  if (!chunks.length)
    return

  chunks.forEach((chunk) => {
    chunk.meshGround.material.color.set(props.groundColor)
    chunk.meshCeil.material.color.set(props.ceilingColor)
  })
}

function syncSceneAtmosphere() {
  const scene = sceneRef.value
  if (!scene)
    return

  if (scene.background instanceof Color)
    scene.background.set(props.bgColor)
  else
    scene.background = new Color(props.bgColor)

  if (scene.fog instanceof FogExp2) {
    scene.fog.color.set(props.bgColor)
    scene.fog.density = props.fogDensity
  }
  else {
    scene.fog = new FogExp2(props.bgColor, props.fogDensity)
  }
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
  camera.position.z -= props.speed * dt
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
  () => props.showCeiling,
  () => syncCeilingVisibility(),
  { immediate: true },
)

watch(
  () => props.flatShading,
  () => syncShading(),
  { immediate: true },
)

watch(
  () => props.wireframe,
  () => syncWireframe(),
  { immediate: true },
)

watch(
  () => [props.scale, props.heightMultiplier, props.detailStrength, props.valleyWidth],
  () => refreshTerrain(),
)

watch(
  () => [props.groundColor, props.ceilingColor],
  () => syncMaterialColors(),
  { immediate: true },
)

watch(
  () => [props.bgColor, props.fogDensity],
  () => syncSceneAtmosphere(),
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
        :clear-color="props.bgColor"
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
        <TresHemisphereLight color="#1a15ab" ground-color="#ed1515" :intensity="props.ambientInt" />
        <TresPointLight
          ref="camLightRef"
          color="#ffaa00"
          :intensity="props.camLightInt"
          :distance="120"
          :decay="1.5"
          :position="[0, 0, CAMERA_START_Z]"
        />
        <primitive v-if="tunnelGroup" :object="tunnelGroup" />
      </TresCanvas>
    </ClientOnly>
  </div>
</template>
