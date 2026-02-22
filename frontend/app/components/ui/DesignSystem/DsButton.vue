<script setup lang="ts">
import { computed, toRefs } from 'vue'

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'quaternary'
type ButtonVariant = 'default' | 'accent'
type ButtonSize = 'sm' | 'md' | 'lg'
type LegacyVariant = ButtonType | 'quartery'
type ComboKey = `${ButtonVariant}-${ButtonType}`

const props = withDefaults(defineProps<{
  type?: ButtonType
  variant?: ButtonVariant | LegacyVariant
  size?: ButtonSize
  disabled?: boolean
}>(), {
  type: 'primary',
  variant: 'default',
  size: 'md',
  disabled: false,
})

const { type, variant, size, disabled } = toRefs(props)
const LEGACY_VARIANT_TYPES: LegacyVariant[] = ['primary', 'secondary', 'tertiary', 'quaternary', 'quartery']

const isLegacyTypeVariant = computed(() => LEGACY_VARIANT_TYPES.includes(variant.value as LegacyVariant))

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

const comboKey = computed<ComboKey>(() => `${normalizedVariant.value}-${normalizedType.value}`)

const variantTypeClass = computed(() => variantTypeClassMap[comboKey.value])
const isGhostType = computed(() => normalizedType.value === 'tertiary')
const ghostButtonClass = 'is-ghost-button is-ghost-morph is-ghost-morph-clip ui-ghost-button ui-ghost-morph-clip'
const sizeClassMap: Record<ButtonSize, string> = {
  sm: 'ui-button-sm',
  md: 'ui-button-md',
  lg: 'ui-button-lg',
}
const sizeClass = computed(() => sizeClassMap[size.value])
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    class="group space-grotesk-regular ui-button-base"
    :class="[sizeClass, variantTypeClass, isGhostType ? ghostButtonClass : '']"
  >
    <span
      class="ui-button-label"
      :class="isGhostType ? 'is-ghost-label ui-ghost-label' : ''"
    >
      <slot />
    </span>
  </button>
</template>
