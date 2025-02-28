<script lang="ts" setup>
import type { NavigationItemProps } from './NavigationMobileItem.model'
import { NavigationItemDefaults } from './NavigationMobileItem.model'

const props = withDefaults(defineProps<NavigationItemProps>(), NavigationItemDefaults)
const { items, tabIndex } = toRefs(props)
</script>

<template>
  <nav class="flex flex-col gap-4">
    <NuxtLinkLocale
      v-for="(item, idx) in items"
      :key="`${item.label}-${idx}`"
      :class="useClsx(
        'hover:text-gray-600 dark:hover:text-gray-300 focus:ring-blue-500 rounded-sm',
        'text-pureBlack transition-colors dark:text-pureWhite',
        'focus:outline-none focus:ring-2 focus:ring-offset-2')"
      :tabindex="tabIndex"
      :to="item.href"
    >
      {{ item.label }}
    </NuxtLinkLocale>
  </nav>
</template>

<style lang="scss" scoped>

</style>
