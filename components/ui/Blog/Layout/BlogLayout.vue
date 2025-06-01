<script setup>
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Featured Articles Section -->
    <section class="py-20">
      <div class="mx-auto px-4 container">
        <div class="mb-12 flex flex-col items-start justify-between md:flex-row md:items-end">
          <div>
            <h2 class="mb-4 text-3xl color-pureBlack font-bold tracking-tighter dark:color-pureWhite">
              Featured Articles
            </h2>
            <p class="max-w-2xl text-gray-10">
              The most insightful pieces from our expert contributors.
            </p>
          </div>
          <a
            class="mt-4 flex items-center text-sm text-gray-12 font-medium md:mt-0 hover:text-gray-10"
            href="#"
          >
            View all articles
            <Icon class="ml-1 h-4 w-4" name="ri:arrow-right-s-line" />
          </a>
        </div>

        <div class="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
          <div
            v-for="i in 3"
            :key="i"
            class="group relative overflow-hidden border border-gray-6 rounded-lg border-solid bg-pureWhite transition-shadow dark:bg-pureBlack hover:shadow-md"
          >
            <div class="aspect-video overflow-hidden">
              <div class="h-full w-full bg-gray-4A" />
            </div>
            <div class="p-6">
              <div class="mb-2 text-sm text-gray-11">
                May {{ i }}, 2024
              </div>
              <h3 class="mb-2 text-xl font-bold transition-colors group-hover:color-mint-11">
                The Rise of AI in Modern Development
              </h3>
              <p class="text-gray-10">
                How artificial intelligence is transforming the way we build and interact with technology.
              </p>
              <div class="mt-4">
                <a
                  class="text-sm text-gray-12 font-medium underline-offset-4 hover:underline hover:underline-mint-8"
                  href="#"
                >
                  Read More →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Custom scrollbar for dark mode */
:global(.dark) {
  color-scheme: dark;
}

/* Smooth transitions */
* {
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

/* Focus styles */
button:focus-visible,
input:focus-visible,
a:focus-visible {
  outline: 2px solid #6d28d9;
  outline-offset: 2px;
}

/* Hover effects */
.group:hover .group-hover\:text-purple-600 {
  color: #9333ea;
}

.dark .group:hover .group-hover\:text-purple-400 {
  color: #c084fc;
}
</style>
