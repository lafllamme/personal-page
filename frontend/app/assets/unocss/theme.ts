import { PURE_BLACK, PURE_WHITE, themeColors } from './palette'

const keyframes = {
  enterFromRight: '0%{opacity:0;transform:translateX(200px);}100%{opacity:1;transform:translateX(0);}',
  enterFromLeft: '0%{opacity:0;transform:translateX(-200px);}100%{opacity:1;transform:translateX(0);}',
  exitToRight: '0%{opacity:1;transform:translateX(0);}100%{opacity:0;transform:translateX(200px);}',
  exitToLeft: '0%{opacity:1;transform:translateX(0);}100%{opacity:0;transform:translateX(-200px);}',
  scaleIn: '0%{opacity:0;transform:rotateX(-10deg) scale(0.9);}100%{opacity:1;transform:rotateX(0deg) scale(1);}',
  scaleOut: '0%{opacity:1;transform:rotateX(0deg) scale(1);}100%{opacity:0;transform:rotateX(-10deg) scale(0.95);}',
  fadeIn: '0%{opacity:0;}100%{opacity:1;}',
  fadeOut: '0%{opacity:1;}100%{opacity:0;}',
  uiGhostUnderlineSweep: '0%{transform:scaleX(1) rotate(0.001deg);transform-origin:right;}49%{transform:scaleX(0) rotate(0.001deg);transform-origin:right;}50%{transform:scaleX(0) rotate(0.001deg);transform-origin:left;}100%{transform:scaleX(1) rotate(0.001deg);transform-origin:left;}',
}

const animations = {
  scaleIn: 'scaleIn 200ms ease',
  scaleOut: 'scaleOut 200ms ease',
  fadeIn: 'fadeIn 200ms ease',
  fadeOut: 'fadeOut 200ms ease',
  enterFromLeft: 'enterFromLeft 250ms ease',
  enterFromRight: 'enterFromRight 250ms ease',
  exitToLeft: 'exitToLeft 250ms ease',
  exitToRight: 'exitToRight 250ms ease',
}

export const theme = {
  colors: {
    pureBlack: PURE_BLACK,
    pureWhite: PURE_WHITE,
    ...themeColors,
  },
  fontSize: {
    'type-size-xs': 'var(--type-size-xs)',
    'type-size-sm': 'var(--type-size-sm)',
    'type-size-md': 'var(--type-size-md)',
    'type-size-lg': 'var(--type-size-lg)',
    'type-size-xl': 'var(--type-size-xl)',
    'type-size-2xl': 'var(--type-size-2xl)',
    'type-size-3xl': 'var(--type-size-3xl)',
    'type-size-4xl': 'var(--type-size-4xl)',
  },
  fontFamily: {
    'type-family-display-hero': 'var(--type-family-display-hero)',
    'type-family-display-compact': 'var(--type-family-display-compact)',
    'type-family-headline': 'var(--type-family-headline)',
    'type-family-body': 'var(--type-family-body)',
    'type-family-meta': 'var(--type-family-meta)',
    'type-family-quote': 'var(--type-family-quote)',
    'type-family-signal': 'var(--type-family-signal)',
  },
  keyframes,
  animation: animations,
  duration: {},
  timingFns: {},
  properties: {},
  counts: {},
}
