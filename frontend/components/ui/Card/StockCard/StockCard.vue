<!-- StockCard.vue -->
<script setup lang="ts">
import NumberTicker from '@/components/ui/Text/NumberTicker/NumberTicker.vue'

interface StockData {
  symbol: string
  price: number | null
  change: number | null
  changePercent: number | null
  fetchedAt: string
  open: number | null
  dayRange: { low: number | null, high: number | null }
  name: string | null
  industry: string | null
}

const currentPair = ref(0)
const animationKey = ref(0)

function handlePairClick(pairIndex: number) {
  if (pairIndex !== currentPair.value) {
    currentPair.value = pairIndex
    animationKey.value += 1
  }
}

// Nuxt useAsyncData
const { data: stockData, pending, error, refresh } = useAsyncData<StockData[]>(
  'stockcard-data',
  () => $fetch<StockData[]>('/api/stocks/ai'),
  {
    server: true,
    lazy: false,
    default: () => [],
  },
)

const leftStock = computed(() => stockData.value?.[currentPair.value] || null)
const rightStock = computed(() => stockData.value?.[(currentPair.value + 1) % (stockData.value?.length || 1)] || null)

const pairs = computed(() => {
  const list = stockData.value || []
  if (!list.length)
    return []
  const result: { index: number, stocks: [StockData, StockData] }[] = []
  for (let i = 0; i < list.length; i += 2) {
    result.push({
      index: i,
      stocks: [list[i]!, list[(i + 1) % list.length]!],
    })
  }
  return result
})

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

const { pause, resume } = useIntervalFn(
  () => {
    if (stockData.value?.length) {
      currentPair.value = (currentPair.value + 2) % stockData.value.length
      animationKey.value += 1
    }
  },
  6500,
  { immediate: false },
)

watch(inView, (v) => {
  if (v)
    resume()
  else pause()
})

onMounted(() => {
  if (inView.value)
    resume()
  // initialize min-heights to prevent initial shrink during first transition
  if (leftCardContentRef.value)
    leftMinHeight.value = (leftCardContentRef.value as HTMLElement).offsetHeight
  if (rightCardContentRef.value)
    rightMinHeight.value = (rightCardContentRef.value as HTMLElement).offsetHeight
})
onUnmounted(pause)

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
</script>

<template>
  <div
    ref="hostRef"
    :class="useClsx('flex flex-col justify-center space-y-4 sm:space-y-6 w-full min-w-0')"
  >
    <div :class="useClsx('mb-4')">
      <h2
        :class="useClsx(
          'font-ginger mb-2 text-[clamp(28px,4.2vw,48px)] font-light tracking-wide uppercase',
          'color-pureBlack dark:color-pureWhite',
        )"
      >
        MARKET PULSE
      </h2>
      <div :class="useClsx('h-px w-24 bg-gray-12')" />
    </div>

    <!-- Pair Navigation - Compact Minimal Lines -->
    <div
      v-if="pairs.length"
      :class="useClsx('mb-1 sm:mb-2')"
    >
      <div
        :class="useClsx(
          'flex [scrollbar-width:none] items-center overflow-x-auto',
          'sm:justify-center gap-3 sm:gap-5 px-2 -mx-2',
          'whitespace-nowrap justify-start',
        )"
      >
        <button
          v-for="(pair, pairIndex) in pairs"
          :key="pairIndex"
          :class="useClsx(
            'relative group rounded-full focus-visible:transition-none transition-all focus-visible:ring duration-500 ease-out',
            'focus-visible:outline-none p-0.5 px-1.5 sm:p-1 sm:px-2 focus-visible:ring-1.5 focus-visible:ring-pureBlack dark:focus-visible:ring-pureWhite',
            pair.index === currentPair ? 'scale-105' : 'hover:scale-[1.02]',
          )"
          @click="handlePairClick(pair.index)"
        >
          <div :class="useClsx('flex items-center gap-3 sm:gap-4')">
            <!-- Left Stock -->
            <div
              :class="useClsx(
                'text-center transition-all duration-300',
                pair.index === currentPair ? 'transform -translate-y-0.5' : '',
              )"
            >
              <div
                :class="useClsx(
                  'text-[10px] sm:text-xs font-light tracking-wider transition-colors duration-300',
                  pair.index === currentPair
                    ? 'color-pureBlack dark:color-pureWhite'
                    : 'color-gray-10 group-hover:color-gray-12',
                )"
              >
                {{ pair.stocks[0]?.symbol }}
              </div>
              <div
                :class="useClsx(
                  'mt-0.5 sm:mt-1 h-px transition-all duration-300',
                  pair.index === currentPair
                    ? 'w-full bg-pureBlack dark:bg-pureWhite'
                    : 'w-0 bg-gray-8 group-hover:w-full',
                )"
              />
            </div>

            <!-- Connector with progress -->
            <div :class="useClsx('relative w-7 sm:w-8 h-px shrink-0')">
              <div
                :class="useClsx(
                  'absolute top-0 left-0 h-px transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  pair.index === currentPair
                    ? 'w-8 bg-gray-8 dark:bg-gray-6'
                    : 'w-6 bg-gray-8 dark:bg-gray-6 group-hover:bg-gray-10 dark:group-hover:bg-gray-5',
                )"
              />
              <!-- Progress line that grows smoothly -->
              <div
                v-if="pair.index === currentPair"
                :key="`line-${animationKey}`"
                :class="useClsx('absolute top-0 left-0 h-px w-7 sm:w-8 bg-pureBlack/90 dark:bg-pureWhite/90 progress-line')"
              />
              <!-- Moving dot that travels smoothly -->
              <div
                v-if="pair.index === currentPair"
                :key="`dot-${animationKey}`"
                :class="useClsx(
                  'absolute top-1/2 -translate-y-1/2 z-10',
                  'h-1.5 w-1.5 rounded-full',
                  'bg-pureBlack dark:bg-pureWhite',
                  'text-pureBlack dark:text-pureWhite',
                  'progress-dot',
                )"
                style="left:0; --dot-distance: calc(1.75rem - 0.375rem)"
              />
            </div>

            <!-- Right Stock -->
            <div
              :class="useClsx(
                'text-center transition-all duration-300',
                pair.index === currentPair ? 'transform -translate-y-0.5' : '',
              )"
            >
              <div
                :class="useClsx(
                  'text-[10px] sm:text-xs font-light tracking-wider transition-colors duration-300',
                  pair.index === currentPair
                    ? 'color-pureBlack dark:color-pureWhite'
                    : 'color-gray-10 group-hover:color-gray-12',
                )"
              >
                {{ pair.stocks[1]?.symbol }}
              </div>
              <div
                :class="useClsx(
                  'mt-0.5 sm:mt-1 h-px transition-all duration-300',
                  pair.index === currentPair
                    ? 'w-full bg-pureBlack dark:bg-pureWhite'
                    : 'w-0 bg-gray-8 group-hover:w-full',
                )"
              />
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="pending" :class="useClsx('space-y-6')">
      <div :class="useClsx(boxShadowClass, cardSurfaceLight, 'dark:bg-sand-10')">
        <div :class="useClsx('animate-pulse')">
          <div :class="useClsx('grid grid-cols-12 items-center gap-6')">
            <div :class="useClsx('col-span-3')">
              <div :class="useClsx('mb-2 h-8 rounded bg-gray-6 dark:bg-gray-700')" />
              <div :class="useClsx('h-4 rounded bg-gray-6 dark:bg-gray-700')" />
            </div>
            <div :class="useClsx('col-span-4')">
              <div :class="useClsx('mb-2 h-8 rounded bg-gray-6 dark:bg-gray-700')" />
              <div :class="useClsx('h-4 rounded bg-gray-6 dark:bg-gray-700')" />
            </div>
            <div :class="useClsx('col-span-3')">
              <div :class="useClsx('mb-2 h-6 rounded bg-gray-6 dark:bg-gray-700')" />
              <div :class="useClsx('h-4 rounded bg-gray-6 dark:bg-gray-700')" />
            </div>
            <div :class="useClsx('col-span-2')">
              <div :class="useClsx('mb-1 h-6 rounded bg-gray-6 dark:bg-gray-700')" />
              <div :class="useClsx('h-3 rounded bg-gray-6 dark:bg-gray-700')" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" :class="useClsx('space-y-6')">
      <div :class="useClsx(boxShadowClass, cardSurfaceLight, 'dark:bg-sand-10')">
        <div :class="useClsx('text-center')">
          <Icon name="ri:error-warning-line" :class="useClsx('mx-auto mb-4 size-12 color-gray-10')" />
          <p :class="useClsx('font-manrope mb-2 text-lg color-gray-12')">
            {{ error }}
          </p>
          <button
            :class="useClsx(
              'font-manrope rounded-lg px-4 py-2 transition-colors',
              'bg-sand-12 hover:bg-sand-11 color-pureWhite',
            )"
            @click="() => refresh()"
          >
            Retry
          </button>
        </div>
      </div>
    </div>

    <!-- Data -->
    <div v-else-if="stockData.length > 0" :class="useClsx('space-y-6')">
      <!-- Top card -->
      <div :style="{ minHeight: leftMinHeight ? `${leftMinHeight}px` : undefined }">
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
          <div v-if="leftStock" :key="leftStock.symbol" ref="leftCardContentRef">
            <div :class="useClsx(boxShadowClass, cardSurfaceLight, cardSurfaceDark, 'color-pureBlack w-full min-w-0')">
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
                  <div :class="useClsx('font-manrope mb-2 text-[clamp(24px,2.6vw,40px)] whitespace-nowrap font-light color-gray-12')">
                    $
                    <NumberTicker
                      :value="leftStock.price!"
                    />
                  </div>
                  <div :class="useClsx('font-manrope text-sm font-light color-gray-10')">
                    {{ leftStock.industry || '—' }}
                  </div>
                </div>

                <div :class="useClsx('col-span-6 sm:col-span-3 min-w-0')">
                  <div
                    v-if="leftStock.change !== null"
                    :class="useClsx(
                      'mb-2 flex items-center space-x-3',
                      leftStock.change < 0 ? 'color-crimson-10' : 'color-jade-9',
                    )"
                  >
                    <Icon v-if="leftStock.change < 0" name="tabler:trending-down" :class="useClsx('size-5 md:size-6')" />
                    <Icon v-else name="tabler:trending-up" :class="useClsx('size-5 md:size-6')" />
                    <span :class="useClsx('font-manrope text-2xl font-light whitespace-nowrap')">
                      {{ leftStock.change > 0 ? '+' : '' }}
                      <NumberTicker
                        :value="leftStock.change"
                      />
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
                    <span :class="useClsx('font-manrope color-gray-11')">
                      ${{ leftStock.dayRange.low?.toFixed(2) || 'N/A' }}
                    </span>
                    <span :class="useClsx('font-manrope color-gray-11')">
                      ${{ leftStock.dayRange.high?.toFixed(2) || 'N/A' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Bottom card -->
      <div :style="{ minHeight: rightMinHeight ? `${rightMinHeight}px` : undefined }">
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
          <div v-if="rightStock" :key="rightStock.symbol" ref="rightCardContentRef">
            <div :class="useClsx(boxShadowClass, cardSurfaceLight, cardSurfaceDark, 'color-pureBlack w-full min-w-0')">
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
                  <div :class="useClsx('font-manrope mb-2 text-[clamp(24px,2.6vw,40px)] whitespace-nowrap font-light color-gray-12')">
                    $
                    <NumberTicker
                      :value="rightStock.price!"
                    />
                  </div>
                  <div :class="useClsx('font-manrope text-sm font-light color-gray-10')">
                    {{ rightStock.industry || '—' }}
                  </div>
                </div>

                <div :class="useClsx('col-span-6 sm:col-span-3 min-w-0')">
                  <div
                    v-if="rightStock.change !== null"
                    :class="useClsx(
                      'mb-2 flex items-center space-x-3',
                      rightStock.change < 0 ? 'color-crimson-10' : 'color-jade-9',
                    )"
                  >
                    <Icon
                      v-if="rightStock.change < 0" name="tabler:trending-down"
                      :class="useClsx('size-5 md:size-6')"
                    />
                    <Icon v-else name="tabler:trending-up" :class="useClsx('size-5 md:size-6')" />
                    <span :class="useClsx('font-manrope text-2xl font-light whitespace-nowrap')">
                      {{ rightStock.change > 0 ? '+' : '' }}
                      <NumberTicker
                        :value="rightStock.change"
                      />
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
                    <span :class="useClsx('font-manrope color-gray-11')">
                      ${{ rightStock.dayRange.low?.toFixed(2) || 'N/A' }}
                    </span>
                    <span :class="useClsx('font-manrope color-gray-11')">
                      ${{ rightStock.dayRange.high?.toFixed(2) || 'N/A' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Pager dots -->
    <div v-if="stockData.length > 0" :class="useClsx('mt-6 md:mt-8 flex justify-center space-x-3')">
      <div
        v-for="(_, index) in Math.ceil(stockData.length / 2)"
        :key="index"
        :class="useClsx(
          'h-2 rounded-full transition-all duration-800 ease-out',
          index === Math.floor(currentPair / 2)
            ? 'bg-sand-12 w-8 scale-110 shadow-lg'
            : 'bg-gray-8 w-2',
        )"
        :style="{ transitionDelay: `${index * 100}ms` }"
      />
    </div>
  </div>
</template>

<style scoped>
/* Smoother, GPU-accelerated animations using transforms */
/* Grow with ease-out, then brief hold at the end */
@keyframes growLine {
  0% {
    transform: scaleX(0);
  }
  96% {
    transform: scaleX(1);
  }
  /* very short hold to avoid long stall */
  100% {
    transform: scaleX(1);
  }
}

/* Dot glides and eases out; timeline is 6.5s with ~0.5s hold at the end */
@keyframes moveDot {
  0% {
    transform: translateY(-50%) translateX(0);
  }
  96% {
    transform: translateY(-50%) translateX(var(--dot-distance, 2rem));
  }
  /* very short hold */
  100% {
    transform: translateY(-50%) translateX(var(--dot-distance, 2rem));
  }
}

.progress-line {
  transform-origin: left center;
  will-change: transform;
  animation: growLine 6.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; /* gentle ease-out */
}

.progress-dot {
  will-change: transform;
  animation: moveDot 6.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  position: relative;
}

/* subtle pulsing halo around the active dot */
.progress-dot::after {
  content: '';
  position: absolute;
  inset: -6px; /* halo radius */
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
