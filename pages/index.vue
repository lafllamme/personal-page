<script lang="ts" setup>
import { navigateTo } from '#imports'

function handleEnter() {
  navigateTo('/about')
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div>
      <button
        :class="useClsx(
          'flex items-center justify-center',
          'border-pureBlack dark:border-pureWhite border-2',
          'rounded-lg bg-pureWhite dark:bg-pureBlack px-4 py-2 text-2xl',
          'text-mint-12',
          'font-thin font-mono uppercase antialiased space-x-2',
          'shadow-[6px_8px_100px_6px] shadow-mint-7',
          'focus-visible:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-black-12A',
          'transition-color duration-900 ease-in-out',
        )"
        @click="handleEnter"
        @keydown.enter="handleEnter"
      >
        <NuxtLink aria-label="My Projects" tabindex="-1" to="/about">
          My Projects
        </NuxtLink>
        <Icon class="color-black" name="uil:github" />
      </button>
    </div>
  </div>
</template>
