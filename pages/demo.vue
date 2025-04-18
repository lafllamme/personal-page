<script lang="ts" setup>
import Marquee from '@/components/ui/Marquee/Marquee.vue'
import ReviewCard from '@/components/ui/ReviewCard/ReviewCard.vue'

// Reviews data
const reviews = [
  {
    name: 'Liam',
    username: '@liam_smith',
    body: 'This is hands down the best I’ve used—it’s amazing! Made me smile. 😄',
    img: 'https://avatar.vercel.sh/liam',
  },
  {
    name: 'Emma',
    username: '@hey_emma',
    body: 'So impressed—everything went perfectly! Totally perfect 😊.',
    img: 'https://avatar.vercel.sh/emma',
  },
  {
    name: 'Gabby',
    username: '@gabby_labs',
    body: 'Speechless—this made me grin!!! Feels just right 🙂.',
    img: 'https://avatar.vercel.sh/noah',
  },
  {
    name: 'Maya',
    username: '@maya_ros',
    body: 'So refreshing—clean, crisp, and just what I needed!!!',
    img: 'https://avatar.vercel.sh/maya',
  },
  {
    name: 'Sarah',
    username: '@sarah_lee',
    body: 'To be honest, didn’t expect this to be so good. Truly happy 🙂',
    img: 'https://avatar.vercel.sh/sarah',
  },
  {
    name: 'David',
    username: '@david_vibes',
    body: 'Really solid—sleek and exactly what was promised. Gave joy!?',
    img: 'https://avatar.vercel.sh/david',
  },
]

// Split reviews into two rows
const firstRow = ref(reviews.slice(0, reviews.length / 2))
const secondRow = ref(reviews.slice(reviews.length / 2))
</script>

<template>
  <div
    class="w-full flex flex-col items-center justify-center overflow-hidden rounded-lg bg-pureWhite h-svh dark:bg-pureBlack md:shadow-xl"
  >
    <!-- First Marquee -->
    <Marquee
      class="![--duration:20s]"
      pause-on-hover
    >
      <ReviewCard
        v-for="review in firstRow"
        :key="review.username"
        :body="review.body"
        :img="review.img"
        :name="review.name"
        :username="review.username"
      />
    </Marquee>

    <!-- Second Marquee (reverse) -->
    <Marquee
      class="![--duration:20s]"
      pause-on-hover
      reverse
    >
      <ReviewCard
        v-for="review in secondRow"
        :key="review.username"
        :body="review.body"
        :img="review.img"
        :name="review.name"
        :username="review.username"
      />
    </Marquee>

    <!-- Left Gradient -->
    <div
      class="pointer-events-none absolute inset-y-0 left-0 w-1/3 from-gray-2 bg-gradient-to-r"
    />

    <!-- Right Gradient -->
    <div
      class="pointer-events-none absolute inset-y-0 right-0 w-1/3 from-gray-2 bg-gradient-to-l"
    />
  </div>
</template>
