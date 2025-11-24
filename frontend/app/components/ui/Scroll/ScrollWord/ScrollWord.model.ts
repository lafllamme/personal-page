export interface ScrollWordProps {
  word: string
  opacity?: number
  activeClass?: string
}

export const ScrollWordPropsDefaults: Required<Pick<ScrollWordProps, 'word' | 'opacity'>> = {
  word: '',
  opacity: 0,
}
