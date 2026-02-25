<script setup lang="ts">
import { computed, ref, toRefs, useSlots, type VNode, type VNodeArrayChildren } from 'vue'
import DsDecryptedText from './DsDecryptedText.vue'
import DsTypography from './DsTypography.vue'

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'quaternary'
type ButtonVariant = 'default' | 'accent'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonTracking = 'default' | 'relaxed'
type ButtonWeight = 'default' | 'strong'
type DecryptAnimateOn = 'view' | 'hover' | 'both'
type DecryptRevealDirection = 'start' | 'end' | 'center'
type LegacyVariant = ButtonType | 'quartery'
type ComboKey = `${ButtonVariant}-${ButtonType}`

const props = withDefaults(defineProps<{
  text?: string
  type?: ButtonType
  variant?: ButtonVariant | LegacyVariant
  size?: ButtonSize
  tracking?: ButtonTracking
  weight?: ButtonWeight
  decryptAnimateOn?: DecryptAnimateOn
  decryptRevealDirection?: DecryptRevealDirection
  decryptSpeed?: number
  decryptMaxIterations?: number
  decryptSequential?: boolean
  decryptUseOriginalCharsOnly?: boolean
  disabled?: boolean
}>(), {
  text: '',
  type: 'primary',
  variant: 'default',
  size: 'md',
  tracking: 'relaxed',
  weight: 'default',
  decryptAnimateOn: 'both',
  decryptRevealDirection: 'start',
  decryptSpeed: 50,
  decryptMaxIterations: 10,
  decryptSequential: true,
  decryptUseOriginalCharsOnly: false,
  disabled: false,
})

const {
  text,
  type,
  variant,
  size,
  tracking,
  weight,
  decryptAnimateOn,
  decryptRevealDirection,
  decryptSpeed,
  decryptMaxIterations,
  decryptSequential,
  decryptUseOriginalCharsOnly,
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

const hoverDecryptTick = ref(0)

function triggerPrimaryDecrypt() {
  if (!isPrimaryType.value || disabled.value)
    return

  if (decryptAnimateOn.value === 'hover' || decryptAnimateOn.value === 'both')
    hoverDecryptTick.value += 1
}

const resolvedDecryptAnimateOn = computed<'view' | 'manual'>(() => {
  return decryptAnimateOn.value === 'hover' ? 'manual' : 'view'
})

const decryptTriggerKey = computed(() => `${normalizedVariant.value}-${normalizedType.value}-${labelText.value}-${hoverDecryptTick.value}`)
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    class="group ui-button-base"
    :class="[sizeClass, variantTypeClass, isGhostType ? ghostButtonClass : '']"
    @pointerenter="triggerPrimaryDecrypt"
    @focus="triggerPrimaryDecrypt"
  >
    <DsTypography
      as="span"
      role="meta"
      :size="typographySize"
      :tracking="tracking"
      :weight="typographyWeight"
      :uppercase="true"
      class="ui-button-label"
      :class="[isGhostType ? 'is-ghost-label ui-ghost-label' : '']"
    >
      <template v-if="isPrimaryType && labelText">
        <DsDecryptedText
          :text="labelText"
          :speed="decryptSpeed"
          :max-iterations="decryptMaxIterations"
          :sequential="decryptSequential"
          :reveal-direction="decryptRevealDirection"
          :use-original-chars-only="decryptUseOriginalCharsOnly"
          :animate-on="resolvedDecryptAnimateOn"
          :trigger-key="decryptTriggerKey"
        />
      </template>
      <template v-else>
        <template v-if="labelText">
          {{ labelText }}
        </template>
        <slot v-else />
      </template>
    </DsTypography>
  </button>
</template>
