<script setup lang="ts">
import DsButton from '@/components/ui/DesignSystem/DsButton.vue'
import DsSectionBody from '@/components/ui/DesignSystem/DsSectionBody.vue'
import DsSectionShell from '@/components/ui/DesignSystem/DsSectionShell.vue'
import DsTypography from '@/components/ui/DesignSystem/DsTypography.vue'

definePageMeta({
  layout: 'design-system',
})

useHead({
  title: 'Design System Debug - Container & Spacing',
})

const typoSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const

const typoRoleMatrix = [
  { role: 'display', label: 'Display', sample: 'Swiss Editorial System', uppercase: true },
  { role: 'headline', label: 'Headline', sample: 'Asymmetric composition and rhythm.', uppercase: false },
  { role: 'body', label: 'Body', sample: 'Readable paragraph text for long-form content.', uppercase: false },
  { role: 'meta', label: 'Meta', sample: 'token / scale / spacing', uppercase: true },
  { role: 'quote', label: 'Quote', sample: 'Design is clarity.', uppercase: false },
  { role: 'signal', label: 'Signal', sample: 'Status channel active', uppercase: false },
] as const

function tokenLabel(role: string, size: string) {
  return `text-$type-${role}-${size}`
}
</script>

<template>
  <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <DsSectionShell
      as="header"
      spacing="md"
      :debug="true"
    >
      <DsSectionBody :debug="true">
        <div class="bg-[#10b981]/8 outline-1 outline-[#10b981]/80 outline space-y-6 dark:bg-[#10b981]/12 dark:outline-[#34d399]/80 md:space-y-7">
          <DsTypography
            as="p"
            role="meta"
            size="xs"
            uppercase
          >
            Debug Page
          </DsTypography>
          <DsTypography
            as="h1"
            role="headline"
            size="2xl"
            uppercase
          >
            Container + Spacing Forge
          </DsTypography>
          <DsTypography
            as="p"
            role="body"
            size="md"
            tone="muted"
          >
            Diese Seite zeigt bewusst nur Container/Section/Button-Grundlagen mit aktiven Debug-Outlines.
          </DsTypography>
        </div>
      </DsSectionBody>
    </DsSectionShell>

    <DsSectionShell
      spacing="sm"
      :debug="true"
    >
      <DsSectionBody
        max="7xl"
        gutter="md"
        :debug="true"
      >
        <div class="bg-[#10b981]/8 outline-1 outline-[#10b981]/80 outline space-y-6 dark:bg-[#10b981]/12 dark:outline-[#34d399]/80 md:space-y-7">
          <DsTypography
            as="p"
            role="meta"
            size="xs"
            uppercase
          >
            Typography Scaling Check
          </DsTypography>

          <div class="grid gap-8 md:grid-cols-2">
            <div class="bg-[#ef4444]/6 p-4 outline-2 outline-[#ef4444]/80 outline space-y-5 dark:bg-[#ef4444]/10 dark:outline-[#f87171]/90">
              <DsTypography
                as="p"
                role="meta"
                size="xs"
                uppercase
              >
                Display + Headline
              </DsTypography>

              <div class="space-y-4">
                <div class="space-y-2">
                  <DsTypography as="p" role="meta" size="xs" tone="muted">
                    display / 4xl • text-$type-display-4xl
                  </DsTypography>
                  <DsTypography as="h1" role="display" size="4xl">
                    Swiss Contrast System
                  </DsTypography>
                </div>
                <div class="space-y-2">
                  <DsTypography as="p" role="meta" size="xs" tone="muted">
                    display / 3xl • text-$type-display-3xl
                  </DsTypography>
                  <DsTypography as="h2" role="display" size="3xl">
                    Editorial Signals
                  </DsTypography>
                </div>
                <div class="space-y-2">
                  <DsTypography as="p" role="meta" size="xs" tone="muted">
                    headline / xl • text-$type-headline-xl
                  </DsTypography>
                  <DsTypography as="h3" role="headline" size="xl">
                    Asymmetric Structure
                  </DsTypography>
                </div>
              </div>
            </div>

            <div class="bg-[#ef4444]/6 p-4 outline-2 outline-[#ef4444]/80 outline space-y-5 dark:bg-[#ef4444]/10 dark:outline-[#f87171]/90">
              <DsTypography
                as="p"
                role="meta"
                size="xs"
                uppercase
              >
                Body + Meta + Signal + Quote
              </DsTypography>

              <div class="space-y-4">
                <div class="space-y-2">
                  <DsTypography as="p" role="meta" size="xs" tone="muted">
                    body / lg • text-$type-body-lg
                  </DsTypography>
                  <DsTypography as="p" role="body" size="lg">
                    The container and spacing tokens keep page rhythm stable across viewport changes.
                  </DsTypography>
                </div>
                <div class="space-y-2">
                  <DsTypography as="p" role="meta" size="xs" tone="muted">
                    meta / xs • text-$type-meta-xs
                  </DsTypography>
                  <DsTypography as="p" role="meta" size="xs" uppercase>
                    token audit / line-height / letter-spacing
                  </DsTypography>
                </div>
                <div class="space-y-2">
                  <DsTypography as="p" role="meta" size="xs" tone="muted">
                    signal / sm • text-$type-signal-sm
                  </DsTypography>
                  <DsTypography as="p" role="signal" size="sm">
                    Status channel active
                  </DsTypography>
                </div>
                <div class="space-y-2">
                  <DsTypography as="p" role="meta" size="xs" tone="muted">
                    quote / md • text-$type-quote-md
                  </DsTypography>
                  <DsTypography as="blockquote" role="quote" size="md">
                    Form follows hierarchy.
                  </DsTypography>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-[#ef4444]/6 p-4 outline-2 outline-[#ef4444]/80 outline space-y-6 dark:bg-[#ef4444]/10 dark:outline-[#f87171]/90">
            <DsTypography
              as="p"
              role="meta"
              size="xs"
              uppercase
            >
              Full Typography Matrix (All Roles × All Sizes)
            </DsTypography>

            <div class="grid gap-5">
              <div
                v-for="item in typoRoleMatrix"
                :key="item.role"
                class="border border-pureBlack/12 rounded-xl p-4 space-y-4 dark:border-pureWhite/18"
              >
                <DsTypography
                  as="p"
                  role="meta"
                  size="xs"
                  uppercase
                >
                  {{ item.label }}
                </DsTypography>

                <div class="space-y-3">
                  <div
                    v-for="size in typoSizes"
                    :key="`${item.role}-${size}`"
                    class="space-y-1.5"
                  >
                    <DsTypography as="p" role="meta" size="xs" tone="muted">
                      {{ item.role }} / {{ size }} • {{ tokenLabel(item.role, size) }}
                    </DsTypography>
                    <DsTypography
                      as="p"
                      :role="item.role"
                      :size="size"
                      :uppercase="item.uppercase"
                    >
                      {{ item.sample }}
                    </DsTypography>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DsTypography
            as="p"
            role="meta"
            size="xs"
            uppercase
          >
            Frame + Content: max=7xl · gutter=md
          </DsTypography>

          <div class="mt-3 bg-[#ef4444]/6 outline-2 outline-[#ef4444]/80 outline dark:bg-[#ef4444]/10 dark:outline-[#f87171]/90">
            <div class="p-4 space-y-3">
              <DsButton
                type="primary"
                variant="default"
                size="sm"
              >
                Small
              </DsButton>
              <DsButton
                type="primary"
                variant="default"
                size="md"
              >
                Medium
              </DsButton>
              <DsButton
                type="primary"
                variant="default"
                size="lg"
              >
                Large
              </DsButton>
            </div>
          </div>
        </div>
      </DsSectionBody>
    </DsSectionShell>

    <DsSectionShell
      spacing="sm"
      :debug="true"
    >
      <DsSectionBody
        mode="fluid"
        :debug="true"
      >
        <div class="bg-[#10b981]/8 outline-1 outline-[#10b981]/80 outline space-y-6 dark:bg-[#10b981]/12 dark:outline-[#34d399]/80 md:space-y-7">
          <DsTypography
            as="p"
            role="meta"
            size="xs"
            uppercase
          >
            Content: contained=false
          </DsTypography>
          <div class="mt-3 bg-[#ef4444]/6 outline-2 outline-[#ef4444]/80 outline dark:bg-[#ef4444]/10 dark:outline-[#f87171]/90">
            <div class="flex flex-wrap gap-3 p-4">
              <DsButton
                type="primary"
                variant="default"
                size="md"
              >
                Primary
              </DsButton>
              <DsButton
                type="secondary"
                variant="default"
                size="md"
              >
                Secondary
              </DsButton>
              <DsButton
                type="tertiary"
                variant="default"
                size="md"
              >
                Tertiary
              </DsButton>
              <DsButton
                type="quaternary"
                variant="default"
                size="md"
              >
                Quaternary
              </DsButton>
            </div>
          </div>

          <div class="mt-3 bg-[#ef4444]/6 outline-2 outline-[#ef4444]/80 outline dark:bg-[#ef4444]/10 dark:outline-[#f87171]/90">
            <div class="space-y-4 p-4">
              <DsTypography
                as="p"
                role="meta"
                size="xs"
                uppercase
              >
                Secondary Vertical Sweep Demo (Variant 2)
              </DsTypography>

              <div class="flex flex-wrap items-center gap-3">
                <DsButton
                  type="secondary"
                  variant="default"
                  size="md"
                >
                  Secondary Current
                </DsButton>

                <button
                  type="button"
                  class="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-solid border-transparent bg-transparent px-4 py-2 [box-shadow:inset_0_0_0_2px_var(--border-primary)] [transition-property:color,box-shadow] [transition-duration:var(--motion-secondary-sweep-duration)] [transition-timing-function:var(--motion-secondary-sweep-ease)] hover:[box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand10)] active:translate-y-[1px] active:[box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand11)] dark:active:[box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand9)] focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_var(--pure-white),0_0_0_4px_var(--un-preset-radix-sand10)] dark:focus-visible:[box-shadow:0_0_0_2px_var(--pure-black),0_0_0_4px_var(--un-preset-radix-sand10)]"
                >
                  <span class="relative z-10 text-$color-primary transition-colors duration-300 ease-out group-hover:color-pureWhite group-focus-visible:color-pureWhite group-active:color-pureWhite">
                    <DsTypography
                      as="span"
                      role="meta"
                      size="sm"
                      tracking="relaxed"
                      uppercase
                    >
                      Secondary Sweep
                    </DsTypography>
                  </span>
                  <span class="absolute inset-0 z-0 bg-sand-10 translate-y-full transform [transition-duration:var(--motion-secondary-sweep-duration)] [transition-timing-function:var(--motion-secondary-sweep-ease)] transition-transform group-hover:translate-y-0 group-focus-visible:translate-y-0 group-active:translate-y-0 group-active:bg-sand-11 dark:group-active:bg-sand-9" />
                </button>

                <button
                  type="button"
                  class="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-solid border-transparent bg-transparent px-4 py-2 [box-shadow:inset_0_0_0_2px_var(--border-accent)] [transition-property:color,box-shadow] [transition-duration:var(--motion-secondary-sweep-duration)] [transition-timing-function:var(--motion-secondary-sweep-ease)] hover:[box-shadow:inset_0_0_0_2px_var(--border-accent-outline-fill)] active:translate-y-[1px] active:[box-shadow:inset_0_0_0_2px_var(--border-accent-outline-fill)] focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--border-accent-outline-fill)]"
                >
                  <span class="relative z-10 text-$color-accent transition-colors duration-300 ease-out group-hover:color-$color-primary group-focus-visible:color-$color-primary group-active:color-$color-primary">
                    <DsTypography
                      as="span"
                      role="meta"
                      size="sm"
                      tracking="relaxed"
                      uppercase
                    >
                      Secondary Sweep Accent
                    </DsTypography>
                  </span>
                  <span class="absolute inset-0 z-0 bg-$bg-accent-outline-fill translate-y-full transform [transition-duration:var(--motion-secondary-sweep-duration)] [transition-timing-function:var(--motion-secondary-sweep-ease)] transition-transform group-hover:translate-y-0 group-focus-visible:translate-y-0 group-active:translate-y-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </DsSectionBody>
    </DsSectionShell>

    <DsSectionShell
      spacing="sm"
      :debug="true"
    >
      <DsSectionBody
        max="full"
        gutter="lg"
        :debug="true"
      >
        <div class="bg-[#10b981]/8 outline-1 outline-[#10b981]/80 outline space-y-6 dark:bg-[#10b981]/12 dark:outline-[#34d399]/80 md:space-y-7">
          <DsTypography
            as="p"
            role="meta"
            size="xs"
            uppercase
          >
            Content: max=full · gutter=lg
          </DsTypography>
          <div class="mt-3 bg-[#ef4444]/6 outline-2 outline-[#ef4444]/80 outline dark:bg-[#ef4444]/10 dark:outline-[#f87171]/90">
            <div class="flex flex-wrap gap-3 p-4">
              <DsButton
                type="primary"
                variant="accent"
                size="md"
              >
                Primary
              </DsButton>
              <DsButton
                type="secondary"
                variant="accent"
                size="md"
              >
                Secondary
              </DsButton>
              <DsButton
                type="tertiary"
                variant="accent"
                size="md"
              >
                Tertiary
              </DsButton>
              <DsButton
                type="quaternary"
                variant="accent"
                size="md"
              >
                Quaternary
              </DsButton>
            </div>
          </div>
        </div>
      </DsSectionBody>
    </DsSectionShell>
  </div>
</template>
