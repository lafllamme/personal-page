<script lang="ts" setup>
// Import external components and utilities
import ColorMode from '@/components/ui/ColorMode/ColorMode.vue'
import Menu from '@/components/ui/Menu/Menu.vue'
import Underline from '@/components/ui/Menu/Underline/Underline.vue'
import LanguageSwitcher from '@/components/ui/Navigation/LanguageSwitcher/LanguageSwitcher.vue'
import { useEventListener, useWindowScroll } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

// compute to destination for a home link
const homeLink = computed(() => {
  return { name: 'index' }
})

const { height } = useWindowSize()

// Reactive state variables
const isOpen = ref(false) // Drives Navigation.vue visibility
const isSwitchOpen = ref(false) // Controls language switcher
const headerRef = ref<HTMLElement | null>(null)

const { y } = useWindowScroll()

// TODO: improve this here
const hasScrolledEnough = computed(() => {
  if (import.meta.server)
    return false

  const scrollY = y.value
  const docHeight = document.documentElement.scrollHeight - height.value
  const scrolledPercent = docHeight > 0 ? scrollY / docHeight : 0
  return scrolledPercent >= 0.2
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
      class="fixed left-0 top-0 z-50 w-full"
      role="banner"
    >
      <!-- Background layer for consistent backdrop filter (Glass morphism) -->
      <div
        :class="useClsx(
          hasScrolledEnough && 'backdrop-saturate-150',
          'pointer-events-none absolute inset-0',
          'transition-colors duration-600 ease-[cubic-bezier(0.33,1,0.68,1)]',
          'backdrop-blur-[8px] bg-pureWhite/50 dark:bg-pureBlack/50',
        )"
      />
      <!-- Inner container for logo and right-side items -->
      <div
        :class="useClsx(
          'transition-colors duration-600 ease-[cubic-bezier(0.33,1,0.68,1)]',
          'border-b border-gray-5 border-solid dark:border-gray-4',
          'relative mx-auto flex items-center justify-between',
          'px-4 py-3 sm:px-6',
        )"
      >
        <div class="flex items-center">
          <NuxtLink
            :class="useClsx(
              'transition-transform geist-regular duration-300 ease-out hover:scale-105 md:text-3xl',
              'focus-visible:ring-pureBlack dark:focus-visible:ring-pureWhite',
              'absolute group px-2 text-2xl font-bold tracking-tight antialiased',
              'focus-visible:outline-none focus-visible:ring-3',
            )"
            :to="homeLink"
            aria-label="Tech News"
            tabindex="0"
          >
            <span class="text-pureBlack dark:text-pureWhite">Tec</span>
            <span class="text-fg text-mint-8">News</span>
            <Underline />
          </NuxtLink>
        </div>
        <div class="relative flex items-center">
          <div class="mr-6.5 flex items-center gap-0.5 md:mr-10.5">
            <LanguageSwitcher
              v-model:open="isSwitchOpen"
              class="p-1.5"
            />
            <ColorMode
              class="p-1.5"
            />
          </div>
          <Menu
            class="p-1.5"
          />
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
