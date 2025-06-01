<script setup>
import { useIntersectionObserver } from '@vueuse/core'
import { onMounted, ref } from 'vue'

const numArticles = 12
const imageRefs = Array.from({ length: numArticles }, () => ref(null))
const inViewStates = Array.from({ length: numArticles }, () => ref(false))

onMounted(() => {
  imageRefs.forEach((elRef, idx) => {
    useIntersectionObserver(
      elRef,
      ([{ isIntersecting }]) => {
        inViewStates[idx].value = isIntersecting
      },
      {
        threshold: 0.25,
      },
    )
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
            v-for="i in numArticles"
            :id="`article-id-${i}`"
            :key="i"
            class="group relative overflow-hidden border border-gray-6 rounded-lg border-solid bg-pureWhite transition-shadow dark:bg-pureBlack hover:shadow-md"
          >
            <div class="aspect-video overflow-hidden">
              <div
                :ref="imageRefs[i - 1]"
                :class="[
                  { 'blur-0 scale-100 opacity-100': inViewStates[i - 1] },
                ]"
                class="h-full w-full scale-110 opacity-0 blur-[30px] transition-all duration-700 ease-out"
              >
                <img
                  alt="Article Image"
                  class="h-full w-full object-cover"
                  src="https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                >
              </div>
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

.ethereal-cascade {
  animation: etherealCascade 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.prismatic-emergence {
  animation: prismaticEmergence 1.4s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

.quantum-materialize {
  animation: quantumMaterialize 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.celestial-unfold {
  animation: celestialUnfold 1.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.dimensional-shift {
  animation: dimensionalShift 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

@keyframes etherealCascade {
  0% {
    opacity: 0;
    transform: translateY(60px) rotateX(15deg);
    filter: blur(10px);
  }
  60% {
    opacity: 0.8;
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotateX(0);
    filter: blur(0);
  }
}

@keyframes prismaticEmergence {
  0% {
    opacity: 0;
    transform: scale(0.8) rotateY(-15deg) translateX(-30px);
  }
  50% {
  }
  100% {
    opacity: 1;
    transform: scale(1) rotateY(0) translateX(0);
  }
}

@keyframes quantumMaterialize {
  0% {
    opacity: 0;
    transform: scale(0.3) rotate(180deg);
    filter: brightness(3) contrast(2);
  }
  30% {
    opacity: 0.3;
    transform: scale(0.7) rotate(90deg);
    filter: brightness(2) contrast(1.5);
  }
  70% {
    opacity: 0.8;
    transform: scale(1.05) rotate(10deg);
    filter: brightness(1.2) contrast(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
    filter: brightness(1) contrast(1);
  }
}

@keyframes celestialUnfold {
  0% {
    opacity: 0;
    transform: perspective(1000px) rotateX(90deg) translateZ(-100px);
    transform-origin: bottom;
  }
  40% {
    opacity: 0.6;
    transform: perspective(1000px) rotateX(45deg) translateZ(-50px);
  }
  80% {
    opacity: 0.9;
    transform: perspective(1000px) rotateX(5deg) translateZ(-10px);
  }
  100% {
    opacity: 1;
    transform: perspective(1000px) rotateX(0deg) translateZ(0);
  }
}

@keyframes dimensionalShift {
  0% {
    opacity: 0;
    transform: perspective(1000px) rotateY(90deg) rotateX(45deg) translateZ(200px);
    filter: blur(8px);
  }
  25% {
    opacity: 0.3;
    transform: perspective(1000px) rotateY(45deg) rotateX(22deg) translateZ(100px);
    filter: blur(4px);
  }
  60% {
    opacity: 0.8;
    transform: perspective(1000px) rotateY(10deg) rotateX(5deg) translateZ(20px);
    filter: blur(1px);
  }
  100% {
    opacity: 1;
    transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0);
    filter: blur(0);
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
