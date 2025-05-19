<script lang="ts" setup>
import type { MenuButtonEmits, MenuButtonProps } from '@/components/ui/Menu/Button/MenuButton.model'
import { MenuButtonDefaults } from '@/components/ui/Menu/Button/MenuButton.model'
import Underline from '@/components/ui/Menu/Underline/Underline.vue'

withDefaults(defineProps<MenuButtonProps>(), MenuButtonDefaults)
defineEmits<MenuButtonEmits>()
</script>

<template>
  <button
    :aria-expanded="isOpen"
    :class="useClsx(
      'group focus-visible:ring-pureBlack dark:focus-visible:ring-pureWhite focus-visible:ring',
      'transition-transform focus:outline-none ease-in-out duration-300',
      'absolute right-0 z-100 flex items-center justify-center',
      'color-pureBlack dark:color-pureWhite',
    )"
    aria-controls="mobile-menu"

    aria-label="Toggle menu"
    tabindex="0"
    type="button"
  >
    <svg
      :class="isOpen && '-translate-x-1.55'"
      class="h-8 w-8 flex transform items-center transition-transform duration-300 ease-in-out"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Top stripe -->
      <path
        :class="[isOpen ? 'translate-y-[5px] rotate-45' : '']"
        class="origin-center transform transition-all duration-300"
        d="M3 4h18v2H3z"
        fill="currentColor"
      />
      <!-- Middle stripe -->
      <path
        :class="[isOpen ? 'opacity-0 translate-x-3' : '']"
        class="transform transition-all duration-300"
        d="M9 11h12v2H9z"
        fill="currentColor"
      />
      <!-- Bottom stripe -->
      <path
        :class="[isOpen ? 'translate-y-[-5px] -rotate-45' : '']"
        class="origin-center transform transition-all duration-300"
        d="M3 18h18v2H3z"
        fill="currentColor"
      />
    </svg>
    <Underline
      class-name="!-bottom-1.52"
      size="big"
    />
  </button>
</template>
