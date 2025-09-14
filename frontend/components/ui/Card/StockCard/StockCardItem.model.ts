export interface StockQuote {
  symbol: string
  price: number | null
  change: number | null
  changePercent: number | null
  open: number | null
  dayRange: { low: number | null, high: number | null }
  name: string | null
  industry: string | null
}

export function computeRangeWidth(stock: StockQuote | null): string {
  if (
    !stock
    || stock.price === null
    || stock.dayRange.low === null
    || stock.dayRange.high === null
    || stock.dayRange.high === stock.dayRange.low
  ) {
    return '0%'
  }
  const ratio = (stock.price - stock.dayRange.low) / (stock.dayRange.high - stock.dayRange.low)
  const clamped = Math.min(1, Math.max(0, ratio))
  return `${(clamped * 100).toFixed(2)}%`
}


