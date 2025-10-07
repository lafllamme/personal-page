<script lang="ts" setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import Underline from '@/components/ui/Menu/Underline/Underline.vue'

/**
 * Interface for our link component props.
 * - href: string (used for standard external links)
 * - to: string (used with Vue Router for internal navigation)
 * - target: string (specifies where to open the link, e.g. _blank)
 * - rel: string (security and relationship attributes)
 * - title: string (tooltip and default accessible name)
 * - tabindex: number (default 0 to ensure keyboard navigation)
 * - ariaLabel: string (custom accessible name if different from title)
 */

// TODO: Clean this up and remove unused props
interface LinkProps {
  href?: string
  to?: string
  target?: string
  rel?: string
  title?: string
  tabindex?: number
  ariaLabel?: string
  underline?: boolean
  underlineSize?: 'default' | 'big' | 'full'
}

// Define props and set a default tabindex for accessibility.
const props = withDefaults(defineProps<LinkProps>(), {
  tabindex: 0,
  underline: true,
  underlineSize: 'default',
})

const localePath = useLocalePath()

// Determine which component to render: if a 'to' prop exists, use the RouterLink component.
const componentType = computed(() => (props.to ? RouterLink : 'a'))

// Build the attributes to be passed to the link element.
// If using Vue Router, we pass 'to'; otherwise, we use 'href' along with related attributes.
// We also set an 'aria-label' to support screen readers.
const linkProps = computed(() => {
  if (props.to) {
    return {
      'to': localePath(props.to),
      'target': props.target,
      'title': props.title,
      'tabindex': props.tabindex,
      'aria-label': props.ariaLabel || props.title,
      'underline-size': props.underlineSize,
    }
  }
  else {
    return {
      'href': props.href,
      'target': props.target,
      'rel': props.rel,
      'title': props.title,
      'tabindex': props.tabindex,
      'aria-label': props.ariaLabel || props.title,
      'underline-size': props.underlineSize,
    }
  }
})
</script>

<template>
  <!--
    The component uses dynamic resolution:
      - It renders either <RouterLink> when 'to' is provided
      - Or an <a> tag when 'href' is provided.
    The container div gets the 'group' class so that the Underline component (inside) can use group-hover.
  -->
  <component
    :is="componentType"
    class="group relative inline-block focus-visible:outline-none focus-visible:ring focus-visible:ring-mint-8 focus-visible:ring-inset"
    v-bind="linkProps"
  >
    <!-- Default slot for link content (text or inner HTML) -->
    <slot />
    <!-- Underline component appears on hover -->
    <Underline
      v-show="underline"
      :size="underlineSize"
      variant="left"
    />
  </component>
</template>

<style scoped>
/* Additional styling can be added as needed */
</style>
