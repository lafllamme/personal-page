<script lang="ts" setup>
import type { CardProps } from '../Card.model'
import ArticleBadge from '@/components/ui/Badge/ArticleBadge.vue'
import GlowBorder from '@/components/ui/Border/GlowBorder/GlowBorder.vue'
import Link from '@/components/ui/Link/Link.vue'
import { CardPropsDefaults } from '../Card.model'

const props = withDefaults(defineProps<CardProps>(), CardPropsDefaults)
const { id, title, image, description, date, author, href } = props

const colorMode = useColorModeSync()
const isDarkMode = computed(() => colorMode.value.preference === 'dark')

const glowBorderColor = computed(() => {
  return isDarkMode.value
    ? ['#d9d9d9', '#284b63', '#3c6e71']
    : ['#2f4550', '#07beb8', '#7400b8']
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
      'relative aspect-[3/4]',
      'rounded-bl-[42px] rounded-br-[38px] rounded-tl-[36px] rounded-tr-[40px]',
      'opacity-0 shadow-2xl transition-all group bg-transparent',
    )"
  >
    <!-- Image Container with overflow hidden -->
    <div
      :class="useClsx(
        'absolute inset-0 overflow-hidden',
        'rounded-bl-[42px] rounded-br-[38px] rounded-tl-[36px] rounded-tr-[40px]',
      )"
    >
      <!-- Background Cover -->
      <img
        :alt="title"
        :src="image"
        :class="useClsx(
          'absolute inset-0 z-0 h-full w-full object-cover',
          'transition-transform duration-500 ease-out group-hover:scale-110',
        )"
      >
    </div>
    <!-- Gradient-Overlay -->
    <div
      :class="useClsx(
        'dark:from-pureBlack/80 dark:via-pureBlack/30',
        'from-[#E2E1DEcc] via-[#E2E1DE4d]',
        'rounded-bl-[42px] rounded-br-[38px] rounded-tl-[36px] rounded-tr-[40px]',
        'absolute inset-0 z-10 to-transparent bg-gradient-to-t',
      )"
    />
    <!-- GlowBorder for Overlay -->
    <GlowBorder
      :color="glowBorderColor"
      class="pointer-events-none absolute inset-0 z-20"
    />

    <!-- Wave Blur Section -->
    <div
      :class="useClsx(
        'absolute bottom-0 left-0 right-0 z-40 flex flex-col',
        'rounded-bl-[42px] rounded-br-[38px] rounded-tl-[36px] rounded-tr-[40px] backdrop-blur-sm',
      )"
    >
      <!-- The wave SVG sits at the top of this section -->
      <svg
        class="w-full"
        height="46"
        viewBox="0 0 400 46"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0,30 Q100,0 200,30 Q300,60 400,30 L400,46 L0,46Z"
          class="fill-pureWhite/30 dark:fill-pureBlack/40"
        />
      </svg>
      <!-- The actual blurred, dark, semi-transparent layer -->
      <div
        class="relative h-full w-full rounded-bl-[42px] rounded-br-[38px] rounded-tl-0 rounded-tr-0 bg-pureWhite/30 px-6 pb-6 pt-4 dark:bg-pureBlack/40"
      >
        <!-- Card Content INSIDE blur -->
        <h3
          :class="useClsx(
            'font-baskerville mb-2 text-balance text-xl md:text-2xl lg:text-3xl color-pureBlack',
            'tracking-tight drop-shadow dark:color-pureWhite',
          )"
        >
          {{ title }}
        </h3>
        <p
          :class="useClsx(
            'figtree-regular mb-2 text-pretty text-base lg:text-lg color-sand-11',
            'font-light tracking-wide drop-shadow dark:color-gray-11',
          )"
        >
          {{ description }}
        </p>
        <div
          :class="useClsx(
            'mb-2 flex animate-duration-300 text-xs color-gray-12',
            'opacity-0 duration-300 ease-out space-x-4 group-hover:opacity-100',
          )"
        >
          <div class="flex items-center space-x-2">
            <Icon class="size-4" name="ri:calendar-2-line" />
            <p>{{ date }}</p>
          </div>
          <span>·</span>
          <div class="flex items-center space-x-2">
            <Icon class="size-4" name="ri:user-3-line" />
            <p>{{ author }}</p>
          </div>
        </div>
        <div
          :class="useClsx(
            'flex animate-duration-300 items-center opacity-0',
            'duration-300 ease-out space-x-1.5 group-hover:opacity-100',
          )"
        >
          <Link
            :href="href"
            :underline="false"
            class="text-base color-pureBlack font-semibold dark:color-pureWhite"
          >
            Read More
          </Link>
          <Icon
            :class="useClsx(
              'size-5 color-gray-8 transition-all duration-200 group-hover:translate-x-1',
              'group-focus-visible:color-mint-11A group-hover:color-mint-11A',
            )"
            name="ri:arrow-right-line"
          />
        </div>
      </div>
    </div>

    <!-- BADGE stays above -->
    <ArticleBadge
      align="right"
      class="absolute left-0 top-12 z-50 translate-y-full"
      radius-type="half"
      size="large"
      title="Featured"
      variant="primary"
    />
  </div>
</template>
