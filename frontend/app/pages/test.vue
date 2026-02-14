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
  presets?: {
    id: string
    name: string
    googleMode: 'search' | 'topic' | 'topic-section' | 'top'
    googleQuery?: string
    googleTopicId?: string
    googleSectionId?: string
    googleHl?: string
    googleGl?: string
    googleCeid?: string
    language: 'de' | 'en'
    topics: string[]
  }[]
}

interface DigestResponse {
  meta: DigestMeta
  items: DigestItem[]
}

const windowHours = ref(24)
const presetId = ref('golem')
const sortMode = ref<'recent' | 'source' | 'rich' | 'no-excerpt'>('recent')
const pageSize = ref(30)
const currentPage = ref(1)
const expanded = ref<Record<string, boolean>>({})
const isMounted = ref(false)
const googleMode = ref<'search' | 'topic' | 'topic-section' | 'top'>('search')
const googleQuery = ref('site:reuters.com/technology')
const googleTopicId = ref('')
const googleSectionId = ref('')
const googleHl = ref('de-DE')
const googleGl = ref('DE')
const googleCeid = ref('')
const localePreset = ref<'de' | 'en' | 'custom'>('de')
const { data, pending, error, refresh } = await useFetch<DigestResponse>('/api/digest/sources-test', {
  query: computed(() => ({
    windowHours: windowHours.value,
    presetId: presetId.value,
    googleMode: googleMode.value,
    googleQuery: googleQuery.value,
    googleTopicId: googleTopicId.value || undefined,
    googleSectionId: googleSectionId.value || undefined,
    googleHl: googleHl.value || undefined,
    googleGl: googleGl.value || undefined,
    googleCeid: googleCeid.value || undefined,
  })),
})

useHead({
  title: 'Digest Explorer',
})

const presets = computed(() => data.value?.meta.presets ?? [])

const filteredItems = computed(() => data.value?.items ?? [])

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

const copyStatus = ref<'idle' | 'ok' | 'error'>('idle')

function clampWindowHours(value: number) {
  return Math.min(72, Math.max(1, value))
}

function incrementWindowHours(delta: number) {
  windowHours.value = clampWindowHours(windowHours.value + delta)
}

async function copyCurrentList() {
  if (!import.meta.client)
    return
  copyStatus.value = 'idle'
  const payload = {
    meta: {
      generatedAt: data.value?.meta.generatedAt ?? new Date().toISOString(),
      windowHours: windowHours.value,
      totalItems: sortedItems.value.length,
      pageSize: pageSize.value,
      currentPage: currentPage.value,
    },
    items: pagedItems.value,
  }
  const text = JSON.stringify(payload, null, 2)
  try {
    await navigator.clipboard.writeText(text)
    copyStatus.value = 'ok'
  }
  catch {
    copyStatus.value = 'error'
  }
}

function toggleExpand(id: string) {
  expanded.value[id] = !expanded.value[id]
}

function formatPublishedAt(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime()))
    return value
  return date.toLocaleString()
}

watch(localePreset, (value) => {
  if (value === 'de') {
    if (googleHl.value !== 'de-DE')
      googleHl.value = 'de-DE'
    if (googleGl.value !== 'DE')
      googleGl.value = 'DE'
    return
  }
  if (value === 'en') {
    if (googleHl.value !== 'en-US')
      googleHl.value = 'en-US'
    if (googleGl.value !== 'US')
      googleGl.value = 'US'
  }
})

watch([googleHl, googleGl], () => {
  if (googleHl.value === 'de-DE' && googleGl.value === 'DE') {
    if (localePreset.value !== 'de')
      localePreset.value = 'de'
    return
  }
  if (googleHl.value === 'en-US' && googleGl.value === 'US') {
    if (localePreset.value !== 'en')
      localePreset.value = 'en'
    return
  }
  if (localePreset.value !== 'custom')
    localePreset.value = 'custom'
})

watch(
  [presetId, sortMode, pageSize, googleMode, googleQuery, googleTopicId, googleSectionId, googleHl, googleGl, googleCeid],
  () => {
    currentPage.value = 1
  },
)

watch(presetId, () => {
  const preset = presets.value.find(item => item.id === presetId.value)
  if (!preset)
    return
  googleMode.value = preset.googleMode
  googleQuery.value = preset.googleQuery ?? ''
  googleTopicId.value = preset.googleTopicId ?? ''
  googleSectionId.value = preset.googleSectionId ?? ''
  if (preset.language === 'de') {
    googleHl.value = 'de-DE'
    googleGl.value = 'DE'
    localePreset.value = 'de'
  }
  else if (preset.language === 'en') {
    googleHl.value = 'en-US'
    googleGl.value = 'US'
    localePreset.value = 'en'
  }
  if (preset.googleHl)
    googleHl.value = preset.googleHl
  if (preset.googleGl)
    googleGl.value = preset.googleGl
  if (preset.googleCeid !== undefined)
    googleCeid.value = preset.googleCeid ?? ''
}, { immediate: true })

onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <div class="min-h-screen bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <div class="w-full px-0 py-8 md:py-12">
      <header class="mb-10 space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-6">
          <div class="space-y-1">
            <h1 class="font-nohemi text-balance text-4xl tracking-tight uppercase md:text-5xl">
              NEWS Explorer
            </h1>
            <div class="text-black/50 dark:text-white/50 text-xs tracking-[0.18em] uppercase">
              {{ sortedItems.length }} articles
            </div>
          </div>
          <button
            class="border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10 border rounded-full bg-pureWhite p-3 text-xs text-pureBlack tracking-[0.18em] uppercase transition dark:bg-pureBlack dark:text-pureWhite"
            aria-label="Refresh"
            @click="refresh()"
          >
            ↻
          </button>
          <button
            class="border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10 border rounded-full bg-pureWhite px-4 py-2 text-[10px] text-pureBlack tracking-[0.18em] uppercase transition dark:bg-pureBlack dark:text-pureWhite"
            type="button"
            @click="copyCurrentList()"
          >
            {{ copyStatus === 'ok' ? 'Copied' : 'Copy list' }}
          </button>
        </div>
        <div class="font-manrope flex flex-wrap items-center gap-4">
          <label class="text-black/60 dark:text-white/60 flex items-center gap-2 text-xs tracking-widest uppercase">
            Time
            <div class="border-black/10 dark:border-white/15 inline-flex items-center gap-2 border rounded-full bg-pureWhite px-2 py-1 text-pureBlack dark:bg-pureBlack dark:text-pureWhite">
              <button
                class="border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10 h-6 w-6 border rounded-full text-sm"
                type="button"
                @click="incrementWindowHours(-1)"
              >
                −
              </button>
              <span class="w-10 text-center text-xs">{{ windowHours }}h</span>
              <button
                class="border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10 h-6 w-6 border rounded-full text-sm"
                type="button"
                @click="incrementWindowHours(1)"
              >
                +
              </button>
            </div>
          </label>
          <label class="text-black/60 dark:text-white/60 flex items-center gap-2 text-xs tracking-widest uppercase">
            Source
            <select
              v-model="presetId"
              class="border-black/10 dark:border-white/15 min-w-48 border rounded bg-pureWhite px-2 py-1 text-sm text-pureBlack dark:bg-pureBlack dark:text-pureWhite"
            >
              <option v-for="preset in presets" :key="preset.id" :value="preset.id">
                {{ preset.name }}
              </option>
            </select>
          </label>
          <label class="text-black/60 dark:text-white/60 flex items-center gap-2 text-xs tracking-widest uppercase">
            Mode
            <select
              v-model="googleMode"
              class="border-black/10 dark:border-white/15 min-w-32 border rounded bg-pureWhite px-2 py-1 text-sm text-pureBlack dark:bg-pureBlack dark:text-pureWhite"
            >
              <option value="top">Top</option>
              <option value="search">Search</option>
              <option value="topic">Topic</option>
              <option value="topic-section">Topic + Section</option>
            </select>
          </label>
          <label class="text-black/60 dark:text-white/60 flex items-center gap-2 text-xs tracking-widest uppercase">
            Sort
            <select
              v-model="sortMode"
              class="border-black/10 dark:border-white/15 min-w-32 border rounded bg-pureWhite px-2 py-1 text-sm text-pureBlack dark:bg-pureBlack dark:text-pureWhite"
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
              class="border-black/10 dark:border-white/15 w-24 border rounded bg-pureWhite px-2 py-1 text-sm text-pureBlack dark:bg-pureBlack dark:text-pureWhite"
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
        <div class="border-black/10 dark:border-white/10 grid gap-3 border rounded-2xl p-5">
          <label
            v-if="googleMode === 'search'"
            class="text-black/60 dark:text-white/60 text-xs tracking-widest uppercase"
          >
            Query
            <input
              v-model="googleQuery"
              class="border-black/10 dark:border-white/15 placeholder:text-black/40 dark:placeholder:text-white/40 mt-2 w-full border rounded-lg bg-pureWhite px-3 py-3 text-base text-pureBlack dark:bg-pureBlack dark:text-pureWhite"
              placeholder="site:reuters.com/technology"
            >
          </label>
          <div v-else class="grid gap-3 md:grid-cols-2">
            <label class="text-black/60 dark:text-white/60 text-xs tracking-widest uppercase">
              Topic ID
              <input
                v-model="googleTopicId"
                class="border-black/10 placeholder:text-black/40 dark:border-white/15 dark:placeholder:text-white/40 mt-2 w-full border rounded-lg bg-pureWhite px-3 py-3 text-sm text-pureBlack dark:bg-pureBlack dark:text-pureWhite"
                placeholder="CAAqJggKIiBDQkFTR..."
              >
            </label>
            <label
              v-if="googleMode === 'topic-section'"
              class="text-black/60 dark:text-white/60 text-xs tracking-widest uppercase"
            >
              Section ID
              <input
                v-model="googleSectionId"
                class="border-black/10 placeholder:text-black/40 dark:border-white/15 dark:placeholder:text-white/40 mt-2 w-full border rounded-lg bg-pureWhite px-3 py-3 text-sm text-pureBlack dark:bg-pureBlack dark:text-pureWhite"
                placeholder="CAQiSkNCQV..."
              >
            </label>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <label class="text-black/60 dark:text-white/60 flex items-center gap-2 text-xs tracking-widest uppercase">
              Locale
              <select
                v-model="localePreset"
                class="border-black/10 dark:border-white/15 min-w-32 border rounded bg-pureWhite px-2 py-1 text-sm text-pureBlack dark:bg-pureBlack dark:text-pureWhite"
              >
                <option value="de">Deutsch (DE)</option>
                <option value="en">English (US)</option>
                <option value="custom">Custom</option>
              </select>
            </label>
            <label class="text-black/60 dark:text-white/60 flex items-center gap-2 text-xs tracking-widest uppercase">
              hl
              <input
                v-model="googleHl"
                class="border-black/10 placeholder:text-black/40 dark:border-white/15 dark:placeholder:text-white/40 w-24 border rounded bg-pureWhite px-2 py-1 text-sm text-pureBlack dark:bg-pureBlack dark:text-pureWhite"
                placeholder="de-DE"
              >
            </label>
            <label class="text-black/60 dark:text-white/60 flex items-center gap-2 text-xs tracking-widest uppercase">
              gl
              <input
                v-model="googleGl"
                class="border-black/10 placeholder:text-black/40 dark:border-white/15 dark:placeholder:text-white/40 w-16 border rounded bg-pureWhite px-2 py-1 text-sm text-pureBlack dark:bg-pureBlack dark:text-pureWhite"
                placeholder="DE"
              >
            </label>
            <label class="text-black/60 dark:text-white/60 flex items-center gap-2 text-xs tracking-widest uppercase">
              ceid
              <input
                v-model="googleCeid"
                class="border-black/10 placeholder:text-black/40 dark:border-white/15 dark:placeholder:text-white/40 w-28 border rounded bg-pureWhite px-2 py-1 text-sm text-pureBlack dark:bg-pureBlack dark:text-pureWhite"
                placeholder="(optional)"
              >
            </label>
          </div>
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
            <div v-if="data.meta.itemsExcluded">
              Excluded: {{ data.meta.itemsExcluded }}
            </div>
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
        </div>
        <div class="grid gap-4">
          <article
            v-for="item in pagedItems"
            :key="item.id"
            class="border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 border rounded-lg p-5 transition"
          >
            <div class="text-black/60 dark:text-white/60 mb-2 flex flex-wrap items-center gap-2 text-xs tracking-widest uppercase">
              <span>{{ item.sourceName }}</span>
              <span>•</span>
              <span>{{ isMounted ? formatPublishedAt(item.publishedAt) : item.publishedAt }}</span>
              <span>•</span>
              <span class="border-black/10 dark:border-white/20 border rounded-full px-2 py-0.5">
                {{ item.language.toUpperCase() }}
              </span>
              <span
                v-if="item.hasRichContent"
                class="border-emerald-500/30 text-emerald-600 dark:border-emerald-400/40 dark:text-emerald-300 border rounded-full px-2 py-0.5"
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
                class="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white text-xs tracking-widest uppercase transition"
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
