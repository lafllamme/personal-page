<script lang="ts" setup>
defineProps<{ isOpen: boolean }>()
defineEmits({
  toggle: () => true,
})
</script>

<template>
  <button
    :aria-expanded="isOpen"
    :class="useClsx(
      '',
      'flex items-center justify-center duration-200',
      'hover:scale-110 transition-transform focus:outline-none',
      'color-pureBlack dark:color-pureWhite',
      'focus:ring-pureBlack dark:focus:ring-pureWhite focus:ring',
    )"
    aria-controls="mobile-menu"
    aria-haspopup="true"
    aria-label="Toggle menu"
    @click="$emit('toggle')"
  >
    <svg
      :class="isOpen && '-translate-x-2'"
      class="h-10 w-10 transform transition-transform duration-300"
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
  </button>
</template>
