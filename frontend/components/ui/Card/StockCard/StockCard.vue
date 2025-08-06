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
let intervalId: number | null = null

// Use Nuxt's useAsyncData for automatic loading, error handling, and caching
const { data: stockData, pending, error, refresh } = useAsyncData<StockData[]>(
  'stockcard-data',
  () => $fetch<StockData[]>('/api/stocks/ai'),
  {
    server: true, // Fetch on server for SSR
    lazy: false, // Fetch immediately
    default: () => [], // Default to empty array
  }
)

const leftStock = computed(() => stockData.value?.[currentPair.value] || null)
const rightStock = computed(() => stockData.value?.[(currentPair.value + 1) % (stockData.value?.length || 0)] || null)

function formatMarketCap(cap: number): string {
  if (cap > 1000000)
    return `${(cap / 1000000).toFixed(1)}T`
  if (cap > 1000)
    return `${(cap / 1000).toFixed(1)}B`
  return `${cap.toFixed(1)}M`
}

function startInterval() {
  intervalId = window.setInterval(() => {
    isTransitioning.value = true
    setTimeout(() => {
      if (stockData.value.length > 0) {
        currentPair.value = (currentPair.value + 2) % stockData.value.length
      }
      isTransitioning.value = false
    }, 800)
  }, 4500)
}

onMounted(() => {
  // Start the rotation interval
  startInterval()
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="flex flex-col justify-center space-y-6">
    <div class="mb-4">
      <h2 class="font-ginger mb-2 text-5xl font-light tracking-wide uppercase">
        MARKET PULSE
      </h2>
      <div class="h-px w-24 bg-gray-12" />
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
              <div class="mb-2 h-8 bg-gray-200 rounded dark:bg-gray-700" />
              <div class="h-4 bg-gray-200 rounded dark:bg-gray-700" />
            </div>
            <div class="col-span-4">
              <div class="mb-2 h-8 bg-gray-200 rounded dark:bg-gray-700" />
              <div class="h-4 bg-gray-200 rounded dark:bg-gray-700" />
            </div>
            <div class="col-span-3">
              <div class="mb-2 h-6 bg-gray-200 rounded dark:bg-gray-700" />
              <div class="h-4 bg-gray-200 rounded dark:bg-gray-700" />
            </div>
            <div class="col-span-2">
              <div class="mb-1 h-6 bg-gray-200 rounded dark:bg-gray-700" />
              <div class="h-3 bg-gray-200 rounded dark:bg-gray-700" />
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
          <p class="text-lg color-gray-12 mb-2">{{ error }}</p>
          <button
            @click="() => refresh()"
            class="px-4 py-2 bg-sand-12 color-pureWhite rounded-lg hover:bg-sand-11 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    </div>

    <!-- Stock Data -->
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
            'rounded-3xl p-8 color-pureBlack backdrop-blur-sm bg-sand-1 dark:bg-sand-10',
          )"
        >
          <div class="grid grid-cols-12 items-center gap-6">
            <div class="col-span-3">
              <div class="mb-2 text-4xl color-gray-12 font-light tracking-wider">
                {{ leftStock.symbol }}
              </div>
              <div class="text-sm color-gray-10 tracking-widest uppercase">
                NASDAQ
              </div>
            </div>

            <div class="col-span-4">
              <div class="mb-2 text-4xl color-gray-12 font-light">
                ${{ leftStock.price?.toFixed(2) || 'N/A' }}
              </div>
              <div class="text-sm color-gray-10 font-light">
                {{ leftStock.symbol }}
              </div>
            </div>

            <div class="col-span-3">
              <div
                v-if="leftStock.change !== null"
                class="mb-2 flex items-center space-x-3"
                :class="[
                  leftStock.change < 0 ? 'color-crimson-10' : 'color-mint-10',
                ]"
              >
                <Icon
                  v-if="leftStock.change < 0"
                  name="tabler:trending-down"
                  class="size-5"
                />
                <Icon
                  v-else
                  name="tabler:trending-up"
                  class="size-5"
                />
                <span class="text-2xl font-light">
                  {{ leftStock.change > 0 ? '+' : '' }}{{ leftStock.change?.toFixed(2) }}
                </span>
              </div>
              <div class="text-sm color-gray-10">
                ({{ leftStock.changePercent?.toFixed(2) || '0.00' }}%)
              </div>
            </div>

            <div class="col-span-2 text-right">
              <div class="mb-1 text-lg color-gray-12 font-light">
                ${{ leftStock.open?.toFixed(2) || 'N/A' }}
              </div>
              <div class="text-xs color-gray-10 tracking-wider uppercase">
                Open
              </div>
            </div>
          </div>

          <div v-if="leftStock.dayRange.low !== null && leftStock.dayRange.high !== null" class="mt-6 border-t border-gray-7 border-solid pt-6">
            <div class="mb-3 text-xs color-gray-10 tracking-wider uppercase">
              Day Range
            </div>
            <div class="relative">
              <div class="bg-gray-200 h-1 rounded-full dark:bg-gray-700" />
              <div
                v-if="leftStock.price && leftStock.dayRange.low && leftStock.dayRange.high"
                class="absolute top-0 h-1 rounded-full from-olive-12 to-sand-5 bg-gradient-to-r transition-all duration-500"
                :style="{
                  width: `${((leftStock.price - leftStock.dayRange.low) / (leftStock.dayRange.high - leftStock.dayRange.low)) * 100}%`,
                }"
              />
              <div class="text-gray-500 mt-2 flex justify-between text-xs">
                <span>${{ leftStock.dayRange.low?.toFixed(2) || 'N/A' }}</span>
                <span>${{ leftStock.dayRange.high?.toFixed(2) || 'N/A' }}</span>
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
            'rounded-3xl p-8 color-pureBlack backdrop-blur-sm bg-sand-1 dark:bg-sand-10',
          )"
        >
          <div class="grid grid-cols-12 items-center gap-6">
            <div class="col-span-3">
              <div class="mb-2 text-4xl font-light tracking-wider">
                {{ rightStock.symbol }}
              </div>
              <div class="text-sm color-gray-10 tracking-widest uppercase">
                NASDAQ
              </div>
            </div>

            <div class="col-span-4">
              <div class="mb-2 text-4xl color-gray-12 font-light">
                ${{ rightStock.price?.toFixed(2) || 'N/A' }}
              </div>
              <div class="text-sm color-gray-10 font-light">
                {{ rightStock.symbol }}
              </div>
            </div>

            <div class="col-span-3">
              <div
                v-if="rightStock.change !== null"
                class="mb-2 flex items-center space-x-3"
                :class="[
                  rightStock.change < 0 ? 'color-crimson-10' : 'color-mint-10',
                ]"
              >
                <Icon
                  v-if="rightStock.change < 0"
                  name="tabler:trending-down"
                  class="size-5"
                />
                <Icon
                  v-else
                  name="tabler:trending-up"
                  class="size-5"
                />
                <span class="text-2xl font-light">
                  {{ rightStock.change > 0 ? '+' : '' }}{{ rightStock.change?.toFixed(2) }}
                </span>
              </div>
              <div class="text-sm color-gray-10">
                ({{ rightStock.changePercent?.toFixed(2) || '0.00' }}%)
              </div>
            </div>

            <div class="col-span-2 text-right">
              <div class="mb-1 text-lg font-light">
                ${{ rightStock.open?.toFixed(2) || 'N/A' }}
              </div>
              <div class="text-gray-500 text-xs tracking-wider uppercase">
                Open
              </div>
            </div>
          </div>

          <div v-if="rightStock.dayRange.low !== null && rightStock.dayRange.high !== null" class="mt-6 border-t border-gray-7 border-solid pt-6">
            <div class="text-gray-500 mb-3 text-xs tracking-wider uppercase">
              Day Range
            </div>
            <div class="relative">
              <div class="bg-gray-700 h-1 rounded-full" />
              <div
                v-if="rightStock.price && rightStock.dayRange.low && rightStock.dayRange.high"
                class="absolute top-0 h-1 rounded-full from-olive-12 to-sand-5 bg-gradient-to-r transition-all duration-500"
                :style="{
                  width: `${((rightStock.price - rightStock.dayRange.low) / (rightStock.dayRange.high - rightStock.dayRange.low)) * 100}%`,
                }"
              />
              <div class="mt-2 flex justify-between text-xs color-gray-10">
                <span>${{ rightStock.dayRange.low?.toFixed(2) || 'N/A' }}</span>
                <span>${{ rightStock.dayRange.high?.toFixed(2) || 'N/A' }}</span>
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
