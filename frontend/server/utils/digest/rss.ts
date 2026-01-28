import type { NormalizedItem, SourceConfig } from './types'
import { createHash } from 'node:crypto'
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
    return rssItems.map((item) => {
      const title = item?.title?.['#text'] ?? item?.title ?? ''
      const url = item?.link?.['#text'] ?? item?.link ?? ''
      const publishedAt = toIsoDate(item?.pubDate ?? item?.published ?? item?.updated)
      const excerpt = stripHtml(item?.description ?? item?.summary)
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
        topics: source.topics,
        raw: item,
      }
    })
  }

  const atomEntries = extractAtomEntries(parsed)
  return atomEntries.map((entry) => {
    const title = entry?.title?.['#text'] ?? entry?.title ?? ''
    const url = getAtomLink(entry)
    const publishedAt = toIsoDate(entry?.published ?? entry?.updated)
    const excerpt = stripHtml(entry?.summary?.['#text'] ?? entry?.summary)
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
      topics: source.topics,
      raw: entry,
    }
  })
}
