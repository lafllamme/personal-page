<script lang="ts" setup>
import { useEventListener, useWindowScroll } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
// Import external components and utilities
import ColorMode from '@/components/ui/ColorMode/ColorMode.vue'
import Menu from '@/components/ui/Menu/Menu.vue'
import Underline from '@/components/ui/Menu/Underline/Underline.vue'
import LanguageSwitcher from '@/components/ui/Navigation/LanguageSwitcher/LanguageSwitcher.vue'
import { useMenu } from '@/stores/menu/menu'

// Configurable thresholds (percent of page scrolled) with sensible defaults
const props = withDefaults(defineProps<{ minimizeAtPercent?: number, activateAtPercent?: number }>(), {
  minimizeAtPercent: 0.05, // minimize a bit earlier (5%)
  activateAtPercent: 0.02, // start subtle effects earlier (2%)
})
// compute to destination for a home link
const localePath = useLocalePath()
const homeLink = computed(() => {
  return localePath('/')
})

const { height } = useWindowSize()

// Menu store
const menuStore = useMenu()
const { isHeaderMinimized } = storeToRefs(menuStore)

// Track minimized header container width to match dropdown width
const headerContainerRef = ref<HTMLElement | null>(null)

function updateHeaderMinWidthVar() {
  if (import.meta.server)
    return
  const el = headerContainerRef.value
  if (!el)
    return
  const { width } = el.getBoundingClientRect()
  document.documentElement.style.setProperty('--header-minimized-width', `${Math.round(width)}px`)
}

onMounted(() => {
  updateHeaderMinWidthVar()
})

useEventListener(window, 'resize', () => {
  updateHeaderMinWidthVar()
})

watch(isHeaderMinimized, (min) => {
  if (min)
    updateHeaderMinWidthVar()
})

// Reactive state variables
const isOpen = ref(false) // Drives Navigation.vue visibility
const isSwitchOpen = ref(false) // Controls language switcher
const headerRef = ref<HTMLElement | null>(null)

const { y } = useWindowScroll()

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
          isHeaderMinimized ? 'mt-4 md:mt-6 max-w-[65vw] min-w-0 md:max-w-[45vw]' : 'mt-0 max-w-full',
        )"
      >
        <!-- Background layer for consistent backdrop filter (Glass morphism) -->
        <div
          :class="useClsx(
            hasScrolledEnough && 'backdrop-saturate-150',
            'pointer-events-none absolute inset-0',
            'transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
            // Glass background: default subtle glass, minimized = pure liquid glass (blur only)
            isHeaderMinimized
              ? 'backdrop-blur-[12px] backdrop-saturate-180 backdrop-contrast-115 bg-transparent ring-1 ring-mint-12 shadow-[0_8px_30px_rgba(0,0,0,0.12)]'
              : 'backdrop-blur-[6px] bg-pureWhite/45 dark:bg-pureBlack/35 ring-0',
            isHeaderMinimized ? 'rounded-full' : 'rounded-none',
          )"
        />
        <!-- Inner container for logo and right-side items -->
        <div
          :class="useClsx(
            'transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
            'relative flex items-center justify-between',
            isHeaderMinimized ? ' px-6 py-4 md:px-8 md:py-4' : 'px-6 py-4 md:px-8',
            isHeaderMinimized ? 'border-none' : 'border-b',
            !isHeaderMinimized && 'border-b border-gray-5 border-solid dark:border-gray-4',
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
                isHeaderMinimized ? 'text-xl md:text-2xl ts-contrast' : 'text-2xl md:text-3xl',
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
            :class="isHeaderMinimized && 'pr-7'"
            class="relative flex items-center"
          >
            <div
              :class="useClsx(
                'flex items-center gap-0.5 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
                isHeaderMinimized ? 'mr-4' : 'mr-6.5 md:mr-10.5',
              )"
            >
              <LanguageSwitcher
                v-model:open="isSwitchOpen"
                :class="useClsx(
                  'transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
                  isHeaderMinimized ? 'p-1' : 'p-1.5',
                )"
              />
              <ColorMode
                :class="useClsx(
                  'transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
                  isHeaderMinimized ? '<md:hidden' : 'p-1.5',
                )"
              />
            </div>
            <Menu
              :class="useClsx(
                'transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
                isHeaderMinimized ? 'p-1' : 'p-1.5',
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
