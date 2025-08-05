import { consola } from 'consola'

interface StockQuote {
  symbol: string
  price: number | null
  change: number | null
  changePercent: number | null
  fetchedAt: string
  open: number | null
  dayRange: { low: number | null, high: number | null }
  volume: number | null
  debug?: {
    quote: any
    profile: any
    candle?: any
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
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

export default defineEventHandler(async (event): Promise<StockQuote[]> => {
  consola.info('🚀 FINNHUB API endpoint called!')

  const query = getQuery(event)
  const debug = query.debug === 'true'
  const forceRefresh = query.refresh === 'true'

  if (debug)
    consola.info('🔍 Debug mode enabled')

  const storage = useStorage()
  if (forceRefresh) {
    consola.info('🔄 Force refresh enabled - bypassing cache')
    await storage.removeItem(CACHE_KEY)
  }

  const cached = await storage.getItem(CACHE_KEY) as { data: StockQuote[], timestamp: number } | null
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION && !forceRefresh) {
    if (debug)
      consola.info('📦 Returning cached data:', cached.data)
    else consola.info('📦 Returning cached data')
    return cached.data
  }

  consola.info('🔄 Cache miss, fetching fresh data...')
  const config = useRuntimeConfig()
  const apiKey = config.api.finnHub
  if (!apiKey)
    throw createError({ statusCode: 500, statusMessage: 'Finnhub API key not configured' })

  const results: StockQuote[] = []

  for (const symbol of STOCKS) {
    try {
      // 1. Basic quote data
      const quoteResponse = await $fetch<QuoteResponse>(`https://finnhub.io/api/v1/quote`, {
        params: { symbol, token: apiKey },
      })
      // 2. Company profile (for possible frontend expansion)
      const profileResponse = await $fetch(`https://finnhub.io/api/v1/stock/profile2`, {
        params: { symbol, token: apiKey },
      })

      // 3. Candle data (for day volume), always UTC!
      let candleResponse: any = null
      let volume: number | null = null
      try {
        const now = new Date()
        const utcMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0))
        const from = Math.floor(utcMidnight.getTime() / 1000)
        const to = Math.floor(now.getTime() / 1000)

        candleResponse = await $fetch(`https://finnhub.io/api/v1/stock/candle`, {
          params: { symbol, resolution: 'D', from, to, token: apiKey },
        })

        if (
          candleResponse
          && candleResponse.s === 'ok'
          && Array.isArray(candleResponse.v)
          && candleResponse.v.length > 0
        ) {
          // Nehme den letzten Eintrag (heutiges Volumen)
          volume = candleResponse.v[candleResponse.v.length - 1]
        }
      }
      catch (candleError) {
        consola.warn(`Could not fetch candle data for ${symbol}:`, candleError)
      }

      // 4. Compose response
      const stockData: StockQuote = {
        symbol,
        price: quoteResponse?.c ?? null,
        change: quoteResponse?.d ?? null,
        changePercent: quoteResponse?.dp ?? null,
        fetchedAt: new Date().toISOString(),
        open: quoteResponse?.o ?? null,
        dayRange: {
          low: quoteResponse?.l ?? null,
          high: quoteResponse?.h ?? null,
        },
        volume,
      }
      if (debug) {
        stockData.debug = {
          quote: quoteResponse,
          profile: profileResponse,
          candle: candleResponse,
        }
      }
      results.push(stockData)
    }
    catch (error) {
      consola.error(`Error fetching data for ${symbol}:`, error)
      results.push({
        symbol,
        price: null,
        change: null,
        changePercent: null,
        fetchedAt: new Date().toISOString(),
        open: null,
        dayRange: { low: null, high: null },
        volume: null,
      })
    }
  }

  // Cache results
  await storage.setItem(CACHE_KEY, { data: results, timestamp: Date.now() })

  if (debug)
    consola.info('✅ Returning results:', results)
  else consola.info('✅ Returning results:', results.length, 'stocks')
  return results
})
