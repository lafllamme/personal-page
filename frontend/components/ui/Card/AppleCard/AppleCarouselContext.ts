import type { InjectionKey, Ref } from 'vue'

export interface CarouselContextType {
  onCardClose: (index: number) => void
  currentIndex: Ref<number>
  imagesReady: Ref<boolean>
  onImageLoad: (index: number) => void
  onCardVisible: (index: number) => void
  cardsInGrayPhase: Ref<Set<number>>
  newCardsAfterReady: Ref<Set<number>>
}

export const CarouselKey = Symbol() as InjectionKey<CarouselContextType>
