<script lang="ts" setup>
import type { SplineProps } from './Spline.model'
import { Application } from '@splinetool/runtime'
import { useDocumentVisibility, useEventListener, useIntersectionObserver } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref, shallowRef, toRefs, watch } from 'vue'
import { useMenu } from '@/stores/menu'
import ParentSize from './ParentSize/ParentSize.vue'
import { SplinePropsDefaults } from './Spline.model'

type SplineEventName
  = | 'mouseDown'
    | 'mouseUp'
    | 'mouseHover'
    | 'keyDown'
    | 'keyUp'
    | 'start'
    | 'lookAt'
    | 'follow'
    | 'scroll'

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

const LCP_PADDING_MS = 200
const RIC_TIMEOUT_MS = 2500
const NO_RIC_DELAY_MS = 2000

const menuStore = useMenu()
const { isOpen } = storeToRefs(menuStore)
const { scene, onLoad, renderOnDemand, style, debug } = toRefs(props)

const canvasRef = useTemplateRef('canvasRef')
const isLoading = ref(false)
const splineApp = shallowRef<Application | null>(null)
const shouldAnimate = ref(false)

watch(isLoading, (loading) => {
  if (loading) {
    useWait(1100)
      .then(() => {
        shouldAnimate.value = loading
      })
      .catch((err) => {
        consola.error('Error during wait:', err)
      })
  }
})

const parentSizeStyles = computed(() => ({
  overflow: 'hidden',
  ...style.value,
}))
const canvasStyle = computed(() => ({
  display: 'block',
  width: '100%',
  height: '100%',
}))

// Track if initialization has been scheduled to prevent multiple calls
const initScheduled = ref(false)

// ---- 1. Only initialize Spline ONCE, and NEVER re-dispose/load unless remounting ----
async function initSpline() {
  if (!canvasRef.value || splineApp.value)
    return

  // initScheduled is already set to true in scheduleInit() to prevent multiple calls
  // We don't need to check it here - it's just to prevent multiple scheduleInit() calls
  isLoading.value = true

  try {
    splineApp.value = new Application(canvasRef.value, {
      renderOnDemand: renderOnDemand.value,
    })
    await splineApp.value.load(scene.value)
    isLoading.value = false
    onLoad.value?.(splineApp.value)
    setupEventListeners()
  }
  catch (err) {
    consola.error('Spline initialization error:', err)
    emit('error', err)
    isLoading.value = false
    initScheduled.value = false // Allow retry on error
  }
}

function scheduleInit() {
  if (initScheduled.value || splineApp.value)
    return

  initScheduled.value = true

  const hasWindow = typeof window !== 'undefined'
  const hasRIC = hasWindow && 'requestIdleCallback' in window

  if (hasRIC) {
    const ric = window.requestIdleCallback as typeof requestIdleCallback
    ric(
      () => {
        setTimeout(initSpline, LCP_PADDING_MS)
      },
      { timeout: RIC_TIMEOUT_MS },
    )
  }
  else {
    setTimeout(initSpline, NO_RIC_DELAY_MS)
  }
}

// ---- 2. Set up event listeners with useEventListener ----
function setupEventListeners() {
  if (!splineApp.value)
    return

  const events: SplineEventName[] = [
    'mouseDown',
    'mouseUp',
    'mouseHover',
    'keyDown',
    'keyUp',
    'start',
    'lookAt',
    'follow',
    'scroll',
  ]
  events.forEach((eventName) => {
    useEventListener(splineApp.value!, eventName, (e: any) => {
      emit(`spline${eventName.charAt(0).toUpperCase() + eventName.slice(1)}` as
      | 'splineMouseDown'
      | 'splineMouseUp'
      | 'splineMouseHover'
      | 'splineKeyDown'
      | 'splineKeyUp'
      | 'splineStart'
      | 'splineLookAt'
      | 'splineFollow'
      | 'splineScroll', e)
    })
  })
}

// Viewport visibility of the canvas (>= 30% visible)
const intersectionVisible = ref(false)
useIntersectionObserver(
  canvasRef,
  ([entry]) => {
    const ratio = entry?.intersectionRatio ?? 0
    intersectionVisible.value = !!entry && entry.isIntersecting && ratio >= 0.5
  },
  { threshold: Array.from({ length: 101 }, (_, i) => i / 100) },
)

// Page/tab visibility
const pageVisibility = useDocumentVisibility()

// Helpers to stop/play with reasoned debug logs
function stopAnimation(reason: string) {
  const app = splineApp.value
  if (!app)
    return
  if (!app.isStopped) {
    if (debug.value)
      consola.debug('[Spline] stopAnimation:', reason)
    app.stop()
  }
}

function playAnimation(reason: string) {
  const app = splineApp.value
  if (!app)
    return
  if (app.isStopped) {
    if (debug.value)
      consola.debug('[Spline] playAnimation:', reason)
    app.play()
  }
}

// ---- 3. Pause / play ONLY, never reload scene! ----
watch(
  [isOpen, intersectionVisible, pageVisibility],
  ([open, visible, docVis]) => {
    if (open)
      return stopAnimation('menu: open')
    if (!visible)
      return stopAnimation('viewport: out-of-view')
    if (docVis !== 'visible')
      return stopAnimation(`doc-visibility: ${docVis}`)

    playAnimation('conditions-met: visible & menu-closed & tab-visible')
  },
  { immediate: true },
)

onMounted(() => {
  // Always schedule initialization when mounted
  // The deferred approach (requestIdleCallback) ensures it doesn't block LCP
  // The intersection observer will handle pausing/playing after initialization
  requestAnimationFrame(() => {
    // Small delay to ensure canvas ref is ready
    setTimeout(() => {
      if (!splineApp.value && !initScheduled.value) {
        scheduleInit()
      }
    }, 50)
  })
})

onUnmounted(() => {
  if (splineApp.value) {
    splineApp.value.dispose()
    splineApp.value = null
  }
})
</script>

<template>
  <ParentSize
    :class="shouldAnimate ? 'slide-up-blur' : 'opacity-0 scale-80'"
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

<style scoped>
@keyframes slideUpBlur {
  0% {
    opacity: 0;
    transform: translateY(60px);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.slide-up-blur {
  animation: slideUpBlur 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
</style>
