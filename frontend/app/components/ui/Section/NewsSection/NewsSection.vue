<script setup lang="ts">
import { fonts } from '@/data/fonts.model'
import { newsSectionContent } from './NewsSection.model'

const contentTextFontClass = ref('font-druk-bold')
const contentTextFontOptions = computed(() => fonts)
const contentTextFontName = computed(() =>
  contentTextFontOptions.value.find(font => font.class === contentTextFontClass.value)?.name ?? contentTextFontClass.value,
)

const mastheadFontClass = 'font-druk-bold'
const mastheadMinSize = 3.2
const mastheadFluidSize = '14vw'
const mastheadMaxSize = ref(18)
const isHeadlinePanelVisible = ref(true)
const mastheadMaxSizeLabel = computed(() => `${mastheadMaxSize.value.toFixed(1)}rem`)
</script>

<template>
  <section class="relative min-h-screen bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <button
      class="fixed right-4 top-[calc(var(--header-height,0px)+1rem)] z-60 border border-pureBlack/25 bg-pureWhite/95 px-3 py-2 text-[10px] font-black tracking-[0.2em] uppercase backdrop-blur-sm dark:border-pureWhite/25 dark:bg-pureBlack/90"
      @click="isHeadlinePanelVisible = !isHeadlinePanelVisible"
    >
      {{ isHeadlinePanelVisible ? 'Hide Text Controls' : 'Show Text Controls' }}
    </button>

    <div
      v-if="!isHeadlinePanelVisible"
      class="fixed right-4 top-[calc(var(--header-height,0px)+3.6rem)] z-60 w-[min(92vw,360px)] border border-pureBlack/25 bg-pureWhite/95 px-3 py-2 backdrop-blur-sm dark:border-pureWhite/25 dark:bg-pureBlack/90"
    >
      <div class="text-[9px] tracking-[0.16em] uppercase opacity-70">
        Content Text Font
      </div>
      <div class="mt-1 text-xs font-bold tracking-[0.06em]">
        {{ contentTextFontName }}
      </div>
      <div class="mt-3 text-[9px] tracking-[0.16em] uppercase opacity-70">
        Masthead Max Size
      </div>
      <div class="mt-1 text-xs font-bold tracking-[0.06em]">
        {{ mastheadMaxSizeLabel }}
      </div>
    </div>

    <aside
      v-if="isHeadlinePanelVisible"
      class="fixed right-4 top-[calc(var(--header-height,0px)+3.6rem)] z-50 w-[min(92vw,360px)] border border-pureBlack/25 bg-pureWhite/95 p-4 backdrop-blur-sm dark:border-pureWhite/25 dark:bg-pureBlack/90"
    >
      <div class="mb-3 flex items-center justify-between">
        <h3 class="text-[10px] font-black tracking-[0.3em] uppercase">
          Text Controls
        </h3>
        <span class="text-[9px] tracking-[0.18em] uppercase opacity-60">Live</span>
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

      <div class="mt-4 space-y-2">
        <div class="flex items-center justify-between">
          <label class="text-[10px] font-bold tracking-[0.1em] uppercase">
            Masthead Size
          </label>
          <span class="text-[10px] font-bold tracking-[0.08em] uppercase">
            {{ mastheadMaxSizeLabel }}
          </span>
        </div>
        <input
          v-model.number="mastheadMaxSize"
          type="range"
          min="8"
          max="26"
          step="0.1"
          class="w-full accent-pureBlack dark:accent-pureWhite"
        >
      </div>
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

      <nav class="border-b border-pureBlack/20 border-solid dark:border-pureWhite/20">
        <div class="mx-auto max-w-[1500px] flex items-center justify-between px-6 py-4 sm:px-8">
          <div class="flex items-center gap-6">
            <button class="p-2 transition-colors hover:bg-gray-3/60 dark:hover:bg-gray-8/60" aria-label="Search">
              <Icon name="lucide:search" class="h-4 w-4" />
            </button>
            <span class="text-xs font-semibold tracking-wider">RESUME</span>
          </div>
          <div class="font-clash text-3xl font-black tracking-tight">
            {{ newsSectionContent.brand }}
          </div>
          <div class="flex items-center gap-6">
            <span class="text-xs font-semibold tracking-wider">ABOUT</span>
            <button class="p-2 transition-colors hover:bg-gray-3/60 dark:hover:bg-gray-8/60" aria-label="Menu">
              <Icon name="lucide:menu" class="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      <section class="bg-pureBlack color-pureWhite">
        <div class="mx-auto max-w-[1500px]">
          <div class="grid gap-2 lg:grid-cols-[minmax(150px,18vw)_minmax(0,1fr)_minmax(150px,18vw)] lg:items-stretch xl:gap-3">
            <div class="flex flex-col justify-between border border-pureWhite/20 px-3 py-3 xl:px-4">
              <span
                class="font-recoleta block text-[15px] leading-none tracking-normal uppercase opacity-80"
              >
                {{ newsSectionContent.straplineLeft }}
              </span>
              <span class="font-druk-bold w-max inline-flex bg-pureWhite px-3 py-1 text-xs color-pureBlack font-black tracking-tight">
                EXCLUSIVE EDITION
              </span>
            </div>

            <h1
              class="self-center whitespace-nowrap text-center tracking-wide"
              :class="[mastheadFontClass]"
              :style="{ fontSize: `clamp(${mastheadMinSize}rem, ${mastheadFluidSize}, ${mastheadMaxSize}rem)` }"
            >
              <span class="inline-block">
                {{ newsSectionContent.masthead }}
              </span>
            </h1>

            <div class="flex flex-col justify-between border border-pureWhite/20 px-3 py-3 xl:px-4">
              <span
                class="font-recoleta block text-[15px] leading-none tracking-normal uppercase opacity-80"
              >
                {{ newsSectionContent.straplineRight }}
              </span>
              <span
                class="font-recoleta block text-[15px] leading-none tracking-normal uppercase opacity-90"
              >
                SCROLL DOWN ↓
              </span>
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-[1500px] px-6 py-10 md:px-10 md:py-14">
        <div class="grid gap-8 lg:grid-cols-12">
          <article class="border-solid lg:col-span-4 space-y-6 lg:border-r lg:border-pureBlack/25 lg:pr-8 dark:lg:border-pureWhite/25">
            <div class="space-y-4">
              <div class="text-[9px] font-black tracking-[0.35em]">
                DESCRIBING MODERN WEB EXPERIENCES
              </div>
              <h2 class="text-6xl" :class="[mastheadFontClass]">
                <span class="inline-block">
                  {{ newsSectionContent.leadTitle }}
                </span>
              </h2>
            </div>

            <div :class="[contentTextFontClass]" class="text-lg color-pureBlack/70 leading-relaxed space-y-4 dark:color-pureWhite/70">
              <p v-for="(paragraph, index) in newsSectionContent.leadCopy" :key="`lead-${index}`">
                {{ paragraph }}
              </p>
            </div>

            <button class="w-full bg-pureBlack py-4 text-[11px] color-pureWhite font-black tracking-[0.24em] transition-opacity dark:bg-pureWhite dark:color-pureBlack hover:opacity-90">
              READ FULL ARTICLE
            </button>
          </article>

          <article class="border-solid lg:col-span-4 space-y-5 lg:border-r lg:border-pureBlack/25 lg:pr-8 dark:lg:border-pureWhite/25">
            <div class="relative aspect-video overflow-hidden from-gray-11 via-gray-8 to-gray-6 bg-gradient-to-br shadow-xl">
              <div class="absolute inset-0 flex flex-col items-center justify-center p-8 text-center color-pureWhite">
                <div class="text-8xl font-black">
                  AI
                </div>
                <div class="my-5 h-px w-24 bg-pureWhite/70" />
                <div class="text-[clamp(1rem,2.2vw,1.7rem)] leading-snug tracking-[0.22em]">
                  NEURAL<br>NETWORKS
                </div>
                <div class="mt-6 text-[9px] tracking-[0.3em] opacity-70">
                  VISUALIZATION
                </div>
              </div>
            </div>

            <div class="text-center space-y-2">
              <h3 class="text-5xl" :class="[mastheadFontClass]">
                <span class="inline-block">
                  KNOW MORE!
                </span>
              </h3>
              <p class="text-[9px] color-pureBlack/55 tracking-[0.28em] dark:color-pureWhite/55">
                EXCLUSIVE INSIGHTS • DEEP DIVE
              </p>
            </div>
          </article>

          <article class="lg:col-span-4 space-y-8">
            <h2 class="text-7xl" :class="[mastheadFontClass]">
              <span class="inline-block">
                {{ newsSectionContent.rightTitle }}
              </span>
            </h2>

            <div class="border-2 border-pureBlack border-solid px-4 py-8 text-center dark:border-pureWhite">
              <div class="text-[clamp(4rem,11vw,8rem)] font-black leading-none tracking-tight">
                {{ newsSectionContent.score }}
              </div>
            </div>
            <p class="text-center text-[9px] color-pureBlack/55 tracking-[0.33em] dark:color-pureWhite/55">
              VERSION RELEASE
            </p>

            <div class="border-t border-pureBlack/25 border-solid pt-6 dark:border-pureWhite/25">
              <h3 class="font-druk-bold mb-4 text-[10px] font-black tracking-[0.3em]">
                LATEST HEADLINES
              </h3>

              <div
                v-for="item in newsSectionContent.ticker"
                :key="item.id"
                class="border-b border-pureBlack/15 border-solid py-4 last:border-b-0 dark:border-pureWhite/15"
              >
                <div class="mb-2 text-[9px] color-pureBlack/55 tracking-[0.24em] dark:color-pureWhite/55">
                  {{ item.tag }}
                </div>
                <h4 class="font-druk-bold text-lg font-bold leading-tight">
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
            <p class="text-[9px] color-pureBlack/55 font-bold tracking-[0.3em] dark:color-pureWhite/55">
              {{ newsSectionContent.bottomLabel }}
            </p>
            <div class="h-px flex-1 bg-pureBlack/20 dark:bg-pureWhite/20" />
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
