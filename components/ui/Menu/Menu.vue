<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { onMounted, onUnmounted, ref, watch } from 'vue'

interface MenuItem {
  id: number
  title: string
  children?: { id: number, title: string }[]
}

const isOpen = ref(false)
const isAnimating = ref(false)
const openItems = ref<number[]>([])

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

function setBodyScroll(state: boolean) {
  if (state) {
    document.body.style.overflow = 'hidden'
  }
  else {
    document.body.style.overflow = 'auto'
  }
}

useEventListener(window, 'keydown', handleEsc)

onUnmounted(() => {
  setBodyScroll(false)
})

onMounted(() => {
  setBodyScroll(isOpen.value)
})

function handleAnimation() {
  isAnimating.value = true
  setTimeout(() => {
    isAnimating.value = false
  }, 1200)
}

watch(isOpen, (val) => {
  setBodyScroll(val)
  if (val) {
    handleAnimation()
  }
})

watch(isAnimating, (val) => {
  consola.debug('isAnimating', val)
})
</script>

<template>
  <div class="relative w-full">
    <!-- Menu Button -->
    <div class="group">
      <button
        :class="useClsx(
          'group flex items-center gap-2 rounded-full border-0 px-4 py-2 text-sm tracking-wider font-mono uppercase transition-all',
          'color-pureBlack dark:color-pureWhite ',
          'transition-colors duration-900 ease-[cubic-bezier(0.77,0,0.18,1)] z-30',
        //outline-pureBlack dark:outline-pureWhite outline-1 outline-solid
        )"
        @click="isOpen = true"
      >
        Menu
        <Icon class="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:rotate-45" name="mdi-plus" />
      </button>

      <!-- Hover indicator -->
      <span
        class="absolute bottom-0 left-1/2 h-[1px] w-0 transform bg-mint-8 transition-all duration-300 group-hover:w-2/3 -translate-x-1/2"
      />
    </div>

    <!-- Overlay -->
    <div
      :class="isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'"
      class="fixed inset-0 z-40 bg-pureBlack/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
      @click="isOpen = false"
    />

    <!-- Menu Panel -->
    <div
      :class="useClsx(
        isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        'w-full sm:w-[60vw] xl:w-[35vw] !max-w-[450px]',
        'fixed inset-y-0 right-0 z-50 w-full bg-pureWhite',
        'shadow-xl transition-all duration-500 ease-out dark:bg-pureBlack',
        'transform-gpu will-change-[transform,opacity] backface-hidden',
      )"
    >
      <!-- Background Text -->
      <div
        :class="useClsx(
          isAnimating && 'animated-fade-in-right',
          'animate-delay-[50ms] animated  animated-duration-900 animated-repeat-1',
        )"
        class="pointer-events-none absolute inset-0"
      >
        <div
          :class="useClsx(
            'text-[18vh] color-gray-12A font-thin leading-none tracking-wider',
            'absolute right-8 md:right-15 top-12 origin-right transform animate-glow',
            'uppercase opacity-10 -translate-y-1/2 -rotate-90 font-electric',
          )"
        >
          TecNews
        </div>
      </div>

      <!-- Content -->
      <div class="relative z-10 h-full flex flex-col p-6 color-pureBlack dark:color-pureWhite">
        <!-- Close Button -->
        <button
          :class="useClsx(
            'flex items-center gap-2 border-0 px-4 py-2',
            'dark:hover:bg-base10 absolute right-4 top-4',
            'text-sm tracking-wider font-mono uppercase transition-all',
            'bg-base1 text-base11 hover:bg-base2 dark:bg-base11 dark:text-base2',
          )"
          @click="isOpen = false"
        >
          Close
          <Icon class="h-3.5 w-3.5" name="mdi-close" />
        </button>

        <!-- Search -->
        <div class="mb-10 mt-10">
          <div class="relative color-pureBlack dark:color-pureWhite">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Icon class="h-4 w-4" name="mdi-magnify" />
            </div>
            <input
              :class="useClsx(
                'border-base2 focus:border-base12 dark:border-base10 dark:text-base1',
                'dark:focus:border-base7 w-full border-0 border-b bg-transparent',
                'py-3 pl-10 pr-4 text-sm font-mono dark:color-pureWhite placeholder:color-pureBlack',
                'focus:outline-none focus:ring-0 dark:placeholder:color-pureWhite',
              )"
              placeholder="Search"
              type="search"
            >
          </div>
        </div>

        <!-- Menu Items -->
        <div class="flex-1 overflow-y-auto">
          <div class="michroma-regular space-y-1">
            <div v-for="(item, idx) in menuItems" :key="item.id">
              <div
                :class="useClsx(
                  !item.children && 'hover:text-base7 dark:hover:text-base8',
                  'color-pureBlack dark:color-pureWhite',
                  idx !== 0 && 'border-t border-solid border-pureBlack dark:border-pureWhite',
                  'flex cursor-pointer items-center justify-between py-3 text-3xl tracking-normal uppercase',
                )"
                @click="item.children && toggleItem(item.id)"
              >
                {{ item.title }}
                <div v-if="item.children" class="text-base7 flex items-center color-mint-11">
                  <Icon v-if="openItems.includes(item.id)" class="h-8 w-8" name="mdi-minus" />
                  <Icon v-else class="h-8 w-8" name="mdi-plus" />
                </div>
              </div>
              <!-- Accordion Transition Layer Using UnoCSS -->
              <transition
                enter-active-class="transition-all duration-300 ease-in-out"
                enter-from-class="grid-rows-[0fr] opacity-0"
                enter-to-class="grid-rows-[1fr] opacity-100"
                leave-active-class="transition-all duration-300 ease-in-out"
                leave-from-class="grid-rows-[1fr] opacity-100"
                leave-to-class="grid-rows-[0fr] opacity-0"
              >
                <div
                  v-if="item.children && openItems.includes(item.id)"
                  class="will-change-[transform,opacity] backface-hidden grid transform-gpu"
                >
                  <div class="overflow-hidden">
                    <ul class="mb-3 pl-4 space-y-1">
                      <li v-for="child in item.children" :key="child.id">
                        <a
                          :class="useClsx(
                            'hover:text-base12 dark:hover:text-base1 block py-2 text-xs color-pureBlack',
                            'tracking-wider font-mono uppercase transition-colors dark:color-pureWhite',
                          )"
                          href="#"
                        >
                          {{ child.title }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </transition>
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

<style scoped>
.michroma-regular {
  font-family: 'Michroma', sans-serif;
  font-weight: 400;
  font-style: normal;
}

@import url('https://fonts.googleapis.com/css2?family=Michroma&display=swap');
</style>
