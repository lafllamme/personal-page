<script lang="ts" setup>
const showButton = ref(false)

function handleScroll() {
  showButton.value = window.scrollY > 1200
}

useEventListener('scroll', handleScroll)

function scrollToTop() {
  const duration = 800
  const start = window.scrollY
  const startTime = performance.now()

  // Cubic bezier: 0.65,0,0.35,1
  function cubicBezier(x1: number, y1: number, x2: number, y2: number, time: number): number {
    const calcBezier = (t: number, p1: number, p2: number) =>
      3 * t * (1 - t) * (1 - t) * p1
      + 3 * t * t * (1 - t) * p2
      + t * t * t
    const getTForX = (x: number) => {
      let t = x
      for (let i = 0; i < 4; i++) {
        const currentX = calcBezier(t, x1, x2) - x
        if (Math.abs(currentX) < 0.001)
          break
        const derivative
            = 3 * (1 - t) * (1 - t) * x1
              + 6 * (1 - t) * t * (x2 - x1)
              + 3 * t * t * (1 - x2)
        if (Math.abs(derivative) < 0.0001)
          break
        t -= currentX / derivative
      }
      return t
    }
    return calcBezier(getTForX(time), y1, y2)
  }

  function animate() {
    const now = performance.now()
    const time = Math.min(1, (now - startTime) / duration)
    const bezier = cubicBezier(0.65, 0, 0.35, 1, time)
    window.scrollTo(0, Math.floor(start * (1 - bezier)))
    if (window.scrollY > 0)
      requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}
</script>

<template>
  <!-- Circular Scroll to Top Button -->
  <button
    :class="useClsx(
      'shadow-[0_6px_12px_rgba(0,0,0,0.08),0_12px_20px_rgba(52,211,153,0.12)] dark:shadow-[0_6px_12px_rgba(0,0,0,0.2),0_12px_20px_rgba(52,211,153,0.15)]',
      'color-mint-1 hover:scale-110 focus-visible:scale-110  focus-visible:outline-none focus-visible:ring focus-visible:ring-jade-10',
      showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
      'transition-all duration-300 dark:bg-pureWhite',
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
