<script lang="ts" setup>
import Link from '@/components/ui/Link/Link.vue'
import { useMenu } from '@/stores/menu'

const menuStore = useMenu()
const { searchResults, showResults, showNoResults, searchQuery } = storeToRefs(menuStore)
const { toggleMenu } = menuStore

function highlightText(text: string, query: string) {
  if (!query.trim())
    return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part) => {
    if (regex.test(part)) {
      return `<mark class="bg-mint-5/30 text-jade-11 rounded px-1">${part}</mark>`
    }
    return part
  }).join('')
}
</script>

<template>
  <div>
    <!-- Search Results -->
    <TransitionGroup
      v-show="showResults"
      appear
      class="space-y-0"
      name="list"
      tag="div"
    >
      <div
        v-for="result in searchResults" :key="result.id"
        class="border-b border-gray-7/30 last:border-b-0"
      >
        <button
          :class="useClsx(
            'w-full flex items-center justify-between px-6 py-5 text-left',
            'text-sm font-medium color-pureBlack dark:color-pureWhite',
            'hover:text-white hover:bg-gradient-to-r hover:from-gray-8/20 hover:to-transparent',
            'transition-all duration-300',
          )"
        >
          <div class="flex items-center space-x-3">
            <div class="h-2 w-2 rounded-full bg-mint-9/60" />
            <span
              class="font-semibold tracking-wide"
              v-html="highlightText(result.title, searchQuery)"
            />
          </div>
          <span
            v-if="result.children && result.children.length"
            class="border border-mint-7/30 rounded-full bg-mint-5/20 px-2 py-0.5 text-xs text-jade-11"
          >
            {{ result.children?.length || 0 }}
          </span>
        </button>

        <div
          v-if="result.children && result.children.length"
          class="animate-in px-6 pb-4 duration-300 slide-in-from-top-3 space-y-2"
        >
          <div v-for="child in result.children" :key="child.id">
            <Link
              :class="useClsx(
                'flex items-center space-x-3 group',
                'w-full text-left px-4 py-2.5 text-sm',
                'text-gray-10 hover:text-gray-2',
                'hover:bg-gray-8/40 transition-all duration-200 rounded-lg',
              )"
              :to="child.to || '/demo'"
              @click="toggleMenu('toggle')"
            >
              <Icon
                class="h-3 w-3 text-gray-6 transition-colors duration-200 group-hover:text-mint-9"
                name="ri:arrow-right-line"
              />
              <span v-html="highlightText(child.title, searchQuery)" />
            </Link>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <!-- No Results -->
    <div
      v-show="showNoResults"
      class="flex select-none items-center justify-center p-10 text-center text-gray-10"
    >
      <span>No results found for "{{ searchQuery }}"</span>
    </div>
  </div>
</template>

<style scoped>
mark {
  background-color: transparent;
  color: inherit;
}

/* Transition for appear/disappear of cards & menu items */
.list-enter-active,
.list-leave-active {
  transition: all 0.45s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.98);
  filter: blur(2px);
}

.list-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

.list-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.97);
  filter: blur(2px);
}

/* Animation for menu items */
.animate-in {
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  animation-fill-mode: both;
}
</style>
