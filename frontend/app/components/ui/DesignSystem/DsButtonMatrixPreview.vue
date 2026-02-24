<script setup lang="ts">
import DsButton from './DsButton.vue'

type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonTracking = 'default' | 'relaxed'
type ButtonWeight = 'default' | 'strong'

const props = withDefaults(defineProps<{
  size?: ButtonSize
  tracking?: ButtonTracking
  weight?: ButtonWeight
  disabled?: boolean
}>(), {
  size: 'md',
  tracking: 'relaxed',
  weight: 'default',
  disabled: false,
})

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
    'hover': 'bg-$bg-inverse color-$color-primary',
    'active': 'translate-y-[1px] bg-$bg-solid-active color-$color-inverse',
    'focus-visible': '[box-shadow:inset_0_0_0_2px_var(--border-primary),0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--ring-primary-offset-outer)]',
  },
  'default-secondary': {
    'hover': 'before:translate-y-0 color-pureWhite [box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand10)]',
    'active': 'translate-y-[1px] before:translate-y-0 before:bg-sand-11 dark:before:bg-sand-9 color-pureWhite [box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand11)] dark:[box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand9)]',
    'focus-visible': 'before:translate-y-0 color-pureWhite [box-shadow:0_0_0_2px_var(--pure-white),0_0_0_4px_var(--un-preset-radix-sand10)] dark:[box-shadow:0_0_0_2px_var(--pure-black),0_0_0_4px_var(--un-preset-radix-sand10)]',
  },
  'default-tertiary': {
    'hover': 'is-ghost-morph-on',
    'active': 'is-ghost-morph-on-active translate-y-[1px]',
    'focus-visible': '[color:var(--ghost-morph-text)] before:opacity-0 after:left-0 after:right-0 after:top-0 after:bottom-0 after:[border-radius:inherit] after:bg-[var(--ghost-morph-fill)] [box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--bg-ghost-morph-fill)]',
  },
  'default-quaternary': {
    'hover': 'before:translate-x-[var(--motion-quaternary-ribbon-strip-travel)] after:[opacity:var(--motion-quaternary-neutral-hover-opacity)]',
    'active': 'before:translate-x-[var(--motion-quaternary-ribbon-strip-travel)] after:[opacity:var(--motion-quaternary-neutral-active-opacity)]',
    'focus-visible': 'before:translate-x-[var(--motion-quaternary-ribbon-strip-travel)] after:[opacity:var(--motion-quaternary-focus-opacity)] [box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--ring-quaternary-focus)]',
  },
  'accent-primary': {
    'hover': '[background-color:var(--color-accent-hover)] color-$color-on-accent',
    'active': 'translate-y-[1px] [background-color:var(--color-accent-soft)] color-$color-on-accent',
    'focus-visible': '[box-shadow:inset_0_0_0_2px_var(--border-accent),0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--ring-accent-offset-outer)]',
  },
  'accent-secondary': {
    'hover': 'before:translate-y-0 color-$color-primary [box-shadow:inset_0_0_0_2px_var(--border-accent-outline-fill)]',
    'active': 'translate-y-[1px] before:translate-y-0 color-$color-primary [box-shadow:inset_0_0_0_2px_var(--border-accent-outline-fill)]',
    'focus-visible': 'before:translate-y-0 color-$color-primary [box-shadow:0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--border-accent-outline-fill)]',
  },
  'accent-tertiary': {
    'hover': 'is-ghost-morph-on',
    'active': 'is-ghost-morph-on-active translate-y-[1px]',
    'focus-visible': '[color:var(--ghost-morph-text)] before:opacity-0 after:left-0 after:right-0 after:top-0 after:bottom-0 after:[border-radius:inherit] after:bg-[var(--ghost-morph-fill)] [box-shadow:0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--bg-ghost-morph-accent-fill)]',
  },
  'accent-quaternary': {
    'hover': 'before:translate-x-[var(--motion-quaternary-ribbon-strip-travel)] after:[opacity:var(--motion-quaternary-accent-hover-opacity)]',
    'active': 'before:translate-x-[var(--motion-quaternary-ribbon-strip-travel)] after:[opacity:var(--motion-quaternary-accent-active-opacity)]',
    'focus-visible': 'before:translate-x-[var(--motion-quaternary-ribbon-strip-travel)] after:[opacity:var(--motion-quaternary-focus-opacity)] [box-shadow:0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--ring-accent-quaternary-focus)]',
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
                  :size="props.size"
                  :tracking="props.tracking"
                  :weight="props.weight"
                  :class="getForcedStateClass(variant.key, type.key, state.key)"
                  :disabled="props.disabled || state.key === 'disabled'"
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
                  :size="props.size"
                  :tracking="props.tracking"
                  :weight="props.weight"
                  :disabled="props.disabled"
                >
                  Primary
                </DsButton>
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="secondary"
                  :variant="row.key"
                  :size="props.size"
                  :tracking="props.tracking"
                  :weight="props.weight"
                  :disabled="props.disabled"
                >
                  Secondary
                </DsButton>
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="tertiary"
                  :variant="row.key"
                  :size="props.size"
                  :tracking="props.tracking"
                  :weight="props.weight"
                  :disabled="props.disabled"
                >
                  Tertiary
                </DsButton>
              </td>
              <td class="px-3 py-2">
                <DsButton
                  type="quaternary"
                  :variant="row.key"
                  :size="props.size"
                  :tracking="props.tracking"
                  :weight="props.weight"
                  :disabled="props.disabled"
                >
                  Quaternary
                </DsButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="space-grotesk-regular mt-6 text-[10px] tracking-[0.16em] uppercase opacity-65">
        Default Focus Check
      </p>
      <div class="mt-3 overflow-auto border border-pureBlack/12 rounded-lg border-solid dark:border-pureWhite/12">
        <table class="min-w-full border-collapse text-left text-[10px] tracking-[0.12em] uppercase">
          <thead class="bg-pureBlack/3 dark:bg-pureWhite/5">
            <tr>
              <th class="px-3 py-2 font-medium opacity-75">
                Type
              </th>
              <th class="px-3 py-2 font-medium opacity-75">
                Default
              </th>
              <th class="px-3 py-2 font-medium opacity-75">
                Focus Visible
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="type in types"
              :key="`default-focus-${type.key}`"
              class="border-t border-pureBlack/8 dark:border-pureWhite/10"
            >
              <td class="px-3 py-2 opacity-75">
                {{ type.label }}
              </td>
              <td class="px-3 py-2">
                <DsButton
                  :type="type.key"
                  variant="default"
                  :size="props.size"
                  :tracking="props.tracking"
                  :weight="props.weight"
                  :disabled="props.disabled"
                >
                  {{ type.label }}
                </DsButton>
              </td>
              <td class="px-3 py-2">
                <DsButton
                  :type="type.key"
                  variant="default"
                  :size="props.size"
                  :tracking="props.tracking"
                  :weight="props.weight"
                  :disabled="props.disabled"
                  :class="getForcedStateClass('default', type.key, 'focus-visible')"
                >
                  {{ type.label }}
                </DsButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="space-grotesk-regular mt-6 text-[10px] tracking-[0.16em] uppercase opacity-65">
        All Focus States
      </p>
      <div class="mt-3 overflow-auto border border-pureBlack/12 rounded-lg border-solid dark:border-pureWhite/12">
        <table class="min-w-full border-collapse text-left text-[10px] tracking-[0.12em] uppercase">
          <thead class="bg-pureBlack/3 dark:bg-pureWhite/5">
            <tr>
              <th class="px-3 py-2 font-medium opacity-75">
                Variant
              </th>
              <th class="px-3 py-2 font-medium opacity-75">
                Type
              </th>
              <th class="px-3 py-2 font-medium opacity-75">
                Focus Visible
              </th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="row in compactVariantRows"
              :key="`all-focus-${row.key}`"
            >
              <tr
                v-for="type in types"
                :key="`all-focus-${row.key}-${type.key}`"
                class="border-t border-pureBlack/8 dark:border-pureWhite/10"
              >
                <td class="px-3 py-2 opacity-75">
                  {{ row.label }}
                </td>
                <td class="px-3 py-2 opacity-75">
                  {{ type.label }}
                </td>
                <td class="px-3 py-2">
                  <DsButton
                    :type="type.key"
                    :variant="row.key"
                    :size="props.size"
                    :tracking="props.tracking"
                    :weight="props.weight"
                    :disabled="props.disabled"
                    :class="getForcedStateClass(row.key, type.key, 'focus-visible')"
                  >
                    {{ type.label }}
                  </DsButton>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

    </section>
  </article>
</template>
