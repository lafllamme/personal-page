<script setup lang="ts">
import type { OverlayTextProps } from './OverlayText.model'
import { Motion } from 'motion-v'
import { useClsx } from '~/composables/useClsx'
import { OverlayTextDefaultProps } from './OverlayText.model'

const props = withDefaults(defineProps<OverlayTextProps>(), OverlayTextDefaultProps)
const { class: classNames, isExiting, loop, textClass, textLabel, textSizePx } = toRefs(props)

const helloByLocale: Record<string, string> = {
  de: 'Hallo',
  en: 'Hello',
  fr: 'Bonjour',
  ja: 'こんにちは',
  zh: '你好',
  pt: 'Olá',
  es: 'Hola',
  pl: 'Cześć',
  da: 'Hej',
  cs: 'Ahoj',
  nl: 'Hallo',
  el: 'Γεια',
  tr: 'Merhaba',
  ko: '안녕하세요',
  uk: 'Привіт',
  ar: 'مرحبا',
  he: 'שלום',
}
const baseWords = Object.values(helloByLocale)
const maxWordCount = 8
const words = ref<string[]>([])

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

function shuffleWords(list: string[]) {
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = list[i]
    list[i] = list[j]
    list[j] = tmp
  }
  return list
}

function buildWordSet() {
  words.value = shuffleWords([...baseWords]).slice(0, maxWordCount)
  index.value = 0
}

function scheduleNextWord() {
  const isLast = index.value >= words.value.length - 1
  if (isLast) {
    if (!loop.value)
      return
    if (wordTimeout)
      clearTimeout(wordTimeout)
    wordTimeout = setTimeout(() => {
      buildWordSet()
    }, 1000)
    return
  }
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
  buildWordSet()
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
      'fixed inset-0 z-[9999] flex h-100vh w-100vw items-center justify-center bg-teal-8',
      classNames,
    )"
    :initial="{ y: 0 }"
    :animate="isExiting ? { y: '-100vh' } : { y: 0 }"
    :transition="slideTransition"
  >
    <template v-if="dimension.width > 0">
      <div
        v-if="textLabel"
        class="absolute left-6 top-6 z-[2] border border-pureBlack/20 rounded-full bg-pureWhite/70 px-3 py-1 text-[10px] color-pureBlack tracking-[0.2em] uppercase backdrop-blur dark:border-pureWhite/20 dark:bg-pureBlack/60 dark:color-pureWhite"
      >
        {{ textLabel }}
      </div>
      <Motion
        as="p"
        :class="useClsx(
          'absolute z-[1] flex items-center md:text-[42px] lg:text-[62px] color-pureBlack font-clash-regular text-[32px] dark:color-pureWhite',
          textClass,
        )"
        :style="textSizePx ? { fontSize: `${textSizePx}px` } : undefined"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 0.75 }"
        :transition="{ duration: 1, delay: 0.2 }"
      >
        <Motion
          as="svg"
          class="mr-[10px] block size-[24px] overflow-visible lg:size-[32px] md:size-[28px]"
          viewBox="0 0 256 256"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          :animate="{ rotate: 360 }"
          :transition="{ duration: 3, repeat: Infinity, ease: 'linear' }"
        >
          <defs>
            <pattern
              id="overlay-spinner-texture"
              patternUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <image
                href="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=1932&auto=format&fit=crop"
                width="256"
                height="256"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>
          <path
            d="M 152 70.059 L 201.539 20.519 L 235.48 54.461 L 185.941 104 L 256 104 L 256 152 L 185.941 152 L 235.48 201.539 L 201.539 235.48 L 152 185.941 L 152 256 L 104 256 L 104 185.941 L 54.46 235.48 L 20.52 201.539 L 70.059 152 L 0 152 L 0 104 L 70.059 104 L 20.519 54.46 L 54.461 20.52 L 104 70.059 L 104 0 L 152 0 Z"
            fill="url(#overlay-spinner-texture)"
          />
        </Motion>
        {{ words[index] }}
      </Motion>
      <svg class="absolute top-0 h-[calc(100%+300px)] w-full max-[450px]:bottom-0 max-[450px]:h-[0%]">
        <Motion
          as="path"
          class="fill-teal-8"
          :initial="{ d: initialPath }"
          :animate="{ d: isExiting ? targetPath : initialPath }"
          :transition="pathTransition"
        />
      </svg>
    </template>
  </Motion>
</template>
