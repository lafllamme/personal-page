<script setup lang="ts">
defineProps<{
  isOpen: boolean
  tone?: 'light' | 'dark'
}>()
</script>

<template>
  <div class="osmo-hamburger" :data-open="isOpen">
    <span class="osmo-hamburger__bar" />
    <span class="osmo-hamburger__bar" />
  </div>
</template>

<style scoped>
.osmo-hamburger {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1.375em;
  height: 0.5em;
}

.osmo-hamburger__bar {
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: currentColor;
  transition: transform 0.6s cubic-bezier(0.625, 0.05, 0, 1);
}

/* Closed state - two parallel lines */
.osmo-hamburger__bar:nth-child(1) {
  transform: translateY(0.1875em) rotate(0.001deg) scaleX(1);
}

.osmo-hamburger__bar:nth-child(2) {
  transform: translateY(-0.1875em) rotate(0.001deg) scaleX(1);
}

/* Open state - X shape */
.osmo-hamburger[data-open="true"] .osmo-hamburger__bar:nth-child(1) {
  transform: translateY(0) rotate(-45deg) scaleX(0.75);
}

.osmo-hamburger[data-open="true"] .osmo-hamburger__bar:nth-child(2) {
  transform: translateY(0) rotate(45deg) scaleX(0.75);
}
</style>
