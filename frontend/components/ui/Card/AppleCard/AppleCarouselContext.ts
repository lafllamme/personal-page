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
  getImageState: (index: number) => { show: boolean, blur: boolean }
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

  // Track initial cards separately
  const initialCards = ref<Set<number>>(new Set())

  // Single computed for all image states
  const getImageState = computed(() => (index: number) => {
    const isInitial = !initialAnimationComplete.value
    const isInGrayPhase = isInitial && !imagesReady.value
    const isNewCard = !isInitial && visibleCards.value.has(index) && !initialCards.value.has(index)
    const isReadyToUnblur = newCardsUnblurReady.value.has(index)
    const wasInitialCard = initialCards.value.has(index)

    const state = {
      show: isInGrayPhase || isNewCard || isReadyToUnblur || (isInitial && imagesReady.value) || (wasInitialCard && imagesReady.value),
      blur: (isInGrayPhase || (isNewCard && !isReadyToUnblur)),
    }

    console.log(`🎨 [Card ${index}] State:`, {
      isInitial,
      isInGrayPhase,
      isNewCard,
      isReadyToUnblur,
      wasInitialCard,
      imagesReady: imagesReady.value,
      initialAnimationComplete: initialAnimationComplete.value,
      state,
    })

    return state
  })

  const checkIfReadyToShowImages = () => {
    if (initialAnimationComplete.value)
      return

    const visibleArray = Array.from(visibleCards.value)
    const loadedArray = Array.from(loadedImages.value)
    const missingCards = visibleArray.filter(cardIndex => !loadedArray.includes(cardIndex))

    console.log('🔍 checkIfReadyToShowImages:', {
      visibleArray,
      loadedArray,
      missingCards,
      initialAnimationComplete: initialAnimationComplete.value,
    })

    if (visibleArray.length > 0 && missingCards.length === 0) {
      const maxIndex = Math.max(...visibleArray)
      const maxDelay = 0.1 * maxIndex
      const totalAnimationTime = 600 + (maxDelay * 1000)

      console.log('⏱️ Starting timer:', { maxIndex, maxDelay, totalAnimationTime })

      const { start } = useTimeoutFn(() => {
        console.log('✨ Setting imagesReady to true')
        imagesReady.value = true
        initialAnimationComplete.value = true
      }, totalAnimationTime)

      start()
    }
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
  }
}
