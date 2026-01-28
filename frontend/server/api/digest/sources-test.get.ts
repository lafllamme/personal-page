import type { NormalizedItem } from '../../utils/digest/types'
import { fetchJsonItems } from '../../utils/digest/json'
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

function asBoolean(value: unknown): boolean {
  if (value === 'true' || value === true)
    return true
  if (value === 'false' || value === false)
    return false
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
  if (opts.ceid) {
    params.set('ceid', opts.ceid)
  }
  else if (opts.gl && opts.hl) {
    const lang = opts.hl.split('-')[0] ?? opts.hl
    params.set('ceid', `${opts.gl}:${lang}`)
  }

  const query = params.toString()
  return `${base}${path}${query ? `?${query}` : ''}`
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const windowHours = parseWindowHours(query.windowHours, 24)
  const limit = parseLimit(query.limit, 120)

  const maxSources = 20
  const sourceList = sources.slice(0, maxSources)

  const fetched: NormalizedItem[] = []
  const errors: { sourceId: string, message: string }[] = []

  const useGoogle = asBoolean(query.google)
  const googleOnly = asBoolean(query.googleOnly)
  const googleMode = (asString(query.googleMode) as 'top' | 'search' | 'topic' | 'topic-section' | undefined) ?? 'search'
  const googleQuery = asString(query.googleQuery)
  const googleTopicId = asString(query.googleTopicId)
  const googleSectionId = asString(query.googleSectionId)
  const googleHl = asString(query.googleHl)
  const googleGl = asString(query.googleGl)
  const googleCeid = asString(query.googleCeid)

  const googleUrl = useGoogle
    ? buildGoogleNewsUrl({
        mode: googleMode,
        query: googleQuery,
        topicId: googleTopicId,
        sectionId: googleSectionId,
        hl: googleHl,
        gl: googleGl,
        ceid: googleCeid,
      })
    : undefined

  const runtimeSources = googleOnly ? [] : sourceList
  if (useGoogle) {
    if (googleUrl) {
      runtimeSources.push({
        id: 'google-news',
        name: 'Google News',
        type: 'rss',
        url: googleUrl,
        language: (googleHl?.startsWith('de') ? 'de' : 'en'),
        topics: ['tech', 'news'],
        weight: 0.8,
      })
    }
    else {
      errors.push({ sourceId: 'google-news', message: 'Invalid Google News query' })
    }
  }

  for (const source of runtimeSources) {
    try {
      const items = source.type === 'json'
        ? await fetchJsonItems(source)
        : await fetchRssItems(source)
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
