<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useClsx } from '@/composables/useClsx'

const props = withDefaults(defineProps<{
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
  role?: 'display' | 'headline' | 'body' | 'meta' | 'quote' | 'signal'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  tone?: 'default' | 'muted'
  weight?: 'auto' | 'thin' | 'extralight' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  italic?: boolean
  uppercase?: boolean
}>(), {
  as: 'p',
  role: 'body',
  size: 'md',
  tone: 'default',
  weight: 'auto',
  uppercase: false,
})

const { as, role, size, tone, weight, italic, uppercase } = toRefs(props)

const typeClass = {
  display: {
    'xs': 'type-display-xs',
    'sm': 'type-display-sm',
    'md': 'type-display-md',
    'lg': 'type-display-lg',
    'xl': 'type-display-xl',
    '2xl': 'type-display-2xl',
    '3xl': 'type-display-3xl',
    '4xl': 'type-display-4xl',
  },
  headline: {
    'xs': 'type-headline-xs',
    'sm': 'type-headline-sm',
    'md': 'type-headline-md',
    'lg': 'type-headline-lg',
    'xl': 'type-headline-xl',
    '2xl': 'type-headline-2xl',
    '3xl': 'type-headline-3xl',
    '4xl': 'type-headline-4xl',
  },
  body: {
    'xs': 'type-body-xs',
    'sm': 'type-body-sm',
    'md': 'type-body-md',
    'lg': 'type-body-lg',
    'xl': 'type-body-xl',
    '2xl': 'type-body-2xl',
    '3xl': 'type-body-3xl',
    '4xl': 'type-body-4xl',
  },
  meta: {
    'xs': 'type-meta-xs',
    'sm': 'type-meta-sm',
    'md': 'type-meta-md',
    'lg': 'type-meta-lg',
    'xl': 'type-meta-xl',
    '2xl': 'type-meta-2xl',
    '3xl': 'type-meta-3xl',
    '4xl': 'type-meta-4xl',
  },
  quote: {
    'xs': 'type-quote-xs',
    'sm': 'type-quote-sm',
    'md': 'type-quote-md',
    'lg': 'type-quote-lg',
    'xl': 'type-quote-xl',
    '2xl': 'type-quote-2xl',
    '3xl': 'type-quote-3xl',
    '4xl': 'type-quote-4xl',
  },
  signal: {
    'xs': 'type-signal-xs',
    'sm': 'type-signal-sm',
    'md': 'type-signal-md',
    'lg': 'type-signal-lg',
    'xl': 'type-signal-xl',
    '2xl': 'type-signal-2xl',
    '3xl': 'type-signal-3xl',
    '4xl': 'type-signal-4xl',
  },
} as const

const toneClass = {
  default: '',
  muted: 'opacity-70',
} as const

const roleDefaultWeight = {
  display: 500,
  headline: 400,
  body: 300,
  meta: 500,
  quote: 400,
  signal: 600,
} as const

const weightClassByValue = {
  100: 'font-thin',
  200: 'font-extralight',
  300: 'font-light',
  400: 'font-normal',
  500: 'font-medium',
  600: 'font-semibold',
  700: 'font-bold',
  800: 'font-extrabold',
  900: 'font-black',
} as const

const roleAllowedWeights = {
  // Druk local cuts
  display: [500, 700, 800, 900],
  // ClashDisplay local cuts
  headline: [200, 300, 400, 500, 700],
  // Manrope variable 200-800
  body: [200, 300, 400, 500, 600, 700, 800],
  // Space Grotesk variable 300-700
  meta: [300, 400, 500, 600, 700],
  // Libre Baskerville static 400/700
  quote: [400, 700],
  // Zalando Sans Expanded variable 200-900
  signal: [200, 300, 400, 500, 600, 700, 800, 900],
} as const

const weightToNumber = {
  thin: 100,
  extralight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
  100: 100,
  200: 200,
  300: 300,
  400: 400,
  500: 500,
  600: 600,
  700: 700,
  800: 800,
  900: 900,
} as const

const resolvedWeight = computed(() => {
  const target = weight.value === 'auto'
    ? roleDefaultWeight[role.value]
    : weightToNumber[weight.value]

  const allowedWeights = roleAllowedWeights[role.value]
  return allowedWeights.reduce((closest, current) => {
    return Math.abs(current - target) < Math.abs(closest - target) ? current : closest
  }, allowedWeights[0])
})

const resolvedItalic = computed(() => {
  if (typeof italic.value === 'boolean')
    return italic.value

  return role.value === 'quote'
})

const rootClass = computed(() => useClsx(
  typeClass[role.value][size.value],
  weightClassByValue[resolvedWeight.value],
  resolvedItalic.value && 'italic',
  toneClass[tone.value],
  uppercase.value && 'uppercase',
))
</script>

<template>
  <component :is="as" :class="rootClass">
    <slot />
  </component>
</template>
