<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useClsx } from '@/composables/useClsx'
import DsIcon from './DsIcon.vue'
import DsTypography from './DsTypography.vue'

type BadgeVariant = 'default' | 'accent' | 'mixed'
type BadgeType = 'solid' | 'outline' | 'soft' | 'crisp'
type BadgeSize = 'sm' | 'md'
type BadgeShape = 'pill' | 'rounded'
type BadgeAnimation = 'none' | 'shimmer' | 'beam'

const props = withDefaults(defineProps<{
  text: string
  variant?: BadgeVariant
  type?: BadgeType
  size?: BadgeSize
  shape?: BadgeShape
  animation?: BadgeAnimation
  dot?: boolean
  icon?: string
  disabled?: boolean
}>(), {
  variant: 'default',
  type: 'solid',
  size: 'md',
  shape: 'pill',
  animation: 'none',
  dot: false,
  icon: '',
  disabled: false,
})

const { text, variant, type, size, shape, animation, dot, icon, disabled } = toRefs(props)

const variantClassMap: Record<BadgeVariant, string> = {
  default: 'ui-badge-variant-default',
  accent: 'ui-badge-variant-accent',
  mixed: 'ui-badge-variant-mixed',
}

const typeClassMap: Record<BadgeType, string> = {
  solid: 'ui-badge-type-solid',
  outline: 'ui-badge-type-outline',
  soft: 'ui-badge-type-soft',
  crisp: 'ui-badge-type-crisp',
}

const sizeClassMap: Record<BadgeSize, string> = {
  sm: 'ui-badge-size-sm',
  md: 'ui-badge-size-md',
}

const shapeClassMap: Record<BadgeShape, string> = {
  pill: 'ui-badge-shape-pill',
  rounded: 'ui-badge-shape-rounded',
}

const animationClassMap: Record<BadgeAnimation, string> = {
  none: '',
  shimmer: 'ds-badge-anim-shimmer',
  beam: 'ds-badge-anim-beam',
}

const textSizeByBadgeSize: Record<BadgeSize, '2xs' | 'xs'> = {
  sm: '2xs',
  md: 'xs',
}

const iconSizeByBadgeSize: Record<BadgeSize, 'xs' | 'sm'> = {
  sm: 'xs',
  md: 'sm',
}

const rootClass = computed(() => useClsx(
  'ui-badge-base',
  sizeClassMap[size.value],
  shapeClassMap[shape.value],
  variantClassMap[variant.value],
  typeClassMap[type.value],
  !disabled.value && animation.value !== 'beam' && animationClassMap[animation.value],
  disabled.value && 'ui-badge-disabled',
))

const beamWrapperClass = computed(() => useClsx(
  'ds-badge-beam-wrap',
  shapeClassMap[shape.value],
))

const beamInnerClass = computed(() => useClsx(
  rootClass.value,
  'ds-badge-beam-inner',
))

const hasIcon = computed(() => Boolean(icon.value))
const hasDot = computed(() => dot.value)
const badgeText = computed(() => text.value)
const isBeamAnimation = computed(() => !disabled.value && animation.value === 'beam')
</script>

<template>
  <span v-if="isBeamAnimation" :class="beamWrapperClass" :aria-disabled="disabled ? 'true' : undefined">
    <span class="ds-badge-beam-orbit" />
    <span :class="beamInnerClass">
      <span v-if="hasDot" class="ui-badge-dot" />

      <DsIcon
        v-if="hasIcon"
        :name="icon"
        :size="iconSizeByBadgeSize[size]"
        variant="inherit"
      />

      <DsTypography
        as="span"
        role="meta"
        :size="textSizeByBadgeSize[size]"
        :weight="variant === 'accent' ? 'semibold' : 'medium'"
        uppercase
        class="ui-badge-text"
      >
        {{ badgeText }}
      </DsTypography>
    </span>
  </span>

  <span v-else :class="rootClass" :aria-disabled="disabled ? 'true' : undefined">
    <span v-if="hasDot" class="ui-badge-dot" />

    <DsIcon
      v-if="hasIcon"
      :name="icon"
      :size="iconSizeByBadgeSize[size]"
      variant="inherit"
    />

    <DsTypography
      as="span"
      role="meta"
      :size="textSizeByBadgeSize[size]"
      :weight="variant === 'accent' ? 'semibold' : 'medium'"
      uppercase
      class="ui-badge-text"
    >
      {{ badgeText }}
    </DsTypography>
  </span>
</template>

<style scoped>
.ds-badge-anim-shimmer {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.ds-badge-anim-shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 40%, rgb(255 255 255 / 42%) 50%, transparent 60%);
  background-size: 200% 100%;
  background-position: 100% 0;
  mix-blend-mode: screen;
  pointer-events: none;
  animation: ds-badge-shimmer 5s linear infinite;
}

.ds-badge-beam-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  padding: 1px;
  overflow: hidden;
  isolation: isolate;
  border-radius: var(--ds-badge-radius);
}

.ds-badge-beam-wrap::before {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: calc(var(--ds-badge-radius) - 1px);
  background: var(--bg-ghost-morph-fill);
  z-index: 1;
}

.ds-badge-beam-orbit {
  position: absolute;
  inset: -1000%;
  background: conic-gradient(
    from 90deg at 50% 50%,
    transparent 0deg 320deg,
    rgb(255 255 255 / 95%) 334deg 344deg,
    transparent 360deg
  );
  pointer-events: none;
  animation: ds-badge-beam 3.8s linear infinite;
  z-index: 0;
}

.ds-badge-beam-inner {
  position: relative;
  z-index: 2;
  border-color: transparent;
  border-width: 0;
  background: transparent;
}

@keyframes ds-badge-shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}

@keyframes ds-badge-beam {
  100% {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ds-badge-anim-shimmer::after,
  .ds-badge-beam-orbit {
    animation: none;
  }
}
</style>
