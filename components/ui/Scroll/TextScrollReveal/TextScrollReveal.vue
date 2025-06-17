<script lang="ts" setup>
import type { TextScrollRevealProps } from './TextScrollReveal.model'
import ScrollWord from '@/components/ui/Scroll/ScrollWord/ScrollWord.vue'
import { TextScrollRevealPropsDefaults } from './TextScrollReveal.model'

const props = withDefaults(defineProps<TextScrollRevealProps>(), TextScrollRevealPropsDefaults)
const { height } = useWindowSize()
const { class: classNames, text } = toRefs(props)
const textScrollRevealRef = useTemplateRef('textScrollRevealRef')

const words = computed(() => text.value.split(' '))
const scrollYProgress = ref(0)

/**
 * @description 0 (element top enters viewport) -> 1 (element bottom leaves viewport)
 */
function updateScrollYProgress() {
  if (!textScrollRevealRef.value)
    return

  const el = textScrollRevealRef.value
  const rect = el.getBoundingClientRect()
  const totalScroll = rect.height - height.value
  let progress = 1 - (rect.bottom - height.value) / totalScroll

  progress = Math.max(0, Math.min(1, progress))
  scrollYProgress.value = progress
}

useEventListener('scroll', updateScrollYProgress)
useEventListener('resize', updateScrollYProgress)
</script>

<template>
  <div
    ref="textScrollRevealRef"
    :class="useClsx(
      'relative z-0 h-[200vh]',
      classNames,
    )"
  >
    <div class="sticky top-0 h-screen max-w-4xl flex items-center bg-transparent px-4 py-20">
      <p
        :class="useClsx(
          'color-pureBlack/20 dark:color-pureWhite/20',
          'flex flex-wrap p-5 text-2xl',
          'font-bold lg:p-10 md:p-8 lg:text-4xl md:text-3xl xl:text-5xl',
        )"
      >
        <ScrollWord
          v-for="(word, i) in words"
          :key="i"
          :progress="scrollYProgress"
          :range="[i / words.length, (i + 1) / words.length]"
          :word="word"
        />
      </p>
    </div>
  </div>
</template>
