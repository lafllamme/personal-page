<script setup lang="ts">
import GlassMetaballs from '@/components/Three/Glass/GlassMetaballs.vue'
import PageBleed from '@/components/ui/Partials/PageContainer/PageBleed.vue'

useHead({
  title: 'Liquid Symmetry',
})
const headlineFontClass = 'zalando-sans-expanded'
const sublineFontClass = 'font-baskerville'
</script>

<template>
  <main class="touch-pan-y bg-pureWhite dark:bg-pureBlack">
    <PageBleed>
      <section class="relative min-h-[100svh] flex items-start justify-center px-8 pt-32 pb-24">
        <div class="pointer-events-none absolute bottom-0 left-0 right-0 z-0 mx-[calc(50%-50vw)] h-[calc(100%+var(--header-height,0px))] w-screen overflow-visible -top-[var(--header-height,0px)]">
          <GlassMetaballs controls-mode="fixed" class="h-full w-full" />
        </div>

        <h1 class="relative z-10 whitespace-nowrap text-center text-[clamp(3.5rem,10vw,9rem)] color-pureBlack uppercase dark:color-pureWhite">
          <span :class="headlineFontClass" class="block font-semibold">Web evolves.</span>
          <span :class="sublineFontClass" class="block color-pureBlack/70 italic dark:color-pureWhite/70">We track it.</span>
        </h1>
      </section>
    </PageBleed>
    <section class="relative py-24">
      <div class="mx-auto max-w-4xl space-y-16">
        <div class="space-y-6">
          <h2 class="text-3xl color-pureBlack font-light tracking-tight md:text-4xl dark:color-pureWhite">
            Liquid Drift
          </h2>
          <p class="text-base color-pureBlack/70 leading-relaxed md:text-lg dark:color-pureWhite/70">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
            dignissim sit amet, adipiscing nec, ultricies sed, dolor.
          </p>
        </div>
        <div class="space-y-6">
          <h3 class="text-xl color-pureBlack font-light tracking-tight md:text-2xl dark:color-pureWhite">
            Signal Layers
          </h3>
          <p class="text-base color-pureBlack/70 leading-relaxed md:text-lg dark:color-pureWhite/70">
            Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin
            porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.
          </p>
        </div>
        <div class="space-y-6">
          <h3 class="text-xl color-pureBlack font-light tracking-tight md:text-2xl dark:color-pureWhite">
            Soft Horizons
          </h3>
          <p class="text-base color-pureBlack/70 leading-relaxed md:text-lg dark:color-pureWhite/70">
            Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat
            libero pharetra tempor. Cras vestibulum bibendum augue.
          </p>
        </div>
      </div>
    </section>
    <section class="relative py-24">
      <div class="mx-auto max-w-4xl space-y-16">
        <div class="space-y-6">
          <h2 class="text-3xl color-pureBlack font-light tracking-tight md:text-4xl dark:color-pureWhite">
            Elastic Currents
          </h2>
          <p class="text-base color-pureBlack/70 leading-relaxed md:text-lg dark:color-pureWhite/70">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante
            dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
          </p>
        </div>
        <div class="space-y-6">
          <h3 class="text-xl color-pureBlack font-light tracking-tight md:text-2xl dark:color-pureWhite">
            Depth Fields
          </h3>
          <p class="text-base color-pureBlack/70 leading-relaxed md:text-lg dark:color-pureWhite/70">
            Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum
            lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra.
          </p>
        </div>
        <div class="space-y-6">
          <h3 class="text-xl color-pureBlack font-light tracking-tight md:text-2xl dark:color-pureWhite">
            Slow Bloom
          </h3>
          <p class="text-base color-pureBlack/70 leading-relaxed md:text-lg dark:color-pureWhite/70">
            Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean
            quam. In scelerisque sem at dolor.
          </p>
        </div>
      </div>
    </section>
    <section class="relative py-24">
      <div class="mx-auto max-w-4xl space-y-16">
        <div class="space-y-6">
          <h2 class="text-3xl color-pureBlack font-light tracking-tight md:text-4xl dark:color-pureWhite">
            Horizon Stack
          </h2>
          <p class="text-base color-pureBlack/70 leading-relaxed md:text-lg dark:color-pureWhite/70">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec ante. Sed lacinia, urna non tincidunt
            mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis.
          </p>
        </div>
        <div class="space-y-6">
          <h3 class="text-xl color-pureBlack font-light tracking-tight md:text-2xl dark:color-pureWhite">
            Quiet Momentum
          </h3>
          <p class="text-base color-pureBlack/70 leading-relaxed md:text-lg dark:color-pureWhite/70">
            Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum
            sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit.
          </p>
        </div>
        <div class="space-y-6">
          <h3 class="text-xl color-pureBlack font-light tracking-tight md:text-2xl dark:color-pureWhite">
            Afterglow
          </h3>
          <p class="text-base color-pureBlack/70 leading-relaxed md:text-lg dark:color-pureWhite/70">
            Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa
            mattis sem, at interdum magna augue eget diam.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
