export interface TextBandProps {
  text?: string
  segments?: string[]
  backgroundColor?: string
  textColor?: string
  fontFamily?: string
  fontWeight?: number
  fontSizeMin?: number
  fontSizeMax?: number
  textSpacing?: number
  pace?: number
  switchMs?: number
  switchFadeMs?: number
  columnCount?: number
  columnGap?: number
  rowSpacing?: number
  speedVariance?: number
  amplitude?: number
  amplitudeVariance?: number
  stepEase?: number
  stepHold?: number
  alignChance?: number
  fitPadding?: number
  paused?: boolean
  class?: string
}

export const TextBandDefaultProps = {
  text: '',
  segments: () => [
    'TECNEWS',
  ],
  fontFamily: 'Figtree',
  fontWeight: 500,
  fontSizeMin: 40,
  fontSizeMax: 300,
  textSpacing: 0,
  pace: 0.95,
  switchMs: 2200,
  switchFadeMs: 600,
  columnCount: 1,
  columnGap: 180,
  rowSpacing: 0.82,
  speedVariance: 0,
  amplitude: 2.35,
  amplitudeVariance: 0.35,
  stepEase: 5,
  stepHold: 0,
  alignChance: 0.25,
  fitPadding: 0,
  paused: false,
  class: '',
}
