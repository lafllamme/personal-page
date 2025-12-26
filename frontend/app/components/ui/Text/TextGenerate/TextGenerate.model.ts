import type { HTMLAttributes } from 'vue'

export interface TextGenerateProps {
  words: string
  filter?: boolean
  duration?: number
  delay?: number
  active?: boolean
  class?: HTMLAttributes['class']
}

export const TextGenerateDefaultProps = {
  duration: 0.7,
  delay: 0,
  filter: true,
  active: true,
}
