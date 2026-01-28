<script setup lang="ts">
interface DigestItem {
  id: string
  sourceId: string
  sourceName: string
  language: string
  title: string
  url: string
  publishedAt: string
  excerpt?: string
  contentKind?: 'content' | 'summary' | 'description'
  contentLength?: number
  hasRichContent?: boolean
  topics: string[]
}

interface DigestMeta {
  generatedAt: string
  windowHours: number
  sourcesRequested: number
  sourcesSucceeded: number
  itemsTotal: number
  itemsReturned: number
  errors: { sourceId: string, message: string }[]
}

interface DigestResponse {
  meta: DigestMeta
  items: DigestItem[]
}

const windowHours = ref(24)
const sourceFilter = ref('all')
const sortMode = ref<'recent' | 'source' | 'rich' | 'no-excerpt'>('recent')
const pageSize = ref(30)
const currentPage = ref(1)
const expanded = ref<Record<string, boolean>>({})
const { data, pending, error, refresh } = await useFetch<DigestResponse>('/api/digest/sources-test', {
  query: computed(() => ({ windowHours: windowHours.value })),
})

useHead({
  title: 'Digest Sources Test',
})

const sourcesList = computed(() => {
  const items = data.value?.items ?? []
  return Array.from(new Set(items.map(item => item.sourceName))).sort()
})

const filteredItems = computed(() => {
  const items = data.value?.items ?? []
  if (sourceFilter.value === 'all')
    return items
  return items.filter(item => item.sourceName === sourceFilter.value)
})

const sortedItems = computed(() => {
  const items = [...filteredItems.value]
  if (sortMode.value === 'source') {
    return items.sort((a, b) => {
      if (a.sourceName !== b.sourceName)
        return a.sourceName.localeCompare(b.sourceName)
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
  }
  if (sortMode.value === 'rich') {
    return items.sort((a, b) => {
      const ar = a.hasRichContent ? 1 : 0
      const br = b.hasRichContent ? 1 : 0
      if (ar !== br)
        return br - ar
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
  }
  if (sortMode.value === 'no-excerpt') {
    return items.sort((a, b) => {
      const ae = a.excerpt ? 1 : 0
      const be = b.excerpt ? 1 : 0
      if (ae !== be)
        return ae - be
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
  }
  return items.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
})

const totalPages = computed(() => Math.max(1, Math.ceil(sortedItems.value.length / pageSize.value)))
const pagedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return sortedItems.value.slice(start, start + pageSize.value)
})

function toggleExpand(id: string) {
  expanded.value[id] = !expanded.value[id]
}

watch([sourceFilter, sortMode, pageSize], () => {
  currentPage.value = 1
})
</script>

<template>
  <div class="min-h-screen bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <div class="mx-auto max-w-6xl w-full px-4 py-12 sm:px-6 lg:px-8">
      <header class="mb-10 space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <h1 class="font-cabinet text-3xl tracking-tight">
            Digest Sources Test
          </h1>
          <button
            class="border-black/10 bg-white hover:bg-black/5 dark:border-white/15 dark:bg-black dark:hover:bg-white/10 border rounded-full px-4 py-2 text-xs tracking-[0.18em] uppercase transition"
            @click="refresh()"
          >
            Refresh
          </button>
        </div>
        <p class="text-black/70 dark:text-white/70 max-w-2xl text-sm">
          Live fetch of RSS sources. Items can be filtered, sorted, and expanded when richer content is available.
        </p>
        <div class="flex flex-wrap items-center gap-4">
          <label class="text-black/60 dark:text-white/60 flex items-center gap-2 text-xs tracking-widest uppercase">
            Window (hours)
            <input
              v-model.number="windowHours"
              type="number"
              min="1"
              max="72"
              class="border-black/10 bg-white dark:border-white/15 dark:bg-black w-20 border rounded px-2 py-1 text-sm"
            >
          </label>
          <label class="text-black/60 dark:text-white/60 flex items-center gap-2 text-xs tracking-widest uppercase">
            Source
            <select
              v-model="sourceFilter"
              class="border-black/10 bg-white dark:border-white/15 dark:bg-black min-w-40 border rounded px-2 py-1 text-sm"
            >
              <option value="all">All</option>
              <option v-for="source in sourcesList" :key="source" :value="source">
                {{ source }}
              </option>
            </select>
          </label>
          <label class="text-black/60 dark:text-white/60 flex items-center gap-2 text-xs tracking-widest uppercase">
            Sort
            <select
              v-model="sortMode"
              class="border-black/10 bg-white dark:border-white/15 dark:bg-black min-w-36 border rounded px-2 py-1 text-sm"
            >
              <option value="recent">Most recent</option>
              <option value="source">By source</option>
              <option value="rich">Rich content first</option>
              <option value="no-excerpt">No excerpt first</option>
            </select>
          </label>
          <label class="text-black/60 dark:text-white/60 flex items-center gap-2 text-xs tracking-widest uppercase">
            Page size
            <select
              v-model.number="pageSize"
              class="border-black/10 bg-white dark:border-white/15 dark:bg-black w-24 border rounded px-2 py-1 text-sm"
            >
              <option :value="20">20</option>
              <option :value="30">30</option>
              <option :value="50">50</option>
            </select>
          </label>
          <span v-if="pending" class="text-black/60 dark:text-white/60 text-xs tracking-widest uppercase">
            Loading...
          </span>
          <span v-else-if="error" class="text-red-600 text-xs tracking-widest uppercase">
            Error loading feeds
          </span>
        </div>
      </header>

      <section v-if="data" class="grid mb-10 gap-6 md:grid-cols-2">
        <div class="border-black/10 dark:border-white/10 border rounded-lg p-5">
          <h2 class="text-black/60 dark:text-white/60 mb-3 text-xs tracking-widest uppercase">
            Meta
          </h2>
          <div class="text-sm space-y-1">
            <div>Generated: <span class="text-black/70 dark:text-white/70">{{ data.meta.generatedAt }}</span></div>
            <div>Window Hours: {{ data.meta.windowHours }}</div>
            <div>Sources: {{ data.meta.sourcesSucceeded }} / {{ data.meta.sourcesRequested }}</div>
            <div>Items: {{ data.meta.itemsReturned }} / {{ data.meta.itemsTotal }}</div>
            <div v-if="data.meta.itemsExcluded">Excluded: {{ data.meta.itemsExcluded }}</div>
          </div>
        </div>
        <div class="border-black/10 dark:border-white/10 border rounded-lg p-5">
          <h2 class="text-black/60 dark:text-white/60 mb-3 text-xs tracking-widest uppercase">
            Errors
          </h2>
          <div v-if="data.meta.errors.length === 0" class="text-black/70 dark:text-white/70 text-sm">
            No errors
          </div>
          <ul v-else class="text-sm space-y-2">
            <li v-for="err in data.meta.errors" :key="err.sourceId" class="text-red-600">
              {{ err.sourceId }} — {{ err.message }}
            </li>
          </ul>
        </div>
      </section>

      <section v-if="data">
        <div class="mb-4 flex items-center justify-between gap-4">
          <h2 class="text-black/60 dark:text-white/60 text-xs tracking-widest uppercase">
            Items
          </h2>
          <span class="text-black/60 dark:text-white/60 text-xs">Showing {{ pagedItems.length }} of {{ sortedItems.length }}</span>
        </div>
        <div class="grid gap-4">
          <article
            v-for="item in pagedItems"
            :key="item.id"
            class="border-black/10 hover:border-black/30 dark:border-white/10 dark:hover:border-white/30 border rounded-lg p-5 transition"
          >
            <div class="text-black/60 dark:text-white/60 mb-2 flex flex-wrap items-center gap-2 text-xs tracking-widest uppercase">
              <span>{{ item.sourceName }}</span>
              <span>•</span>
              <span>{{ new Date(item.publishedAt).toLocaleString() }}</span>
              <span>•</span>
              <span class="border-black/10 dark:border-white/20 border rounded-full px-2 py-0.5">
                {{ item.language.toUpperCase() }}
              </span>
              <span
                v-if="item.hasRichContent"
                class="border-emerald-500/30 dark:border-emerald-400/40 text-emerald-600 dark:text-emerald-300 border rounded-full px-2 py-0.5"
              >
                Rich RSS
              </span>
              <span
                v-else-if="item.excerpt"
                class="border-black/10 dark:border-white/20 text-black/60 dark:text-white/60 border rounded-full px-2 py-0.5"
              >
                Excerpt
              </span>
              <span
                v-else
                class="border-black/10 dark:border-white/20 text-black/40 dark:text-white/40 border rounded-full px-2 py-0.5"
              >
                No excerpt
              </span>
            </div>
            <a :href="item.url" target="_blank" rel="noopener" class="text-lg font-semibold hover:underline">
              {{ item.title }}
            </a>
            <div v-if="item.excerpt" class="mt-3">
              <button
                class="text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white text-xs tracking-widest uppercase transition"
                @click="toggleExpand(item.id)"
              >
                {{ expanded[item.id] ? 'Hide excerpt' : 'Show excerpt' }}
              </button>
              <p v-if="expanded[item.id]" class="text-black/70 dark:text-white/70 mt-2 text-sm">
                {{ item.excerpt }}
              </p>
            </div>
            <div class="mt-3 flex flex-wrap gap-2 text-xs">
              <span
                v-for="topic in item.topics"
                :key="topic"
                class="border-black/10 text-black/70 dark:border-white/20 dark:text-white/70 border rounded-full px-2 py-1"
              >
                {{ topic }}
              </span>
            </div>
          </article>
        </div>
        <div class="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div class="text-black/60 dark:text-white/60 text-xs tracking-widest uppercase">
            Page {{ currentPage }} / {{ totalPages }}
          </div>
          <div class="flex items-center gap-2">
            <button
              class="border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10 border rounded-full px-3 py-1 text-xs tracking-widest uppercase transition disabled:opacity-40"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              Prev
            </button>
            <button
              class="border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10 border rounded-full px-3 py-1 text-xs tracking-widest uppercase transition disabled:opacity-40"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
