<script setup lang="ts">
import DsButton from './DsButton.vue'
import DsCluster from './DsCluster.vue'

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
</script>

<template>
  <article class="border border-pureBlack/16 rounded-xl border-solid p-5 dark:border-pureWhite/16">
    <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">
      Sizing + Spacing Baseline
    </p>

    <section class="mt-4 border border-pureBlack/10 rounded-lg border-solid p-4 dark:border-pureWhite/10">
      <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">
        Default Variant / Size Scale
      </p>
      <DsCluster
        class="mt-3"
        gap="md"
      >
        <DsButton
          variant="default"
          type="primary"
          :size="props.size"
          :tracking="props.tracking"
          :weight="props.weight"
          :disabled="props.disabled"
        >
          Primary
        </DsButton>
        <DsButton
          variant="default"
          type="primary"
          :size="props.size"
          :tracking="props.tracking"
          :weight="props.weight"
          :disabled="props.disabled"
        >
          Primary
        </DsButton>
        <DsButton
          variant="default"
          type="primary"
          :size="props.size"
          :tracking="props.tracking"
          :weight="props.weight"
          :disabled="props.disabled"
        >
          Primary
        </DsButton>
      </DsCluster>
    </section>

    <section class="mt-4 border border-pureBlack/10 rounded-lg border-solid p-4 dark:border-pureWhite/10">
      <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">
        Variant Consistency (md)
      </p>
      <DsCluster
        class="mt-3"
        gap="md"
      >
        <DsButton
          variant="default"
          type="primary"
          :size="props.size"
          :tracking="props.tracking"
          :weight="props.weight"
          :disabled="props.disabled"
        >
          Primary
        </DsButton>
        <DsButton
          variant="default"
          type="secondary"
          :size="props.size"
          :tracking="props.tracking"
          :weight="props.weight"
          :disabled="props.disabled"
        >
          Secondary
        </DsButton>
        <DsButton
          variant="default"
          type="tertiary"
          :size="props.size"
          :tracking="props.tracking"
          :weight="props.weight"
          :disabled="props.disabled"
        >
          Tertiary
        </DsButton>
        <DsButton
          variant="default"
          type="quaternary"
          :size="props.size"
          :tracking="props.tracking"
          :weight="props.weight"
          :disabled="props.disabled"
        >
          Quaternary
        </DsButton>
      </DsCluster>
    </section>

    <section class="mt-4 border border-pureBlack/10 rounded-lg border-solid p-4 dark:border-pureWhite/10">
      <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">
        Accent Variant (md)
      </p>
      <DsCluster
        class="mt-3"
        gap="md"
      >
        <DsButton
          variant="accent"
          type="primary"
          :size="props.size"
          :tracking="props.tracking"
          :weight="props.weight"
          :disabled="props.disabled"
        >
          Primary
        </DsButton>
        <DsButton
          variant="accent"
          type="secondary"
          :size="props.size"
          :tracking="props.tracking"
          :weight="props.weight"
          :disabled="props.disabled"
        >
          Secondary
        </DsButton>
        <DsButton
          variant="accent"
          type="tertiary"
          :size="props.size"
          :tracking="props.tracking"
          :weight="props.weight"
          :disabled="props.disabled"
        >
          Tertiary
        </DsButton>
        <DsButton
          variant="accent"
          type="quaternary"
          :size="props.size"
          :tracking="props.tracking"
          :weight="props.weight"
          :disabled="props.disabled"
        >
          Quaternary
        </DsButton>
      </DsCluster>
    </section>
  </article>
</template>
