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

const { onCardClose, imagesReady, onImageLoad, onCardVisible, cardsInGrayPhase, newCardsAfterReady, initialViewportCards, initialAnimationComplete } = carouselContext

// Intersection observer for card visibility
const hasBeenVisible = ref(false)
useVisibilityObserver(cardRef, hasBeenVisible, 30)

// Watch for visibility changes
watch(hasBeenVisible, (visible) => {
  if (visible) {
    onCardVisible(props.index)
  }
})

// Track when this card's image loads
function handleImageLoad() {
  console.log(`🖼️ [Card ${props.index}] Image loaded`)
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
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
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
          class="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-pureWhite p-4 font-sans dark:bg-pureBlack md:p-10"
        >
          <button
            class="sticky right-0 top-4 ml-auto size-8 flex items-center justify-center rounded-full bg-pureBlack dark:bg-pureWhite"
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
    :initial="{ opacity: 0, y: 50, scale: 0.95 }"
    :animate="{
      opacity: hasBeenVisible ? 1 : 0,
      y: hasBeenVisible ? 0 : 50,
      scale: hasBeenVisible ? 1 : 0.95,
    }"
    :transition="{
      duration: initialViewportCards.has(props.index) ? 0.6 : 0.3,
      delay: hasBeenVisible && initialViewportCards.has(props.index) ? Math.min(index, 3) * 0.1 : 0,
      ease: [0.25, 0.46, 0.45, 0.94],
    }"
    class="relative z-10 h-80 w-56 flex flex-col transform-gpu cursor-pointer items-start justify-start overflow-hidden rounded-3xl bg-gray-11 md:h-[40rem] md:w-96"
    @click="handleOpen"
  >
    <div
      class="from-black/50 pointer-events-none absolute inset-x-0 top-0 z-30 h-full via-transparent to-transparent bg-gradient-to-b"
    />
    <div class="relative z-40 p-8">
      <Motion
        :layout-id="layout ? `category-${card.category}` : undefined"
        class="text-left text-sm color-pureWhite font-medium font-sans md:text-base dark:color-pureWhite"
      >
        {{ card.category }}
      </Motion>
      <Motion
        :layout-id="layout ? `title-${card.title}` : undefined"
        class="[text-wrap:balance] mt-2 max-w-xs text-left text-xl color-pureWhite font-semibold font-sans md:text-3xl dark:color-pureWhite"
      >
        {{ card.title }}
      </Motion>
    </div>
    <AppleBlurImage
      :src="card.src"
      :alt="card.title"
      :images-ready="imagesReady"
      :card-index="props.index"
      :cards-in-gray-phase="cardsInGrayPhase"
      :new-cards-after-ready="newCardsAfterReady"
      class="absolute inset-0 z-10 object-cover"
      :fill="true"
      :on-load="handleImageLoad"
    />
  </Motion>
</template>
