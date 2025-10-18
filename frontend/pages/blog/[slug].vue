<script setup lang="ts">
import { useAsyncState, useIntersectionObserver, whenever } from '@vueuse/core'
import { useRouteParams } from '@vueuse/router'
import ContentRenderer from '@/components/ui/ContentRenderer/ContentRenderer.vue'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface LexicalNode {
  type: string
  tag?: string
  children?: LexicalNode[]
  text?: string
}

interface PayloadPost {
  id: number
  title: string
  slug: string
  excerpt?: string
  content: { root: LexicalNode }
  featuredImage?: any
  author: any
  categories?: any[]
  tags?: { tag: string }[]
  publishedAt?: string
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

const { getPostBySlug } = usePayloadAPI()
const { getImageUrlFromObject } = useImageUrl()

/* -------------------------------------------------------------------------- */
/*  Route slug (decoded)                                                       */
/* -------------------------------------------------------------------------- */

const slug = useRouteParams('slug', '', {
  transform: (v: string | undefined) =>
    v ? decodeURIComponent(v) : '',
}) as Ref<string>

/* -------------------------------------------------------------------------- */
/*  Post loading                                                               */
/* -------------------------------------------------------------------------- */

const {
  state: post,
  isLoading: loading,
  error,
  execute: fetchPost,
} = useAsyncState<PayloadPost | null>(
  async () => await getPostBySlug(slug.value) as unknown as PayloadPost | null,
  null,
  { immediate: false },
)

whenever(slug as unknown as Ref<number | false | null | undefined>, fetchPost, { immediate: true })

/* -------------------------------------------------------------------------- */
/*  Table of contents                                                          */
/* -------------------------------------------------------------------------- */

const tocItems = ref<TOCItem[]>([])
const activeId = ref('')

/** slug‑ify a heading text → id */
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64) // keep it short
}

/** Extract headings from Lexical JSON */
function extractHeadings(node: LexicalNode, list: TOCItem[] = []) {
  if (node.type === 'heading' && node.tag?.match(/^h[1-6]$/)) {
    const textNode = node.children?.find(c => c.text) as LexicalNode | undefined
    if (textNode?.text) {
      list.push({
        id: slugify(textNode.text),
        text: textNode.text,
        level: Number(node.tag[1]),
      })
    }
  }
  node.children?.forEach(child => extractHeadings(child, list))
  return list
}

/** Build TOC + inject ids into real DOM */
async function buildTOC() {
  if (!post.value?.content?.root)
    return
  // 1. Build the list from JSON
  tocItems.value = extractHeadings(post.value.content.root)

  await nextTick() // wait for ContentRenderer to finish

  // 2. Inject ids so the links work
  tocItems.value.forEach((item) => {
    // find the first heading whose innerText matches (cheap match)
    const target = Array.from(document.querySelectorAll<HTMLElement>(
      'h1, h2, h3, h4, h5, h6',
    )).find(h => h.textContent.trim() === item.text.trim())
    if (target)
      target.id = item.id
  })

  // 3. Track the active heading
  trackHeadings()
}

/* -------------------------------------------------------------------------- */
/*  Active‑heading observer (VueUse)                                           */
/* -------------------------------------------------------------------------- */

function trackHeadings() {
  const headings = Array.from(
    document.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6'),
  )

  headings.forEach((h) => {
    useIntersectionObserver(
      h,
      ([e]) => {
        if (e && (e as IntersectionObserverEntry).isIntersecting)
          activeId.value = h.id
      },
      { rootMargin: '-25% 0% -60% 0%' },
    )
  })
}

/* -------------------------------------------------------------------------- */
/*  Rebuild TOC every time the post changes                                    */
/* -------------------------------------------------------------------------- */

watch(
  () => post.value?.content,
  () => buildTOC(),
  { flush: 'post' },
)

/* -------------------------------------------------------------------------- */
/*  SEO                                                                        */
/* -------------------------------------------------------------------------- */

useHead(() => ({
  title: post.value ? `${post.value.title} – Blog` : 'Blog Post',
  meta: [
    {
      name: 'description',
      content: post.value?.excerpt || 'Blog post',
    },
  ],
}))

/* -------------------------------------------------------------------------- */
/*  Small helpers                                                              */
/* -------------------------------------------------------------------------- */

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getAuthorName(author: any) {
  return author?.name || author?.email || 'Unknown Author'
}

function getCategoryName(categories: any[]) {
  return categories?.[0]?.name || 'Uncategorized'
}

function getReadingTime(content: unknown) {
  if (!content)
    return '5 minute read'
  const words = JSON.stringify(content).split(/\s+/).length
  return `${Math.ceil(words / 200)} minute read`
}

/* -------------------------------------------------------------------------- */
/*  Misc demo data                                                             */
/* -------------------------------------------------------------------------- */

const archiveIssues = ref(['Issue 46', 'Issue 45', 'Issue 44', 'Issue 43'])
</script>

<template>
  <div
    :class="useClsx(
      'ease-[cubic-bezier(0.33,1,0.68,1)] transition-colors duration-600',
      'min-h-svh dark:bg-pureBlack bg-pureWhite',
    )"
  >
    <!-- DEBUG SECTION -->
    <div v-if="false && post" class="bg-yellow-100 border-yellow-500 dark:bg-yellow-900 border-b-2 p-4">
      <h3 class="text-yellow-800 dark:text-yellow-200 mb-2 font-bold">
        DEBUG INFO:
      </h3>
      <pre class="text-yellow-700 dark:text-yellow-300 overflow-auto text-xs">{{ JSON.stringify(post, null, 2) }}</pre>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="mx-auto mb-4 h-12 w-12 animate-spin border-b-2 border-green-7A rounded-full" />
        <p class="text-gray-12 dark:text-gray-4">
          Loading post...
        </p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 class="mb-4 text-2xl text-red-12 font-bold">
          Error
        </h1>
        <p class="mb-4 text-gray-12 dark:text-gray-4">
          {{ error }}
        </p>
        <NuxtLink
          to="/blog"
          class="text-white inline-block rounded-lg bg-green-7A px-6 py-3 transition-colors hover:bg-green-8A"
        >
          Back to Blog
        </NuxtLink>
      </div>
    </div>

    <!-- Post Content with Magazine Layout -->
    <div v-else-if="post">
      <!-- Magazine-style Header -->
      <header class="border-b-2 border-pureBlack border-solid dark:border-pureWhite">
        <div class="mx-auto max-w-screen-2xl px-4 py-4 md:px-8 md:py-8 sm:px-6 sm:py-6">
          <div class="text-center space-y-3 sm:space-y-4">
            <div class="flex items-center justify-center space-x-4 md:space-x-8 sm:space-x-6">
              <div class="h-px w-8 bg-pureBlack md:w-16 sm:w-12 dark:bg-pureWhite" />
              <h1 class="text-2xl color-pureBlack font-light tracking-widest md:text-4xl sm:text-3xl dark:color-pureWhite">
                CRAFTSMAN
              </h1>
              <div class="h-px w-8 bg-pureBlack md:w-16 sm:w-12 dark:bg-pureWhite" />
            </div>
            <p class="px-2 text-xs color-gray-12 tracking-[0.3em] uppercase sm:text-sm">
              A Journal of Digital Artisanship
            </p>
            <div
              class="flex flex-col items-center justify-center text-xs color-gray-11 tracking-widest uppercase sm:flex-row space-y-2 md:space-x-12 sm:space-x-6 sm:space-y-0"
            >
              <span>Issue No. 01</span>
              <span class="hidden sm:inline">•</span>
              <span>{{ formatDate(post.publishedAt || post.createdAt) }}</span>
              <span class="hidden sm:inline">•</span>
              <span>Est. 2025</span>
            </div>
          </div>
        </div>
      </header>

      <div class="mx-auto max-w-screen-2xl px-4 py-8 md:px-8 md:py-16 sm:px-6 sm:py-12">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          <!-- Left Sidebar -->
          <aside class="col-span-1 hidden lg:col-span-2 xl:block">
            <div class="sticky top-30 space-y-12">
              <!-- Issue Info -->
              <div class="text-center">
                <div class="mx-auto mb-4 h-32 w-24 flex items-center justify-center bg-pureBlack dark:bg-pureWhite">
                  <span class="transform text-xs color-pureWhite font-bold -rotate-90 dark:color-pureBlack">01</span>
                </div>
                <p class="text-xs color-gray-10 tracking-widest uppercase">
                  Current Issue
                </p>
              </div>

              <!-- TOC -->
              <div class="border-gray-200 border-t pt-8">
                <nav>
                  <h3 class="mb-4 text-sm color-gray-12 font-semibold tracking-wider uppercase">
                    Table of Contents
                  </h3>
                  <ul class="text-sm space-y-2">
                    <li v-for="item in tocItems" :key="item.id" :style="{ paddingLeft: `${(item.level - 1) * 12}px` }">
                      <a
                        :href="`#${item.id}`"
                        class="block py-1 color-gray-11 transition-colors hover:text-pureBlack"
                        :class="{ 'color-pureBlack dark:color-pureWhite font-medium border-l-2 border-mint-11 border-solid pl-3 -ml-3': activeId === item.id }"
                      >
                        {{ item.text }}
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </aside>

          <!-- Main Content -->
          <main class="col-span-1 lg:col-span-8 xl:col-span-8">
            <article class="max-w-none">
              <!-- Magazine-style Article Header -->
              <header class="mb-8 text-center md:mb-16 sm:mb-12">
                <div class="space-y-4 sm:space-y-6">
                  <div class="text-xs color-gray-10 tracking-[0.4em] uppercase">
                    {{ getCategoryName(post.categories || []) }}
                  </div>
                  <div class="mx-auto h-px w-16 bg-pureBlack md:w-24 sm:w-20 dark:bg-pureWhite" />
                  <div class="mx-auto max-w-4xl px-2 sm:px-4">
                    <h1
                      id="post-title"
                      class="mb-6 text-2xl color-pureBlack font-light leading-tight tracking-wide sm:mb-8 lg:text-5xl md:text-4xl sm:text-3xl xl:text-6xl dark:color-pureWhite"
                    >
                      {{ post.title }}
                    </h1>
                    <p
                      v-if="post.excerpt"
                      class="mx-auto max-w-3xl px-2 text-base color-gray-11 font-light leading-relaxed tracking-wide md:text-xl sm:text-lg"
                    >
                      {{ post.excerpt }}
                    </p>
                  </div>
                  <div
                    class="flex flex-col items-center justify-center pt-6 text-sm color-gray-10 sm:flex-row space-y-2 sm:pt-8 md:space-x-8 sm:space-x-6 sm:space-y-0"
                  >
                    <span class="tracking-wide">By {{ getAuthorName(post.author) }}</span>
                    <span class="hidden sm:inline">•</span>
                    <span class="tracking-wide">{{ formatDate(post.publishedAt || post.createdAt) }}</span>
                    <span class="hidden sm:inline">•</span>
                    <span class="tracking-wide">{{ getReadingTime(post.content) }}</span>
                  </div>
                </div>
              </header>

              <!-- Featured Image -->
              <div v-if="getImageUrlFromObject(post.featuredImage)" class="mb-8 sm:mb-12">
                <figure class="-mx-4 md:-mx-8 sm:-mx-6">
                  <div class="relative overflow-hidden">
                    <img
                      :src="getImageUrlFromObject(post.featuredImage) || undefined"
                      :alt="post.title"
                      class="h-auto w-full object-cover"
                    >
                  </div>
                  <figcaption
                    class="mt-4 px-2 text-center text-xs color-gray-10 tracking-wide italic sm:mt-6 sm:text-sm"
                  >
                    {{ post.title }}
                  </figcaption>
                </figure>
              </div>

              <!-- Content -->
              <div class="prose-editorial max-w-none">
                <ContentRenderer :content="post.content" />
              </div>

              <!-- Tags -->
              <div
                v-if="post.tags && post.tags.length > 0"
                class="mt-12 border-t border-gray-6 pt-8 dark:border-gray-8"
              >
                <h3 class="mb-4 text-lg text-gray-12 font-semibold dark:text-gray-1">
                  Tags
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in post.tags"
                    :key="tag.tag"
                    class="rounded-full bg-gray-6 px-3 py-1 text-sm text-gray-11 dark:bg-gray-8 dark:text-gray-5"
                  >
                    {{ tag.tag }}
                  </span>
                </div>
              </div>
            </article>
          </main>

          <!-- Right Sidebar -->
          <aside class="order-first col-span-1 lg:order-last lg:col-span-2 xl:col-span-2">
            <div class="lg:sticky lg:top-30 space-y-8 sm:space-y-12">
              <!-- Current Issue -->
              <div class="text-center">
                <h3 class="mb-3 text-xs color-gray-12 tracking-[0.3em] uppercase sm:mb-4">
                  This Issue
                </h3>
                <div class="text-sm space-y-3 sm:space-y-4">
                  <div class="border-b border-gray-6 border-solid pb-2">
                    <p class="color-gray-12 font-medium">
                      {{ getCategoryName(post.categories || []) }}
                    </p>
                    <p class="text-xs color-gray-10">
                      Current Article
                    </p>
                  </div>
                </div>
              </div>

              <!-- Subscribe -->
              <div class="border border-gray-6 border-solid p-4 text-center sm:p-6">
                <h3 class="mb-2 text-sm color-gray-12 font-medium sm:mb-3">
                  Subscribe
                </h3>
                <p class="mb-3 text-xs color-gray-11 leading-relaxed sm:mb-4">
                  Quarterly insights on craftsmanship, design, and digital artistry.
                </p>
                <button
                  :class="useClsx(
                    'hover:bg-mint-11 w-full bg-pureBlack py-2 text-xs color-pureWhite',
                    'tracking-widest uppercase transition-colors dark:bg-pureWhite dark:color-pureBlack',
                  )"
                >
                  Join
                </button>
              </div>

              <!-- Archive -->
              <div>
                <h3 class="mb-3 text-xs color-gray-12 tracking-[0.3em] uppercase sm:mb-4">
                  Archive
                </h3>
                <div class="text-sm space-y-2">
                  <a
                    v-for="issue in archiveIssues" :key="issue" href="#"
                    class="block color-gray-10 transition-colors hover:text-pureBlack"
                  >
                    {{ issue }}
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>
