<script lang="ts" setup>
const loadingGradient = ref('repeating-linear-gradient(to right, #8a2387, #e94057, #f27121)')
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator
      :color="loadingGradient"
      :throttle="0"
    />
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
// page transitions
/* Enhanced soft fade transition without scaling to avoid jumpiness */
.page-enter-active,
.page-leave-active {
  @apply duration-300 ease-in-out !important;
  transition-property: opacity, filter !important;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(2px); /* Start with a light blur */
}

.page-enter-to {
  opacity: 1;
  transition-delay: 0.1s; /* Delay the clearing of the blur for a smooth transition */
  filter: blur(0);
}

.page-leave-active {
  opacity: 0;
  filter: blur(4px); /* Slightly more blur on leave for a soft exit */
}
</style>
