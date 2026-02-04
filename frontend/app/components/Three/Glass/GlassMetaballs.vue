<script setup lang="ts">
import type { TresContext } from '@tresjs/core'
import type { Intersection, PerspectiveCamera, Scene, Texture, WebGLRenderer } from 'three'
import type { GlassMetaballsSettings, GlassPresetName } from './GlassMetaballs.model'
import { TresCanvas } from '@tresjs/core'
import {
  useDebounceFn,
  useDevicePixelRatio,
  useDocumentVisibility,
  useElementVisibility,
  useEventListener,
  useRafFn,
} from '@vueuse/core'
import { consola } from 'consola'
import {
  ACESFilmicToneMapping,
  BackSide,
  BoxGeometry,
  Color,
  EquirectangularReflectionMapping,
  Matrix3,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PlaneGeometry,
  PMREMGenerator,
  Raycaster,
  ShaderLib,
  ShaderMaterial,
  SRGBColorSpace,
  TextureLoader,
  WebGLRenderer as ThreeWebGLRenderer,
  UniformsUtils,
  Vector2,
  Vector3,
} from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js'

import { createDefaultGlassMetaballsSettings, glassMetaballsPresets } from './GlassMetaballs.model'
import GlassMetaballsControls from './GlassMetaballsControls.vue'

type RapierModule = typeof import('@dimforge/rapier3d-compat')
type RapierWorld = import('@dimforge/rapier3d-compat').World
type RapierRigidBody = import('@dimforge/rapier3d-compat').RigidBody

const props = withDefaults(defineProps<{
  /**
   * - absolute: render controls in the component box (default)
   * - fixed: teleport controls to body (useful for full-screen background usage)
   * - none: hide the built-in settings UI
   */
  controlsMode?: 'absolute' | 'fixed' | 'none'
  /**
   * External visibility gate (e.g. from page intersection observers).
   */
  active?: boolean
  /**
   * When false, render but keep the material invisible.
   */
  revealActive?: boolean
}>(), {
  controlsMode: 'absolute',
  active: true,
  revealActive: true,
})

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

interface MaterialBase {
  transmission: number
  thickness: number
  ior: number
  roughness: number
  metalness: number
  envMapIntensity: number
  clearcoat: number
  clearcoatRoughness: number
}

type RenderMode = 'always' | 'on-demand'

const container = ref<HTMLElement | null>(null)
const cameraRef = shallowRef<PerspectiveCamera | null>(null)
const sceneRef = shallowRef<Scene | null>(null)
const rendererRef = shallowRef<WebGLRenderer | null>(null)
const rendererLoop = shallowRef<{ start: () => void, stop: () => void } | null>(null)
const environmentMap = shallowRef<Texture | null>(null)
const invalidateFrame = shallowRef<null | (() => void)>(null)

const metaballs = shallowRef<MarchingCubes | null>(null)
const metaMaterial = shallowRef<MeshPhysicalMaterial | null>(null)
const mousePlane = shallowRef<Mesh | null>(null)
const materialReveal = ref(0)

const MATERIAL_REVEAL_IN_MS = 700
const MATERIAL_REVEAL_OUT_MS = 350

const stableWidth = ref(0)
const stableHeight = ref(0)
const lastWindowWidth = ref(0)
const stableSizeStyle = computed(() => {
  if (!stableWidth.value || !stableHeight.value)
    return undefined

  return {
    width: `${stableWidth.value}px`,
    height: `${stableHeight.value}px`,
  }
})

function setStableSize(nextW: number, nextH: number) {
  if (!nextW || !nextH)
    return

  stableWidth.value = nextW
  stableHeight.value = nextH
  lastWindowWidth.value = window.innerWidth
}

function updateStableSize() {
  if (!import.meta.client)
    return

  const rect = container.value?.getBoundingClientRect()
  const nextW = rect?.width || window.innerWidth
  const nextH = rect?.height || window.innerHeight
  setStableSize(nextW, nextH)
}

const aspectRatio = computed(() => {
  const w = stableWidth.value
  const h = stableHeight.value
  return h ? w / h : 1
})
const { pixelRatio } = useDevicePixelRatio()

/**
 * Settings
 * - grouped by: Perf / Field / Bodies / Mouse
 * - anything that changes body/collider creation triggers rebuildPhysics()
 */
const settings = reactive<GlassMetaballsSettings>(createDefaultGlassMetaballsSettings())
const settingsModel = shallowRef(settings)

const dpr = computed(() => Math.min(pixelRatio.value || 1, settings.perf.dprMax))

const documentVisibility = useDocumentVisibility()
const elementVisible = useElementVisibility(container)
const isVisible = computed(() => elementVisible.value && documentVisibility.value === 'visible')
const isActive = computed(() => isVisible.value && props.active)
const renderMode = computed<RenderMode>(() => (isActive.value ? 'always' : 'on-demand'))

const raycaster = new Raycaster()
const pointerPos = new Vector2(0, 0)
const raycastHits: Intersection[] = []

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
const shouldRaycast = ref(false)

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

function requestRender() {
  if (!isActive.value || renderMode.value === 'always')
    return
  invalidateFrame.value?.()
}

function applySettingsPreset(preset: GlassMetaballsSettings) {
  Object.assign(settings.perf, preset.perf)
  Object.assign(settings.environment, preset.environment)
  Object.assign(settings.field, preset.field)
  Object.assign(settings.material, preset.material)
  Object.assign(settings.bodies, preset.bodies)
  Object.assign(settings.mouse, preset.mouse)
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
  rendererLoop.value = ctx.renderer.loop
  sceneRef.value = scene
  invalidateFrame.value = (ctx as any)?.invalidate || (ctx as any)?.renderer?.invalidate || null

  if (!rendererRef.value || !sceneRef.value)
    return

  const rAny = rendererRef.value as any
  if ('toneMapping' in rAny)
    rAny.toneMapping = ACESFilmicToneMapping
  if ('outputColorSpace' in rAny)
    rAny.outputColorSpace = SRGBColorSpace
  if ('setClearColor' in rAny)
    rAny.setClearColor(0x000000, 0)

  sceneRef.value.background = null

  void applyEnvironmentSettings()

  requestRender()

  if (!isVisible.value)
    rendererLoop.value.stop()
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

  if (sceneRef.value)
    sceneRef.value.environmentIntensity = settings.material.envMapIntensity

  setMaterialBase(material)
  applyMaterialReveal(material)
}

function setMaterialBase(material: MeshPhysicalMaterial) {
  const base = (material.userData.baseMaterial ??= {} as MaterialBase) as MaterialBase
  base.transmission = settings.material.transmission
  base.thickness = settings.material.thickness
  base.ior = settings.material.ior
  base.roughness = settings.material.roughness
  base.metalness = settings.material.metalness
  base.envMapIntensity = settings.material.envMapIntensity
  base.clearcoat = settings.material.clearcoat
  base.clearcoatRoughness = settings.material.clearcoatRoughness
}

function applyMaterialReveal(material: MeshPhysicalMaterial) {
  const base = material.userData.baseMaterial as MaterialBase | undefined
  if (!base)
    return

  const reveal = materialReveal.value
  material.transmission = base.transmission * reveal
  material.thickness = base.thickness * reveal
  material.ior = base.ior
  material.roughness = base.roughness
  material.metalness = base.metalness
  material.envMapIntensity = base.envMapIntensity * reveal
  material.clearcoat = base.clearcoat * reveal
  material.clearcoatRoughness = base.clearcoatRoughness
  material.opacity = reveal
}

const environmentBackground = shallowRef<Texture | null>(null)
const transmissionBackdrop = shallowRef<Mesh | null>(null)
const transmissionBackdropMaterial = shallowRef<ShaderMaterial | null>(null)
const envStatus = reactive<{ loading: boolean, error: string | null }>({
  loading: false,
  error: null,
})

let envApplyToken = 0

function resolveEnvironmentUrl(input: string) {
  const value = input.trim()
  if (!value)
    return null

  if (value.startsWith('http://') || value.startsWith('https://'))
    return value

  return value.startsWith('/') ? value : `/${value}`
}

function applyBackgroundTexture(texture: Texture | null) {
  if (!sceneRef.value)
    return

  if (!texture) {
    environmentBackground.value?.dispose()
    environmentBackground.value = null
    sceneRef.value.background = null
    return
  }

  environmentBackground.value?.dispose()
  environmentBackground.value = texture
  sceneRef.value.background = texture
}

function disposeTransmissionBackdrop() {
  const mesh = transmissionBackdrop.value
  if (!mesh)
    return

  if (sceneRef.value)
    sceneRef.value.remove(mesh)

  mesh.geometry.dispose()
  if (mesh.material instanceof ShaderMaterial)
    mesh.material.dispose()

  transmissionBackdrop.value = null
  transmissionBackdropMaterial.value = null
}

function ensureTransmissionBackdrop() {
  if (!sceneRef.value)
    return

  if (transmissionBackdrop.value)
    return

  const uniforms = UniformsUtils.clone(ShaderLib.backgroundCube!.uniforms)
  uniforms.envMap!.value = environmentMap.value
  uniforms.flipEnvMap!.value = 1
  uniforms.backgroundBlurriness!.value = settings.environment.backgroundBlurriness
  uniforms.backgroundIntensity!.value = settings.environment.backgroundIntensity
  uniforms.backgroundRotation!.value = new Matrix3()

  const material = new ShaderMaterial({
    name: 'TransmissionBackdropMaterial',
    uniforms,
    vertexShader: ShaderLib.backgroundCube!.vertexShader,
    fragmentShader: ShaderLib.backgroundCube!.fragmentShader,
    side: BackSide,
    depthTest: false,
    depthWrite: false,
    fog: false,
    allowOverride: false,
  })

  // Add "envMap" material property so the renderer can evaluate it like for built-in materials.
  Object.defineProperty(material, 'envMap', {
    get() {
      return this.uniforms.envMap.value
    },
  })

  const geometry = new BoxGeometry(1, 1, 1)
  geometry.deleteAttribute('normal')
  geometry.deleteAttribute('uv')

  const mesh = new Mesh(geometry, material)
  mesh.frustumCulled = false
  mesh.renderOrder = -999
  mesh.layers.enableAll()
  mesh.onBeforeRender = (renderer, _scene, camera) => {
    mesh.matrixWorld.copyPosition(camera.matrixWorld)
    material.colorWrite = renderer.getRenderTarget() !== null
  }

  transmissionBackdrop.value = mesh
  transmissionBackdropMaterial.value = material
  sceneRef.value.add(mesh)
}

function syncTransmissionBackdrop() {
  if (!settings.environment.useAsBackdrop) {
    disposeTransmissionBackdrop()
    return
  }

  ensureTransmissionBackdrop()

  const material = transmissionBackdropMaterial.value
  if (!material)
    return

  if (material.uniforms.envMap.value !== environmentMap.value) {
    material.uniforms.envMap.value = environmentMap.value
    material.needsUpdate = true
  }

  material.uniforms.backgroundBlurriness.value = settings.environment.backgroundBlurriness
  material.uniforms.backgroundIntensity.value = settings.environment.backgroundIntensity
}

function applyBackgroundSceneSettings() {
  syncTransmissionBackdrop()
  if (!sceneRef.value)
    return

  sceneRef.value.backgroundBlurriness = settings.environment.backgroundBlurriness
  sceneRef.value.backgroundIntensity = settings.environment.backgroundIntensity
}

function setRoomEnvironment(renderer: ThreeWebGLRenderer) {
  const pmrem = new PMREMGenerator(renderer)
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  pmrem.dispose()

  return envTexture
}

async function loadImageEnvironment(renderer: ThreeWebGLRenderer, url: string, useAsBackground: boolean) {
  const loader = new TextureLoader()
  loader.setCrossOrigin('anonymous')

  const sourceTexture = await new Promise<Texture>((resolve, reject) => {
    loader.load(url, resolve, undefined, reject)
  })

  sourceTexture.mapping = EquirectangularReflectionMapping
  sourceTexture.colorSpace = SRGBColorSpace

  const pmrem = new PMREMGenerator(renderer)
  const envTexture = pmrem.fromEquirectangular(sourceTexture).texture
  pmrem.dispose()

  if (!useAsBackground)
    sourceTexture.dispose()

  return {
    envTexture,
    backgroundTexture: useAsBackground ? sourceTexture : null,
  }
}

async function applyEnvironmentSettings() {
  if (!import.meta.client)
    return

  const renderer = rendererRef.value
  if (!(renderer instanceof ThreeWebGLRenderer))
    return

  const token = ++envApplyToken
  envStatus.loading = true
  envStatus.error = null

  try {
    if (settings.environment.mode === 'room') {
      const envTexture = setRoomEnvironment(renderer)
      if (token !== envApplyToken) {
        envTexture.dispose()
        return
      }

      const previousEnvironment = environmentMap.value
      environmentMap.value = envTexture

      if (sceneRef.value)
        sceneRef.value.environment = envTexture

      applyBackgroundTexture(null)
      syncTransmissionBackdrop()
      previousEnvironment?.dispose()
    }
    else {
      const url = resolveEnvironmentUrl(settings.environment.url)
      if (!url)
        throw new Error('No environment URL/path set')

      const useAsBackground = settings.environment.useAsBackground
      const { envTexture, backgroundTexture } = await loadImageEnvironment(renderer, url, useAsBackground)
      if (token !== envApplyToken) {
        envTexture.dispose()
        backgroundTexture?.dispose()
        return
      }

      const previousEnvironment = environmentMap.value
      environmentMap.value = envTexture

      if (sceneRef.value)
        sceneRef.value.environment = envTexture

      syncTransmissionBackdrop()
      previousEnvironment?.dispose()
      applyBackgroundTexture(backgroundTexture)
    }
  }
  catch (error) {
    if (token !== envApplyToken)
      return

    envStatus.error = error instanceof Error ? error.message : String(error)
    const envTexture = setRoomEnvironment(renderer)
    if (token !== envApplyToken) {
      envTexture.dispose()
      return
    }

    const previousEnvironment = environmentMap.value
    environmentMap.value = envTexture

    if (sceneRef.value)
      sceneRef.value.environment = envTexture

    syncTransmissionBackdrop()
    applyBackgroundTexture(null)
    previousEnvironment?.dispose()
  }
  finally {
    if (token === envApplyToken)
      envStatus.loading = false
  }

  applyBackgroundSceneSettings()
  requestRender()
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
  setMaterialBase(material)
  applyMaterialReveal(material)
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
    shouldRaycast.value = false
    return
  }

  if (!shouldRaycast.value)
    return

  shouldRaycast.value = false

  cameraRef.value.getWorldDirection(cameraDirection)
  cameraDirection.multiplyScalar(-1)
  mousePlane.value.lookAt(cameraDirection)
  mousePlane.value.updateMatrixWorld()

  raycaster.setFromCamera(pointerPos, cameraRef.value)
  raycastHits.length = 0
  raycaster.intersectObject(mousePlane.value, false, raycastHits)
  if (raycastHits.length > 0)
    mouseTarget.copy(raycastHits[0].point)
}

function updateMaterialReveal(deltaMs: number) {
  const material = metaMaterial.value
  if (!material)
    return

  const target = props.revealActive ? 1 : 0
  const duration = target > materialReveal.value ? MATERIAL_REVEAL_IN_MS : MATERIAL_REVEAL_OUT_MS
  const t = duration > 0 ? 1 - Math.exp(-deltaMs / duration) : 1
  materialReveal.value += (target - materialReveal.value) * t
  applyMaterialReveal(material)
}

function stepSimulation({ delta, timestamp }: { delta: number, timestamp: number }) {
  if (!world || !metaballs.value)
    return

  updateMaterialReveal(delta)
  handleRaycast()

  mousePos.lerp(mouseTarget, settings.mouse.lerp)
  mouseBall?.update(mousePos)

  world.timestep = clamp(delta / 1000, 1 / 120, 1 / 30)
  world.step()

  const timeS = timestamp / 1000
  for (let i = 0; i < bodies.length; i++)
    bodies[i].updatePhysics(timeS)

  metaballs.value.reset()
  for (let i = 0; i < bodies.length; i++) {
    const b = bodies[i]
    const p = b.getMetaPos()
    metaballs.value.addBall(p.x, p.y, p.z, b.strength, b.subtract, b.color)
  }
  metaballs.value.update()
  requestRender()
}

const { pause, resume } = useRafFn(stepSimulation, { immediate: false })

watch(isActive, (active) => {
  if (active)
    resume()
  else
    pause()

  if (rendererLoop.value) {
    if (active)
      rendererLoop.value.start()
    else
      rendererLoop.value.stop()
  }

  if (!active) {
    pointerInside.value = false
    pointerActive.value = false
    shouldRaycast.value = false
    mouseTarget.set(0, 0, settings.mouse.parkZ)
  }
}, { immediate: true })

if (import.meta.client) {
  const logState = useDebounceFn((label: string) => {
    consola.info(`[GlassMetaballs] ${label}`, {
      active: isActive.value,
      visible: isVisible.value,
      docVisible: documentVisibility.value,
      renderMode: renderMode.value,
    })
  }, 60)

  watch(isVisible, (visible) => {
    logState(`visibility ${visible ? 'entered' : 'left'}`)
  }, { immediate: true })

  watch(isActive, (active) => {
    logState(`active ${active ? 'resumed' : 'paused'}`)
  }, { immediate: true })

  watch(documentVisibility, (state) => {
    logState(`document ${state}`)
  }, { immediate: true })
}

watch(
  () => props.revealActive,
  (active) => {
    if (!active) {
      materialReveal.value = 0
      if (metaMaterial.value)
        applyMaterialReveal(metaMaterial.value)
    }
  },
  { immediate: true },
)

if (import.meta.client) {
  useEventListener(window, 'pointermove', updatePointerFromEvent, { passive: true })
  useEventListener(window, 'pointerdown', updatePointerFromEvent, { passive: true })
}

function updatePointerFromEvent(event: PointerEvent) {
  if (!isActive.value)
    return

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
    shouldRaycast.value = false
    mouseTarget.set(0, 0, settings.mouse.parkZ)
    return
  }

  const target = event.target
  if (target instanceof Element && target.closest('[data-liquid-ui]')) {
    pointerActive.value = false
    shouldRaycast.value = false
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
  shouldRaycast.value = active

  if (!active) {
    shouldRaycast.value = false
    mouseTarget.set(0, 0, settings.mouse.parkZ)
  }
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

const presetName = ref<GlassPresetName>('enhanced')

async function applyPreset(name: GlassPresetName) {
  isApplyingPreset.value = true
  try {
    presetName.value = name
    applySettingsPreset(glassMetaballsPresets[name])
  }
  finally {
    isApplyingPreset.value = false
  }

  await applyEnvironmentSettings()
  await queueMarchingRebuild()
  await queuePhysicsRebuild()
}

const settingsJson = computed(() => JSON.stringify({
  perf: { ...settings.perf },
  environment: { ...settings.environment },
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
    settings.environment.mode,
    settings.environment.url,
    settings.environment.useAsBackground,
    settings.environment.useAsBackdrop,
  ],
  useDebounceFn(() => {
    void applyEnvironmentSettings()
  }, 300),
)

watch(
  () => settings.environment.useAsBackdrop,
  (enabled) => {
    if (enabled)
      settings.environment.useAsBackground = false
    syncTransmissionBackdrop()
    requestRender()
  },
)

watch(
  () => settings.environment.useAsBackground,
  (enabled) => {
    if (enabled)
      settings.environment.useAsBackdrop = false
  },
)

watch(
  () => [
    settings.environment.backgroundBlurriness,
    settings.environment.backgroundIntensity,
  ],
  () => {
    applyBackgroundSceneSettings()
    requestRender()
  },
  { immediate: true },
)

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
  updateStableSize()
  createMetaballs()
  createMousePlane()
  await rebuildPhysics()

  mouseTarget.set(0, 0, settings.mouse.parkZ)
  mousePos.set(0, 0, settings.mouse.parkZ)

  if (container.value?.matches(':hover'))
    pointerInside.value = true
})

useEventListener(window, 'orientationchange', updateStableSize)
useEventListener(window, 'resize', () => {
  if (!import.meta.client)
    return
  if (window.innerWidth !== lastWindowWidth.value)
    setStableSize(window.innerWidth, window.innerHeight)
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
  environmentBackground.value?.dispose()
  disposeTransmissionBackdrop()

  freeWorld()
  rapier = null
})
</script>

<template>
  <div ref="container" class="relative h-full w-full touch-none" :style="stableSizeStyle">
    <ClientOnly>
      <!-- Canvas is non-interactive so the page can scroll / click through. -->
      <div class="pointer-events-none absolute inset-0 touch-none">
        <TresCanvas
          :dpr="dpr"
          :alpha="true"
          :clear-alpha="0"
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
        </TresCanvas>
      </div>

      <Teleport v-if="controlsMode === 'fixed'" to="body">
        <GlassMetaballsControls
          v-model:settings="settingsModel"
          v-model:preset-name="presetName"
          position="fixed"
          :env-status="envStatus"
          :on-apply-environment-settings="applyEnvironmentSettings"
          :on-apply-preset="applyPreset"
          :on-copy-settings="copySettingsJson"
          :on-queue-physics-rebuild="queuePhysicsRebuild"
        />
      </Teleport>

      <GlassMetaballsControls
        v-else-if="controlsMode !== 'none'"
        v-model:settings="settingsModel"
        v-model:preset-name="presetName"
        position="absolute"
        :env-status="envStatus"
        :on-apply-environment-settings="applyEnvironmentSettings"
        :on-apply-preset="applyPreset"
        :on-copy-settings="copySettingsJson"
        :on-queue-physics-rebuild="queuePhysicsRebuild"
      />
    </ClientOnly>
  </div>
</template>
