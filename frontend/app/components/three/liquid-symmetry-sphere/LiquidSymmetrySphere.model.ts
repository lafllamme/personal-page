export type GradientMode = 'vertical' | 'horizontal' | 'radial' | 'diagonal'

export interface LiquidSymmetrySettings {
  meshDensity: number
  wireframe: boolean
  animationSpeed: number
  bubble1Speed: number
  bubble1Amount: number
  bubble1Frequency: number
  bubble2Speed: number
  bubble2Amount: number
  bubble2Frequency: number
  bubble3Speed: number
  bubble3Amount: number
  bubble3Frequency: number
  pulseSpeed: number
  pulseAmount: number
  transparency: number
  sphereSize: number
  cameraDistance: number
  rotationYSpeed: number
  rotationXSpeed: number
  rotationXAmount: number
  color1R: number
  color1G: number
  color1B: number
  color2R: number
  color2G: number
  color2B: number
  gradientMode: GradientMode
  glowSpeed: number
  glowAmount: number
  breathingEnabled: boolean
  breathingSpeed: number
  breathingIntensity: number
}

export const LiquidSymmetryDefaults: LiquidSymmetrySettings = {
  meshDensity: 128,
  wireframe: true,
  animationSpeed: 0.016,
  bubble1Speed: 2,
  bubble1Amount: 0.08,
  bubble1Frequency: 6,
  bubble2Speed: 2.5,
  bubble2Amount: 0.07,
  bubble2Frequency: 7,
  bubble3Speed: 1.5,
  bubble3Amount: 0.075,
  bubble3Frequency: 5,
  pulseSpeed: 0.8,
  pulseAmount: 0.05,
  transparency: 0.9,
  sphereSize: 1.5,
  cameraDistance: 3.5,
  rotationYSpeed: 0.005,
  rotationXSpeed: 0.3,
  rotationXAmount: 0.1,
  color1R: 0.7,
  color1G: 1.0,
  color1B: 0.9,
  color2R: 0.85,
  color2G: 0.8,
  color2B: 1.0,
  gradientMode: 'vertical',
  glowSpeed: 0.5,
  glowAmount: 0.15,
  breathingEnabled: false,
  breathingSpeed: 0.8,
  breathingIntensity: 0.1,
}
