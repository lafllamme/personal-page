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
  'default-primary': 'button-default-primary',
  'default-secondary': 'button-default-secondary',
  'default-tertiary': 'button-default-tertiary',
  'default-quaternary': 'button-default-quaternary',
  'accent-primary': 'button-accent-primary',
  'accent-secondary': 'button-accent-secondary',
  'accent-tertiary': 'button-accent-tertiary',
  'accent-quaternary': 'button-accent-quaternary',
}

const variantTypePreviewStateClassMap: Record<ComboKey, Record<InteractivePreviewState, string>> = {
  'default-primary': {
    'hover': 'button-default-primary-is-hover',
    'active': 'button-default-primary-is-active',
    'focus-visible': 'button-default-primary-is-focus-visible',
  },
  'default-secondary': {
    'hover': 'button-default-secondary-is-hover',
    'active': 'button-default-secondary-is-active',
    'focus-visible': 'button-default-secondary-is-focus-visible',
  },
  'default-tertiary': {
    'hover': 'button-default-tertiary-is-hover',
    'active': 'button-default-tertiary-is-active',
    'focus-visible': 'button-default-tertiary-is-focus-visible',
  },
  'default-quaternary': {
    'hover': 'button-default-quaternary-is-hover',
    'active': 'button-default-quaternary-is-active',
    'focus-visible': 'button-default-quaternary-is-focus-visible',
  },
  'accent-primary': {
    'hover': 'button-accent-primary-is-hover',
    'active': 'button-accent-primary-is-active',
    'focus-visible': 'button-accent-primary-is-focus-visible',
  },
  'accent-secondary': {
    'hover': 'button-accent-secondary-is-hover',
    'active': 'button-accent-secondary-is-active',
    'focus-visible': 'button-accent-secondary-is-focus-visible',
  },
  'accent-tertiary': {
    'hover': 'button-accent-tertiary-is-hover',
    'active': 'button-accent-tertiary-is-active',
    'focus-visible': 'button-accent-tertiary-is-focus-visible',
  },
  'accent-quaternary': {
    'hover': 'button-accent-quaternary-is-hover',
    'active': 'button-accent-quaternary-is-active',
    'focus-visible': 'button-accent-quaternary-is-focus-visible',
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
    class="space-grotesk-regular button-base"
    :class="[variantTypeClass, previewStateClass]"
  >
    <span class="button-label">
      <slot />
    </span>
  </button>
</template>
