<script setup>
import Header from '@/components/ui/Header/Header.vue'
</script>

<template>
  <div class="relative overflow-hidden">
    <!-- Main Content -->
    <div
      class="relative z-10 overflow-y-auto"
    >
      <Header />
      <main>
        <slot name="default" />
      </main>
    </div>
  </div>
</template>
