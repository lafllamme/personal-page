<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import OrbitCard from '@/components/ui/Card/OrbitCard/OrbitCard.vue'

const posts = [
  {
    id: 1,
    title: 'Neural Architecture Search',
    date: '2025.01.15',
    category: 'Research',
    description:
        'Exploring automated design of deep learning models through evolutionary algorithms and reinforcement learning techniques.',
  },
  {
    id: 2,
    title: 'Quantum Computing Breakthrough',
    date: '2025.01.12',
    category: 'Technology',
    description:
        'Recent advances in quantum error correction bring us closer to practical quantum computers.',
  },
  {
    id: 3,
    title: 'Synthetic Biology Revolution',
    date: '2025.01.08',
    category: 'Science',
    description:
        'Engineering biological systems at the molecular level to create new organisms and materials.',
  },
  {
    id: 4,
    title: 'Edge Intelligence Systems',
    date: '2025.01.05',
    category: 'AI',
    description:
        'Deploying machine learning models at the edge for real-time processing and privacy preservation.',
  },
  {
    id: 5,
    title: 'Distributed Computing',
    date: '2025.01.02',
    category: 'Engineering',
    description:
        'Building resilient systems that scale across thousands of nodes with eventual consistency.',
  },
]

const hoveredId = ref<number | null>(null)
const displayedHoverId = ref<number | null>(null)
const throttleTimerRef = ref<ReturnType<typeof setTimeout> | null>(null)

watch(
  hoveredId,
  (val) => {
    if (throttleTimerRef.value)
      clearTimeout(throttleTimerRef.value)
    throttleTimerRef.value = setTimeout(() => {
      displayedHoverId.value = val
    }, 300)
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (throttleTimerRef.value)
    clearTimeout(throttleTimerRef.value)
})

const hoveredPost = computed(() => posts.find(p => p.id === displayedHoverId.value) || null)
</script>

<template>
  <Motion
    class="min-h-screen p-8 lg:p-24 md:p-16"
    :transition="{ duration: 1, ease: [0.22, 1, 0.36, 1] }"
  >
    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8 }"
      class="relative mb-20 h-32"
    >
      <!-- Default heading -->
      <Motion
        class="absolute left-0 top-0"
        :animate="{
          opacity: displayedHoverId ? 0 : 1,
          y: displayedHoverId ? -30 : 0,
          filter: displayedHoverId ? 'blur(8px)' : 'blur(0px)',
        }"
        :transition="{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }"
      >
        <h1 class="mb-4 text-balance text-6xl font-extralight tracking-tight md:text-8xl">
          Orbital Grid
        </h1>
        <p class="max-w-2xl text-pretty text-lg text-foreground/70 font-light">
          Drag, throw, and watch cards float autonomously in elegant orbital motion
        </p>
      </Motion>

      <!-- Hover heading -->
      <Motion
        class="absolute left-0 top-0"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{
          opacity: displayedHoverId ? 1 : 0,
          y: displayedHoverId ? 0 : 30,
          filter: displayedHoverId ? 'blur(0px)' : 'blur(8px)',
        }"
        :transition="{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: displayedHoverId ? 0.2 : 0,
        }"
      >
        <div v-if="hoveredPost" class="flex items-baseline gap-8">
          <span class="text-7xl text-foreground/20 font-extralight leading-none tracking-tight md:text-9xl">
            {{ String(hoveredPost.id).padStart(2, '0') }}
          </span>
          <h2 class="text-balance text-5xl text-foreground font-extralight leading-[1.1] tracking-tight md:text-7xl">
            {{ hoveredPost.title }}
          </h2>
        </div>
      </Motion>
    </Motion>

    <div class="relative h-[600px] sm:h-[700px] md:h-[800px] lg:h-[900px] xl:h-[900px]">
      <OrbitCard
        v-for="(post, index) in posts"
        :key="post.id"
        :post="post"
        :index="index"
        :hovered-id="hoveredId"
        @update:hovered-id="(v) => (hoveredId = v)"
      />
    </div>
  </Motion>
</template>
