<script setup lang="ts">
import DsTypography from './DsTypography.vue'
</script>

<template>
  <article class="border border-pureBlack/16 rounded-xl border-solid p-5 dark:border-pureWhite/16">
    <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">
      Typography Foundation Matrix
    </p>

    <div class="grid mt-4 gap-4 md:grid-cols-2">
      <section class="border border-pureBlack/10 rounded-lg border-solid p-4 dark:border-pureWhite/10">
        <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">
          Display / Headline
        </p>
        <div class="mt-3 space-y-3">
          <DsTypography
            as="h2"
            role="display"
            size="3xl"
            uppercase
          >
            Display XL
          </DsTypography>
          <DsTypography
            as="h3"
            role="display"
            size="2xl"
            uppercase
          >
            Display LG
          </DsTypography>
          <DsTypography
            as="h4"
            role="headline"
            size="xl"
            uppercase
          >
            Headline LG
          </DsTypography>
          <DsTypography
            as="h5"
            role="headline"
            size="lg"
            uppercase
          >
            Headline MD
          </DsTypography>
          <DsTypography
            as="h6"
            role="headline"
            size="md"
            uppercase
          >
            Headline SM
          </DsTypography>
        </div>
      </section>

      <section class="border border-pureBlack/10 rounded-lg border-solid p-4 dark:border-pureWhite/10">
        <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">
          Body / Meta / Signal
        </p>
        <div class="mt-3 space-y-3">
          <DsTypography
            as="p"
            role="body"
            size="md"
          >
            Text LG - Teams evaluate systems by quality, auditability, and rollback speed.
          </DsTypography>
          <DsTypography
            as="p"
            role="body"
            size="sm"
          >
            Text MD - Default content for cards, paragraphs and component descriptions.
          </DsTypography>
          <DsTypography
            as="p"
            role="body"
            size="xs"
          >
            Text SM - Dense helper copy for compact contexts.
          </DsTypography>
          <DsTypography
            as="p"
            role="meta"
            size="sm"
            uppercase
          >
            Meta SM - Component Label
          </DsTypography>
          <DsTypography
            as="p"
            role="meta"
            size="xs"
            uppercase
          >
            Meta XS - Micro Label
          </DsTypography>
          <DsTypography
            as="p"
            role="signal"
            size="sm"
            uppercase
          >
            Signal SM - Market Pulse 64
          </DsTypography>
          <DsTypography
            as="blockquote"
            role="quote"
            size="lg"
          >
            “Consistency is predictable decision flow, not visual sameness.”
          </DsTypography>
        </div>
      </section>
    </div>
  </article>
</template>
