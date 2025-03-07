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
]
</script>

<template>
  <!-- Sample page content for testing neon styles -->
  <div>
    <BentoGrid class="mx-auto max-w-7xl">
      <BentoGridItem
        v-for="(item, index) in items"
        :key="index"
        :class="index === 3 || index === 6 ? 'md:col-span-2' : ''"
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

    <main id="main-content" class="pt-32 space-y-16">
      <section class="bg-black text-pink-500 min-h-screen flex flex-col items-center justify-center">
        <h1 class="text-5xl font-bold drop-shadow-[0_0_10px_#ff00ff]">
          Welcome to the Neon Zone
        </h1>
        <p class="mt-4 text-xl drop-shadow-[0_0_5px_#ff00ff]">
          This is a sample section with neon pink vibes.
        </p>
      </section>
      <section class="bg-gray-900 text-green-400 min-h-screen flex flex-col items-center justify-center">
        <h2 class="text-4xl font-bold drop-shadow-[0_0_10px_#39ff14]">
          About Us
        </h2>
        <p class="mt-4 text-xl drop-shadow-[0_0_5px_#39ff14]">
          Our company brings innovative solutions with a touch of neon magic.
        </p>
      </section>
      <section class="bg-black text-blue-400 min-h-screen flex flex-col items-center justify-center">
        <h2 class="text-4xl font-bold drop-shadow-[0_0_10px_#00bfff]">
          Services
        </h2>
        <p class="mt-4 text-xl drop-shadow-[0_0_5px_#00bfff]">
          Check out our services that light up the industry.
        </p>
      </section>
      <section class="bg-gray-900 text-yellow-400 min-h-screen flex flex-col items-center justify-center">
        <h2 class="text-4xl font-bold drop-shadow-[0_0_10px_#ffd700]">
          Contact
        </h2>
        <p class="mt-4 text-xl drop-shadow-[0_0_5px_#ffd700]">
          Reach out and let us know how we can illuminate your projects.
        </p>
      </section>
    </main>
  </div>
</template>
