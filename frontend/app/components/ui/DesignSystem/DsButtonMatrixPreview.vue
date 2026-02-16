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

const compactVariantRows = [
  { key: 'default', label: 'Default' },
  { key: 'accent', label: 'Toxic' },
] as const

const secondaryContrastRows = [
  {
    key: 's1',
    label: 'S1 Toxic-3',
    secondaryClass: '[color:var(--color-accent)] [box-shadow:inset_0_0_0_2px_var(--border-accent)] hover:enabled:[background-color:var(--toxic-3)] hover:enabled:[color:var(--color-primary)] hover:enabled:[box-shadow:inset_0_0_0_2px_var(--toxic-3)] active:enabled:translate-y-[1px] active:enabled:[background-color:var(--toxic-3)] active:enabled:[color:var(--color-inverse)] active:enabled:[box-shadow:inset_0_0_0_2px_var(--toxic-3)] focus-visible:[background-color:var(--toxic-3)] focus-visible:[color:var(--color-inverse)] focus-visible:[box-shadow:inset_0_0_0_2px_var(--toxic-3)]',
  },
  {
    key: 's2',
    label: 'S2 Toxic-4',
    secondaryClass: '[color:var(--color-accent)] [box-shadow:inset_0_0_0_2px_var(--border-accent)] hover:enabled:[background-color:var(--toxic-4)] hover:enabled:[color:var(--color-primary)] hover:enabled:[box-shadow:inset_0_0_0_2px_var(--toxic-4)] active:enabled:translate-y-[1px] active:enabled:[background-color:var(--toxic-4)] active:enabled:[color:var(--color-inverse)] active:enabled:[box-shadow:inset_0_0_0_2px_var(--toxic-4)] focus-visible:[background-color:var(--toxic-4)] focus-visible:[color:var(--color-inverse)] focus-visible:[box-shadow:inset_0_0_0_2px_var(--toxic-4)]',
  },
  {
    key: 's3',
    label: 'S3 Toxic-5',
    secondaryClass: '[color:var(--color-accent)] [box-shadow:inset_0_0_0_2px_var(--border-accent)] hover:enabled:[background-color:var(--toxic-5)] hover:enabled:[color:var(--color-primary)] hover:enabled:[box-shadow:inset_0_0_0_2px_var(--toxic-5)] active:enabled:translate-y-[1px] active:enabled:[background-color:var(--toxic-5)] active:enabled:[color:var(--color-inverse)] active:enabled:[box-shadow:inset_0_0_0_2px_var(--toxic-5)] focus-visible:[background-color:var(--toxic-5)] focus-visible:[color:var(--color-inverse)] focus-visible:[box-shadow:inset_0_0_0_2px_var(--toxic-5)]',
  },
  {
    key: 's4',
    label: 'S4 Toxic-6',
    secondaryClass: '[color:var(--color-accent)] [box-shadow:inset_0_0_0_2px_var(--border-accent)] hover:enabled:[background-color:var(--toxic-6)] hover:enabled:[color:var(--color-primary)] hover:enabled:[box-shadow:inset_0_0_0_2px_var(--toxic-6)] active:enabled:translate-y-[1px] active:enabled:[background-color:var(--toxic-6)] active:enabled:[color:var(--color-inverse)] active:enabled:[box-shadow:inset_0_0_0_2px_var(--toxic-6)] focus-visible:[background-color:var(--toxic-6)] focus-visible:[color:var(--color-inverse)] focus-visible:[box-shadow:inset_0_0_0_2px_var(--toxic-6)]',
  },
  {
    key: 's5',
    label: 'S5 Toxic-7',
    secondaryClass: '[color:var(--color-accent)] [box-shadow:inset_0_0_0_2px_var(--border-accent)] hover:enabled:[background-color:var(--toxic-7)] hover:enabled:[color:var(--color-primary)] hover:enabled:[box-shadow:inset_0_0_0_2px_var(--toxic-7)] active:enabled:translate-y-[1px] active:enabled:[background-color:var(--toxic-7)] active:enabled:[color:var(--color-inverse)] active:enabled:[box-shadow:inset_0_0_0_2px_var(--toxic-7)] focus-visible:[background-color:var(--toxic-7)] focus-visible:[color:var(--color-inverse)] focus-visible:[box-shadow:inset_0_0_0_2px_var(--toxic-7)]',
  },
  {
    key: 's6',
    label: 'S6 Toxic-8',
    secondaryClass: '[color:var(--color-accent)] [box-shadow:inset_0_0_0_2px_var(--border-accent)] hover:enabled:[background-color:var(--toxic-8)] hover:enabled:[color:var(--color-primary)] hover:enabled:[box-shadow:inset_0_0_0_2px_var(--toxic-8)] active:enabled:translate-y-[1px] active:enabled:[background-color:var(--toxic-8)] active:enabled:[color:var(--color-inverse)] active:enabled:[box-shadow:inset_0_0_0_2px_var(--toxic-8)] focus-visible:[background-color:var(--toxic-8)] focus-visible:[color:var(--color-inverse)] focus-visible:[box-shadow:inset_0_0_0_2px_var(--toxic-8)]',
  },
  {
    key: 's7',
    label: 'S7 Toxic-9',
    secondaryClass: '[color:var(--color-accent)] [box-shadow:inset_0_0_0_2px_var(--border-accent)] hover:enabled:[background-color:var(--toxic-9)] hover:enabled:[color:var(--color-primary)] hover:enabled:[box-shadow:inset_0_0_0_2px_var(--toxic-9)] active:enabled:translate-y-[1px] active:enabled:[background-color:var(--toxic-9)] active:enabled:[color:var(--color-inverse)] active:enabled:[box-shadow:inset_0_0_0_2px_var(--toxic-9)] focus-visible:[background-color:var(--toxic-9)] focus-visible:[color:var(--color-inverse)] focus-visible:[box-shadow:inset_0_0_0_2px_var(--toxic-9)]',
  },
  {
    key: 's8',
    label: 'S8 Toxic-10',
    secondaryClass: '[color:var(--color-accent)] [box-shadow:inset_0_0_0_2px_var(--border-accent)] hover:enabled:[background-color:var(--toxic-10)] hover:enabled:[color:var(--color-primary)] hover:enabled:[box-shadow:inset_0_0_0_2px_var(--toxic-10)] active:enabled:translate-y-[1px] active:enabled:[background-color:var(--toxic-10)] active:enabled:[color:var(--color-inverse)] active:enabled:[box-shadow:inset_0_0_0_2px_var(--toxic-10)] focus-visible:[background-color:var(--toxic-10)] focus-visible:[color:var(--color-inverse)] focus-visible:[box-shadow:inset_0_0_0_2px_var(--toxic-10)]',
  },
  {
    key: 's9',
    label: 'S9 Toxic-11',
    secondaryClass: '[color:var(--color-accent)] [box-shadow:inset_0_0_0_2px_var(--border-accent)] hover:enabled:[background-color:var(--toxic-11)] hover:enabled:[color:var(--color-primary)] hover:enabled:[box-shadow:inset_0_0_0_2px_var(--toxic-11)] active:enabled:translate-y-[1px] active:enabled:[background-color:var(--toxic-11)] active:enabled:[color:var(--color-inverse)] active:enabled:[box-shadow:inset_0_0_0_2px_var(--toxic-11)] focus-visible:[background-color:var(--toxic-11)] focus-visible:[color:var(--color-inverse)] focus-visible:[box-shadow:inset_0_0_0_2px_var(--toxic-11)]',
  },
] as const

const secondaryDebugBaseClass = 'space-grotesk-regular ui-button-base bg-transparent border-transparent [box-shadow:inset_0_0_0_2px_var(--border-accent)]'

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
    'hover': '[box-shadow:inset_0_0_0_2px_var(--border-accent),0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--ring-accent-offset-outer)]',
    'active': '[box-shadow:inset_0_0_0_2px_var(--border-accent),0_0_0_1px_var(--ring-accent-offset-inner),0_0_0_2px_var(--ring-accent-offset-outer)]',
    'focus-visible': '[box-shadow:inset_0_0_0_2px_var(--border-accent),0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--ring-accent-offset-outer)]',
  },
  'accent-secondary': {
    'hover': 'bg-$bg-accent-outline-fill color-$color-primary [box-shadow:inset_0_0_0_2px_var(--border-accent-outline-fill)]',
    'active': 'bg-$bg-accent-outline-fill color-$color-primary [box-shadow:inset_0_0_0_2px_var(--border-accent-outline-fill)]',
    'focus-visible': 'bg-$bg-accent-outline-fill color-$color-primary [box-shadow:inset_0_0_0_2px_var(--border-accent-outline-fill)]',
  },
  'accent-tertiary': {
    'hover': 'is-ghost-line-on color-$color-accent-hover',
    'active': 'is-ghost-line-on color-$color-accent-strong',
    'focus-visible': 'is-ghost-line-on color-$color-accent-hover [box-shadow:0_0_0_3px_var(--ring-accent-quaternary-focus)]',
  },
  'accent-quaternary': {
    'hover': 'bg-$bg-accent-quaternary-hover',
    'active': 'bg-$bg-accent-quaternary-active',
    'focus-visible': 'bg-$bg-accent-quaternary-focus [box-shadow:0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--ring-accent-quaternary-focus)]',
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
        All Variants
      </p>
      <div class="mt-3 overflow-auto border border-pureBlack/12 rounded-lg border-solid dark:border-pureWhite/12">
        <table class="min-w-full border-collapse text-left text-[10px] tracking-[0.12em] uppercase">
          <thead class="bg-pureBlack/3 dark:bg-pureWhite/5">
            <tr>
              <th class="px-3 py-2 font-medium opacity-75">
                Variant
              </th>
              <th class="px-3 py-2 font-medium opacity-75">
                Primary
              </th>
              <th class="px-3 py-2 font-medium opacity-75">
                Secondary
              </th>
              <th class="px-3 py-2 font-medium opacity-75">
                Tertiary
              </th>
              <th class="px-3 py-2 font-medium opacity-75">
                Quaternary
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in compactVariantRows"
              :key="row.key"
              class="border-t border-pureBlack/8 dark:border-pureWhite/10"
            >
              <td class="px-3 py-2 opacity-75">
                {{ row.label }}
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="primary"
                  :variant="row.key"
                >
                  Primary
                </DsButton>
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="secondary"
                  :variant="row.key"
                >
                  Secondary
                </DsButton>
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="tertiary"
                  :variant="row.key"
                >
                  Tertiary
                </DsButton>
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="quaternary"
                  :variant="row.key"
                >
                  Quaternary
                </DsButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="space-grotesk-regular mt-6 text-[10px] tracking-[0.16em] uppercase opacity-65">
        Secondary Contrast Concepts (Toxic)
      </p>
      <div class="mt-3 overflow-auto border border-pureBlack/12 rounded-lg border-solid dark:border-pureWhite/12">
        <table class="min-w-full border-collapse text-left text-[10px] tracking-[0.12em] uppercase">
          <thead class="bg-pureBlack/3 dark:bg-pureWhite/5">
            <tr>
              <th class="px-3 py-2 font-medium opacity-75">
                Concept
              </th>
              <th class="px-3 py-2 font-medium opacity-75">
                Primary
              </th>
              <th class="px-3 py-2 font-medium opacity-75">
                Secondary
              </th>
              <th class="px-3 py-2 font-medium opacity-75">
                Tertiary
              </th>
              <th class="px-3 py-2 font-medium opacity-75">
                Quaternary
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in secondaryContrastRows"
              :key="row.key"
              class="border-t border-pureBlack/8 dark:border-pureWhite/10"
            >
              <td class="px-3 py-2 opacity-75">
                {{ row.label }}
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="primary"
                  variant="accent"
                >
                  Primary
                </DsButton>
              </td>
              <td class="px-3 py-2">
                <button
                  type="button"
                  :class="[secondaryDebugBaseClass, row.secondaryClass]"
                >
                  <span class="ui-button-label">Secondary</span>
                </button>
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="tertiary"
                  variant="accent"
                >
                  Tertiary
                </DsButton>
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="quaternary"
                  variant="accent"
                >
                  Quaternary
                </DsButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </article>
</template>
