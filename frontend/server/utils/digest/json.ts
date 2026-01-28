import type { NormalizedItem, SourceConfig } from './types'
import { createHash } from 'node:crypto'
import { fetchWithRetry } from './fetch'

function toIsoDate(input: string | undefined): string {
  if (!input)
    return new Date().toISOString()
  const parsed = new Date(input)
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString()
}

function createId(sourceId: string, url: string, title: string, publishedAt: string): string {
  return createHash('sha256')
    .update(`${sourceId}:${url}:${title}:${publishedAt}`)
    .digest('hex')
}

function stripHtml(input: string | undefined): string | undefined {
  if (!input)
    return undefined
  return input.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

interface ContentPick {
  text?: string
  kind?: 'content' | 'summary' | 'description'
}

function pickContent(candidates: Array<{ value?: string, kind: ContentPick['kind'] }>): ContentPick {
  for (const candidate of candidates) {
    const cleaned = stripHtml(candidate.value)
    if (cleaned)
      return { text: cleaned, kind: candidate.kind }
  }
  return {}
}

function asArray<T>(value: T | T[] | undefined): T[] {
  if (!value)
    return []
  return Array.isArray(value) ? value : [value]
}

export async function fetchJsonItems(source: SourceConfig): Promise<NormalizedItem[]> {
  const res = await fetchWithRetry(source.url)
  let payload: any
  try {
    payload = await res.json()
  } catch {
    const text = await res.text()
    payload = JSON.parse(text)
  }

  const items = asArray(payload?.items ?? payload?.entries ?? payload?.data)

  return items.map((item: any) => {
    const title = item?.title ?? item?.headline ?? ''
    const url = item?.url ?? item?.external_url ?? item?.link ?? ''
    const publishedAt = toIsoDate(
      item?.date_published ?? item?.published ?? item?.updated ?? item?.pubDate ?? item?.date,
    )
    const { text: excerpt, kind: contentKind } = pickContent([
      { value: item?.content_text, kind: 'content' },
      { value: item?.content_html, kind: 'content' },
      { value: item?.summary, kind: 'summary' },
      { value: item?.description, kind: 'description' },
    ])
    const id = item?.id ?? createId(source.id, url, title, publishedAt)

    return {
      id,
      sourceId: source.id,
      sourceName: source.name,
      language: source.language,
      title,
      url,
      publishedAt,
      excerpt,
      contentKind,
      contentLength: excerpt ? excerpt.length : 0,
      topics: source.topics,
      raw: item,
    }
  })
}
