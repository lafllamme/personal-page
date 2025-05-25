<script lang="ts" setup>
import type { MenuProps } from './Menu.model'
import MenuButton from '@/components/ui/Menu/Button/MenuButton.vue'
import Footer from '@/components/ui/Menu/Footer/Footer.vue'
import MenuAccordion from '@/components/ui/Menu/MenuAccordion/MenuAccordion.vue'
import MenuBackground from '@/components/ui/Menu/MenuBackground/MenuBackground.vue'
import MenuOverlay from '@/components/ui/Menu/MenuOverlay/MenuOverlay.vue'
import MenuPanel from '@/components/ui/Menu/MenuPanel/MenuPanel.vue'
import MenuSearch from '@/components/ui/Menu/Search/MenuSearch.vue'
import SearchResults from '@/components/ui/Menu/SearchResults/SearchResults.vue'
import { useMenu } from '@/stores/menu'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { MenuPropsDefault } from './Menu.model'

withDefaults(defineProps<MenuProps>(), MenuPropsDefault)

const menuStore = useMenu()
const { isOpen } = storeToRefs(menuStore)
const { toggleMenu } = menuStore

const menu = useTemplateRef('menu')
const { activate, deactivate } = useFocusTrap(menu)
const isLocked = useScrollLock(document)

function handleEsc(event: KeyboardEvent) {
  if (event.key === 'Escape')
    isOpen.value = false
}

function setBodyScroll(locked: boolean) {
  isLocked.value = locked
}

function handleMenu(open: boolean) {
  setBodyScroll(open)
  if (open) {
    activate()
    toggleMenu('open')
  }
  else {
    deactivate()
    toggleMenu('close')
  }
}

watch(isOpen, (open) => {
  handleMenu(open)
})
// const tabIndex = computed(() => (isOpen.value ? '0' : '-1'))
// useEventListener(window, 'keydown', handleEsc)
</script>

<template>
  <div
    ref="menu"
    @keydown.esc="handleEsc"
  >
    <!-- Menu Button -->
    <MenuButton />

    <!-- Overlay -->
    <MenuOverlay />
    <!-- Menu Panel -->
    <MenuPanel>
      <!-- Background Text -->
      <MenuBackground />

      <!-- Content -->
      <div
        :class="useClsx(
          'color-pureBlack h-svh dark:color-pureWhite',
          'relative z-10 h-full flex flex-col p-6',
        )"
      >
        <!-- Search -->
        <MenuSearch />

        <!-- Menu Items or Search Results -->
        <div
          :class="useClsx('flex-1 overflow-x-hidden overflow-y-auto')"
          tabindex="-1"
        >
          <!-- Search Results -->
          <SearchResults />

          <!-- Default Menu (Accordion) -->
          <MenuAccordion />
        </div>
        <!-- Footer -->
        <Footer />
      </div>
    </MenuPanel>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&family=Figtree:ital,wght@0,300..900;1,300..900&family=Major+Mono+Display&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Boldonse&family=Zen+Dots&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Space+Grotesk:wght@300..700&display=swap');

.geist-regular {
  font-family: 'Geist', sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.geist-thin {
  font-family: 'Geist', sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.space-grotesk-regular {
  font-family: 'Space Grotesk', sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}

.boldonse-regular {
  font-family: 'Boldonse', system-ui;
  font-weight: 400;
  font-style: normal;
}

.audiowide-regular {
  font-family: 'Audiowide', sans-serif;
  font-weight: 400;
  font-style: normal;
}

.zen-dots-regular {
  font-family: 'Zen Dots', sans-serif;
  font-weight: 400;
  font-style: normal;
}

.bruno-ace-sc-regular {
  font-family: 'Bruno Ace SC', sans-serif;
  font-weight: 400;
  font-style: normal;
}

.major-mono-display-regular {
  font-family: 'Major Mono Display', monospace;
  font-weight: 400;
  font-style: normal;
}

.figtree-regular {
  font-family: 'Figtree', sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}

.jetbrains-mono-regular {
  font-family: 'JetBrains Mono', monospace;
  font-optical-sizing: auto;
  font-style: normal;
}

.slide-out-blurred-top {
  animation: slide-out-blurred-top 0.45s cubic-bezier(0.755, 0.05, 0.855, 0.06) both;
}

@keyframes slide-out-blurred-top {
  0% {
    transform: translateY(0) scaleY(1) scaleX(1);
    transform-origin: 50% 0;
    filter: blur(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-1000px) scaleY(2) scaleX(0.2);
    transform-origin: 50% 0;
    filter: blur(40px);
    opacity: 0;
  }
}

.slide-in-from-top-3 {
  animation-name: slideInFromTop;
}

@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-0.75rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
