<script lang="ts" setup>
// Import external components and utilities
import ColorMode from '@/components/ui/ColorMode/ColorMode.vue'
import Menu from '@/components/ui/Menu/Menu.vue'
import Underline from '@/components/ui/Menu/Underline/Underline.vue'
import LanguageSwitcher from '@/components/ui/Navigation/LanguageSwitcher/LanguageSwitcher.vue'
import { useEventListener } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

// Base transition easing remains the same
const transitionEasing = 'ease-[cubic-bezier(0.77,0,0.18,1)]'

// compute to destination for a home link
const homeLink = computed(() => {
  return { name: 'index' }
})

// Reactive state variables
const isOpen = ref(false) // Drives Navigation.vue visibility
const isSwitchOpen = ref(false) // Controls language switcher
const headerRef = ref<HTMLElement | null>(null)
// New menuPhase state: 'closed' | 'opening' | 'open' | 'closing'
const menuPhase = ref<'closed' | 'opening' | 'open' | 'closing'>('closed')

// Compute header background based on the current menuPhase
const headerBgClass = computed(() =>
  menuPhase.value === 'opening' || menuPhase.value === 'open'
    ? 'bg-pureWhite/95 dark:bg-pureBlack/95'
    : 'bg-pureWhite/50 dark:bg-pureBlack/50',
)

// Dynamically compute the transition class for the header
const headerTransitionClass = computed(() => {
  // Use a faster (e.g. 300ms) transition for opening, and slower for closing
  const durationClass = menuPhase.value === 'opening' ? 'duration-300' : 'duration-900'
  return `transition-all ${durationClass} ${transitionEasing}`
})

const headerStyle = computed(() => {
  if (menuPhase.value === 'closing') {
    return { transitionDelay: '300ms' }
  }
  return { transitionDelay: '0ms' }
})

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
      :class="[headerTransitionClass, headerBgClass]"
      :style="headerStyle"
      class="fixed left-0 top-0 z-50 w-full"
      role="banner"
    >
      <!-- Background layer for consistent backdrop filter (Glass morphism) -->
      <div
        :class="useClsx(
          'pointer-events-none absolute inset-0',
          'backdrop-blur-[8px] backdrop-saturate-150',
        )"
      />
      <!-- Inner container for logo and right-side items -->
      <div
        :class="[headerTransitionClass]"
        class="relative mx-auto flex items-center justify-between border-b border-gray-5 border-solid px-4 py-2 dark:border-gray-4 md:py-3 sm:px-6"
      >
        <div class="flex items-center pr-5">
          <NuxtLink
            :class="useClsx(
              'absolute group px-2 text-xl font-bold tracking-tight antialiased',
              'transition-transform duration-300 ease-in-out hover:scale-105 md:text-3xl',
              'focus:outline-none focus:ring-3 focus:ring-pureBlack dark:focus:ring-pureWhite',
            )"
            :to="homeLink"
            aria-label="Tech News"
          >
            <span class="text-pureBlack dark:text-pureWhite">Tec</span>
            <span class="text-fg text-mint-8">News</span>
            <Underline />
          </NuxtLink>
        </div>
        <div class="flex items-center">
          <LanguageSwitcher v-model:open="isSwitchOpen" />
          <ColorMode class="mr-12" />
          <Menu />
        </div>
      </div>
      <!-- Pass transition events from Navigation to adjust menuPhase -->
    </header>
    <NuxtLinkLocale
      :class="useClsx(
        'focus:bg-white focus:text-black focus:ring-blue-500 sr-only',
        'focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:p-4 focus:outline-none focus:ring-2',
      )"
      to="#main-content"
    >
      Skip to content
    </NuxtLinkLocale>
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
