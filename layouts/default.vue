<script setup>
// Your 3D animated background
import Header from '@/components/ui/Header/Header.vue'
import Shader from '~/components/ui/Shaders/Shader.vue'
</script>

<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Background container -->
    <div class="absolute inset-0 -z-10">
      <Shader />
    </div>

    <!-- Main Content -->
    <div class="relative z-10 overflow-y-auto transition-colors duration-900 ease-[cubic-bezier(0.77,0,0.18,1)]">
      <Header />
      <main>
        <slot name="default" />
      </main>
    </div>
  </div>
</template>

<style lang="scss">
html::-webkit-scrollbar,
body::-webkit-scrollbar {
  display: none; // Hide scrollbars in WebKit browsers
}

html {
  scrollbar-width: none; // Hide scrollbars in Firefox
  scroll-behavior: smooth;
}
</style>
