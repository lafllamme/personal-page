export interface ScrollMarqueeProps {
  /**
   * The base velocity for the parallax effect.
   * @default -5
   */
  baseVelocity?: number
  /**
   * Optional CSS class for styling the component.
   */
  className?: string
  /**
   * Whether the animation should depend on scroll direction.
   * When true, the marquee reverses direction based on scroll velocity.
   * @default false
   */
  scrollDependent?: boolean
  /**
   * Delay before the animation starts (in milliseconds).
   * @default 0
   */
  delay?: number
}

export const ScrollMarqueePropsDefaults: Required<Pick<ScrollMarqueeProps, 'baseVelocity' | 'scrollDependent' | 'delay'>> = {
  baseVelocity: -5,
  scrollDependent: false,
  delay: 0,
}
