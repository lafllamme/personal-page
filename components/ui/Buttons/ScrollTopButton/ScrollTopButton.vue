<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'

const { y } = useWindowScroll()
const { height } = useWindowSize()

// Dynamically get the scrollable height
const scrollThreshold = computed(() => {
  const scrollHeight = document?.documentElement?.scrollHeight - height.value
  return scrollHeight * 0.2
})

const showButton = computed(() => y.value > scrollThreshold.value)
const debouncedShowButton = useDebounce(showButton, 120)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <!-- Circular Scroll to Top Button -->
  <button
    :class="useClsx(
      'shadow-[0_6px_12px_rgba(0,0,0,0.08),0_12px_20px_rgba(52,211,153,0.12)] dark:shadow-[0_6px_12px_rgba(0,0,0,0.2),0_12px_20px_rgba(52,211,153,0.15)]',
      'color-mint-1 hover:scale-110 focus-visible:scale-110  focus-visible:outline-none focus-visible:ring focus-visible:ring-jade-10',
      debouncedShowButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
      'transition-all ease-out duration-700 dark:bg-pureWhite',
      'flex items-center justify-center rounded-full',
      'group fixed bottom-6 right-6 z-50 shad-1 ',
      'bg-pureBlack w-14 h-14',
    )"
    aria-label="Scroll to top"
    @click="scrollToTop"
  >
    <Icon
      class="size-6 rounded-full"
      name="ri:arrow-up-long-line"
    />
  </button>
</template>
