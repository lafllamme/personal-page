<script setup lang="ts">
import DsButton from './DsButton.vue'
import DsContainer from './DsContainer.vue'
import DsSectionContainer from './DsSectionContainer.vue'

const variants = [
  { key: 'default', label: 'Variant Default' },
  { key: 'accent', label: 'Variant Accent' },
] as const

const types = [
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'tertiary', label: 'Tertiary' },
  { key: 'quaternary', label: 'Quaternary' },
] as const
</script>

<template>
  <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <main class="pt-[var(--header-height)]">
      <DsContainer>
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
            <div class="grid mt-4 gap-5">
              <section
                v-for="variant in variants"
                :key="variant.key"
                class="border border-pureBlack/12 rounded-lg border-solid p-4 dark:border-pureWhite/12"
              >
                <p class="space-grotesk-regular text-[10px] tracking-[0.18em] uppercase opacity-70">
                  {{ variant.label }}
                </p>
                <div class="grid mt-3 gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <section
                    v-for="type in types"
                    :key="`${variant.key}-${type.key}`"
                    class="border border-pureBlack/12 rounded-lg border-solid p-3 dark:border-pureWhite/12"
                  >
                    <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">
                      {{ type.label }}
                    </p>
                    <div class="mt-3 flex flex-col items-start gap-2">
                      <DsButton :type="type.key" :variant="variant.key">
                        Click Me
                      </DsButton>
                      <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                        hover
                      </p>
                      <DsButton :type="type.key" :variant="variant.key" preview-state="hover">
                        Click Me
                      </DsButton>
                      <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                        active
                      </p>
                      <DsButton :type="type.key" :variant="variant.key" preview-state="active">
                        Click Me
                      </DsButton>
                      <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                        focus-visible
                      </p>
                      <DsButton :type="type.key" :variant="variant.key" preview-state="focus-visible">
                        Click Me
                      </DsButton>
                      <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                        disabled
                      </p>
                      <DsButton :type="type.key" :variant="variant.key" disabled>
                        Click Me
                      </DsButton>
                    </div>
                  </section>
                </div>
              </section>
            </div>
          </article>
        </DsSectionContainer>
      </DsContainer>
    </main>
  </div>
</template>
