<script setup lang="ts">
const props = withDefaults(defineProps<{
  href?: string
}>(), {
  href: '#',
})
</script>

<template>
  <a
    :href="props.href"
    class="font-manrope ds-link text-sm leading-relaxed"
  >
    <slot />
  </a>
</template>

<style scoped>
.ds-link {
  color: #12a594;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 160ms ease;
}

.dark .ds-link {
  color: #0bd8b6;
}

.ds-link:hover {
  color: color-mix(in srgb, #12a594 75%, #000);
}

.dark .ds-link:hover {
  color: color-mix(in srgb, #0bd8b6 75%, #fff);
}
</style>
