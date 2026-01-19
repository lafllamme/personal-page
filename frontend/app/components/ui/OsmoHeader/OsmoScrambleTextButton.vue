<script setup lang="ts">
const props = defineProps<{ text: string, class?: string }>()

const displayText = ref(props.text)
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let scrambleTimer: ReturnType<typeof setInterval> | null = null

function clearScrambleTimer() {
  if (scrambleTimer) {
    clearInterval(scrambleTimer)
    scrambleTimer = null
  }
}

function scramble() {
  clearScrambleTimer()
  let iteration = 0
  scrambleTimer = setInterval(() => {
    displayText.value = props.text
      .split('')
      .map((char, index) => {
        if (index < iteration)
          return props.text[index]
        if (char === ' ')
          return ' '
        return chars[Math.floor(Math.random() * chars.length)]
      })
      .join('')

    if (iteration >= props.text.length) {
      clearScrambleTimer()
      displayText.value = props.text
    }
    iteration += 0.5
  }, 30)
}

onBeforeUnmount(() => {
  clearScrambleTimer()
})
</script>

<template>
  <button
    :class="useClsx('cursor-pointer font-medium', props.class)"
    @mouseenter="scramble"
  >
    <span class="tracking-wide font-mono">{{ displayText }}</span>
  </button>
</template>
