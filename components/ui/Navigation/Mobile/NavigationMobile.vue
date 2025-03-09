<script lang="ts" setup>
import type { NavigationProps } from './NavigationMobile.model'
import { NavigationDefaults } from './NavigationMobile.model'

const props = withDefaults(defineProps<NavigationProps>(), NavigationDefaults)
const { open, items } = toRefs(props)
</script>

<template>
  <div
    id="mobile-menu"
    :class="useClsx(
      'overflow-hidden backdrop-blur-md backdrop-saturate-150',
      'bg-pureBlack/30 dark:bg-pureWhite/30 saturation-900 transition-all ease-in-out',
      open ? 'max-h-96' : 'max-h-0',
    )"
    aria-labelledby="mobile-menu-button"
  >
    hello
  </div>
</template>
