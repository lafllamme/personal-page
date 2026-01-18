<script setup lang="ts">
import logoOsmo from '@/assets/logos/logo-osmo.svg'
</script>

<template>
  <div class="relative h-9 md:h-10 xl:h-12 w-auto aspect-video">
    <NuxtImg
      :src="logoOsmo"
      alt="OSMO"
      class="h-full w-full"
      loading="eager"
    />
  </div>
</template>
