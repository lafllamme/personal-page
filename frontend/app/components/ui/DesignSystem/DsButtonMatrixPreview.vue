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

const secondaryHoverVariants = [
  {
    key: 's1',
    label: 'S1 Sand Ring Fill',
    className: 'bg-transparent border-transparent color-$color-primary [box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand9)] hover:enabled:bg-sand-9 hover:enabled:color-pureWhite active:enabled:bg-sand-10 active:enabled:color-pureWhite focus-visible:bg-sand-9 focus-visible:color-pureWhite focus-visible:[box-shadow:0_0_0_2px_var(--pure-white),0_0_0_4px_var(--un-preset-radix-sand9)] dark:focus-visible:[box-shadow:0_0_0_2px_var(--pure-black),0_0_0_4px_var(--un-preset-radix-sand9)]',
  },
  {
    key: 's2',
    label: 'S2 Sand Ring Fill Strong',
    className: 'bg-transparent border-transparent color-$color-primary [box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand10)] hover:enabled:bg-sand-10 hover:enabled:color-pureWhite active:enabled:bg-sand-11 active:enabled:color-pureWhite focus-visible:bg-sand-10 focus-visible:color-pureWhite focus-visible:[box-shadow:0_0_0_2px_var(--pure-white),0_0_0_4px_var(--un-preset-radix-sand10)] dark:focus-visible:[box-shadow:0_0_0_2px_var(--pure-black),0_0_0_4px_var(--un-preset-radix-sand10)]',
  },
  {
    key: 's3',
    label: 'S3 Base Black/White -> Sand Soft',
    className: 'bg-transparent border-transparent color-$color-primary [box-shadow:inset_0_0_0_2px_var(--border-primary)] hover:enabled:bg-sand-9 hover:enabled:color-pureWhite hover:enabled:[box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand9)] active:enabled:bg-sand-10 active:enabled:color-pureWhite active:enabled:[box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand10)] focus-visible:[box-shadow:inset_0_0_0_2px_var(--border-primary),0_0_0_3px_var(--ring-default-secondary)]',
  },
  {
    key: 's4',
    label: 'S4 Base Black/White -> Sand Mid',
    className: 'bg-transparent border-transparent color-$color-primary [box-shadow:inset_0_0_0_2px_var(--border-primary)] hover:enabled:bg-sand-10 hover:enabled:color-pureWhite hover:enabled:[box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand10)] active:enabled:bg-sand-11 active:enabled:color-pureWhite active:enabled:[box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand11)] focus-visible:bg-sand-10 focus-visible:color-pureWhite focus-visible:[box-shadow:0_0_0_2px_var(--pure-white),0_0_0_4px_var(--un-preset-radix-sand10)] dark:focus-visible:[box-shadow:0_0_0_2px_var(--pure-black),0_0_0_4px_var(--un-preset-radix-sand10)]',
  },
  {
    key: 's5',
    label: 'S5 Base Black/White -> Sand Strong',
    className: 'bg-transparent border-transparent color-$color-primary [box-shadow:inset_0_0_0_2px_var(--border-primary)] hover:enabled:bg-sand-11 hover:enabled:color-pureWhite hover:enabled:[box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand11)] active:enabled:bg-sand-12 active:enabled:color-pureWhite active:enabled:[box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand12)] focus-visible:[box-shadow:inset_0_0_0_2px_var(--border-primary),0_0_0_3px_var(--ring-default-secondary)]',
  },
] as const

type MatrixVariant = typeof variants[number]['key']
type MatrixType = typeof types[number]['key']
type MatrixState = typeof states[number]['key']
type ComboKey = `${MatrixVariant}-${MatrixType}`
type InteractiveMatrixState = Exclude<MatrixState, 'default' | 'disabled'>

const forcedStateClassMap: Record<ComboKey, Record<InteractiveMatrixState, string>> = {
  'default-primary': {
    'hover': '[box-shadow:inset_0_0_0_2px_var(--border-primary),0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--ring-primary-offset-outer)]',
    'active': '[box-shadow:inset_0_0_0_2px_var(--border-primary),0_0_0_1px_var(--ring-primary-offset-inner),0_0_0_2px_var(--ring-primary-offset-outer)]',
    'focus-visible': '[box-shadow:inset_0_0_0_2px_var(--border-primary),0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--ring-primary-offset-outer)]',
  },
  'default-secondary': {
    'hover': 'bg-sand-10 color-pureWhite [box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand10)]',
    'active': 'bg-sand-11 color-pureWhite [box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand11)]',
    'focus-visible': 'bg-sand-10 color-pureWhite [box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand10),0_0_0_3px_var(--ring-default-secondary)]',
  },
  'default-tertiary': {
    'hover': 'is-ghost-line-on',
    'active': 'is-ghost-line-on',
    'focus-visible': 'is-ghost-line-on [box-shadow:0_0_0_3px_var(--ring-default-tertiary)]',
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
    'hover': 'is-ghost-line-on',
    'active': 'is-ghost-line-on',
    'focus-visible': 'is-ghost-line-on [box-shadow:0_0_0_3px_var(--ring-accent-tertiary)]',
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

    <section class="mt-8 border-t border-pureBlack/10 pt-5 dark:border-pureWhite/10">
      <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">
        Secondary Hover Variants
      </p>
      <div class="mt-4 border border-pureBlack/12 rounded-lg border-solid bg-pureWhite p-4 dark:border-pureWhite/12 dark:bg-pureBlack">
        <div class="grid gap-3">
          <div
            v-for="item in secondaryHoverVariants"
            :key="item.key"
            class="grid grid-cols-[130px_auto] items-center gap-3 border-b border-pureBlack/8 border-solid pb-2 last:border-b-0 dark:border-pureWhite/10 last:pb-0"
          >
            <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
              {{ item.label }}
            </p>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="space-grotesk-regular ui-button-base v-neutral-solid"
              >
                Primary
              </button>
              <button
                type="button"
                class="space-grotesk-regular ui-button-base"
                :class="item.className"
              >
                Secondary
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>
