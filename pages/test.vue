<script lang="ts" setup>
import BentoGrid from '@/components/ui/Grid/BentoGrid.vue'
import BentoGridItem from '@/components/ui/Grid/GridItem/GridItem.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

const items = [
  {
    title: 'The Dawn of Innovation',
    description: 'Explore the birth of groundbreaking ideas and inventions.',
  },
  {
    title: 'The Digital Revolution',
    description: 'Dive into the transformative power of technology.',
  },
  {
    title: 'The Art of Design',
    description: 'Discover the beauty of thoughtful and experience design.',
  },
  {
    title: 'The Power of Communication',
    description: 'Understand the impact of effective communication in our lives.',
  },
  {
    title: 'The Pursuit of Knowledge',
    description: 'Join the quest for understanding and enlightenment.',
  },
  {
    title: 'The Joy of Creation',
    description: 'Experience the thrill of bringing ideas to life.',
  },
  {
    title: 'The Spirit of Adventure',
    description: 'Embark on exciting journeys and thrilling discoveries.',
  },
  {
    title: 'The Dawn of Innovation',
    description: 'Explore the birth of groundbreaking ideas and inventions.',
  },
  {
    title: 'The Digital Revolution',
    description: 'Dive into the transformative power of technology.',
  },
  {
    title: 'The Art of Design',
    description: 'Discover the beauty of thoughtful and experience design.',
  },
  {
    title: 'The Power of Communication',
    description: 'Understand the impact of effective communication in our lives.',
  },
  {
    title: 'The Pursuit of Knowledge',
    description: 'Join the quest for understanding and enlightenment.',
  },
  {
    title: 'The Joy of Creation',
    description: 'Experience the thrill of bringing ideas to life.',
  },
  {
    title: 'The Spirit of Adventure',
    description: 'Embark on exciting journeys and thrilling discoveries.',
  },
  {
    title: 'The Dawn of Innovation',
    description: 'Explore the birth of groundbreaking ideas and inventions.',
  },
  {
    title: 'The Digital Revolution',
    description: 'Dive into the transformative power of technology.',
  },
  {
    title: 'The Art of Design',
    description: 'Discover the beauty of thoughtful and experience design.',
  },
  {
    title: 'The Power of Communication',
    description: 'Understand the impact of effective communication in our lives.',
  },
  {
    title: 'The Pursuit of Knowledge',
    description: 'Join the quest for understanding and enlightenment.',
  },
  {
    title: 'The Joy of Creation',
    description: 'Experience the thrill of bringing ideas to life.',
  },
  {
    title: 'The Spirit of Adventure',
    description: 'Embark on exciting journeys and thrilling discoveries.',
  },
  {
    title: 'The Dawn of Innovation',
    description: 'Explore the birth of groundbreaking ideas and inventions.',
  },
  {
    title: 'The Digital Revolution',
    description: 'Dive into the transformative power of technology.',
  },
  {
    title: 'The Art of Design',
    description: 'Discover the beauty of thoughtful and experience design.',
  },
  {
    title: 'The Power of Communication',
    description: 'Understand the impact of effective communication in our lives.',
  },
  {
    title: 'The Pursuit of Knowledge',
    description: 'Join the quest for understanding and enlightenment.',
  },
  {
    title: 'The Joy of Creation',
    description: 'Experience the thrill of bringing ideas to life.',
  },
  {
    title: 'The Spirit of Adventure',
    description: 'Embark on exciting journeys and thrilling discoveries.',
  },
]

const mosaicPattern = [
  // index 0 => wide card on md and above
  'col-span-1 row-span-1 md:col-span-2 md:row-span-1',

  // index 1 => normal
  'col-span-1 row-span-1',

  // index 2 => normal
  'col-span-1 row-span-1',

  // index 3 => wide again
  'col-span-1 row-span-1 md:col-span-2 md:row-span-1',

  // ... keep going to define as many steps as you want
  // then repeat
]

function getMosaicClass(index: number) {
  // cycle through the pattern
  return mosaicPattern[index % mosaicPattern.length]
}
</script>

<template>
  <!-- All page content is wrapped in a single root element -->
  <div>
    <!-- Sample page content for testing neon styles -->
    <BentoGrid class="mx-auto max-w-7xl">
      <BentoGridItem
        v-for="(item, index) in items"
        :key="index"
        :class="getMosaicClass(index)"
      >
        <template #header>
          <div class="size-full flex animate-pulse space-x-4">
            <div class="size-full flex flex-1 rounded-md bg-slate-7" />
          </div>
        </template>

        <template #title>
          <strong>{{ item.title }}</strong>
        </template>

        <template #icon />

        <template #description>
          <p>{{ item.description }}</p>
        </template>
      </BentoGridItem>
    </BentoGrid>
  </div>
</template>
