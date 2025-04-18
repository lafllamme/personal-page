<script lang="ts" setup>
import { useElementBounding, useElementVisibility, useScroll } from '@vueuse/core'
import { onMounted, ref, useTemplateRef } from 'vue'

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

/** 2️⃣ track its visibility */
const isVisible = useElementVisibility(target, {
  threshold: 0,
  rootMargin: '0px',
})
const tabIndex = ref(-1)
/** 3️⃣ grab its bounding for centering math */
const { left, width } = useElementBounding(target)

/** helper: find nearest horizontal scroller */
function getScrollParent(el: HTMLElement): HTMLElement | Window {
  let p: HTMLElement | null = el.parentElement
  while (p && p !== document.body) {
    const style = getComputedStyle(p)
    if ((style.overflowX === 'auto' || style.overflowX === 'scroll')
      && p.scrollWidth > p.clientWidth) {
      return p
    }
    p = p.parentElement
  }
  return window
}

/** 4️⃣ once mounted, detect scroll container & wire up VueUse’s useScroll */
const scrollParent = ref<HTMLElement | Window>(window)
onMounted(() => {
  if (target.value) {
    scrollParent.value = getScrollParent(target.value)
  }
})
// reactive `{ x, y }`, with smooth behavior
const { x } = useScroll(scrollParent, { behavior: 'smooth' })

/** on focus: if off-screen, set x.value to center us horizontally */
function onFocus() {
  if (!isVisible.value && target.value) {
    const containerWidth
        = scrollParent.value === window
          ? window.innerWidth
          : (scrollParent.value as HTMLElement).clientWidth

    // center the card:
    x.value = left.value + width.value / 2 - containerWidth / 2
  }
}

watch(isVisible, (visible) => {
  if (visible) {
    tabIndex.value = -1
  }
  else {
    tabIndex.value = 0
  }
})
</script>

<template>
  <figure
    ref="target"
    :class="useClsx(
      'relative w-48 sm:w-64 md:w-80 lg:w-92 cursor-pointer',
      'border border-solid border-gray-3A bg-gray-1A hover:bg-gray-3A dark:bg-gray-4A dark:hover:bg-gray-6A',
      'rounded-xl p-2 sm:p-4 md:p-6 overflow-hidden',
      'focus:outline-none focus:ring focus:ring-mint-10',
    )"
    :tabindex="tabIndex"
    @focus="onFocus"
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
