<script setup lang="ts">
import { useVisibilityObserver } from '@/composables/useVisibilityObserver'
import { CarouselKey, createCarouselContext } from './AppleCarouselContext'

interface Props {
  initialScroll?: number
}

const props = withDefaults(defineProps<Props>(), {
  initialScroll: 0,
})

const isMobile = computed(() => {
  return window && window.innerWidth < 768
})

const carouselRef = ref<HTMLDivElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

// Use the smart context
const context = createCarouselContext()
const { currentIndex, onImageLoad, onCardVisible, getImageState, checkIfReadyToShowImages } = context

onMounted(() => {
  if (carouselRef.value) {
    carouselRef.value.scrollLeft = props.initialScroll
    checkScrollability()
  }
})

watch(
  () => props.initialScroll,
  (newVal) => {
    if (carouselRef.value) {
      carouselRef.value.scrollLeft = newVal
      checkScrollability()
    }
  },
)

function checkScrollability() {
  if (carouselRef.value) {
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.value
    canScrollLeft.value = scrollLeft > 0
    canScrollRight.value = scrollLeft < scrollWidth - clientWidth
  }
}

function scrollLeft() {
  if (carouselRef.value) {
    carouselRef.value.scrollBy({ left: -300, behavior: 'smooth' })
  }
}

function scrollRight() {
  if (carouselRef.value) {
    carouselRef.value.scrollBy({ left: 300, behavior: 'smooth' })
  }
}

function handleCardClose(index: number) {
  if (carouselRef.value) {
    const cardWidth = isMobile.value ? 230 : 384 // (md:w-96)
    const gap = isMobile.value ? 4 : 8
    const scrollPosition = (cardWidth + gap) * (index + 1)
    carouselRef.value.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    })
    currentIndex.value = index
  }
}

provide(CarouselKey, {
  onCardClose: handleCardClose,
  currentIndex,
  onImageLoad,
  onCardVisible,
  getImageState,
  checkIfReadyToShowImages,
})
const isVisible = ref(false)
const buttonRef = templateRef('buttonRef')
useVisibilityObserver(buttonRef, isVisible, 100)
</script>

<template>
  <div class="relative w-full -mx-4">
    <!-- Carousel Navigation Buttons - Positioned absolutely in top-right -->
    <div
      ref="buttonRef"
      :class="isVisible ? 'animate-fade-in ease-out' : 'opacity-0'"
      class="absolute right-0 z-50 flex gap-2 -top-5 -translate-y-full"
    >
      <button
        :class="useClsx(
          'relative z-40 size-10 flex items-center justify-center',
          'rounded-full border-solid bg-sand-12',
          'backdrop-blur-sm transition-colors disabled:opacity-50',
        )"
        :disabled="!canScrollLeft"
        @click="scrollLeft"
      >
        <Icon
          name="tabler:arrow-narrow-left"
          class="size-5 color-sand-1"
        />
      </button>
      <button
        :class="useClsx(
          'relative z-40 size-10 flex items-center justify-center',
          'rounded-full border-solid bg-sand-12',
          'backdrop-blur-sm transition-colors disabled:opacity-50',
        )"
        :disabled="!canScrollRight"
        @click="scrollRight"
      >
        <Icon
          name="tabler:arrow-narrow-right"
          class="size-5 color-sand-1"
        />
      </button>
    </div>

    <div
      ref="carouselRef"
      class="[scrollbar-width:none] w-full flex overflow-x-scroll overflow-y-hidden overscroll-x-auto scroll-smooth"
      @scroll="checkScrollability"
    >
      <div
        :class="useClsx('absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l')"
      />

      <div
        :class="useClsx(
          'flex flex-row justify-start gap-4 pl-4',
          'max-w-7xl',
        )"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
