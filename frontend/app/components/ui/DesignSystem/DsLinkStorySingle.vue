<script setup lang="ts">
import DsLink from './DsLink.vue'

defineProps<{
  text: string
  to?: string
  href: string
  variant: 'default' | 'accent'
  size: 'sm' | 'md' | 'lg'
  underline: 'always' | 'hover'
  external?: boolean
}>()
</script>

<template>
  <div class="bg-pureWhite p-8 color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <div class="min-h-24 flex items-center justify-center">
      <DsLink
        :text="text"
        :to="to"
        :href="href"
        :variant="variant"
        :size="size"
        :underline="underline"
        :external="external"
      />
    </div>
  </div>
</template>
