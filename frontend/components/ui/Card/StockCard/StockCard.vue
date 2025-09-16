<!-- StockCard.vue -->
<script setup lang="ts">
import type { StockQuote } from '@/stores/stocks'
import StockCardItem from '@/components/ui/Card/StockCard/StockCardItem.vue'
import { useStocks } from '@/stores/stocks'

const stocksStore = useStocks()
const { quotes, isLoading, error, leftStock, rightStock, activeStartIndex } = storeToRefs(stocksStore)
const { ensureLoaded, fetchQuotes } = stocksStore

const animationKey = ref(0)

// Keep computed aliases for template compatibility
const stockData = computed(() => quotes.value)

const hostRef = useTemplateRef('hostRef')
const inView = useElementVisibility(hostRef)

// Keep card heights stable during transitions
const leftMinHeight = ref(0)
const rightMinHeight = ref(0)

function beforeLeaveLeft(el: Element) {
  leftMinHeight.value = (el as HTMLElement).offsetHeight
}

function afterEnterLeft(el: Element) {
  leftMinHeight.value = (el as HTMLElement).offsetHeight
  animateLeftBar()
}

function beforeLeaveRight(el: Element) {
  rightMinHeight.value = (el as HTMLElement).offsetHeight
}

function afterEnterRight(el: Element) {
  rightMinHeight.value = (el as HTMLElement).offsetHeight
  animateRightBar()
}

const leftCardContentRef = useTemplateRef('leftCardContentRef')
const rightCardContentRef = useTemplateRef('rightCardContentRef')

type StockData = StockQuote

// Day range bar widths (animate on card enter)
const leftBarWidth = ref('0%')
const rightBarWidth = ref('0%')

function computeRangeWidth(stock: StockData | null): string {
  if (
    !stock
    || stock.price === null
    || stock.dayRange.low === null
    || stock.dayRange.high === null
    || stock.dayRange.high === stock.dayRange.low
  ) {
    return '0%'
  }

  const ratio = (stock.price - stock.dayRange.low) / (stock.dayRange.high - stock.dayRange.low)
  const clamped = Math.min(1, Math.max(0, ratio))
  return `${(clamped * 100).toFixed(2)}%`
}

function animateLeftBar() {
  const target = computeRangeWidth(leftStock.value)
  if (!import.meta.client) {
    leftBarWidth.value = target
    return
  }
  leftBarWidth.value = '0%'
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      leftBarWidth.value = target
    })
  })
}

function animateRightBar() {
  const target = computeRangeWidth(rightStock.value)
  if (!import.meta.client) {
    rightBarWidth.value = target
    return
  }
  rightBarWidth.value = '0%'
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      rightBarWidth.value = target
    })
  })
}

// Remove local autoplay to avoid double-advance; rely on store autoplay controlled in layout
function pause() {
}
function resume() {
}

watch(inView, (v) => {
  if (v)
    resume()
  else pause()
})

onMounted(async () => {
  await ensureLoaded()
  if (inView.value)
    resume()
  // initialize min-heights to prevent initial shrink during first transition
  if (leftCardContentRef.value)
    leftMinHeight.value = (leftCardContentRef.value as HTMLElement).offsetHeight
  if (rightCardContentRef.value)
    rightMinHeight.value = (rightCardContentRef.value as HTMLElement).offsetHeight
})
onUnmounted(pause)

watch(activeStartIndex, () => {
  // trigger progress bar animation when pair changes externally
  animationKey.value += 1
})

/** Shared classes */
const boxShadowClass = useClsx(
  // light & dark shadows
  'shadow-[0_8px_25px_rgba(0,0,0,0.12),0_3px_10px_rgba(0,0,0,0.08)]',
  'dark:shadow-[0_8px_25px_rgba(255,255,255,0.12),0_3px_10px_rgba(255,255,255,0.08)]',
  // common card chrome
  'rounded-3xl p-5 sm:p-6 md:p-8 backdrop-blur-sm',
)

const cardSurfaceLight = useClsx('bg-sand-1')
const cardSurfaceDark = useClsx('dark:bg-olive-2')
const baseClass = useClsx('max-w-5xl h-full')

// Additional stocks to support 2x2 layout on lg+
const thirdStock = computed(() => {
  const list = stockData.value
  if (!list.length)
    return null
  return list[(activeStartIndex.value + 2) % list.length] || null
})

const fourthStock = computed(() => {
  const list = stockData.value
  if (!list.length)
    return null
  return list[(activeStartIndex.value + 3) % list.length] || null
})

// Progress widths for extra cards
const thirdBarWidth = computed(() => computeRangeWidth(thirdStock.value as any))
const fourthBarWidth = computed(() => computeRangeWidth(fourthStock.value as any))
</script>

<template>
  <div
    ref="hostRef"
    :class="useClsx('relative grid h-full min-h-0 w-full min-w-0 grid-cols-1 gap-8 md:gap-10 xl:grid-cols-2 xl:gap-14 xl:grid-rows-[1fr_1fr]')"
  >
    <!-- Loading -->
    <div v-if="isLoading" :class="useClsx('space-y-6 col-span-1 xl:row-span-2')">
      <div :class="useClsx(boxShadowClass, cardSurfaceLight, 'dark:bg-sand-10 h-full')" />
    </div>

    <!-- Error -->
    <div v-else-if="error" :class="useClsx('space-y-6 col-span-1 xl:row-span-2')">
      <div :class="useClsx(boxShadowClass, cardSurfaceLight, 'dark:bg-sand-10 h-full')">
        <div :class="useClsx('h-full flex items-center justify-center text-center p-6')">
          <div>
            <Icon name="ri:error-warning-line" :class="useClsx('mx-auto mb-4 size-12 color-gray-10')" />
            <p :class="useClsx('font-manrope mb-2 text-lg color-gray-12')">
              {{ error }}
            </p>
            <button
              :class="useClsx(
                'font-manrope rounded-lg px-4 py-2 transition-colors',
                'bg-sand-12 hover:bg-sand-11 color-pureWhite',
              )"
              @click="() => fetchQuotes({ refresh: true })"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Data -->
    <template v-else>
      <!-- First card -->
      <div class="h-full min-h-0">
        <Transition
          mode="out-in"
          enter-active-class="transition-opacity duration-500 ease-out"
          leave-active-class="transition-opacity duration-500 ease-in"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          @before-leave="beforeLeaveLeft"
          @after-enter="afterEnterLeft"
        >
          <div v-if="leftStock" :key="leftStock.symbol" ref="leftCardContentRef" class="h-full min-h-0">
            <StockCardItem :stock="leftStock as any" />
          </div>
        </Transition>
      </div>

      <!-- Second card -->
      <div class="h-full min-h-0">
        <Transition
          mode="out-in"
          enter-active-class="transition-opacity duration-500 ease-out"
          leave-active-class="transition-opacity duration-500 ease-in"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          @before-leave="beforeLeaveRight"
          @after-enter="afterEnterRight"
        >
          <div v-if="rightStock" :key="rightStock.symbol" ref="rightCardContentRef" class="h-full min-h-0">
            <StockCardItem :stock="rightStock as any" />
          </div>
        </Transition>
      </div>
      <!-- Third and fourth cards (only visible on xl+ screens) -->
      <template v-if="stockData.length > 0">
        <div v-if="thirdStock" class="hidden h-full min-h-0 xl:block xl:col-start-1 xl:row-start-2">
          <StockCardItem :stock="thirdStock as any" />
        </div>
        <div v-if="fourthStock" class="hidden h-full min-h-0 xl:block xl:col-start-2 xl:row-start-2">
          <StockCardItem :stock="fourthStock as any" />
        </div>
      </template>
    </template>

    <!-- Dots indicator -->
    <div
      v-if="stockData.length > 0"
      :class="useClsx('pointer-events-none absolute z-20 flex items-center justify-center space-x-3', 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2')"
    >
      <div
        v-for="(_, index) in Math.ceil(stockData.length / 2)"
        :key="index"
        :class="useClsx('h-2 rounded-full transition-all duration-800 ease-out', index === Math.floor(activeStartIndex / 2) ? 'bg-sand-12 w-8 scale-110 shadow-lg' : 'bg-gray-8 w-2')"
        :style="{ transitionDelay: `${index * 100}ms` }"
      />
    </div>
  </div>
</template>

<style scoped>
@keyframes growLine {
  0% {
    transform: scaleX(0);
  }
  96% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(1);
  }
}

@keyframes moveDot {
  0% {
    transform: translateY(-50%) translateX(0);
  }
  96% {
    transform: translateY(-50%) translateX(var(--dot-distance, 2rem));
  }
  100% {
    transform: translateY(-50%) translateX(var(--dot-distance, 2rem));
  }
}

.progress-line {
  transform-origin: left center;
  will-change: transform;
  animation: growLine 6.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.progress-dot {
  will-change: transform;
  animation: moveDot 6.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  position: relative;
}

.progress-dot::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 9999px;
  background: currentColor;
  opacity: 0.08;
  transform: scale(0.85);
  animation: pulseHalo 2.8s ease-in-out infinite;
}

@keyframes pulseHalo {
  0% {
    opacity: 0.04;
    transform: scale(0.85);
  }
  50% {
    opacity: 0.12;
    transform: scale(1);
  }
  100% {
    opacity: 0.04;
    transform: scale(0.85);
  }
}
</style>
