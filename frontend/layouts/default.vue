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
      :class="useClsx(
        'relative z-10',
        'transition-colors duration-600 ease-[cubic-bezier(0.33,1,0.68,1)]',
        'bg-pureWhite  dark:bg-pureBlack',
      )"
    >
      <Header />
      <main
        :class="useClsx(
          'pt-[calc(4rem-1px+1rem)] md:pt-[calc(4rem+5px+1.5rem)]',
        )"
      >
        <slot name="default" />
      </main>
      <Footer />
      <ScrollTopButton />
      <BottomBlur />
    </div>
  </div>
</template>
