<script lang="ts" setup>
import type { NavigationProps } from './NavigationMobile.model'
import NavigationMobileItem from '@/components/ui/Navigation/Mobile/Item/NavigationMobileItem.vue'
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
    <div class="mx-auto max-w-7xl px-4 py-4">
      <nav class="flex flex-col gap-4">
        <NavigationMobileItem
          :items="items"
          :tab-index="open ? 0 : -1"
        />
      </nav>
    </div>
  </div>
</template>
