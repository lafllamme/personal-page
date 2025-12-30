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
  fitPadding?: number
  class?: string
}

export const TextBandDefaultProps = {
    text: '',
    segments: () => [
        'TECNEWS',
    ],
    backgroundColor: '#000000',
    textColor: '#ffffff',
    fontFamily: 'Geist',
    fontWeight: 500,
    fontSizeMin: 40,
    fontSizeMax: 250,
    textSpacing: 8,
    pace: 0.7,
    switchMs: 2200,
    switchFadeMs: 600,
    columnCount: 1,
    columnGap: 180,
    rowSpacing: 0.82,
  speedVariance: 0.35,
  amplitude: 1.7,
  amplitudeVariance: 0.35,
  stepEase: 2.6,
  fitPadding: 0.03,
  class: '',
}
