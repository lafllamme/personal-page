<script lang="ts" setup>
import MenuBackground from '@/components/ui/Menu/MenuBackground/MenuBackground.vue'
import { useMenu } from '@/stores/menu'

const menuStore = useMenu()
const { isOpen, isHeaderMinimized } = storeToRefs(menuStore)

const isAriaHidden = computed(() => (isOpen.value ? 'false' : 'true'))
</script>

<template>
  <div
    :aria-hidden="isAriaHidden"
    :class="useClsx(
      'shadow-xl transition-all duration-500 ease-out dark:bg-pureBlack',
      // Animate from header top edge when minimized (scale from top), else slide from right
      isHeaderMinimized
        ? (isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0')
        : (isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'),
      'transform-gpu will-change-[transform,opacity] backface-hidden',
      isHeaderMinimized && 'origin-top',
      // Layout: dropdown matches minimized header width; sidebar widths otherwise
      isHeaderMinimized
        ? 'fixed left-1/2 top-4 md:top-6 z-50 -translate-x-1/2 bg-pureWhite w-[65vw] md:w-[45vw]'
        : 'fixed inset-y-0 right-0 z-50 w-full bg-pureWhite',
      isHeaderMinimized
        ? 'rounded-[36px]'
        : 'w-full sm:w-[60vw] xl:w-[35vw] !max-w-[450px]',
    )"
    :inert="isOpen ? undefined : 'true'"
    tabindex="-1"
  >
    <!-- Background Text -->
    <MenuBackground />

    <!--  Default slot  -->
    <slot name="default" />
  </div>
</template>

<style scoped>

</style>
