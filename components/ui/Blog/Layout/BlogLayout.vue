<script lang="ts" setup>
import CardSpotlight from '@/components/ui/Card/CardSpotlight/CardSpotlight.vue'
import TrendingCard from '@/components/ui/Card/TrendingCard/TrendingCard.vue'
import Link from '@/components/ui/Link/Link.vue'

// --- MOCK DATA ---

const spotlightArticle = reactive({
  id: 'spotlight',
  title: 'The Future of Web: AI, Serverless, and Beyond',
  description: 'A deep dive into the transformative technologies shaping the next generation of web development, from intelligent UIs to hyper-scalable infrastructures.',
  date: 'June 2, 2025',
  author: 'Dr. Lex Icon',
  image: 'https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  href: '#',
})

const trendingArticles = reactive([
  {
    id: 'trending-1',
    title: 'Exploring New Tech Paradigms Vol. 1',
    description: 'Top paradigms, top minds.',
    date: 'June 4, 2025',
    image: 'https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Dr. Lex Icon',
    href: '#',
  },
  {
    id: 'trending-2',
    title: 'Exploring New Tech Paradigms Vol. 2',
    description: 'New stacks and AI.',
    date: 'June 5, 2025',
    image: 'https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Dr. Lex Icon',
    href: '#',
  },
  {
    id: 'trending-3',
    title: 'Exploring New Tech Paradigms Vol. 3',
    description: 'Infrastructure for the future.',
    date: 'June 6, 2025',
    image: 'https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Dr. Lex Icon',
    href: '#',
  },
])

const featuredArticles = reactive(
  Array.from({ length: 12 }).map((_, i) => ({
    id: `article-id-${i + 1}`,
    title: 'The Rise of AI in Modern Development',
    description: 'How artificial intelligence is transforming the way we build and interact with technology.',
    date: `May ${i + 1}, 2024`,
    author: 'Dr. Lex Icon',
    image: 'https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    href: '#',
  })),
)

// --- ANIMATION/VIEWPORT LOGIC ---

const spotlightRefs = useTemplateRefsList()
const featuredRefs = useTemplateRefsList()

const isVisibleSpotlight = ref([false])
const isVisibleFeatured = ref(Array.from({ length: featuredArticles.length }).fill(false))

// TODO: Create a composable for this logic
function useVisibilityObserver(refList: Ref, visibleList: Ref, threshold = 25) {
  onMounted(() => {
    refList.value.forEach((el: HTMLElement, idx: number) => {
      if (el) {
        const { hasBeenVisible } = useElementVisiblePercent(el, threshold)
        watch(
          hasBeenVisible,
          (visible) => {
            if (visible)
              visibleList.value[idx] = true
          },
          { immediate: true },
        )
      }
    })
  })
}

// Attach the observers
useVisibilityObserver(spotlightRefs, isVisibleSpotlight)
useVisibilityObserver(featuredRefs, isVisibleFeatured)
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <section>
      <div class="mx-auto px-10">
        <div class="mb-12 flex flex-col animate-fade-in items-start justify-between md:flex-row md:items-end">
          <div>
            <h2 class="geist-regular mb-4 text-3xl color-pureBlack font-bold tracking-tighter dark:color-pureWhite">
              Featured Articles
            </h2>
            <p class="geist-regular max-w-2xl text-gray-10">
              The most insightful pieces from our expert contributors.
            </p>
          </div>
          <a
            class="geist-regular mt-4 flex items-center text-sm text-gray-12 font-medium md:mt-0 hover:text-gray-10"
            href="#"
          >
            View all articles
            <Icon class="ml-1 h-4 w-4" name="ri:arrow-right-s-line" />
          </a>
        </div>

        <!-- SPOTLIGHT + TRENDING -->
        <div class="flex flex-col gap-8 md:grid md:grid-cols-3 md:items-stretch md:gap-8">
          <!-- Spotlight Article (left, spans 2 cols on desktop) -->
          <div class="h-full w-full md:col-span-2 md:row-span-1">
            <CardSpotlight
              :id="spotlightArticle.id"
              :ref="spotlightRefs.set"
              :class="useClsx(
                isVisibleSpotlight[0] ? 'ethereal-cascade' : 'opacity-0',
                'hover:border-[#A0CEC2] dark:bg-pureBlack !p-0 dark:hover:border-[#385C54]',
                'group relative h-full overflow-hidden border border-gray-6',
                'transition-colors transition-shadow duration-300 ease-in-out',
                'border-solid bg-pureWhite shadow-2xl shadow-gray-6A',
              )"
            >
              <div class="aspect-video w-full overflow-hidden md:aspect-[3/1]">
                <img
                  :alt="spotlightArticle.title"
                  :src="spotlightArticle.image"
                  class="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                >
              </div>
              <div class="p-6">
                <h3 class="geist-regular mb-2 text-2xl color-pureBlack font-semibold dark:color-pureWhite">
                  {{ spotlightArticle.title }}
                </h3>
                <p class="mb-2 text-pretty color-gray-10 font-light">
                  {{ spotlightArticle.description }}
                </p>
                <div class="mb-2 flex text-sm text-gray-11 space-x-4">
                  <div class="flex items-center space-x-2">
                    <Icon class="mt-px size-4 color-gray-10 group-hover:color-gray-12" name="ri:calendar-2-line" />
                    <p>{{ spotlightArticle.date }}</p>
                  </div>
                  <span>·</span>
                  <div class="flex items-center space-x-2">
                    <Icon class="size-4 color-gray-10 group-hover:color-gray-12" name="ri:user-3-line" />
                    <p>{{ spotlightArticle.author }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-1.5">
                  <Link
                    :href="spotlightArticle.href"
                    :underline="false"
                    class="text-base color-gray-12 font-semibold"
                  >
                    Read More
                  </Link>
                  <Icon
                    class="size-5 color-gray-8 transition-all duration-200 group-hover:translate-x-1 group-focus-visible:color-mint-11A group-hover:color-mint-11A"
                    name="ri:arrow-right-line"
                  />
                </div>
              </div>
            </CardSpotlight>
          </div>

          <!-- Trending Column (right) -->
          <div class="m-0 h-full w-full flex flex-col justify-between p-0">
            <h3 class="mb-2 text-lg font-bold md:mb-4">
              Trending Now
            </h3>
            <!-- Trending cards at flex-end -->
            <div class="mt-auto flex flex-col gap-4">
              <TrendingCard
                v-for="article in trendingArticles"
                :id="article.id"
                :key="article.id"
                :author="article.author"
                :date="article.date"
                :description="article.description"
                :href="article.href"
                :image="article.image"
                :title="article.title"
              />
            </div>
          </div>
        </div>

        <!-- Below: REGULAR GRID of articles -->
        <div class="grid mt-12 gap-8 lg:grid-cols-3 md:grid-cols-2">
          <CardSpotlight
            v-for="(item, idx) in featuredArticles"
            :id="item.id"
            :key="item.id"
            :ref="featuredRefs.set"
            :class="useClsx(
              'border border-solid border-gray-6 hover:border-[#A0CEC2] dark:hover:border-[#385C54]',
              'transition-colors transition-shadow duration-300 ease-in-out opacity-0',
              isVisibleFeatured[idx]! && 'ethereal-cascade',
              'bg-pureWhite dark:bg-pureBlack',
              'group relative overflow-hidden',
              'shadow-2xl shadow-gray-6A',
            )"
            :style="isVisibleFeatured[idx] ? `animation-delay:${(idx % 3) * 0.12 + 0.1}s` : ''"
          >
            <!-- Image Wrapper -->
            <div class="aspect-video overflow-hidden">
              <img
                :alt="item.title"
                :src="item.image"
                class="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              >
            </div>
            <!-- Card Content -->
            <div class="p-6">
              <h3 class="geist-regular mb-2 text-xl color-pureBlack font-medium dark:color-pureWhite !font-semibold">
                {{ item.title }}
              </h3>
              <p class="mb-2 text-pretty color-gray-10 font-light">
                {{ item.description }}
              </p>
              <div class="mb-3 flex text-sm text-gray-11 font-200 space-x-4">
                <div class="flex items-center space-x-2">
                  <Icon class="mt-px size-4 color-gray-10 group-hover:color-gray-12" name="ri:calendar-2-line" />
                  <p>{{ item.date }}</p>
                </div>
                <span>·</span>
                <div class="flex items-center space-x-2">
                  <Icon class="size-4 color-gray-10 group-hover:color-gray-12" name="ri:user-3-line" />
                  <p>{{ item.author }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-1.5">
                <Link
                  :href="item.href"
                  :underline="false"
                  class="text-base color-gray-12 font-semibold"
                >
                  Read More
                </Link>
                <Icon
                  class="size-5 color-gray-8 transition-all duration-200 group-hover:translate-x-1 group-focus-visible:color-mint-11A group-hover:color-mint-11A"
                  name="ri:arrow-right-line"
                />
              </div>
            </div>
          </CardSpotlight>
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
</style>
