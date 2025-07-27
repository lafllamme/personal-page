<script lang="ts" setup>
import AppleCard from '@/components/ui/Card/AppleCard/AppleCard.vue'
import AppleCardCarousel from '@/components/ui/Card/AppleCard/AppleCardCarousel.vue'
import AppleCarouselItem from '@/components/ui/Card/AppleCard/AppleCarouselItem.vue'

const data = [
  {
    category: 'Artificial Intelligence',
    title: 'You can do more with AI.',
    src: 'https://i.imgur.com/9EOfmtX.jpeg',
  },
  {
    category: 'Productivity',
    title: 'Enhance your productivity.',
    src: 'https://i.imgur.com/OdC4wBG.jpeg',
    // content: <DummyContent />,
  },
  {
    category: 'Product',
    title: 'Launching the new Apple Vision Pro.',
    src: 'https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    // content: <DummyContent />,
  },

  {
    category: 'Product',
    title: 'Maps for your iPhone 15 Pro Max.',
    src: 'https://i.imgur.com/B1BZH7P.jpeg',
  },
  {
    category: 'iOS',
    title: 'Photography just got better.',
    src: 'https://i.imgur.com/OxgUcYO.jpeg',
  },
  {
    category: 'Hiring',
    title: 'Hiring for a Staff Software Engineer',
    src: 'https://i.imgur.com/UnI4RkM.jpeg',
  },
]
</script>

<template>
  <AppleCardCarousel>
    <AppleCarouselItem
      v-for="(card, index) in data"
      :key="index"
      :index="index"
    >
      <AppleCard
        :card="card"
        :index="index"
        :layout="true"
      >
        <div
          :key="`dummy-content${index}`"
          class="dark:bg-neutral-800 mb-4 rounded-3xl bg-[#F5F5F7] p-8 md:p-14"
        >
          <p
            class="text-neutral-600 dark:text-neutral-400 mx-auto max-w-3xl text-base font-sans md:text-2xl"
          >
            <span class="text-neutral-700 dark:text-neutral-200 font-bold">
              The first rule of Apple club is that you boast about Apple club.
            </span>
            Keep a journal, quickly jot down a grocery list, and take amazing class notes. Want to
            convert those notes to text? No problem. Langotiya jeetu ka mara hua yaar is ready to
            capture every thought.
          </p>
          <img
            src="https://assets.aceternity.com/macbook.png"
            alt="Macbook mockup from Aceternity UI"
            height="500"
            width="500"
            class="mx-auto size-full object-contain md:size-1/2"
          >
        </div>
      </AppleCard>
    </AppleCarouselItem>
  </AppleCardCarousel>
</template>
