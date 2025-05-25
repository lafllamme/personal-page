<script setup>
import Header from '@/components/ui/Header/Header.vue'
</script>

<template>
  <div class="relative overflow-hidden">
    <!-- Main Content -->
    <div
      class="relative z-10 overflow-y-auto bg-pureWhite transition-colors duration-600 ease-[cubic-bezier(0.33,1,0.68,1)] dark:bg-pureBlack"
    >
      <Header />
      <main>
        <slot name="default" />
      </main>
    </div>
  </div>
</template>
