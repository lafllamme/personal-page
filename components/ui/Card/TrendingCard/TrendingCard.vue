<script lang="ts" setup>
import type { CardProps } from '../Card.model'
import ArticleBadge from '@/components/ui/Badge/ArticleBadge.vue'
import CardSpotlight from '@/components/ui/Card/CardSpotlight/CardSpotlight.vue'
import Link from '@/components/ui/Link/Link.vue'
import { useVisibilityObserver } from '@/composables/useVisibilityObserver'
import { CardPropsDefaults } from '../Card.model'

const props = withDefaults(defineProps<CardProps>(), CardPropsDefaults)

const { id, title, date, author, href, image: _image } = toRefs(props)
const isVisible = ref(false)
const trendingRef = useTemplateRef('trendingRef')
useVisibilityObserver(trendingRef, isVisible)
</script>

<template>
  <CardSpotlight
    :id="id"
    ref="trendingRef"
    :class="useClsx(
      isVisible ? 'ethereal-cascade' : 'opacity-0',
      'transition-colors duration-300 ease-in-out hover:border-mint-11 dark:bg-pureBlack ',
      'overflow-hidden border border-gray-6 border-solid bg-pureWhite p-4 shadow-lg',
      'color-pureBlack dark:color-pureWhite',
      'group relative flex flex-col justify-between',
    )"
    variant="small"
  >
    <ArticleBadge
      title="Essential"
      variant="secondary"
    />
    <h4 class="mb-1 text-base font-semibold">
      {{ title }}
    </h4>
    <div class="mt-2 text-xs text-gray-10 group-hover:hidden">
      {{ date }} · {{ author }}
    </div>
    <div class="hidden items-center slide-in-left group-hover:flex space-x-1.5">
      <Link
        :href="href"
        :underline="false"
        class="text-sm color-gray-12 font-semibold group-hover:color-mint-11A"
      >
        Read Article
      </Link>
      <Icon
        class="size-4 color-gray-8 transition-all duration-200 group-hover:translate-x-1 group-focus-visible:color-gray-11A group-hover:color-gray-11A"
        name="ri:arrow-right-line"
      />
    </div>
  </Cardspotlight>
</template>

<style scoped>
/* ----------------------------------------------
 * Generated by Animista on 2025-6-7 14:37:9
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation slide-in-left
 * ----------------------------------------
 */
@keyframes slide-in-left {
  0% {
    transform: translateX(-15px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in-left {
  animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
</style>
