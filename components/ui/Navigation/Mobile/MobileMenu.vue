<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

const props = defineProps<{
  items: Array<{ label: string, href: string }>
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close', value: boolean): void
}>()

const { isOpen } = toRefs(props)
const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerMD = computed(() => breakpoints.smaller('md').value)

// Compute animation delay based on index
function getAnimationDelay(index: number) {
  return `${index * 0.1}s`
}

function handleClick() {
  consola.debug('[Menu] => Emit close', !isOpen.value)
  emit('close', !isOpen.value)
}
</script>

<template>
  <div>
    <!-- Desktop Menu (Slide from left) -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 -translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-300"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-full"
    >
      <nav
        v-if="isOpen && !smallerMD"
        class="fixed left-0 top-0 z-40 h-screen w-64 bg-pureWhite pt-5 shadow-lg dark:bg-pureBlack"
      >
        <div class="border-gray-100 flex justify-end border-b px-5 pb-5">
          <button
            class="hover:bg-gray-100 rounded-full p-2 transition-colors"
            @click="handleClick"
          >
            ✕
          </button>
        </div>

        <ul class="m-0 list-none p-0">
          <li
            v-for="(item, index) in items"
            :key="item.label"
            :style="{ animationDelay: getAnimationDelay(index) }"
            class="animate-slide-in opacity-0"
          >
            <a
              :href="item.href"
              class="text-gray-700 hover:bg-gray-50 mx-2 my-1 block rounded-lg px-5 py-3 decoration-none transition-all hover:translate-x-1"
              @click="handleClick"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>
    </Transition>

    <!-- Mobile Menu (Slide from top) -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 -translate-y-full"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-full"
    >
      <div
        v-if="isOpen && smallerMD"
        class="fixed inset-0 top-15 z-40 bg-pureWhite shadow-lg dark:bg-pureBlack"
      >
        <ul class="m-0 list-none bg-pureWhite p-0 dark:bg-pureBlack">
          <li
            v-for="(item, index) in items"
            :key="item.label"
            :style="{ animationDelay: getAnimationDelay(index) }"
            class="animate-fade-down opacity-0"
          >
            <a
              :href="item.href"
              class="text-gray-700 hover:bg-gray-50 mx-2 my-1 block rounded-lg px-5 py-3 decoration-none transition-all"
              @click="handleClick"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style>
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.5s ease forwards;
}

.animate-fade-down {
  animation: fade-down 0.5s ease forwards;
}
</style>
