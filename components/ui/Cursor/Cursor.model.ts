export interface CursorProps {
  clickableElements?: string[]
  textElements?: string[]
  clickableClasses?: string[]
  textClasses?: string[]
  forceType?: string[]
  size?: number
  color?: string
  textColor?: string
  textWidth?: number
  clickScale?: number
  minTextHeight?: number
}

export type CursorType = 'default' | 'click' | 'text'
// Notice we do not annotate CursorDefaultProps as CursorProps
export const CursorDefaultProps = {
  clickableElements: () => ['a', 'button', 'input[type="submit"]', 'input[type="button"]'],
  textElements: () => [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'span',
    'li',
    'blockquote',
    'input[type="text"]',
    'input[type="email"]',
    'input[type="password"]',
    'input[type="search"]',
    'input[type="tel"]',
    'input[type="url"]',
    'textarea',
  ],
  clickableClasses: () => ['cursor-animate-click', 'is-clickable'],
  textClasses: () => ['cursor-animate-text', 'is-text'],
  forceType: () => ['default-cursor', 'click-cursor', 'text-cursor'],
  size: 24,
  color: 'white',
  textColor: '#4CBBA5',
  textWidth: 4,
  clickScale: 1.8,
  minTextHeight: 18,
}
