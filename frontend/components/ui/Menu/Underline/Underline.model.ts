export type variant = 'center' | 'left' | 'right' | 'full'
export type size = 'default' | 'big'

export interface UnderlineProps {
  className?: string
  variant?: variant
  size?: size
  color?: string
}

export const UnderlinePropsDefaults: Partial<UnderlineProps> = {
  className: '',
  variant: 'center',
  color: 'bg-mint-8 ',
  size: 'default',
}
