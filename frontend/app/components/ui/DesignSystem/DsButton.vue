<script setup lang="ts">
import type { VNode, VNodeArrayChildren } from 'vue'
import { gsap } from 'gsap'
import { computed, onBeforeUnmount, ref, toRefs, useSlots } from 'vue'
import DsDecryptedText from './DsDecryptedText.vue'
import DsTypography from './DsTypography.vue'

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'quaternary'
type ButtonVariant = 'default' | 'accent' | 'mixed'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonShape = 'pill' | 'rounded'
type ButtonTracking = 'default' | 'relaxed'
type ButtonWeight = 'default' | 'strong'
type PrimaryAnimation = 'rotate' | 'decrypt' | 'none'
type DecryptAnimateOn = 'view' | 'hover' | 'both'
type DecryptRevealDirection = 'start' | 'end' | 'center'

interface DecryptConfig {
  animateOn: DecryptAnimateOn
  revealDirection: DecryptRevealDirection
  speed: number
  maxIterations: number
  sequential: boolean
  useOriginalCharsOnly: boolean
}
type LegacyVariant = ButtonType | 'quartery'
type ComboKey = `${ButtonVariant}-${ButtonType}`

const props = withDefaults(defineProps<{
  text?: string
  type?: ButtonType
  variant?: ButtonVariant | LegacyVariant
  size?: ButtonSize
  shape?: ButtonShape
  tracking?: ButtonTracking
  weight?: ButtonWeight
  icon?: string
  iconPosition?: 'left' | 'right'
  iconOnly?: boolean
  ariaLabel?: string
  animation?: PrimaryAnimation
  decrypt?: Partial<DecryptConfig>
  disabled?: boolean
}>(), {
  text: '',
  type: 'primary',
  variant: 'default',
  size: 'md',
  shape: 'pill',
  tracking: 'default',
  weight: 'default',
  icon: '',
  iconPosition: 'left',
  iconOnly: false,
  ariaLabel: '',
  animation: 'rotate',
  decrypt: () => ({
    animateOn: 'both',
    revealDirection: 'start',
    speed: 50,
    maxIterations: 10,
    sequential: true,
    useOriginalCharsOnly: false,
  }),
  disabled: false,
})

const DEFAULT_DECRYPT_CONFIG: DecryptConfig = {
  animateOn: 'both',
  revealDirection: 'start',
  speed: 50,
  maxIterations: 10,
  sequential: true,
  useOriginalCharsOnly: false,
}

const {
  text,
  type,
  variant,
  size,
  shape,
  tracking,
  weight,
  icon,
  iconPosition,
  iconOnly,
  ariaLabel,
  animation,
  decrypt,
  disabled,
} = toRefs(props)

const slots = useSlots()
const LEGACY_VARIANT_TYPES: LegacyVariant[] = ['primary', 'secondary', 'tertiary', 'quaternary', 'quartery']

const isLegacyTypeVariant = computed(() => LEGACY_VARIANT_TYPES.includes(variant.value as LegacyVariant))

const normalizedType = computed<ButtonType>(() => {
  if (type.value)
    return type.value

  if (variant.value === 'quartery')
    return 'quaternary'

  if (isLegacyTypeVariant.value)
    return variant.value as ButtonType

  return 'primary'
})

const normalizedVariant = computed<ButtonVariant>(() => {
  if (isLegacyTypeVariant.value)
    return 'accent'

  return (variant.value as ButtonVariant) ?? 'default'
})

const variantTypeClassMap: Record<ComboKey, string> = {
  'default-primary': 'v-neutral-solid',
  'default-secondary': 'v-neutral-outline',
  'default-tertiary': 'v-neutral-ghost',
  'default-quaternary': 'v-neutral-soft',
  'accent-primary': 'v-accent-solid',
  'accent-secondary': 'v-accent-outline',
  'accent-tertiary': 'v-accent-ghost',
  'accent-quaternary': 'v-accent-soft',
  'mixed-primary': 'v-mixed-solid',
  'mixed-secondary': 'v-mixed-outline',
  'mixed-tertiary': 'v-mixed-ghost',
  'mixed-quaternary': 'v-mixed-soft',
}

const comboKey = computed<ComboKey>(() => `${normalizedVariant.value}-${normalizedType.value}`)

const variantTypeClass = computed(() => variantTypeClassMap[comboKey.value])
const isGhostType = computed(() => normalizedType.value === 'tertiary')
const isPrimaryType = computed(() => normalizedType.value === 'primary')
const ghostButtonClass = 'is-ghost-button is-ghost-morph is-ghost-morph-clip ui-ghost-button ui-ghost-morph-clip'

const sizeClassMap: Record<ButtonSize, string> = {
  sm: 'ui-button-sm',
  md: 'ui-button-md',
  lg: 'ui-button-lg',
}
const sizeClass = computed(() => sizeClassMap[size.value])

const shapeClassMap: Record<ButtonShape, string> = {
  pill: 'ui-button-shape-pill',
  rounded: 'ui-button-shape-rounded',
}
const shapeClass = computed(() => shapeClassMap[shape.value])

const iconOnlySizeClassMap: Record<ButtonSize, string> = {
  sm: 'ui-button-icon-only-sm',
  md: 'ui-button-icon-only-md',
  lg: 'ui-button-icon-only-lg',
}
const iconOnlySizeClass = computed(() => iconOnlySizeClassMap[size.value])

const typographySizeMap: Record<ButtonSize, 'xs' | 'sm' | 'md'> = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
}
const typographySize = computed(() => typographySizeMap[size.value])

const typographyWeightMap: Record<ButtonWeight, 'medium' | 'semibold'> = {
  default: 'medium',
  strong: 'semibold',
}
const typographyWeight = computed(() => typographyWeightMap[weight.value])

const buttonIconSizeClassMap: Record<ButtonSize, string> = {
  sm: 'ui-button-icon-sm',
  md: 'ui-button-icon-md',
  lg: 'ui-button-icon-lg',
}
const buttonIconSizeClass = computed(() => buttonIconSizeClassMap[size.value])

function extractText(children: VNodeArrayChildren | unknown): string {
  if (typeof children === 'string')
    return children

  if (Array.isArray(children)) {
    return children.map((child) => {
      if (typeof child === 'string')
        return child

      if (child && typeof child === 'object' && 'children' in child)
        return extractText((child as VNode).children)

      return ''
    }).join('')
  }

  return ''
}

const slotText = computed(() => {
  const nodes = slots.default?.() ?? []
  return extractText(nodes).trim()
})

const labelText = computed(() => (text.value?.trim() || slotText.value))
const hasIcon = computed(() => Boolean(icon.value?.trim()))
const shouldShowLabel = computed(() => !iconOnly.value && Boolean(labelText.value))
const shouldShowSlot = computed(() => !iconOnly.value && !labelText.value)
const buttonAriaLabel = computed(() => {
  if (!iconOnly.value)
    return undefined

  return ariaLabel.value?.trim() || labelText.value || undefined
})
const buttonRef = ref<HTMLButtonElement | null>(null)

const hoverDecryptTick = ref(0)
const primaryRotateTween = ref<gsap.core.Tween | null>(null)
const resolvedDecrypt = computed<DecryptConfig>(() => ({
  ...DEFAULT_DECRYPT_CONFIG,
  ...(decrypt.value ?? {}),
}))

const isPrimaryRotateAnimation = computed(() => isPrimaryType.value && animation.value === 'rotate')
const isPrimaryDecryptAnimation = computed(() => isPrimaryType.value && animation.value === 'decrypt')
const primaryRotateButtonClass = computed(() => (isPrimaryRotateAnimation.value ? 'overflow-hidden' : ''))
const primaryRotateTypographyClass = computed(() => (isPrimaryRotateAnimation.value ? 'ui-primary-rotate-typo' : ''))
const primaryRotateVariantFixClass = computed(() => {
  if (!isPrimaryRotateAnimation.value || normalizedType.value !== 'primary')
    return ''

  if (normalizedVariant.value === 'default')
    return 'ui-primary-rotate-neutral-fix'

  if (normalizedVariant.value === 'accent')
    return 'ui-primary-rotate-accent-fix'

  if (normalizedVariant.value === 'mixed')
    return 'ui-primary-rotate-mixed-fix'

  return ''
})

function getCssVarNumber(name: string, fallback: number): number {
  const value = buttonRef.value ? getComputedStyle(buttonRef.value).getPropertyValue(name).trim() : ''
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function triggerPrimaryAnimation() {
  if (!isPrimaryType.value || disabled.value || iconOnly.value)
    return

  if (isPrimaryDecryptAnimation.value && (resolvedDecrypt.value.animateOn === 'hover' || resolvedDecrypt.value.animateOn === 'both'))
    hoverDecryptTick.value += 1

  if (!isPrimaryRotateAnimation.value || !buttonRef.value)
    return

  const labels = buttonRef.value.querySelectorAll<HTMLElement>('.ui-primary-rotate-label')
  if (!labels.length)
    return

  if (primaryRotateTween.value) {
    primaryRotateTween.value.kill()
    primaryRotateTween.value = null
    gsap.set(labels, { clearProps: 'rotation' })
  }

  const angle = getCssVarNumber('--motion-primary-rotate-angle', 20)
  const duration = getCssVarNumber('--motion-primary-rotate-duration', 0.5)
  const stagger = getCssVarNumber('--motion-primary-rotate-stagger', 0.075)

  primaryRotateTween.value = gsap.to(labels, {
    rotation: `+=${angle}`,
    duration,
    ease: 'expo.out',
    stagger,
    overwrite: 'auto',
    onComplete: () => {
      gsap.set(labels, { clearProps: 'rotation' })
      primaryRotateTween.value = null
    },
  })
}

const resolvedDecryptAnimateOn = computed<'view' | 'manual'>(() => {
  return resolvedDecrypt.value.animateOn === 'hover' ? 'manual' : 'view'
})

const decryptTriggerKey = computed(() => `${normalizedVariant.value}-${normalizedType.value}-${labelText.value}-${hoverDecryptTick.value}`)

onBeforeUnmount(() => {
  if (primaryRotateTween.value) {
    primaryRotateTween.value.kill()
    primaryRotateTween.value = null
  }
})
</script>

<template>
  <button
    ref="buttonRef"
    type="button"
    :disabled="disabled"
    :aria-label="buttonAriaLabel"
    class="group ui-button-base"
    :class="[sizeClass, shapeClass, iconOnly ? iconOnlySizeClass : '', hasIcon && !iconOnly ? 'gap-2' : '', variantTypeClass, isGhostType ? ghostButtonClass : '', primaryRotateButtonClass, primaryRotateVariantFixClass]"
    @pointerenter="triggerPrimaryAnimation"
    @focusin="triggerPrimaryAnimation"
  >
    <Icon
      v-if="hasIcon && iconPosition === 'left'"
      :name="icon"
      aria-hidden="true"
      class="ui-button-icon-base"
      :class="buttonIconSizeClass"
    />
    <DsTypography
      v-if="shouldShowLabel"
      as="span"
      role="meta"
      :size="typographySize"
      :tracking="tracking"
      :weight="typographyWeight"
      :uppercase="true"
      class="ui-button-label"
      :class="[isGhostType ? 'is-ghost-label ui-ghost-label' : '', primaryRotateTypographyClass]"
    >
      <template v-if="isPrimaryDecryptAnimation && labelText">
        <DsDecryptedText
          :text="labelText"
          :speed="resolvedDecrypt.speed"
          :max-iterations="resolvedDecrypt.maxIterations"
          :sequential="resolvedDecrypt.sequential"
          :reveal-direction="resolvedDecrypt.revealDirection"
          :use-original-chars-only="resolvedDecrypt.useOriginalCharsOnly"
          :animate-on="resolvedDecryptAnimateOn"
          :trigger-key="decryptTriggerKey"
        />
      </template>
      <template v-else-if="isPrimaryRotateAnimation && labelText">
        <span class="ui-primary-rotate-wrap">
          <span class="ui-primary-rotate-label ui-primary-rotate-label-l1">{{ labelText }}</span>
          <span
            class="ui-primary-rotate-label ui-primary-rotate-label-l2"
            aria-hidden="true"
          >{{ labelText }}</span>
        </span>
      </template>
      <template v-else>
        {{ labelText }}
      </template>
    </DsTypography>
    <slot v-else-if="shouldShowSlot" />
    <Icon
      v-if="hasIcon && iconPosition === 'right'"
      :name="icon"
      aria-hidden="true"
      class="ui-button-icon-base"
      :class="buttonIconSizeClass"
    />
  </button>
</template>
