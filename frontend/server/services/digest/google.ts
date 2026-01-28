import type { SourcePreset } from './types'

export interface GoogleNewsParams {
  mode: 'top' | 'search' | 'topic' | 'topic-section'
  query?: string
  topicId?: string
  sectionId?: string
  hl?: string
  gl?: string
  ceid?: string
}

export interface GoogleNewsPresetRequest {
  preset?: SourcePreset
  mode?: GoogleNewsParams['mode']
  query?: string
  topicId?: string
  sectionId?: string
  hl?: string
  gl?: string
  ceid?: string
}

export function buildGoogleNewsUrl(opts: GoogleNewsParams): string | undefined {
  const base = 'https://news.google.com/rss'
  let path = ''

  if (opts.mode === 'search') {
    if (!opts.query)
      return undefined
    path = `/search?q=${encodeURIComponent(opts.query)}`
  } else if (opts.mode === 'topic') {
    if (!opts.topicId)
      return undefined
    path = `/topics/${encodeURIComponent(opts.topicId)}`
  } else if (opts.mode === 'topic-section') {
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

export function resolveGoogleParams(input: GoogleNewsPresetRequest) {
  const preset = input.preset
  const mode = input.mode ?? preset?.googleMode ?? 'search'
  const query = input.query ?? preset?.googleQuery
  const topicId = input.topicId ?? preset?.googleTopicId
  const sectionId = input.sectionId ?? preset?.googleSectionId
  const hl = input.hl ?? preset?.googleHl ?? 'de-DE'
  const gl = input.gl ?? preset?.googleGl ?? 'DE'
  const ceid = input.ceid ?? preset?.googleCeid

  return { mode, query, topicId, sectionId, hl, gl, ceid }
}
