<script lang="ts" setup>
const inputText = ref('The quick brown fox jumps over the lazy dog 0123456789')
const searchQuery = ref('')
const selectedWeight = ref<'light' | 'medium' | 'regular'>('regular')

const fonts = [
  { name: 'Electric', class: 'font-electric', category: 'display' },
  { name: 'Recoleta', class: 'font-recoleta', category: 'serif' },
  { name: 'Ginger', class: 'font-ginger', category: 'display' },
  { name: 'Prata', class: 'font-prata', category: 'serif' },
  { name: 'Manrope', class: 'font-manrope', category: 'sans' },
  { name: 'Geist Regular', class: 'geist-regular', category: 'sans' },
  { name: 'Geist Thin', class: 'geist-thin', category: 'sans' },
  { name: 'Space Grotesk', class: 'space-grotesk-regular', category: 'sans' },
  { name: 'Boldonse', class: 'boldonse-regular', category: 'display' },
  { name: 'Audiowide', class: 'audiowide-regular', category: 'display' },
  { name: 'Zen Dots', class: 'zen-dots-regular', category: 'display' },
  { name: 'Bruno Ace SC', class: 'bruno-ace-sc-regular', category: 'display' },
  { name: 'Major Mono Display', class: 'major-mono-display-regular', category: 'mono' },
  { name: 'Nova Square', class: 'font-nova', category: 'display' },
  { name: 'Figtree', class: 'figtree-regular', category: 'sans' },
  { name: 'JetBrains Mono', class: 'jetbrains-mono-regular', category: 'mono' },
  { name: 'Crimson Text', class: 'crimson-text-regular', category: 'serif' },
  { name: 'Lora', class: 'font-lora', category: 'serif' },
  { name: 'Libre Baskerville', class: 'font-baskerville', category: 'serif' },
  { name: 'EB Garamond', class: 'font-eb-garamond', category: 'serif' },
  { name: 'Cormorant Garamond', class: 'font-cormorant-garamond', category: 'serif' },
  { name: 'Zalando Sans Expanded', class: 'zalando-sans-expanded', category: 'sans' },
]

// Computed properties for filtering and font weight classes
const filteredFonts = computed(() => {
  if (!searchQuery.value)
    return fonts

  const query = searchQuery.value.toLowerCase()
  return fonts.filter(font =>
    font.name.toLowerCase().includes(query)
    || font.class.toLowerCase().includes(query)
    || font.category.toLowerCase().includes(query),
  )
})

const weightClasses = {
  light: 'font-light',
  medium: 'font-medium',
  regular: 'font-normal',
}

function getFontClass(fontClass: string) {
  return `${fontClass} ${weightClasses[selectedWeight.value]}`
}

// Sample text variations
const sampleTexts = {
  short: 'Hello World',
  medium: 'The quick brown fox',
  long: 'The quick brown fox jumps over the lazy dog 0123456789',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:"./<>?',
}
</script>

<template>
  <div class="min-h-screen p-8">
    <div class="mx-auto max-w-7xl">
      <!-- Header -->
      <div class="mb-12">
        <h1 class="mb-4 text-6xl color-pureBlack font-bold dark:color-pureWhite">
          Font Preview
        </h1>
        <p class="text-xl color-gray-11 dark:color-gray-10">
          Preview all your custom fonts with different weights and sizes
        </p>
      </div>

      <!-- Controls Section -->
      <div class="mb-12 space-y-8">
        <!-- Search and Weight Controls -->
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <!-- Enhanced Search Bar -->
          <div class="relative">
            <label for="font-search" class="mb-4 block text-lg color-pureBlack font-semibold dark:color-pureWhite">
              Search Fonts
            </label>
            <div class="relative">
              <Icon
                name="ri:search-line"
                class="absolute left-4 top-1/2 size-5 transform color-gray-10 -translate-y-1/2"
              />
              <input
                id="font-search"
                v-model="searchQuery"
                type="text"
                class="bg-white w-full border border-gray-7 rounded-xl py-4 pl-12 pr-4 text-lg color-pureBlack transition-all duration-200 dark:border-gray-6 focus:border-transparent dark:bg-gray-8 dark:color-pureWhite focus:ring-2 focus:ring-mint-11"
                placeholder="Search by name, class, or category..."
              >
              <div
                v-if="searchQuery"
                class="absolute right-4 top-1/2 transform cursor-pointer transition-colors -translate-y-1/2 hover:color-gray-12"
                @click="searchQuery = ''"
              >
                <Icon name="ri:close-line" class="size-5" />
              </div>
            </div>
            <p class="mt-2 text-sm color-gray-10">
              {{ filteredFonts.length }} of {{ fonts.length }} fonts
            </p>
          </div>

          <!-- Font Weight Selector -->
          <div>
            <label class="mb-4 block text-lg color-pureBlack font-semibold dark:color-pureWhite">
              Font Weight
            </label>
            <div class="flex space-x-2">
              <button
                v-for="weight in ['light', 'medium', 'regular']"
                :key="weight"
                :class="useClsx(
                  'px-6 py-3 rounded-lg font-medium transition-all duration-200',
                  selectedWeight === weight
                    ? 'bg-mint-11 color-pureWhite shadow-lg'
                    : 'bg-white dark:bg-gray-8 color-gray-12 dark:color-gray-10 border border-gray-7 dark:border-gray-6 hover:bg-gray-1 dark:hover:bg-gray-7',
                )"
                @click="selectedWeight = weight as any"
              >
                {{ weight.charAt(0).toUpperCase() + weight.slice(1) }}
              </button>
            </div>
          </div>
        </div>

        <!-- Custom Text Input -->
        <div>
          <label for="font-input" class="mb-4 block text-lg color-pureBlack font-semibold dark:color-pureWhite">
            Custom Text
          </label>
          <div class="grid grid-cols-1 mb-4 gap-4 lg:grid-cols-4 md:grid-cols-2">
            <button
              v-for="(text, key) in sampleTexts"
              :key="key"
              :class="useClsx(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                inputText === text
                  ? 'bg-sand-12 color-pureWhite'
                  : 'bg-white dark:bg-gray-8 color-gray-12 dark:color-gray-10 border border-gray-7 dark:border-gray-6 hover:bg-gray-1 dark:hover:bg-gray-7',
              )"
              @click="inputText = text"
            >
              {{ key.charAt(0).toUpperCase() + key.slice(1) }}
            </button>
          </div>
          <input
            id="font-input"
            v-model="inputText"
            type="text"
            class="bg-white w-full border border-gray-7 rounded-xl p-4 text-lg color-pureBlack transition-all duration-200 dark:border-gray-6 focus:border-transparent dark:bg-gray-8 dark:color-pureWhite focus:ring-2 focus:ring-mint-11"
            placeholder="Enter text to preview..."
          >
        </div>
      </div>

      <!-- Font Previews -->
      <div v-if="filteredFonts.length > 0" class="space-y-16">
        <div
          v-for="font in filteredFonts"
          :key="font.name"
          class="bg-white border border-gray-7 rounded-2xl p-8 shadow-lg transition-all duration-300 dark:border-gray-6 dark:bg-gray-8 hover:shadow-xl"
        >
          <!-- Font Header -->
          <div class="mb-8">
            <div class="mb-4 flex items-center justify-between">
              <h2 class="text-3xl color-pureBlack font-semibold dark:color-pureWhite">
                {{ font.name }}
              </h2>
              <span
                class="rounded-full bg-sand-3 px-3 py-1 text-sm color-sand-11 font-medium dark:bg-gray-7 dark:color-gray-10"
              >
                {{ font.category }}
              </span>
            </div>
            <p class="text-sm color-gray-10 font-mono">
              Class: {{ font.class }}
            </p>
          </div>

          <!-- Main Font Preview -->
          <div class="mb-8 rounded-xl bg-sand-2 p-6 dark:bg-gray-7">
            <div
              class="text-4xl color-pureBlack leading-tight dark:color-pureWhite" :class="[getFontClass(font.class)]"
            >
              {{ inputText }}
            </div>
          </div>

          <!-- Sample Characters Grid -->
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 class="mb-3 text-lg color-pureBlack font-semibold dark:color-pureWhite">
                Uppercase
              </h3>
              <div
                class="text-2xl color-pureBlack dark:color-pureWhite" :class="[getFontClass(font.class)]"
              >
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </div>
            </div>
            <div>
              <h3 class="mb-3 text-lg color-pureBlack font-semibold dark:color-pureWhite">
                Lowercase
              </h3>
              <div
                class="text-2xl color-pureBlack dark:color-pureWhite" :class="[getFontClass(font.class)]"
              >
                abcdefghijklmnopqrstuvwxyz
              </div>
            </div>
            <div>
              <h3 class="mb-3 text-lg color-pureBlack font-semibold dark:color-pureWhite">
                Numbers
              </h3>
              <div
                class="text-2xl color-pureBlack dark:color-pureWhite" :class="[getFontClass(font.class)]"
              >
                0123456789
              </div>
            </div>
            <div>
              <h3 class="mb-3 text-lg color-pureBlack font-semibold dark:color-pureWhite">
                Special Characters
              </h3>
              <div
                class="text-2xl color-pureBlack dark:color-pureWhite" :class="[getFontClass(font.class)]"
              >
                {{ `!@#$ % ^ & * ()_ + -= []{}|;':",./<>?` }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-else class="py-16 text-center">
        <Icon name="ri:search-line" class="mx-auto mb-4 size-16 color-gray-10" />
        <h3 class="mb-2 text-2xl color-pureBlack font-semibold dark:color-pureWhite">
          No fonts found
        </h3>
        <p class="color-gray-10">
          Try adjusting your search terms or browse all {{ fonts.length }} fonts
        </p>
        <button
          class="mt-4 rounded-lg bg-mint-11 px-6 py-3 color-pureWhite transition-colors hover:bg-mint-10"
          @click="searchQuery = ''"
        >
          Clear Search
        </button>
      </div>
    </div>
  </div>
</template>
