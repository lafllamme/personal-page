<script setup lang="ts">
import DsIcon from './DsIcon.vue'
import DsTypography from './DsTypography.vue'

defineProps<{
  name: string
  size: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div class="bg-pureWhite p-8 color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <div class="flex flex-col gap-8">
      <div class="flex items-start gap-10">
        <div class="w-40 flex flex-col gap-4">
          <DsTypography as="span" role="meta" size="xs" tone="muted">
            Default
          </DsTypography>
          <div class="size-12 flex items-center justify-start">
            <DsIcon :name="name" :size="size" variant="default" />
          </div>
        </div>
        <div class="w-40 flex flex-col gap-4">
          <DsTypography as="span" role="meta" size="xs" tone="muted">
            Sand
          </DsTypography>
          <div class="size-12 flex items-center justify-start">
            <DsIcon :name="name" :size="size" variant="sand" />
          </div>
        </div>
        <div class="w-40 flex flex-col gap-4">
          <DsTypography as="span" role="meta" size="xs" tone="muted">
            Accent
          </DsTypography>
          <div class="size-12 flex items-center justify-start">
            <DsIcon :name="name" :size="size" variant="accent" />
          </div>
        </div>
        <div class="w-40 flex flex-col gap-4">
          <DsTypography as="span" role="meta" size="xs" tone="muted">
            Accent Soft
          </DsTypography>
          <div class="size-12 flex items-center justify-start">
            <DsIcon :name="name" :size="size" variant="accent-soft" />
          </div>
        </div>
        <div class="w-40 flex flex-col gap-4">
          <DsTypography as="span" role="meta" size="xs" tone="muted">
            Accent Strong
          </DsTypography>
          <div class="size-12 flex items-center justify-start">
            <DsIcon :name="name" :size="size" variant="accent-strong" />
          </div>
        </div>
      </div>

      <div class="flex items-start gap-10">
        <div class="w-40 flex flex-col gap-4">
          <DsTypography as="span" role="meta" size="xs" tone="muted">
            Default / BG
          </DsTypography>
          <div class="size-12 flex items-center justify-start">
            <DsIcon :name="name" :size="size" variant="default" background />
          </div>
        </div>
        <div class="w-40 flex flex-col gap-4">
          <DsTypography as="span" role="meta" size="xs" tone="muted">
            Sand / BG
          </DsTypography>
          <div class="size-12 flex items-center justify-start">
            <DsIcon :name="name" :size="size" variant="sand" background />
          </div>
        </div>
        <div class="w-40 flex flex-col gap-4">
          <DsTypography as="span" role="meta" size="xs" tone="muted">
            Accent / BG
          </DsTypography>
          <div class="size-12 flex items-center justify-start">
            <DsIcon :name="name" :size="size" variant="accent" background />
          </div>
        </div>
        <div class="w-40 flex flex-col gap-4">
          <DsTypography as="span" role="meta" size="xs" tone="muted">
            Accent Soft / BG
          </DsTypography>
          <div class="size-12 flex items-center justify-start">
            <DsIcon :name="name" :size="size" variant="accent-soft" background />
          </div>
        </div>
        <div class="w-40 flex flex-col gap-4">
          <DsTypography as="span" role="meta" size="xs" tone="muted">
            Accent Strong / BG
          </DsTypography>
          <div class="size-12 flex items-center justify-start">
            <DsIcon :name="name" :size="size" variant="accent-strong" background />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
