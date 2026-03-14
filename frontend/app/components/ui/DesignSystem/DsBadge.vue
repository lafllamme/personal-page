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
  shimmer: 'ui-badge-anim-shimmer',
  beam: '',
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
  'ui-badge-anim-beam-wrap',
  shapeClassMap[shape.value],
))

const beamInnerClass = computed(() => useClsx(
  rootClass.value,
  'ui-badge-anim-beam-inner',
))

const hasIcon = computed(() => Boolean(icon.value))
const hasDot = computed(() => dot.value)
const badgeText = computed(() => text.value)
const isBeamAnimation = computed(() => !disabled.value && animation.value === 'beam')
</script>

<template>
  <span v-if="isBeamAnimation" :class="beamWrapperClass" :aria-disabled="disabled ? 'true' : undefined">
    <span class="ui-badge-anim-beam-orbit" />
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
