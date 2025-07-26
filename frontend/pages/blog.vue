<script setup>
const activeId = ref('')
const tocItems = ref([
  { id: 'the-renaissance-of-digital-craftsmanship', text: 'The Renaissance of Digital Craftsmanship', level: 1 },
  { id: 'the-philosophy-of-intentional-design', text: 'The Philosophy of Intentional Design', level: 2 },
  { id: 'core-principles-of-modern-craftsmanship', text: 'Core Principles of Modern Craftsmanship', level: 3 },
  { id: 'tools-of-the-trade-beyond-software', text: 'Tools of the Trade: Beyond Software', level: 2 },
  { id: 'the-essential-toolkit', text: 'The Essential Toolkit', level: 4 },
  { id: 'the-future-of-craftsmanship', text: 'The Future of Craftsmanship', level: 2 },
])

const archiveIssues = ref(['Issue 46', 'Issue 45', 'Issue 44', 'Issue 43'])

let observer = null

onMounted(() => {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      })
    },
    { rootMargin: '-20% 0% -35% 0%' },
  )

  headings.forEach(heading => observer.observe(heading))
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <div
    :class="useClsx(
      'ease-[cubic-bezier(0.33,1,0.68,1)] transition-colors duration-600',
      'min-h-svh dark:bg-pureBlack bg-pureWhite',
    )"
  >
    <!-- Magazine-style Header -->
    <header class="border-b-2 border-pureBlack border-solid dark:border-pureWhite">
      <div class="mx-auto max-w-screen-2xl px-8 py-8">
        <div class="text-center space-y-4">
          <div class="flex items-center justify-center space-x-8">
            <div class="h-px w-16 bg-pureBlack dark:bg-pureWhite" />
            <h1 class="text-4xl color-pureBlack font-light tracking-widest dark:color-pureWhite">
              CRAFTSMAN
            </h1>
            <div class="h-px w-16 bg-pureBlack dark:bg-pureWhite" />
          </div>
          <p class="text-sm color-gray-12 tracking-[0.3em] uppercase">
            A Journal of Digital Artisanship
          </p>
          <div class="flex items-center justify-center text-xs color-gray-11 tracking-widest uppercase space-x-12">
            <span>Issue No. 01</span>
            <span>•</span>
            <span>Summer 2025</span>
            <span>•</span>
            <span>Est. 2025</span>
          </div>
        </div>
      </div>
    </header>

    <div class="mx-auto max-w-screen-2xl px-8 py-16">
      <div class="grid grid-cols-12 gap-16">
        <!-- Left Sidebar -->
        <aside class="col-span-2 hidden xl:block">
          <div class="sticky top-8 space-y-12">
            <!-- Issue Info -->
            <div class="text-center">
              <div class="mx-auto mb-4 h-32 w-24 flex items-center justify-center bg-pureBlack dark:bg-pureWhite">
                <span class="transform text-xs color-pureWhite font-bold -rotate-90 dark:color-pureBlack">01</span>
              </div>
              <p class="text-xs color-gray-10 tracking-widest uppercase">
                Current Issue
              </p>
            </div>

            <!-- TOC -->
            <div class="border-gray-200 border-t pt-8">
              <nav>
                <h3 class="mb-4 text-sm color-gray-12 font-semibold tracking-wider uppercase">
                  Table of Contents
                </h3>
                <ul class="text-sm space-y-2">
                  <li v-for="item in tocItems" :key="item.id" :style="{ paddingLeft: `${(item.level - 1) * 12}px` }">
                    <a
                      :href="`#${item.id}`"
                      class="block py-1 color-gray-11 transition-colors hover:text-pureBlack"
                      :class="{ 'text-pureBlack font-medium border-l-2 border-pureBlack pl-3 -ml-3': activeId === item.id }"
                    >
                      {{ item.text }}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="col-span-12 xl:col-span-8">
          <article class="max-w-none">
            <!-- Magazine-style Article Header -->
            <header class="mb-16 text-center">
              <div class="space-y-6">
                <div class="text-xs color-gray-10 tracking-[0.4em] uppercase">
                  Featured Essay
                </div>
                <div class="mx-auto h-px w-24 bg-pureBlack dark:bg-pureWhite" />
                <div class="mx-auto max-w-4xl">
                  <h1
                    id="the-renaissance-of-digital-craftsmanship"
                    class="mb-8 text-5xl color-pureBlack font-light leading-none tracking-wide lg:text-7xl md:text-6xl dark:color-pureWhite"
                  >
                    The Renaissance of Digital Craftsmanship
                  </h1>
                  <p class="mx-auto max-w-3xl text-xl color-gray-11 font-light leading-relaxed tracking-wide">
                    In an era where artificial intelligence threatens to commoditize creativity, a quiet revolution is
                    taking place in the studios and workshops of digital artisans worldwide.
                  </p>
                </div>
                <div class="flex items-center justify-center pt-8 text-sm color-gray-10 space-x-8">
                  <span class="tracking-wide">By Dogan Teke</span>
                  <span>•</span>
                  <span class="tracking-wide">July 15, 2025</span>
                  <span>•</span>
                  <span class="tracking-wide">8 minute read</span>
                </div>
              </div>
            </header>

            <!-- Drop Cap and Content -->
            <div class="prose-editorial max-w-none">
              <div class="mb-12">
                <div class="float-left mb-2 mr-4">
                  <span class="text-8xl color-pureBlack font-light leading-none dark:color-pureWhite">I</span>
                </div>
                <p class="mb-6 text-lg color-gray-12 leading-relaxed">
                  n an era where artificial intelligence threatens to commoditize creativity, a quiet revolution is
                  taking place in the studios and workshops of digital artisans worldwide. These modern craftspeople
                  are rediscovering the profound satisfaction that comes from <strong>deliberate creation</strong>—the
                  kind that emerges not from algorithms, but from the intersection of human intuition, technical
                  mastery, and years of dedicated practice.
                </p>
              </div>

              <!-- Philosophy Section -->
              <div class="my-16 text-center">
                <div class="bg-gray-300 mx-auto mb-8 h-px w-24" />
                <h2
                  id="the-philosophy-of-intentional-design"
                  class="text-3xl color-pureBlack font-light tracking-tight dark:color-pureWhite"
                >
                  The Philosophy of Intentional Design
                </h2>
                <div class="bg-gray-300 mx-auto mt-8 h-px w-12" />
              </div>

              <div class="mx-auto max-w-4xl space-y-8">
                <p class="mb-6 text-lg color-gray-12 leading-relaxed">
                  At the heart of this renaissance lies a fundamental shift in how we approach the creative process.
                  Where industrial design once prioritized efficiency and scalability above all else, digital
                  craftsmanship embraces a more nuanced philosophy—one that recognizes the inherent value in the
                  <strong>process itself</strong>, not merely its output.
                </p>

                <!-- Quote -->
                <div class="my-16">
                  <div class="mx-auto max-w-3xl text-center">
                    <div class="mb-4 text-6xl color-gray-8">
                      "
                    </div>
                    <blockquote class="mb-4 text-2xl color-gray-12 font-light leading-relaxed italic">
                      The craftsman's relationship with their tools is intimate and evolving. Each project teaches
                      something new, each challenge reveals another layer of possibility. This is not about
                      perfection—it's about the continuous pursuit of excellence through deliberate practice.
                    </blockquote>
                    <div class="mx-auto h-px w-12 bg-gray-8" />
                  </div>
                </div>

                <p class="mb-6 text-lg color-gray-12 leading-relaxed">
                  This philosophy manifests in countless ways: the designer who spends weeks perfecting a single
                  typeface, the developer who refactors code not for performance gains but for elegance, the artist who
                  chooses to work within self-imposed constraints because they understand that <em>limitations breed
                    creativity</em>. These practitioners have learned what their industrial predecessors knew
                  instinctively: that mastery comes not from having infinite options, but from exploring the infinite
                  possibilities within chosen boundaries.
                </p>
              </div>

              <!-- Core Principles Section -->
              <div class="my-12 px-6 text-start !mb-9">
                <h3
                  id="core-principles-of-modern-craftsmanship"
                  class="text-3xl color-pureBlack font-bold tracking-normal antialiased dark:color-pureWhite"
                >
                  Core Principles of Modern Craftsmanship
                </h3>
              </div>

              <div class="mx-auto max-w-4xl">
                <ol class="mb-6 ml-6 list-decimal space-y-2">
                  <li class="text-lg color-gray-12 leading-relaxed">
                    <span><strong>Mastery through repetition and refinement</strong></span>
                  </li>
                  <li class="text-lg color-gray-12 leading-relaxed">
                    <span><strong>Deep understanding of materials and methods</strong></span>
                  </li>
                  <li class="text-lg color-gray-12 leading-relaxed">
                    <span><strong>Respect for tradition while embracing innovation</strong></span>
                  </li>
                  <li class="text-lg color-gray-12 leading-relaxed">
                    <span><strong>Commitment to quality over quantity</strong></span>
                  </li>
                  <li class="text-lg color-gray-12 leading-relaxed">
                    <span><strong>Integration of personal vision with functional requirements</strong></span>
                  </li>
                </ol>
              </div>

              <!-- Horizontal Rule -->
              <hr class="my-12 h-px border-0 bg-gray-6">

              <!-- Tools Section -->
              <div class="my-16 text-center">
                <div class="mx-auto mb-8 h-px w-24 bg-gray-6" />
                <h2
                  id="tools-of-the-trade-beyond-software"
                  class="text-3xl color-pureBlack font-light tracking-tight dark:color-pureWhite"
                >
                  Tools of the Trade: Beyond Software
                </h2>
                <div class="mx-auto mt-8 h-px w-12 bg-gray-6" />
              </div>

              <div class="mx-auto max-w-4xl space-y-8">
                <p class="mb-6 text-lg color-gray-12 leading-relaxed">
                  The modern digital craftsperson's toolkit extends far beyond the latest software releases or hardware
                  specifications. While technical proficiency remains essential, the most successful practitioners have
                  developed a more holistic approach to their craft—one that encompasses not just <em>what</em> they
                  create, but <em>how</em> and <em>why</em> they create it.
                </p>

                <!-- Image Placeholder -->
                <figure class="my-16 -mx-8">
                  <div class="relative overflow-hidden">
                    <img
                      src="https://i.imgur.com/boGaXLb.jpeg"
                      alt="A curated collection of both digital and traditional crafting tools arranged aesthetically"
                      class="h-auto w-full object-cover"
                    >
                  </div>
                  <figcaption class="mt-6 text-center text-sm color-gray-10 tracking-wide italic">
                    A curated collection of both digital and traditional crafting tools arranged aesthetically
                  </figcaption>
                </figure>

                <!-- Essential Toolkit -->
                <h4
                  id="the-essential-toolkit"
                  class="mb-4 mt-8 text-2xl color-pureBlack font-bold tracking-normal dark:color-pureWhite"
                >
                  The Essential Toolkit
                </h4>

                <ul class="mb-6 space-y-2">
                  <li class="flex items-start gap-3 text-lg color-gray-12 leading-relaxed">
                    <input
                      type="checkbox" checked readonly
                      class="border-gray-300 mt-1 h-4 w-4 border-2 rounded bg-pureWhite text-pureBlack focus:ring-0"
                    >
                    <span class="flex-1">Deep knowledge of fundamental design principles</span>
                  </li>
                  <li class="flex items-start gap-3 text-lg color-gray-12 leading-relaxed">
                    <input
                      type="checkbox" checked readonly
                      class="border-gray-300 mt-1 h-4 w-4 border-2 rounded bg-pureWhite text-pureBlack focus:ring-0"
                    >
                    <span class="flex-1">Understanding of human psychology and behavior</span>
                  </li>
                  <li class="flex items-start gap-3 text-lg color-gray-12 leading-relaxed">
                    <input
                      type="checkbox" checked readonly
                      class="border-gray-300 mt-1 h-4 w-4 border-2 rounded bg-pureWhite text-pureBlack focus:ring-0"
                    >
                    <span class="flex-1">Proficiency in both digital and analog methods</span>
                  </li>
                  <li class="flex items-start gap-3 text-lg color-gray-12 leading-relaxed">
                    <input
                      type="checkbox" readonly
                      class="border-gray-300 mt-1 h-4 w-4 border-2 rounded bg-pureWhite text-pureBlack focus:ring-0"
                    >
                    <span class="flex-1">Cultivation of aesthetic sensitivity through diverse experiences</span>
                  </li>
                  <li class="flex items-start gap-3 text-lg color-gray-12 leading-relaxed">
                    <input
                      type="checkbox" readonly
                      class="border-gray-300 mt-1 h-4 w-4 border-2 rounded bg-pureWhite text-pureBlack focus:ring-0"
                    >
                    <span class="flex-1">Development of critical thinking and problem-solving skills</span>
                  </li>
                </ul>
              </div>

              <!-- Final Quote -->
              <div class="my-16">
                <div class="mx-auto max-w-3xl text-center">
                  <div class="mb-4 text-6xl color-gray-8">
                    "
                  </div>
                  <blockquote class="mb-4 text-2xl color-gray-12 font-light leading-relaxed italic">
                    The difference between a technician and a craftsperson lies not in their technical ability, but in
                    their relationship with their work. A craftsperson sees each project as an opportunity for growth,
                    each challenge as a chance to deepen their understanding.
                  </blockquote>
                  <div class="mx-auto h-px w-12 bg-gray-8" />
                </div>
              </div>

              <!-- Horizontal Rule -->
              <hr class="my-12 h-px border-0 bg-gray-6">

              <!-- Future Section -->
              <div class="my-16 text-center">
                <div class="mx-auto mb-8 h-px w-24 bg-gray-6" />
                <h2
                  id="the-future-of-craftsmanship"
                  class="text-3xl color-pureBlack font-light tracking-tight dark:color-pureWhite"
                >
                  The Future of Craftsmanship
                </h2>
                <div class="mx-auto mt-8 h-px w-12 bg-gray-6" />
              </div>

              <div class="mx-auto max-w-4xl space-y-8">
                <p class="mb-6 text-lg color-gray-12 leading-relaxed">
                  As we look toward the future, the principles of digital craftsmanship become increasingly relevant. In
                  a world where artificial intelligence can generate content at unprecedented scales, the human
                  touch—the <strong>intentionality</strong>, the <strong>nuance</strong>, the <strong>soul</strong> of
                  crafted work—becomes more valuable than ever.
                </p>

                <p class="mb-6 text-lg color-gray-12 leading-relaxed">
                  The renaissance of digital craftsmanship represents more than a reaction to technological change; it's
                  a reaffirmation of human creativity and the enduring value of thoughtful, deliberate work. As we
                  continue to navigate an increasingly automated world, these principles will serve as both anchor and
                  compass, guiding us toward a future where technology amplifies rather than replaces human creativity.
                </p>
              </div>
            </div>

            <!-- Editorial Footer -->
            <footer class="mt-24 border-t-2 border-pureBlack border-solid pt-16 dark:border-pureWhite">
              <div class="text-center space-y-12">
                <!-- Author -->
                <div class="mx-auto max-w-2xl">
                  <div class="mx-auto mb-6 h-32 w-32 rounded-full from-gray-4 to-gray-8 bg-gradient-to-br" />
                  <h3 class="mb-4 text-2xl color-pureBlack font-light dark:color-pureWhite">
                    Dogan Teke
                  </h3>
                  <p class="mb-6 color-gray-11 leading-relaxed">
                    Dogan is a design philosopher and digital craftsperson based in Cologne. His work explores the
                    intersection of traditional craftsmanship principles and contemporary digital practice. He has
                    been featured in Design Reviews, Crafts Magazines, and Digital Arts Quarterly.
                  </p>
                  <div class="flex items-center justify-center text-sm color-gray-10 space-x-8">
                    <a href="#" class="tracking-wide transition-colors hover:text-pureBlack">Portfolio</a>
                    <span>•</span>
                    <a href="#" class="tracking-wide transition-colors hover:text-pureBlack">Instagram</a>
                    <span>•</span>
                    <a href="#" class="tracking-wide transition-colors hover:text-pureBlack">Twitter</a>
                  </div>
                </div>

                <!-- Next Article -->
                <div class="border-t border-gray-6 border-solid pt-12">
                  <p class="mb-4 text-xs color-gray-10 tracking-[0.4em] uppercase">
                    Next Article
                  </p>
                  <h4 class="cursor-pointer text-xl color-pureBlack font-light transition-colors dark:color-pureWhite hover:color-gray-10">
                    The Aesthetics of Constraint: How Limitations Foster Creativity
                  </h4>
                </div>
              </div>
            </footer>
          </article>
        </main>

        <!-- Right Sidebar -->
        <aside class="col-span-12 xl:col-span-2">
          <div class="sticky top-8 space-y-12">
            <!-- Current Issue -->
            <div class="text-center">
              <h3 class="mb-4 text-xs color-gray-12 tracking-[0.3em] uppercase">
                This Issue
              </h3>
              <div class="text-sm space-y-4">
                <div class="border-b border-gray-6 border-solid pb-2">
                  <p class="color-gray-12 font-medium">
                    Digital Craftsmanship
                  </p>
                  <p class="text-xs color-gray-10">
                    Page 12
                  </p>
                </div>
                <div class="border-b border-gray-6 border-solid pb-2">
                  <p class="color-gray-12 font-medium">
                    Tools & Process
                  </p>
                  <p class="text-xs color-gray-10">
                    Page 28
                  </p>
                </div>
                <div class="border-b border-gray-6 border-solid pb-2">
                  <p class="color-gray-12 font-medium">
                    Future Perspectives
                  </p>
                  <p class="text-xs color-gray-10">
                    Page 45
                  </p>
                </div>
              </div>
            </div>

            <!-- Subscribe -->
            <div class="border border-gray-6 border-solid p-6 text-center">
              <h3 class="mb-3 text-sm color-gray-12 font-medium">
                Subscribe
              </h3>
              <p class="mb-4 text-xs color-gray-11 leading-relaxed">
                Quarterly insights on craftsmanship, design, and digital artistry.
              </p>
              <button
                :class="useClsx(
                  'hover:bg-mint-11 w-full bg-pureBlack py-2 text-xs color-pureWhite',
                  'tracking-widest uppercase transition-colors dark:bg-pureWhite dark:color-pureBlack',
                )"
              >
                Join
              </button>
            </div>

            <!-- Archive -->
            <div>
              <h3 class="mb-4 text-xs color-gray-12 tracking-[0.3em] uppercase">
                Archive
              </h3>
              <div class="text-sm space-y-2">
                <a
                  v-for="issue in archiveIssues" :key="issue" href="#"
                  class="block color-gray-10 transition-colors hover:text-pureBlack"
                >
                  {{ issue }}
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
