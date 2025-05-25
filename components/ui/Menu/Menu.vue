<script lang="ts" setup>
import type { MenuProps } from './Menu.model'
import MenuButton from '@/components/ui/Menu/Button/MenuButton.vue'
import Footer from '@/components/ui/Menu/Footer/Footer.vue'
import MenuAccordion from '@/components/ui/Menu/MenuAccordion/MenuAccordion.vue'
import MenuSearch from '@/components/ui/Menu/Search/MenuSearch.vue'
import SearchResults from '@/components/ui/Menu/SearchResults/SearchResults.vue'
import { useMenu } from '@/stores/menu'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { MenuPropsDefault } from './Menu.model'

const props = withDefaults(defineProps<MenuProps>(), MenuPropsDefault)
const { items } = toRefs(props)

const menuStore = useMenu()
const { isOpen } = storeToRefs(menuStore)
const { toggleMenu } = menuStore

const isLocked = useScrollLock(document)
const isAnimating = ref(false)

const menu = useTemplateRef<HTMLDivElement>('menu')
const { activate, deactivate } = useFocusTrap(menu)

watchOnce(items, val => menuStore.setItems(val), { immediate: true })

function handleEsc(event: KeyboardEvent) {
  if (event.key === 'Escape')
    isOpen.value = false
}

function setBodyScroll(locked: boolean) {
  isLocked.value = locked
}

function handleClick() {
  isOpen.value = !isOpen.value
}

function wait(timeout: number = 1200) {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

function handleAnimation() {
  isAnimating.value = true
  wait().then(() => {
    isAnimating.value = false
  })
}

function handleMenu(open: boolean) {
  setBodyScroll(open)
  if (open) {
    handleAnimation()
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
const isAriaHidden = computed(() => (isOpen.value ? 'false' : 'true'))
// const tabIndex = computed(() => (isOpen.value ? '0' : '-1'))
useEventListener(window, 'keydown', handleEsc)
</script>

<template>
  <div ref="menu" class="relative w-full">
    <!-- Menu Button -->
    <div class="flex items-center">
      <MenuButton :is-open="isOpen" @click="handleClick" />
    </div>
    <!-- Overlay -->
    <div
      :class="isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'"
      class="fixed inset-0 z-40 bg-pureBlack/40 backdrop-blur-sm grayscale-40 transition-opacity duration-300 ease-in-out"
      @click="isOpen = false"
    />
    <!-- Menu Panel -->
    <div
      :aria-hidden="isAriaHidden"
      :class="useClsx(
        isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        'w-full sm:w-[60vw] xl:w-[35vw] !max-w-[450px]',
        'fixed inset-y-0 right-0 z-50 w-full bg-pureWhite',
        'shadow-xl transition-all duration-500 ease-out dark:bg-pureBlack',
        'transform-gpu will-change-[transform,opacity] backface-hidden',
      )"
      :inert="isOpen ? undefined : 'true'"
      tabindex="-1"
    >
      <!-- Background Text -->
      <div
        :class="useClsx(
          isAnimating && 'animated-fade-in-right',
          'animate-delay-[50ms] animated  animated-duration-900 animated-repeat-1',
        )"
        class="pointer-events-none absolute inset-0"
      >
        <div
          :class="useClsx(
            'text-[18vh] color-gray-12A font-thin leading-none tracking-wider',
            'absolute right-8 md:right-15 top-12 origin-right transform animate-glow',
            'uppercase opacity-10 -translate-y-1/2 -rotate-90 font-electric',
          )"
        >
          TecNews
        </div>
      </div>

      <!-- Content -->
      <div class="relative z-10 h-full flex flex-col p-6 color-pureBlack h-svh dark:color-pureWhite">
        <!-- Search -->
        <MenuSearch />

        <!-- Menu Items or Search Results -->
        <div class="flex-1 overflow-x-hidden overflow-y-auto" tabindex="-1">
          <!-- Search Results -->
          <SearchResults />

          <!-- Default Menu (Accordion) -->
          <MenuAccordion />
        </div>
        <!-- Footer -->
        <Footer />
      </div>
    </div>
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
    -webkit-transform-origin: 50% 0%;
    transform-origin: 50% 0%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-1000px) scaleY(2) scaleX(0.2);
    -webkit-transform-origin: 50% 0%;
    transform-origin: 50% 0%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
}

/* Transition for appear/disappear of cards & menu items */
.list-enter-active,
.list-leave-active {
  transition: all 0.45s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.98);
  filter: blur(2px);
}

.list-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

.list-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.97);
  filter: blur(2px);
}

/* Animation for menu items */
.animate-in {
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  animation-fill-mode: both;
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

.duration-300 {
  animation-duration: 300ms;
}

li.group {
  will-change: transform, color, opacity;
}
</style>
