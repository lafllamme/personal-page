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
      'relative z-0 h-[300vh]',
      classNames,
    )"
  >
    <div class="max-w-8xl sticky top-0 flex items-center bg-transparent py-12 h-svh md:py-20">
      <p
        :class="useClsx(
          'color-mint-12A',
          'flex flex-wrap antialiased',
          'font-semibold leading-tight tracking-normal bruno-ace-sc-regular text-pretty text-[clamp(3rem,10vw,7rem)]',
        )"
      >
        <ScrollWord
          v-for="(word, i) in words"
          :key="i"
          :class="(i === 4 && scrollYProgress > 0.5) && 'neon-glow color-purple-10'"
          :progress="scrollYProgress"
          :range="[i / words.length, (i + 1) / words.length]"
          :word="word"
        />
      </p>
    </div>
  </div>
</template>

<style>
@keyframes glow-pulse-purple {
  from {
    text-shadow:
      0 0 16px rgba(167, 139, 250, 0.64),
      /* slightly more blur, more alpha */ 0 0 32px rgba(139, 92, 246, 0.42),
      0 0 40px rgba(232, 121, 249, 0.18);
  }
  to {
    text-shadow:
      0 0 22px rgba(167, 139, 250, 0.82),
      0 0 40px rgba(139, 92, 246, 0.56),
      0 0 52px rgba(232, 121, 249, 0.32);
  }
}

.neon-glow {
  animation: glow-pulse-purple 2s ease-in-out infinite alternate;
  text-shadow:
    0 0 16px rgba(167, 139, 250, 0.64),
    0 0 32px rgba(139, 92, 246, 0.42),
    0 0 40px rgba(232, 121, 249, 0.18);
}
</style>
