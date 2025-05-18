<script lang="ts" setup>
import type { MenuProps } from './Menu.model'
import Link from '@/components/ui/Link/Link.vue'
import MenuButton from '@/components/ui/Menu/Button/MenuButton.vue'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { MenuPropsDefault } from './Menu.model'

const props = withDefaults(defineProps<MenuProps>(), MenuPropsDefault)
const { items } = toRefs(props)

const isOpen = ref(false)
const isAnimating = ref(false)
const openItems = ref<number[]>([])
const hasInputFocus = ref(false)
const isLocked = useScrollLock(document)

const menu = useTemplateRef<HTMLDivElement>('menu')
const { activate, deactivate } = useFocusTrap(menu)

function toggleItem(id: number) {
  if (openItems.value.includes(id)) {
    openItems.value = openItems.value.filter(item => item !== id)
  }
  else {
    openItems.value.push(id)
  }
}

function resetMenuItems(timeout?: number) {
  const wait = new Promise(resolve => setTimeout(resolve, timeout || 300))
  wait.then(() => {
    openItems.value = []
  })
}

function handleEsc(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    isOpen.value = false
  }
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
  }
  else {
    resetMenuItems()
    deactivate()
  }
}

watch(isOpen, (open) => {
  handleMenu(open)
})

const tabIndex = computed(() => (isOpen.value ? 0 : -1))
const isAriaHidden = computed(() => (isOpen.value ? 'false' : 'true'))
useEventListener(window, 'keydown', handleEsc)
</script>

<template>
  <div
    ref="menu"
    class="relative w-full"
  >
    <!-- Menu Button -->
    <div class="group flex items-center">
      <MenuButton
        :is-open="isOpen"
        @click="handleClick"
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
      :aria-hidden="isAriaHidden"
      :class="useClsx(
        isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        'w-full sm:w-[60vw] xl:w-[35vw] !max-w-[450px]',
        'fixed inset-y-0 right-0 z-50 w-full bg-pureWhite',
        'shadow-xl transition-all duration-500 ease-out dark:bg-pureBlack',
        'transform-gpu will-change-[transform,opacity] backface-hidden',
      )"
      :inert="isOpen ? undefined : 'true'"
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
            class="relative flex items-center border border-solid px-4 py-2 color-pureBlack dark:color-pureWhite"
          >
            <input
              id="search"
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
                <!-- Line icon -->
                <Icon
                  :class="{ 'opacity-0 scale-95': hasInputFocus, 'opacity-100 scale-100': !hasInputFocus }"
                  class="absolute h-full w-full transition-all duration-300 ease-out"
                  name="ri:search-line"
                />
                <!-- Filled icon -->
                <Icon
                  :class="{ 'opacity-100 scale-100': hasInputFocus, 'opacity-0 scale-95': !hasInputFocus }"
                  class="absolute h-full w-full transition-all duration-300 ease-out"
                  name="ri:search-2-fill"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Menu Items -->
        <div
          class="flex-1 overflow-x-hidden overflow-y-auto"
          tabindex="-1"
        >
          <div class="space-grotesk-regular antialiased space-y-1">
            <ul v-for="(item, idx) in items" :key="item.id">
              <li
                :class="useClsx(
                  'group',
                  'color-pureBlack dark:color-pureWhite',
                  idx !== 0 && 'border-t border-solid border-gray-2',
                  'transition-[text-shadow] transition-colors duration-200 ease-out',
                  'focus-within:outline-none focus-within:bg-mint-3A focus-within:color-jade-11',
                  'focus-visible:outline-none focus-visible:bg-mint-3A focus-visible:color-jade-11',
                  'flex cursor-pointer items-center py-3 text-3xl tracking-normal uppercase',
                )"
                tabindex="0"
                @click="item.children && toggleItem(item.id)"
                @keydown.enter.prevent="item.children && toggleItem(item.id)"
              >
                <span
                  :class="useClsx(
                    'relative h-12 w-0.5 bg-jade-11',
                    'transition-all duration-300 opacity-0 group-hover:opacity-100',
                  )"
                />
                <span class="transition-all duration-300 group-hover:pl-4 group-hover:color-jade-11">
                  {{ item.title }}
                </span>
                <button
                  v-if="item.children"
                  :class="useClsx(
                    'flex items-center ml-auto p-1',
                    'group-hover:color-jade-11 color-pureBlack dark:color-pureWhite',
                    'focus:outline-none focus:ring focus:ring-inset',
                    'transition-colors duration-300',
                    'focus:ring-pureBlack dark:focus:ring-pureWhite',
                  )"
                >
                  <Icon
                    :class="useClsx(
                      openItems.includes(item.id) && 'rotate-45',
                      'h-8 w-8 p-1 rotate-0 transition-transform duration-300 ease',
                    )"
                    name="ri:add-large-fill"
                  />
                </button>
              </li>
              <!-- Accordion Transition Layer -->
              <transition
                enter-active-class="transition-all duration-300 ease-in-out"
                enter-from-class="grid-rows-[0fr] opacity-0"
                enter-to-class="grid-rows-[1fr] opacity-100"
                leave-active-class="transition-all duration-300 ease-in-out"
                leave-from-class="grid-rows-[1fr] opacity-100"
                leave-to-class="grid-rows-[0fr] opacity-0"
              >
                <ol
                  v-if="item.children && openItems.includes(item.id)"
                  class="will-change-[transform,opacity] backface-hidden grid transform-gpu"
                >
                  <li class="overflow-hidden">
                    <ul class="mb-3 pl-4 space-y-1">
                      <li v-for="child in item.children" :key="child.id">
                        <Link
                          :class="useClsx(
                            'hover:text-base12 dark:hover:text-base1 block py-2 px-1 text-xs',
                            'tracking-wider font-mono uppercase transition-colors dark:color-pureWhite',
                          )"
                          :title="child.title"
                          to="/demo"
                        >
                          {{ child.title }}
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ol>
              </transition>
            </ul>
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
            <button
              :class="useClsx(
                'group focus:outline-none focus:ring focus:ring-mint-8 focus:ring-offset-2',
                'transform transition-transform duration-300 ease-out hover:scale-105',
                'transition-colors duration-300 ease-out hover:text-mint-11',
                'ring-offset-pureWhite dark:ring-offset-pureBlack',
              )"
            >
              <span>
                © 2025 TecNews
              </span>
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
</style>
