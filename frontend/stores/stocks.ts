import { defineStore } from 'pinia'

export interface StockQuote {
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

interface FetchOptions {
  refresh?: boolean
  debug?: boolean
}

export const useStocks = defineStore('stocks', () => {
  // --- state ---
  const quotes = ref<StockQuote[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // index of the first item of the currently active pair (even number)
  const activeStartIndex = ref(0)

  // --- getters ---
  const symbols = computed(() => quotes.value.map(q => q.symbol))

  const pairs = computed(() => {
    const list = quotes.value
    const result: { index: number, stocks: [StockQuote, StockQuote] }[] = []
    for (let i = 0; i < list.length; i += 2) {
      const left = list[i]
      const right = list[(i + 1) % list.length]
      if (left && right)
        result.push({ index: i, stocks: [left, right] })
    }
    return result
  })

  const leftStock = computed(() => quotes.value[activeStartIndex.value] || null)
  const rightStock = computed(() => quotes.value[(activeStartIndex.value + 1) % Math.max(1, quotes.value.length)] || null)

  const currentTopSymbol = computed(() => leftStock.value?.symbol || null)
  const currentPairIndex = computed(() => Math.floor(activeStartIndex.value / 2))

  const symbolToIndex = computed(() => {
    const map = new Map<string, number>()
    quotes.value.forEach((q, idx) => map.set(q.symbol, idx))
    return map
  })

  // --- actions ---
  function setActiveStartIndex(index: number) {
    if (!quotes.value.length) {
      activeStartIndex.value = 0
      return
    }
    const normalized = Math.max(0, index)
    // ensure even start index so that we always start at the top item of a pair
    const even = normalized - (normalized % 2)
    activeStartIndex.value = even % quotes.value.length
  }

  function selectSymbol(symbol: string) {
    const idx = symbolToIndex.value.get(symbol)
    if (typeof idx === 'number')
      setActiveStartIndex(idx)
  }

  function nextPair() {
    setActiveStartIndex(activeStartIndex.value + 2)
  }

  function prevPair() {
    const len = quotes.value.length
    if (!len)
      return
    const next = (activeStartIndex.value - 2 + len) % len
    setActiveStartIndex(next)
  }

  function isTopSymbol(symbol: string) {
    return currentTopSymbol.value === symbol
  }

  async function fetchQuotes(options: FetchOptions = {}) {
    try {
      isLoading.value = true
      error.value = null

      const query = new URLSearchParams()
      if (options.refresh)
        query.set('refresh', 'true')
      if (options.debug)
        query.set('debug', 'true')

      const data = await $fetch<StockQuote[]>(`/api/stocks/ai${query.toString() ? `?${query.toString()}` : ''}`)
      quotes.value = Array.isArray(data) ? data : []

      // keep active index valid after refresh
      if (quotes.value.length === 0)
        activeStartIndex.value = 0
      else
        setActiveStartIndex(activeStartIndex.value)
    }
    catch (err: any) {
      error.value = err?.message || 'Failed to load stock quotes'
    }
    finally {
      isLoading.value = false
    }
  }

  async function ensureLoaded() {
    if (!quotes.value.length && !isLoading.value)
      await fetchQuotes()
  }

  return {
    // state
    quotes,
    isLoading,
    error,
    activeStartIndex,

    // getters
    symbols,
    pairs,
    leftStock,
    rightStock,
    currentTopSymbol,
    currentPairIndex,
    isTopSymbol,

    // actions
    fetchQuotes,
    ensureLoaded,
    setActiveStartIndex,
    selectSymbol,
    nextPair,
    prevPair,
  }
})
