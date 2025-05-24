<script lang="ts" setup>
import type { HeadMeta } from 'types'
import Cursor from '@/components/ui/Cursor/Cursor.vue'

const loadingGradient = ref('linear-gradient(90deg, #059669, #064e3b, #6d28d9)')
const appConfig = useAppConfig()
const { meta } = appConfig as { meta: HeadMeta }

// If we are in development mode, we set consola log level to 5
if (import.meta.dev) {
  consola.level = 5
  consola.info('Development mode enabled')
}
else {
  consola.level = 0
  consola.info('Production mode enabled')
}

// 1) HTML lang and dir attributes for i18n SEO
// 1) Compute htmlAttrs from i18n
const head = useLocaleHead({
  dir: true,
  lang: true,
  seo: { canonicalQueries: ['ref'] },
  key: 'i18n',
})
// 2) Custom viewport meta tag to allow fullscreen on iOS devices
useHead(() => {
  const { htmlAttrs, link, meta: i18nMeta } = head.value
  return {
    htmlAttrs,
    link,
    meta: [
      ...(i18nMeta ?? []),
      {
        name: 'viewport',
        content: meta.viewport,
      },
    ],
  }
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
//TODO: Move this in a separate file
html::-webkit-scrollbar,
body::-webkit-scrollbar {
  display: none; // Hide scrollbars in WebKit browsers
}

html,
body {
  scrollbar-width: none; // Hide scrollbars in Firefox
  scroll-behavior: smooth;
}

html,
body {
  @apply bg-pureWhite;
  &.dark {
    @apply bg-pureBlack;
  }
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
