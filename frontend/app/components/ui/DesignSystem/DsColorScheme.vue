<script setup lang="ts">
const radixTealLight = [
  { step: 1, hex: '#fafefd' },
  { step: 2, hex: '#f3fbf9' },
  { step: 3, hex: '#e0f8f3' },
  { step: 4, hex: '#ccf3ea' },
  { step: 5, hex: '#b8eae0' },
  { step: 6, hex: '#a1ded2' },
  { step: 7, hex: '#83cdc1' },
  { step: 8, hex: '#53b9ab' },
  { step: 9, hex: '#12a594' },
  { step: 10, hex: '#0d9b8a' },
  { step: 11, hex: '#008573' },
  { step: 12, hex: '#0d3d38' },
]

const radixTealDark = [
  { step: 1, hex: '#0d1514' },
  { step: 2, hex: '#111c1b' },
  { step: 3, hex: '#0d2d2a' },
  { step: 4, hex: '#023b37' },
  { step: 5, hex: '#084843' },
  { step: 6, hex: '#145750' },
  { step: 7, hex: '#1c6961' },
  { step: 8, hex: '#207e73' },
  { step: 9, hex: '#12a594' },
  { step: 10, hex: '#0eb39e' },
  { step: 11, hex: '#0bd8b6' },
  { step: 12, hex: '#adf0dd' },
]

const wcagSemanticPairs = [
  { role: 'Light foreground', fg: '#0d3d38', bg: '#ffffff', ratio: '12.06:1', level: 'AAA' },
  { role: 'Light primary action', fg: '#ffffff', bg: '#008573', ratio: '4.56:1', level: 'AA' },
  { role: 'Dark foreground', fg: '#adf0dd', bg: '#0d1514', ratio: '14.35:1', level: 'AAA' },
  { role: 'Dark primary action', fg: '#0d1514', bg: '#0bd8b6', ratio: '10.15:1', level: 'AAA' },
]
</script>

<template>
  <article class="mt-8 border border-pureBlack/16 rounded-xl border-solid p-5 dark:border-pureWhite/16 md:p-6">
    <p class="space-grotesk-regular text-[10px] tracking-[0.18em] uppercase opacity-65">
      Radix Teal Colorway
    </p>
    <h2 class="font-clash-regular mt-2 text-[clamp(1.2rem,2.2vw,1.7rem)] leading-tight">
      Available palette tokens (1-12) for Light and Dark mode
    </h2>
    <p class="font-manrope mt-2 text-sm leading-relaxed opacity-82">
      Generated from the Radix teal scale and mapped to WCAG-safe brand usage for our current system direction.
    </p>

    <div class="grid mt-5 gap-6 lg:grid-cols-2">
      <div>
        <p class="space-grotesk-regular mb-2 text-[10px] tracking-[0.16em] uppercase opacity-65">
          Light Scale
        </p>
        <ul class="grid gap-2 sm:grid-cols-2">
          <li
            v-for="token in radixTealLight"
            :key="`light-${token.step}`"
            class="border border-pureBlack/16 rounded-lg border-solid p-2 dark:border-pureWhite/16"
          >
            <div class="h-9 w-full border border-pureBlack/14 rounded-md border-solid dark:border-pureWhite/14" :style="{ backgroundColor: token.hex }" />
            <p class="space-grotesk-regular mt-2 text-[10px] tracking-[0.14em] uppercase opacity-70">
              teal-{{ token.step }}
            </p>
            <p class="font-manrope text-xs opacity-85">
              {{ token.hex }}
            </p>
          </li>
        </ul>
      </div>

      <div>
        <p class="space-grotesk-regular mb-2 text-[10px] tracking-[0.16em] uppercase opacity-65">
          Dark Scale
        </p>
        <ul class="grid gap-2 sm:grid-cols-2">
          <li
            v-for="token in radixTealDark"
            :key="`dark-${token.step}`"
            class="border border-pureBlack/16 rounded-lg border-solid p-2 dark:border-pureWhite/16"
          >
            <div class="h-9 w-full border border-pureBlack/14 rounded-md border-solid dark:border-pureWhite/14" :style="{ backgroundColor: token.hex }" />
            <p class="space-grotesk-regular mt-2 text-[10px] tracking-[0.14em] uppercase opacity-70">
              teal-dark-{{ token.step }}
            </p>
            <p class="font-manrope text-xs opacity-85">
              {{ token.hex }}
            </p>
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-6">
      <p class="space-grotesk-regular mb-2 text-[10px] tracking-[0.16em] uppercase opacity-65">
        WCAG-Ready Semantic Pairs
      </p>
      <ul class="grid gap-2">
        <li
          v-for="pair in wcagSemanticPairs"
          :key="pair.role"
          class="border border-pureBlack/16 rounded-lg border-solid p-3 dark:border-pureWhite/16"
        >
          <div class="flex items-center justify-between gap-3">
            <p class="font-manrope text-sm">
              {{ pair.role }}
            </p>
            <span class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-70">{{ pair.level }} · {{ pair.ratio }}</span>
          </div>
          <div class="grid mt-2 gap-2 sm:grid-cols-2">
            <div class="border border-pureBlack/14 rounded-md border-solid p-2 dark:border-pureWhite/14">
              <span class="space-grotesk-regular text-[10px] tracking-[0.12em] uppercase opacity-70">fg</span>
              <div class="mt-1 h-6 border border-pureBlack/14 rounded-sm border-solid dark:border-pureWhite/14" :style="{ backgroundColor: pair.fg }" />
              <p class="font-manrope mt-1 text-xs opacity-85">
                {{ pair.fg }}
              </p>
            </div>
            <div class="border border-pureBlack/14 rounded-md border-solid p-2 dark:border-pureWhite/14">
              <span class="space-grotesk-regular text-[10px] tracking-[0.12em] uppercase opacity-70">bg</span>
              <div class="mt-1 h-6 border border-pureBlack/14 rounded-sm border-solid dark:border-pureWhite/14" :style="{ backgroundColor: pair.bg }" />
              <p class="font-manrope mt-1 text-xs opacity-85">
                {{ pair.bg }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </article>
</template>
