<script setup lang="ts">
import { computed, resolveComponent } from 'vue'
import DsIcon from '@/components/ui/DesignSystem/DsIcon.vue'
import DsTypography from '@/components/ui/DesignSystem/DsTypography.vue'

const props = withDefaults(defineProps<{
  text?: string
  to?: string
  href?: string
  variant?: 'default' | 'accent' | 'mixed'
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
    if (props.variant === 'mixed')
      return 'ui-link-variant-mixed-external'

    return props.variant === 'accent'
      ? 'ui-link-variant-accent-external'
      : 'ui-link-variant-default-external'
  }

  if (props.variant === 'mixed')
    return 'ui-link-variant-mixed'

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
    ? 'ui-link-external-text ui-link-external-text-underline-hover'
    : 'ui-link-external-text ui-link-external-text-underline-always'
})

const externalArrowToneClass = computed(() => {
  if (props.variant === 'mixed')
    return 'ui-link-external-arrow-mixed'

  return props.variant === 'accent'
    ? 'ui-link-external-arrow-accent'
    : 'ui-link-external-arrow-default'
})

const externalArrowIconSize = computed<'sm'>(() => {
  return 'sm'
})

const linkTag = computed(() => {
  return props.to ? resolveComponent('NuxtLink') : 'a'
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
    :class="[sizeClass, variantClass, props.external ? 'ui-link-external' : underlineClass]"
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
      <span
        class="ui-link-external-arrow"
        :class="externalArrowToneClass"
        aria-hidden="true"
      >
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
.ui-link-external-text::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: var(--link-underline-offset);
  width: 100%;
  height: var(--link-underline-thickness);
  border-radius: 9999px;
  background: currentColor;
  transform: scaleX(var(--link-external-line-scale));
  transform-origin: var(--link-external-line-origin);
  opacity: var(--link-external-line-opacity);
  transition:
    transform var(--link-external-line-duration) var(--link-external-line-ease),
    opacity var(--link-external-line-duration) ease;
}

.ui-link-external:hover .ui-link-external-text::after,
.ui-link-external:focus-visible .ui-link-external-text::after {
  transform: scaleX(var(--link-external-line-hover-scale));
  transform-origin: var(--link-external-line-hover-origin);
  opacity: var(--link-external-line-hover-opacity);
}

.ui-link-external-arrow {
  color: var(--link-external-arrow-idle);
  opacity: 0.6;
  transform: translate(0, 0);
  transition:
    transform var(--motion-link-stagger-arrow-duration) var(--motion-link-stagger-arrow-ease)
      var(--motion-link-stagger-arrow-delay),
    opacity var(--motion-link-stagger-arrow-duration) ease var(--motion-link-stagger-arrow-delay),
    color var(--motion-link-stagger-arrow-duration) ease var(--motion-link-stagger-arrow-delay);
}

.ui-link-external:hover .ui-link-external-arrow,
.ui-link-external:focus-visible .ui-link-external-arrow {
  color: var(--link-external-arrow-active);
  opacity: 1;
  transform: translate(var(--link-external-arrow-shift-x), var(--link-external-arrow-shift-y));
}
</style>
