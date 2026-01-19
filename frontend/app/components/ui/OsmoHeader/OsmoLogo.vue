<script setup lang="ts">
import logoOsmo from '@/assets/logos/logo-osmo.svg'
</script>

<template>
  <div class="relative aspect-video h-9 w-auto md:h-10 xl:h-12">
    <NuxtImg
      :src="logoOsmo"
      alt="OSMO"
      class="h-full w-full"
      loading="eager"
    />
  </div>
</template>
