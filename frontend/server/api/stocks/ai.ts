export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const devMode = query.dev === '1'

  const config = useRuntimeConfig()
  const apiKey = config.api.alphaVantage

  const STOCKS = ['MSFT', 'GOOGL', 'NVDA', 'META', 'AMZN', 'AAPL', 'CRM', 'PLTR', 'ADBE', 'NOW']
  const results: any[] = []

  for (const symbol of STOCKS) {
    try {
      const response = await $fetch(`https://www.alphavantage.co/query`, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol,
          apikey: apiKey,
        },
      })
      if (devMode) {
        // Gib das komplette Raw-Objekt zurück – für jeden Symbol
        results.push({ symbol, raw: response })
      }
      else {
        // Normale gemappte Struktur (wie gehabt)
        const quote = response['Global Quote']
        results.push({
          symbol: quote?.['01. symbol'] ?? symbol,
          price: quote?.['05. price'] ? Number.parseFloat(quote['05. price']) : null,
          change: quote?.['09. change'] ? Number.parseFloat(quote['09. change']) : null,
          changePercent: quote?.['10. change percent'] ? Number.parseFloat(quote['10. change percent'].replace('%', '')) : null,
          fetchedAt: new Date().toISOString(),
        })
      }
    }
    catch (error) {
      results.push({
        symbol,
        error: error instanceof Error ? error.message : error,
      })
    }
  }

  return results
})
