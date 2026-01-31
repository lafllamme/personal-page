<script lang="ts" setup>
import { useLenis } from 'lenis/vue'
import { useMenu } from '~/stores/menu'

const { y } = useWindowScroll()
const { height } = useWindowSize()
const menuStore = useMenu()
const lenis = useLenis()

const { isOpen } = toRefs(menuStore)

const scrollThreshold = computed(() => {
  const scrollable = document?.documentElement?.scrollHeight - height.value
  return scrollable * 0.20 // 20 % down the page
})

const showButton = computed(() => y.value > scrollThreshold.value)
const debouncedShowButton = useDebounce(showButton, 120)

/* --- smooth-scroll to top using Lenis for consistent smooth scrolling --- */
function scrollToTop() {
  // Use Lenis for smooth scrolling if available, fallback to native smooth scroll
  if (lenis.value) {
    lenis.value.scrollTo(0, {
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - 2 ** (-10 * t)),
    })
  }
  else {
    // Fallback to native smooth scroll if Lenis is not available
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <!-- Circular Scroll to Top Button -->
  <button
    :class="useClsx(
      'shadow-[0_6px_12px_rgba(0,0,0,0.08),0_12px_20px_rgba(52,211,153,0.12)] dark:shadow-[0_6px_12px_rgba(0,0,0,0.2),0_12px_20px_rgba(52,211,153,0.15)]',
      'color-mint-1 hover:scale-110 focus-visible:scale-110  focus-visible:outline-none focus-visible:ring focus-visible:ring-jade-10',
      debouncedShowButton && !isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
      'transition-all ease-[cubic-bezier(0.23,1,0.32,1)] duration-900 dark:bg-pureWhite',
      'flex items-center justify-center rounded-full',
      'group fixed bottom-6 right-6 z-50 shad-1 ',
      'bg-pureBlack w-14 h-14 z-9999',
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
