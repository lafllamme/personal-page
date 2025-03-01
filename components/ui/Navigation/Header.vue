<script lang="ts" setup>
import ColorMode from '@/components/ui/ColorMode/ColorMode.vue'
import LanguageSwitcher from '@/components/ui/Navigation/LanguageSwitcher/LanguageSwitcher.vue'
import NavigationMobile from '@/components/ui/Navigation/Mobile/NavigationMobile.vue'
import { breakpointsTailwind, useBreakpoints, useEventListener, useWindowScroll, useWindowSize } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
// Menu items
const menuItems = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerMD = computed(() => breakpoints.smaller('md').value)
const { width } = useWindowSize()

// State variables
const isOpen = ref(false)
const isSwitchOpen = ref(false)
const isVisible = ref(true)
const headerRef = ref<HTMLElement | null>(null)

// Use VueUse composable for scroll
const { y: scrollY } = useWindowScroll()
const scrollThreshold = computed(() => width.value * 0.1)

// Watch scrollY for show/hide behavior (optional)
watch(scrollY, (currentScrollY, previousScrollY) => {
  /* if (currentScrollY < scrollThreshold.value) {
    isVisible.value = true
  }
  else {
    isVisible.value = currentScrollY <= previousScrollY
  } */
})

// Toggle menu with focus trap for accessibility
function toggleMenu() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    isSwitchOpen.value = false
  }
}

// Close menu and dropdowns on escape key
useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    isOpen.value = false
    isSwitchOpen.value = false
  }
})

// Handle focus trap for mobile menu
const { activate, deactivate } = useFocusTrap(headerRef)
watch(isOpen, (newVal) => {
  newVal ? activate() : deactivate()
})
</script>

<template>
  <div>
    <!-- Header with glassmorphism & scroll behavior -->
    <header
      ref="headerRef"
      :class="useClsx(
        isVisible ? 'translate-y-0' : '-translate-y-full',
        'fixed left-0 top-0 z-50 w-full transition-transform duration-500 ease-in-out',
      )"
      role="banner"
    >
      <div
        :class="useClsx(
          'border-b border-gray-5 border-solid dark:border-gray-4',
          'backdrop-blur-[8px] backdrop-saturate-150 ',
        )"
      >
        <div :class="useClsx('mx-auto px-4 py-2 lg:px-8 md:py-3 sm:px-6')">
          <div class="flex items-center justify-between">
            <!-- Logo -->
            <div class="flex items-center">
              <NuxtLink
                :class="useClsx(
                  'antialiased rounded-sm text-xl font-bold tracking-tight md:text-3xl',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2',
                )"
                aria-label="Brand homepage"
                to="/"
              >
                <span class="text-pureBlack dark:text-pureWhite">Tec</span>
                <span class="text-fg text-mint-8">News</span>
              </NuxtLink>
            </div>

            <!-- Right side menu items -->
            <div
              class="flex items-center gap-6 color-pureBlack transition-colors dark:color-pureWhite"
            >
              <!-- Language Switcher -->
              <LanguageSwitcher
                v-model:open="isSwitchOpen"
              />

              <!-- Dark Mode Toggle & Burger Menu -->
              <ColorMode />
              <button
                v-if="smallerMD"
                id="mobile-menu-button"
                :class="useClsx(
                  'focus:outline-none focus:ring focus:ring-pureBlack dark:focus:ring-pureWhite',
                  'color-pureBlack dark:color-pureWhite',
                  'h-12 w-12',
                )"
                aria-label="Toggle menu"
                @click="toggleMenu"
              >
                <Icon
                  class="h-12 w-12 cursor-pointer"
                  name="ri:menu-3-fill"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Hamburger Menu (Slide down) -->
      <template v-if="smallerMD">
        <NavigationMobile
          :items="menuItems"
          :open="isOpen && !isSwitchOpen"
        />
      </template>
    </header>

    <!-- Skip to content link for keyboard users -->
    <NuxtLinkLocale
      :class="useClsx(
        'focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:p-4',
        'focus:outline-none focus:ring-2 focus:bg-white focus:text-black focus:ring-blue-500',
        'sr-only focus:not-sr-only')"
      to="#main-content"
    >
      Skip to content
    </NuxtLinkLocale>
  </div>
</template>
