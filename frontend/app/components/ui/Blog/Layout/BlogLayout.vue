<script lang="ts" setup>
import StockButton from '~/components/ui/Buttons/StockButton/StockButton.vue'
import FeaturedCard from '~/components/ui/Card/FeaturedCard/FeaturedCard.vue'
import RegularCard from '~/components/ui/Card/RegularCard/RegularCard.vue'
import StockCard from '~/components/ui/Card/StockCard/StockCard.vue'
import TextScrollReveal from '~/components/ui/Scroll/TextScrollReveal/TextScrollReveal.vue'

const featuredArticle = reactive({
  id: 'spotlight',
  title: 'The Future of Web: AI, Serverless, and Beyond',
  description: 'A deep dive into the transformative technologies shaping the next generation of web development, from intelligent UIs to hyper-scalable infrastructures.',
  date: 'June 2, 2025',
  author: 'Dr. Lex Icon',
  image: 'https://i.imgur.com/7sjlIgq.jpeg',
  href: '#',
})

const regularArticles = reactive(
  Array.from({ length: 6 }).map((_, i) => ({
    id: `article-id-${i + 1}`,
    title: 'The Rise of AI in Modern Development',
    description: 'How artificial intelligence is transforming the way we build and interact with technology.',
    date: `May ${i + 1}, 2024`,
    author: 'Dr. Lex Icon',
    image: 'https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    href: '#',
  })),
)
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <section>
      <div class="mx-auto px-4 md:px-10">
        <!-- Decorative Text Scroll Reveal -->
        <div>
          <TextScrollReveal
            text="Driving digital change with creative energy."
            height-class="h-[500vh]"
            progress-height-class="h-[300vh]"
          />
        </div>
        <div :class="useClsx('mb-4')">
          <div class="flex justify-between">
            <h2
              :class="useClsx(
                'font-ginger text-[clamp(24px,3.4vw,36px)] leading-none md:text-[clamp(38px,4.2vw,56px)] font-light tracking-wide uppercase',
                'color-pureBlack dark:color-pureWhite whitespace-nowrap',
              )"
            >
              MARKET PULSE
            </h2>

            <StockButton />
          </div>
          <div :class="useClsx('h-px w-full bg-gray-6')" />
        </div>

        <div
          class="grid my-8 gap-8 md:grid-cols-[3fr_5fr] md:my-10 lg:gap-x-12"
        >
          <div class="w-full md:min-w-[390px]">
            <FeaturedCard
              :id="featuredArticle.id"
              :author="featuredArticle.author"
              :date="featuredArticle.date"
              :description="featuredArticle.description"
              :href="featuredArticle.href"
              :image="featuredArticle.image"
              :title="featuredArticle.title"
            />
          </div>
          <div class="min-w-0 w-full">
            <StockCard />
          </div>
        </div>
        <!-- Below: REGULAR GRID of articles -->
        <div class="grid my-12 mb-24 mt-12 gap-8 lg:grid-cols-3 sm:grid-cols-2 md:my-32">
          <!-- Regular Cards -->
          <RegularCard
            v-for="(article, idx) in regularArticles"
            :id="article.id"
            :key="article.id"
            :author="article.author"
            :date="article.date"
            :description="article.description"
            :href="article.href"
            :image="article.image"
            :style="`animation-delay:${(idx % 3) * 0.12 + 0.1}s`"
            :title="article.title"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ethereal-cascade {
  animation: etherealCascade 0.9s linear forwards;
}

@keyframes etherealCascade {
  0% {
    opacity: 0;
    transform: translateY(80px) rotateX(20deg);
    filter: blur(12px);
  }
  15% {
    opacity: 0.15;
    transform: translateY(68px) rotateX(17deg);
    filter: blur(10px);
  }
  30% {
    opacity: 0.35;
    transform: translateY(50px) rotateX(12deg);
    filter: blur(7px);
  }
  45% {
    opacity: 0.55;
    transform: translateY(32px) rotateX(8deg);
    filter: blur(4px);
  }
  60% {
    opacity: 0.75;
    transform: translateY(18px) rotateX(4deg);
    filter: blur(2px);
  }
  75% {
    opacity: 0.88;
    transform: translateY(8px) rotateX(1.5deg);
    filter: blur(1px);
  }
  90% {
    opacity: 0.96;
    transform: translateY(2px) rotateX(0.3deg);
    filter: blur(0.3px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotateX(0);
    filter: blur(0);
  }
}

/* pill styles moved to StockButton.vue */
</style>
