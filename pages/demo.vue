<script lang="ts" setup>
import Marquee from '@/components/ui/Marquee/Marquee.vue'
import ReviewCard from '@/components/ui/ReviewCard/ReviewCard.vue'
import { ref } from 'vue'

const reviews = [
  {
    name: 'Jack',
    username: '@jack_rides',
    body: 'Wow, this totally blew me away 😲! Exceeded all my expectations—I’m in love ❤️',
    img: 'https://avatar.vercel.sh/jack',
  },
  {
    name: 'Jill',
    username: '@jill_explorer',
    body: 'Speechless 😶… never thought I’d see something this awesome. Highly recommend!',
    img: 'https://avatar.vercel.sh/jill',
  },
  {
    name: 'John',
    username: '@john_vibes',
    body: 'Just… wow. This is next level 🔥. Can’t wait to tell my friends!',
    img: 'https://avatar.vercel.sh/john',
  },
  {
    name: 'Jane',
    username: '@jane_creates',
    body: 'Absolutely stunning 🤩. This made my day—so impressed!',
    img: 'https://avatar.vercel.sh/jane',
  },
  {
    name: 'Jenny',
    username: '@jenny_journey',
    body: 'Incredible experience 😍. Exactly what I needed today.',
    img: 'https://avatar.vercel.sh/jenny',
  },
  {
    name: 'James',
    username: '@james_adventures',
    body: 'Mind = blown 🤯! Seriously, this is a game changer.',
    img: 'https://avatar.vercel.sh/james',
  },
  // 10 more reviews:
  {
    name: 'Eric',
    username: '@eric_writes',
    body: 'Can’t stop thinking about this 🤔✨. Truly next‑level stuff!',
    img: 'https://avatar.vercel.sh/eric',
  },
  {
    name: 'Sara',
    username: '@sara_smiles',
    body: 'This just made my week 😊🎉. So, so good!',
    img: 'https://avatar.vercel.sh/sara',
  },
  {
    name: 'Mike',
    username: '@mike_moments',
    body: 'Legit one of the best experiences I’ve had 🙌👍.',
    img: 'https://avatar.vercel.sh/mike',
  },
  {
    name: 'Laura',
    username: '@laura_loves',
    body: 'Heart = full ❤️✨. Can’t recommend it enough!',
    img: 'https://avatar.vercel.sh/laura',
  },
  {
    name: 'Tom',
    username: '@tom_tracks',
    body: 'Blew my mind 🤯🚀. Totally worth every second.',
    img: 'https://avatar.vercel.sh/tom',
  },
  {
    name: 'Nina',
    username: '@nina_narrates',
    body: 'Absolutely magical ✨🌟. Left me speechless!',
    img: 'https://avatar.vercel.sh/nina',
  },
  {
    name: 'Carlos',
    username: '@carlos_creates',
    body: 'Wow, just wow 😍👏. Beyond impressed!',
    img: 'https://avatar.vercel.sh/carlos',
  },
  {
    name: 'Eva',
    username: '@eva_exclaims',
    body: 'Can’t believe how good this is 🤩💯!',
    img: 'https://avatar.vercel.sh/eva',
  },
  {
    name: 'Samuel',
    username: '@samuel_snap',
    body: 'Total game‑changer 🎮🔥. Obsessed!',
    img: 'https://avatar.vercel.sh/samuel',
  },
  {
    name: 'Leila',
    username: '@leila_lights',
    body: 'Pure brilliance 🌟❤️. I’m officially hooked!',
    img: 'https://avatar.vercel.sh/leila',
  },
]

// Split reviews into two rows
const firstRow = ref(reviews.slice(0, reviews.length / 2))
const secondRow = ref(reviews.slice(reviews.length / 2))
</script>

<template>
  <div
    class="h-screen w-full flex flex-col items-center justify-center overflow-hidden rounded-lg bg-pureWhite dark:bg-pureBlack md:shadow-xl"
  >
    <!-- First Marquee -->
    <Marquee
      class="[--duration:20s]"
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
      class="[--duration:20s]"
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
