export interface SplineProps {
  scene: string
  onLoad?: (app: any) => void
  renderOnDemand?: boolean
  style?: object
  debug?: boolean
}
export const SplinePropsDefaults = {
  onLoad: () => {},
  renderOnDemand: true,
  style: () => ({}),
  debug: false,
}
