<script setup lang="ts">
import RibbonDebug from '~/components/ui/RibbonDebug/RibbonDebug.vue'

useHead({
  title: 'Ribbon Debug',
})
</script>

<template>
  <div class="bg-pureWhite dark:bg-pureBlack">
    <RibbonDebug full />
  </div>
</template>
