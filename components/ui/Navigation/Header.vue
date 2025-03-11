<script lang="ts" setup>
// Components
import ColorMode from '@/components/ui/ColorMode/ColorMode.vue'
import LanguageSwitcher from '@/components/ui/Navigation/LanguageSwitcher/LanguageSwitcher.vue'
import MobileMenu from '@/components/ui/Navigation/Mobile/MobileMenu.vue'

import MobileMenuButton from '@/components/ui/Navigation/Mobile/MobileMenuButton.vue'
import { breakpointsTailwind, useBreakpoints, useEventListener } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { ref, watch } from 'vue'

// Example menu items
const menuItems = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

// Responsive breakpoints
const breakpoints = useBreakpoints(breakpointsTailwind)

// State variables
const isOpen = ref(false) // for mobile nav
const isSwitchOpen = ref(false) // for language switcher
const isVisible = ref(true) // optional, for show/hide behavior
const headerRef = ref<HTMLElement | null>(null)

// Toggle the mobile menu
function toggleMenu() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    isSwitchOpen.value = false
  }
}

// Close menu and language switcher on Escape
useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    isOpen.value = false
    isSwitchOpen.value = false
  }
})

// Focus trap for the mobile menu
// TODO: Improve menu states for better handling
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
    <!--
      Header container with position:fixed for sticky top behavior.
      We keep focus trap + scrolling logic as in your original code.
    -->
    <header
      ref="headerRef"
      :class="useClsx(
        isVisible ? 'translate-y-0' : '-translate-y-full',
        'bg-pureWhite/50 dark:bg-pureBlack/50 fixed left-0 top-0 z-50 w-full transition-transform duration-500 ease-in-out',
      )"
      role="banner"
    >
      <!--
        1) The blurred background layer:
           Absolutely positioned, fills entire header.
           Has the border + backdrop-blur + saturate, etc.
      -->
      <div
        :class="useClsx(
          'pointer-events-none absolute inset-0 border-b border-gray-5 border-solid',
          'backdrop-blur-[8px] backdrop-saturate-150 dark:border-gray-4 dark:border-gray-4',
        )"
      />

      <!--
        2) The actual header content:
           Position: relative to stack above the blur layer.
           Contains logo, language switcher, color mode, etc.
      -->
      <div
        :class="useClsx('relative mx-auto flex items-center justify-between px-4 py-2 lg:px-8 md:py-3 sm:px-6')"
      >
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink
            :class="useClsx(
              'antialiased text-xl px-2 font-bold tracking-tight md:text-3xl',
              'focus:outline-none focus:ring-3 focus:ring-pureBlack dark:focus:ring-pureWhite',
              'transition-transform ease-in-out duration-300 hover:scale-105',
            )"
            aria-label="Tech News"
            to="/"
          >
            <span class="text-pureBlack dark:text-pureWhite">Tec</span>
            <span class="text-fg text-mint-8">News</span>
          </NuxtLink>
        </div>

        <!-- Right side menu items -->
        <div
          :class="useClsx(
            'flex items-center gap-6  transition-colors',
            'color-pureBlack dark:color-pureWhite',
          )"
        >
          <!-- Dark Mode Toggle & Burger Menu -->
          <ColorMode />
          <!-- Language Switcher -->
          <LanguageSwitcher v-model:open="isSwitchOpen" />
          <!-- MobileMenuButton -->
          <MobileMenuButton
            :is-open="isOpen"
            @click="toggleMenu"
          />

          <!-- MobileMenu -->
          <MobileMenu
            :is-open="isOpen"
            :items="menuItems"
          />
        </div>
      </div>
    </header>

    <!--
      Skip to content link for keyboard users
      (unchanged from your original).
    -->
    <NuxtLinkLocale
      :class="useClsx(
        'focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:p-4',
        'focus:outline-none focus:ring-2 focus:bg-white focus:text-black focus:ring-blue-500',
        'sr-only focus:not-sr-only',
      )"
      to="#main-content"
    >
      Skip to content
    </NuxtLinkLocale>
  </div>
</template>
