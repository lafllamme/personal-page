export interface ColorModeProps {
  variant?: 'expand' | 'within'
  tone?: 'auto' | 'header'
}

export const ColorModeDefaultProps: ColorModeProps = {
  variant: 'expand',
  tone: 'auto',
}
