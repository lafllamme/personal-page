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
type emitTypes =
  | 'error'
  | 'splineMouseDown'
  | 'splineMouseUp'
  | 'splineMouseHover'
  | 'splineKeyDown'
  | 'splineKeyUp'
  | 'splineStart'
  | 'splineLookAt'
  | 'splineFollow'
  | 'splineScroll'
const { scene, onLoad, renderOnDemand, style } = toRefs(props)

const canvasRef = useTemplateRef('canvasRef')
const isLoading = ref(false)
const splineApp = ref<Application | null>(null)
const isVisible = ref(true)

const parentSizeStyles = computed(() => ({
  overflow: 'hidden',
  ...style.value,
}))
const canvasStyle = computed(() => ({
  display: 'block',
  width: '100%',
  height: '100%',
}))

// Store all cleanup fns (event handlers, observers, etc)
const cleanups: (() => void)[] = []

function cleanupAll() {
  cleanups.forEach(fn => fn())
  cleanups.length = 0
  if (splineApp.value) {
    splineApp.value.dispose()
    splineApp.value = null
  }
}

// Event handler utility: configure debounce for "hover/scroll", instant for click/key
const DEBOUNCED_EVENTS: SplineEventName[] = ['mouseHover', 'scroll']

function eventHandler(name: SplineEventName, handler?: (e: any) => void) {
  if (!handler || !splineApp.value)
    return
  const finalHandler = DEBOUNCED_EVENTS.includes(name)
    ? useDebounceFn(handler, 50, { maxWait: 100 })
    : handler
  splineApp.value.addEventListener(name, finalHandler)
  return () => splineApp.value?.removeEventListener(name, finalHandler)
}

// Intersection observer to optimize rendering (pause when not visible, resize when visible)
const { stop: stopIntersectionObserver } = useIntersectionObserver(
  canvasRef,
  ([{ isIntersecting }]) => {
    isVisible.value = isIntersecting
    if (isIntersecting && splineApp.value && canvasRef.value) {
      nextTick(() => {
        splineApp.value?.requestRender()
        splineApp.value?.setSize(canvasRef.value!.clientWidth, canvasRef.value!.clientHeight)
      })
    }
  },
  { threshold: 0.1 },
)
cleanups.push(stopIntersectionObserver)

async function initSpline() {
  if (!canvasRef.value)
    return

  isLoading.value = true
  try {
    cleanupAll() // full cleanup before creating new instance

    splineApp.value = new Application(canvasRef.value, {
      renderOnDemand: renderOnDemand.value,
    })
    await splineApp.value.load(scene.value)

    // Listen to Spline runtime events
    const events: [SplineEventName, string][] = [
      ['mouseDown', 'splineMouseDown'],
      ['mouseUp', 'splineMouseUp'],
      ['mouseHover', 'splineMouseHover'],
      ['keyDown', 'splineKeyDown'],
      ['keyUp', 'splineKeyUp'],
      ['start', 'splineStart'],
      ['lookAt', 'splineLookAt'],
      ['follow', 'splineFollow'],
      ['scroll', 'splineScroll'],
    ]
    for (const [eventName, emitName] of events) {
      const cleanup = eventHandler(eventName, (e: any) => emit(emitName as emitTypes, e))
      if (cleanup)
        cleanups.push(cleanup)
    }

    isLoading.value = false
    onLoad.value?.(splineApp.value)
  }
  catch (err) {
    console.error('Spline initialization error:', err)
    emit('error', err)
    isLoading.value = false
  }
}

// Handle prop change (scene): reload scene, keep Spline app instance alive!
watch(scene, async (val, oldVal) => {
  if (splineApp.value && val !== oldVal) {
    try {
      isLoading.value = true
      await splineApp.value.load(val)
      isLoading.value = false
    }
    catch (err) {
      emit('error', err)
      isLoading.value = false
    }
  }
})

// ParentSize "resize" listener
function onParentResize({ width, height }: { width: number, height: number }) {
  if (splineApp.value) {
    splineApp.value.setSize(width, height)
    splineApp.value.requestRender()
  }
}

// Mount & destroy
onMounted(() => {
  if (import.meta.client) {
    initSpline()
    // Reactivate Spline on visibility
    watch(isVisible, (visible) => {
      if (visible && !splineApp.value) {
        initSpline()
      }
    })
  }
})
onUnmounted(cleanupAll)
</script>

<template>
  <ParentSize
    :debounce-time="50"
    :parent-size-styles="parentSizeStyles"
    v-bind="$attrs"
    @resize="onParentResize"
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
