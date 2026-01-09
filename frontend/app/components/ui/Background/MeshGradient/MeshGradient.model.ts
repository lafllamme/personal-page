export type MeshGradientType = 'sphere' | 'plane' | 'waterPlane'
export type MeshGradientAnimate = 'on' | 'off'
export type MeshGradientRangeMode = 'enabled' | 'disabled'
export type MeshGradientLoopMode = 'on' | 'off'
export type MeshGradientLightType = '3d' | 'env'
export type MeshGradientGrainState = 'on' | 'off'
export type MeshGradientControlMode = 'query' | 'props'
export type MeshGradientEnvPreset = 'city' | 'dawn' | 'lobby'

export interface MeshGradientProps {
  type?: MeshGradientType
  animate?: MeshGradientAnimate
  controlMode?: MeshGradientControlMode
  color1?: string
  color2?: string
  color3?: string
  uTime?: number
  speed?: number
  strength?: number
  density?: number
  frequency?: number
  amplitude?: number
  rangeMode?: MeshGradientRangeMode
  rangeStart?: number
  rangeEnd?: number
  loop?: MeshGradientLoopMode
  loopDuration?: number
  positionX?: number
  positionY?: number
  positionZ?: number
  rotationX?: number
  rotationY?: number
  rotationZ?: number
  cDistance?: number
  cPolarAngle?: number
  cAzimuthAngle?: number
  cameraZoom?: number
  reflection?: number
  brightness?: number
  lightType?: MeshGradientLightType
  envPreset?: MeshGradientEnvPreset
  grain?: MeshGradientGrainState
  grainBlending?: number
  wireframe?: boolean
  toggleAxis?: boolean
  zoomOut?: boolean
  hoverState?: string
  enableTransition?: boolean
  enableCameraUpdate?: boolean
}

export const meshGradientDefaults: Required<MeshGradientProps> = {
  type: 'sphere',
  animate: 'on',
  controlMode: 'props',
  color1: '#73bfc4',
  color2: '#ff810a',
  color3: '#8da0ce',
  uTime: 0,
  speed: 0.3,
  strength: 0.3,
  density: 0.8,
  frequency: 5.5,
  amplitude: 3.2,
  rangeMode: 'disabled',
  rangeStart: 0,
  rangeEnd: 5,
  loop: 'off',
  loopDuration: 5,
  positionX: -0.1,
  positionY: 0,
  positionZ: 0,
  rotationX: 0,
  rotationY: 130,
  rotationZ: 70,
  cDistance: 0.5,
  cPolarAngle: 180,
  cAzimuthAngle: 270,
  cameraZoom: 15.1,
  reflection: 0.4,
  brightness: 0.8,
  lightType: 'env',
  envPreset: 'city',
  grain: 'on',
  grainBlending: 0.2,
  wireframe: false,
  toggleAxis: false,
  zoomOut: false,
  hoverState: '',
  enableTransition: false,
  enableCameraUpdate: false,
}
