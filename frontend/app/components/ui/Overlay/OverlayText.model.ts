export interface OverlayTextProps {
  class?: string
  onComplete?: () => void
}

export const OverlayTextDefaultProps: OverlayTextProps = {
  class: '',
  onComplete: undefined,
}
