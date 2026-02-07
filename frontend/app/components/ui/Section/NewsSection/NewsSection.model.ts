export interface NewsTickerItem {
  id: string
  title: string
  excerpt: string
  tag: string
}

export interface NewsSectionContent {
  topBarRightLabel: string
  brand: string
  masthead: string
  straplineLeft: string
  straplineRight: string
  sideLeft: string
  sideRight: string
  bottomLabel: string
  leadTag: string
  leadTitle: string
  leadCopy: string[]
  rightTitle: string
  score: string
  ticker: NewsTickerItem[]
}

export const newsSectionContent: NewsSectionContent = {
  topBarRightLabel: 'VIVEKVISUALS',
  brand: 'TECH PROPHET',
  masthead: 'DAILY PROPHET',
  straplineLeft: 'PRINTED IN SILICON VALLEY',
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
