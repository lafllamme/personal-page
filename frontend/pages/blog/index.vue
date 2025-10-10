<script setup lang="ts">
import GlassSwitch from '@/components/ui/Buttons/GlassSwitch.vue'
import FlashlightCanvas from '@/components/ui/Effects/FlashlightCanvas.vue'

const flashlightEnabled = ref(true)
</script>

<template>
  <div
    :class="useClsx(
      'relative min-h-screen',
      'bg-pureWhite dark:bg-pureBlack',
    )"
  >
    <!-- Glass Switch to toggle flashlight effect - sticky positioned at top -->
    <div class="sticky top-14 z-10 w-fit flex flex-col translate-y-1/2 items-center gap-3 md:left-8">
      <GlassSwitch v-model="flashlightEnabled" />
      <span class="space-grotesk-regular text-xs color-gray-11 font-medium tracking-normal uppercase">
        {{ flashlightEnabled ? 'Flashlight' : 'Normal' }}
      </span>
    </div>

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

    <FlashlightCanvas v-model="flashlightEnabled" />
  </div>
</template>
