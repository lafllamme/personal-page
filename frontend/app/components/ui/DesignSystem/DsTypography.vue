<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useClsx } from '@/composables/useClsx'

const props = withDefaults(defineProps<{
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
  role?: 'display' | 'headline' | 'body' | 'meta' | 'quote' | 'signal'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  tone?: 'default' | 'muted'
  uppercase?: boolean
}>(), {
  as: 'p',
  role: 'body',
  size: 'md',
  tone: 'default',
  uppercase: false,
})

const { as, role, size, tone, uppercase } = toRefs(props)

const typeClass = {
  display: {
    'xs': 'ui-type-display-xs',
    'sm': 'ui-type-display-sm',
    'md': 'ui-type-display-md',
    'lg': 'ui-type-display-lg',
    'xl': 'ui-type-display-xl',
    '2xl': 'ui-type-display-2xl',
    '3xl': 'ui-type-display-3xl',
    '4xl': 'ui-type-display-4xl',
  },
  headline: {
    'xs': 'ui-type-headline-xs',
    'sm': 'ui-type-headline-sm',
    'md': 'ui-type-headline-md',
    'lg': 'ui-type-headline-lg',
    'xl': 'ui-type-headline-xl',
    '2xl': 'ui-type-headline-2xl',
    '3xl': 'ui-type-headline-3xl',
    '4xl': 'ui-type-headline-4xl',
  },
  body: {
    'xs': 'ui-type-body-xs',
    'sm': 'ui-type-body-sm',
    'md': 'ui-type-body-md',
    'lg': 'ui-type-body-lg',
    'xl': 'ui-type-body-xl',
    '2xl': 'ui-type-body-2xl',
    '3xl': 'ui-type-body-3xl',
    '4xl': 'ui-type-body-4xl',
  },
  meta: {
    'xs': 'ui-type-meta-xs',
    'sm': 'ui-type-meta-sm',
    'md': 'ui-type-meta-md',
    'lg': 'ui-type-meta-lg',
    'xl': 'ui-type-meta-xl',
    '2xl': 'ui-type-meta-2xl',
    '3xl': 'ui-type-meta-3xl',
    '4xl': 'ui-type-meta-4xl',
  },
  quote: {
    'xs': 'ui-type-quote-xs',
    'sm': 'ui-type-quote-sm',
    'md': 'ui-type-quote-md',
    'lg': 'ui-type-quote-lg',
    'xl': 'ui-type-quote-xl',
    '2xl': 'ui-type-quote-2xl',
    '3xl': 'ui-type-quote-3xl',
    '4xl': 'ui-type-quote-4xl',
  },
  signal: {
    'xs': 'ui-type-signal-xs',
    'sm': 'ui-type-signal-sm',
    'md': 'ui-type-signal-md',
    'lg': 'ui-type-signal-lg',
    'xl': 'ui-type-signal-xl',
    '2xl': 'ui-type-signal-2xl',
    '3xl': 'ui-type-signal-3xl',
    '4xl': 'ui-type-signal-4xl',
  },
} as const

const toneClass = {
  default: '',
  muted: 'opacity-70',
} as const

const rootClass = computed(() => useClsx(
  typeClass[role.value][size.value],
  toneClass[tone.value],
  uppercase.value && 'uppercase',
))
</script>

<template>
  <component :is="as" :class="rootClass">
    <slot />
  </component>
</template>
