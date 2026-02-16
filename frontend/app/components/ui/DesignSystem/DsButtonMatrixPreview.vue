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

const quaternaryCushionVariants = [
  {
    key: 'q1',
    label: 'Q1 Soft Mist',
    className: 'hover:enabled:bg-sand-4/65 dark:hover:enabled:bg-sand-6/30 active:enabled:bg-sand-5/75 dark:active:enabled:bg-sand-7/38 focus-visible:bg-sand-4/65 dark:focus-visible:bg-sand-6/30 hover:enabled:color-$color-primary active:enabled:color-$color-primary focus-visible:color-$color-primary focus-visible:[box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--ring-ghost-focus)]',
  },
  {
    key: 'q2',
    label: 'Q2 Balanced',
    className: 'hover:enabled:bg-sand-5/75 dark:hover:enabled:bg-sand-7/38 active:enabled:bg-sand-6/85 dark:active:enabled:bg-sand-8/46 focus-visible:bg-sand-5 dark:focus-visible:bg-sand-7 hover:enabled:color-$color-primary active:enabled:color-$color-primary focus-visible:color-$color-primary focus-visible:[box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--un-preset-radix-sand5)] dark:focus-visible:[box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--un-preset-radix-sand7)]',
  },
  {
    key: 'q3',
    label: 'Q3 Crisp',
    className: 'hover:enabled:bg-sand-6/72 dark:hover:enabled:bg-sand-8/34 active:enabled:bg-sand-7/80 dark:active:enabled:bg-sand-9/42 focus-visible:bg-sand-6/72 dark:focus-visible:bg-sand-8/34 hover:enabled:color-$color-primary active:enabled:color-$color-primary focus-visible:color-$color-primary focus-visible:[box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--ring-ghost-focus)]',
  },
  {
    key: 'q4',
    label: 'Q4 Contrast Lift',
    className: 'hover:enabled:bg-sand-7/66 dark:hover:enabled:bg-sand-9/30 active:enabled:bg-sand-8/74 dark:active:enabled:bg-sand-10/36 focus-visible:bg-sand-7/66 dark:focus-visible:bg-sand-9/30 hover:enabled:color-$color-primary active:enabled:color-$color-primary focus-visible:color-$color-primary focus-visible:[box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--ring-ghost-focus)]',
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
    'focus-visible': 'bg-sand-10 color-pureWhite [box-shadow:0_0_0_2px_var(--pure-white),0_0_0_4px_var(--un-preset-radix-sand10)] dark:[box-shadow:0_0_0_2px_var(--pure-black),0_0_0_4px_var(--un-preset-radix-sand10)]',
  },
  'default-tertiary': {
    'hover': 'is-ghost-line-on color-$color-ghost-hover',
    'active': 'is-ghost-line-on color-$color-ghost-active',
    'focus-visible': 'is-ghost-line-on color-$color-ghost-hover [box-shadow:0_0_0_3px_var(--ring-ghost-focus)]',
  },
  'default-quaternary': {
    'hover': 'bg-$bg-quaternary-hover',
    'active': 'bg-$bg-quaternary-active',
    'focus-visible': 'bg-$bg-quaternary-focus [box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--ring-quaternary-focus)]',
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
        Quaternary Cushion Variants (Subtle)
      </p>
      <div class="mt-4 border border-pureBlack/12 rounded-lg border-solid bg-pureWhite p-4 dark:border-pureWhite/12 dark:bg-pureBlack">
        <div class="grid gap-3">
          <div
            v-for="item in quaternaryCushionVariants"
            :key="item.key"
            class="grid grid-cols-[140px_auto] items-center gap-3 border-b border-pureBlack/8 border-solid pb-2 last:border-b-0 dark:border-pureWhite/10 last:pb-0"
          >
            <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
              {{ item.label }}
            </p>
            <div class="flex flex-wrap items-center gap-2">
              <DsButton
                type="primary"
                variant="default"
              >
                Primary
              </DsButton>
              <DsButton
                type="secondary"
                variant="default"
              >
                Secondary
              </DsButton>
              <DsButton
                type="tertiary"
                variant="default"
              >
                Tertiary
              </DsButton>
              <DsButton
                type="quaternary"
                variant="default"
                :class="item.className"
              >
                Quaternary
              </DsButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>
