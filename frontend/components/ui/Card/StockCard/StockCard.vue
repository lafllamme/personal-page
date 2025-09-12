<!-- StockCard.vue -->
<script setup lang="ts">
import NumberTicker from '@/components/ui/Text/NumberTicker/NumberTicker.vue'
import { useStocks } from '@/stores/stocks'
import type { StockQuote } from '@/stores/stocks'

const stocksStore = useStocks()
const { quotes, isLoading, error, leftStock, rightStock, activeStartIndex } = storeToRefs(stocksStore)
const { ensureLoaded, fetchQuotes, nextPair, setActiveStartIndex } = stocksStore

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
const pause = () => {}
const resume = () => {}

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
</script>

<template>
  <!-- Root is a fixed-height grid with two equal rows. This makes each card exactly 50% of the column. -->
  <div
    ref="hostRef"
    :class="useClsx('relative grid h-full min-h-0 w-full min-w-0 grid-rows-[1fr_1fr] gap-8 md:gap-10 lg:gap-14')"
  >
    <!-- Loading -->
    <div v-if="isLoading" :class="useClsx('space-y-6 col-span-1 row-span-2')">
      <div :class="useClsx(boxShadowClass, cardSurfaceLight, 'dark:bg-sand-10 h-full')" />
    </div>

    <!-- Error -->
    <div v-else-if="error" :class="useClsx('space-y-6 col-span-1 row-span-2')">
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
      <!-- Top card (row 1) -->
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
            <div
              :class="useClsx(boxShadowClass, cardSurfaceLight, cardSurfaceDark, baseClass, 'color-pureBlack w-full min-w-0 h-full overflow-hidden')"
            >
              <div :class="useClsx('grid grid-cols-12 items-start gap-3 sm:gap-6 min-w-0')">
                <div :class="useClsx('col-span-12 sm:col-span-3 min-w-0')">
                  <div
                    :class="useClsx('whitespace-nowrap font-manrope mb-2 text-[clamp(20px,2.4vw,36px)] font-light tracking-wider color-gray-12')"
                  >
                    {{ leftStock.symbol }}
                  </div>
                  <div
                    :class="useClsx('text-nowrap text-truncate font-manrope text-sm tracking-widest uppercase color-gray-10')"
                  >
                    {{ leftStock.name || leftStock.symbol }}
                  </div>
                </div>

                <div :class="useClsx('col-span-12 sm:col-span-4 min-w-0')">
                  <div
                    :class="useClsx('font-manrope mb-2 text-[clamp(24px,2.6vw,40px)] whitespace-nowrap font-light color-gray-12')"
                  >
                    $
                    <NumberTicker :value="leftStock.price!" />
                  </div>
                  <div :class="useClsx('font-manrope text-sm font-light color-gray-10')">
                    {{ leftStock.industry || '—' }}
                  </div>
                </div>

                <div :class="useClsx('col-span-6 sm:col-span-3 min-w-0')">
                  <div
                    v-if="leftStock.change !== null"
                    :class="useClsx('mb-2 flex items-center space-x-3', leftStock.change < 0 ? 'color-crimson-10' : 'color-jade-9')"
                  >
                    <Icon v-if="leftStock.change < 0" name="tabler:trending-down" :class="useClsx('size-5 md:size-6')" />
                    <Icon v-else name="tabler:trending-up" :class="useClsx('size-5 md:size-6')" />
                    <span :class="useClsx('font-manrope text-2xl font-light whitespace-nowrap')">
                      {{ leftStock.change > 0 ? '+' : '' }}
                      <NumberTicker :value="leftStock.change" />
                    </span>
                  </div>
                  <div :class="useClsx('font-manrope text-sm color-gray-10')">
                    ({{ leftStock.changePercent?.toFixed(2) || '0.00' }}%)
                  </div>
                </div>

                <div :class="useClsx('col-span-6 md:hidden sm:col-span-2 text-left sm:text-right min-w-0')">
                  <div :class="useClsx('font-manrope mb-1 text-base sm:text-lg font-light color-gray-12')">
                    ${{ leftStock.open?.toFixed(2) || 'N/A' }}
                  </div>
                  <div :class="useClsx('font-manrope text-xs tracking-wider uppercase color-gray-10')">
                    Open
                  </div>
                </div>
              </div>

              <div
                v-if="leftStock.dayRange.low !== null && leftStock.dayRange.high !== null"
                :class="useClsx('mt-6 border-t border-gray-7 border-solid pt-6')"
              >
                <div :class="useClsx('font-manrope mb-3 text-xs tracking-wider uppercase color-gray-10')">
                  Day Range
                </div>
                <div :class="useClsx('relative')">
                  <div :class="useClsx('h-1 rounded-full bg-gray-6 dark:bg-gray-700')" />
                  <div
                    v-if="leftStock.price !== null && leftStock.dayRange.low !== null && leftStock.dayRange.high !== null"
                    :class="useClsx('absolute top-0 left-0 h-1 rounded-full from-olive-12 to-mint-11 bg-gradient-to-r transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]')"
                    :style="{ width: leftBarWidth }"
                  />
                  <div :class="useClsx('mt-2 flex justify-between text-xs')">
                    <span :class="useClsx('font-manrope color-gray-11')">${{
                      leftStock.dayRange.low?.toFixed(2) || 'N/A'
                    }}</span>
                    <span :class="useClsx('font-manrope color-gray-11')">${{
                      leftStock.dayRange.high?.toFixed(2) || 'N/A'
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Bottom card (row 2) -->
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
            <div
              :class="useClsx(boxShadowClass, cardSurfaceLight, cardSurfaceDark, baseClass, 'color-pureBlack w-full min-w-0 h-full overflow-hidden')"
            >
              <div :class="useClsx('grid grid-cols-12 items-start gap-3 sm:gap-6 min-w-0')">
                <div :class="useClsx('col-span-12 sm:col-span-3 min-w-0')">
                  <div
                    :class="useClsx('whitespace-nowrap font-manrope mb-2 text-[clamp(20px,2.4vw,36px)] font-light tracking-wider color-gray-12')"
                  >
                    {{ rightStock.symbol }}
                  </div>
                  <div
                    :class="useClsx('text-nowrap text-truncate font-manrope text-sm tracking-widest uppercase color-gray-10')"
                  >
                    {{ rightStock.name || rightStock.symbol }}
                  </div>
                </div>

                <div :class="useClsx('col-span-12 sm:col-span-4 min-w-0')">
                  <div
                    :class="useClsx('font-manrope mb-2 text-[clamp(24px,2.6vw,40px)] whitespace-nowrap font-light color-gray-12')"
                  >
                    $
                    <NumberTicker :value="rightStock.price!" />
                  </div>
                  <div :class="useClsx('font-manrope text-sm font-light color-gray-10')">
                    {{ rightStock.industry || '—' }}
                  </div>
                </div>

                <div :class="useClsx('col-span-6 sm:col-span-3 min-w-0')">
                  <div
                    v-if="rightStock.change !== null"
                    :class="useClsx('mb-2 flex items-center space-x-3', rightStock.change < 0 ? 'color-crimson-10' : 'color-jade-9')"
                  >
                    <Icon
                      v-if="rightStock.change < 0" name="tabler:trending-down"
                      :class="useClsx('size-5 md:size-6')"
                    />
                    <Icon v-else name="tabler:trending-up" :class="useClsx('size-5 md:size-6')" />
                    <span :class="useClsx('font-manrope text-2xl font-light whitespace-nowrap')">
                      {{ rightStock.change > 0 ? '+' : '' }}
                      <NumberTicker :value="rightStock.change" />
                    </span>
                  </div>
                  <div :class="useClsx('font-manrope text-sm color-gray-10')">
                    ({{ rightStock.changePercent?.toFixed(2) || '0.00' }}%)
                  </div>
                </div>

                <div :class="useClsx('md:hidden col-span-6 sm:col-span-2 text-left sm:text-right min-w-0')">
                  <div :class="useClsx('font-manrope mb-1 text-base sm:text-lg font-light color-gray-12')">
                    ${{ rightStock.open?.toFixed(2) || 'N/A' }}
                  </div>
                  <div :class="useClsx('font-manrope text-xs tracking-wider uppercase color-gray-10')">
                    Open
                  </div>
                </div>
              </div>

              <div
                v-if="rightStock.dayRange.low !== null && rightStock.dayRange.high !== null"
                :class="useClsx('mt-6 border-t border-gray-7 border-solid pt-6')"
              >
                <div :class="useClsx('font-manrope color-gray-10 mb-3 text-xs tracking-wider uppercase text-gray-500')">
                  Day Range
                </div>
                <div :class="useClsx('relative')">
                  <div :class="useClsx('h-1 rounded-full bg-gray-6 dark:bg-gray-700')" />
                  <div
                    v-if="rightStock.price !== null && rightStock.dayRange.low !== null && rightStock.dayRange.high !== null"
                    :class="useClsx('absolute top-0 left-0 h-1 rounded-full from-olive-12 to-mint-11 bg-gradient-to-r transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]')"
                    :style="{ width: rightBarWidth }"
                  />
                  <div :class="useClsx('mt-2 flex justify-between text-xs')">
                    <span :class="useClsx('font-manrope color-gray-11')">${{
                      rightStock.dayRange.low?.toFixed(2) || 'N/A'
                    }}</span>
                    <span :class="useClsx('font-manrope color-gray-11')">${{
                      rightStock.dayRange.high?.toFixed(2) || 'N/A'
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </template>

    <!-- Pager dots (aus dem Flow, beeinflusst die Höhe NICHT) -->
    <div
      v-if="stockData.length > 0"
      :class="useClsx('pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center space-x-3')"
    >
      <div
        v-for="(_, index) in Math.ceil(stockData.length / 2)"
        :key="index"
        :class="useClsx(
          'h-2 rounded-full transition-all duration-800 ease-out',
          index === Math.floor(activeStartIndex / 2)
            ? 'bg-sand-12 w-8 scale-110 shadow-lg'
            : 'bg-gray-8 w-2',
        )"
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
