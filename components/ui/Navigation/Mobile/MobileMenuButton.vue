<script lang="ts" setup>
defineProps<{ isOpen: boolean }>()
defineEmits({
  toggle: () => true,
})
</script>

<template>
  <button
    aria-label="Toggle menu"
    class="text-gray-700 hover:text-gray-900 flex items-center justify-center p-2 transition-all duration-200 hover:scale-110 focus:outline-none"
    @click="$emit('toggle')"
  >
    <svg
      class="transform transition-transform duration-300"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Top stripe -->
      <path
        :class="[isOpen ? 'translate-y-[7px] rotate-45' : '']"
        class="origin-center transform transition-all duration-300"
        d="M3 4h18v2H3z"
        fill="currentColor"
      />
      <!-- Middle stripe -->
      <path
        :class="[isOpen ? 'opacity-0 translate-x-3' : '']" class="transform transition-all duration-300"
        d="M9 11h12v2H9z"
        fill="currentColor"
      />
      <!-- Bottom stripe -->
      <path
        :class="[isOpen ? 'translate-y-[-7px] -rotate-45' : '']"
        class="origin-center transform transition-all duration-300"
        d="M3 18h18v2H3z"
        fill="currentColor"
      />
    </svg>
  </button>
</template>
