<script lang="ts" setup>
import { useCssVar, useEventListener, useResizeObserver, useThrottleFn, useWindowScroll } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
// Import external components and utilities
import ColorMode from '~/components/ui/ColorMode/ColorMode.vue'
import Menu from '~/components/ui/Menu/Menu.vue'
import Underline from '~/components/ui/Menu/Underline/Underline.vue'
import LanguageSwitcher from '~/components/ui/Navigation/LanguageSwitcher/LanguageSwitcher.vue'
import { useMenu } from '~/stores/menu/menu'

// Configurable thresholds (percent of page scrolled) with sensible defaults
const props = withDefaults(defineProps<{ minimizeAtPercent?: number, activateAtPercent?: number, forceMinimized?: boolean | null }>(), {
  minimizeAtPercent: 0.025, // minimize a bit earlier (5%)
  activateAtPercent: 0.01, // start subtle effects earlier (2%)
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
    <!-- Main Header container with dynamic style and classes -->
    <header
      ref="headerRef"
      :class="useClsx(
        'fixed inset-x-0 top-0 z-50 w-full max-w-100vw',
        'transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
      )"
      role="banner"
    >
      <div
        ref="headerContainerRef"
        :class="useClsx(
          'relative mx-auto',
          'transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
          effectiveHeaderMinimized ? 'mt-4 md:mt-6 max-w-[65vw] min-w-0 md:max-w-[45vw]' : 'mt-0 max-w-full',
        )"
      >
        <!-- Background layer for consistent backdrop filter (Glass morphism) -->
        <div
          :class="useClsx(
            hasScrolledEnough && 'backdrop-saturate-150',
            'pointer-events-none absolute inset-0',
            'transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
            // Glass background: default subtle glass, minimized = pure liquid glass (blur only)
            effectiveHeaderMinimized
              ? 'backdrop-blur-[12px] backdrop-saturate-180 backdrop-contrast-115 bg-transparent ring-1 ring-mint-12 dark:shadow-[0_8px_30px_rgba(255,255,255,0.12)] shadow-[0_8px_30px_rgba(0,0,0,0.12)]'
              : 'backdrop-blur-[6px] bg-pureWhite/45 dark:bg-pureBlack/35 ring-0',
            effectiveHeaderMinimized ? 'rounded-full' : 'rounded-none',
          )"
        />
        <!-- Inner container for logo and right-side items -->
        <div
          :class="useClsx(
            'transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
            'relative flex items-center justify-between',
            effectiveHeaderMinimized ? ' px-6 py-4 md:px-8 md:py-4' : 'px-6 py-4 md:px-8',
            effectiveHeaderMinimized ? 'border-none' : 'border-b',
            effectiveHeaderMinimized ? '' : 'border-b border-gray-5 border-solid dark:border-gray-4',
          )"
        >
          <div class="flex items-center">
            <NuxtLink
              :class="useClsx(
                'focus-visible:ring-pureBlack dark:focus-visible:ring-pureWhite',
                'transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] hover:scale-105',
                'focus-visible:outline-none focus-visible:ring-3',
                'font-nova font-bold tracking-tight antialiased',
                'absolute group px-2',
                effectiveHeaderMinimized ? 'text-xl md:text-2xl ts-contrast' : 'text-2xl md:text-3xl',
              )"
              :to="homeLink"
              aria-label="Tech News"
              tabindex="0"
            >
              <span class="text-pureBlack dark:text-pureWhite">Tec</span>
              <span class="color-teal-10">News</span>
              <Underline />
            </NuxtLink>
          </div>
          <div
            :class="useClsx(effectiveHeaderMinimized ? 'pr-7' : '')"
            class="relative flex items-center"
          >
            <div
              :class="useClsx(
                'flex items-center gap-0.5 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
                effectiveHeaderMinimized ? 'mr-4' : 'mr-6.5 md:mr-10.5',
              )"
            >
              <LanguageSwitcher
                :open="!!isSwitchOpen"
                :class="useClsx(
                  'transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
                  effectiveHeaderMinimized ? 'p-1' : 'p-1.5',
                )"
                @update:open="(v: boolean) => { isSwitchOpen = v }"
              />
              <ColorMode
                :class="useClsx(
                  'transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
                  effectiveHeaderMinimized ? '<md:hidden' : 'p-1.5',
                )"
              />
            </div>
            <Menu
              :class="useClsx(
                'transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
                effectiveHeaderMinimized ? 'p-1' : 'p-1.5',
              )"
            />
          </div>
        </div>
      </div>
    </header>
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
