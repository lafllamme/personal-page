<script setup lang="ts">
import { computed } from 'vue'
import DsTypography from '@/components/ui/DesignSystem/DsTypography.vue'

const props = withDefaults(defineProps<{
  text?: string
  to?: string
  href?: string
  variant?: 'default' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  underline?: 'always' | 'hover'
}>(), {
  text: '',
  to: '',
  href: '#',
  variant: 'default',
  size: 'md',
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

const sizeClass = computed(() => {
  if (props.size === 'sm')
    return 'ui-link-sm'

  if (props.size === 'lg')
    return 'ui-link-lg'

  return 'ui-link-md'
})

const typoSize = computed(() => {
  if (props.size === 'sm')
    return 'xs'

  if (props.size === 'lg')
    return 'md'

  return 'sm'
})

const linkTag = computed(() => {
  return props.to
    ? 'NuxtLink'
    : 'a'
})

const linkProps = computed(() => {
  return props.to
    ? { to: props.to }
    : { href: props.href }
})
</script>

<template>
  <component
    :is="linkTag"
    v-bind="linkProps"
    class="ui-link-base"
    :class="[sizeClass, variantClass, underlineClass]"
  >
    <DsTypography
      as="span"
      role="meta"
      :size="typoSize"
      weight="regular"
      tracking="default"
    >
      <template v-if="props.text">
        {{ props.text }}
      </template>
      <slot v-else />
    </DsTypography>
  </component>
</template>
