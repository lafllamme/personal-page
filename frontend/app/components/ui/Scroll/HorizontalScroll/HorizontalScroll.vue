<script setup lang="ts">
import { animate, scroll, spring } from 'motion-v'

interface HorizontalScrollItem {
  title: string
  imageUrl: string
}

const items: HorizontalScrollItem[] = [
  {
    title: 'DISCOVER',
    imageUrl: 'https://i.imgur.com/HYs39g6.png',
  },
  {
    title: 'DESIGN',
    imageUrl: 'https://i.imgur.com/7fU3K9f.png',
  },
  {
    title: 'BUILD',
    imageUrl: 'https://i.imgur.com/O0HAWKr.png',
  },
  {
    title: 'REVIEW',
    imageUrl: 'https://i.imgur.com/I5mAdz0.pngp',
  },
  {
    title: 'SHIP',
    imageUrl: 'https://i.imgur.com/L3X22Xi.png',
  },
]

const ulRef = ref<HTMLUListElement | null>(null)
const scrollSectionRef = ref<HTMLElement | null>(null)
const headerRefs = ref<(HTMLElement | null)[]>([])
const cleanupFns: Array<() => void> = []
useHeaderVisibility({
  sectionRef: scrollSectionRef,
})
function slideThemeClasses(index: number) {
  const isEven = index % 2 === 0
  return isEven
    ? 'bg-pureBlack text-pureWhite dark:bg-pureWhite dark:text-pureBlack'
    : 'bg-pureWhite text-pureBlack dark:bg-pureBlack dark:text-pureWhite'
}

onMounted(async () => {
  await nextTick()

  if (!ulRef.value || !scrollSectionRef.value)
    return

  const listItems = ulRef.value.querySelectorAll('li')
  const itemCount = listItems.length

  if (itemCount === 0)
    return

  const controls = animate(
    ulRef.value,
    {
      transform: ['none', `translateX(-${itemCount - 1}00vw)`],
    },
    { easing: spring() },
  )

  cleanupFns.push(scroll(controls, { target: scrollSectionRef.value }))
  cleanupFns.push(() => controls.stop())

  const segmentLength = 1 / itemCount

  headerRefs.value.forEach((header, index) => {
    if (!header)
      return

    const control = animate(header, { x: [800, -800] })
    cleanupFns.push(
      scroll(control, {
        target: scrollSectionRef.value as HTMLElement,
        offset: [
          [index * segmentLength, 1],
          [(index + 1) * segmentLength, 0],
        ],
      }),
    )
    cleanupFns.push(() => control.stop())
  })
})

onBeforeUnmount(() => {
  cleanupFns.forEach(stop => stop())
  cleanupFns.length = 0
})
</script>

<template>
  <article class="relative mx-[calc(50%-50svw)] w-[100svw] bg-pureWhite dark:bg-pureBlack">
    <!-- Hidden SVG with clipPath definitions -->
    <svg class="clipppy absolute h-0 w-0 -left-[999px] -top-[999px]">
      <defs>
        <clipPath id="clip-horizontal-scroll" clipPathUnits="objectBoundingBox">
          <path
            d="M0.401463 0.0407795L0.0407795 0.401463C0.0146671 0.427608 0 0.463048 0 0.5C0 0.536952 0.0146671 0.572392 0.0407795 0.598537L0.401463 0.95922C0.427608 0.985333 0.463048 1 0.5 1C0.536952 1 0.572392 0.985333 0.598537 0.95922L0.95922 0.598537C0.985333 0.572392 1 0.536952 1 0.5C1 0.463048 0.985333 0.427608 0.95922 0.401463L0.598537 0.0407795C0.572392 0.0146671 0.536952 0 0.5 0C0.463048 0 0.427608 0.0146671 0.401463 0.0407795Z"
            fill="#D9D9D9"
          />
        </clipPath>
      </defs>
    </svg>

    <div class="pointer-events-none h-[16vh] w-full from-pureWhite to-transparent bg-gradient-to-b dark:from-pureBlack dark:to-transparent" />

    <section ref="scrollSectionRef" class="relative h-[500svh]">
      <ul ref="ulRef" class="sticky top-0 m-0 flex flex-nowrap list-none p-0 will-change-transform">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="relative h-[100svh] w-[100svw] flex flex-none items-center justify-center overflow-hidden"
          :class="slideThemeClasses(index)"
        >
          <h2
            :ref="(el) => { if (el) headerRefs[index] = el as HTMLElement }"
            class="font-nohemi relative bottom-5 inline-block text-[20vw] font-semibold"
          >
            {{ item.title }}
          </h2>
          <figure
            class="absolute bottom-0 w-[380px] 2xl:w-[550px]"
            style="clip-path: url(#clip-horizontal-scroll);"
          >
            <NuxtImg
              :src="item.imageUrl"
              :alt="item.title"
              :width="500"
              :height="500"
              class="aspect-4/5 min-h-full w-full cursor-pointer select-none object-cover align-bottom transition-all duration-300 hover:scale-105"
              loading="lazy"
            />
          </figure>
        </li>
      </ul>
    </section>

    <footer class="grid h-[80svh] place-content-center bg-pureWhite color-pureBlack font-medium dark:bg-pureBlack dark:color-pureWhite">
      <p class="font-mondea text-[4vw] tracking-wide uppercase">
        Feel the
        <a
          target="_blank"
          href="https://twitter.com/mattgperry"
          class="underline"
          rel="noopener noreferrer"
        >
          Motion
        </a>
      </p>
    </footer>
  </article>
</template>
