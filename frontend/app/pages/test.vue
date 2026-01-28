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
const { data, pending, error, refresh } = await useFetch<DigestResponse>('/api/digest/sources-test', {
  query: computed(() => ({ windowHours: windowHours.value })),
})

useHead({
  title: 'Digest Sources Test',
})
</script>

<template>
  <div class="min-h-screen bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <div class="mx-auto max-w-5xl w-full px-6 py-16">
      <header class="mb-10 flex flex-col gap-4">
        <div class="flex items-center justify-between gap-4">
          <h1 class="font-cabinet text-3xl tracking-tight">
            Digest Sources Test
          </h1>
          <button
            class="border-black/10 bg-white hover:bg-black/5 dark:border-white/15 dark:bg-black dark:hover:bg-white/10 border rounded-md px-4 py-2 text-sm tracking-[0.18em] uppercase transition"
            @click="refresh()"
          >
            Refresh
          </button>
        </div>
        <p class="text-black/70 dark:text-white/70 max-w-2xl text-sm">
          Live fetch of RSS sources. This is a raw view of normalized items (no dedupe or LLM yet).
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
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-black/60 dark:text-white/60 text-xs tracking-widest uppercase">
            Items
          </h2>
          <span class="text-black/60 dark:text-white/60 text-xs">Showing {{ data.items.length }}</span>
        </div>
        <div class="grid gap-4">
          <article
            v-for="item in data.items"
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
            </div>
            <a :href="item.url" target="_blank" rel="noopener" class="text-lg font-semibold hover:underline">
              {{ item.title }}
            </a>
            <p v-if="item.excerpt" class="text-black/70 dark:text-white/70 mt-2 text-sm">
              {{ item.excerpt }}
            </p>
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
      </section>
    </div>
  </div>
</template>
