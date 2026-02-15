<script setup lang="ts">
useHead({
  title: 'TechNews Token Exploration',
})

type DensityMode = 'airy' | 'balanced' | 'dense'

interface FontRole {
  role: 'Display' | 'Headline' | 'Body' | 'Meta' | 'Quote'
  family: string
}

interface VariantPalette {
  bg: string
  surface: string
  text: string
  muted: string
  accent: string
  border: string
  surfaceText: string
  surfaceMuted: string
  accentContrast: string
  imageGrayscale: number
}

interface Variant {
  id: string
  pack: string
  basePack: string
  experimentDelta: string
  status: 'winner' | 'candidate' | 'archive'
  name: string
  goal: string
  summary: string
  sourceFolders: string[]
  sourceIdea: string
  fonts: FontRole[]
  density: DensityMode
  displayClass: string
  metricClass: string
  headlineClass: string
  bodyClass: string
  metaClass: string
  quoteClass: string
  colors: {
    light: VariantPalette
    dark: VariantPalette
  }
}

interface AccentPreset {
  id: string
  name: string
  description: string
  source: string
  light: string
  dark: string
}

type DecisionState = '' | 'winner' | 'contender' | 'drop'

const scoreCriteria = [
  { key: 'hierarchy', label: 'Hierarchy', hint: 'first 3 seconds' },
  { key: 'readability', label: 'Readability', hint: 'longform comfort' },
  { key: 'scanability', label: 'Scanability', hint: 'cards + meta rails' },
  { key: 'brandFit', label: 'Brand Fit', hint: 'Swiss + TechNews fit' },
  { key: 'systemFit', label: 'System Fit', hint: 'same layout, stable pattern' },
] as const

type CriterionKey = typeof scoreCriteria[number]['key']

interface VariantEvaluation {
  scores: Record<CriterionKey, number>
  likes: string
  concerns: string
  decision: DecisionState
}

const utilityLinks = [
  'Latest',
  'AI',
  'Software',
  'Security',
  'Infra',
  'Opinion',
]

const comparisonChecks = [
  'Hierarchy in first 3 seconds',
  'Longform readability over 2+ screens',
  'Meta-label clarity under dense cards',
  'CTA visibility without layout drift',
]

const heroStory = {
  kicker: 'TechNews Weekly',
  title: 'Software teams now treat AI governance as a product requirement, not an afterthought',
  excerpt: 'This phase compares typography, spacing, and color behavior under one locked landing layout. Content and module order stay identical across packs.',
  author: 'Mara Stein',
  role: 'Editor in Chief',
  published: 'Feb 14, 2026',
  readTime: '8 min read',
}

const leadStories = [
  {
    tag: 'Architecture',
    title: 'Model gateway patterns replace one-off wrappers in enterprise apps',
    excerpt: 'Teams now standardize routing, logging, and cost controls behind one API contract.',
  },
  {
    tag: 'Engineering',
    title: 'Agent workflows move into CI checks with traceability as default',
    excerpt: 'Release gates include prompt diffs, safety tests, and reproducible evaluation artifacts.',
  },
  {
    tag: 'Product',
    title: 'Latency budgets become visible in roadmap decisions',
    excerpt: 'PM and platform teams align feature scope with inference-time constraints.',
  },
  {
    tag: 'Policy',
    title: 'Procurement asks for model lifecycle evidence before pilot approval',
    excerpt: 'Vendor scorecards now include rollback plans, retention policies, and ownership mapping.',
  },
]

const feedCards = [
  {
    section: 'AI Platform',
    title: 'Open-source eval stacks become default for internal model acceptance',
    image: 'https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
  },
  {
    section: 'Software Delivery',
    title: 'Incident postmortems now include prompt and policy diffs',
    image: 'https://images.pexels.com/photos/16129877/pexels-photo-16129877.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
  },
  {
    section: 'Data Ops',
    title: 'Synthetic QA data pipelines get promoted into the main release lane',
    image: 'https://images.pexels.com/photos/3183145/pexels-photo-3183145.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
  },
]

const marketPulse = [
  { metric: 'Editorial backlog', value: '24 briefs', note: 'Under active review this cycle.' },
  { metric: 'Verified sources', value: '91 refs', note: 'Cross-checked across product, legal, infra.' },
  { metric: 'Critical incidents', value: '03 open', note: 'Awaiting ownership confirmation.' },
  { metric: 'AI policy updates', value: '11 items', note: 'New controls for retention and traceability.' },
  { metric: 'Shipping velocity', value: '+18%', note: 'Compared to previous sprint baseline.' },
]

const longformParagraphs = [
  'Across software organizations, AI is no longer evaluated only by output quality. Teams increasingly score programs by recovery speed, auditability, and the quality of operational handoffs between product and platform.',
  'The most resilient teams separate experimentation from production contracts. They prototype quickly, but once a workflow is customer-facing, they enforce strict schema boundaries, observable runtime paths, and explicit ownership for every exception route.',
  'For this exploration phase, the real signal is whether users can still scan and read confidently when visual tone shifts. If a pack looks strong but harms comprehension, it should not pass to componentization.',
]

const tagCluster = [
  'TechNews',
  'AI Governance',
  'Software Magazine',
  'Release Ops',
  'Infra Watch',
  'Policy Signals',
]

const accentShowcaseItems = [
  {
    title: 'Breaking Signal',
    body: 'Use accent for high-priority updates and urgent editorial markers.',
  },
  {
    title: 'Interactive Focus',
    body: 'Accent should guide click intent through hovers, chips, and primary actions.',
  },
  {
    title: 'System Consistency',
    body: 'Keep accent usage narrow and repeated to preserve Swiss clarity.',
  },
]

const footerColumns = [
  {
    title: 'Sections',
    links: ['AI', 'Engineering', 'Security', 'Product'],
  },
  {
    title: 'Formats',
    links: ['Daily Brief', 'Longform', 'Interviews', 'Research Notes'],
  },
  {
    title: 'Company',
    links: ['About', 'Editorial Standards', 'Advertise', 'Contact'],
  },
]

const accentPresets: AccentPreset[] = [
  {
    id: 'orange-control',
    name: 'Control Orange',
    description: 'Original winner accent for baseline comparison.',
    source: 'P04 OG',
    light: '#FF4D00',
    dark: '#FF4D00',
  },
  {
    id: 'teal-core',
    name: 'Teal Core',
    description: 'Matches Osmo header join button direction.',
    source: 'OsmoHeader',
    light: '#0BD8B6',
    dark: '#0AA88F',
  },
  {
    id: 'radix-teal',
    name: 'Radix Teal 9/11',
    description: 'Swiss-clean teal from COLORSCHEME scale.',
    source: 'Radix Teal',
    light: '#12A594',
    dark: '#0BD8B6',
  },
  {
    id: 'cyan-signal',
    name: 'Cyan Signal',
    description: 'Colder, sharper cyan signal variant.',
    source: 'Radix Cyan',
    light: '#00A2C7',
    dark: '#4CCCE6',
  },
  {
    id: 'neon-teal',
    name: 'Neon Teal',
    description: 'High-energy teal for stronger campaign punch.',
    source: 'Exploration',
    light: '#00D9D2',
    dark: '#31FFF5',
  },
]

const activeAccentPresetId = ref('radix-teal')

const variants = reactive<Variant[]>([
  {
    id: '01',
    pack: 'P04-MPZ01',
    basePack: 'P04',
    experimentDelta: 'Market Pulse metric font only: Druk Bold Trial -> Zalando Sans Expanded. Accent preset: Radix Teal 9/11.',
    status: 'winner',
    name: 'Swiss Signal Orange Clone (MP Zalando)',
    goal: 'OG winner clone with Market Pulse in Zalando Sans Expanded',
    summary: 'Exact Swiss Signal Orange clone; only Market Pulse values switch to Zalando Sans Expanded. Accent is now being explored via live picker.',
    sourceFolders: ['brand', 'run', 'sport', 'estate'],
    sourceIdea: 'Campaign-driven references using orange accents, dense rails, and strong display moments.',
    fonts: [
      { role: 'Display', family: 'Druk Bold Trial' },
      { role: 'Headline', family: 'Clash Display' },
      { role: 'Body', family: 'Manrope' },
      { role: 'Meta', family: 'Space Grotesk' },
      { role: 'Quote', family: 'Libre Baskerville' },
    ],
    density: 'dense',
    displayClass: 'font-druk-bold uppercase',
    metricClass: 'zalando-sans-expanded font-semibold uppercase',
    headlineClass: 'font-clash-regular',
    bodyClass: 'font-manrope',
    metaClass: 'space-grotesk-regular',
    quoteClass: 'font-baskerville italic',
    colors: {
      light: {
        bg: '#F4F1EB',
        surface: '#FFFFFF',
        text: '#111111',
        muted: '#66615A',
        accent: '#12A594',
        border: 'rgba(17, 17, 17, 0.22)',
        surfaceText: '#111111',
        surfaceMuted: '#66615A',
        accentContrast: '#111111',
        imageGrayscale: 0.12,
      },
      dark: {
        bg: '#0B0B0B',
        surface: '#161616',
        text: '#F7F7F7',
        muted: '#A8A8A8',
        accent: '#0BD8B6',
        border: 'rgba(247, 247, 247, 0.2)',
        surfaceText: '#F7F7F7',
        surfaceMuted: '#A8A8A8',
        accentContrast: '#0B0B0B',
        imageGrayscale: 0.24,
      },
    },
  },
])

const activeAccentPreset = computed(() => {
  return accentPresets.find(preset => preset.id === activeAccentPresetId.value) ?? accentPresets[0]
})

function applyAccentPreset(presetId: string): void {
  const preset = accentPresets.find(item => item.id === presetId)
  if (!preset)
    return

  activeAccentPresetId.value = preset.id
  variants[0].colors.light.accent = preset.light
  variants[0].colors.dark.accent = preset.dark
  variants[0].experimentDelta = `Market Pulse metric font only: Druk Bold Trial -> Zalando Sans Expanded. Accent preset: ${preset.name} (${preset.light}/${preset.dark}).`
  variants[0].summary = `Exact Swiss Signal Orange clone with MP Zalando metric. Active accent preset: ${preset.name}.`
}

applyAccentPreset(activeAccentPresetId.value)

function buildInitialEvaluations(): Record<string, VariantEvaluation> {
  const initialEntries = variants.map((variant) => {
    const initialScores = Object.fromEntries(
      scoreCriteria.map(criteria => [criteria.key, 3]),
    ) as Record<CriterionKey, number>

    return [variant.pack, {
      scores: initialScores,
      likes: '',
      concerns: '',
      decision: (variant.status === 'winner' ? 'winner' : '') as DecisionState,
    }]
  })

  return Object.fromEntries(initialEntries) as Record<string, VariantEvaluation>
}

const evaluations = reactive<Record<string, VariantEvaluation>>(buildInitialEvaluations())
const exportStatus = ref<'idle' | 'copied' | 'downloaded' | 'error'>('idle')

const rankedVariants = computed(() => {
  return variants.map((variant) => {
    const scoreState = evaluations[variant.pack]
    const average
      = scoreCriteria.reduce((sum, criteria) => sum + scoreState.scores[criteria.key], 0)
        / scoreCriteria.length

    return {
      pack: variant.pack,
      demoId: variant.id,
      name: variant.name,
      average: Number(average.toFixed(2)),
      decision: scoreState.decision,
    }
  }).sort((a, b) => {
    if (b.average !== a.average)
      return b.average - a.average

    const decisionRank = (decision: DecisionState): number => {
      if (decision === 'winner')
        return 3
      if (decision === 'contender')
        return 2
      if (decision === 'drop')
        return 1
      return 0
    }

    return decisionRank(b.decision) - decisionRank(a.decision)
  })
})

const evaluationPayload = computed(() => {
  return {
    generatedAt: new Date().toISOString(),
    context: {
      page: '/exploration',
      phase: 'phase-3-technews-accent-exploration',
      method: 'single-control-live-accent-picker',
      accentPreset: activeAccentPreset.value.id,
    },
    criteria: scoreCriteria,
    ranking: rankedVariants.value,
    winnerPack: rankedVariants.value[0]?.pack ?? null,
    variants: variants.map((variant) => {
      const scoreState = evaluations[variant.pack]
      const average
        = scoreCriteria.reduce((sum, criteria) => sum + scoreState.scores[criteria.key], 0)
          / scoreCriteria.length

      return {
        demoId: variant.id,
        pack: variant.pack,
        basePack: variant.basePack,
        status: variant.status,
        experimentDelta: variant.experimentDelta,
        name: variant.name,
        sourceFolders: variant.sourceFolders,
        sourceIdea: variant.sourceIdea,
        fonts: variant.fonts,
        density: variant.density,
        scores: scoreState.scores,
        average: Number(average.toFixed(2)),
        decision: scoreState.decision,
        likes: scoreState.likes,
        concerns: scoreState.concerns,
      }
    }),
  }
})

const evaluationJson = computed(() => JSON.stringify(evaluationPayload.value, null, 2))

const densityClassMap: Record<DensityMode, string> = {
  airy: 'space-y-12 md:space-y-16',
  balanced: 'space-y-10 md:space-y-14',
  dense: 'space-y-8 md:space-y-12',
}

function variantStyle(variant: Variant): Record<string, string | number> {
  const { dark, light } = variant.colors

  return {
    '--vx-bg-light': light.bg,
    '--vx-surface-light': light.surface,
    '--vx-text-light': light.text,
    '--vx-muted-light': light.muted,
    '--vx-accent-light': light.accent,
    '--vx-border-light': light.border,
    '--vx-surface-text-light': light.surfaceText,
    '--vx-surface-muted-light': light.surfaceMuted,
    '--vx-accent-contrast-light': light.accentContrast,
    '--vx-image-grayscale-light': light.imageGrayscale,
    '--vx-bg-dark': dark.bg,
    '--vx-surface-dark': dark.surface,
    '--vx-text-dark': dark.text,
    '--vx-muted-dark': dark.muted,
    '--vx-accent-dark': dark.accent,
    '--vx-border-dark': dark.border,
    '--vx-surface-text-dark': dark.surfaceText,
    '--vx-surface-muted-dark': dark.surfaceMuted,
    '--vx-accent-contrast-dark': dark.accentContrast,
    '--vx-image-grayscale-dark': dark.imageGrayscale,
  }
}

function densityClass(mode: DensityMode): string {
  return densityClassMap[mode]
}

async function copyEvaluationJson(): Promise<void> {
  if (!import.meta.client || !navigator?.clipboard)
    return

  try {
    await navigator.clipboard.writeText(evaluationJson.value)
    exportStatus.value = 'copied'
  }
  catch {
    exportStatus.value = 'error'
  }
}

function downloadEvaluationJson(): void {
  if (!import.meta.client)
    return

  const payloadBlob = new Blob([evaluationJson.value], { type: 'application/json;charset=utf-8' })
  const objectUrl = URL.createObjectURL(payloadBlob)
  const anchor = document.createElement('a')
  anchor.href = objectUrl
  anchor.download = `technews-variant-scoring-${new Date().toISOString().slice(0, 10)}.json`
  anchor.click()
  URL.revokeObjectURL(objectUrl)
  exportStatus.value = 'downloaded'
}
</script>

<template>
  <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <div class="mx-auto max-w-[1520px] px-5 pb-28 pt-20 md:px-10">
      <header class="mb-10 border-b border-pureBlack/18 border-solid pb-8 dark:border-pureWhite/18">
        <p class="space-grotesk-regular mb-3 text-[10px] tracking-[0.26em] uppercase opacity-65">
          Phase 3 · Winner Accent Exploration
        </p>
        <h1 class="font-clash-regular text-[clamp(2.2rem,6vw,4.8rem)] leading-[0.95] uppercase">
          TechNews Landing Layout Benchmark
        </h1>
        <p class="mt-4 max-w-4xl text-sm leading-relaxed opacity-75 md:text-base">
          Same layout, same content, same component order. P04-MPZ01 stays fixed as winner control.
          Only accent color changes via live picker so we can lock a final black/white + signal system.
        </p>
      </header>

      <main class="space-y-10 md:space-y-14">
        <section class="border border-pureBlack/18 rounded-2xl border-solid bg-pureWhite p-5 dark:border-pureWhite/18 dark:bg-pureBlack md:p-8">
          <div class="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-pureBlack/18 border-solid pb-4 dark:border-pureWhite/18">
            <div>
              <p class="space-grotesk-regular text-[10px] tracking-[0.22em] uppercase opacity-65">
                Accent Picker
              </p>
              <h2 class="font-cabinet mt-1 text-[clamp(1.3rem,2.4vw,2rem)] leading-tight">
                P04-MPZ01 Signal Color Test
              </h2>
              <p class="mt-2 max-w-3xl text-sm leading-relaxed opacity-75">
                Control layout stays fixed. Select an accent preset and compare hierarchy, scan speed, and CTA pull in light and dark mode.
              </p>
            </div>
            <div class="border border-pureBlack/14 rounded-xl border-solid px-3 py-2 text-xs dark:border-pureWhite/14">
              Active: <strong>{{ activeAccentPreset.name }}</strong> · light {{ activeAccentPreset.light }} · dark {{ activeAccentPreset.dark }}
            </div>
          </div>

          <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <button
              v-for="preset in accentPresets"
              :key="preset.id"
              class="border rounded-xl border-solid bg-transparent px-3 py-3 text-left transition-colors"
              :class="preset.id === activeAccentPresetId ? 'border-pureBlack dark:border-pureWhite' : 'border-pureBlack/20 dark:border-pureWhite/20'"
              @click="applyAccentPreset(preset.id)"
            >
              <div class="mb-2 flex items-center gap-2">
                <span class="h-3 w-3 border border-pureBlack/20 rounded-full border-solid dark:border-pureWhite/20" :style="{ backgroundColor: preset.light }" />
                <span class="h-3 w-3 border border-pureBlack/20 rounded-full border-solid dark:border-pureWhite/20" :style="{ backgroundColor: preset.dark }" />
                <span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">{{ preset.source }}</span>
              </div>
              <p class="font-cabinet text-sm leading-tight">
                {{ preset.name }}
              </p>
              <p class="mt-1 text-xs leading-relaxed opacity-70">
                {{ preset.description }}
              </p>
            </button>
          </div>
        </section>

        <section
          v-for="variant in variants"
          :key="variant.pack"
          :style="variantStyle(variant)"
          class="variant-page [--vx-accent-contrast:var(--vx-accent-contrast-light)] [--vx-accent:var(--vx-accent-light)] [--vx-bg:var(--vx-bg-light)] [--vx-border:var(--vx-border-light)] [--vx-image-grayscale:var(--vx-image-grayscale-light)] [--vx-muted:var(--vx-muted-light)] [--vx-surface-muted:var(--vx-surface-muted-light)] [--vx-surface-text:var(--vx-surface-text-light)] [--vx-surface:var(--vx-surface-light)] [--vx-text:var(--vx-text-light)] rounded-2xl p-4 dark:[--vx-accent-contrast:var(--vx-accent-contrast-dark)] dark:[--vx-accent:var(--vx-accent-dark)] dark:[--vx-bg:var(--vx-bg-dark)] dark:[--vx-border:var(--vx-border-dark)] dark:[--vx-image-grayscale:var(--vx-image-grayscale-dark)] dark:[--vx-muted:var(--vx-muted-dark)] dark:[--vx-surface-muted:var(--vx-surface-muted-dark)] dark:[--vx-surface-text:var(--vx-surface-text-dark)] dark:[--vx-surface:var(--vx-surface-dark)] dark:[--vx-text:var(--vx-text-dark)] lg:p-10 md:p-8"
        >
          <div class="variant-divider mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-solid pb-4">
            <div>
              <p class="variant-muted text-[10px] tracking-[0.22em] uppercase" :class="variant.metaClass">
                Demo {{ variant.id }} · {{ variant.pack }}
              </p>
              <h2 class="mt-1 text-[clamp(1.5rem,2.8vw,2.3rem)] leading-[1.02]" :class="variant.headlineClass">
                {{ variant.name }}
              </h2>
              <p class="variant-muted mt-2 max-w-3xl text-sm leading-relaxed" :class="variant.bodyClass">
                {{ variant.summary }}
              </p>
            </div>
            <div class="variant-surface rounded-xl px-4 py-3">
              <p class="variant-surface-muted text-[10px] tracking-[0.2em] uppercase" :class="variant.metaClass">
                Reference Inputs
              </p>
              <p class="mt-1 text-xs leading-relaxed" :class="variant.bodyClass">
                Folders: {{ variant.sourceFolders.join(', ') }}
              </p>
              <p class="variant-surface-muted mt-1 text-xs leading-relaxed" :class="variant.bodyClass">
                Idea: {{ variant.sourceIdea }}
              </p>
              <p class="variant-surface-muted mt-1 text-xs leading-relaxed" :class="variant.bodyClass">
                Base Pack: {{ variant.basePack }}
              </p>
              <p class="variant-surface-muted mt-1 text-xs leading-relaxed" :class="variant.bodyClass">
                Delta: {{ variant.experimentDelta }}
              </p>
              <p class="mt-2 text-[10px] tracking-[0.16em] uppercase" :class="variant.metaClass">
                Status: {{ variant.status }}
              </p>
              <p class="variant-surface-muted mt-2 text-[10px] tracking-[0.16em] uppercase" :class="variant.metaClass">
                Fonts
              </p>
              <ul class="mt-1 space-y-1">
                <li
                  v-for="font in variant.fonts"
                  :key="`${variant.pack}-${font.role}`"
                  class="text-xs leading-relaxed"
                  :class="variant.bodyClass"
                >
                  <span class="variant-surface-muted" :class="variant.metaClass">{{ font.role }}:</span>
                  {{ font.family }}
                </li>
              </ul>
              <p class="variant-surface-muted mt-2 text-[10px] tracking-[0.16em] uppercase" :class="variant.metaClass">
                Theme Invariants: light + dark
              </p>
            </div>
          </div>

          <div :class="densityClass(variant.density)">
            <section class="variant-surface rounded-xl p-3 md:p-4">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div class="flex flex-wrap items-center gap-3 md:gap-5">
                  <span class="text-[11px] tracking-[0.22em] uppercase" :class="variant.metaClass">TechNews</span>
                  <nav class="flex flex-wrap gap-2">
                    <a
                      v-for="link in utilityLinks"
                      :key="`${variant.pack}-${link}`"
                      href="#"
                      class="variant-surface-muted text-[10px] tracking-[0.18em] uppercase transition-opacity hover:opacity-100"
                      :class="variant.metaClass"
                    >
                      {{ link }}
                    </a>
                  </nav>
                </div>
                <span class="variant-surface-muted text-[10px] tracking-[0.18em] uppercase" :class="variant.metaClass">
                  {{ variant.goal }}
                </span>
              </div>
            </section>

            <section class="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <article class="variant-surface rounded-xl p-5 md:p-7">
                <p class="variant-surface-muted text-[10px] tracking-[0.2em] uppercase" :class="variant.metaClass">
                  {{ heroStory.kicker }}
                </p>
                <h3 class="mt-3 text-[clamp(2.1rem,6.8vw,5.8rem)] leading-[0.9]" :class="variant.displayClass">
                  Software · AI ·
                  <br>
                  News <span class="variant-accent-text">Ledger</span>
                </h3>
                <p class="mt-4 max-w-2xl text-sm leading-relaxed opacity-90 md:text-base" :class="variant.bodyClass">
                  {{ heroStory.excerpt }}
                </p>
                <div class="variant-accent-track mt-4 h-[4px] w-28 rounded-full" />
                <div class="mt-5 flex flex-wrap items-center gap-2">
                  <span class="variant-surface-muted text-[10px] tracking-[0.16em] uppercase" :class="variant.metaClass">{{ heroStory.author }}</span>
                  <span class="variant-surface-muted text-[10px]" :class="variant.metaClass">/</span>
                  <span class="variant-surface-muted text-[10px] tracking-[0.16em] uppercase" :class="variant.metaClass">{{ heroStory.role }}</span>
                  <span class="variant-surface-muted text-[10px]" :class="variant.metaClass">/</span>
                  <span class="variant-surface-muted text-[10px] tracking-[0.16em] uppercase" :class="variant.metaClass">{{ heroStory.published }}</span>
                  <span class="variant-surface-muted text-[10px]" :class="variant.metaClass">/</span>
                  <span class="variant-surface-muted text-[10px] tracking-[0.16em] uppercase" :class="variant.metaClass">{{ heroStory.readTime }}</span>
                </div>
                <div class="mt-5 flex flex-wrap gap-3">
                  <button class="variant-button-ghost px-4 py-2 text-[11px] tracking-[0.16em] uppercase" :class="variant.metaClass">
                    Read Brief
                  </button>
                  <button class="variant-button-solid px-4 py-2 text-[11px] tracking-[0.16em] uppercase" :class="variant.metaClass">
                    Open Coverage
                  </button>
                </div>
              </article>

              <article class="variant-surface rounded-xl p-4 md:p-5">
                <img
                  src="https://images.pexels.com/photos/5474294/pexels-photo-5474294.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=2000"
                  alt="Editorial hero visual"
                  class="variant-image h-64 w-full rounded-lg object-cover md:h-[320px]"
                  loading="lazy"
                  decoding="async"
                >
                <p class="variant-surface-muted mt-3 text-[10px] tracking-[0.16em] uppercase" :class="variant.metaClass">
                  Lead Frame · identical media slot across demos
                </p>
                <p class="mt-2 text-sm leading-relaxed" :class="variant.bodyClass">
                  {{ heroStory.title }}
                </p>
              </article>
            </section>

            <section class="variant-surface rounded-xl p-4 md:p-5">
              <div class="mb-3 flex flex-wrap items-center justify-between gap-3">
                <p class="variant-surface-muted text-[10px] tracking-[0.2em] uppercase" :class="variant.metaClass">
                  Meta Row + Tag Cluster
                </p>
                <p class="variant-surface-muted text-[10px] tracking-[0.16em] uppercase" :class="variant.metaClass">
                  Same content for every pack
                </p>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(tag, tagIdx) in tagCluster"
                  :key="`${variant.pack}-${tag}`"
                  class="variant-chip px-2 py-1 text-[10px] tracking-[0.14em] uppercase"
                  :class="[variant.metaClass, tagIdx === 0 ? 'variant-chip-active' : '']"
                >
                  {{ tag }}
                </span>
              </div>
              <ul class="grid mt-4 gap-2 md:grid-cols-2">
                <li
                  v-for="check in comparisonChecks"
                  :key="`${variant.pack}-${check}`"
                  class="variant-surface-muted text-xs leading-relaxed"
                  :class="variant.bodyClass"
                >
                  {{ check }}
                </li>
              </ul>
            </section>

            <section class="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <article class="variant-surface rounded-xl p-5 md:p-6">
                <p class="variant-surface-muted text-[10px] tracking-[0.2em] uppercase" :class="variant.metaClass">
                  Top Coverage
                </p>
                <div class="mt-3 space-y-3">
                  <article
                    v-for="story in leadStories"
                    :key="`${variant.pack}-${story.title}`"
                    class="variant-card-inner border rounded-lg border-solid p-3"
                  >
                    <p class="variant-surface-muted text-[10px] tracking-[0.16em] uppercase" :class="variant.metaClass">
                      {{ story.tag }}
                    </p>
                    <h4 class="mt-1 text-lg leading-tight" :class="variant.headlineClass">
                      {{ story.title }}
                    </h4>
                    <p class="variant-surface-muted mt-1 text-sm leading-relaxed" :class="variant.bodyClass">
                      {{ story.excerpt }}
                    </p>
                  </article>
                </div>
              </article>

              <article class="variant-surface rounded-xl p-5 md:p-6">
                <p class="variant-surface-muted text-[10px] tracking-[0.2em] uppercase" :class="variant.metaClass">
                  Market Pulse
                </p>
                <ul class="mt-3 space-y-2">
                  <li
                    v-for="item in marketPulse"
                    :key="`${variant.pack}-${item.metric}`"
                    class="variant-card-inner border rounded-lg border-solid p-3"
                  >
                    <div class="mb-1 flex items-center justify-between gap-2">
                      <p class="variant-surface-muted text-[10px] tracking-[0.16em] uppercase" :class="variant.metaClass">
                        {{ item.metric }}
                      </p>
                      <span class="variant-accent-dot h-2 w-2 rounded-full" />
                    </div>
                    <p class="mt-1 text-[1.35rem] leading-none" :class="variant.metricClass">
                      {{ item.value }}
                    </p>
                    <p class="variant-surface-muted mt-1 text-xs leading-relaxed" :class="variant.bodyClass">
                      {{ item.note }}
                    </p>
                  </li>
                </ul>
              </article>
            </section>

            <section class="grid gap-4 md:grid-cols-3">
              <article
                v-for="card in feedCards"
                :key="`${variant.pack}-${card.title}`"
                class="variant-surface rounded-xl p-4"
              >
                <img
                  :src="card.image"
                  :alt="card.title"
                  class="variant-image h-44 w-full rounded-lg object-cover"
                  loading="lazy"
                  decoding="async"
                >
                <p class="variant-surface-muted mt-3 text-[10px] tracking-[0.16em] uppercase" :class="variant.metaClass">
                  {{ card.section }}
                </p>
                <h5 class="mt-1 text-lg leading-tight" :class="variant.headlineClass">
                  {{ card.title }}
                </h5>
              </article>
            </section>

            <section class="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <article class="variant-surface rounded-xl p-5 md:p-6">
                <p class="variant-surface-muted text-[10px] tracking-[0.2em] uppercase" :class="variant.metaClass">
                  Longform Analysis
                </p>
                <div class="mt-3 space-y-3">
                  <p
                    v-for="(paragraph, idx) in longformParagraphs"
                    :key="`${variant.pack}-${idx}`"
                    class="text-sm leading-relaxed md:text-[15px]"
                    :class="variant.bodyClass"
                  >
                    {{ paragraph }}
                  </p>
                </div>
              </article>

              <article class="variant-surface rounded-xl p-5 md:p-6">
                <p class="variant-surface-muted text-[10px] tracking-[0.2em] uppercase" :class="variant.metaClass">
                  Quote Block
                </p>
                <blockquote class="mt-3 text-[clamp(1.25rem,2.1vw,1.85rem)] leading-[1.28]" :class="variant.quoteClass">
                  "A strong Swiss system is not about less design. It is about fewer arbitrary decisions."
                </blockquote>
                <p class="variant-surface-muted mt-3 text-xs leading-relaxed" :class="variant.bodyClass">
                  Evaluation focus: does the quote stay readable and intentional under each token pack?
                </p>
              </article>
            </section>

            <section class="variant-surface rounded-xl p-5 md:p-6">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p class="variant-surface-muted text-[10px] tracking-[0.2em] uppercase" :class="variant.metaClass">
                    CTA Strip
                  </p>
                  <h5 class="mt-1 text-[clamp(1.15rem,2vw,1.6rem)] leading-tight" :class="variant.headlineClass">
                    Subscribe for weekly AI and software market signals
                  </h5>
                </div>
                <div class="max-w-lg w-full flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    placeholder="your@email.com"
                    class="variant-input min-w-0 flex-1 px-3 py-2 text-sm"
                    :class="variant.bodyClass"
                  >
                  <button class="variant-button-solid px-4 py-2 text-[11px] tracking-[0.16em] uppercase" :class="variant.metaClass">
                    Join Briefing
                  </button>
                </div>
              </div>
            </section>

            <footer class="variant-surface rounded-xl p-5 md:p-6">
              <div class="grid gap-5 md:grid-cols-4">
                <div>
                  <p class="variant-surface-muted text-[10px] tracking-[0.2em] uppercase" :class="variant.metaClass">
                    TechNews
                  </p>
                  <p class="mt-2 text-sm leading-relaxed" :class="variant.bodyClass">
                    Global software and AI coverage for builders, operators, and decision makers.
                  </p>
                </div>
                <article
                  v-for="col in footerColumns"
                  :key="`${variant.pack}-${col.title}`"
                >
                  <p class="variant-surface-muted text-[10px] tracking-[0.2em] uppercase" :class="variant.metaClass">
                    {{ col.title }}
                  </p>
                  <ul class="mt-2 space-y-1">
                    <li
                      v-for="link in col.links"
                      :key="`${variant.pack}-${col.title}-${link}`"
                      class="text-sm leading-relaxed"
                      :class="variant.bodyClass"
                    >
                      {{ link }}
                    </li>
                  </ul>
                </article>
              </div>
            </footer>

            <section class="variant-surface rounded-xl p-5 md:p-6">
              <div class="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p class="variant-surface-muted text-[10px] tracking-[0.2em] uppercase" :class="variant.metaClass">
                    Accent Showcase
                  </p>
                  <h5 class="mt-1 text-[clamp(1.15rem,2vw,1.6rem)] leading-tight" :class="variant.headlineClass">
                    Live signal behavior with hover and expandable content
                  </h5>
                </div>
                <span class="variant-surface-muted text-[10px] tracking-[0.16em] uppercase" :class="variant.metaClass">
                  preset: {{ activeAccentPreset.name }}
                </span>
              </div>

              <div class="grid gap-3 md:grid-cols-3">
                <button class="variant-accent-tile rounded-lg p-4 text-left">
                  <p class="variant-surface-muted text-[10px] tracking-[0.16em] uppercase" :class="variant.metaClass">
                    Primary
                  </p>
                  <p class="mt-2 text-sm leading-relaxed" :class="variant.bodyClass">
                    Accent hover on action tiles
                  </p>
                </button>
                <button class="variant-accent-tile rounded-lg p-4 text-left">
                  <p class="variant-surface-muted text-[10px] tracking-[0.16em] uppercase" :class="variant.metaClass">
                    Secondary
                  </p>
                  <p class="mt-2 text-sm leading-relaxed" :class="variant.bodyClass">
                    Card focus and scan anchoring
                  </p>
                </button>
                <button class="variant-accent-tile rounded-lg p-4 text-left">
                  <p class="variant-surface-muted text-[10px] tracking-[0.16em] uppercase" :class="variant.metaClass">
                    Utility
                  </p>
                  <p class="mt-2 text-sm leading-relaxed" :class="variant.bodyClass">
                    Compact nav or filter highlights
                  </p>
                </button>
              </div>

              <div class="mt-4 space-y-2">
                <details
                  v-for="item in accentShowcaseItems"
                  :key="`${variant.pack}-${item.title}`"
                  class="variant-accordion border rounded-lg border-solid"
                >
                  <summary class="flex cursor-pointer list-none items-center justify-between gap-3 p-3">
                    <span class="text-sm leading-relaxed" :class="variant.bodyClass">{{ item.title }}</span>
                    <span class="variant-accent-dot h-2.5 w-2.5 rounded-full" />
                  </summary>
                  <p class="variant-surface-muted border-t border-solid px-3 pb-3 pt-2 text-sm leading-relaxed" :class="variant.bodyClass">
                    {{ item.body }}
                  </p>
                </details>
              </div>
            </section>
          </div>
        </section>

        <section class="border border-pureBlack/18 rounded-2xl border-solid bg-pureWhite p-5 dark:border-pureWhite/18 dark:bg-pureBlack md:p-8">
          <div class="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-pureBlack/18 border-solid pb-4 dark:border-pureWhite/18">
            <div>
              <p class="space-grotesk-regular text-[10px] tracking-[0.22em] uppercase opacity-65">
                Evaluation Console
              </p>
              <h2 class="font-cabinet mt-1 text-[clamp(1.3rem,2.4vw,2rem)] leading-tight">
                Score Variants and Export JSON
              </h2>
            </div>
            <p class="text-xs leading-relaxed opacity-70">
              Fill scores after review, then copy or download the structured result.
            </p>
          </div>

          <div class="grid gap-4 lg:grid-cols-3">
            <article
              v-for="variant in variants"
              :key="`score-${variant.pack}`"
              class="border border-pureBlack/16 rounded-xl border-solid bg-pureWhite p-4 dark:border-pureWhite/16 dark:bg-pureBlack"
            >
              <div class="mb-3">
                <p class="space-grotesk-regular text-[10px] tracking-[0.2em] uppercase opacity-65">
                  Demo {{ variant.id }} · {{ variant.pack }}
                </p>
                <h3 class="mt-1 text-lg leading-tight" :class="variant.headlineClass">
                  {{ variant.name }}
                </h3>
              </div>

              <div class="space-y-2">
                <div
                  v-for="criteria in scoreCriteria"
                  :key="`${variant.pack}-${criteria.key}`"
                  class="flex items-center justify-between gap-3"
                >
                  <label class="text-xs leading-relaxed opacity-85">
                    {{ criteria.label }}
                    <span class="ml-1 opacity-60">({{ criteria.hint }})</span>
                  </label>
                  <select
                    v-model.number="evaluations[variant.pack].scores[criteria.key]"
                    class="border border-pureBlack/20 rounded-md border-solid bg-transparent px-2 py-1 text-xs dark:border-pureWhite/25"
                  >
                    <option v-for="value in [1, 2, 3, 4, 5]" :key="`${variant.pack}-${criteria.key}-${value}`" :value="value">
                      {{ value }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="mt-4 space-y-2">
                <label class="space-grotesk-regular text-[10px] tracking-[0.18em] uppercase opacity-65">Liked</label>
                <textarea
                  v-model="evaluations[variant.pack].likes"
                  class="h-18 w-full border border-pureBlack/20 rounded-md border-solid bg-transparent px-2 py-2 text-xs leading-relaxed outline-none dark:border-pureWhite/25"
                  placeholder="What felt strong?"
                />

                <label class="space-grotesk-regular text-[10px] tracking-[0.18em] uppercase opacity-65">Concerns</label>
                <textarea
                  v-model="evaluations[variant.pack].concerns"
                  class="h-18 w-full border border-pureBlack/20 rounded-md border-solid bg-transparent px-2 py-2 text-xs leading-relaxed outline-none dark:border-pureWhite/25"
                  placeholder="What needs improvement?"
                />

                <label class="space-grotesk-regular text-[10px] tracking-[0.18em] uppercase opacity-65">Decision</label>
                <select
                  v-model="evaluations[variant.pack].decision"
                  class="w-full border border-pureBlack/20 rounded-md border-solid bg-transparent px-2 py-2 text-xs dark:border-pureWhite/25"
                >
                  <option value="">
                    undecided
                  </option>
                  <option value="winner">
                    winner
                  </option>
                  <option value="contender">
                    contender
                  </option>
                  <option value="drop">
                    drop
                  </option>
                </select>
              </div>
            </article>
          </div>

          <div class="mt-6 border border-pureBlack/16 rounded-xl border-solid bg-pureWhite p-4 dark:border-pureWhite/16 dark:bg-pureBlack">
            <div class="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p class="space-grotesk-regular text-[10px] tracking-[0.2em] uppercase opacity-65">
                  Ranking Snapshot
                </p>
                <p class="mt-1 text-sm leading-relaxed opacity-85">
                  Current winner: <strong>{{ rankedVariants[0]?.name || 'n/a' }}</strong> ({{ rankedVariants[0]?.pack || '-' }})
                </p>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <button
                  class="border border-pureBlack/25 rounded-md border-solid px-3 py-2 text-[11px] tracking-[0.14em] uppercase dark:border-pureWhite/25"
                  @click="copyEvaluationJson"
                >
                  Copy JSON
                </button>
                <button
                  class="border border-pureBlack rounded-md border-solid bg-pureBlack px-3 py-2 text-[11px] color-pureWhite tracking-[0.14em] uppercase dark:border-pureWhite dark:bg-pureWhite dark:color-pureBlack"
                  @click="downloadEvaluationJson"
                >
                  Download JSON
                </button>
              </div>
            </div>

            <ul class="grid mb-3 gap-2 md:grid-cols-3">
              <li
                v-for="item in rankedVariants"
                :key="`rank-${item.pack}`"
                class="border border-pureBlack/14 rounded-md border-solid px-3 py-2 text-xs dark:border-pureWhite/14"
              >
                <span class="space-grotesk-regular mr-2 text-[10px] tracking-[0.16em] uppercase opacity-65">
                  {{ item.pack }}
                </span>
                {{ item.name }} · {{ item.average.toFixed(2) }}
              </li>
            </ul>

            <p class="mb-2 text-xs opacity-70">
              Export status:
              <strong>{{ exportStatus }}</strong>
            </p>
            <pre class="max-h-[360px] overflow-auto border border-pureBlack/14 rounded-md border-solid bg-pureBlack/4 p-3 text-[11px] leading-relaxed dark:border-pureWhite/14 dark:bg-pureWhite/6">{{ evaluationJson }}</pre>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.variant-page {
  background: var(--vx-bg);
  color: var(--vx-text);
  border: 1px solid var(--vx-border);
}

.variant-surface {
  background: var(--vx-surface);
  color: var(--vx-surface-text);
  border: 1px solid var(--vx-border);
}

.variant-card-inner {
  border-color: var(--vx-border);
}

.variant-divider {
  border-color: var(--vx-border);
}

.variant-muted {
  color: var(--vx-muted);
}

.variant-surface-muted {
  color: var(--vx-surface-muted);
}

.variant-chip {
  border: 1px solid var(--vx-border);
  color: var(--vx-muted);
}

.variant-chip-active {
  border-color: var(--vx-accent);
  background: var(--vx-accent);
  color: var(--vx-accent-contrast);
}

.variant-button-ghost {
  border: 1px solid var(--vx-border);
  color: var(--vx-surface-text);
  background: transparent;
}

.variant-button-solid {
  border: 1px solid var(--vx-accent);
  background: var(--vx-accent);
  color: var(--vx-accent-contrast);
}

.variant-input {
  border: 1px solid var(--vx-border);
  background: transparent;
  color: var(--vx-surface-text);
}

.variant-input::placeholder {
  color: var(--vx-surface-muted);
}

.variant-image {
  filter: grayscale(var(--vx-image-grayscale));
}

.variant-accent-text {
  color: var(--vx-accent);
}

.variant-accent-track {
  background: var(--vx-accent);
}

.variant-accent-dot {
  background: var(--vx-accent);
}

.variant-accent-tile {
  border: 1px solid var(--vx-border);
  background: transparent;
  color: var(--vx-surface-text);
  transition:
    background-color 180ms ease,
    border-color 180ms ease,
    color 180ms ease;
}

.variant-accent-tile:hover {
  border-color: var(--vx-accent);
  background: color-mix(in srgb, var(--vx-accent) 14%, transparent);
}

.variant-accordion {
  border-color: var(--vx-border);
}

.variant-accordion[open] {
  border-color: var(--vx-accent);
  background: color-mix(in srgb, var(--vx-accent) 10%, transparent);
}
</style>
