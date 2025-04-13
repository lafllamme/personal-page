export type variant = 'center' | 'left' | 'right'

export interface UnderlineProps {
  className?: string
  variant?: variant
  color?: string
}

export const UnderlinePropsDefaults: Partial<UnderlineProps> = {
  className: '',
  variant: 'center',
  color: 'bg-mint-8 ',
}
