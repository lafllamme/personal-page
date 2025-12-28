export interface RibbonTextProps {
  full?: boolean
  height?: number
  allowOverflow?: boolean
  showBackground?: boolean
}

export const RibbonTextDefaultProps: RibbonTextProps = {
  full: true,
  height: 520,
  allowOverflow: false,
  showBackground: true,
}
