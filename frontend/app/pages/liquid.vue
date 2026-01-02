<script setup lang="ts">
import LiquidSymmetrySphere from '@/components/Three/LiquidSymmetrySphere/LiquidSymmetrySphere.vue'

useHead({
  title: 'Liquid Symmetry',
})

const fonts = [
  { name: 'Electric', class: 'font-electric' },
  { name: 'Recoleta', class: 'font-recoleta' },
  { name: 'Ginger', class: 'font-ginger' },
  { name: 'Prata', class: 'font-prata' },
  { name: 'Manrope', class: 'font-manrope' },
  { name: 'Geist Regular', class: 'geist-regular' },
  { name: 'Geist Thin', class: 'geist-thin' },
  { name: 'Space Grotesk', class: 'space-grotesk-regular' },
  { name: 'Boldonse', class: 'boldonse-regular' },
  { name: 'Audiowide', class: 'audiowide-regular' },
  { name: 'Zen Dots', class: 'zen-dots-regular' },
  { name: 'Bruno Ace SC', class: 'bruno-ace-sc-regular' },
  { name: 'Major Mono Display', class: 'major-mono-display-regular' },
  { name: 'Nova Square', class: 'font-nova' },
  { name: 'Figtree', class: 'figtree-regular' },
  { name: 'JetBrains Mono', class: 'jetbrains-mono-regular' },
  { name: 'Crimson Text', class: 'crimson-text-regular' },
  { name: 'Lora', class: 'font-lora' },
  { name: 'Libre Baskerville', class: 'font-baskerville' },
  { name: 'EB Garamond', class: 'font-eb-garamond' },
  { name: 'Cormorant Garamond', class: 'font-cormorant-garamond' },
  { name: 'Zalando Sans Expanded', class: 'zalando-sans-expanded' },
]

const selectedH1Font = ref('zalando-sans-expanded')
const selectedSpanFont = ref('font-baskerville')
const selectedButtonFont = ref(fonts[4]?.class ?? '')

const fontSettingsJson = computed(() => JSON.stringify({
  h1Font: selectedH1Font.value,
  spanFont: selectedSpanFont.value,
  buttonFont: selectedButtonFont.value,
}, null, 2))

async function copyFontSettings() {
  try {
    await navigator.clipboard.writeText(fontSettingsJson.value)
  }
  catch {
    // no-op: clipboard can be denied by browser permissions
  }
}
</script>

<template>
  <main class="min-h-screen bg-pureWhite dark:bg-pureBlack">
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0">
        <LiquidSymmetrySphere />
      </div>
      <div class="absolute left-4 top-4 z-20 w-[260px] space-y-4">
        <div class="border border-pureWhite/15 rounded-lg bg-pureBlack/70 p-3 backdrop-blur">
          <label class="mb-2 block text-xs color-pureWhite/70 tracking-[0.2em] uppercase">Copy Settings</label>
          <button
            class="w-full border border-pureWhite/20 rounded bg-pureBlack/60 px-2 py-2 text-sm color-pureWhite transition-colors hover:bg-pureWhite/10"
            type="button"
            @click="copyFontSettings"
          >
            Copy settings JSON
          </button>
        </div>
        <div class="border border-pureWhite/15 rounded-lg bg-pureBlack/70 p-3 backdrop-blur">
          <label class="mb-2 block text-xs color-pureWhite/70 tracking-[0.2em] uppercase">H1 Font</label>
          <select
            v-model="selectedH1Font"
            class="w-full border border-pureWhite/20 rounded bg-pureBlack/60 px-2 py-2 text-sm color-pureWhite"
          >
            <option v-for="font in fonts" :key="font.class" :value="font.class">
              {{ font.name }}
            </option>
          </select>
        </div>
        <div class="border border-pureWhite/15 rounded-lg bg-pureBlack/70 p-3 backdrop-blur">
          <label class="mb-2 block text-xs color-pureWhite/70 tracking-[0.2em] uppercase">Span Font</label>
          <select
            v-model="selectedSpanFont"
            class="w-full border border-pureWhite/20 rounded bg-pureBlack/60 px-2 py-2 text-sm color-pureWhite"
          >
            <option v-for="font in fonts" :key="font.class" :value="font.class">
              {{ font.name }}
            </option>
          </select>
        </div>
        <div class="border border-pureWhite/15 rounded-lg bg-pureBlack/70 p-3 backdrop-blur">
          <label class="mb-2 block text-xs color-pureWhite/70 tracking-[0.2em] uppercase">Button Font</label>
          <select
            v-model="selectedButtonFont"
            class="w-full border border-pureWhite/20 rounded bg-pureBlack/60 px-2 py-2 text-sm color-pureWhite"
          >
            <option v-for="font in fonts" :key="font.class" :value="font.class">
              {{ font.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="relative z-10 px-4 text-center">
        <h1
          :class="selectedH1Font"
          class="mb-4 text-balance text-6xl color-pureBlack font-semibold uppercase md:text-8xl dark:color-pureWhite"
        >
          Web evolves.
          <br>
          <span :class="selectedSpanFont" class="font-thin uppercase italic">We track it.</span>
        </h1>
        <button
          :class="selectedButtonFont"
          class="mt-8 border border-pureWhite/30 border-solid px-8 py-3 color-pureBlack transition-colors hover:bg-pureWhite/10 dark:color-pureWhite"
        >
          ENTER ARCHIVE
        </button>
      </div>
    </section>
  </main>
</template>
