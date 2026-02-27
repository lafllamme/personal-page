<script setup lang="ts">
import { computed } from 'vue'
import DsTypography from '@/components/ui/DesignSystem/DsTypography.vue'

const props = withDefaults(defineProps<{
  text?: string
  href?: string
  variant?: 'default' | 'accent'
  underline?: 'always' | 'hover'
}>(), {
  text: '',
  href: '#',
  variant: 'default',
  underline: 'always',
})

const underlineClass = computed(() => {
  return props.underline === 'hover'
    ? 'ui-link-underline-hover'
    : 'ui-link-underline-always'
})

const variantClass = computed(() => {
  return props.variant === 'accent'
    ? 'ui-link-variant-accent'
    : 'ui-link-variant-default'
})
</script>

<template>
  <a
    :href="props.href"
    class="ui-link-base"
    :class="[variantClass, underlineClass]"
  >
    <DsTypography
      as="span"
      role="meta"
      size="sm"
      weight="regular"
      tracking="default"
    >
      <template v-if="props.text">
        {{ props.text }}
      </template>
      <slot v-else />
    </DsTypography>
  </a>
</template>
