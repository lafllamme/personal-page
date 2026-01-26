<script lang="ts" setup>
import type { HeadMeta } from '~/types'
import Cursor from '@/components/ui/Cursor/Cursor.vue'
import PageTransition from '@/components/ui/PageTransition/PageTransition.vue'

const loadingGradient = ref('linear-gradient(90deg, #059669, #064e3b, #6d28d9)')
const appConfig = useAppConfig()
const { meta } = appConfig as { meta: HeadMeta }
const lenisOptions = {
  autoRaf: true,
}
const { isTransitionActive } = useTransition()

// If we are in development mode, we set the consola log level to 5
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
})
// 2) Custom viewport meta-tag to allow fullscreen on iOS devices
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
  <VueLenis
    root
    :options="lenisOptions"
  >
    <NuxtLayout>
      <NuxtLoadingIndicator
        v-if="!isTransitionActive"
        :color="loadingGradient"
      />
      <PageTransition />
      <Cursor />
      <NuxtPage />
    </NuxtLayout>
  </VueLenis>
</template>

<style>
html,
body {
  overflow-x: clip;
}
</style>
