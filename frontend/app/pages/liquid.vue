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
const showFontOptions = ref(false)

const { y } = useWindowScroll({ throttle: 16 })
const { height } = useWindowSize()
const heroSectionRef = ref<HTMLElement | null>(null)
const heroBounds = useElementBounding(heroSectionRef)
const headerHeightVar = useCssVar('--header-height')
const headerOffset = computed(() => {
  const value = Number.parseFloat(headerHeightVar.value || '0')
  return Number.isFinite(value) ? value : 0
})
const heroProgress = computed(() => {
  if (import.meta.server)
    return 0
  const _ = y.value
  const viewport = height.value || window.innerHeight
  const pinRange = viewport * 1.4
  const progress = (headerOffset.value - (heroBounds.top.value ?? 0)) / pinRange
  return Math.min(Math.max(progress, 0), 1)
})
const smoothedProgress = ref(0)
useRafFn(() => {
  const target = heroProgress.value
  smoothedProgress.value += (target - smoothedProgress.value) * 0.18
})
const heroEased = computed(() => {
  const p = smoothedProgress.value
  const smooth = p * p * (3 - 2 * p)
  return p * 0.75 + smooth * 0.25
})
const heroTranslateX = computed(() => `${heroEased.value * 32}vw`)
const heroTranslateY = computed(() => `${heroEased.value * -6}vh`)
const heroOpacity = computed(() => Math.max(0, 1 - heroEased.value * 1.05))
const heroH1Styles = computed(() => ({
  transform: `translate3d(${heroTranslateX.value}, ${heroTranslateY.value}, 0)`,
  opacity: heroOpacity.value,
}))
const heroH2Styles = computed(() => ({
  transform: `translate3d(-${heroTranslateX.value}, ${heroTranslateY.value}, 0)`,
  opacity: heroOpacity.value,
}))
const heroButtonStyles = computed(() => {
  const startAfter = 0.35
  const raw = (heroEased.value - startAfter) / (1 - startAfter)
  const buttonProgress = Math.min(Math.max(raw, 0), 1)
  const offset = (1 - buttonProgress) * 8
  const scale = 1 + buttonProgress * 0.3
  const visible = buttonProgress > 0.05
  return {
    transform: `translate(-50%, calc(-50% + ${offset}vh)) scale(${scale})`,
    opacity: visible ? Math.min(1, buttonProgress * 1.2) : 0,
    visibility: visible ? 'visible' : 'hidden',
    pointerEvents: visible ? 'auto' : 'none',
  }
})
</script>

<template>
  <main class="min-h-screen bg-pureWhite dark:bg-pureBlack">
    <section ref="heroSectionRef" class="relative min-h-[240vh]">
      <div class="sticky top-[var(--header-height)] h-[calc(100vh-var(--header-height))] flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0">
          <LiquidSymmetrySphere />
        </div>
        <div class="absolute left-4 top-4 z-20 w-[260px] space-y-4">
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
          <h1
            :class="selectedH1Font"
            class="mb-4 text-balance text-[clamp(2.75rem,7.5vw+1rem,7rem)] color-pureBlack font-semibold leading-tight tracking-tight uppercase dark:color-pureWhite"
            :style="heroH1Styles"
          >
            Web evolves.
          </h1>
          <h2
            :class="selectedSpanFont"
            class="whitespace-nowrap text-balance text-[clamp(2.5rem,6.5vw+1rem,8rem)] color-pureBlack font-thin leading-tight uppercase italic dark:color-pureWhite"
            :style="heroH2Styles"
          >
            We track it.
          </h2>
        </div>
        <div class="absolute left-1/2 top-1/2 z-20">
          <button
            :class="selectedButtonFont"
            class="border border-pureWhite/30 border-solid px-8 py-3 color-pureBlack transition-transform transition-colors duration-150 ease-out will-change-transform hover:bg-pureWhite/10 dark:color-pureWhite"
            :style="heroButtonStyles"
          >
            ENTER ARCHIVE
          </button>
        </div>
      </div>
    </section>
    <section class="relative px-6 py-24 md:px-12">
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
    <section class="relative px-6 py-24 md:px-12">
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
    <section class="relative px-6 py-24 md:px-12">
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
