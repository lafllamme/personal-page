<script setup lang="ts">
import DsButton from './DsButton.vue'
import DsCluster from './DsCluster.vue'
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
          size="sm"
        >
          Small
        </DsButton>
        <DsButton
          variant="default"
          type="primary"
          size="md"
        >
          Medium
        </DsButton>
        <DsButton
          variant="default"
          type="primary"
          size="lg"
        >
          Large
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
          size="md"
        >
          Primary
        </DsButton>
        <DsButton
          variant="default"
          type="secondary"
          size="md"
        >
          Secondary
        </DsButton>
        <DsButton
          variant="default"
          type="tertiary"
          size="md"
        >
          Tertiary
        </DsButton>
        <DsButton
          variant="default"
          type="quaternary"
          size="md"
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
          size="md"
        >
          Primary
        </DsButton>
        <DsButton
          variant="accent"
          type="secondary"
          size="md"
        >
          Secondary
        </DsButton>
        <DsButton
          variant="accent"
          type="tertiary"
          size="md"
        >
          Tertiary
        </DsButton>
        <DsButton
          variant="accent"
          type="quaternary"
          size="md"
        >
          Quaternary
        </DsButton>
      </DsCluster>
    </section>
  </article>
</template>
