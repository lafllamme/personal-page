export interface OverlayTextProps {
  class?: string
  onComplete?: () => void
  isExiting?: boolean
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
  autoHide: true,
  canComplete: true,
}
