export interface NewsTickerItem {
  id: string
  title: string
  excerpt: string
  tag: string
}

export interface NewsLeadMeta {
  author: string
  publishedAt: string
  readingTime: string
  category: string
}

export interface NewsFeaturePanel {
  issue: string
  location: string
  updatedAt: string
  status: string
  quote: string
}

export interface NewsFeatureSignal {
  label: string
  value: string
}

export interface NewsSectionContent {
  topBarRightLabel: string
  masthead: string
  straplineLeft: string
  straplineRight: string
  sideLeft: string
  sideRight: string
  bottomLabel: string
  leadTag: string
  leadTitle: string
  leadCopy: string[]
  leadMeta: NewsLeadMeta
  leadTakeaways: string[]
  leadTopics: string[]
  featurePanel: NewsFeaturePanel
  featureSignals: NewsFeatureSignal[]
  rightTitle: string
  score: string
  ticker: NewsTickerItem[]
}

export const newsSectionContent: NewsSectionContent = {
  topBarRightLabel: 'VIVEKVISUALS',
  masthead: 'DAILY PROPHET',
  straplineLeft: 'PRINTED IN COLOGNE,\nMADE OF GOOD TASTE',
  straplineRight: 'ISSUE DATE 02/07/2026',
  sideLeft: 'BREAKING TECH NEWS DAILY',
  sideRight: 'FEBRUARY 7 2026 EDITION',
  bottomLabel: 'CONTINUE READING BELOW',
  leadTag: 'TECH',
  leadTitle: 'NEXT.JS FRAMEWORK DOMINATES',
  leadCopy: [
    'An expanded version that keeps the tone refined and editorial. Without overdoing it, known in creative circles for blending clean UI, smooth motion, and strong storytelling.',
    'Enterprise-focused digital experiences that feel intentional, immersive, and human. Specializing in transforming complex websites into memorable experiences by combining thoughtful design with technical excellence.',
    'The modern web demands more than just functionality. It needs elegance, speed, and accessibility in one system.',
  ],
  leadMeta: {
    author: 'Editorial Desk',
    publishedAt: 'FEBRUARY 9, 2026',
    readingTime: '06 MIN READ',
    category: 'FRAMEWORK',
  },
  leadTakeaways: [
    'Shipping speed now decides whether a product feels premium or outdated.',
    'Design systems only win when performance and accessibility are first-class.',
    'Teams are replacing visual noise with tighter narrative-driven interfaces.',
  ],
  leadTopics: ['NEXT.JS', 'PERFORMANCE', 'MOTION', 'A11Y', 'EDITORIAL UI'],
  featurePanel: {
    issue: 'ISSUE #208',
    location: 'COLOGNE STUDIO',
    updatedAt: 'UPDATED 21:40 CET',
    status: 'LIVE ANALYSIS',
    quote: 'Great products no longer separate aesthetics from engineering discipline.',
  },
  featureSignals: [
    {
      label: 'LCP',
      value: '1.8s',
    },
    {
      label: 'CLS',
      value: '0.03',
    },
    {
      label: 'BUNDLE',
      value: '-18%',
    },
  ],
  rightTitle: 'RECENT MAGICAL WORKS!!',
  score: '5.0',
  ticker: [
    {
      id: 'v1-1',
      title: 'OpenAI Releases GPT-6 with Multimodal Upgrades',
      excerpt: 'Groundbreaking reasoning and real-time generation set a new baseline.',
      tag: 'AI',
    },
    {
      id: 'v1-2',
      title: 'Vercel Ships AI Deployment Workflows',
      excerpt: 'DX and infrastructure now merge into one editorial-grade pipeline.',
      tag: 'PLATFORM',
    },
    {
      id: 'v1-3',
      title: 'TypeScript 6.0 Introduces New Safety Primitives',
      excerpt: 'Teams report fewer regressions with richer static analysis.',
      tag: 'LANGUAGE',
    },
  ],
}
