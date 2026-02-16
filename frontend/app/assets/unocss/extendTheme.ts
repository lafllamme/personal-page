import type { Theme } from 'unocss/preset-uno'

export function extendTheme(theme: Theme) {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      pureBlack: '#000000',
      pureWhite: '#f2efe6',
    },
  }
}
