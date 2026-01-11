export interface CaveTunnelProps {
  speed?: number
  showCeiling?: boolean
  scale?: number
  heightMultiplier?: number
  detailStrength?: number
  valleyWidth?: number
  flatShading?: boolean
  wireframe?: boolean
  bgColor?: string
  fogDensity?: number
  groundColor?: string
  ceilingColor?: string
  ambientInt?: number
  camLightInt?: number
}

export const caveTunnelDefaults: Required<CaveTunnelProps> = {
  speed: 6,
  showCeiling: false,
  scale: 10,
  heightMultiplier: 3.6,
  detailStrength: 0.27,
  valleyWidth: 25,
  flatShading: false,
  wireframe: false,
  bgColor: '#027864',
  fogDensity: 0.0104,
  groundColor: '#2f2d2d',
  ceilingColor: '#5e6a75',
  ambientInt: 2.1,
  camLightInt: 1.5,
}
