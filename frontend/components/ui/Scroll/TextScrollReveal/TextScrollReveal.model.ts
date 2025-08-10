export interface TextScrollRevealProps {
  class?: string
  text: string
  heightClass?: string
  /**
   * Height of the inner progress wrapper that defines when the reveal completes.
   * Example: outer `heightClass` = 400vh, `progressHeightClass` = 300vh →
   * text fully revealed after 300vh, but sticky container remains for 100vh linger.
   */
  progressHeightClass?: string
  smoothingMs?: number
}

export const TextScrollRevealPropsDefaults: TextScrollRevealProps = {
  class: '',
  text: '',
  heightClass: 'h-[400vh]',
  progressHeightClass: 'h-[300vh]',
  smoothingMs: 220,
}
