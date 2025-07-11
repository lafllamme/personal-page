export interface ScrollWordProps {
  word: string
  progress: number
  range: Array<number>
}

export const ScrollWordPropsDefaults = {
  word: '',
  progress: 0,
}
