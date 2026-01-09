<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { TransitionPresets, useCssVar, useEventListener, useResizeObserver, useThrottleFn, useTimeoutFn, useTransition, useWindowScroll } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
// Import external components and utilities
import ColorMode from '~/components/ui/ColorMode/ColorMode.vue'
import Menu from '~/components/ui/Menu/Menu.vue'
import Underline from '~/components/ui/Menu/Underline/Underline.vue'
import LanguageSwitcher from '~/components/ui/Navigation/LanguageSwitcher/LanguageSwitcher.vue'
import { useMenu } from '~/stores/menu/menu'

// Configurable thresholds (percent of page scrolled) with sensible defaults
const props = withDefaults(defineProps<{ minimizeAtPercent?: number, activateAtPercent?: number, forceMinimized?: boolean | null }>(), {
  minimizeAtPercent: 0.50, // minimize a bit earlier (50%)
  activateAtPercent: 0.40, // start subtle effects earlier (40%)
  forceMinimized: null,
})
// compute to destination for a home link
const localePath = useLocalePath()
const homeLink = computed(() => {
  return localePath('/')
})

const { height } = useWindowSize()

// Menu store
const menuStore = useMenu()
const { effectiveHeaderMinimized } = storeToRefs(menuStore)

// Sync prop with store
watch(() => props.forceMinimized, (value) => {
  menuStore.setForceMinimized(value)
}, { immediate: true })

// Track minimized header container width to match dropdown width
const headerContainerRef = ref<HTMLElement | null>(null)

const lastWidth = ref<number | null>(null)
// Bind CSS var to the header container element
const headerWidthVar = useCssVar('--header-minimized-width', headerContainerRef)

function writeHeaderMinWidthVar(width: number) {
  const el = headerContainerRef.value
  if (!el)
    return
  if (lastWidth.value === width)
    return
  lastWidth.value = width
  headerWidthVar.value = `${Math.round(width)}px`
}

function measureAndWrite() {
  if (import.meta.server)
    return
  const el = headerContainerRef.value
  if (!el)
    return
  const { width } = el.getBoundingClientRect()
  // Write once per measurement (throttled by caller)
  writeHeaderMinWidthVar(width)
}

// Throttle measurements to reduce layout work during rapid resizes
const throttledMeasure = useThrottleFn(measureAndWrite, 100, true)

onMounted(() => {
  throttledMeasure()
})

// Observe only the header container for size changes
useResizeObserver(headerContainerRef, () => {
  throttledMeasure()
})

// If the header transitions into minimized state, recalc once
watch(effectiveHeaderMinimized, (min) => {
  if (min)
    throttledMeasure()
})

// Reactive state variables
const isOpen = ref(false) // Drives Navigation.vue visibility
const isSwitchOpen = ref(false) // Controls language switcher
const headerRef = ref<HTMLElement | null>(null)

const { y } = useWindowScroll({ throttle: 100 })

// Intro animation values synced with the overlay lifecycle
type HeaderIntroPhase = 'pre' | 'animating' | 'done'
const overlayVisible = useState('intro-overlay-visible', () => true)
const headerIntroPhase = ref<HeaderIntroPhase>(overlayVisible.value ? 'pre' : 'done')
const headerIntroDurationMs = 800
const headerIntroDelayMs = 140

const { start: markIntroSettled, stop: stopIntroSettled } = useTimeoutFn(() => {
  headerIntroPhase.value = 'done'
}, headerIntroDurationMs, { immediate: false })

const { start: scheduleIntroStart, stop: cancelIntroStart } = useTimeoutFn(() => {
  if (headerIntroPhase.value !== 'pre')
    return
  headerIntroPhase.value = 'animating'
  markIntroSettled()
}, headerIntroDelayMs, { immediate: false })

watch(overlayVisible, (visible) => {
  if (visible) {
    cancelIntroStart()
    stopIntroSettled()
    headerIntroPhase.value = 'pre'
    return
  }
  if (headerIntroPhase.value === 'pre')
    scheduleIntroStart()
}, { immediate: true })

const headerIntroStyle = computed<CSSProperties>(() => {
  if (headerIntroPhase.value === 'pre')
    return { transform: 'translate3d(0,-70px,0)' }
  if (headerIntroPhase.value === 'animating')
    return { transform: 'translate3d(0,0,0)' }
  // Remove transform when animation settles so nested fixed elements
  // (menu overlay & panel) keep using the viewport as their containing block.
  return {}
})

const logoBlurTarget = computed(() => {
  if (headerIntroPhase.value === 'pre')
    return 18
  if (headerIntroPhase.value === 'animating')
    return 0
  return 0
})

const logoOpacityTarget = computed(() => {
  if (headerIntroPhase.value === 'pre')
    return 0
  if (headerIntroPhase.value === 'animating')
    return 1
  return 1
})

const animatedLogoBlur = useTransition(logoBlurTarget, {
  duration: headerIntroDurationMs,
  transition: TransitionPresets.easeOutCubic,
})

const animatedLogoOpacity = useTransition(logoOpacityTarget, {
  duration: headerIntroDurationMs * 0.9,
  transition: TransitionPresets.easeOutCubic,
})

const logoIntroStyle = computed<CSSProperties>(() => ({
  filter: `blur(${animatedLogoBlur.value}px)`,
  opacity: animatedLogoOpacity.value.toFixed(3),
}))

const glassClass = computed(() => {
  if (headerIntroPhase.value !== 'done') {
    return 'backdrop-blur-[18px] backdrop-saturate-180 backdrop-contrast-115 bg-pureWhite/50 dark:bg-pureBlack/35 ring-0'
  }
  return effectiveHeaderMinimized.value
    ? 'backdrop-blur-[12px] backdrop-saturate-180 backdrop-contrast-115 bg-transparent ring-1 ring-mint-12 dark:shadow-[0_8px_30px_rgba(255,255,255,0.12)] shadow-[0_8px_30px_rgba(0,0,0,0.12)]'
    : 'backdrop-blur-[6px] bg-pureWhite/45 dark:bg-pureBlack/35 ring-0'
})

// Compute how far the user has scrolled relative to total scrollable height
const scrolledPercent = computed(() => {
  if (import.meta.server)
    return 0

  const scrollY = y.value
  const docHeight = document.documentElement.scrollHeight - height.value
  return docHeight > 0 ? scrollY / docHeight : 0
})

// Scroll-based animation states driven by percentage thresholds
const hasScrolledEnough = computed(() => scrolledPercent.value >= props.activateAtPercent)

// Update header minimized state in store based on scroll percentage
watch(scrolledPercent, (percent) => {
  menuStore.setHeaderMinimized(percent >= props.minimizeAtPercent)
}, { immediate: true })

// Close menu and language switcher on Escape key press
useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    isOpen.value = false
    isSwitchOpen.value = false
  }
})

// TODO: Wtf was I thinking here?
// Focus trap for mobile menu accessibility
const { activate, deactivate } = useFocusTrap(headerRef)
watch(isOpen, (open) => {
  if (open) {
    activate()
    isSwitchOpen.value = false
  }
  else {
    deactivate()
  }
})
watch(isSwitchOpen, (open) => {
  if (open) {
    isOpen.value = false
  }
})
</script>

<template>
  <div>
    <div
      :class="useClsx(
        'fixed inset-x-0 top-0 z-50 w-full max-w-100vw',
        'transition-transform duration-800 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
        headerIntroPhase !== 'done' && 'will-change-transform',
        'isolate overflow-visible',
      )"
      :style="headerIntroStyle"
    >
      <!-- Main Header container with dynamic style and classes -->
      <header
        ref="headerRef"
        :class="useClsx(
          'w-full max-w-100vw',
          'transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
          'theme-transition-guard',
        )"
        role="banner"
      >
        <div
          ref="headerContainerRef"
          :class="useClsx(
            'relative mx-auto',
            'transition-[margin,max-width,width,transform,opacity] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
            effectiveHeaderMinimized ? 'mt-4 md:mt-6 max-w-[65vw] min-w-0 md:max-w-[45vw]' : 'mt-0 max-w-full',
          )"
        >
          <!-- Background layer for consistent backdrop filter (Glass morphism) -->
          <div
            :class="useClsx(
              hasScrolledEnough && 'backdrop-saturate-150',
              'pointer-events-none absolute inset-0',
              'transition-[backdrop-filter,backdrop-saturate,backdrop-contrast,box-shadow] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
              'theme-transition-surface',
              glassClass,
              effectiveHeaderMinimized ? 'rounded-full' : 'rounded-none',
            )"
          />
          <!-- Inner container for logo and right-side items -->
          <div
            :class="useClsx(
              'transition-[padding,margin,transform,opacity] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
              'relative flex items-center justify-between',
              effectiveHeaderMinimized ? ' px-6 py-4 md:px-8 md:py-4' : 'px-4 py-4 md:px-8',
              effectiveHeaderMinimized ? 'border-none' : 'border-b',
              effectiveHeaderMinimized ? '' : 'border-b border-gray-5 border-solid dark:border-gray-4',
            )"
          >
            <div class="flex items-center">
              <NuxtLink
                :class="useClsx(
                  'focus-visible:ring-pureBlack dark:focus-visible:ring-pureWhite',
                'transition-[filter,opacity,transform] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] hover:scale-105',
                  'focus-visible:outline-none focus-visible:ring-3',
                  'font-nova font-bold tracking-tight antialiased',
                  'absolute group px-2',
                  effectiveHeaderMinimized ? 'text-xl md:text-2xl ts-contrast' : 'text-2xl md:text-3xl',
                )"
                :to="homeLink"
                aria-label="Tech News"
                tabindex="0"
              :style="logoIntroStyle"
              >
                <span class="text-pureBlack dark:text-pureWhite">Tec</span>
                <span class="color-teal-10 dark:color-[#01E2B6]">News</span>
                <Underline />
              </NuxtLink>
            </div>
            <div
              :class="useClsx(effectiveHeaderMinimized ? 'pr-7' : '')"
              class="relative flex items-center"
            >
              <div
                :class="useClsx(
                  'flex items-center gap-0.5 transition-[margin,transform,opacity] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
                  effectiveHeaderMinimized ? 'mr-4' : 'mr-6.5 md:mr-10.5',
                )"
              >
                <LanguageSwitcher
                  :open="!!isSwitchOpen"
                  :class="useClsx(
                    'transition-[padding,transform,opacity] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
                    effectiveHeaderMinimized ? 'p-1' : 'p-1.5',
                  )"
                  @update:open="(v: boolean) => { isSwitchOpen = v }"
                />
                <ColorMode
                  :class="useClsx(
                    'transition-[padding,transform,opacity] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
                    effectiveHeaderMinimized ? '<md:hidden' : 'p-1.5',
                  )"
                />
              </div>
              <Menu
                :class="useClsx(
                  'transition-[padding,transform,opacity] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
                  effectiveHeaderMinimized ? 'p-1' : 'p-1.5',
                )"
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>

<i18n lang="yaml">
de:
  menu: "Hauptmenü"
en:
  menu: "Main Menu"
fr:
  menu: "Menu Principal"
ja:
  menu: "メインメニュー"
zh:
  menu: "主菜单"
pt:
  menu: "Menu Principal"
es:
  menu: "Menú Principal"
pl:
  menu: "Menu Główne"
da:
  menu: "Hovedmenu"
cs:
  menu: "Hlavní menu"
nl:
  menu: "Hoofdmenu"
el:
  menu: "Κύριο Μενού"
tr:
  menu: "Ana Menü"
ko:
  menu: "메인 메뉴"
uk:
  menu: "Головне меню"
</i18n>
