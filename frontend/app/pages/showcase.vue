<script setup lang="ts">
useHead({
  title: 'Showcase',
})
</script>

<template>
  <section class="relative overflow-hidden bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <div class="pointer-events-none absolute -top-24 right-20 h-72 w-72 rounded-full bg-gradient-to-br from-pureBlack/10 via-transparent to-transparent blur-3xl dark:from-pureWhite/10" />
    <div class="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-teal-11/20 via-transparent to-transparent blur-2xl" />

    <div class="mx-auto w-full max-w-6xl px-6 pb-20 pt-28">
      <h1 class="text-[clamp(2.8rem,9vw,5.8rem)] uppercase leading-[0.95] tracking-tight">
        <span class="zalando-sans-expanded block font-semibold">Signal Showcase.</span>
        <span class="font-baskerville block italic color-pureBlack/70 dark:color-pureWhite/70">Where the headlines land.</span>
      </h1>
      <p class="mt-6 max-w-2xl text-base color-pureBlack/70 leading-relaxed dark:color-pureWhite/70">
        A curated gallery of our most precise reporting, product dissections, and market maps. Each
        feature is built to brief executives, builders, and investors with a decisive point of view.
      </p>

      <div class="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="rounded-3xl border border-pureBlack/10 bg-pureWhite/70 p-7 backdrop-blur-sm dark:border-pureWhite/15 dark:bg-pureBlack/50">
          <div class="text-xs uppercase tracking-[0.32em] color-pureBlack/60 dark:color-pureWhite/60">Flagship</div>
          <div class="mt-3 text-2xl font-semibold">The 2024 Compute Atlas</div>
          <p class="mt-3 text-sm color-pureBlack/70 leading-relaxed dark:color-pureWhite/70">
            Mapping hyperscaler velocity, GPU inventory flow, and the new economics of inference.
          </p>
          <div class="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em]">
            <span class="rounded-full border border-pureBlack/20 px-3 py-1 dark:border-pureWhite/30">AI infra</span>
            <span class="rounded-full border border-pureBlack/20 px-3 py-1 dark:border-pureWhite/30">Markets</span>
            <span class="rounded-full border border-pureBlack/20 px-3 py-1 dark:border-pureWhite/30">Field notes</span>
          </div>
        </div>
        <div class="rounded-3xl border border-pureBlack/10 bg-gradient-to-br from-pureWhite/80 via-pureWhite/50 to-pureWhite/20 p-7 dark:border-pureWhite/15 dark:from-pureBlack dark:via-pureBlack/80 dark:to-pureBlack/60">
          <div class="text-xs uppercase tracking-[0.32em] color-pureBlack/60 dark:color-pureWhite/60">Live brief</div>
          <div class="mt-3 text-2xl font-semibold">Chip wars: the next 18 months</div>
          <p class="mt-3 text-sm color-pureBlack/70 leading-relaxed dark:color-pureWhite/70">
            Timelines, supply-chain signals, and the geopolitics that will shape hardware roadmaps.
          </p>
          <div class="mt-6 text-xs uppercase tracking-[0.2em] color-pureBlack/60 dark:color-pureWhite/60">
            Updated 2 hours ago
          </div>
        </div>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <article class="rounded-3xl border border-pureBlack/10 bg-pureWhite/70 p-6 backdrop-blur-sm dark:border-pureWhite/15 dark:bg-pureBlack/50">
          <div class="text-xs uppercase tracking-[0.28em] color-pureBlack/60 dark:color-pureWhite/60">Case file</div>
          <h3 class="mt-3 text-xl font-semibold">The quiet collapse of consumer metaverse</h3>
          <p class="mt-3 text-sm color-pureBlack/70 leading-relaxed dark:color-pureWhite/70">
            A forensic look at adoption curves, budget reallocations, and why enterprise XR survived.
          </p>
        </article>
        <article class="rounded-3xl border border-pureBlack/10 bg-pureWhite/70 p-6 backdrop-blur-sm dark:border-pureWhite/15 dark:bg-pureBlack/50">
          <div class="text-xs uppercase tracking-[0.28em] color-pureBlack/60 dark:color-pureWhite/60">Launch</div>
          <h3 class="mt-3 text-xl font-semibold">Signal Studio: audio briefings</h3>
          <p class="mt-3 text-sm color-pureBlack/70 leading-relaxed dark:color-pureWhite/70">
            A 9-minute narrative drop summarizing the week in platform shifts and deal flow.
          </p>
        </article>
        <article class="rounded-3xl border border-pureBlack/10 bg-pureWhite/70 p-6 backdrop-blur-sm dark:border-pureWhite/15 dark:bg-pureBlack/50">
          <div class="text-xs uppercase tracking-[0.28em] color-pureBlack/60 dark:color-pureWhite/60">Profile</div>
          <h3 class="mt-3 text-xl font-semibold">The operators rewriting security</h3>
          <p class="mt-3 text-sm color-pureBlack/70 leading-relaxed dark:color-pureWhite/70">
            Inside the teams building autonomous defense layers for cloud-native infrastructure.
          </p>
        </article>
        <article class="rounded-3xl border border-pureBlack/10 bg-pureWhite/70 p-6 backdrop-blur-sm dark:border-pureWhite/15 dark:bg-pureBlack/50">
          <div class="text-xs uppercase tracking-[0.28em] color-pureBlack/60 dark:color-pureWhite/60">Desk memo</div>
          <h3 class="mt-3 text-xl font-semibold">The renaissance of boutique SaaS</h3>
          <p class="mt-3 text-sm color-pureBlack/70 leading-relaxed dark:color-pureWhite/70">
            Lean teams, premium pricing, and a return to quiet profitability.
          </p>
        </article>
        <article class="rounded-3xl border border-pureBlack/10 bg-pureWhite/70 p-6 backdrop-blur-sm dark:border-pureWhite/15 dark:bg-pureBlack/50">
          <div class="text-xs uppercase tracking-[0.28em] color-pureBlack/60 dark:color-pureWhite/60">Archive</div>
          <h3 class="mt-3 text-xl font-semibold">The founders shaping quantum stacks</h3>
          <p class="mt-3 text-sm color-pureBlack/70 leading-relaxed dark:color-pureWhite/70">
            A timeline of talent migration and the IP deals underpinning quantum momentum.
          </p>
        </article>
        <article class="rounded-3xl border border-pureBlack/10 bg-pureWhite/70 p-6 backdrop-blur-sm dark:border-pureWhite/15 dark:bg-pureBlack/50">
          <div class="text-xs uppercase tracking-[0.28em] color-pureBlack/60 dark:color-pureWhite/60">Signal map</div>
          <h3 class="mt-3 text-xl font-semibold">The private cloud resurgence</h3>
          <p class="mt-3 text-sm color-pureBlack/70 leading-relaxed dark:color-pureWhite/70">
            A visual breakdown of why regulated industries are replatforming back on-prem.
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
