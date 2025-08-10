export interface TextScrollRevealProps {
  class?: string
  text: string
  heightClass?: string
  outroSpacingClass?: string
  smoothingMs?: number
}

export const TextScrollRevealPropsDefaults: TextScrollRevealProps = {
  class: '',
  text: '',
  heightClass: 'h-[300vh]',
  outroSpacingClass: 'h-40 md:h-60',
  smoothingMs: 220,
}
