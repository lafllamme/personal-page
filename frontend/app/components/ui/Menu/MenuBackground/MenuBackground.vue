<script lang="ts" setup>
import { useMenu } from '~/stores/menu'

const menuStore = useMenu()
const { isOpen, effectiveHeaderMinimized } = storeToRefs(menuStore)

const isAnimating = ref(false)

function handleAnimation() {
  isAnimating.value = true
  useWait().then(() => {
    isAnimating.value = false
  })
}

watch(isOpen, (open) => {
  if (open) {
    handleAnimation()
  }
})
</script>

<template>
  <div
    :class="useClsx(
      isAnimating && 'animated-fade-in-right',
      'animate-delay-[50ms] animated  animated-duration-900 animated-repeat-1',
    )"
    class="pointer-events-none absolute inset-0"
  >
    <div
      :class="useClsx(
        'top-30 right-14',
        'absolute origin-right transform animate-glow',
        effectiveHeaderMinimized ? 'text-[16vh]' : 'text-[18vh]',
        'color-gray-12A font-thin leading-none tracking-wider',
        'uppercase opacity-10 -translate-y-full -rotate-90 font-electric',
      )"
      aria-hidden="true"
    >
      TecNews
    </div>
  </div>
</template>
