<script lang="ts" setup>
import { useElementVisibility } from '@vueuse/core'
import { computed, ref, useTemplateRef, watch } from 'vue'

/** Props */
interface Props {
  img: string
  name: string
  username: string
  body: string
}

defineProps<Props>()

/** 1️⃣ grab a ref to the <figure> */
const target = useTemplateRef<HTMLElement>('target')
const cardSelector = ref('.review-card')

/** 2️⃣ visibility via IntersectionObserver */
const isVisible = useElementVisibility(target, {
  threshold: 0,
  rootMargin: '0px',
})

/** 3️⃣ track when the figure itself is focused */
const isFocused = ref(false)

/** 4️⃣ compute its tabindex */
const tabIndex = computed(() => {
  return isVisible.value ? 0 : -1
})

/** 5️⃣ helper: focus the next card in document order */
function focusNextCard() {
  // grab all cards by their shared selector:
  const cards = Array.from(
    document.querySelectorAll<HTMLElement>(cardSelector.value),
  )
  consola.debug('Focused card', cards)
  const idx = cards.findIndex(el => el === target.value)
  consola.debug('Focused card', idx)
  const next = cards[idx + 1] ?? cards[0] // wrap to first if needed
  consola.debug('Next card', next)
  next.focus()
}

/** 6️⃣ watcher: when I’m focused but become invisible, bump to next card */
watch(
  () => [isFocused.value, isVisible.value] as const,
  ([focused, visible]) => {
    if (focused && !visible) {
      // blur me so I release actual focus
      target.value?.blur()
      // jump to the *next* card instead of your first page control
      focusNextCard()
    }
  },
)

function handleFocus(focused: boolean) {
  isFocused.value = focused
}
</script>

<template>
  <figure
    ref="target"
    :class="useClsx(
      'review-card border border-solid border-gray-3A bg-gray-1A',
      'rounded-xl p-2 sm:p-4 md:p-6 overflow-hidden',
      'focus:outline-none focus:ring focus:ring-mint-10',
      'hover:bg-gray-3A dark:bg-gray-4A dark:hover:bg-gray-6A',
      'relative w-48 sm:w-64 md:w-80 lg:w-92 cursor-pointer',
    )"
    :tabindex="tabIndex"
    @blur="handleFocus(false)"
    @focus="handleFocus(true)"
  >
    <div class="flex flex-row items-center gap-2">
      <img
        :src="img"
        alt="example"
        class="h-6 w-6 rounded-full lg:h-12 lg:w-12 md:h-10 md:w-10 sm:h-7 sm:w-7"
      >
      <div class="flex flex-col">
        <span
          class="geist-regular text-[8px] text-pureBlack font-medium lg:text-base md:text-sm sm:text-xs dark:text-pureWhite"
        >
          {{ name }}
        </span>
        <p class="geist-regular text-[8px] text-pureBlack/40 font-medium lg:text-base md:text-sm sm:text-[10px] dark:text-pureWhite/40">
          {{ username }}
        </p>
      </div>
    </div>
    <blockquote
      class="geist-regular mt-2 text-[10px] text-pureBlack/80 md:mt-4 lg:text-base md:text-sm sm:text-xs dark:text-pureWhite/80"
    >
      {{ body }}
    </blockquote>
  </figure>
</template>
