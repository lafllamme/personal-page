<script setup lang="ts">
import DsLink from './DsLink.vue'

defineProps<{
  text: string
  to?: string
  href: string
  variant: 'default' | 'accent'
  size: 'sm' | 'md' | 'lg'
  underline: 'always' | 'hover'
}>()
</script>

<template>
  <div class="bg-pureWhite color-pureBlack p-8 dark:bg-pureBlack dark:color-pureWhite">
    <div class="flex min-h-24 items-center justify-center">
      <DsLink
        :text="text"
        :to="to"
        :href="href"
        :variant="variant"
        :size="size"
        :underline="underline"
      />
    </div>
  </div>
</template>
