<script setup lang="ts">
import logoMark from '@/assets/logos/logo-mark.svg'
</script>

<template>
  <div class="relative size-6 md:size-7">
    <NuxtImg
      :src="logoMark"
      alt="OSMO"
      class="h-full w-full"
      loading="eager"
    />
  </div>
</template>
