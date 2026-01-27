<script setup lang="ts">
import {
  breakpointsTailwind,
  useBreakpoints,
  useIntersectionObserver,
  useMouseInElement,
  useRafFn,
  useThrottleFn,
  useWindowSize,
} from '@vueuse/core'
import { Motion } from 'motion-v'
import Issues from '@/components/Issues.vue'
import GlassMetaballs from '@/components/Three/Glass/GlassMetaballs.vue'
import HorizontalScroll from '@/components/ui/Scroll/HorizontalScroll/HorizontalScroll.vue'

useHead({
  title: 'Liquid Symmetry',
})

const { width, height } = useWindowSize()
const mouseEventFilter = useThrottleFn((invoke) => {
  invoke()
}, 80)
const displayPointerX = ref(0)
const displayPointerY = ref(0)
const viewportLabel = computed(() => `${width.value}x${height.value}`)
const pointerXLabel = computed(() => `${Math.round(displayPointerX.value)}`.padStart(4, '0'))
const pointerYLabel = computed(() => `${Math.round(displayPointerY.value)}`.padStart(4, '0'))
const breakpoints = useBreakpoints(breakpointsTailwind)
const isLgUp = breakpoints.greaterOrEqual('lg')
const heroRef = ref<HTMLElement | null>(null)
const headlineRef = ref<HTMLElement | null>(null)
const isHeroVisible = ref(false)
const { introOverlayDone, introOverlayActive } = useOverlay({ manageLifecycle: false })
const { isTransitionActive } = useTransition()
const overlayDone = introOverlayDone
const isMetaballsActive = ref(true)
const isMenuOpen = useState<boolean>('osmo-menu-open', () => false)
// TODO: consider restoring dynamic hero height if needed for layout tuning
const updateHeroVisibility = useThrottleFn((visible: boolean) => {
  isHeroVisible.value = visible
}, 150)

const canRenderMetaballs = computed(() => {
  return introOverlayDone.value
    && !isTransitionActive.value
    && isMetaballsActive.value
})

const canAnimateMetaballs = computed(() => canRenderMetaballs.value && !isMenuOpen.value)

useIntersectionObserver(
  headlineRef,
  ([entry]) => {
    updateHeroVisibility(Boolean(entry?.isIntersecting))
  },
  { threshold: 0.3 },
)

const METABALLS_THRESHOLD = 0.2
const METABALLS_ROOT_MARGIN = '200px 0px 200px 0px'
let lastMetaballsActive = isMetaballsActive.value
useIntersectionObserver(
  heroRef,
  ([entry]) => {
    const ratio = entry?.intersectionRatio ?? 0
    const nextActive = ratio >= METABALLS_THRESHOLD
    if (nextActive !== lastMetaballsActive) {
      lastMetaballsActive = nextActive
      isMetaballsActive.value = nextActive
    }
  },
  { threshold: METABALLS_THRESHOLD, rootMargin: METABALLS_ROOT_MARGIN },
)

const { x: pointerX, y: pointerY } = useMouseInElement(heroRef, {
  eventFilter: mouseEventFilter,
})
const shouldAnimatePointer = computed(() => isHeroVisible.value && isLgUp.value)
const { pause: pausePointerRaf, resume: resumePointerRaf } = useRafFn(() => {
  const ease = 0.18
  displayPointerX.value += (pointerX.value - displayPointerX.value) * ease
  displayPointerY.value += (pointerY.value - displayPointerY.value) * ease
}, { immediate: false, fpsLimit: 24 })
const headlineMotion = {
  initial: { y: '100%' },
  enter: {
    y: '0%',
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
      delay: 0,
    },
  },
}


watch(shouldAnimatePointer, (active) => {
  if (active)
    resumePointerRaf()
  else
    pausePointerRaf()
}, { immediate: true })
</script>

<template>
  <section>
    <section
      ref="heroRef"
      class="relative min-h-[100svh] flex items-center justify-center <lg:select-none"
    >
      <div
        :class="isHeroVisible && isLgUp
          ? 'opacity-100 blur-0 translate-y-0 pointer-events-auto'
          : 'opacity-0 blur-[8px] -translate-y-2 pointer-events-none'"
        class="font-now will-change-[opacity,filter,transform] absolute left-0 right-0 top-0 z-10 flex items-start justify-between text-xs transition-[opacity,filter,transform] duration-1200 ease-out -translate-y-full"
      >
        <div class="flex items-center gap-2">
          <div>
            <div class="text-[10px] color-pureBlack/60 tracking-widest uppercase dark:color-pureWhite/60">
              Pointer
            </div>
            <div class="flex items-center gap-3 text-[11px] color-pureBlack/80 tracking-widest dark:color-pureWhite/80">
              <span class="flex items-center gap-1">
                <span class="color-teal-11">X</span>
                <span class="lining-nums tabular-nums">{{ pointerXLabel }}</span>
              </span>
              <span class="flex items-center gap-1">
                <span class="color-teal-11">Y</span>
                <span class="lining-nums tabular-nums">{{ pointerYLabel }}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="flex items-start gap-6">
          <div class="flex items-center gap-2 text-right">
            <div>
              <div class="text-[10px] color-pureBlack/60 tracking-widest uppercase dark:color-pureWhite/60">
                Viewport
              </div>
              <div class="color-pureBlack/80 dark:color-pureWhite/80">
                {{ viewportLabel }}
              </div>
            </div>
            <div class="h-2 w-2 animate-ping animate-duration-[3000ms] border border-teal-11 border-solid" />
          </div>
        </div>
      </div>
      <!--   Three Metaballs   -->
      <div
        class="pointer-events-none absolute left-0 right-0 z-0 h-[calc(100%+var(--header-height,0px))] w-full -top-[var(--header-height,0px)]"
      >
        <GlassMetaballs
          v-show="canRenderMetaballs"
          :active="canAnimateMetaballs"
          controls-mode="fixed"
          class="h-full w-full"
        />
      </div>

      <!-- Fallthrough headline for animation     -->
      <h1
        ref="headlineRef"
        class="pointer-events-none relative z-10 text-center text-[clamp(2.6rem,9vw,4.8rem)] color-pureBlack uppercase md:mt-32 xl:mt-0 md:whitespace-nowrap md:text-[clamp(3.5rem,10vw,9rem)] dark:color-pureWhite <sm:-mt-12"
      >
        <span class="block overflow-hidden">
          <Motion
            as="span"
            class="zalando-sans-expanded block font-semibold <sm:text-[clamp(3.4rem,11vw,6rem)]"
            :variants="headlineMotion"
            initial="initial"
            :animate="overlayDone ? 'enter' : 'initial'"
          >
            Web evolves.
          </Motion>
        </span>
        <span class="block overflow-hidden">
          <Motion
            as="span"
            class="font-baskerville block color-pureBlack/85 italic <sm:text-[clamp(2.2rem,7vw,3.8rem)] dark:color-pureWhite/85"
            :variants="headlineMotion"
            initial="initial"
            :animate="overlayDone ? 'enter' : 'initial'"
          >
            We track it.
          </Motion>
        </span>
      </h1>

      <!--  Indicator    -->
      <div class="absolute bottom-24 left-1/2 z-10 flex flex-col items-center gap-2 -translate-x-1/2">
        <span class="font-clash-regular text-xs color-gray-10 font-light tracking-widest uppercase">SCROLL</span>
        <div class="h-12 w-px from-gray-6 to-transparent bg-gradient-to-b dark:from-gray-9" />
      </div>
    </section>

    <!-- Horizontal Scroll Container -->
    <section class="touch-pan-y">
      <HorizontalScroll />
    </section>

    <Issues />
  </section>
</template>
