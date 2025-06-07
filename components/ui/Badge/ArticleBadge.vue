<script lang="ts" setup>
import type { ArticleBadgeProps } from './ArticleBadge.model'
import { ArticleBadgePropsDefaults } from './ArticleBadge.model'

const props = withDefaults(defineProps<ArticleBadgeProps>(), ArticleBadgePropsDefaults)

const { title, variant, align, radiusType, size } = toRefs(props)

const variantClasses = {
  secondary: {
    root: 'transition-transform duration-200 ease-out border-purple-8 bg-purple-2 group-hover:scale-105 group-hover:saturate-150',
    icon: 'color-purple-9A group-hover:rotate-12',
    iconName: 'lucide:sparkles',
    text: 'color-purple-11',
  },
  primary: {
    root: 'transition-transform duration-200 linear border-teal-9 bg-teal-9 group-hover:scale-105 group-hover:saturate-150',
    icon: 'color-mint-1 dark:color-pureBlack',
    iconName: 'ri:arrow-right-up-line',
    text: 'color-mint-1 dark:color-pureBlack',
  },
  default: {
    root: 'transition-transform duration-200 ease-out border-gray-8 bg-gray-2 group-hover:scale-105 group-hover:saturate-150',
    icon: 'color-gray-9 group-hover:rotate-12',
    iconName: 'ri:sparkling-2-line',
    text: 'color-gray-11',
  },
  tertiary: {
    root: 'transition-transform duration-200 ease-out border-amber-8 bg-amber-2 group-hover:scale-105 group-hover:saturate-150',
    icon: 'color-amber-9 group-hover:rotate-12',
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
      size === 'large' ? 'px-4 py-2' : 'px-3 py-1 space-x-1',
      size === 'large' ? 'space-x-2' : '',
      'mb-1 w-fit flex items-center',
      radiusType === 'half' && 'rounded-tl-none rounded-bl-none',
      'border rounded-full border-solid',
    )"
  >
    <Icon
      v-if="align === 'left'"
      :class="useClsx(
        iconClasses,
        'size-4',
        size === 'large' ? 'size-6' : '',
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
    <Icon
      v-if="align === 'right'"
      :class="useClsx(
        iconClasses,
        'size-4',
        size === 'large' ? 'size-6' : '',
      )"
      :name="iconName"
    />
  </div>
</template>

<style scoped>

</style>
