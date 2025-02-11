<script lang="ts" setup>
import Navigation from '@/components/ui/Navigation/Navigation.vue'
import ColorMode from '~/components/ui/ColorMode/ColorMode.vue'
</script>

<template>
  <header role="banner">
    <nav aria-labelledby="mainMenuLabel">
      <h2
        id="mainMenuLabel"
        class="sr-only"
      >
        Main Menu
      </h2>
      <div class="flex items-center">
        <!-- The actual site navigation -->
        <Navigation class="pt-2" />
        <!-- The color mode toggle, on the same row but not part of the nav-list -->
        <ColorMode
          :class="useClsx('absolute right-2 top-4 md:right-4')"
        />
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>
