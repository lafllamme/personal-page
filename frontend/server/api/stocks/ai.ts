import { consola } from 'consola'

interface StockQuote {
  symbol: string
  price: number | null
  change: number | null
  changePercent: number | null
  fetchedAt: string
  open: number | null
  dayRange: { low: number | null, high: number | null }
  debug?: {
    quote: any
    profile: any
  }
}

interface QuoteResponse {
  c: number
  d: number
  dp: number
  h: number
  l: number
  o: number
  pc: number
  t: number
  tp: number
  s: string
  i: string
}

const STOCKS = [
  'MSFT',
  'GOOGL',
  'NVDA',
  'META',
  'AMZN',
  'AAPL',
  'CRM',
  'PLTR',
  'ADBE',
  'NOW',
]

const CACHE_KEY = 'finnhub-stock-quotes'
const CACHE_DURATION = 60 * 60 * 1000 // 1 h

export default defineEventHandler(async (event): Promise<StockQuote[]> => {
  consola.info('🚀 FINNHUB API endpoint called!')

  const { debug = 'false', refresh = 'false' } = getQuery(event) as Record<string, string>
  const isDebug = debug === 'true'
  const forceRefresh = refresh === 'true'

  const storage = useStorage()
  if (forceRefresh) {
    consola.info('🔄 Force refresh – bypassing cache')
    await storage.removeItem(CACHE_KEY)
  }

  const cached = await storage.getItem(CACHE_KEY) as { data: StockQuote[], timestamp: number } | null
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION && !forceRefresh) {
    if (isDebug)
      consola.info('📦 Returning cached data:', cached.data)
    else consola.info('📦 Returning cached data')
    return cached.data
  }

  consola.info('🔄 Cache miss, fetching fresh data…')
  const apiKey = useRuntimeConfig().api.finnHub
  if (!apiKey)
    throw createError({ statusCode: 500, statusMessage: 'Finnhub API key not configured' })

  const results: StockQuote[] = []

  for (const symbol of STOCKS) {
    try {
      /* 1⃣ Realtime-Quote */
      const quote = await $fetch<QuoteResponse>('https://finnhub.io/api/v1/quote', {
        params: { symbol, token: apiKey },
      })

      /* 2⃣ Company-Profile (optional fürs Frontend) */
      const profile = await $fetch('https://finnhub.io/api/v1/stock/profile2', {
        params: { symbol, token: apiKey },
      })

      /* 3⃣ Compose response */
      const stockData: StockQuote = {
        symbol,
        price: quote?.c ?? null,
        change: quote?.d ?? null,
        changePercent: quote?.dp ?? null,
        fetchedAt: new Date().toISOString(),
        open: quote?.o ?? null,
        dayRange: { low: quote?.l ?? null, high: quote?.h ?? null },
        ...(isDebug && { debug: { quote, profile } }),
      }

      results.push(stockData)
    }
    catch (err) {
      consola.error(`Error fetching ${symbol}:`, err)
      results.push({
        symbol,
        price: null,
        change: null,
        changePercent: null,
        fetchedAt: new Date().toISOString(),
        open: null,
        dayRange: { low: null, high: null },
      })
    }
  }

  await storage.setItem(CACHE_KEY, { data: results, timestamp: Date.now() })
  if (isDebug)
    consola.info('✅ Returning results:', results)
  else consola.info('✅ Returning results:', results.length, 'stocks')
  return results
})
