import { consola } from 'consola'

interface StockQuote {
  symbol: string
  price: number | null
  change: number | null
  changePercent: number | null
  fetchedAt: string
}

interface FinnhubQuote {
  c: number // Current price
  d: number // Change
  dp: number // Percent change
  h: number // High price of the day
  l: number // Low price of the day
  o: number // Open price of the day
  pc: number // Previous close price
  t: number // Timestamp
}
const STOCKS = ['MSFT', 'GOOGL', 'NVDA', 'META', 'AMZN', 'AAPL', 'CRM', 'PLTR', 'ADBE', 'NOW']
const CACHE_KEY = 'finnhub-stock-quotes'
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

export default defineEventHandler(async (event): Promise<StockQuote[]> => {
  consola.info('🚀 FINHUB API endpoint called!')

  // Check for debug parameter
  const query = getQuery(event)
  const debug = query.debug === 'true'

  if (debug) {
    consola.info('🔍 Debug mode enabled')
  }

  const storage = useStorage()

  // Check cache first
  const cached = await storage.getItem(CACHE_KEY) as { data: StockQuote[], timestamp: number } | null

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    if (debug) {
      consola.info('📦 Returning cached data:', cached.data)
    }
    else {
      consola.info('📦 Returning cached data')
    }
    return cached.data
  }

  consola.info('🔄 Cache miss, fetching fresh data...')

  // Fetch fresh data
  const config = useRuntimeConfig()
  const apiKey = config.api.finnHub
  consola.info('FINHUB API Key available:', !!apiKey)

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Finnhub API key not configured',
    })
  }

  const results: StockQuote[] = []

  for (const symbol of STOCKS) {
    try {
      consola.info(`Fetching ${symbol} from FINHUB...`)

      // Get basic quote data
      const quoteResponse = await $fetch<FinnhubQuote>(`https://finnhub.io/api/v1/quote`, {
        params: {
          symbol,
          token: apiKey,
        },
      })

      // Get company profile data
      const profileResponse = await $fetch(`https://finnhub.io/api/v1/stock/profile2`, {
        params: {
          symbol,
          token: apiKey,
        },
      })

      // Get real-time price data
      const priceResponse = await $fetch(`https://finnhub.io/api/v1/quote`, {
        params: {
          symbol,
          token: apiKey,
        },
      })

      if (debug) {
        consola.info(`${symbol} - All FINHUB data:`, {
          quote: quoteResponse,
          profile: profileResponse,
          price: priceResponse,
        })
      }

      const response = quoteResponse

      if (debug) {
        consola.info(`${symbol} - Complete FINHUB response:`, {
          symbol,
          currentPrice: response.c,
          change: response.d,
          percentChange: response.dp,
          high: response.h,
          low: response.l,
          open: response.o,
          previousClose: response.pc,
          timestamp: response.t,
          fullResponse: response,
        })
      }
      else {
        consola.info(`${symbol} response:`, response)
      }

      if (response && response.c) {
        results.push({
          symbol,
          price: response.c,
          change: response.d,
          changePercent: response.dp,
          fetchedAt: new Date().toISOString(),
        })
      }
      else {
        consola.info(`${symbol}: No valid response data`)
        results.push({
          symbol,
          price: null,
          change: null,
          changePercent: null,
          fetchedAt: new Date().toISOString(),
        })
      }
    }
    catch (error) {
      consola.error(`Error fetching ${symbol}:`, error)
      // Return empty object for failed requests
      results.push({
        symbol,
        price: null,
        change: null,
        changePercent: null,
        fetchedAt: new Date().toISOString(),
      })
    }
  }

  // Update cache
  await storage.setItem(CACHE_KEY, {
    data: results,
    timestamp: Date.now(),
  })

  if (debug) {
    consola.info('✅ Returning results:', results)
  }
  else {
    consola.info('✅ Returning results:', results.length, 'stocks')
  }
  return results
})
