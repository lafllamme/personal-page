export interface GlowBorderProps {
  borderRadius?: number
  color?: string | Array<string>
  borderWidth?: number
  duration?: number
  class?: string
}

export const GlowBorderDefaultProps = {
  borderRadius: 9999,
  color: '#FFF',
  borderWidth: 3,
  duration: 12,
}
