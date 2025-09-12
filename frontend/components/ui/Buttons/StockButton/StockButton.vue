<script setup lang="ts">
import { useStocks } from '@/stores/stocks'

// Store wiring moved here
const stocks = useStocks()
const {
  symbols,
  activeButtonSymbol,
  idleResumeMs,
  isUserInteracting,
  isAutoplayRunning,
} = storeToRefs(stocks)
const {
  userSelectSymbol,
  ensureLoaded,
  startAutoplay,
  stopAutoplay,
  onInteractStart,
  onInteractStop,
} = stocks

// Sliding indicator state
const tickerContainer = ref<HTMLElement | null>(null)
const tickerBtnRefs = ref<HTMLElement[]>([])
const hoverIdx = ref<number | null>(null)

const activeIdx = computed(() => symbols.value.findIndex(s => s === activeButtonSymbol.value))
const currentIdx = computed(() => hoverIdx.value ?? activeIdx.value)

const indicator = reactive({ x: 0, y: 0, w: 0, h: 0, visible: false })

// Gentle debounce to avoid instant switching when hovering across buttons
const scheduleHover = useDebounceFn((i: number, stock: string) => {
  hoverIdx.value = i
  userSelectSymbol(stock)
}, 150)

function setTickerBtnRef(el: HTMLElement | null, i: number) {
  if (el)
    tickerBtnRefs.value[i] = el
}

function moveIndicatorToIndex(idx: number | null) {
  const c = tickerContainer.value
  if (!c || idx == null || idx < 0) {
    indicator.visible = false
    return
  }
  const el = tickerBtnRefs.value[idx]
  if (!el) {
    indicator.visible = false
    return
  }
  // Place the pill in the container's content coordinate space so scrolling doesn't skew it
  indicator.x = el.offsetLeft
  indicator.y = el.offsetTop
  indicator.w = el.offsetWidth
  indicator.h = el.offsetHeight
  indicator.visible = true
}

const recalc = () => moveIndicatorToIndex(currentIdx.value)

// Center active button on autoplay so the pill never sprints across the whole row
function centerButton(idx: number, behavior: ScrollBehavior = 'smooth') {
  const c = tickerContainer.value
  const el = tickerBtnRefs.value[idx]
  if (!c || !el)
    return
  const target = el.offsetLeft - (c.clientWidth - el.offsetWidth) / 2
  c.scrollTo({ left: target, behavior })
}

const scrollThrottled = useThrottleFn(() => recalc(), 16, true, true)
const debouncedStop = useDebounceFn(() => onInteractStop(), idleResumeMs.value)
useResizeObserver(tickerContainer, () => recalc())

watch(currentIdx, (idx) => {
  nextTick(() => {
    recalc()
    // Only center automatically when NOT hovering (autoplay path)
    if (hoverIdx.value == null && typeof idx === 'number' && idx >= 0)
      centerButton(idx, 'smooth')
  })
})

onMounted(() => {
  ensureLoaded()
  nextTick(() => {
    recalc()
    startAutoplay()
  })
  // Recalc after fonts load (avoids subpixel drift)
  document.fonts?.ready?.then?.(() => recalc())

  useEventListener(tickerContainer, 'scroll', () => {
    scrollThrottled()
    onInteractStart()
    debouncedStop()
  }, { passive: true })
})

onBeforeUnmount(() => {
  stopAutoplay()
})
</script>

<template>
  <div
    ref="tickerContainer"
    class="[scrollbar-width:none] relative max-w-1/2 flex items-center overflow-x-auto px-1"
    :class="[
      isAutoplayRunning ? 'autoplaying' : '',
      isUserInteracting ? 'user-interacting' : '',
    ]"
    @pointerenter="onInteractStart"
    @pointerleave="() => { hoverIdx = null; onInteractStop() }"
    @focusin="onInteractStart"
    @focusout="() => { hoverIdx = null; onInteractStop() }"
    @touchstart.passive="onInteractStart"
  >
    <!-- Sliding highlight pill -->
    <div
      v-show="indicator.visible"
      class="ticker-indicator absolute rounded-full bg-mint-2 dark:bg-mint-5/30"
      :style="{
        top: '0px',
        left: '0px',
        transform: `translate3d(${indicator.x}px, ${indicator.y}px, 0)`,
        width: `${indicator.w}px`,
        height: `${indicator.h}px`,
      }"
      aria-hidden="true"
    />
    <!-- Ticker buttons -->
    <button
      v-for="(stock, i) in symbols"
      :key="stock"
      :ref="(el) => setTickerBtnRef(el as HTMLElement | null, i)"
      :class="useClsx(
        'relative z-10 text-cursor font-manrope rounded-full px-3 py-2',
        'text-[10px] md:text-xs lg:text-base font-light',
        'focus-visible:outline-none focus-visible:ring',
        'focus-visible:ring-pureBlack dark:focus-visible:ring-pureWhite',
        'color-mint-12',
      )"
      @mouseenter="() => scheduleHover(i, stock)"
      @focusin="() => scheduleHover(i, stock)"
      @click="() => userSelectSymbol(stock)"
    >
      {{ stock }}
    </button>
  </div>
</template>

<style scoped>
/* Sliding indicator animation with mode-aware durations */
.ticker-indicator {
  pointer-events: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  transition:
    transform var(--pill-dur, 420ms) cubic-bezier(0.22, 1, 0.36, 1),
    width var(--pill-dur, 420ms) cubic-bezier(0.22, 1, 0.36, 1),
    height var(--pill-dur, 420ms) cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, width, height;
}

/* Slower when autoplaying, snappier while interacting */
.autoplaying .ticker-indicator {
  --pill-dur: 640ms;
}
.user-interacting .ticker-indicator {
  --pill-dur: 320ms;
}

/* Durations handled in JS transitions now */

@media (prefers-reduced-motion: reduce) {
  .ticker-indicator {
    transition: none;
  }
}
</style>
