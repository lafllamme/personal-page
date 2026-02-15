<script setup lang="ts">
const props = withDefaults(defineProps<{
  as?: 'div' | 'section' | 'article'
}>(), {
  as: 'div',
})
</script>

<template>
  <component
    :is="props.as"
    class="w-full"
  >
    <slot />
  </component>
</template>
