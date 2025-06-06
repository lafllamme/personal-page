<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    slotClass?: HTMLAttributes['class']
    gradientSize?: number
    gradientColor?: string
    gradientOpacity?: number
    variant?: 'small' | 'default'
  }>(),
  {
    class: '',
    slotClass: '',
    gradientSize: 200,
    gradientColor: '#00000044',
    gradientOpacity: 0.8,
    variant: 'default',
  },
)

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const modeColor = computed(() => {
  // Sand-4 vs Sand-7
  return isDark.value ? '#F1F0EF' : '#CFCECA'
})
const { class: classNames, slotClass, gradientSize, gradientOpacity, variant } = toRefs(props)

const mouseX = ref(-gradientSize.value * 10)
const mouseY = ref(-gradientSize.value * 10)

function handleMouseMove(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}

function handleMouseLeave() {
  mouseX.value = -gradientSize.value * 10
  mouseY.value = -gradientSize.value * 10
}

onMounted(() => {
  mouseX.value = -gradientSize.value * 10
  mouseY.value = -gradientSize.value * 10
})

const backgroundStyle = computed(() => {
  return `radial-gradient(
    circle at ${mouseX.value}px ${mouseY.value}px,
    ${modeColor.value} 0%,
    rgba(0, 0, 0, 0) 70%
  )`
})

const borderRadius = computed(() => {
  switch (variant.value) {
    case 'small':
      return 'rounded-tl-[30px] rounded-tr-[8px] rounded-br-[28px] rounded-bl-[10px]  '
    case 'default':
      return 'rounded-bl-[42px] rounded-br-[38px] rounded-tl-[36px] rounded-tr-[40px]'
    default:
      return ''
  }
})
</script>

<template>
  <div
    :class="[
      classNames,
      borderRadius,
    ]"
    class="group relative size-full flex overflow-hidden"
    @mouseleave="handleMouseLeave"
    @mousemove="handleMouseMove"
  >
    <div :class="useClsx('relative z-10', slotClass)">
      <slot />
    </div>
    <div
      :class="useClsx(
        'pointer-events-none absolute inset-0',
        'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
      )"
      :style="{
        background: backgroundStyle,
        opacity: gradientOpacity,
      }"
    />
  </div>
</template>
