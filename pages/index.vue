<script setup lang="ts">
function handleEnter() {
  navigateTo('/about')
}
</script>

<template>
  <div class="flex justify-center pt-40">
    <button @click="handleEnter" @keydown.enter="handleEnter" class="flex justify-center space-x-2 items-center uppercase focus:ring-4 focus-visible:outline-none focus:ring-black-12A focus:ring-offset-2 bg-orange-7 rounded-lg text-white px-4 py-2 font-thin text-2xl font-mono antialiased">
      <NuxtLink to="/about">My Projects</NuxtLink>
      <Icon name="uil:github" class="color-black" />
    </button>
  </div>
  <div class="bg-black-12A text-white-12A p-10 mt-10 text-white text-2xl antialiased">
    Hello!
  </div>
  <button class="bg-black">
    Nothing work (as expected)
  </button>
</template>

<style scoped>

</style>