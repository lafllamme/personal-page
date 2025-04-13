export interface CursorProps {
  size: number
  glowIntensity: number
  blurAmount: number
  offsetX: number
  offsetY: number
}

export const CursorPropsDefaults: CursorProps = {
  size: 20,
  glowIntensity: 0.15,
  blurAmount: 8,
  offsetX: -1,
  offsetY: -1,
}
