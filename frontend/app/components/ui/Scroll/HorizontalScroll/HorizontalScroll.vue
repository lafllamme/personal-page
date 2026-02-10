<script setup lang="ts">
import { animate, scroll, spring } from 'motion-v'

interface HorizontalScrollItem {
  title: string
  subtitle?: string
  description?: string
  imageUrl: string
}

const items: HorizontalScrollItem[] = [
  {
    title: 'EXPLORE',
    imageUrl: 'https://i.imgur.com/o8ch4y7.jpeg',
  },
  {
    title: 'DESIGN',
    imageUrl: 'https://i.imgur.com/Nd4xs6g.jpeg',
  },
  {
    title: 'MOTIVATION',
    imageUrl: 'https://i.imgur.com/zMvrbgk.jpeg',
  },
  {
    title: 'INSPIRATION',
    imageUrl: 'https://i.imgur.com/ej73kzL.jpeg',
  },
  {
    title: 'DELIVERY',
    imageUrl: 'https://i.imgur.com/GSwURfo.jpeg',
  },
]

const imageMaskStyle = { clipPath: 'url(#clip-selected)' }

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

  const listItems = Array.from(ulRef.value.children) as HTMLLIElement[]
  const itemCount = listItems.length

  if (itemCount === 0)
    return

  const section = scrollSectionRef.value
  if (!section)
    return

  const controls = animate(
    ulRef.value,
    {
      transform: ['none', `translateX(-${(itemCount - 1) * 100}svw)`],
    },
    { easing: spring() },
  )

  cleanupFns.push(scroll(controls, { target: section }))
  cleanupFns.push(() => controls.stop())

  const segmentLength = 1 / itemCount
  const headers = listItems.map(item => item.querySelector('h2'))

  headers.forEach((header, index) => {
    if (!header)
      return

    const control = animate(header, { x: [800, -800] }, { easing: 'linear' })

    cleanupFns.push(
      scroll(control, {
        target: section,
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
        <clipPath id="clip-selected" clipPathUnits="objectBoundingBox">
          <path
            d="M 256 256 L 178 256 C 150.386 256 128 233.614 128 206 L 128 256 L 0 256 L 0 192 C 0 156.654 28.654 128 64 128 C 99.346 128 128 156.654 128 192 L 128 128 L 256 128 Z M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z"
            transform="scale(0.00390625)"
            fill="black"
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
            class="font-nohemi relative bottom-5 z-30 inline-block text-[clamp(4.5rem,24vw,20rem)] font-semibold leading-[0.9] will-change-transform"
          >
            {{ item.title }}
          </h2>
          <figure
            aria-hidden="true"
            class="absolute bottom-0 left-1/2 z-20 aspect-square w-[clamp(250px,68vw,500px)] lg:w-[clamp(220px,28vw,420px)] sm:w-[clamp(260px,52vw,500px)] -translate-x-1/2"
            :style="imageMaskStyle"
          >
            <NuxtImg
              :src="item.imageUrl"
              alt=""
              :width="1200"
              :height="1200"
              :loading="index === 0 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
              sizes="(max-width: 640px) 68vw, (max-width: 1024px) 52vw, 28vw"
              class="h-full w-full select-none object-cover align-bottom transition-transform duration-300 hover:scale-105 motion-reduce:transform-none"
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
