<script setup lang="ts">
import { computed, toRefs } from 'vue'

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'quaternary'
type ButtonVariant = 'default' | 'accent'
type LegacyVariant = ButtonType | 'quartery'
type PreviewState = 'default' | 'hover' | 'active' | 'focus-visible'
type ComboKey = `${ButtonVariant}-${ButtonType}`
type InteractivePreviewState = Exclude<PreviewState, 'default'>

const props = withDefaults(defineProps<{
  type?: ButtonType
  variant?: ButtonVariant | LegacyVariant
  previewState?: PreviewState
  disabled?: boolean
}>(), {
  type: 'primary',
  variant: 'default',
  previewState: 'default',
  disabled: false,
})

const { type, variant, previewState, disabled } = toRefs(props)
const LEGACY_VARIANT_TYPES: LegacyVariant[] = ['primary', 'secondary', 'tertiary', 'quaternary', 'quartery']

const isLegacyTypeVariant = computed(() => LEGACY_VARIANT_TYPES.includes(variant.value))

const normalizedType = computed<ButtonType>(() => {
  if (type.value)
    return type.value

  if (variant.value === 'quartery')
    return 'quaternary'

  if (isLegacyTypeVariant.value)
    return variant.value as ButtonType

  return 'primary'
})

const normalizedVariant = computed<ButtonVariant>(() => {
  if (isLegacyTypeVariant.value)
    return 'accent'

  return (variant.value as ButtonVariant) ?? 'default'
})

const variantTypeClassMap: Record<ComboKey, string> = {
  'default-primary': 'v-neutral-solid',
  'default-secondary': 'v-neutral-outline',
  'default-tertiary': 'v-neutral-ghost',
  'default-quaternary': 'v-neutral-soft',
  'accent-primary': 'v-accent-solid',
  'accent-secondary': 'v-accent-outline',
  'accent-tertiary': 'v-accent-ghost',
  'accent-quaternary': 'v-accent-soft',
}

const variantTypePreviewStateClassMap: Record<ComboKey, Record<InteractivePreviewState, string>> = {
  'default-primary': {
    'hover': 'v-neutral-solid-hover',
    'active': 'v-neutral-solid-active',
    'focus-visible': 'v-neutral-solid-focus',
  },
  'default-secondary': {
    'hover': 'v-neutral-outline-hover',
    'active': 'v-neutral-outline-active',
    'focus-visible': 'v-neutral-outline-focus',
  },
  'default-tertiary': {
    'hover': 'v-neutral-ghost-hover',
    'active': 'v-neutral-ghost-active',
    'focus-visible': 'v-neutral-ghost-focus',
  },
  'default-quaternary': {
    'hover': 'v-neutral-soft-hover',
    'active': 'v-neutral-soft-active',
    'focus-visible': 'v-neutral-soft-focus',
  },
  'accent-primary': {
    'hover': 'v-accent-solid-hover',
    'active': 'v-accent-solid-active',
    'focus-visible': 'v-accent-solid-focus',
  },
  'accent-secondary': {
    'hover': 'v-accent-outline-hover',
    'active': 'v-accent-outline-active',
    'focus-visible': 'v-accent-outline-focus',
  },
  'accent-tertiary': {
    'hover': 'v-accent-ghost-hover',
    'active': 'v-accent-ghost-active',
    'focus-visible': 'v-accent-ghost-focus',
  },
  'accent-quaternary': {
    'hover': 'v-accent-soft-hover',
    'active': 'v-accent-soft-active',
    'focus-visible': 'v-accent-soft-focus',
  },
}

const comboKey = computed<ComboKey>(() => `${normalizedVariant.value}-${normalizedType.value}`)

const variantTypeClass = computed(() => variantTypeClassMap[comboKey.value])

const previewStateClass = computed(() => {
  if (previewState.value === 'default')
    return ''
  return variantTypePreviewStateClassMap[comboKey.value][previewState.value as InteractivePreviewState]
})
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    class="space-grotesk-regular ui-button-base"
    :class="[variantTypeClass, previewStateClass]"
  >
    <span class="relative inline-flex items-center">
      <slot />
    </span>
  </button>
</template>
