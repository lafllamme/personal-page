<script lang="ts" setup>
import type { CardProps } from '../Card.model'
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
      'group relative min-h-[120px] flex flex-col justify-between',
    )"
    variant="small"
  >
    <div class="pb-1">
      <div class="mb-1 text-xs text-gray-11 font-bold">
        Trending Topic
      </div>
      <h4 class="mb-1 text-base font-semibold">
        {{ title }}
      </h4>
      <div class="text-xs text-gray-10">
        {{ date }} · {{ author }}
      </div>
    </div>
    <div class="flex items-center space-x-1.5">
      <Link
        :href="href"
        :underline="false"
        class="text-sm color-gray-12 font-semibold"
      >
        Read More
      </Link>
      <Icon
        class="size-4 color-gray-8 transition-all duration-200 group-hover:translate-x-1 group-focus-visible:color-mint-11A group-hover:color-mint-11A"
        name="ri:arrow-right-line"
      />
    </div>
  </Cardspotlight>
</template>

<style scoped>

</style>
