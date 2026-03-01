<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useClsx } from '@/composables/useClsx'

const props = withDefaults(defineProps<{
  name: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'sand' | 'accent' | 'accent-soft' | 'accent-strong'
  background?: boolean
}>(), {
  size: 'md',
  variant: 'default',
  background: false,
})

const { size, variant, background } = toRefs(props)

const glyphSizeClass = {
  sm: 'ui-icon-glyph-sm',
  md: 'ui-icon-glyph-md',
  lg: 'ui-icon-glyph-lg',
} as const

const frameSizeClass = {
  sm: 'ui-icon-frame-sm',
  md: 'ui-icon-frame-md',
  lg: 'ui-icon-frame-lg',
} as const

const toneClass = {
  'default': {
    plain: 'ui-icon-v-default',
    surface: 'ui-icon-v-default-bg',
  },
  'sand': {
    plain: 'ui-icon-v-sand',
    surface: 'ui-icon-v-sand-bg',
  },
  'accent': {
    plain: 'ui-icon-v-accent',
    surface: 'ui-icon-v-accent-bg',
  },
  'accent-soft': {
    plain: 'ui-icon-v-accent-soft',
    surface: 'ui-icon-v-accent-soft-bg',
  },
  'accent-strong': {
    plain: 'ui-icon-v-accent-strong',
    surface: 'ui-icon-v-accent-strong-bg',
  },
} as const

const rootClass = computed(() => useClsx(
  'ui-icon-base',
  background.value ? frameSizeClass[size.value] : '',
  toneClass[variant.value][background.value ? 'surface' : 'plain'],
))

const iconClass = computed(() => useClsx(
  glyphSizeClass[size.value],
))
</script>

<template>
  <span :class="rootClass" aria-hidden="true">
    <Icon :name="name" :class="iconClass" />
  </span>
</template>
