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

const tertiaryMorphRows = [
  {
    key: 'm1',
    label: 'B Sand 3 -> 4',
    defaultClass: 'is-ghost-morph is-ghost-morph-clip active:enabled:translate-y-[1px] focus-visible:[box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--ghost-morph-fill)] [--ghost-morph-line:var(--color-primary)] [--ghost-morph-line-inset-y:0.36rem] [--ghost-morph-line-inset-x:0.95rem] [--ghost-morph-fill:var(--un-preset-radix-sand3)] [--ghost-morph-fill-active:var(--un-preset-radix-sand4)] [--ghost-morph-text:var(--color-primary)] dark:[--ghost-morph-fill:var(--un-preset-radix-sand5)] dark:[--ghost-morph-fill-active:var(--un-preset-radix-sand6)]',
    accentClass: 'is-ghost-morph is-ghost-morph-clip active:enabled:translate-y-[1px] focus-visible:[box-shadow:0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--ghost-morph-fill)] [--ghost-morph-line-inset-y:0.36rem] [--ghost-morph-line-inset-x:0.95rem] [--ghost-morph-fill:var(--toxic-11)] [--ghost-morph-fill-active:var(--toxic-10)] [--ghost-morph-text:var(--color-primary)]',
  },
  {
    key: 'm2',
    label: 'B Sand 4 -> 5',
    defaultClass: 'is-ghost-morph is-ghost-morph-clip active:enabled:translate-y-[1px] focus-visible:[box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--ghost-morph-fill)] [--ghost-morph-line:var(--color-primary)] [--ghost-morph-line-inset-y:0.36rem] [--ghost-morph-line-inset-x:0.95rem] [--ghost-morph-fill:var(--un-preset-radix-sand4)] [--ghost-morph-fill-active:var(--un-preset-radix-sand5)] [--ghost-morph-text:var(--color-primary)] dark:[--ghost-morph-fill:var(--un-preset-radix-sand6)] dark:[--ghost-morph-fill-active:var(--un-preset-radix-sand7)]',
    accentClass: 'is-ghost-morph is-ghost-morph-clip active:enabled:translate-y-[1px] focus-visible:[box-shadow:0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--ghost-morph-fill)] [--ghost-morph-line-inset-y:0.36rem] [--ghost-morph-line-inset-x:0.95rem] [--ghost-morph-fill:var(--toxic-11)] [--ghost-morph-fill-active:var(--toxic-10)] [--ghost-morph-text:var(--color-primary)]',
  },
  {
    key: 'm3',
    label: 'B Sand 5 -> 6',
    defaultClass: 'is-ghost-morph is-ghost-morph-clip active:enabled:translate-y-[1px] focus-visible:[box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--ghost-morph-fill)] [--ghost-morph-line:var(--color-primary)] [--ghost-morph-line-inset-y:0.36rem] [--ghost-morph-line-inset-x:0.95rem] [--ghost-morph-fill:var(--un-preset-radix-sand5)] [--ghost-morph-fill-active:var(--un-preset-radix-sand6)] [--ghost-morph-text:var(--color-primary)] dark:[--ghost-morph-fill:var(--un-preset-radix-sand7)] dark:[--ghost-morph-fill-active:var(--un-preset-radix-sand8)]',
    accentClass: 'is-ghost-morph is-ghost-morph-clip active:enabled:translate-y-[1px] focus-visible:[box-shadow:0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--ghost-morph-fill)] [--ghost-morph-line-inset-y:0.36rem] [--ghost-morph-line-inset-x:0.95rem] [--ghost-morph-fill:var(--toxic-11)] [--ghost-morph-fill-active:var(--toxic-10)] [--ghost-morph-text:var(--color-primary)]',
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
    'focus-visible': 'is-ghost-line-on bg-sand-11 color-$color-inverse [box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--color-ghost-hover)]',
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
    'focus-visible': 'bg-$bg-accent-outline-fill color-$color-primary [box-shadow:0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--border-accent-outline-fill)]',
  },
  'accent-tertiary': {
    'hover': 'is-ghost-line-on color-$color-accent-hover',
    'active': 'is-ghost-line-on color-$color-accent-strong',
    'focus-visible': 'is-ghost-line-on bg-$bg-accent-outline-fill color-$color-primary [box-shadow:0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--bg-accent-outline-fill)]',
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
        Tertiary Morph Concepts
      </p>
      <div class="mt-3 overflow-auto border border-pureBlack/12 rounded-lg border-solid dark:border-pureWhite/12">
        <table class="min-w-full border-collapse text-left text-[10px] tracking-[0.12em] uppercase">
          <thead class="bg-pureBlack/3 dark:bg-pureWhite/5">
            <tr>
              <th class="px-3 py-2 font-medium opacity-75">
                Concept
              </th>
              <th class="px-3 py-2 font-medium opacity-75">
                Default Primary
              </th>
              <th class="px-3 py-2 font-medium opacity-75">
                Default Secondary
              </th>
              <th class="px-3 py-2 font-medium opacity-75">
                Default Tertiary
              </th>
              <th class="px-3 py-2 font-medium opacity-75">
                Accent Primary
              </th>
              <th class="px-3 py-2 font-medium opacity-75">
                Accent Secondary
              </th>
              <th class="px-3 py-2 font-medium opacity-75">
                Accent Tertiary
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in tertiaryMorphRows"
              :key="row.key"
              class="border-t border-pureBlack/8 dark:border-pureWhite/10"
            >
              <td class="px-3 py-2 opacity-75">
                {{ row.label }}
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="primary"
                  variant="default"
                >
                  Primary
                </DsButton>
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="secondary"
                  variant="default"
                >
                  Secondary
                </DsButton>
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="tertiary"
                  variant="default"
                  :class="row.defaultClass"
                >
                  Tertiary
                </DsButton>
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
                <DsButton
                  type="secondary"
                  variant="accent"
                >
                  Secondary
                </DsButton>
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="tertiary"
                  variant="accent"
                  :class="row.accentClass"
                >
                  Tertiary
                </DsButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </article>
</template>
