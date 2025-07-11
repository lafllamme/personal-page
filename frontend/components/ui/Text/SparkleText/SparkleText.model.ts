export interface Sparkle {
  id: string
  x: string
  y: string
  color: string
  delay: number
  scale: number
  lifespan: number
}

export interface SparkleTextProps {
  text: string
  sparklesCount?: number
  colors?: {
    first: string
    second: string
  }
  interval?: number
  class?: string
}

export const SparkleTextDefaultProps = {
  sparklesCount: 10,
  interval: 100,
  colors: () => ({ first: '#9E7AFF', second: '#FE8BBB' }),
}
