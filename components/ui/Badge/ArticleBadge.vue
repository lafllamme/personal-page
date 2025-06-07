<script lang="ts" setup>
import type { ArticleBadgeProps } from './ArticleBadge.model'
import { ArticleBadgePropsDefaults } from './ArticleBadge.model'

const props = withDefaults(defineProps<ArticleBadgeProps>(), ArticleBadgePropsDefaults)

const { title, variant, align, radiusType, size } = toRefs(props)

const variantClasses = {
  secondary: {
    root: 'border-purple-8 bg-purple-2',
    icon: 'color-purple-9A',
    iconName: 'lucide:sparkles',
    text: 'color-purple-11',
  },
  primary: {
    root: 'border-mint-7 bg-mint-2',
    icon: 'color-mint-9',
    iconName: 'ri:sparkling-2-line',
    text: 'color-mint-12',
  },
  default: {
    root: 'border-gray-8 bg-gray-2',
    icon: 'color-gray-9',
    iconName: 'ri:sparkling-2-line',
    text: 'color-gray-11',
  },
  tertiary: {
    root: 'border-amber-8 bg-amber-2',
    icon: 'color-amber-9',
    iconName: 'ri:flashlight-line',
    text: 'color-amber-11',
  },
}

const iconClasses = computed(() => variantClasses[variant.value].icon)
const iconName = computed(() => variantClasses[variant.value].iconName)
const rootClasses = computed(() => variantClasses[variant.value].root)
const textClasses = computed(() => variantClasses[variant.value].text)
</script>

<template>
  <div
    :class="useClsx(
      rootClasses,
      'px-3 py-1 space-x-1',
      'mb-1 w-fit inline-flex items-center',
      radiusType === 'half' && 'rounded-tl-none rounded-bl-none',
      'border rounded-full border-solid transition-transform duration-200 ease-out group-hover:scale-105 group-hover:saturate-150',
    )"
  >
    <Icon
      :class="useClsx(
        iconClasses,
        'size-4 group-hover:rotate-12',
      )"
      :name="iconName"
    />
    <p
      :class="useClsx(
        textClasses,
        'font-medium',
        size === 'large' ? 'text-base' : 'text-xs',
      )"
    >
      {{ title }}
    </p>
  </div>
</template>

<style scoped>

</style>
