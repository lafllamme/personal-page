<script setup>
import Footer from '@/components/ui/Footer/Footer.vue'
import Header from '@/components/ui/Header/Header.vue'
</script>

<template>
  <div class="relative overflow-hidden">
    <!-- Main Content -->
    <div
      class="relative z-10 overflow-y-auto bg-pureWhite transition-colors duration-600 ease-[cubic-bezier(0.33,1,0.68,1)] dark:bg-pureBlack"
    >
      <Header />
      <main class="mt-[calc(3rem+1px)] md:mt-[calc(3.5rem+1px)]">
        <slot name="default" />
      </main>
      <Footer />
    </div>
  </div>
</template>
