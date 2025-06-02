<script lang="ts" setup>
import CardSpotlight from '@/components/ui/Card/CardSpotlight/CardSpotlight.vue'
import Link from '@/components/ui/Link/Link.vue'

const articleRefs = useTemplateRefsList()
const isVisibleList = ref(Array.from({ length: 12 }).fill(false))

consola.debug('[Blog] =>', articleRefs.value)
onMounted(() => {
  articleRefs.value.forEach((el, idx) => {
    if (el) {
      // check if the el was already visible
      const { hasBeenVisible } = useElementVisiblePercent(el as HTMLElement, 50)
      watch(
        hasBeenVisible,
        (visible) => {
          if (visible) {
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
  <div class="min-h-screen flex flex-col">
    <!-- Featured Articles Section -->
    <section>
      <div class="mx-auto px-4">
        <div class="mb-12 flex flex-col animate-fade-in items-start justify-between md:flex-row md:items-end">
          <div>
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

        <!-- Card View -->
        <div class="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
          <CardSpotlight
            v-for="i in 12"
            :id="`article-id-${i}`"
            :key="`article-id-${i}`"
            :ref="articleRefs.set"
            :class="useClsx(
              'border border-solid border-gray-6 hover:border-[#A0CEC2] dark:hover:border-[#385C54]',
              'transition-colors transition-shadow duration-300 ease-in-out',
              isVisibleList[i] ? 'ethereal-cascade' : 'opacity-0',
              'group relative overflow-hidden rounded-lg',
              'bg-pureWhite dark:bg-pureBlack',
              'shadow-2xl shadow-gray-6A',
            )"
          >
            <!-- Image Wrapper -->
            <div class="aspect-video overflow-hidden">
              <img
                alt="Article Image"
                class="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                src="https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              >
            </div>
            <!-- Card Content -->

            <div class="p-6 transition-colors duration-300 ease-out">
              <h3 class="geist-regular mb-2 text-xl color-pureBlack font-medium dark:color-pureWhite !font-semibold">
                The Rise of AI in Modern Development
              </h3>
              <p class="mb-2 text-pretty color-gray-10 font-light">
                How artificial intelligence is transforming the way we build and interact with technology.
              </p>
              <div class="mb-3 flex text-sm text-gray-11 font-200 space-x-6">
                <div class="flex items-center space-x-2">
                  <Icon
                    class="mt-px size-4 color-gray-10 group-hover:color-gray-12"
                    name="ri:calendar-2-line"
                  />
                  <p>May {{ i }}, 2024</p>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon
                    class="size-4 color-gray-10 group-hover:color-gray-12"
                    name="ri:user-3-line"
                  />
                  <p>Dr. Lex Icon</p>
                </div>
              </div>
              <div class="flex items-center space-x-1.5">
                <Link
                  :underline="false"
                  class="text-base color-gray-12 font-semibold"
                  href="#"
                >
                  Read More
                </Link>
                <Icon
                  class="size-5 color-gray-8 transition-all duration-200 group-hover:translate-x-1 group-focus-visible:color-mint-11A group-hover:color-mint-11A"
                  name="ri:arrow-right-line"
                />
              </div>
            </div>
          </CardSpotlight>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ethereal-cascade {
  animation: etherealCascade 0.9s linear forwards;
}

@keyframes etherealCascade {
  0% {
    opacity: 0;
    transform: translateY(80px) rotateX(20deg);
    filter: blur(12px);
  }
  15% {
    opacity: 0.15;
    transform: translateY(68px) rotateX(17deg);
    filter: blur(10px);
  }
  30% {
    opacity: 0.35;
    transform: translateY(50px) rotateX(12deg);
    filter: blur(7px);
  }
  45% {
    opacity: 0.55;
    transform: translateY(32px) rotateX(8deg);
    filter: blur(4px);
  }
  60% {
    opacity: 0.75;
    transform: translateY(18px) rotateX(4deg);
    filter: blur(2px);
  }
  75% {
    opacity: 0.88;
    transform: translateY(8px) rotateX(1.5deg);
    filter: blur(1px);
  }
  90% {
    opacity: 0.96;
    transform: translateY(2px) rotateX(0.3deg);
    filter: blur(0.3px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotateX(0);
    filter: blur(0);
  }
}
</style>
