<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

interface StockData {
  symbol: string
  price: number
  change: number
  changePercent: number
  open: number
  dayRange: { low: number, high: number }
  name: string
  industry: string
  marketCap: number
  exchange: string
}

const stockData: StockData[] = [
  {
    symbol: 'MSFT',
    price: 527.75,
    change: -7.89,
    changePercent: -1.473,
    open: 537.18,
    dayRange: { low: 527.24, high: 537.3 },
    name: 'Microsoft Corp',
    industry: 'Technology',
    marketCap: 3982393.3950418625,
    exchange: 'NASDAQ',
  },
  {
    symbol: 'GOOGL',
    price: 194.67,
    change: -0.37,
    changePercent: -0.1897,
    open: 194.71,
    dayRange: { low: 193.885, high: 197.8599 },
    name: 'Alphabet Inc',
    industry: 'Media',
    marketCap: 2388865.6778581655,
    exchange: 'NASDAQ',
  },
  {
    symbol: 'NVDA',
    price: 178.26,
    change: -1.74,
    changePercent: -0.9667,
    open: 179.62,
    dayRange: { low: 175.9, high: 180.26 },
    name: 'NVIDIA Corp',
    industry: 'Semiconductors',
    marketCap: 4382118,
    exchange: 'NASDAQ',
  },
  {
    symbol: 'META',
    price: 763.46,
    change: -12.91,
    changePercent: -1.6629,
    open: 776.445,
    dayRange: { low: 763, high: 783.1299 },
    name: 'Meta Platforms Inc',
    industry: 'Media',
    marketCap: 1948453.8643714185,
    exchange: 'NASDAQ',
  },
  {
    symbol: 'AMZN',
    price: 213.75,
    change: 2.1,
    changePercent: 0.9922,
    open: 213.05,
    dayRange: { low: 212.87, high: 216.3 },
    name: 'Amazon.com Inc',
    industry: 'Retail',
    marketCap: 2295728.914460584,
    exchange: 'NASDAQ',
  },
  {
    symbol: 'AAPL',
    price: 202.92,
    change: -0.43,
    changePercent: -0.2115,
    open: 203.4,
    dayRange: { low: 202.16, high: 205.34 },
    name: 'Apple Inc',
    industry: 'Technology',
    marketCap: 3027193.339376485,
    exchange: 'NASDAQ',
  },
]

const currentPair = ref(0)
const isTransitioning = ref(false)
let intervalId: number | null = null

const leftStock = computed(() => stockData[currentPair.value])
const rightStock = computed(() => stockData[(currentPair.value + 1) % stockData.length])

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
      currentPair.value = (currentPair.value + 2) % stockData.length
      isTransitioning.value = false
    }, 800)
  }, 4500)
}

onMounted(() => {
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
    <div class="mb-8">
      <h2 class="text-gray-900 mb-4 text-4xl font-light tracking-wide">
        MARKET PULSE
      </h2>
      <div class="bg-gray-300 h-px w-24" />
    </div>

    <div class="space-y-6">
      <!-- Top Stock Card - Elegant Fade -->
      <div
        class="transition-all duration-800 ease-out"
        :class="[
          isTransitioning
            ? 'opacity-0 transform scale-95 blur-sm'
            : 'opacity-100 transform scale-100 blur-0',
        ]"
        :style="{ transitionDelay: '0ms' }"
      >
        <div class="bg-white border-gray-100 border rounded-3xl p-8 shadow-xl backdrop-blur-sm">
          <div class="grid grid-cols-12 items-center gap-6">
            <div class="col-span-3">
              <div class="text-gray-900 mb-2 text-4xl font-light tracking-wider">
                {{ leftStock.symbol }}
              </div>
              <div class="text-gray-400 text-sm tracking-widest uppercase">
                {{ leftStock.exchange }}
              </div>
            </div>

            <div class="col-span-4">
              <div class="text-gray-900 mb-2 text-4xl font-light">
                ${{ leftStock.price }}
              </div>
              <div class="text-gray-600 text-sm font-light">
                {{ leftStock.name }}
              </div>
              <div class="text-gray-400 mt-1 text-xs tracking-wider uppercase">
                {{ leftStock.industry }}
              </div>
            </div>

            <div class="col-span-3">
              <div
                class="mb-2 flex items-center space-x-3" :class="[
                  leftStock.change < 0 ? 'text-red-500' : 'text-green-500',
                ]"
              >
                <span class="text-2xl font-light">
                  {{ leftStock.change > 0 ? '+' : '' }}{{ leftStock.change }}
                </span>
              </div>
              <div class="text-gray-500 text-sm">
                ({{ leftStock.changePercent.toFixed(2) }}%)
              </div>
            </div>

            <div class="col-span-2 text-right">
              <div class="text-gray-900 mb-1 text-lg font-light">
                ${{ formatMarketCap(leftStock.marketCap) }}
              </div>
              <div class="text-gray-400 text-xs tracking-wider uppercase">
                Cap
              </div>
            </div>
          </div>

          <div class="border-gray-100 mt-6 border-t pt-6">
            <div class="text-gray-400 mb-3 text-xs tracking-wider uppercase">
              Day Range
            </div>
            <div class="relative">
              <div class="bg-gray-200 h-1 rounded-full" />
              <div
                class="from-blue-500 to-purple-500 absolute top-0 h-1 rounded-full bg-gradient-to-r transition-all duration-500"
                :style="{
                  width: `${((leftStock.price - leftStock.dayRange.low) / (leftStock.dayRange.high - leftStock.dayRange.low)) * 100}%`,
                }"
              />
              <div class="text-gray-500 mt-2 flex justify-between text-xs">
                <span>${{ leftStock.dayRange.low }}</span>
                <span>${{ leftStock.dayRange.high }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Stock Card - Elegant Fade -->
      <div
        class="transition-all duration-800 ease-out" :class="[
          isTransitioning
            ? 'opacity-0 transform scale-95 blur-sm'
            : 'opacity-100 transform scale-100 blur-0',
        ]"
        :style="{ transitionDelay: '200ms' }"
      >
        <div class="bg-gray-900 text-white rounded-3xl p-8 shadow-xl backdrop-blur-sm">
          <div class="grid grid-cols-12 items-center gap-6">
            <div class="col-span-3">
              <div class="mb-2 text-4xl font-light tracking-wider">
                {{ rightStock.symbol }}
              </div>
              <div class="text-gray-400 text-sm tracking-widest uppercase">
                {{ rightStock.exchange }}
              </div>
            </div>

            <div class="col-span-4">
              <div class="mb-2 text-4xl font-light">
                ${{ rightStock.price }}
              </div>
              <div class="text-gray-300 text-sm font-light">
                {{ rightStock.name }}
              </div>
              <div class="text-gray-500 mt-1 text-xs tracking-wider uppercase">
                {{ rightStock.industry }}
              </div>
            </div>

            <div class="col-span-3">
              <div
                class="mb-2 flex items-center space-x-3" :class="[
                  rightStock.change < 0 ? 'text-red-400' : 'text-green-400',
                ]"
              >
                <TrendingDown v-if="rightStock.change < 0" class="h-5 w-5" />
                <TrendingUp v-else class="h-5 w-5" />
                <span class="text-2xl font-light">
                  {{ rightStock.change > 0 ? '+' : '' }}{{ rightStock.change }}
                </span>
              </div>
              <div class="text-gray-400 text-sm">
                ({{ rightStock.changePercent.toFixed(2) }}%)
              </div>
            </div>

            <div class="col-span-2 text-right">
              <div class="mb-1 text-lg font-light">
                ${{ formatMarketCap(rightStock.marketCap) }}
              </div>
              <div class="text-gray-500 text-xs tracking-wider uppercase">
                Cap
              </div>
            </div>
          </div>

          <div class="border-gray-700 mt-6 border-t pt-6">
            <div class="text-gray-500 mb-3 text-xs tracking-wider uppercase">
              Day Range
            </div>
            <div class="relative">
              <div class="bg-gray-700 h-1 rounded-full" />
              <div
                class="from-green-400 to-blue-400 absolute top-0 h-1 rounded-full bg-gradient-to-r transition-all duration-500"
                :style="{
                  width: `${((rightStock.price - rightStock.dayRange.low) / (rightStock.dayRange.high - rightStock.dayRange.low)) * 100}%`,
                }"
              />
              <div class="text-gray-400 mt-2 flex justify-between text-xs">
                <span>${{ rightStock.dayRange.low }}</span>
                <span>${{ rightStock.dayRange.high }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Animated Progress Indicators -->
    <div class="mt-8 flex justify-center space-x-3">
      <div
        v-for="(_, index) in Math.ceil(stockData.length / 2)"
        :key="index"
        class="h-2 rounded-full transition-all duration-800 ease-out" :class="[
          index === Math.floor(currentPair / 2)
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-8 scale-110 shadow-lg'
            : 'bg-gray-300 w-2',
        ]"
        :style="{ transitionDelay: `${index * 100}ms` }"
      />
    </div>
  </div>
</template>
