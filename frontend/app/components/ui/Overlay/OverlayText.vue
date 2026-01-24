<script setup lang="ts">
import type { OverlayTextProps } from './OverlayText.model'
import { Motion } from 'motion-v'
import { OverlayTextDefaultProps } from './OverlayText.model'
import { useClsx } from '~/composables/useClsx'

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
let exitTimeout: ReturnType<typeof setTimeout> | null = null

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
    :class="useClsx('introduction', classNames)"
    :initial="{ y: 0 }"
    :animate="isExiting ? { y: '-100vh' } : { y: 0 }"
    :transition="slideTransition"
  >
    <template v-if="dimension.width > 0">
      <Motion
        as="p"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 0.75 }"
        :transition="{ duration: 1, delay: 0.2 }"
      >
        <span />
        {{ words[index] }}
      </Motion>
      <svg>
        <Motion
          as="path"
          :initial="{ d: initialPath }"
          :animate="{ d: isExiting ? targetPath : initialPath }"
          :transition="pathTransition"
        />
      </svg>
    </template>
  </Motion>
</template>

<style scoped>
.introduction {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 9999;
  background-color: #b1d134;
}

.introduction svg {
  position: absolute;
  top: 0;
  width: 100%;
  height: calc(100% + 300px);
}

.introduction svg path {
  fill: #b1d134;
}

.introduction p {
  display: flex;
  color: rgb(0, 0, 0);
  font-size: 42px;
  align-items: center;
  position: absolute;
  z-index: 1;
}

.introduction p span {
  display: block;
  width: 10px;
  height: 10px;
  background-color: rgb(0, 0, 0);
  border-radius: 50%;
  margin-right: 10px;
}

@media screen and (max-width: 450px) {
  .introduction p {
    font-size: 26px;
  }

  .introduction svg {
    bottom: 0;
    height: calc(0%);
  }
}
</style>
