<script lang="ts" setup>
interface StockData {
  symbol: string
  price: number | null
  change: number | null
  changePercent: number | null
  fetchedAt: string
}

// Props for server-side data
interface Props {
  stocks?: StockData[]
}

const props = withDefaults(defineProps<Props>(), {
  stocks: () => [],
})

const stocks = ref<StockData[]>(props.stocks)
const error = ref<string | null>(null)

// Use VueUse's useAsyncData for cleaner data fetching
const { data: refreshedStocks, pending, error: fetchError, execute: refreshStocks } = useAsyncData(
  'stocks',
  () => $fetch<StockData[]>('/api/stocks/ai?debug=true'),
  {
    server: false, // Only fetch on client
    lazy: true, // Don't fetch immediately
  },
)

// Watch for refreshed data and update stocks
watch(refreshedStocks, (newData) => {
  consola.debug('🔄 Stocklist: received data from API:', newData)
  if (newData) {
    consola.debug('✅ Stocklist: updating stocks with', newData.length, 'items')
    stocks.value = newData
  }
})

// Watch for fetch errors
watch(fetchError, (newError) => {
  if (newError) {
    error.value = 'Failed to refresh stock data'
    console.error('Stock refresh error:', newError)
  }
})

// Auto-refresh every 5 minutes using VueUse's useIntervalFn
const { pause, resume } = useIntervalFn(
  refreshStocks,
  5 * 60 * 1000, // 5 minutes
  { immediate: false },
)

onMounted(() => {
  consola.debug('🎯 Stocklist: component mounted, initial stocks:', stocks.value)
  resume() // Start auto-refresh
})

onUnmounted(() => {
  pause() // Stop auto-refresh
})

// Computed for color classes
function getChangeColor(change: number | null) {
  if (change === null)
    return 'text-gray-500'
  return change >= 0 ? 'color-mint-8' : 'color-crimson-10'
}

function getChangeIcon(change: number | null) {
  if (change === null)
    return 'ri:arrow-right-line'
  return change >= 0 ? 'ri:arrow-up-line' : 'ri:arrow-down-line'
}
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <div class="mb-4 flex items-center justify-between">
      <div class="flex flex-col">
        <h3
          :class="useClsx(
            'font-ginger text-4xl color-pureBlack',
            'font-semibold uppercase dark:color-pureWhite',
          )"
        >
          Market Pulse
        </h3>
        <div class="h-px w-3/5 bg-gray-10" />
      </div>

      <div class="flex items-center space-x-2">
        <Icon
          name="ri:refresh-line"
          class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 size-4 cursor-pointer"
          @click="refreshStocks"
        />
        <span class="text-gray-500 text-xs">
          {{ pending ? 'Loading...' : 'Live' }}
        </span>
      </div>
    </div>

    <!-- Dynamic height container with scroll -->
    <div class="[scrollbar-width:none] max-h-xl min-h-0 flex-1 overflow-y-auto">
      <!-- Loading State -->
      <div v-if="pending" class="space-y-3">
        <div v-for="i in 5" :key="i" class="animate-pulse">
          <div class="bg-gray-200 dark:bg-gray-700 h-12 rounded-lg" />
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="py-8 text-center">
        <Icon name="ri:error-warning-line" class="text-red-500 mx-auto mb-2 size-8" />
        <p class="text-red-600 dark:text-red-400">
          {{ error }}
        </p>
        <button
          class="text-white bg-blue-600 hover:bg-blue-700 mt-2 rounded-lg px-4 py-2"
          @click="() => refreshStocks()"
        >
          Retry
        </button>
      </div>

      <!-- Stock List -->
      <div v-else class="overflow-visible space-y-12">
        <div
          v-for="stock in stocks"
          :key="stock.symbol"
          class="flex justify-between border rounded-lg p-4 transition-shadow"
        >
          <!-- Stock Info -->
          <div class="mr-12 flex items-center">
            <div>
              <h4 class="font-manrope text-3xl color-pureBlack dark:color-pureWhite">
                {{ stock.symbol }}
              </h4>
            </div>
          </div>

          <div class="font-manrope text-3xl color-pureBlack font-thin dark:color-pureWhite">
            <span>{{ stock.price ? `$${stock.price.toFixed(2)}` : 'N/A' }}</span>
          </div>

          <!-- Change Info -->
          <div v-if="stock.change !== null && stock.changePercent !== null" class="text-right">
            <div class="flex items-center space-x-1">
              <Icon
                :name="getChangeIcon(stock.change)"
                :class="getChangeColor(stock.change)"
                class="size-4"
              />
              <span :class="getChangeColor(stock.change)" class="font-manrope font-medium">
                {{ stock.change >= 0 ? '+' : '' }}{{ stock.change.toFixed(2) }}
              </span>
            </div>
            <p :class="getChangeColor(stock.change)" class="font-manrope text-sm">
              ({{ stock.changePercent >= 0 ? '+' : '' }}{{ stock.changePercent.toFixed(2) }}%)
            </p>
          </div>

          <!-- No Data State -->
          <div v-else class="text-right">
            <span class="text-gray-400 text-sm">No data</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Last Updated -->
    <div v-if="stocks.length > 0" class="mt-4 text-center">
      <p class="text-gray-500 dark:text-gray-400 text-xs">
        Last updated: {{ new Date().toLocaleTimeString() }}
      </p>
    </div>
  </div>
</template>
