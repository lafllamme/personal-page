<script setup lang="ts">
import SpiralLayout from '@/components/ui/Card/Spiral/SpiralLayout.vue'

const posts = [
  { id: 1, title: 'The Monochrome Revolution', date: 'October 26, 2024', category: 'Design', imageUrl: '/placeholder.svg' },
  { id: 2, title: 'Sleek Minimalism in Web Development', date: 'October 20, 2024', category: 'Tech', imageUrl: '/placeholder.svg' },
  { id: 3, title: 'Depth and Creativity through Animation', date: 'October 15, 2024', category: 'Animation', imageUrl: '/placeholder.svg' },
  { id: 4, title: 'The Art of Subtle Interaction', date: 'October 10, 2024', category: 'UX/UI', imageUrl: '/placeholder.svg' },
  { id: 5, title: 'Cinematic Scrolling Experiences', date: 'October 5, 2024', category: 'Design', imageUrl: '/placeholder.svg' },
  { id: 6, title: 'Eight Ways to Engage Your Reader', date: 'September 30, 2024', category: 'Content', imageUrl: '/placeholder.svg' },
  { id: 7, title: 'Fixed Elements and Fluid Motion', date: 'September 25, 2024', category: 'Tech', imageUrl: '/placeholder.svg' },
  { id: 8, title: 'Beyond the Scrollbar: New Navigation', date: 'September 20, 2024', category: 'UX/UI', imageUrl: '/placeholder.svg' },
]

definePageMeta({
  layout: 'no-footer',
})
</script>

<template>
  <div class="fixed inset-0 h-screen w-full overflow-hidden">
    <SpiralLayout
      :posts="posts"
    />
  </div>
</template>
