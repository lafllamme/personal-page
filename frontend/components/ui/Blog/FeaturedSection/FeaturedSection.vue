<script lang="ts" setup>
import AppleCard from '@/components/ui/Card/AppleCard/AppleCard.vue'
import AppleCardCarousel from '@/components/ui/Card/AppleCard/AppleCardCarousel.vue'
import AppleCarouselItem from '@/components/ui/Card/AppleCard/AppleCarouselItem.vue'
import TrendingCard from '@/components/ui/Card/TrendingCard/TrendingCard.vue'
import Link from '@/components/ui/Link/Link.vue'
import SparklesText from '@/components/ui/Text/SparkleText/SparkleText.vue'

// Composables
const { getImageUrlFromObject } = useImageUrl()

// --- REAL DATA FROM PAYLOAD ---
interface GalleryPost {
  category: string
  title: string
  src: string
  slug: string
}

// Composables
const { getGalleryPosts } = usePayloadAPI()

// Reactive state
const galleryPosts = ref<GalleryPost[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// DRY helpers/constants
const GALLERY_QUERY = { limit: 6, depth: 2 } as const

const FALLBACK_GALLERY_POSTS: GalleryPost[] = [
  {
    category: 'Artificial Intelligence',
    title: 'You can do more with AI.',
    src: 'https://i.imgur.com/9EOfmtX.jpeg',
    slug: 'ai-enhancement',
  },
  {
    category: 'Productivity',
    title: 'Enhance your productivity.',
    src: 'https://i.imgur.com/OdC4wBG.jpeg',
    slug: 'productivity-tips',
  },
  {
    category: 'Product',
    title: 'Launching the new Apple Vision Pro.',
    src: 'https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'apple-vision-pro',
  },
  {
    category: 'Product',
    title: 'Maps for your iPhone 15 Pro Max.',
    src: 'https://i.imgur.com/B1BZH7P.jpeg',
    slug: 'iphone-15-maps',
  },
  {
    category: 'iOS',
    title: 'Photography just got better.',
    src: 'https://i.imgur.com/OxgUcYO.jpeg',
    slug: 'ios-photography',
  },
  {
    category: 'Hiring',
    title: 'Hiring for a Staff Software Engineer',
    src: 'https://i.imgur.com/UnI4RkM.jpeg',
    slug: 'hiring-engineer',
  },
]

function mapDocToGalleryPost(post: any): GalleryPost {
  return {
    category: post?.categories?.[0]?.name ?? 'Uncategorized',
    title: post?.title ?? '',
    src: getImageUrlFromObject(post?.featuredImage) || '',
    slug: encodeURIComponent(post?.slug ?? ''),
  }
}

// Fetch gallery posts
async function fetchGalleryPosts() {
  try {
    loading.value = true
    error.value = null

    const result = await getGalleryPosts(GALLERY_QUERY)
    const docs = result?.docs ?? []

    galleryPosts.value = docs.length > 0
      ? docs.map(mapDocToGalleryPost)
      : FALLBACK_GALLERY_POSTS
  }
  catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch gallery posts'
    console.error('Error fetching gallery posts:', err)
    galleryPosts.value = FALLBACK_GALLERY_POSTS
  }
  finally {
    loading.value = false
  }
}

// Fetch data on mount
fetchGalleryPosts()

const trendingArticles = [
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
  {
    id: 'trending-4',
    title: 'Exploring New Tech Paradigms Vol. 4',
    description: 'Infrastructure for the future.',
    date: 'June 26, 2025',
    image: 'https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Dr. Lex Icon',
    href: '#',
  },
]

const isHeadingVisible = ref(false)
const isHintVisible = ref(false)
const isSubheadingVisible = ref(false)
const headlineRef = useTemplateRef('headlineRef')
const hintRef = useTemplateRef('hintRef')
const subheadingRef = useTemplateRef('subheadingRef')

useVisibilityObserver(hintRef, isHintVisible)
useVisibilityObserver(subheadingRef, isSubheadingVisible)
useVisibilityObserver(headlineRef, isHeadingVisible)
</script>

<template>
  <section>
    <div class="mx-auto px-4 md:px-10">
      <div class="mb-12 flex flex-col items-start justify-between md:flex-row md:items-end">
        <div>
          <h2
            ref="headlineRef"
            :class="useClsx(
              'font-recoleta mb-4 font-medium text-3xl md:text-6xl tracking-tight',
              'color-mint-12',
              isHeadingVisible ? 'animate-fade-in' : 'opacity-0',
            )"
          >
            Featured Articles
          </h2>
          <p
            ref="hintRef"
            :class="useClsx(isHintVisible ? 'animate-fade-in' : 'opacity-0')"
            class="geist-regular max-w-2xl text-gray-10 font-thin md:ml-1 md:text-xl"
          >
            The most insightful pieces from our expert contributors.
          </p>
        </div>
        <div
          ref="hintRef"
          class="group mt-4 flex items-center justify-center"
        >
          <Link
            :class="[
              useClsx(
                'flex items-start gap-2 group',
                isHintVisible ? 'animate-fade-in' : 'opacity-0',
                'geist-regular text-base font-light uppercase',
                'color-gray-12 tracking-wide transition-color duration-150 hover:color-jade-8',
              ),
            ]"
            aria-label="View all articles on our blog"
            href="#"
            underline-size="full"
          >
            View all articles
            <Icon
              :class="useClsx(
                'size-5 color-mint-11',
                'transition-transform duration-150 ease-out delay-75',
                'dark:group-hover:color-pureWhite group-hover:color-pureBlack',
                'group-hover:translate-x-0.5  group-hover:-translate-y-0.5',
              )"
              name="ri:arrow-right-up-line"
            />
          </Link>
        </div>
      </div>

      <!-- Featured + Trending -->
      <div class="flex flex-col gap-8 md:grid md:grid-cols-3 md:items-stretch md:gap-8">
        <!-- Featured Article (left, spans 2 cols on desktop) -->
        <div class="w-full md:col-span-2">
          <div>
            <AppleCardCarousel>
              <AppleCarouselItem
                v-for="(card, index) in galleryPosts"
                :key="index"
                :index="index"
              >
                <AppleCard
                  :card="card"
                  :index="index"
                  :layout="true"
                  :enable-navigation="true"
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
          </div>
        </div>

        <!-- Trending Column (right) -->
        <div class="h-full w-full flex flex-col">
          <div class="h-full flex flex-col">
            <div
              ref="subheadingRef"
              :class="useClsx(isSubheadingVisible ? 'animate-fade-in !animate-duration-[2000ms]' : 'opacity-0')"
              class="mb-6 flex items-center md:mb-10 space-x-2"
            >
              <Icon class="size-8 color-mint-8 md:size-12" name="ri:speak-ai-line" />
              <h3
                class="figtree-regular whitespace-nowrap text-xl color-pureBlack tracking-tight lg:text-4xl md:text-2xl dark:color-pureWhite !font-medium"
              >
                <SparklesText
                  :colors="{ first: '#9E7AFF', second: '#FE8BBB' }" :sparkles-count="5"
                  text="Trending Topics"
                />
              </h3>
            </div>
            <div class="flex flex-1 flex-col justify-start gap-4">
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
      </div>
    </div>
  </section>
</template>
