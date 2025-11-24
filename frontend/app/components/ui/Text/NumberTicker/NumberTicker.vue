<script setup lang="ts">
import { TransitionPresets, useElementVisibility, useTransition } from '@vueuse/core'

type TransitionsPresetsKeys = keyof typeof TransitionPresets

interface NumberTickerProps {
  value?: number
  direction?: 'up' | 'down'
  duration?: number
  delay?: number
  decimalPlaces?: number
  class?: string
  transition?: TransitionsPresetsKeys
}

const props = withDefaults(defineProps<NumberTickerProps>(), {
  value: 0,
  direction: 'up',
  delay: 0,
  duration: 1000,
  decimalPlaces: 2,
  transition: 'easeOutCubic',
})

const { value: numberValue, direction, duration, delay, decimalPlaces, class: customClass, transition } = toRefs(props)

const spanRef = ref<HTMLSpanElement>()

const transitionValue = ref(props.direction === 'down' ? props.value : 0)

const transitionOutput = useTransition(transitionValue, {
  delay: delay.value,
  duration: duration.value,
  transition: TransitionPresets[transition.value as TransitionsPresetsKeys],
})

const output = computed(() => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimalPlaces.value,
    maximumFractionDigits: decimalPlaces.value,
  }).format(Number(transitionOutput.value.toFixed(decimalPlaces.value)))
})

const isInView = useElementVisibility(spanRef, {
  threshold: 0,
})

const hasBeenInView = ref(false)

const stopIsInViewWatcher = watch(
  isInView,
  (isVisible) => {
    if (isVisible && !hasBeenInView.value) {
      hasBeenInView.value = true
      transitionValue.value = direction.value === 'down' ? 0 : numberValue.value
      stopIsInViewWatcher()
    }
  },
  { immediate: true },
)

watch(
  () => props.value,
  (newVal) => {
    if (hasBeenInView.value) {
      transitionValue.value = direction.value === 'down' ? 0 : newVal
    }
  },
)
</script>

<template>
  <span
    ref="spanRef"
    :class="useClsx(
      'inline-block tabular-nums tracking-wider',
      customClass,
    )"
  >
    {{ output }}
  </span>
</template>
