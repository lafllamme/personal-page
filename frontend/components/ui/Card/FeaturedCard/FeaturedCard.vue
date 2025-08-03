<script lang="ts" setup>
import type { CardProps } from '../Card.model'
import ArticleBadge from '@/components/ui/Badge/ArticleBadge.vue'
import GlowBorder from '@/components/ui/Border/GlowBorder/GlowBorder.vue'
import Link from '@/components/ui/Link/Link.vue'
import { CardPropsDefaults } from '../Card.model'

const props = withDefaults(defineProps<CardProps>(), CardPropsDefaults)
const { id, title, image, description, date, author, href } = props

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
    :id="id"
    ref="featuredRef"
    :class="useClsx(
      isVisible && 'ethereal-cascade',
      'relative max-w-lg overflow-hidden rounded-bl-[42px] rounded-br-[38px] rounded-tl-[36px] rounded-tr-[40px]',
      'opacity-0 shadow-2xl transition-all group bg-transparent',
    )"
  >
    <GlowBorder
      :color="glowBorderColor"
      class="aspect-[3/4] h-full bg-red-9"
    >
      <!-- Background image absolut -->
      <img
        :alt="title"
        :src="image"
        :class="useClsx(
          'absolute inset-0 z-0 h-full w-full',
          'object-cover transition-transform duration-500 group-hover:scale-110',
        )"
      >
      <!-- Gradient-Overlay -->
      <div
        :class="useClsx(
          'absolute inset-0 z-10 dark:focus-visible:ring-pureWhite',
          'dark:from-pureBlack/70 dark:via-pureBlack/30',
          'from-pureWhite/70 via-pureWhite/30',
          'to-transparent bg-gradient-to-t',
        )"
      />
      <!-- Overlay-Content -->
      <div
        :class="useClsx('relative z-20 h-full flex flex-col justify-end p-6')"
      >
        <ArticleBadge
          align="right"
          class="absolute -left-2 -top-1/4 -translate-y-full !color-pureBlack dark:!color-pureWhite"
          radius-type="half"
          size="large"
          title="Featured"
          variant="primary"
        />
        <h3
          :class="useClsx(
            'mb-2 text-2xl color-pureBlack',
            'font-baskerville text-balance drop-shadow dark:color-pureWhite',
          )"
        >
          {{ title }}
        </h3>
        <p
          :class="useClsx(
            'mb-2 text-pretty dark:color-gray-11 color-olive-12',
            'font-light drop-shadow',
          )"
        >
          {{ description }}
        </p>
        <div class="mb-2 flex animate-duration-300 text-xs color-gray-12 opacity-0 duration-300 ease-out space-x-4 group-hover:opacity-100">
          <div class="flex items-center space-x-2">
            <Icon
              class="size-4"
              name="ri:calendar-2-line"
            />
            <p>{{ date }}</p>
          </div>
          <span>·</span>
          <div class="flex items-center space-x-2">
            <Icon
              class="size-4"
              name="ri:user-3-line"
            />
            <p>{{ author }}</p>
          </div>
        </div>
        <div class="flex animate-duration-300 items-center opacity-0 duration-300 ease-out space-x-1.5 group-hover:opacity-100">
          <Link
            :href="href"
            :underline="false"
            class="text-base color-pureBlack font-semibold dark:color-pureWhite"
          >
            Read More
          </Link>
          <Icon
            :class="useClsx(
              'size-5 color-gray-8 transition-all',
              'duration-200 group-focus-visible:color-mint-11A',
              'group-hover:translate-x-1 group-hover:color-mint-11A',
            )"
            name="ri:arrow-right-line"
          />
        </div>
      </div>
    </GlowBorder>
  </div>
</template>
