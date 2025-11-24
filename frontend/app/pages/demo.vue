<script lang="ts" setup>
// Importiere ContentRenderer
import ContentRenderer from '~/components/ui/ContentRenderer/ContentRenderer.vue'

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

interface PayloadResponse {
  docs: PayloadPost[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
}

// Composables
const { getPosts } = usePayloadAPI()

// Reactive state
const posts = ref<PayloadResponse | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Fetch posts on mount
async function fetchPosts() {
  try {
    loading.value = true
    error.value = null

    const result = await getPosts({
      limit: 10,
      sort: '-createdAt', // Sort by creation date to get all posts
      depth: 2, // Include author and category details
    })

    posts.value = result
    consola.debug('Posts fetched successfully:', result)
  }
  catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch posts'
    console.error('Error fetching posts:', err)
  }
  finally {
    loading.value = false
  }
}

fetchPosts()

// SEO
useHead({
  title: 'Demo - Posts from Enhanced CMS',
  meta: [
    { name: 'description', content: 'Testing our enhanced Payload CMS with role-based access control' },
  ],
})

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
  if (typeof author === 'object' && author) {
    const firstName = author.firstName || ''
    const lastName = author.lastName || ''
    const email = author.email || ''

    if (firstName || lastName) {
      return `${firstName} ${lastName}`.trim()
    }
    return email
  }
  return 'Unknown Author'
}

// Get category names
function getCategoryNames(categories: any[] = []) {
  return categories
    .map(cat => typeof cat === 'object' ? cat.name : cat)
    .filter(Boolean)
    .join(', ')
}
</script>

<template>
  <div class="min-h-screen bg-pureWhite dark:bg-pureBlack !color-red-12">
    <!-- Header -->
    <div class="container mx-auto px-4 py-8">
      <div class="mb-12 text-center">
        <h1 class="mb-4 text-4xl text-pureBlack font-bold md:text-6xl dark:text-pureWhite">
          🚀 Enhanced CMS Demo
        </h1>
        <p class="dark:text-gray-400 text-gray-600 mx-auto max-w-2xl text-xl">
          Testing our adapted collections from TecNews with role-based access control
        </p>
      </div>

      <!-- Status Section -->
      <div
        class="mb-8 border-2 rounded-lg p-6" :class="{
          'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800': loading,
          'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800': error,
          'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800': !loading && !error && posts,
        }"
      >
        <div v-if="loading" class="text-center">
          <div class="border-blue-600 mb-4 inline-block h-8 w-8 animate-spin border-b-2 rounded-full" />
          <p class="text-blue-800 dark:text-blue-200">
            Loading posts from enhanced CMS...
          </p>
        </div>

        <div v-else-if="error" class="text-center">
          <p class="text-red-800 dark:text-red-200 mb-4">
            ❌ Error: {{ error }}
          </p>
          <button
            class="text-white bg-red-600 hover:bg-red-700 rounded px-4 py-2 transition-colors"
            @click="fetchPosts"
          >
            Try Again
          </button>
        </div>

        <div v-else-if="posts" class="text-center">
          <p class="text-green-800 dark:text-green-200">
            ✅ Successfully loaded {{ posts.totalDocs }} posts with enhanced features!
          </p>
        </div>

        <div v-else class="text-3xl color-orange-10">
          <p>No posts</p>
        </div>
      </div>

      <!-- Posts Grid -->
      <div v-if="posts && posts.docs.length > 0" class="space-y-6">
        <h2 class="mb-6 text-2xl text-pureBlack font-semibold dark:text-pureWhite">
          Posts ({{ posts.totalDocs }} total)
        </h2>

        <div class="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
          <article
            v-for="post in posts.docs"
            :key="post.id"
            class="relative min-h-[320px] flex flex-col border border-gray-6 rounded-xl bg-gray-2 shadow-gray-6A shadow-sm transition-shadow duration-200 dark:border-pureWhite/10 dark:bg-pureBlack hover:shadow-lg"
          >
            <!-- Status Badge -->
            <span
              v-if="post.status === 'published'"
              class="absolute right-5 top-5 rounded-full bg-green-2 px-2 py-0.5 text-xs text-green-8 font-semibold tracking-wide uppercase dark:bg-green-8/20 dark:text-green-3"
            >
              {{ post.status }}
            </span>
            <span
              v-else
              class="absolute right-5 top-5 rounded-full bg-yellow-2 px-2 py-0.5 text-xs text-yellow-8 font-semibold tracking-wide uppercase dark:bg-yellow-8/20 dark:text-yellow-3"
            >
              {{ post.status }}
            </span>

            <!-- Featured Image -->
            <div v-if="post.featuredImage" class="h-40 w-full overflow-hidden rounded-t-xl bg-gray-3 dark:bg-gray-8">
              <img
                v-if="typeof post.featuredImage === 'object' && post.featuredImage.url"
                :src="post.featuredImage.url"
                :alt="post.featuredImage.alt || post.title"
                class="h-full w-full object-cover"
              >
            </div>

            <!-- Content -->
            <div class="flex flex-1 flex-col gap-2 p-6">
              <h3 class="mb-1 text-lg color-pureBlack font-bold dark:color-pureWhite">
                {{ post.title }}
              </h3>
              <p v-if="post.excerpt" class="line-clamp-2 mb-2 color-gray-10 dark:color-gray-4">
                {{ post.excerpt }}
              </p>
              <div v-if="post.content && post.content.root && post.content.root.children" class="mb-2">
                <ContentRenderer :content="post.content" />
              </div>
              <!-- Debug: Payload Content JSON -->
              <pre class="mt-4 overflow-x-auto whitespace-pre-wrap border border-gray-3 rounded bg-gray-1 p-3 text-left text-xs dark:border-gray-7/30 dark:bg-gray-8">
                {{ JSON.stringify(post.content, null, 2) }}
              </pre>
              <div class="mt-auto flex flex-wrap gap-x-4 gap-y-1 border-t border-gray-3 pt-2 text-xs color-gray-8 dark:border-gray-7/30 dark:color-gray-5">
                <span>{{ getAuthorName(post.author) }}</span>
                <span v-if="post.categories && post.categories.length > 0">| {{ getCategoryNames(post.categories) }}</span>
                <span>| {{ formatDate(post.createdAt) }}</span>
                <span>| <span class="font-mono">{{ post.slug }}</span></span>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="posts && posts.docs.length === 0" class="py-12 text-center">
        <div class="mb-4 text-6xl">
          📝
        </div>
        <h3 class="dark:text-white text-gray-900 mb-2 text-xl font-semibold">
          No posts found
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Create some posts in the CMS admin to see them here!
        </p>
        <a
          href="http://localhost:3001/admin"
          target="_blank"
          class="bg-blue-600 text-white hover:bg-blue-700 inline-block rounded-lg px-6 py-3 transition-colors"
        >
          Open CMS Admin
        </a>
      </div>

      <!-- API Info -->
      <div class="bg-gray-50 dark:bg-gray-900 mt-12 rounded-lg p-6">
        <h3 class="text-gray-900 dark:text-white mb-4 text-lg font-semibold">
          🛠️ Technical Details
        </h3>
        <div class="grid gap-4 text-sm md:grid-cols-2">
          <div>
            <strong>Features Tested:</strong>
            <ul class="text-gray-600 dark:text-gray-400 mt-2 list-disc list-inside space-y-1">
              <li>Role-based access control</li>
              <li>Enhanced Posts collection</li>
              <li>Author relationships</li>
              <li>Category relationships</li>
              <li>Local API integration</li>
            </ul>
          </div>
          <div>
            <strong>API Endpoint:</strong>
            <code class="bg-gray-200 dark:bg-gray-800 mt-2 block rounded p-2 text-xs">
              GET /api/cms/posts?limit=10&sort=-createdAt&depth=2
            </code>
            <strong class="mt-3 block">Using:</strong>
            <span class="text-gray-600 dark:text-gray-400">usePayloadAPI() composable with Local API Mode</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
