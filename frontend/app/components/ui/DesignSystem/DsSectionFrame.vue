<script setup lang="ts">
import DsSectionShell from '@/components/ui/DesignSystem/DsSectionShell.vue'

withDefaults(defineProps<{
  as?: 'section' | 'header' | 'div'
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  screen?: boolean
  center?: boolean
  bordered?: boolean
  debug?: boolean
}>(), {
  as: 'section',
  spacing: 'lg',
  screen: false,
  center: false,
  bordered: true,
  debug: false,
})
</script>

<template>
  <!-- Legacy alias. Prefer DsSectionShell. -->
  <DsSectionShell
    :as="as"
    :spacing="spacing"
    :screen="screen"
    :bordered="bordered"
    :debug="debug"
  >
    <slot />
  </DsSectionShell>
</template>
