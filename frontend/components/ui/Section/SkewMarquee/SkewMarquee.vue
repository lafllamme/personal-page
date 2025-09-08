<script setup lang="ts">
import Marquee from '@/components/ui/Marquee/Marquee.vue'
import ReviewCard from '@/components/ui/ReviewCard/ReviewCard.vue'

const isDark = computed(() => useColorMode().value === 'dark')

// Reviews data
// Reviews data (fictional, realistic — 7 items)
const reviews = [
  {
    name: 'Aria Solberg',
    username: '@aria_solberg',
    body: 'Clean daily digest of software releases and engineering reads. Bookmarked.',
    img: 'https://cdn.inspira-ui.com/images/x-logo.svg',
  },
  {
    name: 'Nate Kwan',
    username: '@natekwan_dev',
    body: 'Fast hits on frameworks, infra, and devtools—perfect before stand-up.',
    img: 'https://cdn.inspira-ui.com/images/x-logo.svg',
  },
  {
    name: 'Jonas Richter',
    username: '@jonas_richter',
    body: 'Separates signal from launch hype. Worth the follow.',
    img: 'https://cdn.inspira-ui.com/images/x-logo.svg',
  },
  {
    name: 'Maya Duarte',
    username: '@maya_codes',
    body: 'Concise summaries with links to deep dives. Commute-friendly.',
    img: 'https://cdn.inspira-ui.com/images/x-logo.svg',
  },
  {
    name: 'Ibrahim Farouq',
    username: '@ifarouq_io',
    body: 'Solid coverage of platform updates, SDK notes, and API changes.',
    img: 'https://cdn.inspira-ui.com/images/x-logo.svg',
  },
  {
    name: 'Lina Kovacs',
    username: '@linakvx',
    body: 'Curated dev stories with practical takeaways. No fluff.',
    img: 'https://cdn.inspira-ui.com/images/x-logo.svg',
  },
  {
    name: 'Toby McCall',
    username: '@toby_mcc',
    body: 'Release radar is clutch—caught a breaking change early. 🙌',
    img: 'https://cdn.inspira-ui.com/images/x-logo.svg',
  },
]

// Rows
const firstRow = ref(reviews)
</script>

<template>
  <div class="my-12 w-full flex flex-col items-center justify-center">
    <div
      class="relative h-[430px] w-full overflow-hidden border bg-pureWhite dark:bg-background"
    >
      <!-- Center Text -->
      <div
        class="absolute inset-0 z-10 mt-20 flex flex-col items-center justify-center px-4 text-center color-pureBlack dark:color-pureWhite"
      >
        <h3 class="space-grotesk-regular mb-2 text-2xl font-bold sm:text-3xl">
          Shipping this week?
        </h3>
        <p class="space-grotesk-regular m-4 text-base sm:text-lg">
          The essential tech news in under 3 minutes.
        </p>
        <button class="space-grotesk-regular rounded-full bg-pureBlack px-4 py-1 color-pureWhite font-medium tracking-tight dark:bg-pureWhite dark:color-pureBlack">
          Dive in →
        </button>
      </div>

      <!-- Tilted Marquees -->
      <div class="absolute inset-0 overflow-hidden bg-pureWhite dark:bg-pureBlack">
        <Marquee
          :style="{ transform: 'translateY(-11.5rem) rotate(-16deg)' }"
          class="marquee"
          :pause-on-hover="false"
        >
          <ReviewCard
            v-for="(review, idx) in firstRow"
            :key="review.username"
            :img="review.img"
            :name="review.name"
            :username="review.username"
            :body="review.body"
            :index="idx"
          />
        </Marquee>

        <Marquee
          :style="{ transform: 'translateY(1rem) rotate(-16deg)' }"
          reverse
          class="marquee"
          :pause-on-hover="false"
        >
          <ReviewCard
            v-for="(review, idx) in firstRow"
            :key="review.username"
            :img="review.img"
            :name="review.name"
            :username="review.username"
            :body="review.body"
            :index="idx"
          />
        </Marquee>

        <Marquee
          :style="{ transform: 'translateY(13.5rem) rotate(-16deg)' }"
          class="marquee"
          :pause-on-hover="false"
        >
          <ReviewCard
            v-for="(review, idx) in firstRow"
            :key="review.username"
            :img="review.img"
            :name="review.name"
            :username="review.username"
            :body="review.body"
            :index="idx"
          />
        </Marquee>

        <Marquee
          :style="{ transform: 'translateY(26rem) rotate(-16deg)' }"
          reverse
          class="marquee"
          :pause-on-hover="false"
        >
          <ReviewCard
            v-for="(review, idx) in firstRow"
            :key="review.username"
            :img="review.img"
            :name="review.name"
            :username="review.username"
            :body="review.body"
            :index="idx"
          />
        </Marquee>
      </div>

      <!-- Gradient overlay to fade to pureWhite at the bottom -->
      <div
        class="pointer-events-none absolute inset-0 from-pureWhite to-pureWhite/0 bg-gradient-to-t dark:from-pureBlack dark:to-transparent"
      />
    </div>
  </div>
</template>

<style scoped>
.marquee {
  --duration: 40s;
  position: absolute;
  left: -10%;
  width: 120%;
  padding: 0.5rem 0;
  @apply bg-pureWhite dark:bg-pureBlack;
}
</style>
