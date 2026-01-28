export interface SourceConfig {
  id: string
  name: string
  type: 'rss' | 'json'
  url: string
  language: 'de' | 'en'
  topics: string[]
  weight: number
}

export interface SourcePreset {
  id: string
  name: string
  googleMode: 'search' | 'topic' | 'topic-section' | 'top'
  googleQuery?: string
  googleTopicId?: string
  googleSectionId?: string
  googleHl?: string
  googleGl?: string
  googleCeid?: string
  language: 'de' | 'en'
  topics: string[]
  weight: number
}

export interface NormalizedItem {
  id: string
  sourceId: string
  sourceName: string
  language: string
  title: string
  url: string
  publishedAt: string
  excerpt?: string
  contentKind?: 'content' | 'summary' | 'description'
  contentLength?: number
  topics: string[]
  raw?: Record<string, unknown>
}
