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

const roleClass = {
  display: '',
  headline: 'font-clash-regular',
  body: 'font-manrope',
  meta: 'space-grotesk-regular tracking-[0.16em]',
  quote: 'font-baskerville italic',
  signal: 'zalando-sans-expanded font-semibold',
} as const

const sizeClass = {
  'xs': 'text-[clamp(0.75rem,0.68rem+0.22vw,0.875rem)] leading-[1.35]',
  'sm': 'text-[clamp(0.875rem,0.8rem+0.3vw,1rem)] leading-[1.45]',
  'md': 'text-[clamp(1rem,0.92rem+0.38vw,1.125rem)] leading-[1.55]',
  'lg': 'text-[clamp(1.125rem,1rem+0.52vw,1.375rem)] leading-[1.35]',
  'xl': 'text-[clamp(1.375rem,1.12rem+1.1vw,2rem)] leading-[1.12]',
  '2xl': 'text-[clamp(1.75rem,1.35rem+1.9vw,3rem)] leading-[1.02]',
  '3xl': 'text-[clamp(2.25rem,1.65rem+3vw,4.75rem)] leading-[0.95]',
  '4xl': 'text-[clamp(2.6rem,1.85rem+4.1vw,6.2rem)] leading-[0.92]',
} as const

const toneClass = {
  default: '',
  muted: 'opacity-70',
} as const

const displayFamilyClass = computed(() => {
  if (role.value !== 'display')
    return ''
  return ['md', 'lg', 'xl', '2xl', '3xl', '4xl'].includes(size.value) ? 'font-druk-bold' : 'font-druk-text-bold'
})

const displaySizeClass = computed(() => {
  if (role.value !== 'display')
    return ''

  if (size.value === 'xs')
    return 'tracking-[0.042em] md:tracking-[0.044em]'
  if (size.value === 'sm')
    return 'tracking-[0.046em] md:tracking-[0.048em]'
  if (size.value === 'md')
    return 'tracking-[0.05em] md:tracking-[0.052em]'
  if (size.value === 'lg')
    return 'tracking-[0.049em] md:tracking-[0.051em]'
  if (size.value === 'xl')
    return 'tracking-[0.048em] md:tracking-[0.05em]'
  if (size.value === '2xl')
    return 'tracking-[0.046em] md:tracking-[0.048em]'
  if (size.value === '3xl')
    return 'tracking-[0.044em] md:tracking-[0.046em]'
  if (size.value === '4xl')
    return 'tracking-[0.042em] md:tracking-[0.044em]'
  return ''
})

const rootClass = computed(() => useClsx(
  roleClass[role.value],
  displayFamilyClass.value,
  sizeClass[size.value],
  displaySizeClass.value,
  toneClass[tone.value],
  uppercase.value && 'uppercase',
))
</script>

<template>
  <component :is="as" :class="rootClass">
    <slot />
  </component>
</template>
