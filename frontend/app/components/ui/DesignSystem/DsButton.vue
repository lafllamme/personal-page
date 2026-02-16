<script setup lang="ts">
import { computed, toRefs } from 'vue'

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'quaternary'
type ButtonVariant = 'default' | 'accent'
type LegacyVariant = ButtonType | 'quartery'
type ComboKey = `${ButtonVariant}-${ButtonType}`

const props = withDefaults(defineProps<{
  type?: ButtonType
  variant?: ButtonVariant | LegacyVariant
  disabled?: boolean
}>(), {
  type: 'primary',
  variant: 'default',
  disabled: false,
})

const { type, variant, disabled } = toRefs(props)
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

const comboKey = computed<ComboKey>(() => `${normalizedVariant.value}-${normalizedType.value}`)

const variantTypeClass = computed(() => variantTypeClassMap[comboKey.value])
const isGhostType = computed(() => normalizedType.value === 'tertiary')
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    class="space-grotesk-regular ui-button-base"
    :class="[variantTypeClass, isGhostType ? 'is-ghost-button' : '']"
  >
    <span
      class="ui-button-label"
      :class="isGhostType ? 'is-ghost-label' : ''"
    >
      <slot />
    </span>
  </button>
</template>

<style>
/*
  TODO: Move this fully to unoCSS
*/
.is-ghost-label {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.is-ghost-label::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: var(--motion-underline-offset);
  height: var(--motion-underline-thickness);
  background-color: currentColor;
  transform: scaleX(1) rotate(0.001deg);
  transform-origin: left;
}

@keyframes uiGhostUnderlineSweep {
  0% {
    transform: scaleX(1) rotate(0.001deg);
    transform-origin: right;
  }
  49% {
    transform: scaleX(0) rotate(0.001deg);
    transform-origin: right;
  }
  50% {
    transform: scaleX(0) rotate(0.001deg);
    transform-origin: left;
  }
  100% {
    transform: scaleX(1) rotate(0.001deg);
    transform-origin: left;
  }
}

.is-ghost-button:not(:disabled):hover .is-ghost-label::before,
.is-ghost-button:not(:disabled):active .is-ghost-label::before,
.is-ghost-button:focus-visible .is-ghost-label::before,
.is-ghost-line-on .is-ghost-label::before {
  animation: uiGhostUnderlineSweep var(--motion-underline-duration) var(--motion-underline-ease) 1;
}
</style>
