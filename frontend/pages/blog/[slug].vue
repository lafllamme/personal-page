<script lang="ts" setup>
import ContentRenderer from '@/components/ui/ContentRenderer/ContentRenderer.vue'

interface PayloadPost {
  id: number
  title: string
  slug: string
  excerpt?: string
  content: any
  featuredImage?: any
  author: any
  categories?: any[]
  tags?: { tag: string }[]
  publishedAt?: string
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

// Get the slug from the route
const route = useRoute()
const slug = route.params.slug as string

// Composables
const { getPostBySlug } = usePayloadAPI()

// Reactive state
const post = ref<PayloadPost | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Fetch post on mount
async function fetchPost() {
  try {
    loading.value = true
    error.value = null

    const result = await getPostBySlug(slug)

    if (!result) {
      throw new Error('Post not found')
    }

    post.value = result
    console.log('Post fetched successfully:', result)
  }
  catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch post'
    console.error('Error fetching post:', err)
  }
  finally {
    loading.value = false
  }
}

fetchPost()

// SEO
useHead(() => ({
  title: post.value ? `${post.value.title} - Blog` : 'Blog Post',
  meta: [
    {
      name: 'description',
      content: post.value?.excerpt || 'Blog post from our enhanced CMS',
    },
  ],
}))

// Format date helper
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Get author name
function getAuthorName(author: any) {
  if (!author)
    return 'Unknown Author'
  return author.name || author.email || 'Unknown Author'
}

// Get category name
function getCategoryName(categories: any[]) {
  if (!categories || categories.length === 0)
    return 'Uncategorized'
  return categories[0].name || 'Uncategorized'
}

// Get image URL
const { getImageUrlFromObject } = useImageUrl()
</script>

<template>
  <div class="min-h-screen bg-gray-1 dark:bg-pureBlack">
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

    <!-- Post Content -->
    <div v-else-if="post" class="mx-auto max-w-4xl px-4 py-8">
      <!-- Back Button -->
      <NuxtLink
        to="/blog"
        class="mb-8 inline-flex items-center text-green-7A transition-colors hover:text-green-8A"
      >
        <Icon name="tabler:arrow-left" class="mr-2" />
        Back to Blog
      </NuxtLink>

      <!-- Featured Image -->
      <div v-if="getImageUrlFromObject(post.featuredImage)" class="mb-8">
        <img
          :src="getImageUrlFromObject(post.featuredImage)"
          :alt="post.title"
          class="h-64 w-full rounded-2xl object-cover shadow-lg md:h-96"
        >
      </div>

      <!-- Post Header -->
      <header class="mb-8">
        <div class="mb-4 flex items-center gap-4">
          <span class="text-sm text-green-7A font-medium">
            {{ getCategoryName(post.categories || []) }}
          </span>
          <span class="text-sm text-gray-11 dark:text-gray-5">
            {{ formatDate(post.publishedAt || post.createdAt) }}
          </span>
        </div>

        <h1 class="mb-4 text-4xl text-gray-12 font-bold leading-tight md:text-5xl dark:text-gray-1">
          {{ post.title }}
        </h1>

        <p v-if="post.excerpt" class="mb-6 text-xl text-gray-11 leading-relaxed dark:text-gray-5">
          {{ post.excerpt }}
        </p>

        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <Icon name="tabler:user" class="text-gray-11 dark:text-gray-5" />
            <span class="text-gray-11 dark:text-gray-5">
              {{ getAuthorName(post.author) }}
            </span>
          </div>
        </div>
      </header>

      <!-- Post Content -->
      <article class="prose-lg max-w-none prose dark:prose-invert">
        <ContentRenderer :content="post.content" />
      </article>

      <!-- Tags -->
      <div v-if="post.tags && post.tags.length > 0" class="mt-12 border-t border-gray-6 pt-8 dark:border-gray-8">
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
    </div>
  </div>
</template>
