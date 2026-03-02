<script setup lang="ts">
import DsLink from './DsLink.vue'
import DsTypography from './DsTypography.vue'

defineProps<{
  text: string
  href: string
  variant: 'default' | 'accent' | 'mixed'
  underline: 'always' | 'hover'
  external?: boolean
}>()
</script>

<template>
  <div class="bg-pureWhite p-8 color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <div class="py-4">
      <div class="mb-5 flex items-start gap-24">
        <div class="w-80">
          <DsTypography as="span" role="meta" size="xs" tone="muted">
            SM
          </DsTypography>
        </div>
        <div class="w-80">
          <DsTypography as="span" role="meta" size="xs" tone="muted">
            MD
          </DsTypography>
        </div>
        <div class="w-80">
          <DsTypography as="span" role="meta" size="xs" tone="muted">
            LG
          </DsTypography>
        </div>
      </div>
      <div class="flex items-end gap-24">
        <div class="h-12 w-80 flex items-end">
          <DsLink
            :text="text"
            :href="href"
            :variant="variant"
            size="sm"
            :underline="underline"
            :external="external"
          />
        </div>
        <div class="h-12 w-80 flex items-end">
          <DsLink
            :text="text"
            :href="href"
            :variant="variant"
            size="md"
            :underline="underline"
            :external="external"
          />
        </div>
        <div class="h-12 w-80 flex items-end">
          <DsLink
            :text="text"
            :href="href"
            :variant="variant"
            size="lg"
            :underline="underline"
            :external="external"
          />
        </div>
      </div>
    </div>
  </div>
</template>
