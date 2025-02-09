<script setup>
import Header from '@/components/ui/Header/Header.vue'
</script>

<template>
  <div class="scroll-none overflow-y-auto bg-gray-3 transition-colors duration-900 ease-[cubic-bezier(0.77,0,0.18,1)] dark:bg-black-12A">
    <!-- Shared Header (which may include your ColorMode component) -->
    <Header />

    <!-- Body wrapper for page-specific content -->
    <main>
      <slot name="default" />
    </main>

    <!-- Shared Footer (if needed) -->
    <!--  <Footer /> -->
  </div>
</template>

<style lang="scss">
html::-webkit-scrollbar,
body::-webkit-scrollbar {
  display: none; // WebKit (Chrome, Safari, Edge)
}

html {
  scrollbar-width: none; // Firefox: Scrollbar ausblenden
  scroll-behavior: smooth;
}

@media (prefers-color-scheme: dark) {
  html {
    @apply rgba(25, 25, 25);
  }
}

@media (prefers-color-scheme: light) {
  html {
    @apply bg-gray-3;
  }
}
</style>
