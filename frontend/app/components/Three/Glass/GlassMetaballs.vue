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
  update: () => Vector3
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
const dpr = computed(() => Math.min(pixelRatio.value || 1, 1.5))

const documentVisibility = useDocumentVisibility()
const visibleRatio = ref(0)
const isVisible = computed(() => visibleRatio.value >= 0.1 && documentVisibility.value === 'visible')

const raycaster = new Raycaster()
const pointerPos = new Vector2(0, 0)
const mousePos = new Vector3(0, 0, 0)
const cameraDirection = new Vector3()

const metaOffset = new Vector3(0.5, 0.5, 0.5)
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

function createMetaballs() {
  const material = new MeshPhysicalMaterial({
    vertexColors: true,
    transmission: 1.0,
    thickness: 1.0,
    roughness: 0.0,
    metalness: 0.0,
    transparent: true,
  })

  const marching = new MarchingCubes(96, material, true, true, 90000)
  marching.scale.setScalar(5)
  marching.isolation = 1000
  metaballs.value = marching
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
  const size = 0.2
  const range = 6
  const density = 0.5

  const x = Math.random() * range - range * 0.5
  const y = Math.random() * range - range * 0.5 + 3
  const z = Math.random() * range - range * 0.5

  const rigidBodyDesc = rapierInstance.RigidBodyDesc.dynamic().setTranslation(x, y, z)
  const rigid = rapierWorld.createRigidBody(rigidBodyDesc)

  rigid.setLinearDamping(3.0)
  rigid.setAngularDamping(8.0)

  const colliderDesc = rapierInstance.ColliderDesc.ball(size)
    .setDensity(density)
    .setRestitution(0.0)
    .setFriction(1.2)

  rapierWorld.createCollider(colliderDesc, rigid)

  const color = new Color(colorPalette[Math.floor(Math.random() * colorPalette.length)])

  const pos = new Vector3()
  const spring = new Vector3()

  return {
    rigid,
    color,
    update() {
      let px = 0
      let py = 0
      let pz = 0

      {
        const t: any = rigid.translation()
        px = t.x
        py = t.y
        pz = t.z
      }

      rigid.resetForces(true)

      pos.set(px, py, pz)

      spring.copy(pos).sub(sceneMiddle)
      const dist = spring.length() + 0.0001
      spring.multiplyScalar(1 / dist)

      const basePull = 0.5
      const boost = Math.min(dist * 0.18, 2.0)
      const pull = basePull + boost

      rigid.addForce({ x: -spring.x * pull, y: -spring.y * pull, z: -spring.z * pull }, true)

      const v: any = rigid.linvel()
      const vx = v.x
      const vy = v.y
      const vz = v.z

      const speed = Math.sqrt(vx * vx + vy * vy + vz * vz)
      const maxSpeed = 6
      if (speed > maxSpeed) {
        const s = maxSpeed / speed
        rigid.setLinvel({ x: vx * s, y: vy * s, z: vz * s }, true)
      }

      const w: any = rigid.angvel()
      const wx = w.x
      const wy = w.y
      const wz = w.z

      const angSpeed = Math.sqrt(wx * wx + wy * wy + wz * wz)
      const maxAng = 8
      if (angSpeed > maxAng) {
        const s = maxAng / angSpeed
        rigid.setAngvel({ x: wx * s, y: wy * s, z: wz * s }, true)
      }

      pos.multiplyScalar(0.1).add(metaOffset)
      return pos
    },
  }
}

function createMouseBall(rapierInstance: RapierModule, rapierWorld: RapierWorld): MouseBall {
  const mouseSize = 0.25
  const bodyDesc = rapierInstance.RigidBodyDesc.kinematicPositionBased().setTranslation(0, 0, 0)
  const rigid = rapierWorld.createRigidBody(bodyDesc)
  const colliderDesc = rapierInstance.ColliderDesc.ball(mouseSize * 6.0)
  rapierWorld.createCollider(colliderDesc, rigid)

  return {
    update(position: Vector3) {
      rigid.setNextKinematicTranslation({ x: position.x, y: position.y, z: position.z })
    },
  }
}

async function initPhysics() {
  if (!import.meta.client || world)
    return

  rapier = await import('@dimforge/rapier3d-compat')
  await rapier.init()

  world = new rapier.World({ x: 0.0, y: 0.0, z: 0.0 })
  bodies.length = 0

  for (let i = 0; i < 40; i++)
    bodies.push(createBody(rapier, world))

  mouseBall = createMouseBall(rapier, world)
}

function handleRaycast() {
  if (!cameraRef.value || !mousePlane.value)
    return

  cameraRef.value.getWorldDirection(cameraDirection)
  cameraDirection.multiplyScalar(-1)
  mousePlane.value.lookAt(cameraDirection)

  raycaster.setFromCamera(pointerPos, cameraRef.value)
  const intersects = raycaster.intersectObject(mousePlane.value, false)
  if (intersects.length > 0)
    mousePos.copy(intersects[0].point)
}

function stepSimulation() {
  if (!world || !metaballs.value)
    return

  world.step()
  handleRaycast()
  mouseBall?.update(mousePos)

  bodies.forEach((b) => {
    b.update()
  })

  metaballs.value.reset()
  const strength = 0.5
  const subtract = 10

  bodies.forEach((b) => {
    const p = b.update()
    metaballs.value?.addBall(p.x, p.y, p.z, strength, subtract, b.color)
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

useEventListener(container, 'pointermove', (event) => {
  const rect = container.value?.getBoundingClientRect()
  if (!rect)
    return

  pointerPos.set(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1,
  )
})

useEventListener(container, 'pointerleave', () => {
  pointerPos.set(0, 0)
})

onMounted(async () => {
  createMetaballs()
  createMousePlane()
  await initPhysics()
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

  world?.free()
  world = null
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
    </ClientOnly>
  </div>
</template>
