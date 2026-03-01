<script setup lang="ts">
import DsLink from './DsLink.vue'

defineProps<{
  text: string
  href: string
  variant: 'default' | 'accent'
  underline: 'always' | 'hover'
}>()
</script>

<template>
  <div class="bg-pureWhite color-pureBlack p-8 dark:bg-pureBlack dark:color-pureWhite">
    <div class="py-4">
      <div class="mb-5 flex items-start justify-start gap-24">
        <div class="w-80">
          <span class="block font-$font-meta text-$type-meta-xs leading-none color-$color-primary opacity-70">SM</span>
        </div>
        <div class="w-80">
          <span class="block font-$font-meta text-$type-meta-xs leading-none color-$color-primary opacity-70">MD</span>
        </div>
        <div class="w-80">
          <span class="block font-$font-meta text-$type-meta-xs leading-none color-$color-primary opacity-70">LG</span>
        </div>
      </div>
      <div class="flex items-end justify-start gap-24">
        <div class="flex h-12 w-80 items-end">
          <DsLink
            :text="text"
            :href="href"
            :variant="variant"
            size="sm"
            :underline="underline"
          />
        </div>
        <div class="flex h-12 w-80 items-end">
          <DsLink
            :text="text"
            :href="href"
            :variant="variant"
            size="md"
            :underline="underline"
          />
        </div>
        <div class="flex h-12 w-80 items-end">
          <DsLink
            :text="text"
            :href="href"
            :variant="variant"
            size="lg"
            :underline="underline"
          />
        </div>
      </div>
    </div>
  </div>
</template>
