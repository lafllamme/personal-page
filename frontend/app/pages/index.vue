<script setup lang="ts">
import {
  breakpointsTailwind,
  useBreakpoints,
  useEventListener,
  useIntersectionObserver,
  useMouse,
  useRafFn,
  useThrottleFn,
  useWindowSize,
} from '@vueuse/core'
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
const { x: pointerX, y: pointerY } = useMouse({ eventFilter: mouseEventFilter })
const displayPointerX = ref(0)
const displayPointerY = ref(0)
const viewportLabel = computed(() => `${width.value}x${height.value}`)
const pointerLabel = computed(() => `${Math.round(displayPointerX.value)}, ${Math.round(displayPointerY.value)}`)
const breakpoints = useBreakpoints(breakpointsTailwind)
const isLgUp = breakpoints.greaterOrEqual('lg')
const heroRef = ref<HTMLElement | null>(null)
const isHeroVisible = ref(false)
const heroHeightPx = ref(0)
const lastWindowWidth = ref(0)
const heroStyle = computed(() => {
  if (!heroHeightPx.value)
    return undefined

  return {
    '--hero-static-height': `${heroHeightPx.value}px`,
  }
})
const updateHeroVisibility = useThrottleFn((visible: boolean) => {
  isHeroVisible.value = visible
}, 150)

useIntersectionObserver(
  heroRef,
  ([entry]) => {
    updateHeroVisibility(Boolean(entry?.isIntersecting))
  },
  { threshold: 0.3 },
)

function updateHeroHeight() {
  if (!import.meta.client)
    return

  const rect = heroRef.value?.getBoundingClientRect()
  const nextHeight = rect?.height || window.innerHeight
  if (!nextHeight)
    return

  heroHeightPx.value = nextHeight
  lastWindowWidth.value = window.innerWidth
}

onMounted(() => {
  updateHeroHeight()
})

useEventListener(window, 'resize', () => {
  if (!import.meta.client)
    return

  if (window.innerWidth !== lastWindowWidth.value)
    updateHeroHeight()
})

useRafFn(() => {
  if (!isHeroVisible.value || !isLgUp.value)
    return

  const ease = 0.12
  displayPointerX.value += (pointerX.value - displayPointerX.value) * ease
  displayPointerY.value += (pointerY.value - displayPointerY.value) * ease
})
</script>

<template>
  <section>
    <section
      ref="heroRef"
      :style="heroStyle"
      class="relative h-[var(--hero-static-height,100svh)] flex items-center justify-center <lg:select-none"
    >
      <div v-if="isHeroVisible && isLgUp" class="pointer-events-auto absolute left-0 right-0 top-0 z-10 flex items-start justify-between text-xs -translate-y-full">
        <div class="font-reign flex items-center gap-2">
          <div class="h-2 w-2 animate-spin animate-duration-[9000ms] border border-teal-11 border-solid" />
          <div>
            <div class="text-[10px] color-pureBlack/60 tracking-widest uppercase dark:color-pureWhite/60">
              Pointer
            </div>
            <div class="color-pureBlack/80 dark:color-pureWhite/80">
              {{ pointerLabel }}
            </div>
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="font-reign flex items-center gap-2 text-right">
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
        <GlassMetaballs controls-mode="fixed" class="h-full w-full" />
      </div>

      <!-- Fallthrough headline for animation     -->
      <h1 class="pointer-events-none relative z-10 text-center text-[clamp(2.6rem,9vw,4.8rem)] color-pureBlack uppercase md:mt-32 xl:mt-0 md:whitespace-nowrap md:text-[clamp(3.5rem,10vw,9rem)] dark:color-pureWhite <sm:-mt-12">
        <span class="zalando-sans-expanded block font-semibold <sm:text-[clamp(3.4rem,11vw,6rem)]">Web evolves.</span>
        <span class="font-baskerville block color-pureBlack/85 italic <sm:text-[clamp(2.2rem,7vw,3.8rem)] dark:color-pureWhite/85">We track it.</span>
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
