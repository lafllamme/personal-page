<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useClsx } from '@/composables/useClsx'

const props = withDefaults(defineProps<{
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
  role?: 'display' | 'headline' | 'body' | 'meta' | 'quote' | 'signal'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
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
  display: 'font-druk-bold',
  headline: 'font-clash-regular',
  body: 'font-manrope',
  meta: 'space-grotesk-regular tracking-[0.16em]',
  quote: 'font-baskerville italic',
  signal: 'zalando-sans-expanded font-semibold',
} as const

const sizeClass = {
  'xs': 'text-[10px] leading-[1.35]',
  'sm': 'text-xs leading-[1.45]',
  'md': 'text-sm leading-[1.55] md:text-base',
  'lg': 'text-[1.15rem] leading-[1.35]',
  'xl': 'text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.12]',
  '2xl': 'text-[clamp(1.8rem,4.2vw,3.2rem)] leading-[1.02]',
  '3xl': 'text-[clamp(2.4rem,6.2vw,5rem)] leading-[0.95]',
} as const

const toneClass = {
  default: '',
  muted: 'opacity-70',
} as const

const rootClass = computed(() => useClsx(
  roleClass[role.value],
  sizeClass[size.value],
  toneClass[tone.value],
  uppercase.value && 'uppercase',
))
</script>

<template>
  <component :is="as" :class="rootClass">
    <slot />
  </component>
</template>
