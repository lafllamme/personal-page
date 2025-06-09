import type { HTMLAttributes } from 'vue'

export interface InteractiveBorderProps {
  blur?: number
  inactiveZone?: number
  proximity?: number
  spread?: number
  variant?: 'default' | 'white'
  glow?: boolean
  class?: HTMLAttributes['class']
  disabled?: boolean
  movementDuration?: number
  borderWidth?: number
}

export const InteractiveBorderDefaultProps: InteractiveBorderProps = {
  blur: 0,
  inactiveZone: 0.7,
  proximity: 0,
  spread: 20,
  variant: 'default',
  glow: false,
  movementDuration: 2,
  borderWidth: 1.5,
  disabled: true,
}
