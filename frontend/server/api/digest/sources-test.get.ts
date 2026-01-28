import type { NormalizedItem } from '../../utils/digest/types'
import { fetchRssItems } from '../../utils/digest/rss'
import { sources } from '../../utils/digest/sources'

function shouldExclude(_item: NormalizedItem): boolean {
  return false
}

function parseWindowHours(value: unknown, fallback = 24): number {
  const num = Number(value)
  if (!Number.isFinite(num) || num <= 0)
    return fallback
  return Math.min(num, 72)
}

function parseLimit(value: unknown, fallback = 80): number {
  const num = Number(value)
  if (!Number.isFinite(num) || num <= 0)
    return fallback
  return Math.min(num, 200)
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const windowHours = parseWindowHours(query.windowHours, 24)
  const limit = parseLimit(query.limit, 120)

  const maxSources = 20
  const sourceList = sources.slice(0, maxSources)

  const fetched: NormalizedItem[] = []
  const errors: { sourceId: string, message: string }[] = []

  for (const source of sourceList) {
    if (source.type !== 'rss')
      continue

    try {
      const items = await fetchRssItems(source)
      fetched.push(...items)
    }
    catch (err: any) {
      errors.push({ sourceId: source.id, message: err?.message ?? 'Unknown error' })
      console.warn(`[digest][fetch] ${source.id} failed`, err)
    }
  }

  const cutoff = Date.now() - windowHours * 60 * 60 * 1000
  const recent = fetched.filter(item => new Date(item.publishedAt).getTime() >= cutoff)
  const clean = recent
    .filter(item => !shouldExclude(item))
    .map(item => ({
      ...item,
      hasRichContent: item.contentKind === 'content' || (item.contentLength ?? 0) >= 600,
    }))

  clean.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      windowHours,
      sourcesRequested: sourceList.length,
      sourcesSucceeded: sourceList.length - errors.length,
      itemsTotal: fetched.length,
      itemsReturned: Math.min(clean.length, limit),
      itemsExcluded: recent.length - clean.length,
      errors,
    },
    items: clean.slice(0, limit),
  }
})
