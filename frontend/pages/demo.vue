<script lang="ts" setup>
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
const fetchPosts = async () => {
  try {
    loading.value = true
    error.value = null
    
    const result = await getPosts({ 
      limit: 10, 
      sort: '-createdAt', // Sort by creation date to get all posts
      depth: 2 // Include author and category details
    })
    
    posts.value = result
    console.log('Posts fetched successfully:', result)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch posts'
    console.error('Error fetching posts:', err)
  } finally {
    loading.value = false
  }
}


  fetchPosts()


// SEO
useHead({
  title: 'Demo - Posts from Enhanced CMS',
  meta: [
    { name: 'description', content: 'Testing our enhanced Payload CMS with role-based access control' }
  ]
})

// Format date helper
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Get author name
const getAuthorName = (author: any) => {
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
const getCategoryNames = (categories: any[] = []) => {
  return categories
    .map(cat => typeof cat === 'object' ? cat.name : cat)
    .filter(Boolean)
    .join(', ')
}

// Importiere ContentRenderer
import ContentRenderer from '@/components/ui/ContentRenderer/ContentRenderer.vue'
</script>

<template>
  <div class="!color-red-12 min-h-screen bg-pureWhite dark:bg-pureBlack">
    <!-- Header -->
    <div class="container mx-auto px-4 py-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-6xl font-bold text-pureBlack dark:text-pureWhite mb-4">
          🚀 Enhanced CMS Demo
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Testing our adapted collections from TecNews with role-based access control
        </p>
      </div>

      <!-- Status Section -->
      <div class="mb-8 p-6 rounded-lg border-2" :class="{
        'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800': loading,
        'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800': error,
        'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800': !loading && !error && posts
      }">
        <div v-if="loading" class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p class="text-blue-800 dark:text-blue-200">Loading posts from enhanced CMS...</p>
        </div>
        
        <div v-else-if="error" class="text-center">
          <p class="text-red-800 dark:text-red-200 mb-4">❌ Error: {{ error }}</p>
          <button 
            @click="fetchPosts" 
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
        
        <div v-else-if="posts" class="text-center">
          <p class="text-green-800 dark:text-green-200">
            ✅ Successfully loaded {{ posts.totalDocs }} posts with enhanced features!
          </p>
        </div>

        <div class="text-3xl color-orange-10"  v-else>
          <p>No posts</p>
        </div>
      </div>

      <!-- Posts Grid -->
      <div v-if="posts && posts.docs.length > 0" class="space-y-6">
        <h2 class="text-2xl font-semibold text-pureBlack dark:text-pureWhite mb-6">
          Posts ({{ posts.totalDocs }} total)
        </h2>
        
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="post in posts.docs"
            :key="post.id"
            class="relative flex flex-col bg-gray-2 dark:bg-pureBlack border border-gray-6 dark:border-pureWhite/10 rounded-xl shadow-gray-6A shadow-sm hover:shadow-lg transition-shadow duration-200 min-h-[320px]"
          >
            <!-- Status Badge -->
            <span
              class="absolute right-5 top-5 px-2 py-0.5 text-xs font-semibold rounded-full uppercase tracking-wide bg-green-2 text-green-8 dark:bg-green-8/20 dark:text-green-3"
              v-if="post.status === 'published'"
            >
              {{ post.status }}
            </span>
            <span
              class="absolute right-5 top-5 px-2 py-0.5 text-xs font-semibold rounded-full uppercase tracking-wide bg-yellow-2 text-yellow-8 dark:bg-yellow-8/20 dark:text-yellow-3"
              v-else
            >
              {{ post.status }}
            </span>

            <!-- Featured Image -->
            <div v-if="post.featuredImage" class="h-40 w-full bg-gray-3 dark:bg-gray-8 rounded-t-xl overflow-hidden">
              <img
                v-if="typeof post.featuredImage === 'object' && post.featuredImage.url"
                :src="post.featuredImage.url"
                :alt="post.featuredImage.alt || post.title"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Content -->
            <div class="flex-1 flex flex-col p-6 gap-2">
              <h3 class="text-lg font-bold color-pureBlack dark:color-pureWhite mb-1">
                {{ post.title }}
              </h3>
              <p v-if="post.excerpt" class="color-gray-10 dark:color-gray-4 mb-2 line-clamp-2">
                {{ post.excerpt }}
              </p>
              <div v-if="post.content && post.content.root && post.content.root.children" class="mb-2">
                <ContentRenderer :content="post.content" />
              </div>
              <!-- Debug: Payload Content JSON -->
              <pre class="mt-4 text-xs bg-gray-1 dark:bg-gray-8 rounded p-3 overflow-x-auto border border-gray-3 dark:border-gray-7/30 text-left whitespace-pre-wrap">
                {{ JSON.stringify(post.content, null, 2) }}
              </pre>
              <div class="mt-auto flex flex-wrap gap-x-4 gap-y-1 text-xs color-gray-8 dark:color-gray-5 pt-2 border-t border-gray-3 dark:border-gray-7/30">
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
      <div v-else-if="posts && posts.docs.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">📝</div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No posts found
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Create some posts in the CMS admin to see them here!
        </p>
        <a 
          href="http://localhost:3001/admin" 
          target="_blank"
          class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Open CMS Admin
        </a>
      </div>

      <!-- API Info -->
      <div class="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🛠️ Technical Details
        </h3>
        <div class="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Features Tested:</strong>
            <ul class="list-disc list-inside mt-2 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Role-based access control</li>
              <li>Enhanced Posts collection</li>
              <li>Author relationships</li>
              <li>Category relationships</li>
              <li>Local API integration</li>
            </ul>
          </div>
          <div>
            <strong>API Endpoint:</strong>
            <code class="block mt-2 p-2 bg-gray-200 dark:bg-gray-800 rounded text-xs">
              GET /api/cms/posts?limit=10&sort=-createdAt&depth=2
            </code>
            <strong class="block mt-3">Using:</strong>
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
