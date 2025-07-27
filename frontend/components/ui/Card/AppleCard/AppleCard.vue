<script setup lang="ts">
import { AnimatePresence, Motion } from 'motion-v'
import AppleBlurImage from '@/components/ui/Card/AppleCard/AppleBlurImage.vue'
import { useVisibilityObserver } from '@/composables/useVisibilityObserver'
import { CarouselKey } from './AppleCarouselContext'

interface Card {
  src: string
  title: string
  category: string
}

interface Props {
  card: Card
  index: number
  layout?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  layout: false,
})

const open = ref(false)
const containerRef = ref<HTMLDivElement | null>(null)
const cardRef = ref<HTMLDivElement | null>(null)
const carouselContext = inject(CarouselKey)

if (!carouselContext) {
  throw new Error('Card must be used within a Carousel')
}

const { onCardClose, onImageLoad, onCardVisible, getImageState, setHoveredIndex } = carouselContext

// Intersection observer for card visibility
const hasBeenVisible = ref(false)
useVisibilityObserver(cardRef, hasBeenVisible, 15)

// Watch for visibility changes
watch(hasBeenVisible, (visible) => {
  if (visible) {
    onCardVisible(props.index)
  }
})

// Track when this card's image loads
function handleImageLoad() {
  onImageLoad(props.index)
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    handleClose()
  }
}

useEventListener(window, 'keydown', handleKeyDown)

watch(open, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  }
  else {
    document.body.style.overflow = 'auto'
  }
})

onClickOutside(containerRef, () => handleClose())

function handleOpen() {
  open.value = true
}

function handleClose() {
  open.value = false
  onCardClose(props.index)
}

function handleMouseEnter() {
  setHoveredIndex(props.index)
}

function handleMouseLeave() {
  setHoveredIndex(null)
}
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <!--  Card Overlay    -->
      <div
        v-if="open"
        class="fixed inset-0 z-50 h-screen overflow-auto"
      >
        <Motion
          as="div"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          class="bg-black/80 fixed inset-0 size-full backdrop-blur-lg"
        />
        <Motion
          ref="containerRef"
          as="div"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :layout-id="layout ? `card-${card.title}` : undefined"
          :class="useClsx(
            'relative z-[60] mx-auto my-10 h-fit max-w-5xl',
            'rounded-3xl bg-pureWhite p-4 font-sans dark:bg-pureBlack md:p-10',
          )"
        >
          <button
            :class="useClsx(
              'flex items-center justify-center rounded-full',
              'sticky right-0 top-4 ml-auto size-8',
              'bg-pureBlack dark:bg-pureWhite',
            )"
            @click="handleClose"
          >
            <Icon
              name="tabler:x"
              class="size-6 color-red-12"
            />
          </button>
          <Motion
            as="div"
            :layout-id="layout ? `category-${card.title}` : undefined"
            class="text-black dark:text-white text-base font-medium"
          >
            {{ card.category }}
          </Motion>
          <Motion
            as="div"
            :layout-id="layout ? `title-${card.title}` : undefined"
            class="dark:text-white text-neutral-700 mt-4 text-2xl font-semibold md:text-5xl"
          >
            {{ card.title }}
          </Motion>
          <div class="py-10">
            <slot />
          </div>
        </Motion>
      </div>
    </AnimatePresence>
  </Teleport>

  <Motion
    ref="cardRef"
    :layout-id="layout ? `card-${card.title}` : undefined"
    :initial="{ opacity: 0, y: 100, scale: 0.95 }"
    :animate="{
      opacity: hasBeenVisible ? 1 : 0,
      y: hasBeenVisible ? 0 : 100,
      scale: hasBeenVisible ? 1 : 0.95,
    }"
    :transition="{
      duration: 0.6,
      delay: hasBeenVisible ? Math.min(index, 3) * 0.1 : 0,
      ease: [0.25, 0.46, 0.45, 0.94],
    }"
    :class="useClsx(
      'relative z-10  group h-80 w-56 flex flex-col transform-gpu cursor-pointer',
      'items-start justify-start overflow-hidden rounded-10 bg-gray-6 md:h-[40rem] md:w-96')"
    @click="handleOpen"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!--  Card Content  -->
    <div
      :class="useClsx(
        'transition-colors duration-600 ease-[cubic-bezier(0.33,1,0.68,1)]',
        'pointer-events-none absolute inset-x-0 top-0 z-30 h-full',
        'from-olive-6 via-transparent to-transparent bg-gradient-to-b dark:from-pureBlack/35',
      )"
    />
    <div class="relative z-40 p-8">
      <Motion
        :layout-id="layout ? `category-${card.category}` : undefined"
        :class="useClsx(
          'text-left text-sm color-gray-12 tracking-tight',
          'font-medium font-manrope transition-colors duration-600 ease-[cubic-bezier(0.33,1,0.68,1)] md:text-base dark:color-pureWhite',
        )"
      >
        {{ card.category }}
      </Motion>
      <Motion
        :layout-id="layout ? `title-${card.title}` : undefined"
        :class="useClsx(
          '[text-wrap:balance] mt-2 max-w-xs text-left text-xl',
          'color-gray-12 font-semibold transition-colors duration-600 ease-[cubic-bezier(0.33,1,0.68,1)]',
          'font-lora antialiased md:text-3xl dark:color-pureWhite tracking-tight',
        )"
      >
        {{ card.title }}
      </Motion>
    </div>
    <div
      :class="
        useClsx(
          'absolute inset-0 z-10 overflow-hidden rounded-10 transition-transform',
          'duration-500 ease-[cubic-bezier(0.4,0.8,0.6,1)] group-hover:scale-110',
        )"
    >
      <AppleBlurImage
        :src="card.src"
        :alt="card.title"
        :card-index="props.index"
        :image-state="getImageState(props.index)"
        class="h-full w-full object-cover"
        :fill="true"
        :on-load="handleImageLoad"
      />
    </div>
  </Motion>
</template>
