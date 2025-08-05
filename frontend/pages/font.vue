<script lang="ts" setup>
const inputText = ref('The quick brown fox jumps over the lazy dog 0123456789')

const fonts = [
  { name: 'Electric', class: 'font-electric' },
  { name: 'Recoleta', class: 'font-recoleta' },
  { name: 'Ginger', class: 'font-ginger' },
  { name: 'Prata', class: 'font-prata' },
  { name: 'Manrope', class: 'font-manrope' },
  { name: 'Geist Regular', class: 'geist-regular' },
  { name: 'Geist Thin', class: 'geist-thin' },
  { name: 'Space Grotesk', class: 'space-grotesk-regular' },
  { name: 'Boldonse', class: 'boldonse-regular' },
  { name: 'Audiowide', class: 'audiowide-regular' },
  { name: 'Zen Dots', class: 'zen-dots-regular' },
  { name: 'Bruno Ace SC', class: 'bruno-ace-sc-regular' },
  { name: 'Major Mono Display', class: 'major-mono-display-regular' },
  { name: 'Nova Square', class: 'font-nova' },
  { name: 'Figtree', class: 'figtree-regular' },
  { name: 'JetBrains Mono', class: 'jetbrains-mono-regular' },
  { name: 'Crimson Text', class: 'crimson-text-regular' },
  { name: 'Lora', class: 'font-lora' },
  { name: 'Libre Baskerville', class: 'font-baskerville' },
  { name: 'EB Garamond', class: 'font-eb-garamond' },
  { name: 'Cormorant Garamond', class: 'font-cormorant-garamond' },
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Font Preview
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Preview all your custom fonts in 4xl size
        </p>
      </div>

      <!-- Input Field -->
      <div class="mb-12">
        <label for="font-input" class="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Custom Text
        </label>
        <input
          id="font-input"
          v-model="inputText"
          type="text"
          class="w-full p-4 text-lg border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter text to preview..."
        />
      </div>

      <!-- Font Previews -->
      <div class="space-y-16">
        <div
          v-for="font in fonts"
          :key="font.name"
          class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <!-- Font Name -->
          <div class="mb-6">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
              {{ font.name }}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 font-mono">
              Class: {{ font.class }}
            </p>
          </div>

          <!-- Font Preview -->
          <div class="mb-6">
            <div
              :class="[font.class, 'text-4xl text-gray-900 dark:text-white leading-tight']"
            >
              {{ inputText }}
            </div>
          </div>

          <!-- Sample Characters -->
          <div class="grid grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Uppercase
              </h3>
              <div
                :class="[font.class, 'text-2xl text-gray-900 dark:text-white']"
              >
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Lowercase
              </h3>
              <div
                :class="[font.class, 'text-2xl text-gray-900 dark:text-white']"
              >
                abcdefghijklmnopqrstuvwxyz
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Numbers
              </h3>
              <div
                :class="[font.class, 'text-2xl text-gray-900 dark:text-white']"
              >
                0123456789
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Special Characters
              </h3>
              <div
                :class="[font.class, 'text-2xl text-gray-900 dark:text-white']"
              >
                !@#$%^&*()_+-=[]{}|;':",./<>?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 