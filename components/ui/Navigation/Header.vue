<script lang="ts" setup>
// Components
import ColorMode from '@/components/ui/ColorMode/ColorMode.vue'
import LanguageSwitcher from '@/components/ui/Navigation/LanguageSwitcher/LanguageSwitcher.vue'
import NavigationMobile from '@/components/ui/Navigation/Mobile/NavigationMobile.vue'

import { breakpointsTailwind, useBreakpoints, useEventListener, useWindowScroll, useWindowSize } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { computed, ref, watch } from 'vue'

// Example menu items
const menuItems = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

// Responsive breakpoints
const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerMD = computed(() => breakpoints.smaller('md').value)

// State variables
const isOpen = ref(false) // for mobile nav
const isSwitchOpen = ref(false) // for language switcher
const isVisible = ref(true) // optional, for show/hide behavior
const headerRef = ref<HTMLElement | null>(null)

// Track scroll to potentially hide or show header
const { width } = useWindowSize()
const { y: scrollY } = useWindowScroll()
const scrollThreshold = computed(() => width.value * 0.1)

watch(scrollY, (currentScrollY, previousScrollY) => {
  // Example logic (commented out in your code):
  // if (currentScrollY < scrollThreshold.value) {
  //   isVisible.value = true
  // } else {
  //   isVisible.value = currentScrollY <= previousScrollY
  // }
})

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
const { activate, deactivate } = useFocusTrap(headerRef)
watch(isOpen, (newVal) => {
  newVal ? activate() : deactivate()
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
        'fixed left-0 top-0 z-50 w-full transition-transform duration-500 ease-in-out',
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
              'antialiased rounded-sm text-xl px-2 font-bold tracking-tight md:text-3xl',
              'focus:outline-none focus:ring-2 focus:ring-pureBlack dark:focus:ring-pureWhite',
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
          :class="useClsx('flex items-center gap-6 color-pureBlack transition-colors dark:color-pureWhite')"
        >
          <!-- Language Switcher -->
          <LanguageSwitcher v-model:open="isSwitchOpen" />

          <!-- Dark Mode Toggle & Burger Menu -->
          <ColorMode />

          <button
            v-if="smallerMD"
            id="mobile-menu-button"
            :class="useClsx(
              'h-12 w-12 color-pureBlack dark:color-pureWhite dark:focus:ring-pureWhite',
              'focus:outline-none focus:ring focus:ring-pureBlack',
            )"
            aria-label="Toggle menu"
            @click="toggleMenu"
          >
            <Icon class="h-12 w-12 cursor-pointer" name="ri:menu-3-fill" />
          </button>
        </div>
      </div>

      <!-- Mobile nav (Slide down) -->
      <NavigationMobile
        v-if="smallerMD"
        :items="menuItems"
        :open="isOpen && !isSwitchOpen"
      />
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
