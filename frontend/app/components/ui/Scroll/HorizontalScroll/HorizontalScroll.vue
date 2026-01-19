<script setup lang="ts">
import { useEventListener, useThrottleFn } from '@vueuse/core'
import { animate, scroll, spring } from 'motion-v'

interface HorizontalScrollItem {
  title: string
  imageUrl: string
}

const items: HorizontalScrollItem[] = [
  {
    title: 'PASSION',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop',
  },
  {
    title: 'WORK',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop',
  },
  {
    title: 'MOTIVATION',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=600&fit=crop',
  },
  {
    title: 'INSPIRATION',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=600&fit=crop',
  },
  {
    title: 'BELIVE',
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=600&fit=crop',
  },
]

const ulRef = ref<HTMLUListElement | null>(null)
const scrollSectionRef = ref<HTMLElement | null>(null)
const headerRefs = ref<(HTMLElement | null)[]>([])
const cleanupFns: Array<() => void> = []
const headerHidden = useState<boolean>('osmo-header-hidden', () => false)

function getHeaderOffset(): number {
  if (!import.meta.client)
    return 0

  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-height').trim()
  const parsed = Number.parseFloat(raw)
  return Number.isFinite(parsed) ? parsed + 16 : 96
}

const updateHeaderVisibility = useThrottleFn(() => {
  const section = scrollSectionRef.value
  if (!section) {
    headerHidden.value = false
    return
  }

  const rect = section.getBoundingClientRect()
  const offset = getHeaderOffset()
  const isCoveringHeader = rect.top <= offset && rect.bottom >= offset

  headerHidden.value = isCoveringHeader
}, 80)
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

  updateHeaderVisibility()
  useEventListener(window, 'scroll', updateHeaderVisibility, { passive: true })
  useEventListener(window, 'resize', updateHeaderVisibility, { passive: true })
})

onBeforeUnmount(() => {
  cleanupFns.forEach(stop => stop())
  cleanupFns.length = 0
  headerHidden.value = false
})
</script>

<template>
  <article class="relative mx-[calc(50%-50vw)] w-screen bg-pureWhite dark:bg-pureBlack">
    <div class="pointer-events-none h-[16vh] w-full from-pureWhite to-transparent bg-gradient-to-b dark:from-pureBlack dark:to-transparent" />

    <section ref="scrollSectionRef" class="relative h-[500vh]">
      <ul ref="ulRef" class="sticky top-0 m-0 flex flex-nowrap list-none p-0 will-change-transform">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="relative h-screen w-screen flex flex-none items-center justify-center overflow-hidden"
          :class="slideThemeClasses(index)"
        >
          <h2
            :ref="(el) => { if (el) headerRefs[index] = el as HTMLElement }"
            class="relative bottom-5 inline-block text-[20vw] font-semibold"
          >
            {{ item.title }}
          </h2>
          <NuxtImg
            :src="item.imageUrl"
            :alt="item.title"
            :width="500"
            :height="500"
            class="pointer-events-none absolute bottom-0 w-[380px] select-none 2xl:w-[550px]"
            loading="lazy"
          />
        </li>
      </ul>
    </section>

    <footer class="grid h-[80vh] place-content-center bg-pureWhite color-pureBlack font-medium dark:bg-pureBlack dark:color-pureWhite">
      <p>
        Inspired By
        <a
          target="_blank"
          href="https://twitter.com/mattgperry"
          class="underline"
          rel="noopener noreferrer"
        >
          Matt Perry
        </a>
      </p>
    </footer>
  </article>
</template>
