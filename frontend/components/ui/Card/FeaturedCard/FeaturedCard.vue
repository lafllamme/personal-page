<script lang="ts" setup>
import type { CardProps } from '../Card.model'
import ArticleBadge from '@/components/ui/Badge/ArticleBadge.vue'
import GlowBorder from '@/components/ui/Border/GlowBorder/GlowBorder.vue'
import CardSpotlight from '@/components/ui/Card/CardSpotlight/CardSpotlight.vue'
import Link from '@/components/ui/Link/Link.vue'
import { CardPropsDefaults } from '../Card.model'

const props = withDefaults(defineProps<CardProps>(), CardPropsDefaults)
const { id, title, image, description, date, author, href } = props

// Using synchronized color mode for hydration safety
const colorMode = useColorModeSync()
const isDarkMode = computed(() => colorMode.value === 'dark')

const glowBorderColor = computed(() => {
  return isDarkMode.value
    ? ['#c0fdfb, #07beb8, #7400b8']
    : ['#2f4550, #07beb8, #7400b8']
})

const isVisible = ref(false)
const featuredRef = useTemplateRef('featuredRef')
useVisibilityObserver(featuredRef, isVisible)
</script>

<template>
  <div
    ref="featuredRef"
    :class="isVisible && 'ethereal-cascade'"
    class="opacity-0"
  >
    <GlowBorder
      :color="glowBorderColor"
      class="p-0.5"
    >
      <CardSpotlight
        :id="id"
        :class="useClsx(
          ' dark:bg-pureBlack !p-0',
          'group relative h-full overflow-hidden',
          'transition-colors transition-shadow duration-300 ease-in-out',
          ' bg-pureWhite shadow-2xl  shadow-gray-6A',
        )"
      >
        <div class="relative aspect-video w-full overflow-hidden md:aspect-[3/1]">
          <img
            :alt="title"
            :src="image"
            class="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0.8,0.6,1)] group-hover:scale-110"
          >
          <ArticleBadge
            align="right"
            class="absolute top-1/3 -left-2"
            radius-type="half"
            size="large"
            title="Featured"
            variant="primary"
          />
        </div>
        <div class="p-6">
          <h3 class="geist-regular mb-2 text-2xl color-pureBlack font-semibold dark:color-pureWhite">
            {{ title }}
          </h3>
          <p class="mb-2 text-pretty color-gray-10 font-light">
            {{ description }}
          </p>
          <div class="mb-2 flex text-sm text-gray-11 space-x-4">
            <div class="flex items-center space-x-2">
              <Icon class="mt-px size-4 color-gray-10 group-hover:color-mint-12" name="ri:calendar-2-line" />
              <p>{{ date }}</p>
            </div>
            <span>·</span>
            <div class="flex items-center space-x-2">
              <Icon class="size-4 color-gray-10 group-hover:color-mint-12" name="ri:user-3-line" />
              <p>{{ author }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-1.5">
            <Link
              :href="href"
              :underline="false"
              class="text-base color-gray-12 font-semibold"
            >
              Read More
            </Link>
            <Icon
              class="size-5 color-gray-8 transition-all duration-200 group-hover:translate-x-1 group-focus-visible:color-mint-11A group-hover:color-mint-11A"
              name="ri:arrow-right-line"
            />
          </div>
        </div>
      </CardSpotlight>
    </GlowBorder>
  </div>
</template>

<style scoped>

</style>
