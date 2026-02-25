<script setup lang="ts">
import { computed } from 'vue'
import DsTypography from '@/components/ui/DesignSystem/DsTypography.vue'

const props = withDefaults(defineProps<{
  text?: string
  href?: string
  underline?: 'always' | 'hover'
}>(), {
  text: '',
  href: '#',
  underline: 'always',
})

const underlineClass = computed(() => {
  return props.underline === 'hover'
    ? 'ui-link-underline-hover'
    : 'ui-link-underline-always'
})
</script>

<template>
  <a
    :href="props.href"
    class="ui-link-base"
    :class="underlineClass"
  >
    <DsTypography
      as="span"
      role="meta"
      size="sm"
      tracking="relaxed"
    >
      <template v-if="props.text">
        {{ props.text }}
      </template>
      <slot v-else />
    </DsTypography>
  </a>
</template>
