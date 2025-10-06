<script lang="ts" setup>
import MenuBackground from '@/components/ui/Menu/MenuBackground/MenuBackground.vue'
import { useMenu } from '@/stores/menu'

const menuStore = useMenu()
const { isOpen, isHeaderMinimized } = storeToRefs(menuStore)

const isAriaHidden = computed(() => (isOpen.value ? 'false' : 'true'))

// Base styles applied in all states
const basePanelClasses
    = 'shadow-xl transition-[clip-path,opacity,transform] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] dark:bg-pureBlack transform-gpu will-change-[transform,opacity,clip-path] backface-hidden'

// Animation styles depending on header state
const minimizedAnimation = computed(() =>
  isOpen.value
    ? 'translate-y-0 opacity-100 [clip-path:inset(0_0_0_0)]'
    : '-translate-y-1 opacity-0 [clip-path:inset(0_0_100%_0)]',
)
const sidebarAnimation = computed(() =>
  isOpen.value ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
)
const animationClasses = computed(() =>
  isHeaderMinimized.value ? minimizedAnimation.value : sidebarAnimation.value,
)

// Layout styles depending on header state
const minimizedLayout
    = 'fixed left-1/2 top-4 md:top-6 z-50 dark: border-solid dark:border-mint-12 dark:border -translate-x-1/2 bg-pureWhite w-[65vw] md:w-[45vw] overflow-hidden rounded-[36px] max-h-[90svh]'
const sidebarLayout = 'fixed inset-y-0 right-0 z-50 w-full bg-pureWhite w-full sm:w-[60vw] xl:w-[35vw] !max-w-[450px]'
const layoutClasses = computed(() =>
  isHeaderMinimized.value ? minimizedLayout : sidebarLayout,
)

// Final class binding
const panelClass = computed(() => useClsx(basePanelClasses, animationClasses.value, layoutClasses.value))
</script>

<template>
  <div
    :aria-hidden="isAriaHidden"
    :class="panelClass"
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
