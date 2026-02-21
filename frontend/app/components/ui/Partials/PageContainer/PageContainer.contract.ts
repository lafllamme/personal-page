/**
 * Transition Layer:
 * Kept for default/legacy layout compatibility.
 * Source of truth for new DS layout spacing lives in:
 * - palette.ts (layout tokens)
 * - shortcuts.layout.ts (ui-l-* mappings)
 */
export type LayoutContainerMax = '5xl' | '6xl' | '7xl' | 'full'
export type LayoutContainerGutter = 'none' | 'sm' | 'md' | 'lg'
export type LayoutContainerTag = 'div' | 'section' | 'main' | 'article'

export const LayoutContainerMaxClasses: Record<LayoutContainerMax, string> = {
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  'full': 'max-w-full',
}

export const LayoutContainerGutterClasses: Record<LayoutContainerGutter, string> = {
  none: '',
  sm: 'px-4 sm:px-5',
  md: 'px-4 md:px-8',
  lg: 'px-5 sm:px-6 md:px-12',
}

export const LayoutContainerBleedClasses: Record<LayoutContainerGutter, string> = {
  none: 'max-w-none',
  sm: '-mx-4 w-[calc(100%+2rem)] sm:-mx-5 sm:w-[calc(100%+2.5rem)] max-w-none',
  md: '-mx-4 w-[calc(100%+2rem)] md:-mx-8 md:w-[calc(100%+4rem)] max-w-none',
  lg: '-mx-5 w-[calc(100%+2.5rem)] sm:-mx-6 sm:w-[calc(100%+3rem)] md:-mx-12 md:w-[calc(100%+6rem)] max-w-none',
}
