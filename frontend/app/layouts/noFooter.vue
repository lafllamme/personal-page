<script setup>
import ScrollTopButton from '~/components/ui/Buttons/ScrollTopButton/ScrollTopButton.vue'
import Header from '~/components/ui/Header/Header.vue'
</script>

<template>
  <div class="relative">
    <!-- Main Content -->
    <div
      :class="useClsx(
        'relative z-10 page-transition-root',
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
      <ScrollTopButton />
    </div>
  </div>
</template>
