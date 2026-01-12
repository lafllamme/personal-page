<script setup lang="ts">
import type { TresContext } from '@tresjs/core'
import type { PerspectiveCamera, Scene, Texture, WebGLRenderer } from 'three'
import { TresCanvas } from '@tresjs/core'
import {
  useDevicePixelRatio,
  useDocumentVisibility,
  useEventListener,
  useIntersectionObserver,
  useRafFn,
  useWindowSize,
} from '@vueuse/core'
import {
  ACESFilmicToneMapping,
  Color,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PlaneGeometry,
  PMREMGenerator,
  Raycaster,
  SRGBColorSpace,
  WebGLRenderer as ThreeWebGLRenderer,
  Vector2,
  Vector3,
} from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js'

type RapierModule = typeof import('@dimforge/rapier3d-compat')
type RapierWorld = import('@dimforge/rapier3d-compat').World
type RapierRigidBody = import('@dimforge/rapier3d-compat').RigidBody

interface GlassBody {
  rigid: RapierRigidBody
  color: Color
  strength: number
  subtract: number

  updatePhysics: () => void
  getMetaPos: () => Vector3
}

interface MouseBall {
  update: (position: Vector3) => void
}

const container = ref<HTMLElement | null>(null)
const cameraRef = shallowRef<PerspectiveCamera | null>(null)
const sceneRef = shallowRef<Scene | null>(null)
const rendererRef = shallowRef<WebGLRenderer | null>(null)
const environmentMap = shallowRef<Texture | null>(null)

const metaballs = shallowRef<MarchingCubes | null>(null)
const mousePlane = shallowRef<Mesh | null>(null)

const { width, height } = useWindowSize()
const aspectRatio = computed(() => (height.value ? width.value / height.value : 1))
const { pixelRatio } = useDevicePixelRatio()

/**
 * Settings (UI-controlled)
 * - grouped by: Perf / Field / Bodies / Mouse
 * - anything that changes body/collider creation triggers rebuildPhysics()
 */
const settings = reactive({
  uiOpen: true,

  perf: {
    dprMax: 1.5,
    marchingResolution: 96,
    marchingMaxPoly: 90000,
  },

  field: {
    scale: 5,
    isolation: 1000,
    metaMapMul: 0.1, // your current mapping: pos * 0.1 + offset
    offsetX: 0.5,
    offsetY: 0.5,
    offsetZ: 0.5,
  },

  bodies: {
    count: 40,
    range: 6,
    spawnYBias: 3,

    sizeMin: 0.12,
    sizeMax: 0.34,

    densityMin: 0.35,
    densityMax: 0.70,

    linDampMin: 2.2,
    linDampMax: 3.6,
    angDampMin: 6.0,
    angDampMax: 11.0,

    restitution: 0.0,
    friction: 1.15,

    pullBaseMin: 0.42,
    pullBaseMax: 0.52,
    pullBoostMulMin: 0.14,
    pullBoostMulMax: 0.20,
    pullBoostCapMin: 1.55,
    pullBoostCapMax: 2.10,

    maxSpeedMin: 5.0,
    maxSpeedMax: 6.2,
    maxAngMin: 6.0,
    maxAngMax: 8.0,

    strengthBase: 0.34,
    strengthSizeMul: 0.95,
    strengthRand: 0.08,

    subtractBase: 7.2,
    subtractInvSizeMul: 12.0,
    subtractRand: 2.0,
  },

  mouse: {
    lerp: 0.22,
    parkZ: 50,
    edgeDeadzoneNdc: 0.96,
    colliderMul: 4.0,
    radius: 0.25,
  },
})

const dpr = computed(() => Math.min(pixelRatio.value || 1, settings.perf.dprMax))

const documentVisibility = useDocumentVisibility()
const visibleRatio = ref(0)
const isVisible = computed(() => visibleRatio.value >= 0.1 && documentVisibility.value === 'visible')

const raycaster = new Raycaster()
const pointerPos = new Vector2(0, 0)

const mouseTarget = new Vector3(0, 0, settings.mouse.parkZ)
const mousePos = new Vector3(0, 0, settings.mouse.parkZ)

const cameraDirection = new Vector3()

const metaOffset = new Vector3(settings.field.offsetX, settings.field.offsetY, settings.field.offsetZ)
const sceneMiddle = new Vector3(0, 0, 0)

const bodies: GlassBody[] = []
let mouseBall: MouseBall | null = null
let world: RapierWorld | null = null
let rapier: RapierModule | null = null

const colorPalette = [
  0x0067B1,
  0x4E99CE,
  0x9BCBEB,
  0x55D7E2,
  0xFFFFFF,
  0x9CA9B2,
  0x4E6676,
  0xF69230,
  0xF5D81F,
]

// Pointer state
const pointerInside = ref(false)
const pointerActive = ref(false)

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

function readRapierVec3To(out: Vector3, rapierVec: any) {
  out.set(rapierVec.x, rapierVec.y, rapierVec.z)
  if (rapierVec && typeof rapierVec.free === 'function')
    rapierVec.free()
}

function onCanvasReady(ctx: TresContext) {
  const renderer = ctx.renderer.instance as unknown as WebGLRenderer
  const scene = ctx.scene.value as unknown as Scene

  rendererRef.value = renderer
  sceneRef.value = scene

  if (!rendererRef.value || !sceneRef.value)
    return

  const rAny = rendererRef.value as any
  if ('toneMapping' in rAny)
    rAny.toneMapping = ACESFilmicToneMapping
  if ('outputColorSpace' in rAny)
    rAny.outputColorSpace = SRGBColorSpace

  if (rendererRef.value instanceof ThreeWebGLRenderer) {
    const pmrem = new PMREMGenerator(rendererRef.value)
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    pmrem.dispose()

    environmentMap.value?.dispose()
    environmentMap.value = envTexture

    sceneRef.value.environment = envTexture
    sceneRef.value.background = new Color('#06090f')
  }
  else {
    sceneRef.value.background = new Color('#06090f')
  }
}

function applyFieldSettings() {
  if (!metaballs.value)
    return

  metaballs.value.isolation = settings.field.isolation
  metaballs.value.scale.setScalar(settings.field.scale)

  metaOffset.set(settings.field.offsetX, settings.field.offsetY, settings.field.offsetZ)
}

function createMetaballs() {
  const material = new MeshPhysicalMaterial({
    vertexColors: true,
    transmission: 1.0,
    thickness: 1.0,
    roughness: 0.0,
    metalness: 0.0,
    transparent: true,
  })

  const marching = new MarchingCubes(
    settings.perf.marchingResolution,
    material,
    true,
    true,
    settings.perf.marchingMaxPoly,
  )

  metaballs.value = marching
  applyFieldSettings()
}

function createMousePlane() {
  const geometry = new PlaneGeometry(48, 48, 48, 48)
  const material = new MeshBasicMaterial({
    color: 0x00FF00,
    transparent: true,
    opacity: 0,
    wireframe: true,
    depthWrite: false,
  })
  const plane = new Mesh(geometry, material)
  plane.position.set(0, 0, 0.2)
  mousePlane.value = plane
}

function createBody(rapierInstance: RapierModule, rapierWorld: RapierWorld): GlassBody {
  const range = settings.bodies.range

  const size = settings.bodies.sizeMin + Math.random() * (settings.bodies.sizeMax - settings.bodies.sizeMin)
  const density = settings.bodies.densityMin + Math.random() * (settings.bodies.densityMax - settings.bodies.densityMin)

  const x = Math.random() * range - range * 0.5
  const y = Math.random() * range - range * 0.5 + settings.bodies.spawnYBias
  const z = Math.random() * range - range * 0.5

  const rigidBodyDesc = rapierInstance.RigidBodyDesc.dynamic().setTranslation(x, y, z)
  const rigid = rapierWorld.createRigidBody(rigidBodyDesc)

  const linDamp = settings.bodies.linDampMin + Math.random() * (settings.bodies.linDampMax - settings.bodies.linDampMin)
  const angDamp = settings.bodies.angDampMin + Math.random() * (settings.bodies.angDampMax - settings.bodies.angDampMin)
  rigid.setLinearDamping(linDamp)
  rigid.setAngularDamping(angDamp)

  const colliderDesc = rapierInstance.ColliderDesc.ball(size)
    .setDensity(density)
    .setRestitution(settings.bodies.restitution)
    .setFriction(settings.bodies.friction)

  rapierWorld.createCollider(colliderDesc, rigid)

  const color = new Color(colorPalette[Math.floor(Math.random() * colorPalette.length)])

  const pos = new Vector3()
  const dir = new Vector3()
  const vel = new Vector3()
  const ang = new Vector3()

  const basePull = settings.bodies.pullBaseMin + Math.random() * (settings.bodies.pullBaseMax - settings.bodies.pullBaseMin)
  const boostMul = settings.bodies.pullBoostMulMin + Math.random() * (settings.bodies.pullBoostMulMax - settings.bodies.pullBoostMulMin)
  const boostCap = settings.bodies.pullBoostCapMin + Math.random() * (settings.bodies.pullBoostCapMax - settings.bodies.pullBoostCapMin)

  const maxSpeed = settings.bodies.maxSpeedMin + Math.random() * (settings.bodies.maxSpeedMax - settings.bodies.maxSpeedMin)
  const maxAng = settings.bodies.maxAngMin + Math.random() * (settings.bodies.maxAngMax - settings.bodies.maxAngMin)

  const strength = settings.bodies.strengthBase + size * settings.bodies.strengthSizeMul + Math.random() * settings.bodies.strengthRand
  const subtract = settings.bodies.subtractBase + (0.34 - size) * settings.bodies.subtractInvSizeMul + Math.random() * settings.bodies.subtractRand

  const metaPos = new Vector3()

  function computeMetaFromWorld() {
    metaPos.copy(pos).multiplyScalar(settings.field.metaMapMul).add(metaOffset)
  }

  return {
    rigid,
    color,
    strength,
    subtract,

    updatePhysics() {
      readRapierVec3To(pos, rigid.translation() as any)
      readRapierVec3To(vel, rigid.linvel() as any)
      readRapierVec3To(ang, rigid.angvel() as any)

      rigid.resetForces(true)

      dir.copy(pos).sub(sceneMiddle)
      const dist = dir.length() + 1e-4
      dir.multiplyScalar(1 / dist)

      const pull = basePull + Math.min(dist * boostMul, boostCap)
      rigid.addForce({ x: -dir.x * pull, y: -dir.y * pull, z: -dir.z * pull }, true)

      const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y + vel.z * vel.z)
      if (speed > maxSpeed) {
        const s = maxSpeed / speed
        rigid.setLinvel({ x: vel.x * s, y: vel.y * s, z: vel.z * s }, true)
      }

      const angSpeed = Math.sqrt(ang.x * ang.x + ang.y * ang.y + ang.z * ang.z)
      if (angSpeed > maxAng) {
        const s = maxAng / angSpeed
        rigid.setAngvel({ x: ang.x * s, y: ang.y * s, z: ang.z * s }, true)
      }

      computeMetaFromWorld()
    },

    getMetaPos() {
      return metaPos
    },
  }
}

function createMouseBall(rapierInstance: RapierModule, rapierWorld: RapierWorld): MouseBall {
  const bodyDesc = rapierInstance.RigidBodyDesc.kinematicPositionBased().setTranslation(0, 0, settings.mouse.parkZ)
  const rigid = rapierWorld.createRigidBody(bodyDesc)

  const colliderDesc = rapierInstance.ColliderDesc.ball(settings.mouse.radius * settings.mouse.colliderMul)
  rapierWorld.createCollider(colliderDesc, rigid)

  return {
    update(position: Vector3) {
      rigid.setNextKinematicTranslation({ x: position.x, y: position.y, z: position.z })
    },
  }
}

function freeWorld() {
  try {
    world?.free()
  }
  catch {
  }
  world = null
  mouseBall = null
  bodies.length = 0
}

async function ensureRapier() {
  if (rapier)
    return
  rapier = await import('@dimforge/rapier3d-compat')
  await rapier.init()
}

async function rebuildPhysics() {
  if (!import.meta.client)
    return

  await ensureRapier()

  freeWorld()
  world = new rapier!.World({ x: 0.0, y: 0.0, z: 0.0 })

  for (let i = 0; i < settings.bodies.count; i++)
    bodies.push(createBody(rapier!, world))

  mouseBall = createMouseBall(rapier!, world)

  mouseTarget.set(0, 0, settings.mouse.parkZ)
  mousePos.set(0, 0, settings.mouse.parkZ)
}

async function rebuildMarching() {
  metaballs.value?.geometry.dispose()
  if (Array.isArray(metaballs.value?.material))
    metaballs.value?.material.forEach(m => m.dispose())
  else
    metaballs.value?.material.dispose()

  createMetaballs()
}

function handleRaycast() {
  if (!cameraRef.value || !mousePlane.value)
    return

  if (!pointerInside.value || !pointerActive.value) {
    mouseTarget.set(0, 0, settings.mouse.parkZ)
    return
  }

  cameraRef.value.getWorldDirection(cameraDirection)
  cameraDirection.multiplyScalar(-1)
  mousePlane.value.lookAt(cameraDirection)

  raycaster.setFromCamera(pointerPos, cameraRef.value)
  const intersects = raycaster.intersectObject(mousePlane.value, false)
  if (intersects.length > 0)
    mouseTarget.copy(intersects[0].point)
}

function stepSimulation() {
  if (!world || !metaballs.value)
    return

  applyFieldSettings()
  handleRaycast()

  mousePos.lerp(mouseTarget, settings.mouse.lerp)
  mouseBall?.update(mousePos)

  world.step()

  bodies.forEach((b) => {
    b.updatePhysics()
  })

  metaballs.value.reset()
  bodies.forEach((b) => {
    const p = b.getMetaPos()
    metaballs.value?.addBall(p.x, p.y, p.z, b.strength, b.subtract, b.color)
  })
  metaballs.value.update()
}

const { pause, resume } = useRafFn(stepSimulation, { immediate: false })

watch(isVisible, (active) => {
  if (active)
    resume()
  else
    pause()
}, { immediate: true })

if (import.meta.client) {
  useIntersectionObserver(
    container,
    ([entry]) => {
      visibleRatio.value = entry?.intersectionRatio ?? 0
    },
    { threshold: Array.from({ length: 11 }, (_, i) => i / 10) },
  )
}

function updatePointerFromEvent(event: PointerEvent) {
  const el = container.value
  if (!el)
    return

  const rect = el.getBoundingClientRect()
  const inside
    = event.clientX >= rect.left
      && event.clientX <= rect.right
      && event.clientY >= rect.top
      && event.clientY <= rect.bottom

  pointerInside.value = inside

  if (!inside) {
    pointerActive.value = false
    mouseTarget.set(0, 0, settings.mouse.parkZ)
    return
  }

  const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1
  const ny = -((event.clientY - rect.top) / rect.height) * 2 + 1

  const dz = settings.mouse.edgeDeadzoneNdc
  const active = Math.abs(nx) < dz && Math.abs(ny) < dz
  pointerActive.value = active

  const cx = clamp(nx, -dz, dz)
  const cy = clamp(ny, -dz, dz)
  pointerPos.set(cx, cy)

  if (!active)
    mouseTarget.set(0, 0, settings.mouse.parkZ)
}

useEventListener(window, 'pointermove', updatePointerFromEvent, { passive: true })
useEventListener(window, 'pointerdown', updatePointerFromEvent, { passive: true })

watch(
  () => [
    settings.bodies.count,
    settings.bodies.sizeMin,
    settings.bodies.sizeMax,
    settings.bodies.densityMin,
    settings.bodies.densityMax,
    settings.bodies.linDampMin,
    settings.bodies.linDampMax,
    settings.bodies.angDampMin,
    settings.bodies.angDampMax,
    settings.bodies.restitution,
    settings.bodies.friction,
    settings.bodies.pullBaseMin,
    settings.bodies.pullBaseMax,
    settings.bodies.pullBoostMulMin,
    settings.bodies.pullBoostMulMax,
    settings.bodies.pullBoostCapMin,
    settings.bodies.pullBoostCapMax,
    settings.bodies.maxSpeedMin,
    settings.bodies.maxSpeedMax,
    settings.bodies.maxAngMin,
    settings.bodies.maxAngMax,
    settings.mouse.radius,
    settings.mouse.colliderMul,
    settings.mouse.parkZ,
  ],
  async () => {
    await rebuildPhysics()
  },
)

watch(
  () => [
    settings.perf.marchingResolution,
    settings.perf.marchingMaxPoly,
  ],
  async () => {
    await rebuildMarching()
  },
)

onMounted(async () => {
  createMetaballs()
  createMousePlane()
  await rebuildPhysics()

  mouseTarget.set(0, 0, settings.mouse.parkZ)
  mousePos.set(0, 0, settings.mouse.parkZ)

  if (container.value?.matches(':hover'))
    pointerInside.value = true
})

onBeforeUnmount(() => {
  pause()

  metaballs.value?.geometry.dispose()
  if (Array.isArray(metaballs.value?.material))
    metaballs.value?.material.forEach(material => material.dispose())
  else
    metaballs.value?.material.dispose()

  mousePlane.value?.geometry.dispose()
  if (mousePlane.value?.material instanceof MeshBasicMaterial)
    mousePlane.value.material.dispose()

  environmentMap.value?.dispose()

  freeWorld()
  rapier = null
})
</script>

<template>
  <div ref="container" class="relative h-full w-full">
    <ClientOnly>
      <TresCanvas
        :dpr="dpr"
        :alpha="true"
        :clear-alpha="0"
        clear-color="#06090f"
        render-mode="always"
        @ready="onCanvasReady"
      >
        <TresPerspectiveCamera
          ref="cameraRef"
          :aspect="aspectRatio"
          :position="[0, 0, 6]"
          :fov="70"
          :near="0.1"
          :far="100"
        />
        <TresAmbientLight :intensity="0.3" />
        <TresDirectionalLight :position="[6, 8, 6]" :intensity="1.2" />
        <primitive v-if="metaballs" :object="metaballs" />
        <primitive v-if="mousePlane" :object="mousePlane" />
      </TresCanvas>

      <!-- Settings panel (Tailwind / UnoCSS compatible classes) -->
      <div
        v-if="settings.uiOpen"
        class="border-white/10 text-white/90 absolute bottom-3 right-3 z-50 max-h-[70vh] w-[340px] overflow-auto border rounded-2xl bg-[#080a10]/70 p-3 backdrop-blur"
      >
        <div class="mb-2 flex items-center justify-between gap-3">
          <div class="text-sm font-semibold">
            Liquid Settings
          </div>
          <button
            type="button"
            class="border-white/10 bg-white/5 hover:bg-white/10 border rounded-xl px-3 py-1.5 text-xs"
            @click="settings.uiOpen = false"
          >
            Close
          </button>
        </div>

        <details open class="border-white/10 bg-white/5 border rounded-xl p-2">
          <summary class="cursor-pointer select-none text-xs font-semibold opacity-90">
            Performance
          </summary>

          <div class="mt-2 space-y-3">
            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>DPR max</span><span>{{ settings.perf.dprMax.toFixed(2) }}</span>
              </div>
              <input v-model.number="settings.perf.dprMax" type="range" min="1" max="2" step="0.05" class="w-full">
            </div>

            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>Marching resolution</span><span>{{ settings.perf.marchingResolution }}</span>
              </div>
              <input v-model.number="settings.perf.marchingResolution" type="range" min="48" max="128" step="8" class="w-full">
              <div class="mt-1 text-[10px] opacity-60">
                Rebuilds marching cubes
              </div>
            </div>

            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>Max polys</span><span>{{ settings.perf.marchingMaxPoly }}</span>
              </div>
              <input v-model.number="settings.perf.marchingMaxPoly" type="range" min="30000" max="140000" step="5000" class="w-full">
              <div class="mt-1 text-[10px] opacity-60">
                Rebuilds marching cubes
              </div>
            </div>
          </div>
        </details>

        <div class="h-2" />

        <details open class="border-white/10 bg-white/5 border rounded-xl p-2">
          <summary class="cursor-pointer select-none text-xs font-semibold opacity-90">
            Field
          </summary>

          <div class="mt-2 space-y-3">
            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>Scale</span><span>{{ settings.field.scale.toFixed(2) }}</span>
              </div>
              <input v-model.number="settings.field.scale" type="range" min="2.5" max="6.5" step="0.05" class="w-full">
            </div>

            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>Isolation</span><span>{{ settings.field.isolation.toFixed(0) }}</span>
              </div>
              <input v-model.number="settings.field.isolation" type="range" min="80" max="1400" step="5" class="w-full">
            </div>

            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>Meta mapping</span><span>{{ settings.field.metaMapMul.toFixed(3) }}</span>
              </div>
              <input v-model.number="settings.field.metaMapMul" type="range" min="0.05" max="0.12" step="0.001" class="w-full">
            </div>

            <div class="grid grid-cols-3 gap-2">
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">Off X</div>
                <input v-model.number="settings.field.offsetX" type="number" step="0.01" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
              </label>
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">Off Y</div>
                <input v-model.number="settings.field.offsetY" type="number" step="0.01" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
              </label>
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">Off Z</div>
                <input v-model.number="settings.field.offsetZ" type="number" step="0.01" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
              </label>
            </div>
          </div>
        </details>

        <div class="h-2" />

        <details class="border-white/10 bg-white/5 border rounded-xl p-2">
          <summary class="cursor-pointer select-none text-xs font-semibold opacity-90">
            Bodies (rebuild)
          </summary>

          <div class="mt-2 space-y-3">
            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>Count</span><span>{{ settings.bodies.count }}</span>
              </div>
              <input v-model.number="settings.bodies.count" type="range" min="10" max="90" step="1" class="w-full">
            </div>

            <div class="grid grid-cols-2 gap-2">
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">Size min</div>
                <input v-model.number="settings.bodies.sizeMin" type="number" step="0.01" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
              </label>
              <label class="space-y-1">
                <div class="text-[10px] opacity-70">Size max</div>
                <input v-model.number="settings.bodies.sizeMax" type="number" step="0.01" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
              </label>
            </div>

            <details class="border-white/10 bg-black/20 border rounded-xl p-2">
              <summary class="cursor-pointer select-none text-[11px] font-semibold opacity-90">
                Dynamics
              </summary>

              <div class="mt-2 space-y-3">
                <div>
                  <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                    <span>Restitution</span><span>{{ settings.bodies.restitution.toFixed(2) }}</span>
                  </div>
                  <input v-model.number="settings.bodies.restitution" type="range" min="0" max="0.6" step="0.01" class="w-full">
                </div>

                <div>
                  <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                    <span>Friction</span><span>{{ settings.bodies.friction.toFixed(2) }}</span>
                  </div>
                  <input v-model.number="settings.bodies.friction" type="range" min="0.2" max="1.8" step="0.01" class="w-full">
                </div>

                <div class="grid grid-cols-2 gap-2">
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Linear damp min</div>
                    <input v-model.number="settings.bodies.linDampMin" type="number" step="0.05" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Linear damp max</div>
                    <input v-model.number="settings.bodies.linDampMax" type="number" step="0.05" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                </div>
              </div>
            </details>

            <button
              type="button"
              class="border-white/10 bg-white/5 hover:bg-white/10 w-full border rounded-xl px-3 py-2 text-xs"
              @click="rebuildPhysics"
            >
              Rebuild bodies now
            </button>
          </div>
        </details>

        <div class="h-2" />

        <details open class="border-white/10 bg-white/5 border rounded-xl p-2">
          <summary class="cursor-pointer select-none text-xs font-semibold opacity-90">
            Mouse
          </summary>

          <div class="mt-2 space-y-3">
            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>Lerp</span><span>{{ settings.mouse.lerp.toFixed(2) }}</span>
              </div>
              <input v-model.number="settings.mouse.lerp" type="range" min="0.02" max="0.6" step="0.01" class="w-full">
            </div>

            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>Collider mul</span><span>{{ settings.mouse.colliderMul.toFixed(2) }}</span>
              </div>
              <input v-model.number="settings.mouse.colliderMul" type="range" min="2.0" max="8.0" step="0.1" class="w-full">
              <div class="mt-1 text-[10px] opacity-60">
                Rebuilds mouse collider
              </div>
            </div>

            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>Edge deadzone</span><span>{{ settings.mouse.edgeDeadzoneNdc.toFixed(2) }}</span>
              </div>
              <input v-model.number="settings.mouse.edgeDeadzoneNdc" type="range" min="0.6" max="0.99" step="0.01" class="w-full">
            </div>
          </div>
        </details>

        <div class="mt-3 text-[10px] opacity-60">
          Tip: values marked “rebuild” recreate bodies/colliders (slightly heavier).
        </div>
      </div>

      <button
        v-else
        type="button"
        class="border-white/10 bg-white/5 text-white/90 hover:bg-white/10 absolute bottom-3 right-3 z-50 border rounded-2xl px-3 py-2 text-xs backdrop-blur"
        @click="settings.uiOpen = true"
      >
        Settings
      </button>
    </ClientOnly>
  </div>
</template>
