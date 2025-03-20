<script setup>
import Header from '@/components/ui/Header/Header.vue'
import Shader from '@/components/ui/Shaders/Shader.vue'
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-gray-3 dark:bg-gray-2">
    <!-- Background container -->
    <div class="absolute inset-0 z-0">
      <Shader />
    </div>

    <!-- Main Content -->
    <div
      class="relative z-10 overflow-y-auto transition-colors duration-900 ease-[cubic-bezier(0.77,0,0.18,1)]"
    >
      <Header />
      <main class="pt-20">
        <slot name="default" />
      </main>
    </div>
  </div>
</template>
