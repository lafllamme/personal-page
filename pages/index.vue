<script lang="ts" setup>
import { navigateTo } from '#imports'

function handleEnter() {
  navigateTo('/about')
}
</script>

<template>
  <div class="flex justify-center pt-40">
    <button
      :class="useClsx(
        'flex items-center justify-center',
        'rounded-lg bg-orange-7 px-4 py-2 text-2xl',
        'text-white font-thin font-mono uppercase antialiased space-x-2',
        'focus-visible:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-black-12A',
      )"
      @click="handleEnter"
      @keydown.enter="handleEnter"
    >
      <NuxtLink to="/about">
        My Projects
      </NuxtLink>
      <Icon class="color-black" name="uil:github" />
    </button>
  </div>
  <div
    :class="useClsx('text-white text-2xl text-white-12A antialiased mt-10 bg-black-12A p-10')"
  >
    Hello!
  </div>
  <button class="bg-black">
    Nothing work (as expected)
  </button>
</template>

<style scoped>

</style>
