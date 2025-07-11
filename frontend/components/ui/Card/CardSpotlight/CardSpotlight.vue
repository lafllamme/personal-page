<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

/* ------------------------------------------------------------------ props */
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    slotClass?: HTMLAttributes['class']
    gradientSize?: number
    gradientOpacity?: number
    variant?: 'small' | 'default'
  }>(),
  {
    class: '',
    slotClass: '',
    gradientSize: 200,
    gradientOpacity: 0.8,
    variant: 'default',
  },
)

/* ----------------------------------------------------------- reactive bits */
const { class: classNames, slotClass, gradientSize, gradientOpacity, variant }
    = toRefs(props)

const mouseX = ref(-gradientSize.value * 10)
const mouseY = ref(-gradientSize.value * 10)

function handleMouseMove(e: MouseEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}

function handleMouseLeave() {
  mouseX.value = -gradientSize.value * 10
  mouseY.value = -gradientSize.value * 10
}

/* ----------------------------- inline style (identical SSR & client) ---- */
const backgroundStyle = computed(
  () => `radial-gradient(
    circle at ${mouseX.value}px ${mouseY.value}px,
    var(--spotlight-color) 0%,
    transparent 70%
  )`,
)

/* --------------------------------------------------------------- misc UI */
const borderRadius = computed(() =>
  variant.value === 'small'
    ? 'rounded-tl-[30px] rounded-tr-[8px] rounded-br-[28px] rounded-bl-[10px]'
    : 'rounded-bl-[42px] rounded-br-[38px] rounded-tl-[36px] rounded-tr-[40px]',
)
</script>

<template>
  <div
    :class="[classNames, borderRadius]"
    class="group relative size-full flex overflow-hidden"
    @mouseleave="handleMouseLeave"
    @mousemove="handleMouseMove"
  >
    <div :class="useClsx('relative z-10', slotClass)">
      <slot />
    </div>

    <!-- overlay -->
    <div
      :class="useClsx(
        'pointer-events-none absolute inset-0',
        'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
      )"
      :style="{ background: backgroundStyle, opacity: gradientOpacity }"
    />
  </div>
</template>

<style>
/* light mode (default) */
:root {
  --spotlight-color: #f2fbf9; /* Sand-4 */
}

/* dark mode (added by @nuxtjs/color-mode *before* hydration) */
.dark {
  --spotlight-color: #31312e; /* Sand-7 */
}
</style>
