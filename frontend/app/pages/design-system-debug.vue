<script setup lang="ts">
import { gsap } from 'gsap'
import { onBeforeUnmount, onMounted } from 'vue'
import DsButton from '@/components/ui/DesignSystem/DsButton.vue'
import DsSectionBody from '@/components/ui/DesignSystem/DsSectionBody.vue'
import DsSectionShell from '@/components/ui/DesignSystem/DsSectionShell.vue'
import DsTextLink from '@/components/ui/DesignSystem/DsTextLink.vue'
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

const disposeOrbitHandlers: Array<() => void> = []

onMounted(() => {
  const buttons = document.querySelectorAll<HTMLButtonElement>('.osmo-rot-btn')

  buttons.forEach((button) => {
    let tween: gsap.core.Tween | null = null

    const runOrbit = () => {
      const labels = button.querySelectorAll<HTMLElement>('.osmo-rot-label')
      if (!labels.length)
        return

      if (tween) {
        tween.kill()
        tween = null
        gsap.set(labels, { clearProps: 'rotation' })
      }

      const r = Number.parseFloat(getComputedStyle(button).getPropertyValue('--r')) || 20

      tween = gsap.to(labels, {
        rotation: `+=${r}`,
        duration: 0.5,
        ease: 'expo.out',
        stagger: 0.075,
        overwrite: 'auto',
        onComplete: () => {
          gsap.set(labels, { clearProps: 'rotation' })
          tween = null
        },
      })
    }

    button.addEventListener('pointerenter', runOrbit)
    button.addEventListener('focusin', runOrbit)

    disposeOrbitHandlers.push(() => {
      button.removeEventListener('pointerenter', runOrbit)
      button.removeEventListener('focusin', runOrbit)
      if (tween) {
        tween.kill()
        tween = null
      }
      const labels = button.querySelectorAll<HTMLElement>('.osmo-rot-label')
      gsap.set(labels, { clearProps: 'rotation' })
    })
  })
})

onBeforeUnmount(() => {
  disposeOrbitHandlers.forEach(fn => fn())
  disposeOrbitHandlers.length = 0
})
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
                CLICK MEEEEE
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
            Link Concepts (Debug)
          </DsTypography>

          <DsTypography
            as="p"
            role="body"
            size="sm"
            tone="muted"
          >
            Zwei Link-Arten: Default mit immer sichtbarer Underline, plus Hover-Underline für Footer/Nav-Kontext.
          </DsTypography>

          <div class="mt-3 bg-[#ef4444]/6 p-4 outline-2 outline-[#ef4444]/80 outline dark:bg-[#ef4444]/10 dark:outline-[#f87171]/90">
            <div class="grid gap-6 md:grid-cols-2">
              <div class="space-y-2">
                <DsTypography as="p" role="meta" size="xs" uppercase>
                  Default · Always Underline
                </DsTypography>
                <DsTextLink
                  href="#"
                  text="Read article"
                />
              </div>

              <div class="space-y-2">
                <DsTypography as="p" role="meta" size="xs" uppercase>
                  Variant · Hover Underline (L1 Sweep)
                </DsTypography>
                <DsTextLink
                  href="#"
                  text="Read article"
                  underline="hover"
                />
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
            Primary Study (Osmo Header Hover)
          </DsTypography>

          <DsTypography
            as="p"
            role="body"
            size="sm"
            tone="muted"
          >
            Text rotiert in einem radialen Orbit innerhalb des Buttons. Study-only, noch nicht tokenisiert.
          </DsTypography>

          <div class="mt-3 bg-[#ef4444]/6 p-4 outline-2 outline-[#ef4444]/80 outline dark:bg-[#ef4444]/10 dark:outline-[#f87171]/90">
            <div class="flex flex-wrap items-center gap-4">
              <button class="osmo-rot-btn" type="button">
                <span class="osmo-rot-label-wrap">
                  <span class="osmo-rot-label">READ</span>
                  <span class="osmo-rot-label" aria-hidden="true">READ</span>
                  <span class="osmo-rot-label" aria-hidden="true">READ</span>
                </span>
              </button>

              <button class="osmo-rot-btn osmo-rot-btn-solid" type="button">
                <span class="osmo-rot-label-wrap">
                  <span class="osmo-rot-label">Join</span>
                  <span class="osmo-rot-label" aria-hidden="true">Join</span>
                  <span class="osmo-rot-label" aria-hidden="true">Join</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </DsSectionBody>
    </DsSectionShell>
  </div>
</template>

<style scoped>
.osmo-rot-btn {
  --r: 20deg;
  --y: 1180%;
  position: relative;
  border-radius: 9999px;
  border: 1px solid currentColor;
  color: var(--color-primary);
  background: transparent;
  padding: 0.52rem 1rem;
  line-height: 1;
  overflow: hidden;
  cursor: pointer;
}

.osmo-rot-btn-solid {
  background: var(--color-primary);
  color: var(--color-inverse);
}

.osmo-rot-label-wrap {
  position: relative;
  display: inline-grid;
  place-items: center;
}

.osmo-rot-label {
  grid-area: 1 / 1;
  transform-origin: 50% var(--y);
  will-change: transform;
  white-space: nowrap;
}

.osmo-rot-label:nth-of-type(1) {
  transform: rotate(0deg);
}

.osmo-rot-label:nth-of-type(2) {
  position: absolute;
  transform: rotate(calc(var(--r) * -1));
}

.osmo-rot-label:nth-of-type(3) {
  position: absolute;
  transform: rotate(calc(var(--r) * -2));
}
</style>
