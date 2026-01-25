export interface OverlayTextProps {
  class?: string
  onComplete?: () => void
  isExiting?: boolean
  loop?: boolean
  textClass?: string
  textLabel?: string
  textSizePx?: number
  /**
   * Automatically hide after first full band cycle when allowed to complete.
   */
  autoHide?: boolean
  /**
   * External gate to allow auto hide (e.g., wait for a resource to be ready).
   */
  canComplete?: boolean
}

export const OverlayTextDefaultProps: OverlayTextProps = {
  class: '',
  onComplete: undefined,
  isExiting: false,
  loop: false,
  textClass: '',
  textLabel: '',
  textSizePx: undefined,
  autoHide: true,
  canComplete: true,
}
