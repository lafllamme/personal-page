<script lang="ts" setup>
import type { InteractiveCardProps } from './InteractiveCard.model'
import InteractiveBorder from '@/components/ui/Border/InteractiveBorder/InteractiveBorder.vue'
import { InteractiveCardDefaultProps } from './InteractiveCard.model'

withDefaults(defineProps<InteractiveCardProps>(), InteractiveCardDefaultProps)
</script>

<template>
  <div
    :class="useClsx(
      'border border-gray-6 border-solid',
      'rounded-bl-[42px] rounded-br-[38px] rounded-tl-[36px] rounded-tr-[40px]',
      'relative h-full shadow-2xl shadow-gray-6A',
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
        'overflow-hidden border-0.75',
        'rounded-bl-[42px] rounded-br-[38px] rounded-tl-[36px] rounded-tr-[40px]',
      )"
    >
      <slot name="default" />
    </div>
  </div>
</template>
