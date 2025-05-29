<script lang="ts" setup>
import type { SplineProps } from './Spline.model'
import { useMenu } from '@/stores/menu'
import { Application } from '@splinetool/runtime'
import { useEventListener } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref, shallowRef, toRefs, watch } from 'vue'
import ParentSize from './ParentSize/ParentSize.vue'
import { SplinePropsDefaults } from './Spline.model'

type SplineEventName =
  | 'mouseDown'
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

const menuStore = useMenu()
const { isOpen } = storeToRefs(menuStore)
const { scene, onLoad, renderOnDemand, style } = toRefs(props)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isLoading = ref(false)
const splineApp = shallowRef<Application | null>(null)
const isVisible = ref(true)
const shouldAnimate = ref(false)

watch(isLoading, (loading) => {
  if (loading) {
    useWait(1500)
      .then(() => {
        shouldAnimate.value = loading
      })
      .catch((err) => {
        console.error('Error during wait:', err)
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

// ---- 1. Only initialize Spline ONCE, and NEVER re-dispose/load unless remounting ----
async function initSpline() {
  if (!canvasRef.value || splineApp.value)
    return
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
    console.error('Spline initialization error:', err)
    emit('error', err)
    isLoading.value = false
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

// ---- 3. Pause/play ONLY, never reload scene! ----
watch(isOpen, (open) => {
  if (!splineApp.value)
    return
  if (open) {
    if (!splineApp.value.isStopped)
      splineApp.value.stop()
  }
  else {
    if (isVisible.value && splineApp.value.isStopped)
      splineApp.value.play()
  }
})

onMounted(() => {
  initSpline()
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
