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
    'hover': 'is-ghost-morph-on',
    'active': 'is-ghost-morph-on-active translate-y-[1px]',
    'focus-visible': 'is-ghost-morph-on [box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--bg-ghost-morph-fill)]',
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
    'hover': 'is-ghost-morph-on',
    'active': 'is-ghost-morph-on-active translate-y-[1px]',
    'focus-visible': 'is-ghost-morph-on [box-shadow:0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--bg-ghost-morph-accent-fill)]',
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
        Quaternary Concepts
      </p>
      <div class="mt-3 overflow-auto border border-pureBlack/12 rounded-lg border-solid dark:border-pureWhite/12">
        <table class="min-w-full border-collapse text-left text-[10px] tracking-[0.12em] uppercase">
          <thead class="bg-pureBlack/3 dark:bg-pureWhite/5">
            <tr>
              <th class="px-3 py-2 font-medium opacity-75">
                Concept
              </th>
              <th class="px-3 py-2 font-medium opacity-75">
                Default
              </th>
              <th class="px-3 py-2 font-medium opacity-75">
                Accent
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t border-pureBlack/8 dark:border-pureWhite/10">
              <td class="px-3 py-2 opacity-75">
                As-Is (Current)
              </td>
              <td class="px-3 py-2">
                <DsButton type="quaternary" variant="default">
                  Quaternary
                </DsButton>
              </td>
              <td class="px-3 py-2">
                <DsButton type="quaternary" variant="accent">
                  Quaternary
                </DsButton>
              </td>
            </tr>

            <tr class="border-t border-pureBlack/8 dark:border-pureWhite/10">
              <td class="px-3 py-2 opacity-75">
                R1 Ribbon Base
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="quaternary"
                  variant="default"
                  class="[isolation:isolate] relative overflow-hidden after:absolute before:absolute after:inset-0 after:z-0 before:z-0 before:h-32 before:w-12 before:rotate-[18deg] after:rounded-[inherit] after:bg-sand-6 before:bg-sand-7 after:opacity-0 after:transition-opacity before:transition-transform after:duration-300 before:duration-700 after:content-[''] before:content-[''] before:-left-8 before:-top-8 before:-translate-x-full hover:enabled:before:translate-x-[560%] active:enabled:after:opacity-60 hover:enabled:after:opacity-40"
                >
                  Quaternary
                </DsButton>
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="quaternary"
                  variant="accent"
                  class="before:bg-toxic-8 after:bg-toxic-7 [isolation:isolate] relative overflow-hidden after:absolute before:absolute after:inset-0 after:z-0 before:z-0 before:h-32 before:w-12 before:rotate-[18deg] after:rounded-[inherit] after:opacity-0 after:transition-opacity before:transition-transform after:duration-300 before:duration-700 after:content-[''] before:content-[''] before:-left-8 before:-top-8 before:-translate-x-full hover:enabled:before:translate-x-[560%] active:enabled:after:opacity-60 hover:enabled:after:opacity-45"
                >
                  Quaternary
                </DsButton>
              </td>
            </tr>

            <tr class="border-t border-pureBlack/8 dark:border-pureWhite/10">
              <td class="px-3 py-2 opacity-75">
                R2 Ribbon Soft
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="quaternary"
                  variant="default"
                  class="[isolation:isolate] relative overflow-hidden after:absolute before:absolute after:inset-0 before:h-32 before:w-10 before:rotate-[16deg] after:rounded-[inherit] after:bg-sand-5 before:bg-sand-6 after:opacity-0 after:transition-opacity before:transition-transform after:duration-400 before:duration-900 after:content-[''] before:content-[''] before:-left-8 before:-top-8 before:-translate-x-full hover:enabled:before:translate-x-[520%] active:enabled:after:opacity-42 hover:enabled:after:opacity-28"
                >
                  Quaternary
                </DsButton>
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="quaternary"
                  variant="accent"
                  class="before:bg-toxic-7 after:bg-toxic-6 [isolation:isolate] relative overflow-hidden after:absolute before:absolute after:inset-0 before:h-32 before:w-10 before:rotate-[16deg] after:rounded-[inherit] after:opacity-0 after:transition-opacity before:transition-transform after:duration-400 before:duration-900 after:content-[''] before:content-[''] before:-left-8 before:-top-8 before:-translate-x-full hover:enabled:before:translate-x-[520%] active:enabled:after:opacity-45 hover:enabled:after:opacity-30"
                >
                  Quaternary
                </DsButton>
              </td>
            </tr>

            <tr class="border-t border-pureBlack/8 dark:border-pureWhite/10">
              <td class="px-3 py-2 opacity-75">
                R3 Ribbon Twin
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="quaternary"
                  variant="default"
                  class="[isolation:isolate] relative overflow-hidden after:absolute before:absolute after:h-36 after:w-8 before:h-36 before:w-10 after:rotate-[20deg] before:rotate-[20deg] after:bg-sand-9 before:bg-sand-7 after:transition-transform before:transition-transform after:duration-1000 before:duration-700 after:content-[''] before:content-[''] after:-left-14 after:-top-9 before:-left-10 before:-top-9 after:-translate-x-full before:-translate-x-full active:enabled:bg-sand-8/55 hover:enabled:after:translate-x-[760%] hover:enabled:before:translate-x-[640%]"
                >
                  Quaternary
                </DsButton>
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="quaternary"
                  variant="accent"
                  class="before:bg-toxic-7 after:bg-toxic-9 active:enabled:bg-toxic-8/55 [isolation:isolate] relative overflow-hidden after:absolute before:absolute after:h-36 after:w-8 before:h-36 before:w-10 after:rotate-[20deg] before:rotate-[20deg] after:transition-transform before:transition-transform after:duration-1000 before:duration-700 after:content-[''] before:content-[''] after:-left-14 after:-top-9 before:-left-10 before:-top-9 after:-translate-x-full before:-translate-x-full hover:enabled:after:translate-x-[760%] hover:enabled:before:translate-x-[640%]"
                >
                  Quaternary
                </DsButton>
              </td>
            </tr>

            <tr class="border-t border-pureBlack/8 dark:border-pureWhite/10">
              <td class="px-3 py-2 opacity-75">
                R4 Ribbon Reverse
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="quaternary"
                  variant="default"
                  class="[isolation:isolate] relative overflow-hidden after:absolute before:absolute after:inset-0 before:h-32 before:w-12 before:translate-x-full after:rounded-[inherit] after:bg-sand-6 before:bg-sand-7 after:opacity-0 after:transition-opacity before:transition-transform after:duration-300 before:duration-700 after:content-[''] before:content-[''] before:-right-8 before:-top-8 before:-rotate-[18deg] active:enabled:after:opacity-58 hover:enabled:after:opacity-40 hover:enabled:before:-translate-x-[560%]"
                >
                  Quaternary
                </DsButton>
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="quaternary"
                  variant="accent"
                  class="before:bg-toxic-8 after:bg-toxic-7 [isolation:isolate] relative overflow-hidden after:absolute before:absolute after:inset-0 before:h-32 before:w-12 before:translate-x-full after:rounded-[inherit] after:opacity-0 after:transition-opacity before:transition-transform after:duration-300 before:duration-700 after:content-[''] before:content-[''] before:-right-8 before:-top-8 before:-rotate-[18deg] active:enabled:after:opacity-60 hover:enabled:after:opacity-45 hover:enabled:before:-translate-x-[560%]"
                >
                  Quaternary
                </DsButton>
              </td>
            </tr>

            <tr class="border-t border-pureBlack/8 dark:border-pureWhite/10">
              <td class="px-3 py-2 opacity-75">
                R5 Ribbon High Contrast
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="quaternary"
                  variant="default"
                  class="[isolation:isolate] relative overflow-hidden after:absolute before:absolute after:inset-0 before:h-36 before:w-14 before:rotate-[18deg] after:rounded-[inherit] after:bg-sand-7 before:bg-sand-9 after:opacity-0 after:transition-opacity before:transition-transform after:duration-200 before:duration-500 after:content-[''] before:content-[''] before:-left-9 before:-top-9 before:-translate-x-full active:enabled:bg-sand-10 active:enabled:color-pureWhite hover:enabled:before:translate-x-[540%] dark:active:enabled:bg-sand-8 active:enabled:after:opacity-72 hover:enabled:after:opacity-55"
                >
                  Quaternary
                </DsButton>
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="quaternary"
                  variant="accent"
                  class="before:bg-toxic-9 after:bg-toxic-7 active:enabled:bg-toxic-9 [isolation:isolate] relative overflow-hidden after:absolute before:absolute after:inset-0 before:h-36 before:w-14 before:rotate-[18deg] after:rounded-[inherit] after:opacity-0 after:transition-opacity before:transition-transform after:duration-200 before:duration-500 after:content-[''] before:content-[''] before:-left-9 before:-top-9 before:-translate-x-full active:enabled:color-pureWhite hover:enabled:before:translate-x-[540%] active:enabled:after:opacity-75 hover:enabled:after:opacity-58"
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
