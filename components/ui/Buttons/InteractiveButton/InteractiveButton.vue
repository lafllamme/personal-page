<script lang="ts" setup>
import { ref } from 'vue'

interface Props {
  text?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Button',
})

const { class: classNames } = toRefs(props)

const buttonRef = ref<HTMLButtonElement>()
</script>

<template>
  <button
    ref="buttonRef"
    :class="
      useClsx(
        'focus-visible:ring focus-visible:ring-offset-4 focus-visible:ring-offset-pureBlack dark:focus-visible:ring-offset-pureWhite',
        'focus-visible:outline-none focus-visible:ring-transparent',
        'group relative w-auto cursor-pointer overflow-hidden',
        'rounded-full border border-gray-6 p-2 px-6',
        'bg-pureWhite dark:bg-pureBlack',
        'text-center font-semibold touch-manipulation',
        classNames,
      )
    "
    tabindex="0"
    type="button"
  >
    <!-- TODO: Correct syntax of div here   -->
    <div aria-hidden="true" class="flex items-center gap-2">
      <!-- 1st Content -->
      <div
        :class="useClsx(
          'group-hover:scale-[100.8] group-focus:scale-[100.8] ',
          'bg-pureBlack dark:bg-pureWhite transition-all duration-300',
          'size-2 scale-100 rounded-lg',
        )"
      />
      <span
        :class="useClsx(
          'inline-block whitespace-nowrap text-pureBlack dark:text-pureWhite ',
          'transition-all duration-300 group-hover:translate-x-12',
          'group-hover:opacity-0 group-focus:opacity-0',
        )"
      >
        {{ text }}
      </span>
    </div>

    <!-- 2nd Content -->
    <div
      :class="useClsx(
        'text-primary-foreground opacity-0 transition-all duration-300',
        'flex translate-x-12 items-center justify-center gap-2',
        'group-hover:opacity-100 group-hover:-translate-x-5',
        'group-focus:opacity-100 group-focus:-translate-x-5',
        'absolute top-0 z-10 size-full',
      )"
    >
      <span class="whitespace-nowrap">{{ text }}</span>
      <Icon class="size-6" name="lucide:arrow-right" />
    </div>
  </button>
</template>
