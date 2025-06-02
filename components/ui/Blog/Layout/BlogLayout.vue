<script lang="ts" setup>
const articleRefs = useTemplateRefsList()
const isVisibleList = ref(Array.from({ length: 12 }).fill(false))

consola.debug('[Blog] =>', articleRefs.value)
onMounted(() => {
  // Example of accessing the refs
  articleRefs.value.forEach((el, idx) => {
    if (el) {
      // check if the el was already visible
      const { hasBeenVisible } = useElementVisiblePercent(el as HTMLElement, 60)
      watch(
        hasBeenVisible,
        (visible) => {
          if (visible) {
            // Log the visibility of the article
            consola.debug(`Article ${idx + 1} is visible`)
            isVisibleList.value[idx + 1] = true
          }
        },
        { immediate: true },
      )
    }
  })
})
</script>

<template>
  <div class="prismatic-emergence min-h-screen flex flex-col">
    <!-- Featured Articles Section -->
    <section>
      <div class="mx-auto px-4">
        <div class="mb-12 flex flex-col items-start justify-between md:flex-row md:items-end">
          <div class="animate-fade-in">
            <h2 class="geist-regular mb-4 text-3xl color-pureBlack font-bold tracking-tighter dark:color-pureWhite">
              Featured Articles
            </h2>
            <p class="geist-regular max-w-2xl text-gray-10">
              The most insightful pieces from our expert contributors.
            </p>
          </div>
          <a
            class="geist-regular mt-4 flex items-center text-sm text-gray-12 font-medium md:mt-0 hover:text-gray-10"
            href="#"
          >
            View all articles
            <Icon class="ml-1 h-4 w-4" name="ri:arrow-right-s-line" />
          </a>
        </div>

        <div class="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
          <div
            v-for="i in 12"
            :id="`article-id-${i}`"
            :key="`article-id-${i}`"
            :ref="articleRefs.set"
            :class="useClsx(
              isVisibleList[i] ? 'animate-fade-in' : 'opacity-0',
              'group relative overflow-hidden border border-gray-6',
              'bg-pureWhite dark:bg-pureBlack hover:shadow-md',
              'rounded-lg border-solid transition-shadow',
            )"
          >
            <div class="aspect-video overflow-hidden">
              <img
                alt="Article Image"
                class="h-full w-full object-cover"
                src="https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              >
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
