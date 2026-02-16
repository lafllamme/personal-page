<script setup lang="ts">
import DsButton from './DsButton.vue'

const variants = [
  { key: 'default', label: 'Variant Default' },
  { key: 'accent', label: 'Variant Accent' },
] as const

const types = [
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'tertiary', label: 'Tertiary' },
  { key: 'quaternary', label: 'Quaternary' },
] as const

const states = [
  { key: 'default', label: 'default' },
  { key: 'hover', label: 'hover' },
  { key: 'active', label: 'active' },
  { key: 'focus-visible', label: 'focus-visible' },
  { key: 'disabled', label: 'disabled' },
] as const

type MatrixVariant = typeof variants[number]['key']
type MatrixType = typeof types[number]['key']
type MatrixState = typeof states[number]['key']
type ComboKey = `${MatrixVariant}-${MatrixType}`
type InteractiveMatrixState = Exclude<MatrixState, 'default' | 'disabled'>

const forcedStateClassMap: Record<ComboKey, Record<InteractiveMatrixState, string>> = {
  'default-primary': {
    'hover': 'bg-$bg-inverse border-$border-primary color-$color-primary',
    'active': 'bg-$bg-solid-active border-$border-primary color-$color-inverse',
    'focus-visible': '[box-shadow:0_0_0_3px_var(--ring-default-primary)]',
  },
  'default-secondary': {
    'hover': 'bg-$bg-overlay-hover',
    'active': 'bg-$bg-overlay-active',
    'focus-visible': '[box-shadow:0_0_0_3px_var(--ring-default-secondary)]',
  },
  'default-tertiary': {
    'hover': 'before:origin-left before:[transform:scaleX(1)_rotate(0.001deg)]',
    'active': 'before:origin-left before:[transform:scaleX(1)_rotate(0.001deg)]',
    'focus-visible': 'before:origin-left before:[transform:scaleX(1)_rotate(0.001deg)] [box-shadow:0_0_0_3px_var(--ring-default-tertiary)]',
  },
  'default-quaternary': {
    'hover': 'bg-$bg-soft-hover',
    'active': 'bg-$bg-soft-active',
    'focus-visible': '[box-shadow:0_0_0_3px_var(--ring-default-quaternary)]',
  },
  'accent-primary': {
    'hover': 'bg-$bg-accent-hover border-$border-accent-hover color-$color-on-accent',
    'active': 'bg-$bg-accent-solid-active border-$border-accent-active color-$color-on-accent',
    'focus-visible': '[box-shadow:0_0_0_3px_var(--ring-accent-primary)]',
  },
  'accent-secondary': {
    'hover': 'border-$border-accent-hover color-$color-accent-hover bg-$bg-accent-outline-hover',
    'active': 'bg-$bg-accent-outline-active',
    'focus-visible': '[box-shadow:0_0_0_3px_var(--ring-accent-secondary)]',
  },
  'accent-tertiary': {
    'hover': 'before:origin-left before:[transform:scaleX(1)_rotate(0.001deg)]',
    'active': 'before:origin-left before:[transform:scaleX(1)_rotate(0.001deg)]',
    'focus-visible': 'before:origin-left before:[transform:scaleX(1)_rotate(0.001deg)] [box-shadow:0_0_0_3px_var(--ring-accent-tertiary)]',
  },
  'accent-quaternary': {
    'hover': 'bg-$bg-accent-soft-hover border-$border-accent-soft-hover',
    'active': 'bg-$bg-accent-soft-active border-$border-accent-soft-hover',
    'focus-visible': '[box-shadow:0_0_0_3px_var(--ring-accent-quaternary)]',
  },
}

function getForcedStateClass(variant: MatrixVariant, type: MatrixType, state: MatrixState) {
  if (state === 'default' || state === 'disabled')
    return ''

  return forcedStateClassMap[`${variant}-${type}` as ComboKey][state]
}
</script>

<template>
  <article class="border border-pureBlack/16 rounded-xl border-solid p-5 dark:border-pureWhite/16">
    <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">
      Variant State Matrix
    </p>
    <div class="grid mt-4 gap-4 lg:grid-cols-2">
      <section
        v-for="variant in variants"
        :key="variant.key"
        class="border border-pureBlack/12 rounded-lg border-solid p-4 dark:border-pureWhite/12"
      >
        <p class="space-grotesk-regular text-[10px] tracking-[0.18em] uppercase opacity-70">
          {{ variant.label }}
        </p>
        <div class="grid mt-4 gap-3 xl:grid-cols-2">
          <section
            v-for="type in types"
            :key="`${variant.key}-${type.key}`"
            class="border border-pureBlack/10 rounded-md border-solid p-3 dark:border-pureWhite/10"
          >
            <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">
              {{ type.label }}
            </p>
            <div class="grid mt-3 gap-2">
              <div
                v-for="state in states"
                :key="`${variant.key}-${type.key}-${state.key}`"
                class="grid grid-cols-[108px_auto] items-center gap-3 border-b border-pureBlack/8 border-solid pb-2 last:border-b-0 dark:border-pureWhite/10 last:pb-0"
              >
                <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
                  {{ state.label }}
                </p>
                <DsButton
                  class="justify-self-start"
                  :type="type.key"
                  :variant="variant.key"
                  :class="getForcedStateClass(variant.key, type.key, state.key)"
                  :disabled="state.key === 'disabled'"
                >
                  Click Me
                </DsButton>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  </article>
</template>
