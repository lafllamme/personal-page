<script lang="ts" setup>
import MenuBackground from '@/components/ui/Menu/MenuBackground/MenuBackground.vue'
import { useMenu } from '@/stores/menu'

const menuStore = useMenu()
const { isOpen } = storeToRefs(menuStore)

const isAriaHidden = computed(() => (isOpen.value ? 'false' : 'true'))
</script>

<template>
  <div
    :aria-hidden="isAriaHidden"
    :class="useClsx(
      'shadow-xl transition-all duration-500 ease-out dark:bg-pureBlack',
      isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
      'transform-gpu will-change-[transform,opacity] backface-hidden',
      'fixed inset-y-0 right-0 z-50 w-full bg-pureWhite',
      'w-full sm:w-[60vw] xl:w-[35vw] !max-w-[450px]',
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
