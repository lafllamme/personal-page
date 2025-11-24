<script lang="ts" setup>
import { useMenu } from '~/stores/menu'

const menuStore = useMenu()
const { isOpen } = storeToRefs(menuStore)
const { toggleMenu } = menuStore
</script>

<template>
  <div
    :class="useClsx(
      'hidden sm:block fixed inset-0 z-40 bg-pureBlack/40 dark:bg-olive-6A backdrop-blur-sm grayscale-40',
      isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
      'transition-opacity duration-300 ease-in-out',
    )"
    @click="toggleMenu('close')"
  >
    <!-- Default slot -->
    <slot name="default" />
  </div>
</template>

<style scoped>

</style>
