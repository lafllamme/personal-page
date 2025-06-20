<script lang="ts" setup>
import type { MenuButtonEmits, MenuButtonProps } from '@/components/ui/Menu/Button/MenuButton.model'
import { MenuButtonDefaults } from '@/components/ui/Menu/Button/MenuButton.model'
import { useMenu } from '@/stores/menu'

withDefaults(defineProps<MenuButtonProps>(), MenuButtonDefaults)
defineEmits<MenuButtonEmits>()

const menuStore = useMenu()
const { isOpen } = storeToRefs(menuStore)
const { toggleMenu } = menuStore
</script>

<template>
  <button
    :aria-expanded="isOpen"
    :aria-label="isOpen ? 'Close menu' : 'Open menu'"
    :class="useClsx(
      'group focus-visible:ring-pureBlack dark:focus-visible:ring-pureWhite focus-visible:ring-inset focus-visible:ring',
      'transition-transform focus:outline-none ease-in-out duration-300',
      'absolute z-100 top-1.5 md:top-1.5 -translate-x-full absolute z-100',
      isOpen && 'opened',
    )"
    aria-controls="mobile-menu"
    tabindex="0"
    type="button"
    @click="toggleMenu('toggle')"
  >
    <svg
      class="size-5 transition-colors duration-600 ease-[cubic-bezier(0.33,1,0.68,1)] md:size-8"
      viewBox="0 0 100 100"
    >
      <path
        class="line line1 transform-origin-center scale-135 stroke-pureBlack dark:stroke-pureWhite"
        d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
      />
      <path
        class="line line2 transform-origin-center scale-135 stroke-pureBlack dark:stroke-pureWhite"
        d="M 20,50 H 80"
      />
      <path
        class="line line3 transform-origin-center scale-135 stroke-pureBlack dark:stroke-pureWhite"
        d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
      />
    </svg>
  </button>
</template>

<style scoped>
.menu {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 0;
}

.line {
  fill: none;
  stroke-width: 6;
  transition:
    stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.line1 {
  stroke-dasharray: 60 207;
  stroke-width: 6;
}

.line2 {
  stroke-dasharray: 60 60;
  stroke-width: 6;
}

.line3 {
  stroke-dasharray: 60 207;
  stroke-width: 6;
}

.opened .line1 {
  stroke-dasharray: 90 207;
  stroke-dashoffset: -134;
  stroke-width: 6;
}

.opened .line2 {
  stroke-dasharray: 1 60;
  stroke-dashoffset: -30;
  stroke-width: 6;
}

.opened .line3 {
  stroke-dasharray: 90 207;
  stroke-dashoffset: -134;
  stroke-width: 6;
}
</style>
