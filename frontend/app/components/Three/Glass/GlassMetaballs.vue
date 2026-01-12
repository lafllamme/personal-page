<script setup lang="ts">
import type { TresContext } from '@tresjs/core'
import type { PerspectiveCamera, Scene, Texture, WebGLRenderer } from 'three'
import { TresCanvas } from '@tresjs/core'
import {
  useDebounceFn,
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

  updatePhysics: (timeS: number) => void
  getMetaPos: () => Vector3
}

interface MouseBall {
  update: (position: Vector3) => void
}

type RenderMode = 'always' | 'on-demand'

interface GlassMetaballsSettings {
  uiOpen: boolean
  perf: {
    dprMax: number
    marchingResolution: number
    marchingMaxPoly: number
  }
  field: {
    scale: number
    isolation: number
    metaMapMul: number
    offsetX: number
    offsetY: number
    offsetZ: number
  }
  material: {
    transmission: number
    thickness: number
    ior: number
    roughness: number
    metalness: number
    envMapIntensity: number
    clearcoat: number
    clearcoatRoughness: number
  }
  bodies: {
    count: number
    range: number
    spawnYBias: number
    sizeMin: number
    sizeMax: number
    sizePow: number
    densityMin: number
    densityMax: number
    linDampMin: number
    linDampMax: number
    angDampMin: number
    angDampMax: number
    restitution: number
    friction: number
    pullBaseMin: number
    pullBaseMax: number
    pullBoostMulMin: number
    pullBoostMulMax: number
    pullBoostCapMin: number
    pullBoostCapMax: number
    maxSpeedMin: number
    maxSpeedMax: number
    maxAngMin: number
    maxAngMax: number
    flowStrength: number
    flowSpeed: number
    flowSpatial: number
    swirlStrength: number
    swirlSpeed: number
    strengthBase: number
    strengthSizeMul: number
    strengthRand: number
    subtractBase: number
    subtractInvSizeMul: number
    subtractRand: number
  }
  mouse: {
    lerp: number
    parkZ: number
    edgeDeadzoneNdc: number
    colliderMul: number
    radius: number
  }
}

const container = ref<HTMLElement | null>(null)
const cameraRef = shallowRef<PerspectiveCamera | null>(null)
const sceneRef = shallowRef<Scene | null>(null)
const rendererRef = shallowRef<WebGLRenderer | null>(null)
const environmentMap = shallowRef<Texture | null>(null)
const invalidateFrame = shallowRef<null | (() => void)>(null)

const metaballs = shallowRef<MarchingCubes | null>(null)
const metaMaterial = shallowRef<MeshPhysicalMaterial | null>(null)
const mousePlane = shallowRef<Mesh | null>(null)

const { width, height } = useWindowSize()
const aspectRatio = computed(() => (height.value ? width.value / height.value : 1))
const { pixelRatio } = useDevicePixelRatio()

function createDefaultSettings(): GlassMetaballsSettings {
  return {
    uiOpen: true,

    perf: {
      dprMax: 1,
      marchingResolution: 80,
      marchingMaxPoly: 90000,
    },

    field: {
      scale: 4.65,
      isolation: 335,
      metaMapMul: 0.1, // your current mapping: pos * 0.1 + offset
      offsetX: 0.5,
      offsetY: 0.5,
      offsetZ: 0.5,
    },

    material: {
      transmission: 1.0,
      thickness: 1.0,
      ior: 1.5,
      roughness: 0.03,
      metalness: 0.0,
      envMapIntensity: 1.35,
      clearcoat: 0.0,
      clearcoatRoughness: 0.2,
    },

    bodies: {
      count: 40,
      range: 6,
      spawnYBias: 3,

      sizeMin: 0.12,
      sizeMax: 0.34,
      sizePow: 1.8,

      densityMin: 0.35,
      densityMax: 0.70,

      linDampMin: 0.6,
      linDampMax: 1.2,
      angDampMin: 0.6,
      angDampMax: 1.3,

      restitution: 0.0,
      friction: 0.8,

      pullBaseMin: 0.35,
      pullBaseMax: 0.48,
      pullBoostMulMin: 0.08,
      pullBoostMulMax: 0.14,
      pullBoostCapMin: 0.85,
      pullBoostCapMax: 1.35,

      maxSpeedMin: 8.0,
      maxSpeedMax: 10.5,
      maxAngMin: 9.0,
      maxAngMax: 13.0,

      flowStrength: 0.16,
      flowSpeed: 0.85,
      flowSpatial: 0.6,
      swirlStrength: 0.10,
      swirlSpeed: 0.6,

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
      colliderMul: 6.0,
      radius: 0.25,
    },
  }
}

/**
 * Settings (UI-controlled)
 * - grouped by: Perf / Field / Bodies / Mouse
 * - anything that changes body/collider creation triggers rebuildPhysics()
 */
const settings = reactive<GlassMetaballsSettings>(createDefaultSettings())

const dpr = computed(() => Math.min(pixelRatio.value || 1, settings.perf.dprMax))

const documentVisibility = useDocumentVisibility()
const visibleRatio = ref(0)
const isVisible = computed(() => visibleRatio.value >= 0.1 && documentVisibility.value === 'visible')
const renderMode = computed<RenderMode>(() => (isVisible.value ? 'always' : 'on-demand'))

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

function requestRender() {
  if (renderMode.value === 'always')
    return
  invalidateFrame.value?.()
}

function applySettingsPreset(preset: GlassMetaballsSettings) {
  const preserveUiOpen = settings.uiOpen
  Object.assign(settings.perf, preset.perf)
  Object.assign(settings.field, preset.field)
  Object.assign(settings.material, preset.material)
  Object.assign(settings.bodies, preset.bodies)
  Object.assign(settings.mouse, preset.mouse)
  settings.uiOpen = preserveUiOpen
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
  invalidateFrame.value = (ctx as any)?.invalidate || (ctx as any)?.renderer?.invalidate || null

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

  requestRender()
}

function applyFieldSettings() {
  if (!metaballs.value)
    return

  metaballs.value.isolation = settings.field.isolation
  metaballs.value.scale.setScalar(settings.field.scale)

  metaOffset.set(settings.field.offsetX, settings.field.offsetY, settings.field.offsetZ)
}

function applyMaterialSettings() {
  const material = metaMaterial.value
  if (!material)
    return

  material.transmission = settings.material.transmission
  material.thickness = settings.material.thickness
  material.ior = settings.material.ior
  material.roughness = settings.material.roughness
  material.metalness = settings.material.metalness
  material.envMapIntensity = settings.material.envMapIntensity
  material.clearcoat = settings.material.clearcoat
  material.clearcoatRoughness = settings.material.clearcoatRoughness
}

function createMetaballs() {
  const material = new MeshPhysicalMaterial({
    vertexColors: true,
    transmission: settings.material.transmission,
    thickness: settings.material.thickness,
    ior: settings.material.ior,
    roughness: settings.material.roughness,
    metalness: settings.material.metalness,
    envMapIntensity: settings.material.envMapIntensity,
    clearcoat: settings.material.clearcoat,
    clearcoatRoughness: settings.material.clearcoatRoughness,
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
  metaMaterial.value = material
  applyFieldSettings()
  requestRender()
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

  const sizeSpan = Math.max(0, settings.bodies.sizeMax - settings.bodies.sizeMin)
  const sizeT = Math.random() ** settings.bodies.sizePow
  const size = settings.bodies.sizeMin + sizeT * sizeSpan
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
  const subtract = settings.bodies.subtractBase + Math.max(0, settings.bodies.sizeMax - size) * settings.bodies.subtractInvSizeMul + Math.random() * settings.bodies.subtractRand

  const metaPos = new Vector3()
  const flow = new Vector3()
  const swirl = new Vector3()

  const flowSeed = new Vector3(Math.random() * 10, Math.random() * 10, Math.random() * 10)
  const flowMul = 0.65 + Math.random() * 0.8

  const swirlAxis = new Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1)
  if (swirlAxis.lengthSq() < 1e-6)
    swirlAxis.set(0, 1, 0)
  swirlAxis.normalize()
  const swirlMul = 0.65 + Math.random() * 0.8
  const swirlPhase = Math.random() * Math.PI * 2

  function computeMetaFromWorld() {
    metaPos.copy(pos).multiplyScalar(settings.field.metaMapMul).add(metaOffset)
  }

  return {
    rigid,
    color,
    strength,
    subtract,

    updatePhysics(timeS: number) {
      readRapierVec3To(pos, rigid.translation() as any)
      readRapierVec3To(vel, rigid.linvel() as any)
      readRapierVec3To(ang, rigid.angvel() as any)

      rigid.resetForces(true)

      dir.copy(pos).sub(sceneMiddle)
      const dist = dir.length() + 1e-4
      dir.multiplyScalar(1 / dist)

      const pull = basePull + Math.min(dist * boostMul, boostCap)
      rigid.addForce({ x: -dir.x * pull, y: -dir.y * pull, z: -dir.z * pull }, true)

      const rangeRadius = Math.max(0.1, settings.bodies.range * 0.5)
      const dist01 = clamp(dist / rangeRadius, 0, 1)

      const flowStrength = settings.bodies.flowStrength * flowMul
      if (flowStrength > 0) {
        const t = timeS * settings.bodies.flowSpeed
        const spatial = settings.bodies.flowSpatial
        flow.set(
          Math.sin(t + flowSeed.x + pos.y * spatial),
          Math.sin(t + flowSeed.y + pos.z * spatial),
          Math.sin(t + flowSeed.z + pos.x * spatial),
        )
        rigid.addForce({ x: flow.x * flowStrength, y: flow.y * flowStrength, z: flow.z * flowStrength }, true)
      }

      const swirlStrength = settings.bodies.swirlStrength * swirlMul
      if (swirlStrength > 0) {
        swirl.copy(dir).cross(swirlAxis)
        const len = Math.sqrt(swirl.lengthSq()) + 1e-4
        swirl.multiplyScalar(1 / len)

        const mod = 0.55 + 0.45 * Math.sin(timeS * settings.bodies.swirlSpeed + swirlPhase)
        const s = swirlStrength * mod * (0.25 + 0.75 * dist01)
        rigid.addForce({ x: swirl.x * s, y: swirl.y * s, z: swirl.z * s }, true)
      }

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
  world.timestep = 1 / 60

  for (let i = 0; i < settings.bodies.count; i++)
    bodies.push(createBody(rapier!, world))

  mouseBall = createMouseBall(rapier!, world)

  mouseTarget.set(0, 0, settings.mouse.parkZ)
  mousePos.set(0, 0, settings.mouse.parkZ)

  requestRender()
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

function stepSimulation({ delta, timestamp }: { delta: number, timestamp: number }) {
  if (!world || !metaballs.value)
    return

  applyFieldSettings()
  applyMaterialSettings()
  handleRaycast()

  mousePos.lerp(mouseTarget, settings.mouse.lerp)
  mouseBall?.update(mousePos)

  world.timestep = clamp(delta / 1000, 1 / 120, 1 / 30)
  world.step()

  const timeS = timestamp / 1000
  bodies.forEach(b => b.updatePhysics(timeS))

  metaballs.value.reset()
  bodies.forEach((b) => {
    const p = b.getMetaPos()
    metaballs.value?.addBall(p.x, p.y, p.z, b.strength, b.subtract, b.color)
  })
  metaballs.value.update()
  requestRender()
}

const { pause, resume } = useRafFn(stepSimulation, { immediate: false })

watch(isVisible, (active) => {
  if (active)
    resume()
  else
    pause()
}, { immediate: true })

if (import.meta.client) {
  useEventListener(window, 'pointermove', updatePointerFromEvent, { passive: true })
  useEventListener(window, 'pointerdown', updatePointerFromEvent, { passive: true })

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

  const target = event.target
  if (target instanceof Element && target.closest('[data-liquid-ui]')) {
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

const isApplyingPreset = ref(false)

let physicsRebuildPending = false
let physicsRebuildRunning = false

async function queuePhysicsRebuild() {
  physicsRebuildPending = true
  if (physicsRebuildRunning)
    return

  physicsRebuildRunning = true
  try {
    while (physicsRebuildPending) {
      physicsRebuildPending = false
      await rebuildPhysics()
    }
  }
  finally {
    physicsRebuildRunning = false
  }
}

const schedulePhysicsRebuild = useDebounceFn(() => {
  void queuePhysicsRebuild()
}, 150)

let marchingRebuildPending = false
let marchingRebuildRunning = false

async function queueMarchingRebuild() {
  marchingRebuildPending = true
  if (marchingRebuildRunning)
    return

  marchingRebuildRunning = true
  try {
    while (marchingRebuildPending) {
      marchingRebuildPending = false
      await rebuildMarching()
    }
  }
  finally {
    marchingRebuildRunning = false
  }
}

const scheduleMarchingRebuild = useDebounceFn(() => {
  void queueMarchingRebuild()
}, 200)

type GlassPresetName = 'enhanced' | 'reference'

function createReferencePreset(): GlassMetaballsSettings {
  const preset = createDefaultSettings()

  preset.perf.marchingResolution = 96
  preset.field.scale = 5
  preset.field.isolation = 1000

  preset.bodies.sizeMin = 0.2
  preset.bodies.sizeMax = 0.2
  preset.bodies.sizePow = 1
  preset.bodies.densityMin = 0.5
  preset.bodies.densityMax = 0.5
  preset.bodies.linDampMin = 0
  preset.bodies.linDampMax = 0
  preset.bodies.angDampMin = 0
  preset.bodies.angDampMax = 0
  preset.bodies.restitution = 0
  preset.bodies.friction = 0.5
  preset.bodies.pullBaseMin = 0.5
  preset.bodies.pullBaseMax = 0.5
  preset.bodies.pullBoostMulMin = 0
  preset.bodies.pullBoostMulMax = 0
  preset.bodies.pullBoostCapMin = 0
  preset.bodies.pullBoostCapMax = 0
  preset.bodies.maxSpeedMin = 100
  preset.bodies.maxSpeedMax = 100
  preset.bodies.maxAngMin = 100
  preset.bodies.maxAngMax = 100
  preset.bodies.flowStrength = 0
  preset.bodies.swirlStrength = 0
  preset.bodies.strengthBase = 0.5
  preset.bodies.strengthSizeMul = 0
  preset.bodies.strengthRand = 0
  preset.bodies.subtractBase = 10
  preset.bodies.subtractInvSizeMul = 0
  preset.bodies.subtractRand = 0

  preset.mouse.radius = 0.25
  preset.mouse.colliderMul = 6

  return preset
}

const presets: Record<GlassPresetName, GlassMetaballsSettings> = {
  enhanced: createDefaultSettings(),
  reference: createReferencePreset(),
}

const presetName = ref<GlassPresetName>('enhanced')

async function applyPreset(name: GlassPresetName) {
  isApplyingPreset.value = true
  try {
    presetName.value = name
    applySettingsPreset(presets[name])
  }
  finally {
    isApplyingPreset.value = false
  }

  await queueMarchingRebuild()
  await queuePhysicsRebuild()
}

const settingsJson = computed(() => JSON.stringify({
  perf: { ...settings.perf },
  field: { ...settings.field },
  material: { ...settings.material },
  bodies: { ...settings.bodies },
  mouse: { ...settings.mouse },
}, null, 2))

async function copySettingsJson() {
  try {
    await navigator.clipboard.writeText(settingsJson.value)
  }
  catch {
    // no-op: clipboard can be denied by browser permissions
  }
}

watch(
  () => [
    settings.field.scale,
    settings.field.isolation,
    settings.field.metaMapMul,
    settings.field.offsetX,
    settings.field.offsetY,
    settings.field.offsetZ,
  ],
  () => {
    applyFieldSettings()
    requestRender()
  },
  { immediate: true },
)

watch(
  () => [
    settings.material.transmission,
    settings.material.thickness,
    settings.material.ior,
    settings.material.roughness,
    settings.material.metalness,
    settings.material.envMapIntensity,
    settings.material.clearcoat,
    settings.material.clearcoatRoughness,
  ],
  () => {
    applyMaterialSettings()
    requestRender()
  },
  { immediate: true },
)

watch(
  () => [
    settings.bodies.count,
    settings.bodies.range,
    settings.bodies.spawnYBias,
    settings.bodies.sizeMin,
    settings.bodies.sizeMax,
    settings.bodies.sizePow,
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
    settings.bodies.strengthBase,
    settings.bodies.strengthSizeMul,
    settings.bodies.strengthRand,
    settings.bodies.subtractBase,
    settings.bodies.subtractInvSizeMul,
    settings.bodies.subtractRand,
    settings.mouse.radius,
    settings.mouse.colliderMul,
    settings.mouse.parkZ,
  ],
  () => {
    if (isApplyingPreset.value)
      return
    schedulePhysicsRebuild()
  },
)

watch(
  () => [
    settings.perf.marchingResolution,
    settings.perf.marchingMaxPoly,
  ],
  () => {
    if (isApplyingPreset.value)
      return
    scheduleMarchingRebuild()
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
        :render-mode="renderMode"
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
        data-lenis-prevent
        data-liquid-ui
        class="border-white/10 text-white/90 absolute bottom-3 right-3 z-50 max-h-[70vh] w-[360px] overflow-auto border rounded-2xl bg-[#080a10]/70 p-3 backdrop-blur"
      >
        <div class="mb-2 flex items-start justify-between gap-3">
          <div class="min-w-0">
            <div class="text-sm font-semibold">
              Liquid Settings
            </div>
            <div class="mt-0.5 text-[10px] opacity-60">
              Debounced rebuilds • Pointer ignored over panel
            </div>
          </div>
          <div class="flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              class="border-white/10 bg-white/5 hover:bg-white/10 border rounded-xl px-2 py-1 text-[11px]"
              @click="copySettingsJson()"
            >
              Copy
            </button>
            <button
              type="button"
              class="border-white/10 bg-white/5 hover:bg-white/10 border rounded-xl px-2 py-1 text-[11px]"
              @click="applyPreset('enhanced')"
            >
              Reset
            </button>
            <button
              type="button"
              class="border-white/10 bg-white/5 hover:bg-white/10 border rounded-xl px-2 py-1 text-[11px]"
              @click="settings.uiOpen = false"
            >
              Close
            </button>
          </div>
        </div>

        <div class="mb-2 flex items-center gap-2">
          <div class="w-12 shrink-0 text-[10px] opacity-70">
            Preset
          </div>
          <select
            v-model="presetName"
            class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs"
          >
            <option value="enhanced">
              Enhanced
            </option>
            <option value="reference">
              Reference (bobbyroe)
            </option>
          </select>
          <button
            type="button"
            class="border-white/10 bg-white/5 hover:bg-white/10 shrink-0 border rounded-lg px-2 py-1 text-xs"
            @click="applyPreset(presetName)"
          >
            Apply
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

        <details open class="border-white/10 bg-white/5 border rounded-xl p-2">
          <summary class="cursor-pointer select-none text-xs font-semibold opacity-90">
            Material
          </summary>

          <div class="mt-2 space-y-3">
            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>Transmission</span><span>{{ settings.material.transmission.toFixed(2) }}</span>
              </div>
              <input v-model.number="settings.material.transmission" type="range" min="0.5" max="1" step="0.01" class="w-full">
            </div>

            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>IOR</span><span>{{ settings.material.ior.toFixed(2) }}</span>
              </div>
              <input v-model.number="settings.material.ior" type="range" min="1.0" max="2.2" step="0.01" class="w-full">
            </div>

            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>Thickness</span><span>{{ settings.material.thickness.toFixed(2) }}</span>
              </div>
              <input v-model.number="settings.material.thickness" type="range" min="0.2" max="5" step="0.05" class="w-full">
            </div>

            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>Roughness</span><span>{{ settings.material.roughness.toFixed(2) }}</span>
              </div>
              <input v-model.number="settings.material.roughness" type="range" min="0" max="0.35" step="0.01" class="w-full">
            </div>

            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>Env intensity</span><span>{{ settings.material.envMapIntensity.toFixed(2) }}</span>
              </div>
              <input v-model.number="settings.material.envMapIntensity" type="range" min="0" max="3" step="0.05" class="w-full">
            </div>

            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>Clearcoat</span><span>{{ settings.material.clearcoat.toFixed(2) }}</span>
              </div>
              <input v-model.number="settings.material.clearcoat" type="range" min="0" max="1" step="0.01" class="w-full">
            </div>
          </div>
        </details>

        <div class="h-2" />

        <details class="border-white/10 bg-white/5 border rounded-xl p-2">
          <summary class="cursor-pointer select-none text-xs font-semibold opacity-90">
            Bodies
          </summary>

          <div class="mt-2 space-y-3">
            <div>
              <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                <span>Count</span><span>{{ settings.bodies.count }}</span>
              </div>
              <input v-model.number="settings.bodies.count" type="range" min="10" max="90" step="1" class="w-full">
            </div>

            <details open class="border-white/10 bg-black/20 border rounded-xl p-2">
              <summary class="cursor-pointer select-none text-[11px] font-semibold opacity-90">
                Spawn + size (rebuild)
              </summary>

              <div class="mt-2 space-y-3">
                <div class="grid grid-cols-2 gap-2">
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Range</div>
                    <input v-model.number="settings.bodies.range" type="number" step="0.25" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Spawn Y bias</div>
                    <input v-model.number="settings.bodies.spawnYBias" type="number" step="0.25" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
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

                <div>
                  <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                    <span>Size bias</span><span>{{ settings.bodies.sizePow.toFixed(2) }}</span>
                  </div>
                  <input v-model.number="settings.bodies.sizePow" type="range" min="0.6" max="3.5" step="0.05" class="w-full">
                  <div class="mt-1 text-[10px] opacity-60">
                    &gt; 1 skews smaller shards
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-2">
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Density min</div>
                    <input v-model.number="settings.bodies.densityMin" type="number" step="0.05" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Density max</div>
                    <input v-model.number="settings.bodies.densityMax" type="number" step="0.05" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                </div>
              </div>
            </details>

            <details class="border-white/10 bg-black/20 border rounded-xl p-2">
              <summary class="cursor-pointer select-none text-[11px] font-semibold opacity-90">
                Dynamics (rebuild)
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
                  <input v-model.number="settings.bodies.friction" type="range" min="0.1" max="1.8" step="0.01" class="w-full">
                </div>

                <div class="grid grid-cols-2 gap-2">
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Lin damp min</div>
                    <input v-model.number="settings.bodies.linDampMin" type="number" step="0.05" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Lin damp max</div>
                    <input v-model.number="settings.bodies.linDampMax" type="number" step="0.05" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                </div>

                <div class="grid grid-cols-2 gap-2">
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Ang damp min</div>
                    <input v-model.number="settings.bodies.angDampMin" type="number" step="0.05" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Ang damp max</div>
                    <input v-model.number="settings.bodies.angDampMax" type="number" step="0.05" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                </div>

                <div class="grid grid-cols-2 gap-2">
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Max speed min</div>
                    <input v-model.number="settings.bodies.maxSpeedMin" type="number" step="0.5" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Max speed max</div>
                    <input v-model.number="settings.bodies.maxSpeedMax" type="number" step="0.5" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                </div>

                <div class="grid grid-cols-2 gap-2">
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Max ang min</div>
                    <input v-model.number="settings.bodies.maxAngMin" type="number" step="0.5" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Max ang max</div>
                    <input v-model.number="settings.bodies.maxAngMax" type="number" step="0.5" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                </div>
              </div>
            </details>

            <details class="border-white/10 bg-black/20 border rounded-xl p-2">
              <summary class="cursor-pointer select-none text-[11px] font-semibold opacity-90">
                Forces
              </summary>

              <div class="mt-2 space-y-3">
                <div class="grid grid-cols-2 gap-2">
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Pull base min</div>
                    <input v-model.number="settings.bodies.pullBaseMin" type="number" step="0.02" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Pull base max</div>
                    <input v-model.number="settings.bodies.pullBaseMax" type="number" step="0.02" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                </div>

                <div class="grid grid-cols-2 gap-2">
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Boost mul min</div>
                    <input v-model.number="settings.bodies.pullBoostMulMin" type="number" step="0.01" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Boost mul max</div>
                    <input v-model.number="settings.bodies.pullBoostMulMax" type="number" step="0.01" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                </div>

                <div class="grid grid-cols-2 gap-2">
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Boost cap min</div>
                    <input v-model.number="settings.bodies.pullBoostCapMin" type="number" step="0.05" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Boost cap max</div>
                    <input v-model.number="settings.bodies.pullBoostCapMax" type="number" step="0.05" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                </div>

                <div>
                  <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                    <span>Flow strength</span><span>{{ settings.bodies.flowStrength.toFixed(2) }}</span>
                  </div>
                  <input v-model.number="settings.bodies.flowStrength" type="range" min="0" max="0.6" step="0.01" class="w-full">
                </div>

                <div>
                  <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                    <span>Flow speed</span><span>{{ settings.bodies.flowSpeed.toFixed(2) }}</span>
                  </div>
                  <input v-model.number="settings.bodies.flowSpeed" type="range" min="0" max="3" step="0.05" class="w-full">
                </div>

                <div>
                  <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                    <span>Flow spatial</span><span>{{ settings.bodies.flowSpatial.toFixed(2) }}</span>
                  </div>
                  <input v-model.number="settings.bodies.flowSpatial" type="range" min="0" max="2.5" step="0.05" class="w-full">
                </div>

                <div>
                  <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                    <span>Swirl strength</span><span>{{ settings.bodies.swirlStrength.toFixed(2) }}</span>
                  </div>
                  <input v-model.number="settings.bodies.swirlStrength" type="range" min="0" max="0.6" step="0.01" class="w-full">
                </div>

                <div>
                  <div class="mb-1 flex items-center justify-between text-[11px] opacity-80">
                    <span>Swirl speed</span><span>{{ settings.bodies.swirlSpeed.toFixed(2) }}</span>
                  </div>
                  <input v-model.number="settings.bodies.swirlSpeed" type="range" min="0" max="3" step="0.05" class="w-full">
                </div>
              </div>
            </details>

            <details class="border-white/10 bg-black/20 border rounded-xl p-2">
              <summary class="cursor-pointer select-none text-[11px] font-semibold opacity-90">
                Metaballs (rebuild)
              </summary>

              <div class="mt-2 space-y-3">
                <div class="grid grid-cols-3 gap-2">
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Strength base</div>
                    <input v-model.number="settings.bodies.strengthBase" type="number" step="0.01" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Size mul</div>
                    <input v-model.number="settings.bodies.strengthSizeMul" type="number" step="0.05" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Rand</div>
                    <input v-model.number="settings.bodies.strengthRand" type="number" step="0.01" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                </div>

                <div class="grid grid-cols-3 gap-2">
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Subtract base</div>
                    <input v-model.number="settings.bodies.subtractBase" type="number" step="0.2" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Inv size mul</div>
                    <input v-model.number="settings.bodies.subtractInvSizeMul" type="number" step="0.5" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                  <label class="space-y-1">
                    <div class="text-[10px] opacity-70">Rand</div>
                    <input v-model.number="settings.bodies.subtractRand" type="number" step="0.2" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
                  </label>
                </div>
              </div>
            </details>

            <button
              type="button"
              class="border-white/10 bg-white/5 hover:bg-white/10 w-full border rounded-xl px-3 py-2 text-xs"
              @click="queuePhysicsRebuild()"
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
                <span>Radius</span><span>{{ settings.mouse.radius.toFixed(2) }}</span>
              </div>
              <input v-model.number="settings.mouse.radius" type="range" min="0.05" max="0.6" step="0.01" class="w-full">
              <div class="mt-1 text-[10px] opacity-60">
                Rebuilds mouse collider
              </div>
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

            <label class="space-y-1">
              <div class="text-[10px] opacity-70">Park Z (rebuild)</div>
              <input v-model.number="settings.mouse.parkZ" type="number" step="1" class="border-white/10 bg-black/30 w-full border rounded-lg px-2 py-1 text-xs">
            </label>
          </div>
        </details>

        <div class="mt-3 text-[10px] opacity-60">
          Tip: values marked “rebuild” recreate bodies/colliders (slightly heavier).
        </div>
      </div>

      <button
        v-else
        type="button"
        data-liquid-ui
        class="border-white/10 bg-white/5 text-white/90 hover:bg-white/10 absolute bottom-3 right-3 z-50 border rounded-2xl px-3 py-2 text-xs backdrop-blur"
        @click="settings.uiOpen = true"
      >
        Settings
      </button>
    </ClientOnly>
  </div>
</template>
