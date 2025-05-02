<script lang="ts" setup>
import type { SplineEventName } from '@splinetool/runtime'
import type { SplineProps } from './Spline.model'
import { Application } from '@splinetool/runtime'
import ParentSize from './ParentSize/ParentSize.vue'
import { SplinePropsDefaults } from './Spline.model'

const props = withDefaults(defineProps<SplineProps>(), SplinePropsDefaults)
const emit = defineEmits([
  'error',
  'splineMouseDown',
  'splineMouseUp',
  'splineMouseHover',
  'splineKeyDown',
  'splineKeyUp',
  'splineStart',
  'splineLookAt',
  'splineFollow',
  'splineScroll',
])

const { scene, onLoad, renderOnDemand, style } = toRefs(props)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isLoading = ref(false)
const splineApp = ref<Application | null>(null)
const isVisible = ref(true)

let cleanup: () => void = () => {
}

const parentSizeStyles = computed(() => ({
  overflow: 'hidden',
  ...style.value,
}))

const canvasStyle = computed(() => ({
  display: 'block',
  width: '100%',
  height: '100%',
}))

// Use IntersectionObserver to detect when component is visible
const { stop: stopIntersectionObserver } = useIntersectionObserver(
  canvasRef,
  ([{ isIntersecting }]) => {
    isVisible.value = isIntersecting
    if (isIntersecting && splineApp.value) {
      // When becoming visible again, force a resize
      nextTick(() => {
        if (canvasRef.value && splineApp.value) {
          splineApp.value.requestRender()
          splineApp.value.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight)
        }
      })
    }
  },
  { threshold: 0.1 },
)

function eventHandler(name: SplineEventName, handler?: (e: any) => void) {
  if (!handler || !splineApp.value)
    return
  const debouncedHandler = useDebounceFn(handler, 50, { maxWait: 100 })
  splineApp.value.addEventListener(name, debouncedHandler)
  return () => splineApp.value?.removeEventListener(name, debouncedHandler)
}

async function initSpline() {
  if (!canvasRef.value)
    return

  isLoading.value = true

  try {
    // Clean up previous instance if exists
    if (splineApp.value) {
      splineApp.value.dispose()
      splineApp.value = null
    }

    splineApp.value = new Application(canvasRef.value, {
      renderOnDemand: renderOnDemand.value,
    })

    await splineApp.value.load(scene.value)

    // Set up event listeners
    const cleanUpFns = [
      eventHandler('mouseDown', (e: any) => emit('splineMouseDown', e)),
      eventHandler('mouseUp', (e: any) => emit('splineMouseUp', e)),
      eventHandler('mouseHover', (e: any) => emit('splineMouseHover', e)),
      eventHandler('keyDown', (e: any) => emit('splineKeyDown', e)),
      eventHandler('keyUp', (e: any) => emit('splineKeyUp', e)),
      eventHandler('start', (e: any) => emit('splineStart', e)),
      eventHandler('lookAt', (e: any) => emit('splineLookAt', e)),
      eventHandler('follow', (e: any) => emit('splineFollow', e)),
      eventHandler('scroll', (e: any) => emit('splineScroll', e)),
    ].filter(Boolean)

    isLoading.value = false
    onLoad.value?.(splineApp.value)

    return () => {
      cleanUpFns.forEach(fn => fn?.())
    }
  }
  catch (err) {
    console.error('Spline initialization error:', err)
    emit('error', err)
    isLoading.value = false
    return () => {
    }
  }
}

async function initialize() {
  cleanup()
  cleanup = (await initSpline()) ?? (() => {
  })
}

onMounted(async () => {
  await initialize()

  // Reinitialize when becoming visible again
  watch(isVisible, (visible) => {
    if (visible) {
      initialize()
    }
  })
})

onUnmounted(() => {
  stopIntersectionObserver()
  if (splineApp.value) {
    splineApp.value.dispose()
    splineApp.value = null
  }
})
</script>

<template>
  <ParentSize
    :debounce-time="50"
    :parent-size-styles="parentSizeStyles"
    v-bind="$attrs"
  >
    <template #default>
      <canvas
        ref="canvasRef"
        :style="canvasStyle"
      />
      <slot v-if="isLoading" />
    </template>
  </ParentSize>
</template>
