<script setup lang="ts">
import { computed } from 'vue'
import DsIcon from '@/components/ui/DesignSystem/DsIcon.vue'
import DsTypography from '@/components/ui/DesignSystem/DsTypography.vue'

const props = withDefaults(defineProps<{
  text?: string
  to?: string
  href?: string
  variant?: 'default' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  underline?: 'always' | 'hover'
  external?: boolean
}>(), {
  text: '',
  to: '',
  href: '#',
  variant: 'default',
  size: 'md',
  underline: 'always',
  external: false,
})

const underlineClass = computed(() => {
  return props.underline === 'hover'
    ? 'ui-link-underline-hover'
    : 'ui-link-underline-always'
})

const variantClass = computed(() => {
  if (props.external) {
    return props.variant === 'accent'
      ? 'ui-link-variant-accent-external'
      : 'ui-link-variant-default-external'
  }

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

const externalTextClass = computed(() => {
  return props.underline === 'hover'
    ? 'ui-link-external-text ui-link-external-text-underline-hover ds-link-external__text ds-link-external__text--hover'
    : 'ui-link-external-text ui-link-external-text-underline-always ds-link-external__text ds-link-external__text--always'
})

const externalArrowToneClass = computed(() => {
  return props.variant === 'accent'
    ? 'ui-link-external-arrow-accent'
    : 'ui-link-external-arrow-default'
})

const externalArrowIconSize = computed(() => {
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
    :class="[sizeClass, variantClass, props.external ? 'ui-link-external ds-link-external' : underlineClass]"
  >
    <template v-if="external">
      <span :class="externalTextClass">
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
      </span>
      <span class="ds-link-external__arrow ui-link-external-arrow" :class="externalArrowToneClass" aria-hidden="true">
        <DsIcon
          name="iconoir:arrow-up-right"
          :size="externalArrowIconSize"
          variant="inherit"
        />
      </span>
    </template>
    <DsTypography
      v-else
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

<style scoped>
.ds-link-external__text::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: var(--link-underline-offset);
  width: 100%;
  height: var(--link-underline-thickness);
  border-radius: 9999px;
  background: currentColor;
}

.ds-link-external__text--hover::after {
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform var(--motion-underline-duration) var(--motion-underline-ease);
}

.ds-link-external:hover .ds-link-external__text--hover::after,
.ds-link-external:focus-visible .ds-link-external__text--hover::after {
  transform: scaleX(1);
  transform-origin: left center;
}

.ds-link-external__text--always::after {
  transform: scaleX(1);
  transform-origin: right center;
  opacity: 1;
  transition:
    transform var(--motion-link-stagger-line-duration) var(--motion-link-stagger-line-ease),
    opacity var(--motion-link-stagger-line-duration) ease;
}

.ds-link-external:hover .ds-link-external__text--always::after,
.ds-link-external:focus-visible .ds-link-external__text--always::after {
  transform: scaleX(0);
  opacity: 0;
}

.ds-link-external__arrow {
  color: var(--link-external-arrow-idle);
  opacity: 0.6;
  transform: translate(0, 0);
  transition:
    transform var(--motion-link-stagger-arrow-duration) var(--motion-link-stagger-arrow-ease)
      var(--motion-link-stagger-arrow-delay),
    opacity var(--motion-link-stagger-arrow-duration) ease var(--motion-link-stagger-arrow-delay),
    color var(--motion-link-stagger-arrow-duration) ease var(--motion-link-stagger-arrow-delay);
}

.ds-link-external:hover .ds-link-external__arrow,
.ds-link-external:focus-visible .ds-link-external__arrow {
  color: var(--link-external-arrow-active);
  opacity: 1;
  transform: translate(4px, -4px);
}
</style>
