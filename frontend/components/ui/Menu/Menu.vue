<script lang="ts" setup>
import type { MenuProps } from './Menu.model'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import MenuButton from '@/components/ui/Menu/Button/MenuButton.vue'
import Footer from '@/components/ui/Menu/Footer/Footer.vue'
import MenuAccordion from '@/components/ui/Menu/MenuAccordion/MenuAccordion.vue'
import MenuBackground from '@/components/ui/Menu/MenuBackground/MenuBackground.vue'
import MenuOverlay from '@/components/ui/Menu/MenuOverlay/MenuOverlay.vue'
import MenuPanel from '@/components/ui/Menu/MenuPanel/MenuPanel.vue'
import MenuSearch from '@/components/ui/Menu/Search/MenuSearch.vue'
import SearchResults from '@/components/ui/Menu/SearchResults/SearchResults.vue'
import { useMenu } from '@/stores/menu'
import { MenuPropsDefault } from './Menu.model'

withDefaults(defineProps<MenuProps>(), MenuPropsDefault)

const menuStore = useMenu()
const { isOpen, effectiveHeaderMinimized } = storeToRefs(menuStore)
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
          'color-pureBlack dark:color-pureWhite',
          // Limit height when header is minimized
          effectiveHeaderMinimized ? 'h-[90svh]' : 'h-svh',
          'relative z-10 flex flex-col p-6',
          effectiveHeaderMinimized && 'pt-14',
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
