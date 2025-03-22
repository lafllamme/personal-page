<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

interface MenuItem {
  id: number
  title: string
  children?: { id: number, title: string }[]
}

const isOpen = ref(false)
const openItems = ref<number[]>([])

const { width: windowWidth } = useWindowSize()
const isMobile = computed(() => windowWidth.value < 640)

const menuItems: MenuItem[] = [
  {
    id: 1,
    title: 'Technology',
    children: [
      { id: 11, title: 'Gadgets' },
      { id: 12, title: 'Software' },
      { id: 13, title: 'AI & Machine Learning' },
    ],
  },
  {
    id: 2,
    title: 'Business',
    children: [
      { id: 21, title: 'Startups' },
      { id: 22, title: 'Venture Capital' },
      { id: 23, title: 'Market Trends' },
    ],
  },
  {
    id: 3,
    title: 'Science',
    children: [
      { id: 31, title: 'Space' },
      { id: 32, title: 'Environment' },
      { id: 33, title: 'Health' },
    ],
  },
  {
    id: 4,
    title: 'Reviews',
    children: [
      { id: 41, title: 'Smartphones' },
      { id: 42, title: 'Laptops' },
      { id: 43, title: 'Wearables' },
    ],
  },
  {
    id: 5,
    title: 'About',
  },
  {
    id: 6,
    title: 'Contact',
  },
]

function toggleItem(id: number) {
  if (openItems.value.includes(id)) {
    openItems.value = openItems.value.filter(item => item !== id)
  }
  else {
    openItems.value.push(id)
  }
}

function handleEsc(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    isOpen.value = false
  }
}

function updateBodyScroll() {
  document.body.style.overflow = isOpen.value ? 'hidden' : 'auto'
}

onMounted(() => {
  window.addEventListener('keydown', handleEsc)
  updateBodyScroll()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEsc)
  document.body.style.overflow = 'auto'
})

watch(isOpen, () => {
  updateBodyScroll()
})
</script>

<template>
  <div class="relative w-full">
    <!-- Menu Button -->
    <button
      class="bg-base12 text-base1 hover:bg-base11 dark:bg-base11 dark:text-base1 dark:hover:bg-base10 fixed right-6 top-6 z-30 flex items-center gap-2 border-0 px-4 py-2 text-sm tracking-wider font-mono uppercase transition-all"
      @click="isOpen = true"
    >
      Menu
      <Icon class="h-3.5 w-3.5" name="mdi-plus" />
    </button>

    <!-- Overlay -->
    <div
      :class="isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'"
      class="bg-black/40 fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-300"
      @click="isOpen = false"
    />

    <!-- Menu Panel -->
    <div
      :class="[
        isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        isMobile ? 'w-full' : 'max-w-[70%] md:max-w-[60%]',
      ]"
      class="bg-base1 dark:bg-base12 fixed inset-y-0 right-0 z-50 w-full shadow-xl transition-all duration-500 ease-out"
    >
      <!-- Background Text -->
      <div class="pointer-events-none absolute bottom-0 right-0 top-0 flex items-center justify-center overflow-hidden">
        <div
          class="text-base1 dark:text-base11 rotate-90 transform text-[20vw] font-black leading-none tracking-tighter font-mono uppercase opacity-10"
        >
          TecNews
        </div>
      </div>

      <!-- Content -->
      <div class="relative z-10 h-full flex flex-col p-6">
        <!-- Close Button -->
        <button
          class="bg-base1 text-base11 hover:bg-base2 dark:bg-base11 dark:text-base2 dark:hover:bg-base10 absolute right-6 top-6 flex items-center gap-2 border-0 px-4 py-2 text-sm tracking-wider font-mono uppercase transition-all"
          @click="isOpen = false"
        >
          Close
          <Icon class="h-3.5 w-3.5" name="mdi-close" />
        </button>

        <!-- Search -->
        <div class="mb-10 mt-16">
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Icon class="text-base7 h-4 w-4" name="mdi-magnify" />
            </div>
            <input
              class="border-base2 text-base12 placeholder:text-base7 focus:border-base12 dark:border-base10 dark:text-base1 dark:placeholder:text-base8 dark:focus:border-base7 w-full border-0 border-b bg-transparent py-3 pl-10 pr-4 text-sm font-mono focus:outline-none focus:ring-0"
              placeholder="Search..."
              type="search"
            >
          </div>
        </div>

        <!-- Menu Items -->
        <div class="flex-1 overflow-y-auto">
          <div class="space-y-1">
            <div
              v-for="item in menuItems"
              :key="item.id"
              class="border-base1 dark:border-base11 border-b"
            >
              <div
                :class="{ 'hover:text-base7 dark:hover:text-base8': !item.children }"
                class="text-base12 dark:text-base1 flex cursor-pointer items-center justify-between py-3 text-sm tracking-wider font-mono uppercase"
                @click="item.children && toggleItem(item.id)"
              >
                {{ item.title }}
                <div v-if="item.children" class="text-base7 flex items-center">
                  <Icon v-if="openItems.includes(item.id)" class="h-3 w-3" name="mdi-minus" />
                  <Icon v-else class="h-3 w-3" name="mdi-plus" />
                </div>
              </div>

              <div
                v-if="item.children"
                :class="openItems.includes(item.id) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
                class="grid transition-all duration-300 ease-in-out"
              >
                <div class="overflow-hidden">
                  <ul class="mb-3 pl-4 space-y-1">
                    <li v-for="child in item.children" :key="child.id">
                      <a
                        class="text-base6 hover:text-base12 dark:text-base7 dark:hover:text-base1 block py-2 text-xs tracking-wider font-mono uppercase transition-colors"
                        href="#"
                      >
                        {{ child.title }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-auto pt-6">
          <div class="border-base1 dark:border-base11 flex items-center justify-between border-t pt-6">
            <span class="text-base7 text-xs font-mono">© 2025 TecNews</span>
            <button
              class="text-base12 dark:text-base1 flex items-center gap-1 text-xs tracking-wider font-mono uppercase"
            >
              Contact
              <Icon class="h-3 w-3" name="mdi-chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Ensure smooth transitions */
* {
  transition-property:
    color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* For dark mode toggle if needed */
.dark {
  color-scheme: dark;
}
</style>
