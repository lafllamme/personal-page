<script lang="ts" setup>
import Navigation from '@/components/ui/Navigation/Navigation.vue'
import NavigationMobile from '~/components/ui/Navigation/Mobile/NavigationMobile.vue'
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
      <div>
        <!-- The actual site navigation -->
        <div class="flex items-center justify-center pt-3 <md:hidden">
          <Navigation />
        </div>
        <div class="md:hidden">
          <NavigationMobile />
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>
