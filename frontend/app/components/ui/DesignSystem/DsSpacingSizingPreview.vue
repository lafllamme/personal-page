<script setup lang="ts">
import DsButton from './DsButton.vue'

type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonTracking = 'default' | 'relaxed'
type ButtonWeight = 'default' | 'strong'

const props = withDefaults(defineProps<{
  shape?: 'pill' | 'rounded'
  tracking?: ButtonTracking
  weight?: ButtonWeight
  disabled?: boolean
}>(), {
  shape: 'pill',
  tracking: 'default',
  weight: 'default',
  disabled: false,
})

const sizeScale: Array<{ key: ButtonSize, label: string }> = [
  { key: 'sm', label: 'SM' },
  { key: 'md', label: 'MD' },
  { key: 'lg', label: 'LG' },
]
</script>

<template>
  <article class="border border-pureBlack/16 rounded-xl border-solid p-5 dark:border-pureWhite/16">
    <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">
      Sizing + Spacing Baseline
    </p>

    <section class="mt-4 border border-pureBlack/10 rounded-lg border-solid p-4 dark:border-pureWhite/10">
      <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">
        Primary Scale (SM / MD / LG)
      </p>
      <div class="grid mt-3 gap-3 md:grid-cols-3">
        <div
          v-for="item in sizeScale"
          :key="`size-scale-${item.key}`"
          class="border border-pureBlack/10 rounded-md border-solid p-3 dark:border-pureWhite/10"
        >
          <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">
            {{ item.label }}
          </p>
          <DsButton
            class="mt-2"
            variant="default"
            type="primary"
            :size="item.key"
            :shape="props.shape"
            :tracking="props.tracking"
            :weight="props.weight"
            :disabled="props.disabled"
          >
            Primary
          </DsButton>
        </div>
      </div>
    </section>

    <section class="mt-4 border border-pureBlack/10 rounded-lg border-solid p-4 dark:border-pureWhite/10">
      <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">
        Variant Consistency (MD)
      </p>
      <div class="mt-3 flex flex-wrap gap-4">
        <DsButton
          variant="default"
          type="primary"
          size="md"
          :shape="props.shape"
          :tracking="props.tracking"
          :weight="props.weight"
          :disabled="props.disabled"
        >
          Primary
        </DsButton>
        <DsButton
          variant="default"
          type="secondary"
          size="md"
          :shape="props.shape"
          :tracking="props.tracking"
          :weight="props.weight"
          :disabled="props.disabled"
        >
          Secondary
        </DsButton>
        <DsButton
          variant="default"
          type="tertiary"
          size="md"
          :shape="props.shape"
          :tracking="props.tracking"
          :weight="props.weight"
          :disabled="props.disabled"
        >
          Tertiary
        </DsButton>
        <DsButton
          variant="default"
          type="quaternary"
          size="md"
          :shape="props.shape"
          :tracking="props.tracking"
          :weight="props.weight"
          :disabled="props.disabled"
        >
          Quaternary
        </DsButton>
      </div>
    </section>

    <section class="mt-4 border border-pureBlack/10 rounded-lg border-solid p-4 dark:border-pureWhite/10">
      <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">
        Accent Variant (MD)
      </p>
      <div class="mt-3 flex flex-wrap gap-4">
        <DsButton
          variant="accent"
          type="primary"
          size="md"
          :shape="props.shape"
          :tracking="props.tracking"
          :weight="props.weight"
          :disabled="props.disabled"
        >
          Primary
        </DsButton>
        <DsButton
          variant="accent"
          type="secondary"
          size="md"
          :shape="props.shape"
          :tracking="props.tracking"
          :weight="props.weight"
          :disabled="props.disabled"
        >
          Secondary
        </DsButton>
        <DsButton
          variant="accent"
          type="tertiary"
          size="md"
          :shape="props.shape"
          :tracking="props.tracking"
          :weight="props.weight"
          :disabled="props.disabled"
        >
          Tertiary
        </DsButton>
        <DsButton
          variant="accent"
          type="quaternary"
          size="md"
          :shape="props.shape"
          :tracking="props.tracking"
          :weight="props.weight"
          :disabled="props.disabled"
        >
          Quaternary
        </DsButton>
      </div>
    </section>
  </article>
</template>
