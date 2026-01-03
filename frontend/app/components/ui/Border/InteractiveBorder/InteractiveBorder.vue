<script lang="ts" setup>
import type { InteractiveBorderProps } from './InteractiveBorder.model'
import { animate } from 'motion-v'
import { InteractiveBorderDefaultProps } from './InteractiveBorder.model'

const props = withDefaults(defineProps<InteractiveBorderProps>(), InteractiveBorderDefaultProps)
const {
  class: classNames,
  blur,
  spread,
  borderWidth,
  glow,
  disabled,
  variant,
  movementDuration,
  proximity,
  inactiveZone,
} = toRefs(props)
const containerRef = templateRef('containerRef')
const lastPosition = ref({
  x: 0,
  y: 0,
})
const animationFrame = ref(0)
const colorMode = useColorModeSync()
const isDark = computed(() => colorMode.value.preference === 'dark')

const containerStyles = computed(() => {
  return {
    '--blur': `${blur.value}px`,
    '--spread': spread.value,
    '--start': '0',
    '--active': '0',
    '--glowingeffect-border-width': `${borderWidth.value}px`,
    '--repeating-conic-gradient-times': '5',
    '--gradient':
        variant.value === 'white'
          ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  var(--black),
                  var(--black) calc(25% / var(--repeating-conic-gradient-times))
                )`
          : isDark.value
            ? `/* soft aqua burst */
          radial-gradient(circle, #75dddd 10%, #75dddd00 20%),
          /* light teal shimmer */
          radial-gradient(circle at 30% 30%, #84c7d0 8%, #84c7d000 18%),
          /* muted periwinkle glow */
          radial-gradient(circle at 70% 40%, #9297c4 10%, #9297c400 20%),
          /* lilac haze */
          radial-gradient(circle at 40% 70%, #9368b7 10%, #9368b700 20%),
          /* rosy orchid highlight */
          radial-gradient(circle at 70% 75%, #aa3e98 10%, #aa3e9800 20%),
          /* unifying conic weave */
          repeating-conic-gradient(
            from 230deg at 50% 50%,
            #75dddd 0%,
            #84c7d0 calc(20% / var(--repeating-conic-gradient-times)),
            #9297c4 calc(40% / var(--repeating-conic-gradient-times)),
            #9368b7 calc(60% / var(--repeating-conic-gradient-times)),
            #aa3e98 calc(80% / var(--repeating-conic-gradient-times)),
            #75dddd calc(100% / var(--repeating-conic-gradient-times))
          )`
            : `radial-gradient(circle, #4FB0B0 10%, #4FB0B000 20%),
               radial-gradient(circle at 30% 30%, #618A9A 8%, #618A9A00 18%),
               radial-gradient(circle at 70% 40%, #6E6A8D 10%, #6E6A8D00 20%),
               radial-gradient(circle at 40% 70%, #6B3C83 10%, #6B3C8300 20%),
               radial-gradient(circle at 70% 75%, #7A2672 10%, #7A267200 20%),
               repeating-conic-gradient(
                 from 230deg at 50% 50%,
                 #4FB0B0 0%,
                 #618A9A calc(20% / var(--repeating-conic-gradient-times)),
                 #6E6A8D calc(40% / var(--repeating-conic-gradient-times)),
                   #6B3C83 calc(60% / var(--repeating-conic-gradient-times)),
                   #7A2672 calc(80% / var(--repeating-conic-gradient-times)),
                   #4FB0B0 calc(100% / var(--repeating-conic-gradient-times))
                 )`,
  }
})

useEventListener(window, 'scroll', handleScroll, { passive: true })
useEventListener(document, 'pointermove', handlePointerMove, { passive: true })

onUnmounted(() => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }
})

function handlePointerMove(e: PointerEvent) {
  handleMove(e)
}

function handleScroll() {
  handleMove()
}

function handleMove(e?: MouseEvent | PointerEvent | { x: number, y: number }) {
  if (!containerRef.value)
    return

  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }

  animationFrame.value = requestAnimationFrame(() => {
    const element = containerRef.value

    if (!element)
      return

    const { left, top, width, height } = element.getBoundingClientRect()

    const mouseX = e?.x ?? lastPosition.value.x
    const mouseY = e?.y ?? lastPosition.value.y

    if (e) {
      lastPosition.value = { x: mouseX, y: mouseY }
    }

    const center = [left + width * 0.5, top + height * 0.5]
    const distanceFromCenter = Math.hypot(mouseX - center[0]!, mouseY - center[1]!)
    const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone.value

    if (distanceFromCenter < inactiveRadius) {
      element.style.setProperty('--active', '0')
      return
    }

    const isActive
      = mouseX > left - proximity.value
        && mouseX < left + width + proximity.value
        && mouseY > top - proximity.value
        && mouseY < top + height + proximity.value

    element.style.setProperty('--active', isActive ? '1' : '0')

    if (!isActive)
      return

    const currentAngle = Number.parseFloat(element.style.getPropertyValue('--start')) || 0
    const targetAngle = (180 * Math.atan2(mouseY - center[1]!, mouseX - center[0]!)) / Math.PI + 90

    const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180
    const newAngle = currentAngle + angleDiff

    animate(currentAngle, newAngle, {
      duration: movementDuration.value,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        element.style.setProperty('--start', String(value))
      },
    })
  })
}
</script>

<template>
  <div
    :class="
      useClsx(
        'pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity',
        glow && 'opacity-100',
        variant === 'white' && 'border-white',
        disabled && '!block',
      )
    "
  />
  <div
    ref="containerRef"
    :class="
      useClsx(
        'pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity',
        glow && 'opacity-100',
        blur > 0 && 'blur-[var(--blur)]',
        classNames,
        disabled && '!hidden',
      )
    "
    :style="containerStyles"
  >
    <div
      :class="
        useClsx(
          'glow',
          'rounded-[inherit]',
          `after:content-[''] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]`,
          'after:[border:var(--glowingeffect-border-width)_solid_transparent]',
          'after:[background:var(--gradient)] after:[background-attachment:fixed]',
          'after:opacity-[var(--active)] after:transition-opacity after:duration-300',
          'after:[mask-clip:padding-box,border-box]',
          'after:[mask-composite:intersect]',
          'after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]',
        )
      "
    />
  </div>
</template>
