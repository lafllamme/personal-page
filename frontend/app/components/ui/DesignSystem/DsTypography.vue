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
