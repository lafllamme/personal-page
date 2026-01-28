import type { NormalizedItem } from '../../services/digest/types'
import { buildGoogleNewsUrl, resolveGoogleParams } from '../../services/digest/google'
import { presets } from '../../services/digest/presets'
import { fetchRssItems } from '../../services/digest/rss'

function shouldExclude(_item: NormalizedItem): boolean {
  return false
}

function asString(value: unknown): string | undefined {
  if (typeof value !== 'string')
    return undefined
  const trimmed = value.trim()
  return trimmed || undefined
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

  const fetched: NormalizedItem[] = []
  const errors: { sourceId: string, message: string }[] = []

  const presetId = asString(query.presetId)
  const preset = presetId ? presets.find(item => item.id === presetId) : undefined

  const resolved = resolveGoogleParams({
    preset,
    mode: asString(query.googleMode) as any,
    query: asString(query.googleQuery),
    topicId: asString(query.googleTopicId),
    sectionId: asString(query.googleSectionId),
    hl: asString(query.googleHl),
    gl: asString(query.googleGl),
    ceid: asString(query.googleCeid),
  })

  const googleUrl = buildGoogleNewsUrl(resolved)

  if (!googleUrl) {
    errors.push({ sourceId: preset?.id ?? 'google-custom', message: 'Invalid Google News query' })
  }

  const runtimeSource = googleUrl
    ? {
        id: preset?.id ?? 'google-custom',
        name: preset?.name ?? 'Google News',
        type: 'rss' as const,
        url: googleUrl,
        language: preset?.language ?? (resolved.hl?.startsWith('de') ? 'de' : 'en'),
        topics: preset?.topics ?? ['tech', 'news'],
        weight: preset?.weight ?? 0.8,
      }
    : undefined

  if (runtimeSource) {
    try {
      const items = await fetchRssItems(runtimeSource)
      fetched.push(...items)
    }
    catch (err: any) {
      errors.push({ sourceId: runtimeSource.id, message: err?.message ?? 'Unknown error' })
      console.warn(`[digest][fetch] ${runtimeSource.id} failed`, err)
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
      sourcesRequested: runtimeSource ? 1 : 0,
      sourcesSucceeded: runtimeSource ? Math.max(0, 1 - errors.length) : 0,
      itemsTotal: fetched.length,
      itemsReturned: Math.min(clean.length, limit),
      itemsExcluded: recent.length - clean.length,
      errors,
      presets: presets.map(source => ({
        id: source.id,
        name: source.name,
        googleMode: source.googleMode,
        googleQuery: source.googleQuery,
        googleTopicId: source.googleTopicId,
        googleSectionId: source.googleSectionId,
        googleHl: source.googleHl,
        googleGl: source.googleGl,
        googleCeid: source.googleCeid,
        language: source.language,
        topics: source.topics,
      })),
    },
    items: clean.slice(0, limit),
  }
})
