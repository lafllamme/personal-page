<script setup>
import Header from '@/components/ui/Header/Header.vue'
</script>

<template>
  <div class="relative overflow-hidden bg-gray-3 dark:bg-gray-2">
    <!-- Main Content -->
    <div
      class="relative z-10 overflow-y-auto transition-colors duration-900 ease-[cubic-bezier(0.77,0,0.18,1)]"
    >
      <Header />
      <main>
        <slot name="default" />
      </main>
    </div>
  </div>
</template>
