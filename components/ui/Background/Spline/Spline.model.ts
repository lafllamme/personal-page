export interface SplineProps {
  scene: string
  onLoad?: (app: any) => void
  renderOnDemand?: boolean
  style?: object
}
export const SplinePropsDefaults = {
  onLoad: () => {},
  renderOnDemand: true,
  style: () => ({}),
}
