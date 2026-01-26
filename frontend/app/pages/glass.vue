<script setup lang="ts">
import GlassMetaballs from '@/components/Three/Glass/GlassMetaballs.vue'

definePageMeta({
  layout: 'empty',
})

const { isTransitionActive } = useTransition()
const canRenderMetaballs = computed(() => !isTransitionActive.value)

useHead({
  title: 'Liquid Glass',
  meta: [
    {
      name: 'description',
      content: 'Interactive liquid glass metaballs with physics-driven motion.',
    },
  ],
})
</script>

<template>
  <main class="relative min-h-screen overflow-hidden bg-[#06090f] text-pureWhite">
    <div class="absolute inset-0">
      <GlassMetaballs
        v-if="canRenderMetaballs"
        :active="canRenderMetaballs"
        class="h-full w-full"
      />
    </div>
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute top-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(120,210,255,0.28),transparent_60%)] blur-2xl -left-24" />
      <div class="absolute right-[-20%] top-[30%] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(255,210,120,0.2),transparent_65%)] blur-3xl" />
    </div>

    <div class="pointer-events-none relative z-10 mx-auto max-w-6xl min-h-screen flex flex-col justify-between px-6 py-16">
      <div class="space-y-6">
        <p class="text-xs text-pureWhite/60 tracking-[0.5em] uppercase">
          Glass Lab
        </p>
        <h1 class="font-nohemi text-balance text-[clamp(2.8rem,7vw+1rem,7rem)] leading-[0.95] tracking-tight">
          Liquid glass,
          <span class="font-cormorant-garamond block text-[clamp(2.2rem,6vw+0.8rem,6rem)] text-pureWhite/80 font-light italic">
            pulled by your cursor.
          </span>
        </h1>
        <p class="max-w-xl text-sm text-pureWhite/70 md:text-base">
          Metaballs drift inside a refractive shell, guided by invisible physics bodies.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-4 text-xs text-pureWhite/60 tracking-[0.35em] uppercase">
        <span>Move pointer</span>
        <span class="h-[1px] w-12 bg-pureWhite/20" />
        <span>Organic refractions</span>
      </div>
    </div>
  </main>
</template>
