<script setup lang="ts">
import DsButton from '@/components/ui/DesignSystem/DsButton.vue'
import DsColorScheme from '@/components/ui/DesignSystem/DsColorScheme.vue'
import DsSectionContainer from '@/components/ui/DesignSystem/DsSectionContainer.vue'
import DsTextLink from '@/components/ui/DesignSystem/DsTextLink.vue'

definePageMeta({
  layout: 'design-system',
})

useHead({
  title: 'Design System - Basics',
})
</script>

<template>
  <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <DsSectionContainer as="header" spacing="lg" layout="block">
      <p class="space-grotesk-regular text-[10px] tracking-[0.2em] uppercase opacity-65">
        P04-MPZ01 · Swiss Signal Orange Clone (MP Zalando) · System Bible
      </p>
      <h1 class="font-clash-regular mt-3 text-[clamp(2rem,5.8vw,4.8rem)] leading-[0.95] uppercase">
        Editorial Basics
      </h1>
      <p class="font-manrope mt-4 max-w-3xl text-sm leading-relaxed opacity-78 md:text-base">
        Pure black and pure white as base. Accent appears only as signal for interaction and hierarchy.
      </p>
      <DsColorScheme />
    </DsSectionContainer>

    <DsSectionContainer spacing="sm" layout="block">
      <article class="border border-pureBlack/16 rounded-xl border-solid p-5 dark:border-pureWhite/16">
        <p class="space-grotesk-regular text-[10px] tracking-[0.18em] uppercase opacity-65">
          Canonical Type Mapping
        </p>
        <h2 class="font-clash-regular mt-2 text-[clamp(1.2rem,2vw,1.7rem)] leading-tight">
          P04-MPZ01 Typography is locked for Design System foundations.
        </h2>
        <ul class="font-manrope grid mt-3 gap-1 text-sm leading-relaxed opacity-85 md:grid-cols-2">
          <li><span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">Display</span> → Druk Bold</li>
          <li><span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">Headline</span> → Clash Display</li>
          <li><span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">Body</span> → Manrope</li>
          <li><span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">Meta / UI</span> → Space Grotesk</li>
          <li><span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">Quote</span> → Libre Baskerville</li>
          <li><span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">Market Pulse Metric</span> → Zalando Sans Expanded</li>
        </ul>
      </article>
    </DsSectionContainer>

    <DsSectionContainer layout="block">
      <div class="mb-7">
        <p class="space-grotesk-regular text-[10px] tracking-[0.18em] uppercase opacity-65">
          components
        </p>
        <h2 class="font-clash-regular mt-2 text-[clamp(1.45rem,2.6vw,2.35rem)] leading-tight">
          Buttons
        </h2>
      </div>

      <article class="border border-pureBlack/16 rounded-xl border-solid p-5 dark:border-pureWhite/16">
        <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">
          Variant State Matrix
        </p>
        <div class="grid mt-4 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <section class="border border-pureBlack/12 rounded-lg border-solid p-3 dark:border-pureWhite/12">
            <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">
              Primary
            </p>
            <div class="mt-3 flex flex-col items-start gap-2">
              <DsButton variant="primary">
                primary
              </DsButton>
              <DsButton variant="primary" preview-state="hover">
                primary-hover
              </DsButton>
              <DsButton variant="primary" preview-state="active">
                primary-active
              </DsButton>
              <DsButton variant="primary" preview-state="focus-visible">
                primary-focus-visible
              </DsButton>
              <DsButton variant="primary" disabled>
                primary-disabled
              </DsButton>
            </div>
          </section>

          <section class="border border-pureBlack/12 rounded-lg border-solid p-3 dark:border-pureWhite/12">
            <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">
              Secondary
            </p>
            <div class="mt-3 flex flex-col items-start gap-2">
              <DsButton variant="secondary">
                secondary
              </DsButton>
              <DsButton variant="secondary" preview-state="hover">
                secondary-hover
              </DsButton>
              <DsButton variant="secondary" preview-state="active">
                secondary-active
              </DsButton>
              <DsButton variant="secondary" preview-state="focus-visible">
                secondary-focus-visible
              </DsButton>
              <DsButton variant="secondary" disabled>
                secondary-disabled
              </DsButton>
            </div>
          </section>

          <section class="border border-pureBlack/12 rounded-lg border-solid p-3 dark:border-pureWhite/12">
            <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">
              Tertiary
            </p>
            <div class="mt-3 flex flex-col items-start gap-2">
              <DsButton variant="tertiary">
                tertiary
              </DsButton>
              <DsButton variant="tertiary" preview-state="hover">
                tertiary-hover
              </DsButton>
              <DsButton variant="tertiary" preview-state="active">
                tertiary-active
              </DsButton>
              <DsButton variant="tertiary" preview-state="focus-visible">
                tertiary-focus-visible
              </DsButton>
              <DsButton variant="tertiary" disabled>
                tertiary-disabled
              </DsButton>
            </div>
          </section>

          <section class="border border-pureBlack/12 rounded-lg border-solid p-3 dark:border-pureWhite/12">
            <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">
              Quartery
            </p>
            <div class="mt-3 flex flex-col items-start gap-2">
              <DsButton variant="quartery">
                quartery
              </DsButton>
              <DsButton variant="quartery" preview-state="hover">
                quartery-hover
              </DsButton>
              <DsButton variant="quartery" preview-state="active">
                quartery-active
              </DsButton>
              <DsButton variant="quartery" preview-state="focus-visible">
                quartery-focus-visible
              </DsButton>
              <DsButton variant="quartery" disabled>
                quartery-disabled
              </DsButton>
            </div>
          </section>
        </div>
      </article>

      <article class="mt-6 border border-pureBlack/16 rounded-xl border-solid p-5 dark:border-pureWhite/16">
        <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">
          Component Spec
        </p>
        <ul class="font-manrope grid mt-3 gap-1 text-sm leading-relaxed opacity-85 md:grid-cols-2">
          <li><span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">Font</span> → Space Grotesk</li>
          <li><span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">Weight</span> → 400 (uppercase meta cadence)</li>
          <li><span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">Intention</span> → Fast CTA scan, compact editorial control</li>
          <li><span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">Color</span> → Teal role matrix for primary/secondary/tertiary/quartery + full interaction states</li>
        </ul>
      </article>
    </DsSectionContainer>

    <DsSectionContainer layout="block">
      <div class="mb-7">
        <p class="space-grotesk-regular text-[10px] tracking-[0.18em] uppercase opacity-65">
          components
        </p>
        <h2 class="font-clash-regular mt-2 text-[clamp(1.45rem,2.6vw,2.35rem)] leading-tight">
          Link + Container
        </h2>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <article class="border border-pureBlack/16 rounded-xl border-solid p-5 dark:border-pureWhite/16">
          <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">
            Text Link
          </p>
          <p class="font-manrope mt-3 text-sm leading-relaxed opacity-85">
            Use links for inline editorial actions and lightweight navigation.
          </p>
          <div class="mt-3">
            <DsTextLink href="#">
              Read full story guidelines
            </DsTextLink>
          </div>
        </article>

        <article class="border border-pureBlack/16 rounded-xl border-solid p-5 dark:border-pureWhite/16">
          <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">
            Container Rules
          </p>
          <ul class="font-manrope mt-3 text-sm leading-relaxed opacity-82 space-y-1">
            <li>`DsSectionContainer`: one primitive for spacing + container + guide.</li>
            <li>Default content layout is `grid`; switch via `layout` prop.</li>
            <li>Use `contained=false` for full-bleed sections.</li>
          </ul>
        </article>
      </div>

      <article class="mt-6 border border-pureBlack/16 rounded-xl border-solid p-5 dark:border-pureWhite/16">
        <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">
          Component Spec
        </p>
        <ul class="font-manrope grid mt-3 gap-1 text-sm leading-relaxed opacity-85 md:grid-cols-2">
          <li><span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">Link Font</span> → Manrope</li>
          <li><span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">Link Weight</span> → 400</li>
          <li><span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">Link Intention</span> → Inline editorial navigation with low noise</li>
          <li><span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">Link Color</span> → Teal accent with underline signal</li>
          <li><span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">Container Font</span> → Clash (title), Space Grotesk (meta), Manrope (body)</li>
          <li><span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">Container Intention</span> → Structured chapter rhythm with stable reading width</li>
        </ul>
      </article>
    </DsSectionContainer>

    <DsSectionContainer :full-viewport="true" layout="block">
      <div class="mb-7">
        <p class="space-grotesk-regular text-[10px] tracking-[0.18em] uppercase opacity-65">
          layout
        </p>
        <h2 class="font-clash-regular mt-2 text-[clamp(1.45rem,2.6vw,2.35rem)] leading-tight">
          Viewport Section
        </h2>
      </div>

      <article class="border border-pureBlack/16 rounded-xl border-solid p-5 dark:border-pureWhite/16 md:p-7">
        <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">
          Full Viewport Example
        </p>
        <h3 class="font-clash-regular mt-2 text-[clamp(1.4rem,2.6vw,2.2rem)] leading-tight">
          Section can intentionally fill the whole client viewport.
        </h3>
        <p class="font-manrope mt-3 max-w-3xl text-sm leading-relaxed opacity-82 md:text-base">
          This helps build container-by-container editorial pages with strong chapter rhythm.
        </p>
      </article>

      <article class="mt-6 border border-pureBlack/16 rounded-xl border-solid p-5 dark:border-pureWhite/16 md:p-7">
        <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">
          Component Spec
        </p>
        <ul class="font-manrope grid mt-3 gap-1 text-sm leading-relaxed opacity-85 md:grid-cols-2">
          <li><span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">Font</span> → Clash section headlines + Manrope body</li>
          <li><span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">Weight</span> → Headline 400, Body 400</li>
          <li><span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">Intention</span> → Full-screen chapter break with clear reading entry</li>
          <li><span class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">Color</span> → Pure black/white surfaces, accent reserved for actions</li>
        </ul>
      </article>
    </DsSectionContainer>
  </div>
</template>
