<script lang="ts" setup>
import type { MenuProps } from './Menu.model'
import Link from '@/components/ui/Link/Link.vue'
import MenuButton from '@/components/ui/Menu/Button/MenuButton.vue'
import { useMenu } from '@/stores/menu'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { MenuPropsDefault } from './Menu.model'

const props = withDefaults(defineProps<MenuProps>(), MenuPropsDefault)
const { items } = toRefs(props)

const menuStore = useMenu()
const { toggleMenu } = menuStore
const isOpen = ref(false)
const isAnimating = ref(false)
const openItems = ref<number[]>([])
const hasInputFocus = ref(false)
const isLocked = useScrollLock(document)
const menu = useTemplateRef<HTMLDivElement>('menu')
const { activate, deactivate } = useFocusTrap(menu)
const contentRefs = ref<Record<number, HTMLElement | null>>({})

const searchQuery = ref('')
const searchResults = computed(() => {
  if (!searchQuery.value.trim())
    return null
  const q = searchQuery.value.toLowerCase().trim()
  const results: any[] = []
  items.value.forEach((item) => {
    if (item.title.toLowerCase().includes(q)) {
      results.push({ ...item, _type: 'parent' })
      return
    }
    if (item.children && item.children.length) {
      const matchingChildren = item.children.filter(child =>
        child.title.toLowerCase().includes(q),
      )
      if (matchingChildren.length) {
        results.push({
          ...item,
          children: matchingChildren,
          _type: 'children',
        })
      }
    }
  })
  return results
})
const showResults = computed(() => !!searchQuery.value && !!searchResults.value && searchResults.value.length > 0)
const showNoResults = computed(() => !!searchQuery.value && (!searchResults.value || searchResults.value.length === 0))

function toggleItem(id: number) {
  openItems.value = openItems.value[0] === id ? [] : [id]
}

function resetMenuItems(timeout?: number) {
  const wait = new Promise(resolve => setTimeout(resolve, timeout || 300))
  wait.then(() => {
    openItems.value = []
  })
}

function handleEsc(event: KeyboardEvent) {
  if (event.key === 'Escape')
    isOpen.value = false
}

function setBodyScroll(locked: boolean) {
  isLocked.value = locked
}

function handleClick() {
  isOpen.value = !isOpen.value
}

function handleInputFocus(focused: boolean = false) {
  hasInputFocus.value = focused
}

function wait(timeout: number = 1200) {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

function handleAnimation() {
  isAnimating.value = true
  wait().then(() => {
    isAnimating.value = false
  })
}

function handleMenu(open: boolean) {
  setBodyScroll(open)
  if (open) {
    handleAnimation()
    activate()
    toggleMenu('open')
  }
  else {
    resetMenuItems()
    deactivate()
    toggleMenu('close')
  }
}

// Highlight search matches
function highlightText(text: string, query: string) {
  if (!query.trim())
    return text

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, index) => {
    if (regex.test(part)) {
      return `<mark class="bg-mint-5/30 text-jade-11 rounded px-1">${part}</mark>`
    }
    return part
  }).join('')
}

watch(isOpen, (open) => {
  handleMenu(open)
})
const isAriaHidden = computed(() => (isOpen.value ? 'false' : 'true'))
const tabIndex = computed(() => (isOpen.value ? '0' : '-1'))
useEventListener(window, 'keydown', handleEsc)
</script>

<template>
  <div ref="menu" class="relative w-full">
    <!-- Menu Button -->
    <div class="flex items-center">
      <MenuButton :is-open="isOpen" @click="handleClick" />
    </div>
    <!-- Overlay -->
    <div
      :class="isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'"
      class="fixed inset-0 z-40 bg-pureBlack/40 backdrop-blur-sm grayscale-40 transition-opacity duration-300 ease-in-out"
      @click="isOpen = false"
    />
    <!-- Menu Panel -->
    <div
      :aria-hidden="isAriaHidden"
      :class="useClsx(
        isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        'w-full sm:w-[60vw] xl:w-[35vw] !max-w-[450px]',
        'fixed inset-y-0 right-0 z-50 w-full bg-pureWhite',
        'shadow-xl transition-all duration-500 ease-out dark:bg-pureBlack',
        'transform-gpu will-change-[transform,opacity] backface-hidden',
      )"
      :inert="isOpen ? undefined : 'true'"
      tabindex="-1"
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
      <div class="relative z-10 h-full flex flex-col p-6 color-pureBlack h-svh dark:color-pureWhite">
        <!-- Search -->
        <div class="mb-10 mt-10">
          <div
            class="relative flex items-center border rounded-3xl border-solid px-4 py-2 color-pureBlack dark:color-pureWhite"
          >
            <input
              id="search"
              v-model="searchQuery"
              :class="useClsx(
                'geist-regular peer tracking-normal',
                'w-full bg-transparent rounded-sm',
                'text-md placeholder:color-gray-10',
                'focus:outline-none focus:ring-0',
              )"
              placeholder=""
              type="search"
              @blur="handleInputFocus(false)"
              @focus="handleInputFocus(true)"
            >
            <label
              v-show="!searchQuery"
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
          <div v-if="searchQuery" class="mt-2 flex items-center justify-between text-xs">
            <span class="text-gray-10">
              {{ showResults ? `${searchResults?.length || 0} results found` : "No results found" }}
            </span>
            <span
              v-if="showResults"
              class="border border-mint-7/30 rounded-full bg-mint-5/20 px-2 py-0.5 text-xs text-jade-11"
            >
              {{ searchResults?.length }} sections
            </span>
          </div>
        </div>

        <!-- Menu Items or Search Results -->
        <div class="flex-1 overflow-x-hidden overflow-y-auto" tabindex="-1">
          <!-- Line Separated Style Search Results -->
          <TransitionGroup
            v-if="showResults"
            appear
            class="space-y-0"
            name="list"
            tag="div"
          >
            <div v-for="result in searchResults" :key="result.id" class="border-b border-gray-7/30 last:border-b-0">
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
                  <span class="font-semibold tracking-wide" v-html="highlightText(result.title, searchQuery)" />
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
            v-else-if="showNoResults"
            class="flex select-none items-center justify-center p-10 text-center text-gray-10"
          >
            <span>No results found for "{{ searchQuery }}"</span>
          </div>

          <!-- Enhanced Accordion Menu (Hybrid Style) -->
          <TransitionGroup
            v-else
            class="space-grotesk-regular antialiased space-y-0"
            name="list"
            tag="div"
          >
            <div v-for="(item, idx) in items" :key="item.id">
              <button
                :class="useClsx(
                  idx !== 0 && 'border-t border-solid border-gray-5 dark:border-gray-2',
                  'group relative w-full flex items-center justify-between',
                  'color-pureBlack dark:color-pureWhite',
                  'py-4 px-4 text-left text-4xl tracking-normal uppercase hover:color-jade-11',
                  'transition-colors duration-300 focus:outline-none focus:color-jade-11 focus-visible:bg-gray-5A rounded-full',
                )"
                @click="item.children && toggleItem(item.id)"
                @keydown.enter.prevent="item.children && toggleItem(item.id)"
              >
                <span
                  class="group absolute left-0 top-1/2 h-8 w-1 scale-y-50 rounded-full bg-jade-11 opacity-0 transition-all duration-150 will-change-opacity will-change-transform -translate-y-1/2 group-focus:scale-y-100 group-hover:scale-y-100 group-focus:opacity-100 group-hover:opacity-100 group-focus-visible:!scale-y-0 group-focus-visible:!opacity-0"
                />

                <div class="flex items-center space-x-3">
                  <span
                    class="font-semibold tracking-wide transition-all duration-300 group-focus:translate-x-3 group-hover:translate-x-3"
                  >
                    {{ item.title }}
                  </span>
                </div>
                <Icon
                  v-if="item.children"
                  :class="useClsx(
                    'group-hover:color-jade-11A',
                    'transition-all duration-300',
                    openItems.includes(item.id) ? 'rotate-45' : '',
                  )"
                  class="h-6 w-6 md:h-8 md:w-8"
                  name="ri:add-large-fill"
                />
              </button>

              <div
                v-show="item.children"
                :style="{
                  height: openItems.includes(item.id)
                    ? `${contentRefs[item.id]?.scrollHeight || 0}px`
                    : '0px',
                  transition: 'height 320ms cubic-bezier(0.4,0,0.2,1)',
                }"
                class="overflow-hidden"
              >
                <div
                  :ref="el => (contentRefs[item.id] = el as HTMLElement)"
                  class="animate-in px-4 pb-4 duration-300 slide-in-from-top-3 space-y-1"
                  style="will-change: height, transform;"
                >
                  <div v-for="child in item.children" :key="child.id">
                    <Link
                      :aria-hidden="openItems.includes(item.id) ? 'false' : 'true'"
                      :class="useClsx(
                        'flex items-center space-x-3 group',
                        'w-full text-left px-4 py-2.5 text-md',
                        'text-gray-10 hover:text-gray-12 focus-visible:text-gray-12',
                        'transition-all duration-200 rounded-full',
                      )"
                      :tabindex="openItems.includes(item.id) ? 0 : -1"
                      :title="child.title"
                      :to="child.to || '/demo'"
                    >
                      <Icon
                        class="h-4 w-4 text-gray-6 transition-colors duration-200 group-focus-visible:color-mint-11 group-hover:color-mint-11"
                        name="ri:arrow-right-line"
                      />
                      <span>{{ child.title }}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>
        <!-- Footer -->
        <div class="geist-regular mt-auto pt-6 text-xs md:text-sm">
          <div
            :class="useClsx(
              'flex items-center justify-between border-t',
              'border-gray-7A border-solid pt-6',
            )"
          >
            <button
              :class="useClsx(
                'group focus:outline-none focus:ring focus:ring-mint-8 focus:ring-offset-2',
                'transform transition-transform duration-300 ease-out hover:scale-105',
                'transition-colors duration-300 ease-out hover:text-mint-11',
                'ring-offset-pureWhite dark:ring-offset-pureBlack',
              )"
            >
              <span>© 2025 TecNews</span>
            </button>
            <button
              :class="useClsx(
                'focus:ring-mint-8 dark:ring-offset-pureBlack',
                'group flex items-center gap-1 tracking-wider uppercase',
                'ring-offset-pureWhite focus:outline-none focus:ring focus:ring-offset-2',
              )"
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&family=Figtree:ital,wght@0,300..900;1,300..900&family=Major+Mono+Display&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Boldonse&family=Zen+Dots&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Space+Grotesk:wght@300..700&display=swap');

.geist-regular {
  font-family: 'Geist', sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.geist-thin {
  font-family: 'Geist', sans-serif;
  font-optical-sizing: auto;
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
  font-style: normal;
}

.slide-out-blurred-top {
  animation: slide-out-blurred-top 0.45s cubic-bezier(0.755, 0.05, 0.855, 0.06) both;
}

@keyframes slide-out-blurred-top {
  0% {
    transform: translateY(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 0%;
    transform-origin: 50% 0%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-1000px) scaleY(2) scaleX(0.2);
    -webkit-transform-origin: 50% 0%;
    transform-origin: 50% 0%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
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

.slide-in-from-top-3 {
  animation-name: slideInFromTop;
}

@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-0.75rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.duration-300 {
  animation-duration: 300ms;
}

li.group {
  will-change: transform, color, opacity;
}
</style>
