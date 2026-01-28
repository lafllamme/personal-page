import type { NormalizedItem, SourcePreset } from '../../utils/digest/types'
import { fetchRssItems } from '../../utils/digest/rss'
import { sources } from '../../utils/digest/sources'

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

function buildGoogleNewsUrl(opts: {
  mode: 'top' | 'search' | 'topic' | 'topic-section'
  query?: string
  topicId?: string
  sectionId?: string
  hl?: string
  gl?: string
  ceid?: string
}): string | undefined {
  const base = 'https://news.google.com/rss'
  let path = ''

  if (opts.mode === 'search') {
    if (!opts.query)
      return undefined
    path = `/search?q=${encodeURIComponent(opts.query)}`
  }
  else if (opts.mode === 'topic') {
    if (!opts.topicId)
      return undefined
    path = `/topics/${encodeURIComponent(opts.topicId)}`
  }
  else if (opts.mode === 'topic-section') {
    if (!opts.topicId || !opts.sectionId)
      return undefined
    path = `/topics/${encodeURIComponent(opts.topicId)}/sections/${encodeURIComponent(opts.sectionId)}`
  }

  const params = new URLSearchParams()
  if (opts.hl)
    params.set('hl', opts.hl)
  if (opts.gl)
    params.set('gl', opts.gl)
  if (opts.ceid)
    params.set('ceid', opts.ceid)

  const query = params.toString()
  return `${base}${path}${query ? `?${query}` : ''}`
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const windowHours = parseWindowHours(query.windowHours, 24)
  const limit = parseLimit(query.limit, 120)

  const fetched: NormalizedItem[] = []
  const errors: { sourceId: string, message: string }[] = []

  const presetId = asString(query.presetId)
  const preset = presetId ? sources.find(item => item.id === presetId) : undefined

  const googleMode = (asString(query.googleMode) as SourcePreset['googleMode'] | undefined) ?? preset?.googleMode ?? 'search'
  const googleQuery = asString(query.googleQuery) ?? preset?.googleQuery
  const googleTopicId = asString(query.googleTopicId) ?? preset?.googleTopicId
  const googleSectionId = asString(query.googleSectionId) ?? preset?.googleSectionId
  const googleHl = asString(query.googleHl) ?? preset?.googleHl ?? 'de-DE'
  const googleGl = asString(query.googleGl) ?? preset?.googleGl ?? 'DE'
  const googleCeid = asString(query.googleCeid) ?? preset?.googleCeid

  const googleUrl = buildGoogleNewsUrl({
    mode: googleMode,
    query: googleQuery,
    topicId: googleTopicId,
    sectionId: googleSectionId,
    hl: googleHl || undefined,
    gl: googleGl || undefined,
    ceid: googleCeid || undefined,
  })

  if (!googleUrl) {
    errors.push({ sourceId: preset?.id ?? 'google-custom', message: 'Invalid Google News query' })
  }

  const runtimeSource = googleUrl
    ? {
        id: preset?.id ?? 'google-custom',
        name: preset?.name ?? 'Google News',
        type: 'rss' as const,
        url: googleUrl,
        language: preset?.language ?? (googleHl?.startsWith('de') ? 'de' : 'en'),
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
      presets: sources.map(source => ({
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
