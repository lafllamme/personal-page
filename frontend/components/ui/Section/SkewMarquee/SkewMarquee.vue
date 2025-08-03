<script setup lang="ts">
import Marquee from '@/components/ui/Marquee/Marquee.vue'
import ReviewCard from '@/components/ui/ReviewCard/ReviewCard.vue'

const isDark = computed(() => useColorMode().value === 'dark')

// Reviews data
const reviews = [
  {
    name: 'kiri',
    username: '@kiruba_selvi6',
    body: 'Oooohhh wowww...!!',
    img: 'https://cdn.inspira-ui.com/images/x-logo.svg',
  },
  {
    name: 'Sébastien Chopin',
    username: '@Atinux',
    body: 'You ship 🚢',
    img: 'https://cdn.inspira-ui.com/images/x-logo.svg',
  },
  {
    name: 'Mattia Guariglia',
    username: '@matt_guariglia',
    body: 'Omg 🥰',
    img: 'https://cdn.inspira-ui.com/images/x-logo.svg',
  },
  {
    name: 'Nelson🐐',
    username: '@Mathiasokafor3',
    body: 'Thank you so much for all you do for the Vue/nuxt eco system.',
    img: 'https://cdn.inspira-ui.com/images/x-logo.svg',
  },
  {
    name: 'Premdas Vm',
    username: '@premdasvm',
    body: 'Man, this is soo good! I\'ve been jealous of React because their eco-system had Magic UI and other ones like this. Inspira UI is 🔥🙌🏼',
    img: 'https://cdn.inspira-ui.com/images/x-logo.svg',
  },
  {
    name: 'Pierre',
    username: '@PierreHenryBap',
    body: 'It looks really awesome! Just noticed it a couple of days ago and I can’t wait to try it out.',
    img: 'https://cdn.inspira-ui.com/images/x-logo.svg',
  },
  {
    name: 'Waldemar Enns',
    username: '@WaldemarEnns',
    body: 'Awesome! ⭐️ed it immediately',
    img: 'https://cdn.inspira-ui.com/images/x-logo.svg',
  },
]

// Rows
const firstRow = ref(reviews)
</script>

<template>
  <div class="w-full flex flex-col items-center justify-center p-4">
    <div
      class="relative h-[430px] w-full overflow-hidden border rounded-xl bg-pureWhite shadow-lg dark:bg-background"
    >
      <!-- Logo -->
      <!--      <div
        class="absolute left-1/2 top-8 z-20 my-4 border rounded-3xl bg-pureWhite/30 p-3 backdrop-blur-md -translate-x-1/2"
      >
        <ClientOnly>
          <NuxtImg
            v-if="isDark"
            src="/logo-dark.svg"
          />
          <NuxtImg
            v-else
            src="/logo.svg"
          />
        </ClientOnly>
      </div> -->

      <!-- Center Text -->
      <div
        class="absolute inset-0 z-10 mt-20 flex flex-col items-center justify-center px-4 text-center color-pureBlack dark:color-pureWhite"
      >
        <h3 class="mb-2 text-2xl font-bold sm:text-3xl">
          What are you waiting for?
        </h3>
        <p class="m-4 text-base sm:text-lg">
          Get started and start building awesome UI 😄
        </p>
        <NuxtLink to="getting-started/installation">
          <UiButton variant="default">
            Get Started →
          </UiButton>
        </NuxtLink>
      </div>

      <!-- Tilted Marquees -->
      <div class="absolute inset-0 overflow-hidden">
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
            v-for="review in firstRow"
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
            v-for="review in firstRow"
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
            v-for="review in firstRow"
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
        class="pointer-events-none absolute inset-0 from-pureWhite to-transparent bg-gradient-to-t dark:from-background"
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
}
</style>
