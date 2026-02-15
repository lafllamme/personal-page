<script setup lang="ts">
import DsButton from '@/components/ui/DesignSystem/DsButton.vue'
import DsCard from '@/components/ui/DesignSystem/DsCard.vue'
import DsDivider from '@/components/ui/DesignSystem/DsDivider.vue'
import DsField from '@/components/ui/DesignSystem/DsField.vue'
import DsHeadingBlock from '@/components/ui/DesignSystem/DsHeadingBlock.vue'
import DsInput from '@/components/ui/DesignSystem/DsInput.vue'
import DsSectionContainer from '@/components/ui/DesignSystem/DsSectionContainer.vue'
import DsSelect from '@/components/ui/DesignSystem/DsSelect.vue'
import DsTextarea from '@/components/ui/DesignSystem/DsTextarea.vue'
import DsTypography from '@/components/ui/DesignSystem/DsTypography.vue'

definePageMeta({
  layout: 'design-system',
})

useHead({
  title: 'Design System - Basics',
})

const sampleInput = ref('')
const sampleTextarea = ref('')
const sampleSelect = ref('')

const selectOptions = [
  { label: 'AI', value: 'ai' },
  { label: 'Infra', value: 'infra' },
  { label: 'Policy', value: 'policy' },
]
</script>

<template>
  <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <DsSectionContainer as="header" spacing="lg" layout="block">
      <p class="space-grotesk-regular text-[10px] tracking-[0.2em] uppercase opacity-65">
        P04-MPZ01 · Foundation Build
      </p>
      <h1 class="font-clash-regular mt-3 text-[clamp(2rem,5.8vw,4.8rem)] leading-[0.95] uppercase">
        Intro
      </h1>
      <p class="font-manrope mt-4 max-w-3xl text-sm leading-relaxed opacity-78 md:text-base">
        Pure black and pure white as base. Accent remains controlled via Radix Teal and is only used for interaction and hierarchy.
      </p>
    </DsSectionContainer>

    <DsSectionContainer layout="block">
      <div class="mb-7">
        <p class="space-grotesk-regular text-[10px] tracking-[0.18em] uppercase opacity-65">
          foundation
        </p>
        <h2 class="font-clash-regular mt-2 text-[clamp(1.45rem,2.6vw,2.35rem)] leading-tight">
          Typography
        </h2>
      </div>

      <article class="border border-pureBlack/16 rounded-xl border-solid p-5 dark:border-pureWhite/16">
        <div class="grid gap-4 md:grid-cols-2">
          <div class="grid gap-2">
            <DsTypography as="p" role="meta" size="xs" tone="muted" uppercase>
              display
            </DsTypography>
            <DsTypography as="h2" role="display" size="3xl" uppercase>
              Signal Desk
            </DsTypography>
          </div>

          <div class="grid gap-2">
            <DsTypography as="p" role="meta" size="xs" tone="muted" uppercase>
              headline
            </DsTypography>
            <DsTypography as="h3" role="headline" size="2xl" uppercase>
              Editorial hierarchy stays strict
            </DsTypography>
          </div>

          <div class="grid gap-2">
            <DsTypography as="p" role="meta" size="xs" tone="muted" uppercase>
              body
            </DsTypography>
            <DsTypography as="p" role="body" size="md">
              Teams evaluate AI systems not only by quality, but by auditability, rollback speed, and operational clarity.
            </DsTypography>
          </div>

          <div class="grid gap-2">
            <DsTypography as="p" role="meta" size="xs" tone="muted" uppercase>
              quote + signal
            </DsTypography>
            <DsTypography as="blockquote" role="quote" size="lg">
              “Consistency is not visual sameness, it is predictable decision flow.”
            </DsTypography>
            <DsTypography as="p" role="signal" size="sm" uppercase>
              Market Pulse 64
            </DsTypography>
          </div>
        </div>
      </article>
    </DsSectionContainer>

    <DsSectionContainer layout="block">
      <div class="mb-7">
        <p class="space-grotesk-regular text-[10px] tracking-[0.18em] uppercase opacity-65">
          foundation
        </p>
        <h2 class="font-clash-regular mt-2 text-[clamp(1.45rem,2.6vw,2.35rem)] leading-tight">
          Heading Block
        </h2>
      </div>

      <article class="border border-pureBlack/16 rounded-xl border-solid p-5 dark:border-pureWhite/16">
        <DsHeadingBlock
          kicker="TechNews Weekly"
          title="Policy, Platform, Product"
          dek="One reusable heading pattern for section intros: kicker, clear title, short supporting dek, and compact metadata row."
          :meta="['Mara Stein', 'Feb 15, 2026', '8 min read']"
          title-as="h2"
          title-size="2xl"
        />
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
                Click Me
              </DsButton>
              <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                hover
              </p>
              <DsButton variant="primary" preview-state="hover">
                Click Me
              </DsButton>
              <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                active
              </p>
              <DsButton variant="primary" preview-state="active">
                Click Me
              </DsButton>
              <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                focus-visible
              </p>
              <DsButton variant="primary" preview-state="focus-visible">
                Click Me
              </DsButton>
              <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                disabled
              </p>
              <DsButton variant="primary" disabled>
                Click Me
              </DsButton>
            </div>
          </section>

          <section class="border border-pureBlack/12 rounded-lg border-solid p-3 dark:border-pureWhite/12">
            <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">
              Secondary
            </p>
            <div class="mt-3 flex flex-col items-start gap-2">
              <DsButton variant="secondary">
                Click Me
              </DsButton>
              <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                hover
              </p>
              <DsButton variant="secondary" preview-state="hover">
                Click Me
              </DsButton>
              <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                active
              </p>
              <DsButton variant="secondary" preview-state="active">
                Click Me
              </DsButton>
              <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                focus-visible
              </p>
              <DsButton variant="secondary" preview-state="focus-visible">
                Click Me
              </DsButton>
              <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                disabled
              </p>
              <DsButton variant="secondary" disabled>
                Click Me
              </DsButton>
            </div>
          </section>

          <section class="border border-pureBlack/12 rounded-lg border-solid p-3 dark:border-pureWhite/12">
            <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">
              Tertiary
            </p>
            <div class="mt-3 flex flex-col items-start gap-2">
              <DsButton variant="tertiary">
                Click Me
              </DsButton>
              <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                hover
              </p>
              <DsButton variant="tertiary" preview-state="hover">
                Click Me
              </DsButton>
              <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                active
              </p>
              <DsButton variant="tertiary" preview-state="active">
                Click Me
              </DsButton>
              <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                focus-visible
              </p>
              <DsButton variant="tertiary" preview-state="focus-visible">
                Click Me
              </DsButton>
              <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                disabled
              </p>
              <DsButton variant="tertiary" disabled>
                Click Me
              </DsButton>
            </div>
          </section>

          <section class="border border-pureBlack/12 rounded-lg border-solid p-3 dark:border-pureWhite/12">
            <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">
              Quartery
            </p>
            <div class="mt-3 flex flex-col items-start gap-2">
              <DsButton variant="quartery">
                Click Me
              </DsButton>
              <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                hover
              </p>
              <DsButton variant="quartery" preview-state="hover">
                Click Me
              </DsButton>
              <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                active
              </p>
              <DsButton variant="quartery" preview-state="active">
                Click Me
              </DsButton>
              <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                focus-visible
              </p>
              <DsButton variant="quartery" preview-state="focus-visible">
                Click Me
              </DsButton>
              <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                disabled
              </p>
              <DsButton variant="quartery" disabled>
                Click Me
              </DsButton>
            </div>
          </section>
        </div>
      </article>
    </DsSectionContainer>

    <DsSectionContainer layout="block">
      <div class="mb-7">
        <p class="space-grotesk-regular text-[10px] tracking-[0.18em] uppercase opacity-65">
          foundation
        </p>
        <h2 class="font-clash-regular mt-2 text-[clamp(1.45rem,2.6vw,2.35rem)] leading-tight">
          Form Primitives
        </h2>
      </div>

      <DsCard variant="default">
        <div class="grid gap-5 md:grid-cols-2">
          <DsField
            for-id="ds-input-default"
            label="Input"
            hint="Default input with tokenized focus behavior."
          >
            <DsInput
              id="ds-input-default"
              v-model="sampleInput"
              placeholder="Type signal title"
            />
          </DsField>

          <DsField
            for-id="ds-input-hover"
            label="Input State"
            hint="Preview hover state"
          >
            <DsInput
              id="ds-input-hover"
              preview-state="hover"
              placeholder="Hover preview"
            />
          </DsField>

          <DsField
            for-id="ds-select-default"
            label="Select"
            hint="Category selector"
          >
            <DsSelect
              id="ds-select-default"
              v-model="sampleSelect"
              :options="selectOptions"
            />
          </DsField>

          <DsField
            for-id="ds-select-focus"
            label="Select State"
            hint="Preview focus-visible state"
          >
            <DsSelect
              id="ds-select-focus"
              preview-state="focus-visible"
              :options="selectOptions"
            />
          </DsField>

          <DsField
            for-id="ds-textarea-default"
            label="Textarea"
            hint="Longform notes"
            class="md:col-span-2"
          >
            <DsTextarea
              id="ds-textarea-default"
              v-model="sampleTextarea"
              placeholder="Write a short editorial annotation..."
              :rows="4"
            />
          </DsField>

          <DsField
            for-id="ds-textarea-error"
            label="Textarea Error"
            error="Please provide at least 30 characters."
            class="md:col-span-2"
          >
            <DsTextarea
              id="ds-textarea-error"
              invalid
              placeholder="Invalid preview"
              :rows="3"
            />
          </DsField>
        </div>
      </DsCard>
    </DsSectionContainer>

    <DsSectionContainer layout="block">
      <div class="mb-7">
        <p class="space-grotesk-regular text-[10px] tracking-[0.18em] uppercase opacity-65">
          foundation
        </p>
        <h2 class="font-clash-regular mt-2 text-[clamp(1.45rem,2.6vw,2.35rem)] leading-tight">
          Card + Divider
        </h2>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <DsCard variant="default">
          <DsTypography as="p" role="meta" size="xs" uppercase tone="muted">
            default
          </DsTypography>
          <DsTypography as="h3" role="headline" size="lg" class="mt-2" uppercase>
            Story Card
          </DsTypography>
          <DsTypography as="p" role="body" size="sm" tone="muted" class="mt-2">
            Baseline surface for editorial modules.
          </DsTypography>
        </DsCard>

        <DsCard variant="subtle">
          <DsTypography as="p" role="meta" size="xs" uppercase tone="muted">
            subtle
          </DsTypography>
          <DsTypography as="h3" role="headline" size="lg" class="mt-2" uppercase>
            Utility Card
          </DsTypography>
          <DsTypography as="p" role="body" size="sm" tone="muted" class="mt-2">
            Higher surface separation with minimal contrast.
          </DsTypography>
        </DsCard>

        <DsCard variant="accent" interactive>
          <DsTypography as="p" role="meta" size="xs" uppercase tone="muted">
            accent + interactive
          </DsTypography>
          <DsTypography as="h3" role="headline" size="lg" class="mt-2" uppercase>
            Signal Card
          </DsTypography>
          <DsTypography as="p" role="body" size="sm" tone="muted" class="mt-2">
            Hover and focus-within driven by accent semantics.
          </DsTypography>
        </DsCard>
      </div>

      <DsCard class="mt-4">
        <div class="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <DsTypography as="p" role="body" size="sm">
            Horizontal divider in content flow
          </DsTypography>
          <DsDivider tone="accent" />
          <DsTypography as="p" role="body" size="sm" class="md:text-right">
            Accent rule as chapter separator
          </DsTypography>
        </div>
      </DsCard>
    </DsSectionContainer>
  </div>
</template>
