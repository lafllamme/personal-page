<script lang="ts" setup>
import { fonts } from '@/data/fonts.model'

const inputText = ref('The quick brown fox jumps over the lazy dog 0123456789')
const searchQuery = ref('')
const fontWeight = ref(400)
const fontSize = ref(70)

// Computed properties for filtering and font weight classes
const filteredFonts = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  return fonts
    .filter((font) => {
      if (!query)
        return true

      return (
        font.name.toLowerCase().includes(query)
        || font.class.toLowerCase().includes(query)
        || font.category.toLowerCase().includes(query)
      )
    })
    .sort((a, b) => a.name.localeCompare(b.name))
})

function getFontClass(fontClass: string) {
  return fontClass
}

// Sample text variations
const sampleTexts = {
  short: 'Hello World',
  medium: 'The quick brown fox',
  long: 'The quick brown fox jumps over the lazy dog 0123456789',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:"./<>?',
}

const fontsCount = computed(() => fonts.length)
const previewWeightStyle = computed(() => ({ fontWeight: fontWeight.value }))
const heroStyle = computed(() => ({
  fontSize: `${fontSize.value}px`,
  fontWeight: fontWeight.value,
}))
</script>

<template>
  <div class="min-h-screen bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <div class="mx-auto px-6 pb-24">
      <header class="pt-6">
        <div
          class="grid grid-cols-1 border border-pureBlack/10 md:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr] dark:border-pureWhite/10"
        >
          <div class="flex items-center justify-between md:border-l md:border-pureBlack/10 dark:md:border-pureWhite/10">
            <div class="text-sm tracking-widest uppercase">
              Fonts
            </div>
            <div class="text-sm tabular-nums">
              {{ fontsCount }}
            </div>
          </div>
          <div class="flex items-center justify-between p-6 md:border-l md:border-pureBlack/10 dark:md:border-pureWhite/10">
            <div class="text-sm tracking-widest uppercase">
              Pairs
            </div>
            <div class="text-sm tabular-nums">
              0
            </div>
          </div>
          <div class="flex items-center justify-between p-6 md:border-l md:border-pureBlack/10 dark:md:border-pureWhite/10">
            <div class="text-sm tracking-widest uppercase">
              Licenses
            </div>
            <div class="text-sm tabular-nums">
              0
            </div>
          </div>
          <div
            class="flex items-center justify-between gap-6 p-6 md:border-l md:border-pureBlack/10 dark:md:border-pureWhite/10"
          >
            <div class="flex items-center gap-2">
              <span class="h-0.5 w-8 bg-pureBlack/80 dark:bg-pureWhite/80" />
              <span class="h-0.5 w-8 bg-pureBlack/80 dark:bg-pureWhite/80" />
              <span class="h-0.5 w-8 bg-pureBlack/80 dark:bg-pureWhite/80" />
            </div>
            <div class="text-nowrap text-sm color-pureBlack/60 dark:color-pureWhite/60">
              No styles selected
            </div>
          </div>
        </div>
      </header>

      <section class="mt-10 border-b border-t border-pureBlack/10 py-6 dark:border-pureWhite/10">
        <div class="grid grid-cols-1 items-center gap-6 lg:grid-cols-[2fr_1fr_1fr]">
          <div class="flex items-center gap-3 border-b border-pureBlack/10 border-solid pb-3 dark:border-pureWhite/10 focus-within:border-pureBlack dark:focus-within:border-pureWhite">
            <Icon name="ri:search-line" class="size-5 color-pureBlack/60 dark:color-pureWhite/60" />
            <input
              id="font-search"
              v-model="searchQuery"
              type="text"
              class="w-full bg-transparent text-sm color-pureBlack tracking-widest uppercase dark:color-pureWhite placeholder:color-pureBlack/40 focus:outline-none dark:placeholder:color-pureWhite/40"
              placeholder="Search"
            >
          </div>
          <button
            class="flex items-center justify-between border-b border-pureBlack/10 pb-3 text-sm tracking-widest uppercase dark:border-pureWhite/10"
            type="button"
          >
            Serif
            <Icon name="ri:arrow-down-s-line" class="size-5" />
          </button>
          <div class="flex items-center justify-between gap-4 border-b border-pureBlack/10 pb-3 dark:border-pureWhite/10">
            <div class="text-sm tracking-widest uppercase">
              Size
            </div>
            <div class="flex items-center gap-4">
              <div class="text-sm tabular-nums">
                {{ fontSize }}px
              </div>
              <input
                v-model.number="fontSize"
                type="range"
                min="24"
                max="160"
                class="w-36 accent-pureBlack dark:accent-pureWhite"
              >
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 mt-8 gap-6 lg:grid-cols-[2fr_1fr]">
          <div>
            <div class="flex flex-wrap gap-3 text-xs tracking-widest uppercase">
              <button
                v-for="(text, key) in sampleTexts"
                :key="key"
                :class="useClsx(
                  'border-b border-transparent pb-1 transition-colors',
                  inputText === text
                    ? 'border-pureBlack dark:border-pureWhite'
                    : 'color-pureBlack/50 dark:color-pureWhite/50 hover:color-pureBlack dark:hover:color-pureWhite',
                )"
                type="button"
                @click="inputText = text"
              >
                {{ key.charAt(0).toUpperCase() + key.slice(1) }}
              </button>
            </div>
            <div class="mt-4 border-b border-pureBlack/10 pb-3 dark:border-pureWhite/10">
              <input
                id="font-input"
                v-model="inputText"
                type="text"
                class="w-full bg-transparent text-2xl color-pureBlack dark:color-pureWhite placeholder:color-pureBlack/40 dark:placeholder:color-pureWhite/40"
                placeholder="Enter text..."
              >
            </div>
          </div>
          <div class="flex items-end justify-between gap-2">
            <div class="text-sm color-pureBlack/60 tracking-widest uppercase dark:color-pureWhite/60">
              Weight
            </div>
            <div class="flex items-center gap-4">
              <div class="text-sm color-pureBlack/60 tabular-nums dark:color-pureWhite/60">
                {{ fontWeight }}
              </div>
              <input
                v-model.number="fontWeight"
                type="range"
                min="100"
                max="900"
                step="100"
                class="w-36 accent-pureBlack dark:accent-pureWhite"
              >
            </div>
          </div>
        </div>
      </section>

      <div class="mt-10 flex flex-col gap-4 text-xs tracking-widest uppercase md:flex-row md:items-center md:justify-between">
        <div class="flex items-center gap-6">
          <span class="text-2xl color-pureBlack dark:color-pureWhite">{{ filteredFonts.length }}</span>
          <span class="color-pureBlack/50 dark:color-pureWhite/50">List view</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="color-pureBlack/50 dark:color-pureWhite/50">Sort by</span>
          <span class="border-b border-pureBlack pb-1 dark:border-pureWhite">Alphabetical</span>
          <span class="color-pureBlack/50 dark:color-pureWhite/50">Popular</span>
        </div>
      </div>

      <div v-if="filteredFonts.length > 0" class="mt-10 space-y-12">
        <div
          v-for="font in filteredFonts"
          :key="font.name"
          class="border border-pureBlack rounded-3xl border-solid p-8 dark:border-pureWhite"
        >
          <div class="mb-6 flex flex-wrap items-center justify-between gap-4 text-xs tracking-widest uppercase">
            <div class="flex items-center gap-3">
              <span class="color-pureBlack/60 dark:color-pureWhite/60">{{ font.category }}</span>
              <span class="h-1 w-1 rounded-full bg-pureBlack/50 dark:bg-pureWhite/50" />
              <span class="color-pureBlack/60 dark:color-pureWhite/60">{{ font.class }}</span>
            </div>
            <span class="color-pureBlack/50 dark:color-pureWhite/50">Variable</span>
          </div>

          <div class="mb-6 text-6xl leading-none" :class="[getFontClass(font.class)]" :style="heroStyle">
            {{ inputText }}
          </div>

          <div class="grid grid-cols-1 gap-6 text-sm color-pureBlack/60 tracking-widest uppercase md:grid-cols-4 dark:color-pureWhite/60">
            <div>
              <div class="mb-2 text-[10px]">
                Uppercase
              </div>
              <div class="text-base color-pureBlack dark:color-pureWhite" :class="[getFontClass(font.class)]" :style="previewWeightStyle">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </div>
            </div>
            <div>
              <div class="mb-2 text-[10px]">
                Lowercase
              </div>
              <div class="text-base color-pureBlack dark:color-pureWhite" :class="[getFontClass(font.class)]" :style="previewWeightStyle">
                abcdefghijklmnopqrstuvwxyz
              </div>
            </div>
            <div>
              <div class="mb-2 text-[10px]">
                Numbers
              </div>
              <div class="text-base color-pureBlack dark:color-pureWhite" :class="[getFontClass(font.class)]" :style="previewWeightStyle">
                0123456789
              </div>
            </div>
            <div>
              <div class="mb-2 text-[10px]">
                Symbols
              </div>
              <div class="text-base color-pureBlack dark:color-pureWhite" :class="[getFontClass(font.class)]" :style="previewWeightStyle">
                {{ `!@#$ % ^ & * ()_ + -= []{}|;':",./<>?` }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="py-16 text-center">
        <Icon name="ri:search-line" class="mx-auto mb-4 size-12 color-pureBlack/40 dark:color-pureWhite/40" />
        <h3 class="mb-2 text-2xl color-pureBlack dark:color-pureWhite">
          No fonts found
        </h3>
        <p class="color-pureBlack/60 dark:color-pureWhite/60">
          Try adjusting your search terms or browse all {{ fonts.length }} fonts
        </p>
        <button
          class="mt-6 border-b border-pureBlack pb-1 text-sm tracking-widest uppercase dark:border-pureWhite"
          @click="searchQuery = ''"
        >
          Clear Search
        </button>
      </div>
    </div>
  </div>
</template>
