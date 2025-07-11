<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">🚀 Local API Integration Test</h1>
    
    <!-- API Connection Status -->
    <div class="mb-8 p-4 rounded-lg border" :class="connectionStatus.class">
      <h2 class="text-xl font-semibold mb-2">Connection Status</h2>
      <p>{{ connectionStatus.message }}</p>
      <p class="text-sm mt-1">
        <strong>Local API Mode:</strong> Using Payload's local API through Nuxt server routes
      </p>
      <p class="text-sm">
        <strong>Zero Latency:</strong> Direct database access without HTTP overhead
      </p>
    </div>

    <!-- Architecture Info -->
    <div class="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <h2 class="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-200">🏗️ Architecture</h2>
      <div class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
        <p>✅ <strong>Frontend:</strong> Nuxt 3 on localhost:3000</p>
        <p>✅ <strong>CMS:</strong> Payload CMS on localhost:3001</p>
        <p>✅ <strong>Local API:</strong> Nuxt server routes use getPayload() directly</p>
        <p>✅ <strong>Shared Config:</strong> Both apps use same Payload configuration</p>
        <p>✅ <strong>TurboRepo:</strong> Optimized builds and caching</p>
      </div>
    </div>

    <!-- Pages Test -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">📄 Pages from CMS</h2>
      <div v-if="loading.pages" class="text-gray-500">Loading pages...</div>
      <div v-else-if="pages" class="space-y-4">
        <div v-for="page in pages.docs" :key="page.id" class="p-4 border rounded-lg">
          <h3 class="font-semibold">{{ page.title }}</h3>
          <p class="text-sm text-gray-600">Slug: {{ page.slug }}</p>
          <p class="text-sm text-gray-600">Status: {{ page.status }}</p>
        </div>
        <div v-if="pages.docs.length === 0" class="text-gray-500 italic">
          No pages found. Create some pages in the CMS admin panel.
        </div>
      </div>
      <div v-else class="text-red-500">Failed to load pages</div>
    </div>

    <!-- Posts Test -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">📝 Posts from CMS</h2>
      <div v-if="loading.posts" class="text-gray-500">Loading posts...</div>
      <div v-else-if="posts" class="space-y-4">
        <div v-for="post in posts.docs" :key="post.id" class="p-4 border rounded-lg">
          <h3 class="font-semibold">{{ post.title }}</h3>
          <p class="text-sm text-gray-600">Slug: {{ post.slug }}</p>
          <p class="text-sm text-gray-600">Status: {{ post.status }}</p>
          <p v-if="post.excerpt" class="text-sm mt-2">{{ post.excerpt }}</p>
        </div>
        <div v-if="posts.docs.length === 0" class="text-gray-500 italic">
          No posts found. Create some posts in the CMS admin panel.
        </div>
      </div>
      <div v-else class="text-red-500">Failed to load posts</div>
    </div>

    <!-- Categories Test -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">🏷️ Categories from CMS</h2>
      <div v-if="loading.categories" class="text-gray-500">Loading categories...</div>
      <div v-else-if="categories" class="space-y-4">
        <div v-for="category in categories.docs" :key="category.id" class="p-4 border rounded-lg">
          <h3 class="font-semibold">{{ category.name }}</h3>
          <p class="text-sm text-gray-600">Slug: {{ category.slug }}</p>
          <p v-if="category.description" class="text-sm mt-2">{{ category.description }}</p>
        </div>
        <div v-if="categories.docs.length === 0" class="text-gray-500 italic">
          No categories found. Create some categories in the CMS admin panel.
        </div>
      </div>
      <div v-else class="text-red-500">Failed to load categories</div>
    </div>

    <!-- Performance Info -->
    <div class="mb-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
      <h2 class="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">⚡ Performance Benefits</h2>
      <div class="text-sm text-green-700 dark:text-green-300 space-y-1">
        <p>🔥 <strong>Zero Network Latency:</strong> Direct database access</p>
        <p>🔐 <strong>Enhanced Security:</strong> No external API exposure</p>
        <p>🧰 <strong>Type Safety:</strong> Shared TypeScript definitions</p>
        <p>📊 <strong>Better Caching:</strong> Server-side request optimization</p>
        <p>🚀 <strong>Production Ready:</strong> Single deployment to Vercel</p>
      </div>
    </div>

    <!-- Instructions -->
    <div class="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg">
      <h2 class="text-xl font-semibold mb-4">🎯 Getting Started</h2>
      <ol class="list-decimal list-inside space-y-2 text-sm">
        <li>Make sure your CMS is running on <a href="http://localhost:3001/admin" target="_blank" class="text-blue-600 hover:underline">localhost:3001/admin</a></li>
        <li>Create an admin user if you haven't already</li>
        <li>Add some test content (pages, posts, categories)</li>
        <li>Refresh this page to see the content appear</li>
        <li>Notice the instant load times thanks to local API mode! ⚡</li>
      </ol>
      
      <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 class="font-semibold mb-2">🛠️ Development Commands</h3>
        <div class="text-sm space-y-1">
          <p><code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">turbo dev</code> - Start both apps</p>
          <p><code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">turbo build</code> - Build both apps</p>
          <p><code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">turbo payload:generate-types</code> - Generate types</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PayloadDoc {
  id: string
  title?: string
  name?: string
  slug: string
  status?: string
  excerpt?: string
  description?: string
}

interface PayloadResponse {
  docs: PayloadDoc[]
  totalDocs: number
}

const { findCollection } = usePayloadAPI()

// Reactive state
const loading = ref({
  pages: true,
  posts: true,
  categories: true,
})

const pages = ref<PayloadResponse | null>(null)
const posts = ref<PayloadResponse | null>(null)
const categories = ref<PayloadResponse | null>(null)
const connectionError = ref<string | null>(null)

// Connection status computed
const connectionStatus = computed(() => {
  if (connectionError.value) {
    return {
      class: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
      message: `❌ Failed to connect to CMS: ${connectionError.value}`
    }
  }
  
  const allLoaded = !loading.value.pages && !loading.value.posts && !loading.value.categories
  if (allLoaded) {
    return {
      class: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
      message: '✅ Successfully connected to Payload CMS using Local API Mode!'
    }
  }
  
  return {
    class: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
    message: '🔄 Connecting to CMS...'
  }
})

// Load data
async function loadData() {
  try {
    // Load pages
    const pagesData = await findCollection<PayloadDoc>('pages', { limit: 10 })
    pages.value = pagesData
    loading.value.pages = false

    // Load posts
    const postsData = await findCollection<PayloadDoc>('posts', { limit: 10 })
    posts.value = postsData
    loading.value.posts = false

    // Load categories
    const categoriesData = await findCollection<PayloadDoc>('categories', { limit: 10 })
    categories.value = categoriesData
    loading.value.categories = false

  } catch (error) {
    console.error('Error loading CMS data:', error)
    connectionError.value = error instanceof Error ? error.message : 'Unknown error'
    loading.value = { pages: false, posts: false, categories: false }
  }
}

// Load data on mount
onMounted(() => {
  loadData()
})

// SEO
useHead({
  title: 'Local API Integration Test',
  meta: [
    { name: 'description', content: 'Test page for Payload CMS local API integration' }
  ]
})
</script> 