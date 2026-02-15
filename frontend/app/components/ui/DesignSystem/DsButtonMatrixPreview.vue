<script setup lang="ts">
import DsButton from './DsButton.vue'
import DsContainer from './DsContainer.vue'
import DsSectionContainer from './DsSectionContainer.vue'
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
      </DsContainer>
    </main>
  </div>
</template>
