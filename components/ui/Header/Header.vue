<script lang="ts" setup>
// Components
import ColorMode from '@/components/ui/ColorMode/ColorMode.vue'
import LanguageSwitcher from '@/components/ui/Navigation/LanguageSwitcher/LanguageSwitcher.vue'
import MenuButton from '@/components/ui/Navigation/Mobile/MenuButton.vue'
import Navigation from '@/components/ui/Navigation/Mobile/Navigation.vue'
import { useEventListener } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { ref, watch } from 'vue'

// Example menu items
const menuItems = [
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'Software', href: '/products/software' },
      { label: 'Hardware', href: '/products/hardware' },
      { label: 'Services', href: '/products/services' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Our Story', href: '/about/story' },
      { label: 'Team', href: '/about/team' },
      { label: 'Careers', href: '/about/careers' },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]

// State variables
const isOpen = ref(false) // for mobile nav
const isSwitchOpen = ref(false) // for language switcher
const isVisible = ref(true) // optional, for show/hide behavior
const headerRef = ref<HTMLElement | null>(null)

function toggleMenu() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    isSwitchOpen.value = false
  }
}

function handleClose(state: boolean) {
  isOpen.value = state
}

// Close menu and language switcher on Escape key
useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    isOpen.value = false
    isSwitchOpen.value = false
  }
})

// Focus trap for the mobile menu
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
    <header
      ref="headerRef"
      :class="useClsx(
        'transition-all duration-900 ease-[cubic-bezier(0.77,0,0.18,1)]',
        isOpen ? 'bg-pureWhite/95 dark:bg-pureBlack/95' : 'bg-pureWhite/50 dark:bg-pureBlack/50',
        'fixed left-0 top-0 z-50 w-full',
      )"
      role="banner"
    >
      <!-- Background as separate layer  -->
      <div
        :class="useClsx(
          'pointer-events-none absolute inset-0',
          'backdrop-blur-[8px] backdrop-saturate-150',
        )"
      />
      <div
        :class="useClsx(
          'transition-colors duration-900 ease-[cubic-bezier(0.77,0,0.18,1)]',
          'border-b border-gray-5 border-solid',
          'dark:border-gray-4 dark:border-gray-4',
          'relative mx-auto flex items-center justify-between px-4 py-2 md:py-3 sm:px-6',
        )"
      >
        <!-- Logo -->
        <div class="flex items-center transition-all duration-900 ease-[cubic-bezier(0.77,0,0.18,1)]">
          <NuxtLink
            :class="useClsx(
              'px-2 text-xl font-bold tracking-tight antialiased',
              'transition-transform duration-300 ease-in-out',
              'hover:scale-105 md:text-3xl focus:outline-none',
              'focus:ring-3 focus:ring-pureBlack dark:focus:ring-pureWhite',
            )"
            aria-label="Tech News"
            to="/"
          >
            <span class="text-pureBlack dark:text-pureWhite">Tec</span>
            <span class="text-fg text-mint-8">News</span>
          </NuxtLink>
        </div>

        <!-- Right side menu items -->
        <div class="flex items-center gap-6">
          <LanguageSwitcher
            v-model:open="isSwitchOpen"
          />
          <ColorMode />
          <MenuButton
            :is-open="isOpen"
            @click="toggleMenu"
          />
        </div>
      </div>

      <!-- Navigation is now rendered directly within the header so that the header grows downward -->
      <Navigation
        :is-open="isOpen"
        :items="menuItems"
        @close="handleClose"
      />
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
