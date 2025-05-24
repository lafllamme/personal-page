<script lang="ts" setup>
import type { SplineEventName } from '@splinetool/runtime'
import type { SplineProps } from './Spline.model'
import { useMenu } from '@/stores/menu'
import { Application } from '@splinetool/runtime'
import { computed, nextTick, onMounted, onUnmounted, ref, shallowRef, toRefs, watch } from 'vue'
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
const menuStore = useMenu()
const { isOpen } = storeToRefs(menuStore)
const { scene, onLoad, renderOnDemand, style } = toRefs(props)

const canvasRef = useTemplateRef('canvasRef')
const isLoading = ref(false)
const splineApp = shallowRef<Application | null>(null)
const isVisible = ref(true)
const isTransitioning = ref(false)
let eventCleanups: Array<() => void> = []
let cleanup: () => void = () => {
}

const FADE_DURATION = 400 // ms

// ========== EVENTS ==========
function eventHandler(name: SplineEventName, handler?: (e: any) => void) {
  if (!handler || !splineApp.value)
    return
  const debouncedHandler = useDebounceFn(handler, 50, { maxWait: 100 })
  splineApp.value.addEventListener(name, debouncedHandler)
  return () => splineApp.value?.removeEventListener(name, debouncedHandler)
}

function setupEventHandlers() {
  removeEventHandlers()
  if (!splineApp.value)
    return
  eventCleanups = [
    eventHandler('mouseDown', (e: any) => emit('splineMouseDown', e)),
    eventHandler('mouseUp', (e: any) => emit('splineMouseUp', e)),
    eventHandler('mouseHover', (e: any) => emit('splineMouseHover', e)),
    eventHandler('keyDown', (e: any) => emit('splineKeyDown', e)),
    eventHandler('keyUp', (e: any) => emit('splineKeyUp', e)),
    eventHandler('start', (e: any) => emit('splineStart', e)),
    eventHandler('lookAt', (e: any) => emit('splineLookAt', e)),
    eventHandler('follow', (e: any) => emit('splineFollow', e)),
    eventHandler('scroll', (e: any) => emit('splineScroll', e)),
  ].filter(Boolean) as Array<() => void>
}

function removeEventHandlers() {
  eventCleanups.forEach(fn => fn?.())
  eventCleanups = []
}

// ========== INIT SPLINE ==========
async function initSpline() {
  if (!canvasRef.value)
    return
  isLoading.value = true
  try {
    if (splineApp.value) {
      splineApp.value.dispose()
      splineApp.value = null
    }
    splineApp.value = new Application(canvasRef.value, {
      renderOnDemand: renderOnDemand.value,
    })
    await splineApp.value.load(scene.value)
    isLoading.value = false
    onLoad.value?.(splineApp.value)
    setupEventHandlers()
    return () => {
      removeEventHandlers()
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

const parentSizeStyles = computed(() => ({
  overflow: 'hidden',
  ...style.value,
}))
const canvasStyle = computed(() => ({
  display: 'block',
  width: '100%',
  height: '100%',
  opacity: isTransitioning.value ? 0 : 1,
  transition: `opacity ${FADE_DURATION}ms cubic-bezier(.4,0,.2,1)`,
  willChange: 'opacity',
}))

const { stop: stopIntersectionObserver } = useIntersectionObserver(
  canvasRef,
  ([{ isIntersecting }]) => {
    isVisible.value = isIntersecting
    if (isIntersecting && splineApp.value && !isOpen.value) {
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

// ========== FADE OUT BEFORE KILL / FADE IN ON REOPEN ==========

watch(isOpen, async (shouldFadeOutAndKill) => {
  if (shouldFadeOutAndKill) {
    // ---- Fade out, then kill Spline instance ----
    isTransitioning.value = true
    removeEventHandlers()
    setTimeout(() => {
      if (splineApp.value) {
        splineApp.value.dispose()
        splineApp.value = null
      }
      isLoading.value = false
    }, FADE_DURATION)
  }
  else {
    // ---- Re-init Spline, then fade in ----
    isTransitioning.value = true // Canvas starts hidden!
    await initialize()
    // Let Vue render, then fade in
    setTimeout(() => {
      isTransitioning.value = false
      // Optionally: Force a render so first frame is instantly shown
      nextTick(() => {
        splineApp.value?.requestRender?.()
      })
    }, 10) // wait just a tick for canvas to show up in DOM
  }
})

// ========== LIFECYCLE ==========
onMounted(async () => {
  await initialize()
  watch(isVisible, (visible) => {
    if (visible) {
      initialize()
    }
  })
})

onUnmounted(() => {
  stopIntersectionObserver()
  cleanup()
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
