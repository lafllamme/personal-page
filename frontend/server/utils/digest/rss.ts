import type { NormalizedItem, SourceConfig } from './types'
import { XMLParser } from 'fast-xml-parser'
import { fetchWithRetry } from './fetch'

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  trimValues: true,
})

function asArray<T>(value: T | T[] | undefined): T[] {
  if (!value)
    return []
  return Array.isArray(value) ? value : [value]
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

function toIsoDate(input: string | undefined): string {
  if (!input)
    return new Date().toISOString()
  const parsed = new Date(input)
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString()
}

function createId(sourceId: string, url: string, title: string, publishedAt: string): string {
  return `${sourceId}::${url}::${title}::${publishedAt}`
}

function extractRssItems(feed: any): any[] {
  const items = feed?.rss?.channel?.item
  return asArray(items)
}

function extractAtomEntries(feed: any): any[] {
  const entries = feed?.feed?.entry
  return asArray(entries)
}

function getAtomLink(entry: any): string {
  const links = asArray(entry?.link)
  for (const link of links) {
    const href = link?.['@_href']
    const rel = link?.['@_rel']
    if (href && (!rel || rel === 'alternate'))
      return href
  }
  return ''
}

export async function fetchRssItems(source: SourceConfig): Promise<NormalizedItem[]> {
  const res = await fetchWithRetry(source.url)
  const xml = await res.text()
  const parsed = parser.parse(xml)

  const rssItems = extractRssItems(parsed)
  if (rssItems.length) {
    const mapped = rssItems.map((item) => {
      const title = item?.title?.['#text'] ?? item?.title ?? ''
      const url = item?.link?.['#text'] ?? item?.link ?? ''
      const publishedAt = toIsoDate(item?.pubDate ?? item?.published ?? item?.updated)
      const { text: excerpt, kind: contentKind } = pickContent([
        { value: item?.['content:encoded'], kind: 'content' },
        { value: item?.content, kind: 'content' },
        { value: item?.summary?.['#text'] ?? item?.summary, kind: 'summary' },
        { value: item?.description?.['#text'] ?? item?.description, kind: 'description' },
      ])
      const id = createId(source.id, url, title, publishedAt)
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
    return mapped
  }

  const atomEntries = extractAtomEntries(parsed)
  const mapped = atomEntries.map((entry) => {
    const title = entry?.title?.['#text'] ?? entry?.title ?? ''
    const url = getAtomLink(entry)
    const publishedAt = toIsoDate(entry?.published ?? entry?.updated)
    const { text: excerpt, kind: contentKind } = pickContent([
      { value: entry?.content?.['#text'] ?? entry?.content, kind: 'content' },
      { value: entry?.summary?.['#text'] ?? entry?.summary, kind: 'summary' },
    ])
    const id = createId(source.id, url, title, publishedAt)
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
      raw: entry,
    }
  })
  return mapped
}
