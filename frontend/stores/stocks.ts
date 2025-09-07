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
  // symbol whose button is visually selected (can be second item of the pair)
  const selectedSymbol = ref<string | null>(null)

  // --- autoplay state ---
  const autoplayStepMs = ref(6500)
  const idleResumeMs = ref(1200)
  const isUserInteracting = ref(false)
  const isAutoplayRunning = ref(false)
  let autoplayInterval: ReturnType<typeof setInterval> | null = null
  let resumeTimeout: ReturnType<typeof setTimeout> | null = null

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

  // Which ticker button should appear active
  const activeButtonSymbol = computed(() => selectedSymbol.value || currentTopSymbol.value)

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
    if (typeof idx === 'number') {
      setActiveStartIndex(idx)
      selectedSymbol.value = symbol
    }
  }

  // UI-intent: User wählt aktiv → Autoplay pausieren + Auswahl setzen
  function userSelectSymbol(symbol: string) {
    onInteractStart()
    selectSymbol(symbol)
  }

  function nextPair() {
    setActiveStartIndex(activeStartIndex.value + 2)
    // On autoplay, sync the highlighted button with the top symbol of the pair
    selectedSymbol.value = quotes.value[activeStartIndex.value]?.symbol || null
  }

  function prevPair() {
    const len = quotes.value.length
    if (!len)
      return
    const next = (activeStartIndex.value - 2 + len) % len
    setActiveStartIndex(next)
    selectedSymbol.value = quotes.value[activeStartIndex.value]?.symbol || null
  }

  function isTopSymbol(symbol: string) {
    return currentTopSymbol.value === symbol
  }

  function isActiveButton(symbol: string) {
    return activeButtonSymbol.value === symbol
  }

  // --- Autoplay Steuerung ---
  function startAutoplay(stepMs?: number) {
    if (typeof stepMs === 'number')
      autoplayStepMs.value = stepMs
    stopAutoplay()
    isAutoplayRunning.value = true
    autoplayInterval = setInterval(() => {
      if (isUserInteracting.value)
        return
      nextPair()
    }, autoplayStepMs.value)
  }

  function stopAutoplay() {
    if (autoplayInterval)
      clearInterval(autoplayInterval)
    autoplayInterval = null
    isAutoplayRunning.value = false
  }

  function scheduleAutoplayResume(delay = idleResumeMs.value) {
    if (resumeTimeout)
      clearTimeout(resumeTimeout)
    resumeTimeout = setTimeout(() => {
      if (!isUserInteracting.value)
        startAutoplay()
    }, delay)
  }

  function onInteractStart() {
    isUserInteracting.value = true
    stopAutoplay()
  }

  function onInteractStop(delay = idleResumeMs.value) {
    isUserInteracting.value = false
    scheduleAutoplayResume(delay)
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

      // default highlighted button
      selectedSymbol.value = quotes.value[activeStartIndex.value]?.symbol || null
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
    activeButtonSymbol,
    isActiveButton,
    symbolToIndex,

    // actions
    fetchQuotes,
    ensureLoaded,
    setActiveStartIndex,
    selectSymbol,
    userSelectSymbol,
    nextPair,
    prevPair,
    selectedSymbol,

    // autoplay controls
    autoplayStepMs,
    idleResumeMs,
    isUserInteracting,
    isAutoplayRunning,
    startAutoplay,
    stopAutoplay,
    onInteractStart,
    onInteractStop,
  }
})
