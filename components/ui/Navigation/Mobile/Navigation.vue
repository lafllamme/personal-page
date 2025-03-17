<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { computed, ref, toRefs } from 'vue'

interface MenuItem {
  label: string
  href: string
  children?: MenuItem[]
}

const props = defineProps<{
  items: MenuItem[]
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close', value: boolean): void
}>()

const { isOpen } = toRefs(props)
const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerMD = computed(() => breakpoints.smaller('md').value)

// Track expanded accordion items for nested menus
const expandedItems = ref<Set<string>>(new Set())

function toggleAccordion(label: string, event: Event) {
  event.preventDefault()
  event.stopPropagation()
  if (expandedItems.value.has(label)) {
    expandedItems.value.delete(label)
  }
  else {
    expandedItems.value.add(label)
  }
}

function isExpanded(label: string) {
  return expandedItems.value.has(label)
}

function getAnimationDelay(index: number) {
  return `${index * 0.1}s`
}

function handleClick() {
  emit('close', false)
}
</script>

<template>
  <!-- The transition container animates max-height and opacity so that the menu "grows" down -->
  <Transition
    enter-active-class="transition-all duration-900 ease-[cubic-bezier(0.77,0,0.18,1)]"
    enter-from-class="opacity-0 max-h-0"
    enter-to-class="opacity-100 max-h-[400px]"
    leave-active-class="transition-all duration-900 ease-[cubic-bezier(0.77,0,0.18,1)]"
    leave-from-class="opacity-100 max-h-[400px]"
    leave-to-class="opacity-0 max-h-0"
  >
    <div
      v-show="isOpen"
      :class="useClsx(
        isOpen ? 'bg-pureWhite/95 dark:bg-pureBlack/95' : 'bg-pureWhite/50 dark:bg-pureBlack/50',
        'overflow-hidden shadow-lg backdrop-blur-[8px] backdrop-saturate-150',
        'transition-all !duration-900 !ease-[cubic-bezier(0.77,0,0.18,1)]',
      )"
    >
      <ul class="m-0 list-none p-0">
        <li
          v-for="(item, index) in items"
          :key="item.label"
          :style="{ animationDelay: getAnimationDelay(index) }"
          class="animate-fade-down opacity-0"
        >
          <!-- Menu item. If it has children, it toggles an accordion -->
          <div
            :class="useClsx(
              'color-pureBlack dark:color-pureWhite hover:bg-gray-5',
              'mx-2 my-1 flex items-center justify-between rounded-lg px-5 py-3',
              'ease-in-out duration-300 transition-all cursor-pointer',
              isExpanded(item.label) && 'bg-gray-5',
            )"
            @click="item.children ? toggleAccordion(item.label, $event) : handleClick()"
          >
            <template v-if="!item.children">
              <a
                :href="item.href"
                class="w-full decoration-none"
                @click="handleClick"
              >
                {{ item.label }}
              </a>
            </template>
            <template v-else>
              <span>{{ item.label }}</span>
              <!-- Dropdown arrow rotates on toggle -->
              <svg
                :class="{ 'transform rotate-180': isExpanded(item.label) }"
                class="transition-transform duration-300"
                fill="none"
                height="20"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="20"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </template>
          </div>

          <!-- Nested accordion content with its own transition -->
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-96"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 max-h-96"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-if="item.children && isExpanded(item.label)" class="overflow-hidden">
              <div
                class="bg-gray-50 dark:bg-gray-900 grid grid-cols-1 mx-2 mb-2 gap-4 rounded-lg px-5 py-3 md:grid-cols-3"
              >
                <!-- First column: Child links -->
                <div>
                  <ul class="m-0 list-none p-0">
                    <li v-for="child in item.children" :key="child.label" class="mb-2">
                      <a
                        :href="child.href"
                        class="hover:bg-gray-100 dark:hover:bg-gray-800 block rounded px-3 py-2 decoration-none transition-colors"
                        @click="handleClick"
                      >
                        {{ child.label }}
                      </a>
                    </li>
                  </ul>
                </div>
                <!-- Second column: Featured content (optional) -->
                <div class="col-span-2 hidden md:block">
                  <div class="bg-gray-100 dark:bg-gray-800 h-full flex flex-col rounded-lg p-4">
                    <h3 class="mb-2 text-lg font-medium">
                      Featured in {{ item.label }}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                      Discover our top picks and latest additions.
                    </p>
                    <div class="grid grid-cols-2 mt-auto gap-3">
                      <div class="bg-white dark:bg-gray-700 rounded p-3 shadow-sm">
                        <div class="bg-gray-200 dark:bg-gray-600 mb-2 h-24 w-full rounded" />
                        <p class="font-medium">
                          Featured Item
                        </p>
                      </div>
                      <div class="bg-white dark:bg-gray-700 rounded p-3 shadow-sm">
                        <div class="bg-gray-200 dark:bg-gray-600 mb-2 h-24 w-full rounded" />
                        <p class="font-medium">
                          Featured Item
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </li>
      </ul>
    </div>
  </Transition>
</template>

<style scoped>
@keyframes fade-down {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-down {
  animation: fade-down 0.9s forwards cubic-bezier(0.77, 0, 0.18, 1);
}
</style>
