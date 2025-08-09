<!-- StockCard.vue -->
<script setup lang="ts">
interface StockData {
  symbol: string
  price: number | null
  change: number | null
  changePercent: number | null
  fetchedAt: string
  open: number | null
  dayRange: { low: number | null, high: number | null }
}

const currentPair = ref(0)
const isTransitioning = ref(false)
const animationKey = ref(0)

function handleTransition(newPair: number) {
  isTransitioning.value = true
  setTimeout(() => {
    currentPair.value = newPair
    animationKey.value += 1 // restart progress animation
    isTransitioning.value = false
  }, 500) // brief pause so the dot doesn't linger too long
}

function handlePairClick(pairIndex: number) {
  if (pairIndex !== currentPair.value)
    handleTransition(pairIndex)
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
      stocks: [list[i], list[(i + 1) % list.length]],
    })
  }
  return result
})

const { pause, resume } = useIntervalFn(
  () => {
    isTransitioning.value = true
    setTimeout(() => {
      if (stockData.value?.length) {
        currentPair.value = (currentPair.value + 2) % stockData.value.length
        animationKey.value += 1
      }
      isTransitioning.value = false
    }, 350) // keep pause very short to minimize end-hold
  },
  6500,
  { immediate: false },
)

onMounted(resume)
onUnmounted(pause)

/** Shared classes */
const boxShadowClass = useClsx(
  // light & dark shadows
  'shadow-[0_8px_25px_rgba(0,0,0,0.12),0_3px_10px_rgba(0,0,0,0.08)]',
  'dark:shadow-[0_8px_25px_rgba(255,255,255,0.12),0_3px_10px_rgba(255,255,255,0.08)]',
  // common card chrome
  'rounded-3xl p-8 backdrop-blur-sm',
)

const cardSurfaceLight = useClsx('bg-sand-1')
const cardSurfaceDark = useClsx('dark:bg-olive-2')
</script>

<template>
  <div :class="useClsx('flex flex-col justify-center space-y-6')">
    <div :class="useClsx('mb-4')">
      <h2
        :class="useClsx(
          'font-ginger mb-2 text-5xl font-light tracking-wide uppercase',
          'color-pureBlack dark:color-pureWhite',
        )"
      >
        MARKET PULSE
      </h2>
      <div :class="useClsx('h-px w-24 bg-gray-12')" />
    </div>

    <!-- Pair Navigation - Compact Minimal Lines -->
    <div v-if="pairs.length" :class="useClsx('mb-2')">
      <div :class="useClsx('flex items-center justify-center space-x-6')">
        <button
          v-for="(pair, pairIndex) in pairs"
          :key="pairIndex"
          :class="useClsx(
            'relative group transition-all focus-visible:outline-none focus-visible:ring-red-12 group duration-500 ease-out',
            pair.index === currentPair ? 'scale-105' : 'hover:scale-[1.02]',
          )"
          @click="handlePairClick(pair.index)"
        >
          <div :class="useClsx('flex items-center space-x-4')">
            <!-- Left Stock -->
            <div
              :class="useClsx(
                'text-center transition-all duration-300',
                pair.index === currentPair ? 'transform -translate-y-0.5' : '',
              )"
            >
              <div
                :class="useClsx(
                  'text-xs font-light tracking-wider transition-colors duration-300',
                  pair.index === currentPair
                    ? 'color-pureBlack dark:color-pureWhite'
                    : 'color-gray-10 group-hover:color-gray-12',
                )"
              >
                {{ pair.stocks[0]?.symbol }}
              </div>
              <div
                :class="useClsx(
                  'mt-1 h-px transition-all duration-300',
                  pair.index === currentPair
                    ? 'w-full bg-pureBlack dark:bg-pureWhite'
                    : 'w-0 bg-gray-8 group-hover:w-full',
                )"
              />
            </div>

            <!-- Connector with progress -->
            <div :class="useClsx('relative w-8 h-px')">
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
                :class="useClsx('absolute top-0 left-0 h-px w-8 bg-pureBlack/90 dark:bg-pureWhite/90 progress-line')"
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
                style="left:0; --dot-distance: calc(2rem - 0.375rem)"
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
                  'text-xs font-light tracking-wider transition-colors duration-300',
                  pair.index === currentPair
                    ? 'color-pureBlack dark:color-pureWhite'
                    : 'color-gray-10 group-hover:color-gray-12',
                )"
              >
                {{ pair.stocks[1]?.symbol }}
              </div>
              <div
                :class="useClsx(
                  'mt-1 h-px transition-all duration-300',
                  pair.index === currentPair
                    ? 'w-full bg-pureBlack dark:bg-pureWhite'
                    : 'w-0 bg-gray-8 group-hover:w-full',
                )"
              />
            </div>
          </div>
        </button>
      </div>

      <div :class="useClsx('text-center mt-4')">
        <span :class="useClsx('text-xs font-light text-gray-400 dark:text-gray-500')">
          Pair {{ Math.floor(currentPair / 2) + 1 }} of {{ pairs.length }}
        </span>
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
      <div
        v-if="leftStock"
        :class="useClsx(
          'transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]',
          isTransitioning ? 'opacity-0 transform scale-95 blur-sm' : 'opacity-100 transform scale-100 blur-0',
        )"
        :style="{ transitionDelay: '0ms' }"
      >
        <div :class="useClsx(boxShadowClass, cardSurfaceLight, cardSurfaceDark, 'color-pureBlack')">
          <div :class="useClsx('grid grid-cols-12 items-center gap-6')">
            <div :class="useClsx('col-span-3')">
              <div :class="useClsx('font-manrope mb-2 text-4xl font-light tracking-wider color-gray-12')">
                {{ leftStock.symbol }}
              </div>
              <div :class="useClsx('font-manrope text-sm tracking-widest uppercase color-gray-10')">
                NASDAQ
              </div>
            </div>

            <div :class="useClsx('col-span-4')">
              <div :class="useClsx('font-manrope mb-2 text-4xl font-light color-gray-12')">
                ${{ leftStock.price?.toFixed(2) || 'N/A' }}
              </div>
              <div :class="useClsx('font-manrope text-sm font-light color-gray-10')">
                {{ leftStock.symbol }}
              </div>
            </div>

            <div :class="useClsx('col-span-3')">
              <div
                v-if="leftStock.change !== null"
                :class="useClsx(
                  'mb-2 flex items-center space-x-3',
                  leftStock.change < 0 ? 'color-crimson-10' : 'color-jade-9',
                )"
              >
                <Icon v-if="leftStock.change < 0" name="tabler:trending-down" :class="useClsx('size-5 md:size-6')" />
                <Icon v-else name="tabler:trending-up" :class="useClsx('size-5 md:size-6')" />
                <span :class="useClsx('font-manrope text-2xl font-light')">
                  {{ leftStock.change > 0 ? '+' : '' }}{{ leftStock.change?.toFixed(2) }}
                </span>
              </div>
              <div :class="useClsx('font-manrope text-sm color-gray-10')">
                ({{ leftStock.changePercent?.toFixed(2) || '0.00' }}%)
              </div>
            </div>

            <div :class="useClsx('col-span-2 text-right')">
              <div :class="useClsx('font-manrope mb-1 text-lg font-light color-gray-12')">
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
                v-if="leftStock.price && leftStock.dayRange.low && leftStock.dayRange.high"
                :class="useClsx('absolute top-0 h-1 rounded-full from-olive-12 to-mint-11 bg-gradient-to-r transition-all duration-500')"
                :style="{
                  width: `${((leftStock.price - leftStock.dayRange.low) / (leftStock.dayRange.high - leftStock.dayRange.low)) * 100}%`,
                }"
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

      <!-- Bottom card -->
      <div
        v-if="rightStock"
        :class="useClsx(
          'transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]',
          isTransitioning ? 'opacity-0 transform scale-95 blur-sm' : 'opacity-100 transform scale-100 blur-0',
        )"
        :style="{ transitionDelay: '200ms' }"
      >
        <div :class="useClsx(boxShadowClass, cardSurfaceLight, cardSurfaceDark, 'color-pureBlack')">
          <div :class="useClsx('grid grid-cols-12 items-center gap-6')">
            <div :class="useClsx('col-span-3')">
              <div :class="useClsx('font-manrope mb-2 text-4xl font-light tracking-wider color-gray-12')">
                {{ rightStock.symbol }}
              </div>
              <div :class="useClsx('font-manrope text-sm tracking-widest uppercase color-gray-10')">
                NASDAQ
              </div>
            </div>

            <div :class="useClsx('col-span-4')">
              <div :class="useClsx('font-manrope mb-2 text-4xl font-light color-gray-12')">
                ${{ rightStock.price?.toFixed(2) || 'N/A' }}
              </div>
              <div :class="useClsx('font-manrope text-sm font-light color-gray-10')">
                {{ rightStock.symbol }}
              </div>
            </div>

            <div :class="useClsx('col-span-3')">
              <div
                v-if="rightStock.change !== null"
                :class="useClsx(
                  'mb-2 flex items-center space-x-3',
                  rightStock.change < 0 ? 'color-crimson-10' : 'color-jade-9',
                )"
              >
                <Icon v-if="rightStock.change < 0" name="tabler:trending-down" :class="useClsx('size-5 md:size-6')" />
                <Icon v-else name="tabler:trending-up" :class="useClsx('size-5 md:size-6')" />
                <span :class="useClsx('font-manrope text-2xl font-light')">
                  {{ rightStock.change > 0 ? '+' : '' }}{{ rightStock.change?.toFixed(2) }}
                </span>
              </div>
              <div :class="useClsx('font-manrope text-sm color-gray-10')">
                ({{ rightStock.changePercent?.toFixed(2) || '0.00' }}%)
              </div>
            </div>

            <div :class="useClsx('col-span-2 text-right')">
              <div :class="useClsx('font-manrope mb-1 text-lg font-light color-gray-12')">
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
                v-if="rightStock.price && rightStock.dayRange.low && rightStock.dayRange.high"
                :class="useClsx('absolute top-0 h-1 rounded-full from-olive-12 to-mint-11 bg-gradient-to-r transition-all duration-500')"
                :style="{
                  width: `${((rightStock.price - rightStock.dayRange.low) / (rightStock.dayRange.high - rightStock.dayRange.low)) * 100}%`,
                }"
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
    </div>

    <!-- Pager dots -->
    <div v-if="stockData.length > 0" :class="useClsx('mt-8 flex justify-center space-x-3')">
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
  animation: pulseHalo 1.8s ease-in-out infinite;
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
