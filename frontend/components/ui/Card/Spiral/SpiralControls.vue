<script setup lang="ts">
import { computed } from 'vue'

// Props mirror those in the original React component.
const props = defineProps<{
  currentIndex: number
  totalPosts: number
  onPrev: () => void
  onNext: () => void
}>()

// Pad the current index and total count with a leading zero if necessary.
const paddedCurrent = computed(() => String(props.currentIndex + 1).padStart(2, '0'))
const paddedTotal = computed(() => String(props.totalPosts).padStart(2, '0'))

// Wrap the provided callbacks to ensure we can call them from our template.
function handlePrev() {
  props.onPrev?.()
}

function handleNext() {
  props.onNext?.()
}
</script>

<template>
  <div class="absolute right-8 top-22 z-40 flex flex-col items-end space-y-6">
    <!-- Floating controls for navigating the spiral -->
    <div
      :class="useClsx(
        'text-center color-pureBlack dark:color-pureWhite font-mono',
        'transition-opacity duration-300',
      )"
    >
      <span class="block text-7xl font-extrabold leading-none">
        {{ paddedCurrent }}
      </span>
      <span class="mt-1 block text-xl opacity-70">
        / {{ paddedTotal }}
      </span>
    </div>

    <div class="flex space-x-4">
      <button
        :class="useClsx(
          'size-16 flex items-center justify-center',
          'border-2 border-solid border-pureBlack dark:border-pureWhite rounded-full',
          'transition-all duration-300 hover:bg-sand-7',
        )"
        @click="handlePrev"
      >
        <!-- Left arrow icon -->
        <Icon
          name="mdi:arrow-left"
          class="size-10 color-pureBlack dark:color-pureWhite"
        />
      </button>
      <button
        :class="useClsx(
          'size-16 flex items-center justify-center',
          'border-2 border-solid border-pureBlack dark:border-pureWhite rounded-full',
          'transition-all duration-300 hover:bg-sand-7',
        )"
        @click="handleNext"
      >
        <Icon
          name="mdi:arrow-right"
          class="size-10 color-pureBlack dark:color-pureWhite"
        />
      </button>
    </div>
  </div>
</template>
