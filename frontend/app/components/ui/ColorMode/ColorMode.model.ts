export interface ColorModeProps {
  variant?: 'expand' | 'within'
  tone?: 'auto' | 'light' | 'dark'
}

export const ColorModeDefaultProps: ColorModeProps = {
  variant: 'expand',
  tone: 'auto',
}
