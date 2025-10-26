<script setup lang="ts">
import { Motion } from 'motion-v'
import { ref, watch } from 'vue'
import OrbitCard from './OrbitCard.vue'

interface Post {
  id: number
  title: string
  date: string
  category: string
  description: string
}

const posts: Post[] = [
  {
    id: 1,
    title: 'Neural Architecture Search',
    date: '2025.01.15',
    category: 'Research',
    description: 'Exploring automated design of deep learning models through evolutionary algorithms and reinforcement learning techniques.',
  },
  {
    id: 2,
    title: 'Quantum Computing Breakthrough',
    date: '2025.01.12',
    category: 'Technology',
    description: 'Recent advances in quantum error correction bring us closer to practical quantum computers.',
  },
  {
    id: 3,
    title: 'Synthetic Biology Revolution',
    date: '2025.01.08',
    category: 'Science',
    description: 'Engineering biological systems at the molecular level to create new organisms and materials.',
  },
  {
    id: 4,
    title: 'Edge Intelligence Systems',
    date: '2025.01.05',
    category: 'AI',
    description: 'Deploying machine learning models at the edge for real-time processing and privacy preservation.',
  },
  {
    id: 5,
    title: 'Distributed Computing',
    date: '2025.01.02',
    category: 'Engineering',
    description: 'Building resilient systems that scale across thousands of nodes with eventual consistency.',
  },
]

const hoveredId = ref<number | null>(null)
const displayedHoverId = ref<number | null>(null)
let throttleTimer: ReturnType<typeof setTimeout> | null = null

watch(hoveredId, () => {
  if (throttleTimer)
    clearTimeout(throttleTimer)
  throttleTimer = setTimeout(() => {
    displayedHoverId.value = hoveredId.value
  }, 300)
})

function setHoveredId(id: number | null) {
  hoveredId.value = id
}
</script>

<template>
  <Motion
    class="min-h-screen bg-background p-4 sm:p-8 md:p-16 lg:p-24"
    :animate="{ backgroundColor: displayedHoverId ? 'hsl(var(--muted) / 0.25)' : 'hsl(var(--background))' }"
    :transition="{ duration: 1, ease: [0.22, 1, 0.36, 1] }"
  >
    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8 }"
      class="relative mb-8 sm:mb-12 md:mb-20 h-20 sm:h-24 md:h-32"
    >
      <Motion
        class="absolute left-0 top-0"
        :animate="{
          opacity: displayedHoverId ? 0 : 1,
          y: displayedHoverId ? -30 : 0,
          filter: displayedHoverId ? 'blur(8px)' : 'blur(0px)',
        }"
        :transition="{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }"
      >
        <h1 class="mb-2 sm:mb-4 text-balance text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extralight tracking-tight">
          Orbital Grid
        </h1>
        <p class="max-w-2xl text-pretty text-sm sm:text-base md:text-lg text-foreground/70 font-light">
          Drag, throw, and watch cards float autonomously in elegant orbital motion
        </p>
      </Motion>

      <Motion
        v-if="displayedHoverId"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{
          opacity: displayedHoverId ? 1 : 0,
          y: displayedHoverId ? 0 : 30,
          filter: displayedHoverId ? 'blur(0px)' : 'blur(8px)',
        }"
        :transition="{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: displayedHoverId ? 0.2 : 0 }"
        class="absolute left-0 top-0"
      >
        <div class="flex items-baseline gap-2 sm:gap-4 md:gap-8">
          <span class="text-4xl sm:text-5xl md:text-7xl lg:text-9xl text-foreground/20 font-extralight leading-none tracking-tight">
            {{ String(displayedHoverId).padStart(2, "0") }}
          </span>
          <h2 class="text-balance text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-foreground font-extralight leading-[1.1] tracking-tight">
            {{ posts.find((p) => p.id === displayedHoverId)?.title }}
          </h2>
        </div>
      </Motion>
    </Motion>

    <div class="relative h-[600px] sm:h-[700px] md:h-[800px] lg:h-[900px]">
      <OrbitCard
        v-for="(post, index) in posts"
        :key="post.id"
        :post="post"
        :index="index"
        :hovered-id="hoveredId"
        :set-hovered-id="setHoveredId"
      />
    </div>
  </Motion>
</template>
