<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { Motion } from 'motion-v'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    text: string
    duration?: number
    animateOnLoad: boolean
  }>(),
  {
    duration: 800,
  },
)

const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const displayText = ref<string[]>(props.text.split(''))
const iterations = ref(0)

function getRandomLetter(): string {
  const idx = Math.floor(Math.random() * alphabets.length)
  return alphabets.charAt(idx)
}

function triggerAnimation() {
  iterations.value = 0
  startAnimation()
}

const { pause, resume } = useIntervalFn(
  () => {
    if (iterations.value < props.text.length) {
      const chars = [...props.text]
      displayText.value = chars.map((ch, i): string => {
        if (ch === ' ')
          return ' '
        return i <= iterations.value ? ch : getRandomLetter()
      })
      iterations.value += 0.1
    }
    else {
      pause()
    }
  },
  computed(() => props.duration / (props.text.length * 10)),
)

function startAnimation() {
  pause()
  resume()
}

watch(
  () => props.text,
  (newText) => {
    displayText.value = newText.split('')
    triggerAnimation()
  },
)

if (props.animateOnLoad) {
  triggerAnimation()
}
</script>

<template>
  <div
    :class="useClsx('flex scale-100 cursor-default overflow-hidden py-2', $props.class)"
    @mouseenter="triggerAnimation"
  >
    <div class="flex">
      <Motion
        v-for="(letter, i) in displayText"
        :key="i"
        :animate="{ opacity: 1, y: 0 }"
        :class="useClsx(letter === ' ' ? 'w-3' : '', $props.class)"
        :delay="i * (duration / (text.length * 10))"
        :initial="{ opacity: 0, y: -10 }"
        as="span"
        class="inline-block"
      >
        {{ letter.toUpperCase() }}
      </Motion>
    </div>
  </div>
</template>
