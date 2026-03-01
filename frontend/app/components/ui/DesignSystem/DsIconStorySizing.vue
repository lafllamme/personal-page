<script setup lang="ts">
import DsIcon from './DsIcon.vue'
import DsTypography from './DsTypography.vue'

defineProps<{
  name: string
  variant: 'default' | 'sand' | 'accent' | 'accent-soft' | 'accent-strong'
  background: boolean
}>()
</script>

<template>
  <div class="bg-pureWhite p-8 color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <div class="py-4">
      <div class="mb-5 flex items-start gap-16">
        <div class="w-48">
          <DsTypography as="span" role="meta" size="xs" tone="muted">
            SM
          </DsTypography>
        </div>
        <div class="w-48">
          <DsTypography as="span" role="meta" size="xs" tone="muted">
            MD
          </DsTypography>
        </div>
        <div class="w-48">
          <DsTypography as="span" role="meta" size="xs" tone="muted">
            LG
          </DsTypography>
        </div>
      </div>
      <div class="flex items-center gap-16">
        <div class="h-16 w-48 flex items-center">
          <DsIcon
            :name="name"
            size="sm"
            :variant="variant"
            :background="background"
          />
        </div>
        <div class="h-16 w-48 flex items-center">
          <DsIcon
            :name="name"
            size="md"
            :variant="variant"
            :background="background"
          />
        </div>
        <div class="h-16 w-48 flex items-center">
          <DsIcon
            :name="name"
            size="lg"
            :variant="variant"
            :background="background"
          />
        </div>
      </div>
    </div>
  </div>
</template>
