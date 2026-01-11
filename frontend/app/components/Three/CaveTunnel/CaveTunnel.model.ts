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
  speed: 6.0,
  showCeiling: true,
  scale: 30.0,
  heightMultiplier: 3.6,
  detailStrength: 0.27,
  valleyWidth: 25.0,
  flatShading: false,
  wireframe: false,
  bgColor: '#b6c2cc',
  fogDensity: 0.0104,
  groundColor: '#1a1a1a',
  ceilingColor: '#5e6a75',
  ambientInt: 0.6,
  camLightInt: 1.5,
}
