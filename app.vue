<script lang="ts" setup>
import type { HeadMeta } from 'types'
import Cursor from '@/components/ui/Cursor/Cursor.vue'
import { useLenis, VueLenis } from 'lenis/vue'

const appConfig = useAppConfig()
const loadingGradient = ref('linear-gradient(90deg, #059669, #064e3b, #6d28d9)')
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
useLenis((_lenis) => {
  // called every scroll
})
</script>

<template>
  <VueLenis
    root
  />
  <NuxtLayout>
    <NuxtLoadingIndicator
      :color="loadingGradient"
      :throttle="0"
    />
    <Cursor />
    <NuxtPage />
  </NuxtLayout>
</template>
