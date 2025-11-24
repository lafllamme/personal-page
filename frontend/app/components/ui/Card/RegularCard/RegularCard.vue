<script lang="ts" setup>
import type { CardProps } from '../Card.model'
import InteractiveCard from '~/components/ui/Border/InteractiveCard/InteractiveCard.vue'
import CardSpotlight from '~/components/ui/Card/CardSpotlight/CardSpotlight.vue'
import Link from '~/components/ui/Link/Link.vue'
import { CardPropsDefaults } from '../Card.model'

const props = withDefaults(defineProps<CardProps>(), CardPropsDefaults)
const { id, title, description, date, author, image, href } = toRefs(props)

const regularRef = useTemplateRef('regularRef')
const isVisible = ref(false)
useVisibilityObserver(regularRef, isVisible)
</script>

<template>
  <div
    ref="regularRef"
    :class="isVisible && 'ethereal-cascade'"
    class="rounded-bl-[42px] rounded-br-[38px] rounded-tl-[36px] rounded-tr-[40px] opacity-0"
  >
    <InteractiveCard>
      <CardSpotlight
        :id="id"
        :class="useClsx(
          'transition-colors transition-shadow duration-300 ease-in-out',
          'bg-pureWhite dark:bg-pureBlack',
          'group relative',
        )"
      >
        <!-- Image Wrapper -->
        <div class="aspect-video overflow-hidden">
          <img
            :alt="title"
            :src="image"
            class="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0.8,0.6,1)] group-hover:scale-110"
          >
        </div>
        <!-- Card Content -->
        <div class="p-6">
          <h3 class="geist-regular mb-2 text-xl color-pureBlack font-medium dark:color-pureWhite !font-semibold">
            {{ title }}
          </h3>
          <p class="mb-2 text-pretty color-gray-10 font-light">
            {{ description }}
          </p>
          <div class="mb-3 flex text-sm text-gray-11 font-200 space-x-4">
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
    </InteractiveCard>
  </div>
</template>

<style scoped>

</style>
