export interface RibbonTextProps {
  allowOverflow?: boolean
  showBackground?: boolean
  height?: string
  hideSettings?: boolean
}

export const RibbonTextDefaultProps: RibbonTextProps = {
  allowOverflow: false,
  showBackground: true,
  hideSettings: true,
}
