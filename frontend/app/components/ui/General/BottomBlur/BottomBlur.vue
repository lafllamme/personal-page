<script lang="ts" setup>
// No script logic needed
</script>

<template>
  <div
    :style="{
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 98% 2%, 95% 5%, 92% 8%, 90% 10%, 88% 12%, 85% 10%, 82% 8%, 80% 5%, 78% 2%, 75% 0%, 72% 2%, 70% 5%, 68% 8%, 65% 10%, 62% 12%, 60% 10%, 58% 8%, 55% 5%, 52% 2%, 50% 0%, 48% 2%, 45% 5%, 42% 8%, 40% 10%, 38% 12%, 35% 10%, 32% 8%, 30% 5%, 28% 2%, 25% 0%, 22% 2%, 20% 5%, 18% 8%, 15% 10%, 12% 12%, 10% 10%, 8% 8%, 5% 5%, 2% 2%, 0% 0%)',
      filter: 'drop-shadow(0px -4px 12px rgba(0, 0, 0, 0.08))',
      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))',
      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))',

    }"
    class="pointer-events-none fixed bottom-0 left-0 right-0 z-50 h-[2vh] w-full from-background/10 to-transparent bg-gradient-to-t backdrop-blur-[2px] md:h-[3svh] md:h-[3svh]"
  />
</template>
