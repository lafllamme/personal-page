<script setup lang="ts">
import type { OverlayTextProps } from './OverlayText.model'
import { Motion } from 'motion-v'
import { useClsx } from '~/composables/useClsx'
import { OverlayTextDefaultProps } from './OverlayText.model'

const props = withDefaults(defineProps<OverlayTextProps>(), OverlayTextDefaultProps)
const { class: classNames, isExiting } = toRefs(props)

const words = [
  'Hello',
  'Bonjour',
  'Ciao',
  'Olà',
  'やあ',
  'Hallå',
  'Guten tag',
  'Hallo',
]

const index = ref(0)
const dimension = ref({ width: 0, height: 0 })
const exitSlideDurationMs = 800
const exitSlideDelayMs = 200
const exitPathDurationMs = 700
const exitPathDelayMs = 300

const slideTransition = computed(() => ({
  duration: exitSlideDurationMs / 1000,
  ease: [0.76, 0, 0.24, 1],
  delay: isExiting.value ? exitSlideDelayMs / 1000 : 0,
}))

const pathTransition = computed(() => {
  if (!isExiting.value) {
    return { duration: 0 }
  }
  return {
    duration: exitPathDurationMs / 1000,
    ease: [0.76, 0, 0.24, 1],
    delay: exitPathDelayMs / 1000,
  }
})
let wordTimeout: ReturnType<typeof setTimeout> | null = null
const exitTimeout: ReturnType<typeof setTimeout> | null = null

const initialPath = computed(() => {
  if (!dimension.value.width || !dimension.value.height)
    return ''
  return `M0 0 L${dimension.value.width} 0 L${dimension.value.width} ${dimension.value.height} Q${dimension.value.width / 2} ${dimension.value.height + 300} 0 ${dimension.value.height}  L0 0`
})

const targetPath = computed(() => {
  if (!dimension.value.width || !dimension.value.height)
    return ''
  return `M0 0 L${dimension.value.width} 0 L${dimension.value.width} ${dimension.value.height} Q${dimension.value.width / 2} ${dimension.value.height} 0 ${dimension.value.height}  L0 0`
})

function scheduleNextWord() {
  if (index.value >= words.length - 1)
    return
  const delay = index.value === 0 ? 1000 : 150
  if (wordTimeout)
    clearTimeout(wordTimeout)
  wordTimeout = setTimeout(() => {
    index.value += 1
  }, delay)
}

watch(index, () => {
  scheduleNextWord()
})

onMounted(() => {
  if (!import.meta.client)
    return
  dimension.value = { width: window.innerWidth, height: window.innerHeight }
  scheduleNextWord()
})

onBeforeUnmount(() => {
  if (wordTimeout)
    clearTimeout(wordTimeout)
  if (exitTimeout)
    clearTimeout(exitTimeout)
})
</script>

<template>
  <Motion
    as="div"
    :class="useClsx(
      'fixed inset-0 z-[9999] flex h-100vh w-100vw items-center justify-center bg-teal-9',
      classNames,
    )"
    :initial="{ y: 0 }"
    :animate="isExiting ? { y: '-100vh' } : { y: 0 }"
    :transition="slideTransition"
  >
    <template v-if="dimension.width > 0">
      <Motion
        as="p"
        class="absolute z-[1] flex items-center text-[42px] color-pureBlack max-[450px]:text-[26px]"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 0.75 }"
        :transition="{ duration: 1, delay: 0.2 }"
      >
        <span class="mr-[10px] block h-[10px] w-[10px] rounded-full bg-pureBlack" />
        {{ words[index] }}
      </Motion>
      <svg class="absolute top-0 h-[calc(100%+300px)] w-full max-[450px]:bottom-0 max-[450px]:h-[0%]">
        <Motion
          as="path"
          class="fill-teal-9"
          :initial="{ d: initialPath }"
          :animate="{ d: isExiting ? targetPath : initialPath }"
          :transition="pathTransition"
        />
      </svg>
    </template>
  </Motion>
</template>
