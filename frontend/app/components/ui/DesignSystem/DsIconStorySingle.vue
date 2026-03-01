<script setup lang="ts">
import DsIcon from './DsIcon.vue'

defineProps<{
  name: string
  size: 'sm' | 'md' | 'lg'
  variant: 'default' | 'sand' | 'accent' | 'accent-soft' | 'accent-strong'
  background: boolean
}>()
</script>

<template>
  <div class="bg-pureWhite p-8 color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <div class="min-h-24 flex items-center justify-center">
      <DsIcon
        :name="name"
        :size="size"
        :variant="variant"
        :background="background"
      />
    </div>
  </div>
</template>
