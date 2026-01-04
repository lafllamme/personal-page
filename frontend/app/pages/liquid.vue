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
const selectedButtonFont = ref('font-recoleta')
const showFontOptions = ref(false)

const { y } = useWindowScroll({ throttle: 16 })
const { height } = useWindowSize()
const heroSectionRef = ref<HTMLElement | null>(null)
const isHeroVisible = useElementVisibility(heroSectionRef, { threshold: 0.1 })
const heroBounds = useElementBounding(heroSectionRef)
const headerHeightVar = useCssVar('--header-height')
const heroPinMultiplier = 2.2
const headerOffset = computed(() => {
  const value = Number.parseFloat(headerHeightVar.value || '0')
  return Number.isFinite(value) ? value : 0
})
const heroProgress = computed(() => {
  if (import.meta.server)
    return 0
  const _ = y.value
  const viewport = height.value || window.innerHeight
  const pinRange = viewport * heroPinMultiplier
  const progress = (headerOffset.value - (heroBounds.top.value ?? 0)) / pinRange
  return Math.min(Math.max(progress, 0), 1)
})
const smoothedProgress = ref(0)
const { pause: pauseHeroRaf, resume: resumeHeroRaf } = useRafFn(() => {
  const target = heroProgress.value
  smoothedProgress.value += (target - smoothedProgress.value) * 0.18
})
watch(
  isHeroVisible,
  (visible) => {
    if (visible)
      resumeHeroRaf()
    else
      pauseHeroRaf()
  },
  { immediate: true },
)
const heroEased = computed(() => {
  const p = smoothedProgress.value
  const smooth = p * p * (3 - 2 * p)
  return p * 0.75 + smooth * 0.25
})

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

const heroTextProgress = computed(() => easeInOutCubic(clamp01(heroEased.value / 0.7)))
const heroButtonProgress = computed(() => easeOutCubic(clamp01((heroEased.value - 0.52) / 0.35)))

const heroTextLift = computed(() => `${heroTextProgress.value * -6}vh`)
const heroTextScale = computed(() => 1 - heroTextProgress.value * 0.08)
const heroTextSquash = computed(() => 1 - heroTextProgress.value * 0.12)
const heroTextOpacity = computed(() => Math.max(0, 1 - heroTextProgress.value * 1.35))
const heroTextSpacing = computed(() => `${(0.02 + heroTextProgress.value * 0.18).toFixed(3)}em`)
const heroGhostLift = computed(() => `${heroTextProgress.value * -2}vh`)
const heroGhostScale = computed(() => 1 + heroTextProgress.value * 0.06)
const heroGhostOpacity = computed(() => Math.max(0, 0.35 - heroTextProgress.value * 0.35))
const heroMainTextStyles = computed(() => ({
  transform: `translate3d(0, ${heroTextLift.value}, 0) scale(${heroTextScale.value}, ${heroTextSquash.value})`,
  opacity: heroTextOpacity.value,
  letterSpacing: heroTextSpacing.value,
}))
const heroGhostTextStyles = computed(() => ({
  transform: `translate3d(0, ${heroGhostLift.value}, 0) scale(${heroGhostScale.value})`,
  opacity: heroGhostOpacity.value,
  letterSpacing: `${(0.08 + heroTextProgress.value * 0.12).toFixed(3)}em`,
}))
const heroButtonStyles = computed(() => {
  const offset = (1 - heroButtonProgress.value) * 8
  const scale = 1 + heroButtonProgress.value * 0.3
  const visible = heroButtonProgress.value > 0.05
  return {
    transform: `translate(-50%, calc(-50% + ${offset}vh)) scale(${scale})`,
    opacity: visible ? Math.min(1, heroButtonProgress.value * 1.2) : 0,
    visibility: visible ? 'visible' : 'hidden',
    pointerEvents: visible ? 'auto' : 'none',
  }
})
</script>

<template>
  <main class="min-h-screen bg-pureWhite dark:bg-pureBlack">
    <section ref="heroSectionRef" class="relative min-h-[320vh]">
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
          <div class="relative">
            <div class="pointer-events-none absolute inset-0">
              <h1
                :class="selectedH1Font"
                class="mb-4 text-balance text-[clamp(2.75rem,7.5vw+1rem,7rem)] color-pureBlack/30 font-semibold leading-tight tracking-tight uppercase dark:color-pureWhite/20"
                :style="heroGhostTextStyles"
              >
                Web evolves.
              </h1>
            </div>
            <h1
              :class="selectedH1Font"
              class="mb-4 text-balance text-[clamp(2.75rem,7.5vw+1rem,7rem)] color-pureBlack font-semibold leading-tight tracking-tight uppercase dark:color-pureWhite"
              :style="heroMainTextStyles"
            >
              Web evolves.
            </h1>
            <h2
              :class="selectedSpanFont"
              class="whitespace-nowrap text-balance text-[clamp(2.5rem,6.5vw+1rem,8rem)] color-pureBlack font-thin leading-tight uppercase italic dark:color-pureWhite"
              :style="heroMainTextStyles"
            >
              We track it.
            </h2>
          </div>
        </div>
        <div class="absolute left-1/2 top-1/2 z-20 flex flex-col items-center">
          <div
            :class="selectedButtonFont"
            class="font-recoleta text-[clamp(1.5rem,3vw+0.5rem,3rem)] color-pureBlack font-light tracking-[12px] uppercase transition-transform duration-150 ease-out will-change-transform dark:color-pureWhite"
            :style="heroButtonStyles"
          >
            <div class="flex flex-col items-center justify-center gap-2">
              <span>Explore</span>
              <Icon class="size-12" name="material-symbols-light:arrow-cool-down-rounded" />
            </div>
          </div>
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
