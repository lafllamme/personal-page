<script setup lang="ts">
import { fonts } from '@/data/fonts.model'
import { newsSectionContent } from './NewsSection.model'

const contentTextFontClass = ref('font-manrope')
const contentTextFontOptions = computed(() => fonts)

const isHeadlinePanelVisible = ref(true)

function cycleContentTextFont() {
  const fontClasses = contentTextFontOptions.value.map(font => font.class)
  const currentFontClass = contentTextFontClass.value
  const currentIndex = fontClasses.indexOf(currentFontClass)
  const nextIndex = currentIndex >= 0
    ? (currentIndex + 1) % fontClasses.length
    : 0

  const nextFontClass = fontClasses[nextIndex]
  contentTextFontClass.value = nextFontClass ?? fontClasses[0] ?? contentTextFontClass.value
}

function handleHeadlineShortcut(event: KeyboardEvent) {
  const target = event.target as HTMLElement | null
  if (target?.closest('input, textarea, select, [contenteditable="true"]'))
    return

  if (event.key.toLowerCase() !== 'v')
    return

  event.preventDefault()
  cycleContentTextFont()
}

onMounted(() => {
  window.addEventListener('keydown', handleHeadlineShortcut)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleHeadlineShortcut)
})
</script>

<template>
  <section class="relative min-h-screen bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <button
      class="fixed right-4 top-[calc(var(--header-height,0px)+1rem)] z-60 border border-pureBlack/25 bg-pureWhite/95 px-3 py-2 text-[10px] font-black tracking-[0.2em] uppercase backdrop-blur-sm dark:border-pureWhite/25 dark:bg-pureBlack/90"
      @click="isHeadlinePanelVisible = !isHeadlinePanelVisible"
    >
      {{ isHeadlinePanelVisible ? 'Hide Text Controls' : 'Show Text Controls' }}
    </button>

    <aside
      v-if="isHeadlinePanelVisible"
      class="fixed right-4 top-[calc(var(--header-height,0px)+3.6rem)] z-50 w-[min(92vw,360px)] border border-pureBlack/25 bg-pureWhite/95 p-4 backdrop-blur-sm dark:border-pureWhite/25 dark:bg-pureBlack/90"
    >
      <div class="mb-3 flex items-center justify-between">
        <h3 class="text-[10px] font-black tracking-[0.3em] uppercase">
          Text Controls
        </h3>
        <div class="flex items-center gap-2">
          <span class="text-[9px] tracking-[0.18em] uppercase opacity-60">Live</span>
          <button
            class="border border-pureBlack/25 px-2 py-1 text-[9px] font-black tracking-[0.16em] uppercase dark:border-pureWhite/25"
            @click="isHeadlinePanelVisible = false"
          >
            Close
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-[10px] font-bold tracking-[0.1em] uppercase">
          News Content Text
        </label>
        <select
          v-model="contentTextFontClass"
          class="w-full border border-pureBlack/25 bg-transparent px-2.5 py-2 text-xs outline-none dark:border-pureWhite/25"
        >
          <option
            v-for="fontOption in contentTextFontOptions"
            :key="fontOption.class"
            :value="fontOption.class"
          >
            {{ fontOption.name }}
          </option>
        </select>
      </div>

      <p class="mt-3 text-[9px] tracking-[0.16em] uppercase opacity-70">
        V wechselt News Content Font
      </p>
    </aside>

    <div class="pointer-events-none absolute inset-y-0 z-30 hidden -inset-x-4 lg:block md:-inset-x-12">
      <div class="absolute inset-x-0 bottom-6 top-3 border border-pureBlack/20 dark:border-pureWhite/20" />

      <div class="absolute inset-y-0 left-0 w-12 border-r border-pureBlack/25 border-solid dark:border-pureWhite/25">
        <div class="sticky top-[calc(var(--header-height,0px)+0.75rem)] h-[calc(100svh-var(--header-height,0px)-1.5rem)] flex items-center justify-center">
          <span class="whitespace-nowrap text-[9px] tracking-[0.35em] -rotate-90">
            {{ newsSectionContent.sideLeft }}
          </span>
        </div>
      </div>

      <div class="absolute inset-y-0 right-0 w-12 border-l border-pureBlack/25 border-solid dark:border-pureWhite/25">
        <div class="sticky top-[calc(var(--header-height,0px)+0.75rem)] h-[calc(100svh-var(--header-height,0px)-1.5rem)] flex items-center justify-center">
          <span class="rotate-90 whitespace-nowrap text-[9px] tracking-[0.35em]">
            {{ newsSectionContent.sideRight }}
          </span>
        </div>
      </div>
    </div>

    <div>
      <header class="border-b border-pureBlack/20 border-solid dark:border-pureWhite/20">
        <div class="mx-auto max-w-[1500px] flex items-center justify-between px-6 py-3 text-[9px] tracking-[0.3em] sm:px-8">
          <span class="font-bold">INSPIRED BY MODERN WEB EXPERIENCES</span>
          <span class="font-bold">{{ newsSectionContent.topBarRightLabel }}</span>
        </div>
      </header>

      <section class="bg-pureBlack px-6 color-pureWhite sm:px-8">
        <div class="mx-auto max-w-[1500px]">
          <div class="grid grid-rows-[1fr_auto_1fr] grid-cols-1 min-h-56 gap-x-2 lg:grid-cols-[minmax(220px,16.5vw)_minmax(0,1fr)_minmax(220px,16.5vw)] lg:min-h-64 xl:gap-x-3">
            <div class="row-start-2 hidden border border-pureWhite/20 px-6 py-7 lg:flex xl:px-7">
              <div class="h-full w-full flex flex-col items-start justify-between">
                <span class="font-recoleta block whitespace-pre-line text-[15px] leading-none tracking-normal uppercase opacity-80">
                  {{ newsSectionContent.straplineLeft }}
                </span>
                <span class="font-druk-bold w-max inline-flex bg-pureWhite px-3 py-1 text-lg color-pureBlack leading-none tracking-wide">
                  EXCLUSIVE EDITION
                </span>
              </div>
            </div>

            <h1 class="font-druk-bold row-start-2 flex items-center self-center justify-center whitespace-nowrap text-center text-[clamp(8rem,12vw,8.6875rem)] leading-[1] lg:col-start-2">
              <span class="block">
                {{ newsSectionContent.masthead }}
              </span>
            </h1>

            <div class="row-start-2 hidden border border-pureWhite/20 px-6 py-7 lg:flex xl:px-7">
              <div class="h-full w-full flex flex-col items-start justify-between">
                <span class="font-recoleta block text-[15px] leading-none tracking-normal uppercase opacity-80">
                  {{ newsSectionContent.straplineRight }}
                </span>
                <span class="font-recoleta block text-[15px] leading-none tracking-normal uppercase opacity-90">
                  SCROLL DOWN ↓
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-[1500px] px-6 py-10 md:px-10 md:py-14">
        <div class="grid gap-5 2xl:grid-cols-[420px_580px_420px] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.28fr)_minmax(0,0.95fr)] xl:grid-cols-[minmax(280px,0.95fr)_minmax(460px,1.28fr)_minmax(280px,0.95fr)]">
          <article class="border-solid space-y-6 lg:border-r lg:border-pureBlack/25 lg:pr-6 dark:lg:border-pureWhite/25">
            <div class="space-y-4">
              <div class="space-grotesk-regular text-[9px] font-black tracking-[0.35em]">
                DESCRIBING MODERN WEB EXPERIENCES
              </div>
              <h2 class="font-druk-bold text-7xl leading-[0.88] xl:text-8xl">
                <span class="inline-block">
                  {{ newsSectionContent.leadTitle }}
                </span>
              </h2>
            </div>

            <div :class="[contentTextFontClass]" class="text-lg color-pureBlack/70 leading-relaxed space-y-4 dark:color-pureWhite/70">
              <p
                v-for="(paragraph, index) in newsSectionContent.leadCopy"
                :key="`lead-${index}`"
                class="font-light"
              >
                {{ paragraph }}
              </p>
            </div>

            <button class="w-full bg-pureBlack py-4 text-[11px] color-pureWhite font-black tracking-[0.24em] transition-opacity dark:bg-pureWhite dark:color-pureBlack hover:opacity-90">
              READ FULL ARTICLE
            </button>

            <div class="border-t border-pureBlack/20 border-solid pt-6 space-y-6 dark:border-pureWhite/20">
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="space-y-1">
                  <p class="space-grotesk-regular text-[8px] color-pureBlack/55 tracking-[0.3em] dark:color-pureWhite/55">
                    AUTHOR
                  </p>
                  <p class="space-grotesk-regular text-[11px] font-bold tracking-[0.08em]">
                    {{ newsSectionContent.leadMeta.author }}
                  </p>
                </div>
                <div class="space-y-1">
                  <p class="space-grotesk-regular text-[8px] color-pureBlack/55 tracking-[0.3em] dark:color-pureWhite/55">
                    PUBLISHED
                  </p>
                  <p class="space-grotesk-regular text-[11px] font-bold tracking-[0.08em]">
                    {{ newsSectionContent.leadMeta.publishedAt }}
                  </p>
                </div>
                <div class="space-y-1">
                  <p class="space-grotesk-regular text-[8px] color-pureBlack/55 tracking-[0.3em] dark:color-pureWhite/55">
                    READING TIME
                  </p>
                  <p class="space-grotesk-regular text-[11px] font-bold tracking-[0.08em]">
                    {{ newsSectionContent.leadMeta.readingTime }}
                  </p>
                </div>
                <div class="space-y-1">
                  <p class="space-grotesk-regular text-[8px] color-pureBlack/55 tracking-[0.3em] dark:color-pureWhite/55">
                    CATEGORY
                  </p>
                  <p class="space-grotesk-regular text-[11px] font-bold tracking-[0.08em]">
                    {{ newsSectionContent.leadMeta.category }}
                  </p>
                </div>
              </div>

              <div class="space-y-3">
                <h3 class="space-grotesk-regular text-[9px] tracking-[0.26em]">
                  KEY TAKEAWAYS
                </h3>
                <ul :class="[contentTextFontClass]" class="space-y-2 text-sm color-pureBlack/75 dark:color-pureWhite/75">
                  <li
                    v-for="(takeaway, index) in newsSectionContent.leadTakeaways"
                    :key="`takeaway-${index}`"
                    class="flex gap-2 leading-relaxed"
                  >
                    <span class="mt-[0.48rem] h-1 w-1 flex-none rounded-full bg-pureBlack/55 dark:bg-pureWhite/55" />
                    <span>{{ takeaway }}</span>
                  </li>
                </ul>
              </div>

              <div class="space-y-3">
                <h3 class="space-grotesk-regular text-[9px] tracking-[0.26em]">
                  RELATED TOPICS
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="topic in newsSectionContent.leadTopics"
                    :key="topic"
                    class="space-grotesk-regular inline-flex border border-pureBlack/30 border-solid px-2.5 py-1 text-[9px] tracking-[0.2em] dark:border-pureWhite/30"
                  >
                    {{ topic }}
                  </span>
                </div>
              </div>
            </div>
          </article>

          <article class="border-solid space-y-4 lg:border-r lg:border-pureBlack/25 lg:px-4 lg:pr-6 dark:lg:border-pureWhite/25">
            <div class="relative aspect-[3/2] overflow-hidden">
              <video
                class="h-full w-full object-cover"
                src="https://i.imgur.com/FXgSiNd.mp4"
                autoplay
                loop
                muted
                playsinline
              />
            </div>

            <div class="text-center space-y-2">
              <h3 class="font-druk-bold text-7xl leading-[0.9] xl:text-8xl">
                <span class="inline-block">
                  NO MORE!
                </span>
              </h3>
              <p class="space-grotesk-regular text-[9px] color-pureBlack/55 tracking-[0.28em] dark:color-pureWhite/55">
                EXCLUSIVE INSIGHTS • DEEP DIVE
              </p>
            </div>

            <div class="space-y-4">
              <div class="border border-pureBlack/20 border-solid px-4 py-4 dark:border-pureWhite/20">
                <div class="grid grid-cols-2 gap-x-4 gap-y-3">
                  <div>
                    <p class="space-grotesk-regular text-[8px] color-pureBlack/55 tracking-[0.28em] dark:color-pureWhite/55">
                      ISSUE
                    </p>
                    <p class="space-grotesk-regular mt-1 text-[11px] font-bold tracking-[0.1em]">
                      {{ newsSectionContent.featurePanel.issue }}
                    </p>
                  </div>
                  <div>
                    <p class="space-grotesk-regular text-[8px] color-pureBlack/55 tracking-[0.28em] dark:color-pureWhite/55">
                      LOCATION
                    </p>
                    <p class="space-grotesk-regular mt-1 text-[11px] font-bold tracking-[0.1em]">
                      {{ newsSectionContent.featurePanel.location }}
                    </p>
                  </div>
                  <div>
                    <p class="space-grotesk-regular text-[8px] color-pureBlack/55 tracking-[0.28em] dark:color-pureWhite/55">
                      UPDATED
                    </p>
                    <p class="space-grotesk-regular mt-1 text-[11px] font-bold tracking-[0.1em]">
                      {{ newsSectionContent.featurePanel.updatedAt }}
                    </p>
                  </div>
                  <div>
                    <p class="space-grotesk-regular text-[8px] color-pureBlack/55 tracking-[0.28em] dark:color-pureWhite/55">
                      STATUS
                    </p>
                    <p class="space-grotesk-regular mt-1 text-[11px] font-bold tracking-[0.1em]">
                      {{ newsSectionContent.featurePanel.status }}
                    </p>
                  </div>
                </div>
              </div>

              <blockquote class="border-y border-pureBlack/20 border-solid py-5 text-center dark:border-pureWhite/20">
                <p class="font-recoleta text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.25] italic">
                  "{{ newsSectionContent.featurePanel.quote }}"
                </p>
              </blockquote>

              <div class="grid grid-cols-3 gap-3">
                <div
                  v-for="signal in newsSectionContent.featureSignals"
                  :key="signal.label"
                  class="border border-pureBlack/20 border-solid px-3 py-3 text-center dark:border-pureWhite/20"
                >
                  <p class="space-grotesk-regular text-[8px] color-pureBlack/55 tracking-[0.26em] dark:color-pureWhite/55">
                    {{ signal.label }}
                  </p>
                  <p class="font-druk-bold mt-1 text-3xl leading-none">
                    {{ signal.value }}
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article class="space-y-8">
            <h2 class="font-druk-bold text-7xl leading-[0.88] xl:text-8xl">
              <span class="inline-block">
                {{ newsSectionContent.rightTitle }}
              </span>
            </h2>

            <div class="border-2 border-pureBlack border-solid px-4 py-8 text-center dark:border-pureWhite">
              <div class="text-[clamp(4rem,11vw,8rem)] font-black leading-none tracking-tight">
                {{ newsSectionContent.score }}
              </div>
            </div>
            <p class="space-grotesk-regular text-center text-[9px] color-pureBlack/55 tracking-[0.33em] dark:color-pureWhite/55">
              VERSION RELEASE
            </p>

            <div class="border-t border-pureBlack/25 border-solid pt-6 dark:border-pureWhite/25">
              <h3 class="space-grotesk-regular mb-4 text-base tracking-[0.2em]">
                LATEST HEADLINES
              </h3>

              <div
                v-for="item in newsSectionContent.ticker"
                :key="item.id"
                class="border-b border-pureBlack/15 border-solid py-4 last:border-b-0 dark:border-pureWhite/15"
              >
                <div class="space-grotesk-regular mb-2 text-[9px] color-pureBlack/55 tracking-[0.24em] dark:color-pureWhite/55">
                  {{ item.tag }}
                </div>
                <h4 class="font-druk-bold text-3xl leading-normal tracking-normal">
                  {{ item.title }}
                </h4>
                <p :class="[contentTextFontClass]" class="mt-2 text-sm color-pureBlack/70 leading-relaxed dark:color-pureWhite/70">
                  {{ item.excerpt }}
                </p>
              </div>
            </div>
          </article>
        </div>

        <div class="mt-14 pt-6">
          <div class="h-px w-full bg-pureBlack/70 dark:bg-pureWhite/70" />
          <div class="mt-6 flex items-center justify-center gap-4">
            <div class="h-px flex-1 bg-pureBlack/20 dark:bg-pureWhite/20" />
            <p class="space-grotesk-regular text-[9px] color-pureBlack/55 font-bold tracking-[0.3em] dark:color-pureWhite/55">
              {{ newsSectionContent.bottomLabel }}
            </p>
            <div class="h-px flex-1 bg-pureBlack/20 dark:bg-pureWhite/20" />
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
