<script setup lang="ts">
import GlassMetaballs from '@/components/Three/Glass/GlassMetaballs.vue'
import PageBleed from '@/components/ui/Partials/PageContainer/PageBleed.vue'

useHead({
  title: 'Liquid Symmetry',
  htmlAttrs: {
    class: 'overflow-x-hidden touch-pan-y',
  },
  bodyAttrs: {
    class: 'overflow-x-hidden touch-pan-y',
  },
})

const fonts = [
  { name: 'Audiowide', class: 'audiowide-regular' },
  { name: 'Boldonse', class: 'boldonse-regular' },
  { name: 'Bruno Ace SC', class: 'bruno-ace-sc-regular' },
  { name: 'Cabinet Grotesk', class: 'font-cabinet' },
  { name: 'Clash Display', class: 'font-clash' },
  { name: 'Clash Display Regular', class: 'font-clash-regular' },
  { name: 'Cormorant Garamond', class: 'font-cormorant-garamond' },
  { name: 'Crimson Text', class: 'crimson-text-regular' },
  { name: 'EB Garamond', class: 'font-eb-garamond' },
  { name: 'Electric', class: 'font-electric' },
  { name: 'Figtree', class: 'figtree-regular' },
  { name: 'Geist', class: 'geist-regular' },
  { name: 'Ginger', class: 'font-ginger' },
  { name: 'JetBrains Mono', class: 'jetbrains-mono-regular' },
  { name: 'Libre Baskerville', class: 'font-baskerville' },
  { name: 'Lora', class: 'font-lora' },
  { name: 'Major Mono Display', class: 'major-mono-display-regular' },
  { name: 'Manrope', class: 'font-manrope' },
  { name: 'Mondea', class: 'font-mondea' },
  { name: 'Nohemi', class: 'font-nohemi' },
  { name: 'Nova Square', class: 'font-nova' },
  { name: 'Orbito', class: 'font-orbito' },
  { name: 'Prata', class: 'font-prata' },
  { name: 'Recoleta', class: 'font-recoleta' },
  { name: 'Resist Sans', class: 'font-resist' },
  { name: 'Space Grotesk', class: 'space-grotesk-regular' },
  { name: 'Zalando Sans Expanded', class: 'zalando-sans-expanded' },
  { name: 'Zen Dots', class: 'zen-dots-regular' },
]

const selectedH1Font = ref('zalando-sans-expanded')
const selectedSpanFont = ref('font-baskerville')
const selectedButtonFont = ref('font-recoleta')
const showFontOptions = ref(false)
</script>

<template>
  <main class="touch-pan-y bg-pureWhite dark:bg-pureBlack">
    <PageBleed>
      <section class="relative min-h-[100svh] -mt-[var(--header-height)]">
        <div class="pointer-events-none absolute inset-0 z-0">
          <GlassMetaballs controls-mode="fixed" class="h-full w-full" />
        </div>

        <div class="relative z-10 min-h-[100svh] flex items-center justify-center">
          <div class="absolute left-4 top-[calc(var(--header-height)+1rem)] z-20 w-[260px] space-y-4">
            <button
              class="w-full border border-pureWhite/20 rounded bg-pureBlack/70 px-2 py-2 text-xs color-pureWhite/80 tracking-[0.2em] uppercase backdrop-blur transition-colors hover:bg-pureWhite/10"
              type="button"
              @click="showFontOptions = !showFontOptions"
            >
              {{ showFontOptions ? 'Hide font options' : 'Show font options' }}
            </button>
            <div v-show="showFontOptions" class="space-y-4">
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
          </div>
          <div
            class="relative z-10 px-4 text-center transition-all duration-150 ease-out will-change-transform"
          >
            <div class="relative">
              <h1
                :class="selectedH1Font"
                class="mb-4 text-balance text-[clamp(2.75rem,7.5vw+1rem,7rem)] color-pureBlack font-semibold leading-tight tracking-tight uppercase dark:color-pureWhite"
              >
                Web evolves.
              </h1>
              <h2
                :class="selectedSpanFont"
                class="text-balance text-[clamp(2.5rem,6.5vw+1rem,8rem)] color-pureBlack font-thin leading-tight uppercase italic dark:color-pureWhite"
              >
                We track it.
              </h2>
            </div>
          </div>
        </div>
      </section>
    </PageBleed>
    <section class="relative py-24">
      <div class="mx-auto max-w-4xl space-y-16">
        <div class="space-y-6">
          <h2 class="text-3xl color-pureBlack font-light tracking-tight md:text-4xl dark:color-pureWhite">
            Liquid Drift
          </h2>
          <p class="text-base color-pureBlack/70 leading-relaxed md:text-lg dark:color-pureWhite/70">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
            dignissim sit amet, adipiscing nec, ultricies sed, dolor.
          </p>
        </div>
        <div class="space-y-6">
          <h3 class="text-xl color-pureBlack font-light tracking-tight md:text-2xl dark:color-pureWhite">
            Signal Layers
          </h3>
          <p class="text-base color-pureBlack/70 leading-relaxed md:text-lg dark:color-pureWhite/70">
            Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin
            porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.
          </p>
        </div>
        <div class="space-y-6">
          <h3 class="text-xl color-pureBlack font-light tracking-tight md:text-2xl dark:color-pureWhite">
            Soft Horizons
          </h3>
          <p class="text-base color-pureBlack/70 leading-relaxed md:text-lg dark:color-pureWhite/70">
            Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat
            libero pharetra tempor. Cras vestibulum bibendum augue.
          </p>
        </div>
      </div>
    </section>
    <section class="relative py-24">
      <div class="mx-auto max-w-4xl space-y-16">
        <div class="space-y-6">
          <h2 class="text-3xl color-pureBlack font-light tracking-tight md:text-4xl dark:color-pureWhite">
            Elastic Currents
          </h2>
          <p class="text-base color-pureBlack/70 leading-relaxed md:text-lg dark:color-pureWhite/70">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante
            dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
          </p>
        </div>
        <div class="space-y-6">
          <h3 class="text-xl color-pureBlack font-light tracking-tight md:text-2xl dark:color-pureWhite">
            Depth Fields
          </h3>
          <p class="text-base color-pureBlack/70 leading-relaxed md:text-lg dark:color-pureWhite/70">
            Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum
            lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra.
          </p>
        </div>
        <div class="space-y-6">
          <h3 class="text-xl color-pureBlack font-light tracking-tight md:text-2xl dark:color-pureWhite">
            Slow Bloom
          </h3>
          <p class="text-base color-pureBlack/70 leading-relaxed md:text-lg dark:color-pureWhite/70">
            Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean
            quam. In scelerisque sem at dolor.
          </p>
        </div>
      </div>
    </section>
    <section class="relative py-24">
      <div class="mx-auto max-w-4xl space-y-16">
        <div class="space-y-6">
          <h2 class="text-3xl color-pureBlack font-light tracking-tight md:text-4xl dark:color-pureWhite">
            Horizon Stack
          </h2>
          <p class="text-base color-pureBlack/70 leading-relaxed md:text-lg dark:color-pureWhite/70">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec ante. Sed lacinia, urna non tincidunt
            mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis.
          </p>
        </div>
        <div class="space-y-6">
          <h3 class="text-xl color-pureBlack font-light tracking-tight md:text-2xl dark:color-pureWhite">
            Quiet Momentum
          </h3>
          <p class="text-base color-pureBlack/70 leading-relaxed md:text-lg dark:color-pureWhite/70">
            Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum
            sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit.
          </p>
        </div>
        <div class="space-y-6">
          <h3 class="text-xl color-pureBlack font-light tracking-tight md:text-2xl dark:color-pureWhite">
            Afterglow
          </h3>
          <p class="text-base color-pureBlack/70 leading-relaxed md:text-lg dark:color-pureWhite/70">
            Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa
            mattis sem, at interdum magna augue eget diam.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
