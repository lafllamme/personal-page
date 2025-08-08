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
  }, 800) // matches your existing 800ms card fade
}

function handlePairClick(pairIndex: number) {
  if (pairIndex !== currentPair.value)
    handleTransition(pairIndex)
}

// Use Nuxt's useAsyncData for automatic loading, error handling, and caching
const { data: stockData, pending, error, refresh } = useAsyncData<StockData[]>(
  'stockcard-data',
  () => $fetch<StockData[]>('/api/stocks/ai'),
  {
    server: true, // Fetch on server for SSR
    lazy: false, // Fetch immediately
    default: () => [], // Default to empty array
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
      // if odd, wrap the right stock to the start so UI never breaks
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
        animationKey.value += 1 // NEW: sync progress animation with autoplay
      }
      isTransitioning.value = false
    }, 800)
  },
  4500,
  { immediate: false },
)

onMounted(() => {
  resume() // Start the interval
})

onUnmounted(() => {
  pause() // Stop the interval
})
</script>

<template>
  <div class="flex flex-col justify-center space-y-6">
    <div class="mb-4">
      <h2 class="font-ginger mb-2 text-5xl color-pureBlack font-light tracking-wide uppercase dark:color-pureWhite">
        MARKET PULSE
      </h2>
      <div class="h-px w-24 bg-gray-12" />
    </div>

    <!-- Pair Navigation - Minimal Lines Style with Smooth Progress -->
    <div v-if="pairs.length" class="mb-2">
      <div class="flex items-center justify-center space-x-12">
        <button
          v-for="(pair, pairIndex) in pairs"
          :key="pairIndex"
          :class="useClsx(
            'relative group transition-all duration-500 ease-out',
            pair.index === currentPair ? 'scale-105' : 'hover:scale-[1.02]',
          )"
          @click="handlePairClick(pair.index)"
        >
          <div class="flex items-center space-x-8">
            <!-- Left Stock -->
            <div
              :class="useClsx(
                'text-center transition-all duration-300',
                pair.index === currentPair ? 'transform -translate-y-1' : '',
              )"
            >
              <div
                :class="useClsx(
                  'text-sm font-light tracking-wider transition-colors duration-300',
                  pair.index === currentPair ? 'color-pureBlack dark:color-pureWhite' : 'color-gray-10 group-hover:color-gray-12',
                )"
              >
                {{ pair.stocks[0]?.symbol }}
              </div>
              <!-- Underline for active -->
              <div
                :class="useClsx(
                  'mt-2 h-px transition-all duration-300',
                  pair.index === currentPair ? 'w-full bg-pureBlack dark:bg-pureWhite' : 'w-0 bg-gray-6 group-hover:w-full',
                )"
              />
            </div>

            <!-- Connection Line with Smooth Progress -->
            <div class="relative h-px w-16">
              <!-- Background line -->
              <div
                :class="useClsx(
                  'absolute top-0 left-0 h-px transition-all duration-300',
                  pair.index === currentPair ? 'w-16 bg-gray-200 dark:bg-gray-700' : 'w-12 bg-gray-300 group-hover:bg-gray-400 dark:bg-gray-600',
                )"
              />
              <!-- Progress line that grows smoothly -->
              <div
                v-if="pair.index === currentPair"
                :key="`line-${animationKey}`"
                class="progress-line dark:bg-white absolute left-0 top-0 h-px bg-pureBlack dark:color-pureWhite"
              />
              <!-- Moving dot that travels smoothly -->
              <div
                v-if="pair.index === currentPair"
                :key="`dot-${animationKey}`"
                class="progress-dot absolute top-1/2 h-1.5 w-1.5 transform rounded-full bg-pureBlack -translate-y-1/2 dark:bg-pureWhite"
              />
            </div>

            <!-- Right Stock -->
            <div
              :class="useClsx(
                'text-center transition-all duration-300',
                pair.index === currentPair ? 'transform -translate-y-1' : '',
              )"
            >
              <div
                :class="useClsx(
                  'text-sm font-light tracking-wider transition-colors duration-300',
                  pair.index === currentPair ? 'color-pureBlack dark:color-pureWhite' : 'color-gray-10 group-hover:color-gray-12',
                )"
              >
                {{ pair.stocks[1]?.symbol }}
              </div>
              <!-- Underline for active -->
              <div
                :class="useClsx(
                  'mt-2 h-px transition-all duration-300',
                  pair.index === currentPair ? 'w-full bg-pureBlack dark:bg-pureWhite' : 'w-0 bg-gray-6 group-hover:w-full',
                )"
              />
            </div>
          </div>
        </button>
      </div>

      <!-- Current pair info -->
      <div class="mt-4 text-center">
        <span class="text-sm color-gray-10 font-light">
          Pair {{ Math.floor(currentPair / 2) + 1 }} of {{ pairs.length }}
        </span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="space-y-6">
      <div
        :class="useClsx(
          'dark:shadow-[0_8px_25px_rgba(255,255,255,0.12),0_3px_10px_rgba(255,255,255,0.08)]',
          'shadow-[0_8px_25px_rgba(0,0,0,0.12),0_3px_10px_rgba(0,0,0,0.08)]',
          'rounded-3xl p-8 backdrop-blur-sm bg-sand-1 dark:bg-sand-10',
        )"
      >
        <div class="animate-pulse">
          <div class="grid grid-cols-12 items-center gap-6">
            <div class="col-span-3">
              <div class="dark:bg-gray-700 mb-2 h-8 rounded bg-gray-6" />
              <div class="dark:bg-gray-700 h-4 rounded bg-gray-6" />
            </div>
            <div class="col-span-4">
              <div class="dark:bg-gray-700 mb-2 h-8 rounded bg-gray-6" />
              <div class="dark:bg-gray-700 h-4 rounded bg-gray-6" />
            </div>
            <div class="col-span-3">
              <div class="dark:bg-gray-700 mb-2 h-6 rounded bg-gray-6" />
              <div class="dark:bg-gray-700 h-4 rounded bg-gray-6" />
            </div>
            <div class="col-span-2">
              <div class="dark:bg-gray-700 mb-1 h-6 rounded bg-gray-6" />
              <div class="dark:bg-gray-700 h-3 rounded bg-gray-6" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="space-y-6">
      <div
        :class="useClsx(
          'dark:shadow-[0_8px_25px_rgba(255,255,255,0.12),0_3px_10px_rgba(255,255,255,0.08)]',
          'shadow-[0_8px_25px_rgba(0,0,0,0.12),0_3px_10px_rgba(0,0,0,0.08)]',
          'rounded-3xl p-8 backdrop-blur-sm bg-sand-1 dark:bg-sand-10',
        )"
      >
        <div class="text-center">
          <Icon name="ri:error-warning-line" class="mx-auto mb-4 size-12 color-gray-10" />
          <p class="font-manrope mb-2 text-lg color-gray-12">
            {{ error }}
          </p>
          <button
            class="font-manrope rounded-lg bg-sand-12 px-4 py-2 color-pureWhite transition-colors hover:bg-sand-11"
            @click="() => refresh()"
          >
            Retry
          </button>
        </div>
      </div>
    </div>

    <!-- Actual Stock Data -->
    <div v-else-if="stockData.length > 0" class="space-y-6">
      <!-- Top Stock Card - Elegant Fade -->
      <div
        v-if="leftStock"
        class="transition-all duration-800 ease-out"
        :class="[
          isTransitioning
            ? 'opacity-0 transform scale-95 blur-sm'
            : 'opacity-100 transform scale-100 blur-0',
        ]"
        :style="{ transitionDelay: '0ms' }"
      >
        <div
          :class="useClsx(
            'dark:shadow-[0_8px_25px_rgba(255,255,255,0.12),0_3px_10px_rgba(255,255,255,0.08)]',
            'shadow-[0_8px_25px_rgba(0,0,0,0.12),0_3px_10px_rgba(0,0,0,0.08)]',
            'rounded-3xl p-8 color-pureBlack backdrop-blur-sm bg-sand-1 dark:bg-olive-3',
          )"
        >
          <div class="grid grid-cols-12 items-center gap-6">
            <div class="col-span-3">
              <div class="font-manrope mb-2 text-4xl color-gray-12 font-light tracking-wider">
                {{ leftStock.symbol }}
              </div>
              <div class="font-manrope text-sm color-gray-10 tracking-widest uppercase">
                NASDAQ
              </div>
            </div>

            <div class="col-span-4">
              <div class="font-manrope mb-2 text-4xl color-gray-12 font-light">
                ${{ leftStock.price?.toFixed(2) || 'N/A' }}
              </div>
              <div class="font-manrope text-sm color-gray-10 font-light">
                {{ leftStock.symbol }}
              </div>
            </div>

            <div class="col-span-3">
              <div
                v-if="leftStock.change !== null"
                :class="useClsx(
                  leftStock.change < 0 ? 'color-crimson-10' : 'color-jade-9',
                  'mb-2 flex items-center space-x-3',
                )"
              >
                <Icon
                  v-if="leftStock.change < 0"
                  name="tabler:trending-down"
                  class="size-5 md:size-6"
                />
                <Icon
                  v-else
                  name="tabler:trending-up"
                  class="size-5 md:size-6"
                />
                <span class="font-manrope text-2xl font-light">
                  {{ leftStock.change > 0 ? '+' : '' }}{{ leftStock.change?.toFixed(2) }}
                </span>
              </div>
              <div class="font-manrope text-sm color-gray-10">
                ({{ leftStock.changePercent?.toFixed(2) || '0.00' }}%)
              </div>
            </div>

            <div class="col-span-2 text-right">
              <div class="font-manrope mb-1 text-lg color-gray-12 font-light">
                ${{ leftStock.open?.toFixed(2) || 'N/A' }}
              </div>
              <div class="font-manrope text-xs color-gray-10 tracking-wider uppercase">
                Open
              </div>
            </div>
          </div>

          <div
            v-if="leftStock.dayRange.low !== null && leftStock.dayRange.high !== null"
            class="mt-6 border-t border-gray-7 border-solid pt-6"
          >
            <div class="font-manrope mb-3 text-xs color-gray-10 tracking-wider uppercase">
              Day Range
            </div>
            <div class="relative">
              <div class="dark:bg-gray-700 h-1 rounded-full bg-gray-6" />
              <div
                v-if="leftStock.price && leftStock.dayRange.low && leftStock.dayRange.high"
                class="absolute top-0 h-1 rounded-full from-olive-12 to-mint-11 bg-gradient-to-r transition-all duration-500"
                :style="{
                  width: `${((leftStock.price - leftStock.dayRange.low) / (leftStock.dayRange.high - leftStock.dayRange.low)) * 100}%`,
                }"
              />
              <div class="mt-2 flex justify-between text-xs">
                <span class="font-manrope color-gray-11">${{ leftStock.dayRange.low?.toFixed(2) || 'N/A' }}</span>
                <span class="font-manrope color-gray-11">${{ leftStock.dayRange.high?.toFixed(2) || 'N/A' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Stock Card - Elegant Fade -->
      <div
        v-if="rightStock"
        class="transition-all duration-800 ease-out"
        :class="[
          isTransitioning
            ? 'opacity-0 transform scale-95 blur-sm'
            : 'opacity-100 transform scale-100 blur-0',
        ]"
        :style="{ transitionDelay: '200ms' }"
      >
        <div
          :class="useClsx(
            'dark:shadow-[0_8px_25px_rgba(255,255,255,0.12),0_3px_10px_rgba(255,255,255,0.08)]',
            'shadow-[0_8px_25px_rgba(0,0,0,0.12),0_3px_10px_rgba(0,0,0,0.08)]',
            'rounded-3xl p-8 color-pureBlack backdrop-blur-sm bg-sand-1 dark:bg-olive-3',
          )"
        >
          <div class="grid grid-cols-12 items-center gap-6">
            <div class="col-span-3">
              <div class="font-manrope mb-2 text-4xl color-gray-12 font-light tracking-wider">
                {{ rightStock.symbol }}
              </div>
              <div class="font-manrope text-sm color-gray-10 tracking-widest uppercase">
                NASDAQ
              </div>
            </div>

            <div class="col-span-4">
              <div class="font-manrope mb-2 text-4xl color-gray-12 font-light">
                ${{ rightStock.price?.toFixed(2) || 'N/A' }}
              </div>
              <div class="font-manrope text-sm color-gray-10 font-light">
                {{ rightStock.symbol }}
              </div>
            </div>

            <div class="col-span-3">
              <div
                v-if="rightStock.change !== null"
                :class="useClsx(
                  rightStock.change < 0 ? 'color-crimson-10' : 'color-jade-9',
                  'mb-2 flex items-center space-x-3',
                )"
              >
                <Icon
                  v-if="rightStock.change < 0"
                  name="tabler:trending-down"
                  class="size-5 md:size-6"
                />
                <Icon
                  v-else
                  name="tabler:trending-up"
                  class="size-5 md:size-6"
                />
                <span class="font-manrope text-2xl font-light">
                  {{ rightStock.change > 0 ? '+' : '' }}{{ rightStock.change?.toFixed(2) }}
                </span>
              </div>
              <div class="font-manrope text-sm color-gray-10">
                ({{ rightStock.changePercent?.toFixed(2) || '0.00' }}%)
              </div>
            </div>

            <div class="col-span-2 text-right">
              <div class="font-manrope mb-1 text-lg color-gray-12 font-light">
                ${{ rightStock.open?.toFixed(2) || 'N/A' }}
              </div>
              <div class="font-manrope text-xs color-gray-10 tracking-wider uppercase">
                Open
              </div>
            </div>
          </div>

          <div
            v-if="rightStock.dayRange.low !== null && rightStock.dayRange.high !== null"
            class="mt-6 border-t border-gray-7 border-solid pt-6"
          >
            <div class="font-manrope text-gray-500 mb-3 text-xs tracking-wider uppercase">
              Day Range
            </div>
            <div class="relative">
              <div class="h-1 rounded-full bg-gray-6" />
              <div
                v-if="rightStock.price && rightStock.dayRange.low && rightStock.dayRange.high"
                class="absolute top-0 h-1 rounded-full from-olive-12 to-mint-11 bg-gradient-to-r transition-all duration-500"
                :style="{
                  width: `${((rightStock.price - rightStock.dayRange.low) / (rightStock.dayRange.high - rightStock.dayRange.low)) * 100}%`,
                }"
              />
              <div class="mt-2 flex justify-between text-xs">
                <span class="font-manrope color-gray-11">${{ rightStock.dayRange.low?.toFixed(2) || 'N/A' }}</span>
                <span class="font-manrope color-gray-11">${{ rightStock.dayRange.high?.toFixed(2) || 'N/A' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Animated Progress Indicators -->
    <div v-if="stockData.length > 0" class="mt-8 flex justify-center space-x-3">
      <div
        v-for="(_, index) in Math.ceil(stockData.length / 2)"
        :key="index"
        class="h-2 rounded-full transition-all duration-800 ease-out"
        :class="[
          index === Math.floor(currentPair / 2)
            ? 'bg-sand-12 w-8 scale-110 shadow-lg'
            : 'bg-gray-8 w-2',
        ]"
        :style="{ transitionDelay: `${index * 100}ms` }"
      />
    </div>
  </div>
</template>

<style scoped>
@keyframes growLine {
  0% {
    width: 0;
  }
  100% {
    width: 4rem;
  }
}

@keyframes moveDot {
  0% {
    left: -3px;
  }
  100% {
    left: calc(4rem - 3px);
  }
}

.progress-line {
  animation: growLine 4.5s linear forwards;
}

.progress-dot {
  animation: moveDot 4.5s linear forwards;
}
</style>
