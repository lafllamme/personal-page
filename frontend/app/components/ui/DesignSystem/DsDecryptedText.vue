<script setup lang="ts">
import { useEventListener, useIntersectionObserver } from '@vueuse/core'
import { computed, onBeforeUnmount, ref, watch } from 'vue'

type RevealDirection = 'start' | 'end' | 'center'
type AnimateOn = 'view' | 'hover' | 'both' | 'manual'

const props = withDefaults(defineProps<{
  text: string
  speed?: number
  maxIterations?: number
  sequential?: boolean
  revealDirection?: RevealDirection
  useOriginalCharsOnly?: boolean
  className?: string
  parentClassName?: string
  encryptedClassName?: string
  animateOn?: AnimateOn
  triggerKey?: string | number
}>(), {
  speed: 50,
  maxIterations: 10,
  sequential: false,
  revealDirection: 'start',
  useOriginalCharsOnly: false,
  className: '',
  parentClassName: '',
  encryptedClassName: '',
  animateOn: 'both',
  triggerKey: '',
})

const RANDOM_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const rootRef = ref<HTMLElement | null>(null)
const revealedText = ref(props.text)

let timerId: number | null = null

const safeText = computed(() => props.text ?? '')
const charPool = computed(() => {
  if (!props.useOriginalCharsOnly)
    return RANDOM_CHARS

  const sourceChars = Array.from(new Set(safeText.value.split('').filter((char) => char !== ' '))).join('')
  return sourceChars || RANDOM_CHARS
})

const currentTextClass = computed(() => (revealedText.value === props.text ? props.className : props.encryptedClassName))

function stopAnimation() {
  if (timerId !== null) {
    window.clearInterval(timerId)
    timerId = null
  }
}

function randomChar() {
  const pool = charPool.value
  return pool[Math.floor(Math.random() * pool.length)] ?? 'X'
}

function getSequentialOrder(text: string, direction: RevealDirection) {
  const indices = text
    .split('')
    .map((char, index) => (char === ' ' ? -1 : index))
    .filter((index) => index >= 0)

  if (direction === 'start')
    return indices

  if (direction === 'end')
    return [...indices].reverse()

  const midpoint = (text.length - 1) / 2
  return [...indices].sort((a, b) => Math.abs(a - midpoint) - Math.abs(b - midpoint))
}

function startAnimation() {
  stopAnimation()

  const source = safeText.value
  if (!source)
    return

  if (props.sequential) {
    const order = getSequentialOrder(source, props.revealDirection)
    let revealedCount = 0

    timerId = window.setInterval(() => {
      const revealedSet = new Set(order.slice(0, revealedCount))
      revealedText.value = source
        .split('')
        .map((char, index) => {
          if (char === ' ')
            return ' '
          return revealedSet.has(index) ? char : randomChar()
        })
        .join('')

      revealedCount += 1

      if (revealedCount > order.length) {
        revealedText.value = source
        stopAnimation()
      }
    }, Math.max(16, props.speed))

    return
  }

  let iteration = 0
  timerId = window.setInterval(() => {
    iteration += 1
    const progress = Math.min(iteration / props.maxIterations, 1)

    revealedText.value = source
      .split('')
      .map((char) => {
        if (char === ' ')
          return ' '

        return progress >= 1 ? char : randomChar()
      })
      .join('')

    if (iteration >= props.maxIterations) {
      revealedText.value = source
      stopAnimation()
    }
  }, Math.max(16, props.speed))
}

watch(() => safeText.value, (value) => {
  revealedText.value = value
}, { immediate: true })

watch(() => props.triggerKey, () => {
  startAnimation()
})

useEventListener(rootRef, 'mouseenter', () => {
  if (props.animateOn === 'hover' || props.animateOn === 'both')
    startAnimation()
})

useEventListener(rootRef, 'focusin', () => {
  if (props.animateOn === 'hover' || props.animateOn === 'both')
    startAnimation()
})

useIntersectionObserver(rootRef, ([entry]) => {
  if (props.animateOn !== 'view' && props.animateOn !== 'both')
    return

  if (entry?.isIntersecting)
    startAnimation()
}, { threshold: 0.2 })

watch(() => props.animateOn, () => {
  stopAnimation()
  revealedText.value = safeText.value
})

onBeforeUnmount(() => {
  stopAnimation()
})
</script>

<template>
  <span
    ref="rootRef"
    class="relative inline-block whitespace-nowrap"
    :class="parentClassName"
  >
    <span
      aria-hidden="true"
      class="opacity-0 pointer-events-none select-none"
      :class="className"
    >{{ text }}</span>
    <span
      class="absolute inset-0"
      :class="currentTextClass"
    >{{ revealedText }}</span>
  </span>
</template>
