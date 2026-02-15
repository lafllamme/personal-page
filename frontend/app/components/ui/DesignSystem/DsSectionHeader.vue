<script setup lang="ts">
withDefaults(defineProps<{
  kicker?: string
  title: string
  description?: string
}>(), {
  kicker: 'foundation',
  description: '',
})
</script>

<template>
  <header class="mb-7">
    <p class="space-grotesk-regular text-[10px] tracking-[0.18em] uppercase opacity-65">
      {{ kicker }}
    </p>
    <h2 class="font-clash-regular mt-2 text-[clamp(1.45rem,2.6vw,2.35rem)] leading-tight">
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="font-manrope mt-3 max-w-3xl text-sm leading-relaxed opacity-78 md:text-base"
    >
      {{ description }}
    </p>
  </header>
</template>
