export function useColorModeSync() {
  interface ColorMode {
    forced: boolean
    preference: string
    unknown: boolean
    value: string
  }
  return useState<ColorMode>('color-mode')
}
