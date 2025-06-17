<script setup>
import ScrollTopButton from '@/components/ui/Buttons/ScrollTopButton/ScrollTopButton.vue'
import Footer from '@/components/ui/Footer/Footer.vue'
import BottomBlur from '@/components/ui/General/BottomBlur/BottomBlur.vue'
import Header from '@/components/ui/Header/Header.vue'
</script>

<template>
  <div class="relative">
    <!-- Main Content -->
    <div
      class="relative z-10 bg-pureWhite transition-colors duration-600 ease-[cubic-bezier(0.33,1,0.68,1)] dark:bg-pureBlack"
    >
      <Header />
      <main class="mt-[calc(3rem+1px)] md:mt-[calc(3.5rem+1px)]">
        <slot name="default" />
      </main>
      <Footer />
      <ScrollTopButton />
      <BottomBlur />
    </div>
  </div>
</template>
