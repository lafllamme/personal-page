<script lang="ts" setup>
import { useMenu } from '@/stores/menu'
import { ref } from 'vue'

const menuStore = useMenu()
const hasInputFocus = ref(false)
</script>

<template>
  <div class="mb-10 mt-10">
    <div
      class="relative flex items-center border rounded-3xl border-solid px-4 py-2 color-pureBlack dark:color-pureWhite"
    >
      <input
        id="search"
        v-model="menuStore.searchQuery"
        :class="useClsx(
          'geist-regular peer tracking-normal',
          'w-full bg-transparent rounded-sm',
          'text-md placeholder:color-gray-10',
          'focus:outline-none focus:ring-0',
        )"
        placeholder=""
        type="search"
        @blur="hasInputFocus = false"
        @focus="hasInputFocus = true"
      >
      <label
        v-show="!menuStore.searchQuery"
        :class="useClsx(
          hasInputFocus && 'slide-out-blurred-top',
          'color-gray-10 peer-focus:color-mint-8 transition-all duration-300 ease-out',
          'pointer-events-none absolute left-4 top-1/2 transform',
          'peer-focus:top-4 -translate-y-1/2 animation-fill-forwards peer-focus:text-xs peer-focus:-translate-y-2',
        )"
        for="search"
      >
        Search
      </label>
      <div class="pointer-events-none">
        <div class="relative h-8 w-8">
          <Icon
            :class="{ 'opacity-0 scale-95': hasInputFocus, 'opacity-100 scale-100': !hasInputFocus }"
            class="absolute h-full w-full transition-all duration-300 ease-out"
            name="ri:search-line"
          />
          <Icon
            :class="{ 'opacity-100 scale-100': hasInputFocus, 'opacity-0 scale-95': !hasInputFocus }"
            class="absolute h-full w-full transition-all duration-300 ease-out"
            name="ri:search-2-fill"
          />
        </div>
      </div>
    </div>

    <!-- Search Results Info -->
    <div v-if="menuStore.searchQuery" class="mt-2 flex items-center justify-between text-xs">
      <span class="text-gray-10">
        {{
          menuStore.showResults
            ? `${menuStore.searchResults?.length || 0} results found`
            : "No results found"
        }}
      </span>
      <span
        v-if="menuStore.showResults"
        class="border border-mint-7/30 rounded-full bg-mint-5/20 px-2 py-0.5 text-xs text-jade-11"
      >
        {{ menuStore.searchResults?.length }} sections
      </span>
    </div>
  </div>
</template>
