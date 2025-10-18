<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import FlashlightCanvas from '@/components/ui/Effects/FlashlightCanvas.vue'
import LightSwitch from '@/components/ui/Effects/LightSwitch.vue'

const flashlightEnabled = ref(true)
const controlsVisible = ref(true)
const flashlightRadius = ref(265)
const flashlightDim = ref(0.93)

// Debounced values to prevent flickering
const debouncedRadius = ref(265)

// VueUse debounced function for radius only
const updateRadius = useDebounceFn((value: number) => {
  debouncedRadius.value = value
}, 0) // ~60fps


function onRadiusInput(e: Event) {
  const value = Number((e.target as HTMLInputElement).value)
  flashlightRadius.value = value
  updateRadius(value)
  consola.debug('[flashlight] radius', value)
}

function onDimInput(e: Event) {
  const value = Number((e.target as HTMLInputElement).value)
  flashlightDim.value = value
  consola.debug('[flashlight] dim', value)
}

function onRadiusUpdate(newRadius: number) {
  flashlightRadius.value = newRadius
  debouncedRadius.value = newRadius
  consola.debug('[flashlight] radius updated from scroll', newRadius)
}

// Debug flashlight state changes
watch(flashlightEnabled, (newValue) => {
  consola.debug('[flashlight] enabled state changed:', newValue)
})

function toggleControls() {
  controlsVisible.value = !controlsVisible.value
}
</script>

<template>
  <div
    :class="useClsx(
      'relative min-h-screen',
      'bg-pureWhite dark:bg-pureBlack',
    )"
  >
    <article
      class="mx-auto max-w-3xl px-6 py-16"
    >
      <header class="mb-12">
        <h1
          class="font-recoleta mb-4 text-[clamp(2rem,4vw,3rem)] color-pureBlack font-700 leading-tight dark:color-pureWhite"
        >
          The Art of Digital Exploration: Navigating the Web in Darkness
        </h1>
        <div
          class="flex items-center gap-4 text-sm color-gray-9"
        >
          <span>By Sarah Chen</span>
          <span>•</span>
          <time>March 15, 2024</time>
          <span>•</span>
          <span>8 min read</span>
        </div>
      </header>

      <div class="font-manrope text-lg color-gray-12 leading-relaxed space-y-6">
        <p class="text-xl color-gray-10">
          In the vast expanse of the digital world, we often take for granted the ability to see everything at once.
          But what if we could only illuminate small portions of our screen, like exploring a cave with nothing but a
          flashlight?
        </p>

        <p>
          This concept isn't just a novelty—it's a fascinating exploration of how we consume information. When forced
          to focus on small sections of content, our reading patterns change dramatically. We become more deliberate,
          more intentional with our attention.
        </p>

        <h2 class="mb-6 mt-12 text-3xl color-pureBlack font-700 dark:color-pureWhite">
          The Psychology of Limited Vision
        </h2>

        <p>
          Research in cognitive psychology has shown that constraints can actually enhance creativity and focus. When
          we limit our field of view, we're forced to slow down and truly absorb what we're reading. The flashlight
          effect creates a natural spotlight, drawing our attention to specific words and phrases.
        </p>

        <blockquote class="my-8 border-l-4 border-mint-5 border-solid pl-6 text-gray-4 italic">
          "Constraints are not the enemy of creativity—they are the very foundation upon which innovation is built."
          <footer class="mt-2 text-sm not-italic">
            — Dr. Marcus Webb, Cognitive Scientist
          </footer>
        </blockquote>

        <p>
          This phenomenon extends beyond just reading. In user interface design, progressive disclosure—revealing
          information gradually—has long been recognized as an effective way to prevent cognitive overload. The
          flashlight effect takes this principle to its logical extreme.
        </p>

        <h2 class="mb-6 mt-12 text-3xl color-pureBlack font-700 dark:color-pureWhite">
          Technical Implementation
        </h2>

        <p>
          Creating this effect requires a delicate balance of canvas manipulation and performance optimization. The key
          lies in using the HTML5 Canvas API's composite operations, specifically the
          <code class="rounded bg-gray-8 px-2 py-1 text-sm color-mint-11">destination-out</code> mode.
        </p>

        <p>
          This compositing mode allows us to "erase" portions of a dark overlay, creating the illusion of light
          piercing through darkness. By applying a radial gradient to the erased area, we achieve soft, feathered edges
          that mimic the natural falloff of light.
        </p>

        <h3 class="mb-4 mt-8 text-2xl color-pureBlack font-600 dark:color-pureWhite">
          Performance Considerations
        </h3>

        <p>
          One might assume that constantly redrawing a full-screen canvas would be computationally expensive. However,
          modern browsers are remarkably efficient at handling canvas operations. The key is to minimize unnecessary
          redraws and leverage hardware acceleration wherever possible.
        </p>

        <p>
          By using <code class="rounded bg-gray-8 px-2 py-1 text-sm color-mint-11">requestAnimationFrame</code>, we
          ensure our drawing operations are synchronized with the browser's refresh rate, resulting in smooth, 60fps
          animations even on modest hardware.
        </p>

        <h2 class="mb-6 mt-12 text-3xl color-pureBlack font-700 dark:color-pureWhite">
          Practical Applications
        </h2>

        <p>
          While this effect might seem purely aesthetic, it has genuine practical applications. Educational platforms
          could use it to help students with focus issues by reducing visual distractions. Reading apps might implement
          it as an optional "focus mode" for users who find themselves easily distracted by surrounding content.
        </p>

        <p>
          Game developers have long used similar techniques to create atmosphere and tension. Horror games, in
          particular, leverage limited visibility to create suspense and encourage careful exploration. The same
          principles can be applied to web experiences to create memorable, engaging interactions.
        </p>

        <h2 class="mb-6 mt-12 text-3xl color-pureBlack font-700 dark:color-pureWhite">
          The Future of Interactive Reading
        </h2>

        <p>
          As we move further into an age of digital content consumption, experiments like this remind us that the web
          is still a canvas for innovation. We're not limited to static pages and predictable interactions. Every
          element of the reading experience can be reimagined and enhanced.
        </p>

        <p>
          The flashlight effect is just one example of how we can transform mundane activities—like reading a blog
          post—into something more engaging and memorable. It challenges our assumptions about how content should be
          presented and consumed.
        </p>

        <p class="text-xl color-gray-10">
          So the next time you're designing a digital experience, ask yourself: what if we could only see part of it at
          a time? What would that reveal about how we interact with information? Sometimes, the most interesting
          insights come from the shadows.
        </p>
      </div>

      <footer class="mt-16 border-t border-gray-8 pt-8">
        <p class="text-sm text-gray-5">
          This article was written to demonstrate the flashlight canvas effect. Move your cursor around to explore the
          content in a unique way.
        </p>
      </footer>
    </article>

    <FlashlightCanvas
      v-model="flashlightEnabled"
      :radius="debouncedRadius.value"
      :dim="flashlightDim.value"
      @update:radius="onRadiusUpdate"
    />
  </div>

  <!-- Light Switch - fixed positioned at top right -->
  <div class="fixed right-4 top-20 z-10 w-fit translate-y-full">
    <LightSwitch v-model="flashlightEnabled" />
  </div>

  <!-- Flashlight Controls - fixed positioned below the switch -->
  <div
    v-show="flashlightEnabled"
    class="fixed right-4 top-36 z-10 w-fit flex flex-col translate-y-full items-center gap-4 transition-opacity duration-500"
    :class="useClsx(
      'rounded-bl-[10px] rounded-br-[28px] rounded-tl-[30px] rounded-tr-[8px]',
      'bg-gray-8 dark:bg-gray-4 p-4 text-xs shadow-[0_10px_30px_rgba(0,0,0,0.35)]',
      'backdrop-blur-sm',
    )"
  >
    <!-- Show controls button (when controls are hidden) -->
    <button
      v-show="!controlsVisible"
      class="h-8 w-8 flex items-center justify-center rounded-full bg-gray-8 text-gray-12 transition-colors dark:bg-gray-4 hover:bg-gray-9 dark:text-gray-11 dark:hover:bg-gray-3"
      title="Show controls"
      @click="toggleControls"
    >
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
        />
      </svg>
    </button>

    <!-- Controls content (when visible) -->
    <div v-show="controlsVisible" class="flex flex-col items-center gap-4">
      <!-- Close button -->
      <button
        class="absolute h-6 w-6 flex items-center justify-center rounded-full bg-gray-10 text-gray-12 transition-colors -right-2 -top-2 dark:bg-gray-2 hover:bg-gray-11 dark:text-gray-11 dark:hover:bg-gray-1"
        title="Close controls"
        @click="toggleControls"
      >
        <span class="text-xs font-bold">×</span>
      </button>
      <div class="flex flex-col items-start gap-1">
        <label for="radius" class="space-grotesk-regular color-gray-12">Radius</label>
        <input
          id="radius"
          class="h-2 w-32 appearance-none rounded-full bg-sand-10 accent-mint-11"
          type="range"
          min="60"
          max="400"
          :value="flashlightRadius"
          @input="onRadiusInput"
        >
      </div>
      <div class="flex flex-col items-start gap-1">
        <label for="dim" class="space-grotesk-regular color-gray-12">Dim</label>
        <input
          id="dim"
          class="h-2 w-32 appearance-none rounded-full bg-sand-10 accent-mint-11"
          type="range"
          min="0.4"
          max="0.98"
          step="0.01"
          :value="flashlightDim"
          @input="onDimInput"
        >
      </div>
    </div>
  </div>
</template>
