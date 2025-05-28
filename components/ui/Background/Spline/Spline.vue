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
    consola.debug('Spline render...should be called only once')
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
