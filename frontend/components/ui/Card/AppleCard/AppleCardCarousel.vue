<script setup lang="ts">
import { CarouselKey } from './AppleCarouselContext'

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
const currentIndex = ref(0)
const imagesReady = ref(false)
const visibleCards = ref<Set<number>>(new Set())
const loadedImages = ref<Set<number>>(new Set())
const cardsInGrayPhase = ref<Set<number>>(new Set())
const newCardsAfterReady = ref<Set<number>>(new Set())
const initialViewportCards = ref<Set<number>>(new Set())
const initialAnimationComplete = ref(false)

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

function onCardVisible(index: number) {
  visibleCards.value.add(index)
  console.log(`👁️ Card ${index} visible | Total: ${visibleCards.value.size}`)
  
  // Track initial viewport cards (cards visible before first animation completes)
  if (!initialAnimationComplete.value) {
    initialViewportCards.value.add(index)
    console.log(`🎯 Card ${index} added to initial viewport`)
  }
  
  // Add to gray phase if images are not ready yet
  if (!imagesReady.value) {
    cardsInGrayPhase.value.add(index)
    console.log(`🎭 Card ${index} added to gray phase`)
  } else {
    // This is a new card after imagesReady - show images immediately but still participate in unblur
    newCardsAfterReady.value.add(index)
    console.log(`🆕 Card ${index} - new card after imagesReady, showing images immediately`)
  }
  
  checkIfReadyToShowImages()
}

function onImageLoad(index: number) {
  loadedImages.value.add(index)
  console.log(`🖼️ Image ${index} loaded | Total: ${loadedImages.value.size}`)
  checkIfReadyToShowImages()
}

function checkIfReadyToShowImages() {
  const visibleArray = Array.from(visibleCards.value)
  const loadedArray = Array.from(loadedImages.value)
  const missingCards = visibleArray.filter(cardIndex => !loadedArray.includes(cardIndex))
  
  if (visibleArray.length > 0 && missingCards.length === 0) {
    // Calculate delay based on the highest index (last card to animate)
    const maxIndex = Math.max(...visibleArray)
    const maxDelay = 0.1 * maxIndex
    const totalAnimationTime = 600 + (maxDelay * 1000)
    
    console.log(`⏱️ All ${visibleArray.length} visible cards loaded | Max index: ${maxIndex} | Waiting ${totalAnimationTime}ms`)
    
    // Use VueUse's useTimeoutFn for better timer management
    const { start } = useTimeoutFn(() => {
      console.log('✨ Swipe animations finished - switching to images')
      imagesReady.value = true
      // Clear new cards set since imagesReady is now true
      newCardsAfterReady.value.clear()
    }, totalAnimationTime)
    
    start()
  } else if (missingCards.length > 0) {
    console.log(`⏳ Waiting for cards: ${missingCards.join(', ')}`)
  }
}

// Debug: log when imagesReady changes
watch(imagesReady, (ready) => {
  console.log('imagesReady changed to:', ready)
})

provide(CarouselKey, {
  onCardClose: handleCardClose,
  currentIndex,
  imagesReady,
  onImageLoad,
  onCardVisible,
  cardsInGrayPhase,
  newCardsAfterReady,
  initialViewportCards,
  initialAnimationComplete,
})
</script>

<template>
  <div class="relative w-full -mx-4">
    <div
      ref="carouselRef"
      class="[scrollbar-width:none] w-full flex overflow-x-scroll overscroll-x-auto scroll-smooth py-10 md:py-20"
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
    <div class="mr-10 flex justify-end gap-2">
      <button
        class="bg-gray-100 relative z-40 size-10 flex items-center justify-center rounded-full disabled:opacity-50"
        :disabled="!canScrollLeft"
        @click="scrollLeft"
      >
        <Icon
          name="tabler:arrow-narrow-left"
          class="text-gray-500 size-6"
        />
      </button>
      <button
        class="bg-gray-100 relative z-40 size-10 flex items-center justify-center rounded-full disabled:opacity-50"
        :disabled="!canScrollRight"
        @click="scrollRight"
      >
        <Icon
          name="tabler:arrow-narrow-right"
          class="text-gray-500 size-6"
        />
      </button>
    </div>
  </div>
</template>
