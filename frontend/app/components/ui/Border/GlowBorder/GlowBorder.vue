<script lang="ts" setup>
import type { GlowBorderProps } from './GlowBorder.model'
import { GlowBorderDefaultProps } from './GlowBorder.model'

const props = withDefaults(
  defineProps<GlowBorderProps>(),
  GlowBorderDefaultProps,
)

const { borderRadius, borderWidth, duration, color, class: classNames } = toRefs(props)
const isVisible = ref(false)
const glowBorderRef = useTemplateRef('glowBorderRef')
const isCurrentlyVisible = useVisibilityObserver(glowBorderRef, isVisible, 30, true)

const parentStyles = computed(() => (
  isCurrentlyVisible?.value ? { '--border-width': `${borderWidth.value}px` } : {}
))

const childStyles = computed(() => (
  isCurrentlyVisible?.value
    ? {
        '--border-width': `${borderWidth.value}px`,
        '--border-radius': `${borderRadius.value}px`,
        '--glow-pulse-duration': `${duration.value}s`,
        '--mask-linear-gradient': `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        '--background-radial-gradient': `radial-gradient(circle, transparent, ${
          Array.isArray(color.value) ? color.value.join(',') : color.value
        }, transparent)`,
      }
    : {}
))

const borderAnimation = computed(() => isCurrentlyVisible?.value ? 'glow-border' : '')
</script>

<template>
  <div
    ref="glowBorderRef"
    :class="
      useClsx(
        'relative grid min-h-[60px] h-full min-w-[300px] place-items-center',
        'rounded-bl-[42px] rounded-br-[38px] rounded-tl-[36px] rounded-tr-[40px]',
        classNames,
        borderAnimation,
      )
    "
    :style="parentStyles"
  >
    <div
      :class="
        useClsx(
          borderAnimation,
          'before:rounded-bl-[42px] before:rounded-br-[38px] before:rounded-tl-[36px] before:rounded-tr-[40px]',
          'before:absolute before:inset-0 before:aspect-square before:size-full before:bg-[length:300%_300%]',
          `before:p-[--border-width] before:opacity-50 before:will-change-[background-position] before:content-['']`,
          'before:![-webkit-mask-composite:xor] before:![mask-composite:exclude] before:[mask:--mask-linear-gradient] pointer-events-none',
        )
      "
      :style="childStyles"
    />
    <slot />
  </div>
</template>

<style scoped>
.glow-border::before {
  animation: glow-pulse var(--glow-pulse-duration) infinite linear;
  background-image: var(--background-radial-gradient);
}

@keyframes glow-pulse {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
