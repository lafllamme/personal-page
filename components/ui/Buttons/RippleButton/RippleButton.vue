<script lang="ts" setup>
import { computed } from 'vue'

interface RippleButtonProps {
  class?: string
  rippleColor?: string
  duration?: number
  text?: string
}

const props = withDefaults(defineProps<RippleButtonProps>(), {
  rippleColor: '#4CBBA5',
  duration: 600,
  text: 'Button',
})
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const rippleHex = computed(() => isDark.value ? '#58D5BA' : '#4CBBA5')
const { class: classNames, text, rippleColor, duration } = toRefs(props)

const rippleButtonRef = useTemplateRef('rippleButtonRef')
const buttonRipples = ref<Array<{ x: number, y: number, size: number, key: number }>>([])

function handleClick(event: MouseEvent) {
  createRipple(event)
  emit('click', event)
}

function createRipple(event: MouseEvent) {
  const button = rippleButtonRef.value
  if (!button)
    return

  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  const newRipple = { x, y, size, key: Date.now() }
  buttonRipples.value.push(newRipple)
}

watchEffect(() => {
  if (buttonRipples.value.length > 0) {
    const lastRipple = buttonRipples.value[buttonRipples.value.length - 1]
    setTimeout(() => {
      buttonRipples.value = buttonRipples.value.filter(ripple => ripple.key !== lastRipple.key)
    }, props.duration)
  }
})
</script>

<template>
  <button
    ref="rippleButtonRef"
    :class="
      useClsx(
        'hover:bg-gray-3A hover:border-gray-8A touch-manipulation',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pureBlack dark:focus-visible:ring-pureWhite',
        'dark:hover:shadow-[0_0_14px_rgba(255,255,255,0.5)] hover:shadow-[0_0_14px_rgba(0,0,0,0.5)]',
        'bg-pureWhite dark:bg-pureBlack p-2 px-6 text-center text-primary',
        'relative flex cursor-pointer items-center justify-center',
        'rounded-full border border-gray-10',
        'transition-[color,background-color,border-color,opacity,transform,box-shadow,height,width]',
        'font-semibold overflow-hidden',
        classNames,
      )

    "
    :style="{
      '--duration': `${duration}ms`,
      'transitionProperty': 'color,background-color,border-color,opacity,transform,box-shadow,height,width',
      'transitionDuration': '600ms,600ms,600ms,300ms,300ms,300ms,300ms',
      'transitionTimingFunction': 'cubic-bezier(0.33,1,0.68,1),cubic-bezier(0.33,1,0.68,1),cubic-bezier(0.33,1,0.68,1),ease-out,ease-out,ease-out,ease-out,ease-out',
    }"
    tabindex="0"
    type="button"
    @click="handleClick"
  >
    <div class="relative z-10 color-pureBlack dark:color-pureWhite">
      {{ text }}
    </div>

    <span class="pointer-events-none absolute inset-0">
      <span
        v-for="ripple in buttonRipples"
        :key="ripple.key"
        :style="{
          width: `${ripple.size}px`,
          height: `${ripple.size}px`,
          top: `${ripple.y}px`,
          left: `${ripple.x}px`,
          backgroundColor: rippleHex ? rippleHex : rippleColor,
          transform: 'scale(0)',
          animationDuration: `${duration}ms`,
        }"
        class="ripple-animation absolute rounded-full bg-transparent opacity-30"
      />
    </span>
  </button>
</template>

<style scoped>
@keyframes rippling {
  0% {
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.ripple-animation {
  animation: rippling var(--duration) ease-out;
}
</style>
