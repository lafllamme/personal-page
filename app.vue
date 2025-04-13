<script lang="ts" setup>
import type { HeadMeta } from 'types'
import Cursor from '@/components/ui/Cursor/Cursor.vue'

const loadingGradient = ref('repeating-linear-gradient(to right, #8a2387, #e94057, #f27121)')

// If we are in development mode, we set consola log level to 5
if (import.meta.dev) {
  consola.level = 5
  consola.info('Development mode enabled')
}
else {
  consola.level = 0
  consola.info('Production mode enabled')
}

const appConfig = useAppConfig()

const { meta } = appConfig as { meta: HeadMeta }
consola.debug('appConfig', appConfig)
consola.debug('appConfig meta', appConfig.meta)
useHead({
  meta: [
    { name: 'viewport', content: meta.viewport },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator
      :color="loadingGradient"
      :throttle="0"
    />
    <Cursor />
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
html::-webkit-scrollbar,
body::-webkit-scrollbar {
  display: none; // Hide scrollbars in WebKit browsers
}

html {
  scrollbar-width: none; // Hide scrollbars in Firefox
  scroll-behavior: smooth;
}

// page transitions
/* Enhanced soft fade transition without scaling to avoid jumpiness */
.page-enter-active,
.page-leave-active {
  @apply duration-300 ease-in-out !important;
  transition-property: opacity, filter !important;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(2px); /* Start with a light blur */
}

.page-enter-to {
  opacity: 1;
  transition-delay: 0.1s; /* Delay the clearing of the blur for a smooth transition */
  filter: blur(0);
}

.page-leave-active {
  opacity: 0;
  filter: blur(4px); /* Slightly more blur on leave for a soft exit */
}
</style>
