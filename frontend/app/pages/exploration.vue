<script setup lang="ts">
useHead({
  title: 'Design Exploration',
})

const topStory = {
  section: 'Platform Signals',
  title: 'Private AI infrastructure shifts from optional hedge to strategic baseline',
  excerpt: 'Boards now measure AI programs by operational reliability and governance quality, not only by model novelty. This layout tests how headline tone and reading rhythm change across typographic systems while content remains identical.',
  author: 'Editorial Desk',
  readTime: '6 min read',
}

const sideStories = [
  {
    tag: 'Security',
    title: 'Identity-first controls replace perimeter assumptions in procurement',
    excerpt: 'Zero-trust requirements now appear in standard enterprise RFP templates and policy checklists.',
  },
  {
    tag: 'Data',
    title: 'Synthetic data programs move from experimentation to regulated workflows',
    excerpt: 'Legal and model teams define shared validation gates before production deployment.',
  },
  {
    tag: 'Ops',
    title: 'Inference cost visibility becomes a product KPI, not just infra telemetry',
    excerpt: 'Teams align product decisions with margin and latency budgets from day one.',
  },
]

const signalCards = [
  { label: 'Open briefs', value: '24', detail: 'Stories in active editorial review this week.' },
  { label: 'Verified sources', value: '91', detail: 'Cross-checked references across product, legal, and infra.' },
  { label: 'Pending decisions', value: '07', detail: 'Topics blocked on ownership or risk acceptance.' },
]

const compareModules = [
  'Headline authority and scan speed',
  'Body readability across long blocks',
  'Meta-label contrast and hierarchy clarity',
]

const stressImages = [
  {
    title: 'Monolithic geometry',
    src: 'https://images.pexels.com/photos/29543293/pexels-photo-29543293.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=3840',
    credit: 'Pexels / 4K source',
  },
  {
    title: 'High-rise rhythm',
    src: 'https://images.pexels.com/photos/8275502/pexels-photo-8275502.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=3840',
    credit: 'Pexels / 4K source',
  },
  {
    title: 'Facade contrast',
    src: 'https://images.pexels.com/photos/15303468/pexels-photo-15303468.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=3840',
    credit: 'Pexels / 4K source',
  },
]

const tagCluster = [
  'Governance',
  'Procurement',
  'Latency Budgets',
  'Risk Scoring',
  'Policy Ops',
  'Model Reliability',
]

const variants = [
  {
    id: 'A',
    name: 'Swiss Editorial Classic',
    summary: 'High-contrast newsroom expression with poster-level headlines and strict meta structure.',
    idea: 'Best for editorial authority and strong visual framing. Keeps asymmetry but makes information feel curated and intentional.',
    fontStack: [
      { role: 'Display', family: 'Druk Bold Trial', className: 'font-druk-bold' },
      { role: 'Headline', family: 'Cabinet Grotesk', className: 'font-cabinet' },
      { role: 'Body', family: 'Space Grotesk', className: 'space-grotesk-regular' },
      { role: 'Meta', family: 'JetBrains Mono', className: 'jetbrains-mono-regular' },
      { role: 'Quote Accent', family: 'Libre Baskerville', className: 'font-baskerville' },
    ],
    typeScale: 'Display clamp(3.6rem-6.8rem), Headline 1.5rem, Body 1rem, Meta 0.68rem uppercase',
    spacing: '4px baseline with 16/24/32/48 rhythm; sharp section dividers and square cards.',
    shellClass: 'border-solid border border-pureBlack/20 p-6 md:p-10 dark:border-pureWhite/20',
    cardClass: 'border-solid border border-pureBlack/20 p-4 dark:border-pureWhite/20',
    inputClass: 'min-w-0 flex-1 border-solid border border-pureBlack/25 bg-transparent px-3 py-2 text-sm outline-none dark:border-pureWhite/25',
    buttonGhostClass: 'jetbrains-mono-regular border-solid border border-pureBlack/35 px-4 py-2 text-[11px] tracking-[0.16em] uppercase dark:border-pureWhite/35',
    buttonSolidClass: 'jetbrains-mono-regular bg-pureBlack px-4 py-2 text-[11px] color-pureWhite tracking-[0.16em] uppercase dark:bg-pureWhite dark:color-pureBlack',
    displayClass: 'font-druk-bold',
    headlineClass: 'font-cabinet',
    bodyClass: 'space-grotesk-regular',
    metaClass: 'jetbrains-mono-regular',
    quoteClass: 'font-baskerville italic',
  },
  {
    id: 'B',
    name: 'Neo Swiss Product',
    summary: 'Calmer product-facing Swiss direction with softer edges and stable reading flow.',
    idea: 'Best for conversion or member areas. Less dramatic than A, but highly usable with dependable hierarchy in UI-heavy contexts.',
    fontStack: [
      { role: 'Display', family: 'Nohemi', className: 'font-nohemi' },
      { role: 'Headline', family: 'Geist', className: 'geist-regular' },
      { role: 'Body', family: 'Manrope', className: 'font-manrope' },
      { role: 'Meta', family: 'Space Grotesk', className: 'space-grotesk-regular' },
      { role: 'Quote Accent', family: 'Libre Baskerville', className: 'font-baskerville' },
    ],
    typeScale: 'Display clamp(3.1rem-5.4rem), Headline 1.42rem, Body 1rem, Meta 0.72rem uppercase',
    spacing: '4px baseline with 12/20/28/40 rhythm; rounded surfaces but same grid map as A.',
    shellClass: 'rounded-3xl border-solid border border-pureBlack/15 bg-pureWhite/70 p-6 backdrop-blur-sm md:p-10 dark:border-pureWhite/15 dark:bg-pureBlack/45',
    cardClass: 'rounded-2xl border-solid border border-pureBlack/15 p-4 dark:border-pureWhite/15',
    inputClass: 'min-w-0 flex-1 rounded-xl border-solid border border-pureBlack/20 bg-transparent px-3 py-2 text-sm outline-none dark:border-pureWhite/20',
    buttonGhostClass: 'space-grotesk-regular rounded-full border-solid border border-pureBlack/30 px-4 py-2 text-[11px] tracking-[0.14em] uppercase dark:border-pureWhite/30',
    buttonSolidClass: 'space-grotesk-regular rounded-full bg-pureBlack px-4 py-2 text-[11px] color-pureWhite tracking-[0.14em] uppercase dark:bg-pureWhite dark:color-pureBlack',
    displayClass: 'font-nohemi',
    headlineClass: 'geist-regular font-semibold',
    bodyClass: 'font-manrope',
    metaClass: 'space-grotesk-regular',
    quoteClass: 'font-baskerville italic',
  },
  {
    id: 'C',
    name: 'Swiss Expanded Signal',
    summary: 'Sharper condensed-to-expanded contrast tuned for bolder mastheads without layout changes.',
    idea: 'Best as an expressive substyle when stronger typographic attitude is required, while retaining the same editorial structure for comparability.',
    fontStack: [
      { role: 'Display', family: 'Zalando Sans Expanded', className: 'zalando-sans-expanded' },
      { role: 'Headline', family: 'Clash Display Regular', className: 'font-clash-regular' },
      { role: 'Body', family: 'Manrope', className: 'font-manrope' },
      { role: 'Meta', family: 'JetBrains Mono', className: 'jetbrains-mono-regular' },
      { role: 'Quote Accent', family: 'Recoleta', className: 'font-recoleta' },
    ],
    typeScale: 'Display clamp(3.2rem-5.8rem), Headline 1.46rem, Body 1rem, Meta 0.68rem uppercase',
    spacing: '4px baseline with 14/22/30/44 rhythm; tighter tracking and stronger border contrast.',
    shellClass: 'border-solid border border-pureBlack/25 p-6 md:p-10 dark:border-pureWhite/25',
    cardClass: 'border-solid border border-pureBlack/25 p-4 dark:border-pureWhite/25',
    inputClass: 'min-w-0 flex-1 border-solid border border-pureBlack/30 bg-transparent px-3 py-2 text-sm outline-none dark:border-pureWhite/30',
    buttonGhostClass: 'jetbrains-mono-regular border-solid border border-pureBlack/35 px-4 py-2 text-[11px] tracking-[0.16em] uppercase dark:border-pureWhite/35',
    buttonSolidClass: 'jetbrains-mono-regular bg-pureBlack px-4 py-2 text-[11px] color-pureWhite tracking-[0.16em] uppercase dark:bg-pureWhite dark:color-pureBlack',
    displayClass: 'zalando-sans-expanded uppercase tracking-[-0.02em]',
    headlineClass: 'font-clash-regular',
    bodyClass: 'font-manrope',
    metaClass: 'jetbrains-mono-regular',
    quoteClass: 'font-recoleta',
  },
  {
    id: 'D',
    name: 'Swiss Soft Signal',
    summary: 'Friendlier editorial tone with softer curves while preserving the same strict Swiss information map.',
    idea: 'Uses Mondea and Now to test a warmer, slightly more human display rhythm without changing content density or structure.',
    fontStack: [
      { role: 'Display', family: 'Mondea', className: 'font-mondea' },
      { role: 'Headline', family: 'Now', className: 'font-now' },
      { role: 'Body', family: 'Manrope', className: 'font-manrope' },
      { role: 'Meta', family: 'Space Grotesk', className: 'space-grotesk-regular' },
      { role: 'Quote Accent', family: 'Libre Baskerville', className: 'font-baskerville' },
    ],
    typeScale: 'Display clamp(3.3rem-5.9rem), Headline 1.5rem, Body 1rem, Meta 0.72rem uppercase',
    spacing: '4px baseline with 14/24/32/44 rhythm; moderate contrast for calmer scan behavior.',
    shellClass: 'border-solid border border-pureBlack/22 p-6 md:p-10 dark:border-pureWhite/22',
    cardClass: 'border-solid border border-pureBlack/22 p-4 dark:border-pureWhite/22',
    inputClass: 'min-w-0 flex-1 border-solid border border-pureBlack/28 bg-transparent px-3 py-2 text-sm outline-none dark:border-pureWhite/28',
    buttonGhostClass: 'space-grotesk-regular border-solid border border-pureBlack/35 px-4 py-2 text-[11px] tracking-[0.14em] uppercase dark:border-pureWhite/35',
    buttonSolidClass: 'space-grotesk-regular bg-pureBlack px-4 py-2 text-[11px] color-pureWhite tracking-[0.14em] uppercase dark:bg-pureWhite dark:color-pureBlack',
    displayClass: 'font-mondea',
    headlineClass: 'font-now',
    bodyClass: 'font-manrope',
    metaClass: 'space-grotesk-regular',
    quoteClass: 'font-baskerville italic',
  },
  {
    id: 'E',
    name: 'Swiss Expanded Signal (Baskerville)',
    summary: 'Variant C typography with softer meta and quote treatment for better editorial readability.',
    idea: 'Direct A/B check to C: same expanded headline strategy, but Meta uses Space Grotesk and Quote uses Libre Baskerville.',
    fontStack: [
      { role: 'Display', family: 'Zalando Sans Expanded', className: 'zalando-sans-expanded' },
      { role: 'Headline', family: 'Clash Display Regular', className: 'font-clash-regular' },
      { role: 'Body', family: 'Manrope', className: 'font-manrope' },
      { role: 'Meta', family: 'Space Grotesk', className: 'space-grotesk-regular' },
      { role: 'Quote Accent', family: 'Libre Baskerville', className: 'font-baskerville' },
    ],
    typeScale: 'Display clamp(3.2rem-5.8rem), Headline 1.46rem, Body 1rem, Meta 0.72rem uppercase',
    spacing: '4px baseline with 14/22/30/44 rhythm; same structural tension as C with calmer text rails.',
    shellClass: 'border-solid border border-pureBlack/25 p-6 md:p-10 dark:border-pureWhite/25',
    cardClass: 'border-solid border border-pureBlack/25 p-4 dark:border-pureWhite/25',
    inputClass: 'min-w-0 flex-1 border-solid border border-pureBlack/30 bg-transparent px-3 py-2 text-sm outline-none dark:border-pureWhite/30',
    buttonGhostClass: 'space-grotesk-regular border-solid border border-pureBlack/35 px-4 py-2 text-[11px] tracking-[0.14em] uppercase dark:border-pureWhite/35',
    buttonSolidClass: 'space-grotesk-regular bg-pureBlack px-4 py-2 text-[11px] color-pureWhite tracking-[0.14em] uppercase dark:bg-pureWhite dark:color-pureBlack',
    displayClass: 'zalando-sans-expanded uppercase tracking-[-0.02em]',
    headlineClass: 'font-clash-regular',
    bodyClass: 'font-manrope',
    metaClass: 'space-grotesk-regular',
    quoteClass: 'font-baskerville italic',
  },
]
</script>

<template>
  <div class="relative bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <div class="mx-auto max-w-[1400px] px-6 pb-28 pt-24 md:px-10">
      <header class="mb-10 border-b border-pureBlack/20 border-solid pb-8 dark:border-pureWhite/20">
        <p class="space-grotesk-regular mb-3 text-[10px] tracking-[0.3em] uppercase opacity-70">
          Swiss Style Exploration
        </p>
        <h1 class="font-clash-regular text-[clamp(2.3rem,6vw,5rem)] leading-[0.95] tracking-tight uppercase">
          Newsroom Typography Bench
        </h1>
        <p class="mt-4 max-w-3xl text-base leading-relaxed opacity-75">
          Drei nahe identische Layout-Varianten mit gleichem Content. So vergleichst du Headline-Power, Lesefluss und Hierarchie ohne Layout-Bias.
        </p>
      </header>

      <section class="grid mb-14 gap-4 lg:grid-cols-3">
        <article class="border border-pureBlack/18 border-solid p-4 dark:border-pureWhite/18">
          <p class="jetbrains-mono-regular text-[10px] tracking-[0.2em] uppercase opacity-65">
            Design Notes
          </p>
          <h2 class="font-cabinet mt-2 text-xl leading-tight">
            Ziel dieser Runde
          </h2>
          <p class="space-grotesk-regular mt-2 text-sm leading-relaxed opacity-75">
            Gleicher Content, gleiche Komponenten, gleiche Informationsdichte. Unterschiede nur noch in Typografie, Ton und rhythmischer Spacing-Wirkung.
          </p>
        </article>
        <article class="border border-pureBlack/18 border-solid p-4 dark:border-pureWhite/18">
          <p class="jetbrains-mono-regular text-[10px] tracking-[0.2em] uppercase opacity-65">
            Vergleichslogik
          </p>
          <h2 class="font-cabinet mt-2 text-xl leading-tight">
            Was wir bewerten
          </h2>
          <ul class="space-grotesk-regular mt-2 text-sm leading-relaxed opacity-75 space-y-1">
            <li v-for="item in compareModules" :key="item">
              {{ item }}
            </li>
          </ul>
        </article>
        <article class="border border-pureBlack/18 border-solid p-4 dark:border-pureWhite/18">
          <p class="jetbrains-mono-regular text-[10px] tracking-[0.2em] uppercase opacity-65">
            Aktuelles Feedback
          </p>
          <h2 class="font-cabinet mt-2 text-xl leading-tight">
            User Preference
          </h2>
          <p class="space-grotesk-regular mt-2 text-sm leading-relaxed opacity-75">
            Variante B Headline wirkt stark, A ebenfalls sehr robust. C wird in dieser Runde als kontrollierter Gegencheck neu kalibriert.
          </p>
        </article>
      </section>

      <main class="space-y-16">
        <section
          v-for="variant in variants"
          :key="variant.id"
          :class="variant.shellClass"
        >
          <div class="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-pureBlack/20 border-solid pb-4 dark:border-pureWhite/20">
            <span class="text-[11px] tracking-[0.2em] uppercase" :class="[variant.metaClass]">Variant {{ variant.id }}</span>
            <span class="text-[10px] tracking-[0.24em] uppercase opacity-65" :class="[variant.bodyClass]">{{ variant.name }}</span>
          </div>

          <div class="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div class="space-y-5">
              <p class="text-[10px] tracking-[0.2em] uppercase opacity-65" :class="[variant.metaClass]">
                Weekly Brief · Issue 014
              </p>
              <h2 class="text-[clamp(3.2rem,8vw,6.8rem)] leading-[0.9]" :class="[variant.displayClass]">
                Signal
                <br>
                Ledger
              </h2>
              <p class="max-w-xl text-base leading-relaxed opacity-80" :class="[variant.bodyClass]">
                {{ variant.summary }}
              </p>

              <div class="grid gap-3 sm:grid-cols-3">
                <article
                  v-for="signal in signalCards"
                  :key="`${variant.id}-${signal.label}`"
                  :class="variant.cardClass"
                >
                  <p class="text-[9px] tracking-[0.22em] uppercase opacity-65" :class="[variant.metaClass]">
                    {{ signal.label }}
                  </p>
                  <p class="mt-2 text-4xl leading-none" :class="[variant.displayClass]">
                    {{ signal.value }}
                  </p>
                  <p class="mt-2 text-xs leading-relaxed opacity-75" :class="[variant.bodyClass]">
                    {{ signal.detail }}
                  </p>
                </article>
              </div>
            </div>

            <aside :class="variant.cardClass">
              <p class="text-[10px] tracking-[0.2em] uppercase opacity-65" :class="[variant.metaClass]">
                Section Idea
              </p>
              <p class="mt-2 text-sm leading-relaxed opacity-80" :class="[variant.bodyClass]">
                {{ variant.idea }}
              </p>

              <p class="mt-5 text-[10px] tracking-[0.2em] uppercase opacity-65" :class="[variant.metaClass]">
                Fonts
              </p>
              <ul class="mt-2 space-y-1">
                <li
                  v-for="font in variant.fontStack"
                  :key="`${variant.id}-${font.role}`"
                  class="text-sm color-teal-11 leading-relaxed opacity-85 dark:color-teal-10"
                  :class="[font.className]"
                >
                  {{ font.role }}: {{ font.family }}
                  <span class="jetbrains-mono-regular ml-1 text-[10px] opacity-70">
                    ({{ font.className }})
                  </span>
                </li>
              </ul>

              <p class="mt-5 text-[10px] tracking-[0.2em] uppercase opacity-65" :class="[variant.metaClass]">
                Typography Scale
              </p>
              <p class="mt-2 text-sm leading-relaxed opacity-80" :class="[variant.bodyClass]">
                {{ variant.typeScale }}
              </p>

              <p class="mt-5 text-[10px] tracking-[0.2em] uppercase opacity-65" :class="[variant.metaClass]">
                Spacing Logic
              </p>
              <p class="mt-2 text-sm leading-relaxed opacity-80" :class="[variant.bodyClass]">
                {{ variant.spacing }}
              </p>
            </aside>
          </div>

          <div class="grid mt-8 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <article :class="variant.cardClass">
              <p class="text-[10px] tracking-[0.2em] uppercase opacity-65" :class="[variant.metaClass]">
                {{ topStory.section }}
              </p>
              <h3 class="mt-2 text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.02]" :class="[variant.headlineClass]">
                {{ topStory.title }}
              </h3>
              <p class="mt-3 text-sm leading-relaxed opacity-80" :class="[variant.bodyClass]">
                {{ topStory.excerpt }}
              </p>
              <div class="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
                <span class="text-[10px] tracking-[0.16em] uppercase opacity-65" :class="[variant.metaClass]">{{ topStory.author }}</span>
                <span class="text-[10px] opacity-45" :class="[variant.metaClass]">/</span>
                <span class="text-[10px] tracking-[0.16em] uppercase opacity-65" :class="[variant.metaClass]">{{ topStory.readTime }}</span>
              </div>
              <div class="mt-5 flex flex-wrap gap-3">
                <button :class="variant.buttonGhostClass">
                  Read Brief
                </button>
                <button :class="variant.buttonSolidClass">
                  Open Notes
                </button>
              </div>
            </article>

            <div class="space-y-4">
              <article
                v-for="story in sideStories"
                :key="`${variant.id}-${story.title}`"
                :class="variant.cardClass"
              >
                <p class="text-[10px] tracking-[0.2em] uppercase opacity-65" :class="[variant.metaClass]">
                  {{ story.tag }}
                </p>
                <h4 class="mt-2 text-xl leading-tight" :class="[variant.headlineClass]">
                  {{ story.title }}
                </h4>
                <p class="mt-2 text-sm leading-relaxed opacity-75" :class="[variant.bodyClass]">
                  {{ story.excerpt }}
                </p>
              </article>
            </div>
          </div>

          <article class="mt-6" :class="variant.cardClass">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <p class="text-[10px] tracking-[0.2em] uppercase opacity-65" :class="[variant.metaClass]">
                Tag Cluster
              </p>
              <p class="text-[9px] tracking-[0.16em] uppercase opacity-55" :class="[variant.metaClass]">
                identisch fuer A-E
              </p>
            </div>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="tag in tagCluster"
                :key="`${variant.id}-${tag}`"
                class="border border-pureBlack/24 border-solid px-2 py-1 text-[10px] tracking-[0.14em] uppercase opacity-75 dark:border-pureWhite/24"
                :class="[variant.metaClass]"
              >
                {{ tag }}
              </span>
            </div>
          </article>

          <div class="mt-6 space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <p class="text-[10px] tracking-[0.2em] uppercase opacity-65" :class="[variant.metaClass]">
                Image Stress Test
              </p>
              <p class="text-[10px] tracking-[0.2em] uppercase opacity-55" :class="[variant.metaClass]">
                gleiche Bilder pro Variante
              </p>
            </div>
            <div class="grid gap-4 lg:grid-cols-3">
              <article
                v-for="image in stressImages"
                :key="`${variant.id}-${image.src}`"
                :class="variant.cardClass"
              >
                <img
                  :src="image.src"
                  :alt="image.title"
                  class="h-56 w-full object-cover grayscale"
                  loading="lazy"
                  decoding="async"
                >
                <p class="mt-3 text-sm leading-relaxed opacity-90" :class="[variant.headlineClass]">
                  {{ image.title }}
                </p>
                <p class="mt-1 text-[10px] tracking-[0.16em] uppercase opacity-65" :class="[variant.metaClass]">
                  {{ image.credit }}
                </p>
              </article>
            </div>
          </div>

          <div class="grid mt-6 gap-4 lg:grid-cols-[1fr_1fr]">
            <article :class="variant.cardClass">
              <p class="text-[10px] tracking-[0.2em] uppercase opacity-65" :class="[variant.metaClass]">
                Quote
              </p>
              <blockquote class="mt-3 text-[clamp(1.2rem,2.1vw,1.7rem)] leading-[1.3]" :class="[variant.quoteClass]">
                "Swiss style is not empty minimalism. It is disciplined hierarchy with purpose."
              </blockquote>
              <p class="mt-3 text-xs leading-relaxed opacity-70" :class="[variant.bodyClass]">
                Editorial note for evaluating tone under each typography system.
              </p>
            </article>

            <article :class="variant.cardClass">
              <p class="text-[10px] tracking-[0.2em] uppercase opacity-65" :class="[variant.metaClass]">
                Feedback Input
              </p>
              <div class="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  placeholder="What feels strongest in this variant?"
                  :class="variant.inputClass"
                >
                <button :class="variant.buttonGhostClass">
                  Save
                </button>
              </div>
              <p class="mt-4 text-[9px] tracking-[0.2em] uppercase opacity-55" :class="[variant.metaClass]">
                Compare headline impact, body comfort, and information scan speed.
              </p>
            </article>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
