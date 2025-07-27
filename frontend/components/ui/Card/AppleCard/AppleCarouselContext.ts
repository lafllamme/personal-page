import type { InjectionKey, Ref } from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import { computed, ref } from 'vue'

export interface CarouselContextType {
  onCardClose: (index: number) => void
  currentIndex: Ref<number>
  onImageLoad: (index: number) => void
  onCardVisible: (index: number) => void
  checkIfReadyToShowImages: () => void
  // Computed properties for image states
  getImageState: (index: number) => { show: boolean, blur: boolean, grayscale: boolean }
  // Hover management
  setHoveredIndex: (index: number | null) => void
  hoveredIndex: Ref<number | null>
}

export const CarouselKey = Symbol() as InjectionKey<CarouselContextType>

// Smart state management
export function createCarouselContext() {
  const currentIndex = ref(0)
  const imagesReady = ref(false)
  const visibleCards = ref<Set<number>>(new Set())
  const loadedImages = ref<Set<number>>(new Set())
  const initialAnimationComplete = ref(false)
  const newCardsUnblurReady = ref<Set<number>>(new Set())
  const hoveredIndex = ref<number | null>(null)

  // Track initial cards separately
  const initialCards = ref<Set<number>>(new Set())

  // Single computed for all image states
  const getImageState = computed(() => (index: number) => {
    const isInitial = !initialAnimationComplete.value
    const isInGrayPhase = isInitial && !imagesReady.value
    const isNewCard = !isInitial && visibleCards.value.has(index) && !initialCards.value.has(index)
    const isReadyToUnblur = newCardsUnblurReady.value.has(index)
    const wasInitialCard = initialCards.value.has(index)

    // Simplified logic
    let shouldShow = true // Always show images
    let shouldBlur = true // Default to blurred
    let shouldGrayscale = false // Default to no grayscale

    if (isInGrayPhase) {
      shouldBlur = true
    } else if (isNewCard && !isReadyToUnblur) {
      shouldBlur = true
    } else if (wasInitialCard && imagesReady.value) {
      shouldBlur = false // Only initial cards unblur when images are ready
    } else if (isNewCard && isReadyToUnblur) {
      shouldBlur = false // New cards unblur only when their timeout is ready
    }

    // Grayscale logic: apply grayscale to all cards except the hovered one
    if (hoveredIndex.value !== null && hoveredIndex.value !== index) {
      shouldGrayscale = true
    }

    const state = {
      show: shouldShow,
      blur: shouldBlur,
      grayscale: shouldGrayscale,
    }

    return state
  })

  const checkIfReadyToShowImages = () => {
    if (initialAnimationComplete.value)
      return

    const visibleArray = Array.from(visibleCards.value)
    const loadedArray = Array.from(loadedImages.value)
    const missingCards = visibleArray.filter(cardIndex => !loadedArray.includes(cardIndex))

    if (visibleArray.length > 0 && missingCards.length === 0) {
      const maxIndex = Math.max(...visibleArray)
      const maxDelay = 0.1 * maxIndex
      const totalAnimationTime = 600 + (maxDelay * 1000)

      const { start } = useTimeoutFn(() => {
        imagesReady.value = true
        
        // Wait a bit more before marking initial animation complete
        const { start: completeStart } = useTimeoutFn(() => {
          initialAnimationComplete.value = true
        }, 1000)
        completeStart()
      }, totalAnimationTime)

      start()
    }
  }

  const setHoveredIndex = (index: number | null) => {
    hoveredIndex.value = index
  }

  return {
    currentIndex,
    onImageLoad: (index: number) => {
      loadedImages.value.add(index)
      checkIfReadyToShowImages()
    },
    onCardVisible: (index: number) => {
      visibleCards.value.add(index)

      if (!initialAnimationComplete.value) {
        // Track as initial card
        initialCards.value.add(index)
      }
      else {
        // New card logic
        const { start } = useTimeoutFn(() => {
          newCardsUnblurReady.value.add(index)
        }, 1000)
        start()
      }

      checkIfReadyToShowImages()
    },
    onCardClose: (index: number) => {
      // Implementation in carousel
    },
    checkIfReadyToShowImages,
    getImageState: getImageState.value,
    setHoveredIndex,
    hoveredIndex,
  }
}
