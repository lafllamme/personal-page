<script lang="ts" setup>
import type { InteractiveCardProps } from './InteractiveCard.model'
import InteractiveBorder from '@/components/ui/Border/InteractiveBorder/InteractiveBorder.vue'
import { InteractiveCardDefaultProps } from './InteractiveCard.model'

const props = withDefaults(defineProps<InteractiveCardProps>(), InteractiveCardDefaultProps)

const { containerClass, contentClass } = toRefs(props)

consola.debug(containerClass, contentClass)
</script>

<template>
  <div
    :class="useClsx(
      'border border-gray-6 border-solid',
      'rounded-2.5xl md:rounded-3xl',
      'relative h-full',
      'md:p-3 p-2',
    )"
  >
    <InteractiveBorder
      :disabled="false"
      :glow="true"
      :inactive-zone="0.01"
      :proximity="64"
      :spread="40"
    />
    <div
      :class="useClsx(
        'dark:shadow-[0px_0px_27px_0px_#2D2D2D]',
        'bg-pureWhite dark:bg-pureBlack',
        'overflow-hidden border-0.75',
        'rounded-xl p-6 md:p-6',
      )"
    >
      <slot name="default" />
    </div>
  </div>
</template>
