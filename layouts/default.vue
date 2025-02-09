<script setup>
import Header from '@/components/ui/Header/Header.vue'
</script>

<template>
  <!-- Shared Header (which may include your ColorMode component) -->
  <Header />

  <!-- Body wrapper for page-specific content -->
  <main class="bg-gray-2 transition-colors duration-900 ease-[cubic-bezier(0.77,0,0.18,1)] dark:bg-black-12A">
    <slot />
  </main>

  <!-- Shared Footer (if needed) -->
<!--  <Footer /> -->
</template>

<style lang="scss">
//TODO: Fix dark mode settings
html {
  @apply transition-colors duration-900 ease-[cubic-bezier(0.77,0,0.18,1)];
  &.dark-theme {
    background: rgb(25, 25, 25);
  }
  &.light-theme {
    @apply bg-gray-2;
  }
}

@media (prefers-color-scheme: dark) {
  html {
    @apply bg-black-12A;
  }
}

@media (prefers-color-scheme: light) {
  html {
    @apply bg-gray-2;
  }
}
</style>
