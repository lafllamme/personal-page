<script lang="ts" setup>
import MenuButton from '@/components/ui/Menu/Button/MenuButton.vue'
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
const buttonRef = ref<HTMLButtonElement | null>(null)

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

function handleClick() {
  isOpen.value = !isOpen.value
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
    <div class="group flex items-center">
      <MenuButton
        :is-open="isOpen"
        @click="handleClick"
      />
      <!--      <Underline /> -->
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
        'safe-area-footer',
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
      <div class="relative z-10 h-full min-h-screen flex flex-col p-6 color-pureBlack dark:color-pureWhite">
        <!-- Search -->
        <div class="jetbrains-mono-regular mb-10 mt-10">
          <div class="relative color-pureBlack dark:color-pureWhite">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Icon class="h-4 w-4" name="mdi-magnify" />
            </div>
            <input
              :class="useClsx(
                'border-base2 focus:border-base12 dark:border-base10 dark:text-base1 jetbrains-mono-regular',
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
          <div class="space-grotesk-regular antialiased space-y-1">
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
        <div class="geist-regular mt-auto pt-6 text-xs md:text-sm">
          <div
            :class="useClsx(
              'flex items-center justify-between border-t',
              'border-gray-7A border-solid pt-6',
            )"
          >
            <span class="hover: transition-all duration-300 ease-out hover:scale-105 hover:color-mint-11">© 2025 TecNews</span>
            <button
              class="group flex items-center gap-1 tracking-wider uppercase"
            >
              Contact
              <Icon
                class="h-4 w-4 transition-all duration-300 ease-out group-hover:translate-x-1.5 group-hover:color-mint-11"
                name="ri:arrow-right-line"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&family=Figtree:ital,wght@0,300..900;1,300..900&family=Major+Mono+Display&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Boldonse&family=Zen+Dots&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Space+Grotesk:wght@300..700&display=swap');

.geist-regular {
  font-family: 'Geist', sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.space-grotesk-regular {
  font-family: 'Space Grotesk', sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}

.boldonse-regular {
  font-family: 'Boldonse', system-ui;
  font-weight: 400;
  font-style: normal;
}
.audiowide-regular {
  font-family: 'Audiowide', sans-serif;
  font-weight: 400;
  font-style: normal;
}
.zen-dots-regular {
  font-family: 'Zen Dots', sans-serif;
  font-weight: 400;
  font-style: normal;
}
.bruno-ace-sc-regular {
  font-family: 'Bruno Ace SC', sans-serif;
  font-weight: 400;
  font-style: normal;
}
.major-mono-display-regular {
  font-family: 'Major Mono Display', monospace;
  font-weight: 400;
  font-style: normal;
}

.figtree-regular {
  font-family: 'Figtree', sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}

.jetbrains-mono-regular {
  font-family: 'JetBrains Mono', monospace;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}
.safe-area-footer {
  /* Adjust the base padding as needed (here 1rem) and add the safe area inset */
  padding-bottom: calc(1rem + env(safe-area-inset-bottom));
  /* Fallback for older iOS versions */
  padding-bottom: calc(1rem + constant(safe-area-inset-bottom));
}
</style>
