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

.is-ghost-button.is-ghost-morph {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.is-ghost-button.is-ghost-morph .is-ghost-label::before {
  animation: none !important;
}

.is-ghost-button.is-ghost-morph .is-ghost-label {
  z-index: 1;
  transition: color 240ms cubic-bezier(0.22, 1, 0.36, 1);
}

.is-ghost-button.is-ghost-morph::after {
  content: '';
  position: absolute;
  z-index: 0;
  inset: 0;
  border-radius: inherit;
  background-color: var(--ghost-morph-line, currentColor);
  will-change: clip-path, transform, background-color;
  transition:
    clip-path 320ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 320ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 140ms ease-out,
    background-color 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.is-ghost-button.is-ghost-morph:not(:disabled):hover .is-ghost-label,
.is-ghost-button.is-ghost-morph:not(:disabled):active .is-ghost-label,
.is-ghost-button.is-ghost-morph:focus-visible .is-ghost-label {
  color: var(--ghost-morph-text, currentColor);
}

/* Principle A: dual-layer handover */
.is-ghost-button.is-ghost-morph-dual .is-ghost-label::before {
  opacity: 1;
  transition: opacity 140ms ease-out;
}

.is-ghost-button.is-ghost-morph-dual::after {
  clip-path: inset(calc(100% - var(--motion-underline-thickness)) 1rem var(--motion-underline-offset) 1rem round 9999px);
  opacity: 0;
}

.is-ghost-button.is-ghost-morph-dual:not(:disabled):hover::after,
.is-ghost-button.is-ghost-morph-dual:not(:disabled):active::after,
.is-ghost-button.is-ghost-morph-dual:focus-visible::after {
  clip-path: inset(0 round 9999px);
  background-color: var(--ghost-morph-fill, currentColor);
  opacity: 1;
}

.is-ghost-button.is-ghost-morph-dual:not(:disabled):active::after {
  background-color: var(--ghost-morph-fill-active, var(--ghost-morph-fill, currentColor));
}

.is-ghost-button.is-ghost-morph-dual:not(:disabled):hover .is-ghost-label::before,
.is-ghost-button.is-ghost-morph-dual:not(:disabled):active .is-ghost-label::before,
.is-ghost-button.is-ghost-morph-dual:focus-visible .is-ghost-label::before {
  opacity: 0;
}

/* Principle B: single-layer clip-path morph */
.is-ghost-button.is-ghost-morph-clip .is-ghost-label::before {
  display: none;
  opacity: 0;
}

.is-ghost-button.is-ghost-morph-clip::after {
  background-color: var(--ghost-morph-fill, currentColor);
  border-radius: 9999px;
  left: var(--ghost-morph-line-inset-x, 1rem);
  right: var(--ghost-morph-line-inset-x, 1rem);
  top: calc(100% - var(--motion-underline-thickness) - var(--ghost-morph-line-inset-y, 0.36rem));
  bottom: var(--ghost-morph-line-inset-y, 0.36rem);
  opacity: 1;
  will-change: left, right, top, bottom, border-radius, background-color;
  transition:
    left 320ms cubic-bezier(0.22, 1, 0.36, 1),
    right 320ms cubic-bezier(0.22, 1, 0.36, 1),
    top 320ms cubic-bezier(0.22, 1, 0.36, 1),
    bottom 320ms cubic-bezier(0.22, 1, 0.36, 1),
    border-radius 320ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 120ms ease-out;
}

.is-ghost-button.is-ghost-morph-clip:not(:disabled):hover::after,
.is-ghost-button.is-ghost-morph-clip:not(:disabled):active::after,
.is-ghost-button.is-ghost-morph-clip:focus-visible::after {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: inherit;
}

.is-ghost-button.is-ghost-morph-clip:not(:disabled):active::after {
  background-color: var(--ghost-morph-fill-active, var(--ghost-morph-fill, currentColor));
}

/* Principle C: single-layer transform morph */
.is-ghost-button.is-ghost-morph-scale .is-ghost-label::before {
  opacity: 0;
}

.is-ghost-button.is-ghost-morph-scale::after {
  clip-path: inset(0 round 9999px);
  transform-origin: center bottom;
  transform: translateY(0.34rem) scaleY(0.06);
  opacity: 1;
}

.is-ghost-button.is-ghost-morph-scale:not(:disabled):hover::after,
.is-ghost-button.is-ghost-morph-scale:not(:disabled):active::after,
.is-ghost-button.is-ghost-morph-scale:focus-visible::after {
  transform: translateY(0) scaleY(1);
  background-color: var(--ghost-morph-fill, currentColor);
}

.is-ghost-button.is-ghost-morph-scale:not(:disabled):active::after {
  background-color: var(--ghost-morph-fill-active, var(--ghost-morph-fill, currentColor));
}

</style>
