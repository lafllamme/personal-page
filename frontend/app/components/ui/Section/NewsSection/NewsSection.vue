<script setup lang="ts">
import { newsSectionContent } from './NewsSection.model'
</script>

<template>
  <section class="relative min-h-screen bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
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
          <div class="text-3xl font-black tracking-tight">
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

      <section class="bg-pureBlack py-12 color-pureWhite lg:py-18 md:py-14">
        <div class="mx-auto max-w-[1500px]">
          <div class="grid gap-2 lg:grid-cols-[minmax(150px,18vw)_minmax(0,1fr)_minmax(150px,18vw)] lg:items-stretch xl:gap-3">
            <div class="flex flex-col justify-between border border-pureWhite/20 px-3 py-3 xl:px-4">
              <span class="text-[9px] tracking-[0.35em] opacity-80">
                {{ newsSectionContent.straplineLeft }}
              </span>
              <span class="w-max inline-flex bg-pureWhite px-3 py-1 text-[9px] color-pureBlack font-black tracking-[0.25em]">
                EXCLUSIVE EDITION
              </span>
            </div>

            <h1 class="self-center whitespace-nowrap text-center text-[clamp(2.6rem,8vw,7.8rem)] font-black leading-[0.86] tracking-[-0.02em]">
              {{ newsSectionContent.masthead }}
            </h1>

            <div class="flex flex-col justify-between border border-pureWhite/20 px-3 py-3 xl:px-4 lg:text-right">
              <span class="text-[9px] tracking-[0.35em] opacity-80">
                {{ newsSectionContent.straplineRight }}
              </span>
              <span class="text-[9px] tracking-[0.35em] opacity-90">
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
              <h2 class="text-6xl font-black leading-[0.88] tracking-tight">
                {{ newsSectionContent.leadTitle }}
              </h2>
              <span class="inline-flex rounded-full bg-pureBlack px-3 py-1 text-[9px] color-pureWhite font-black tracking-[0.2em] dark:bg-pureWhite dark:color-pureBlack">
                {{ newsSectionContent.leadTag }}
              </span>
            </div>

            <div class="text-lg color-pureBlack/70 leading-relaxed space-y-4 dark:color-pureWhite/70">
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
              <h3 class="text-5xl font-black leading-tight tracking-tight">
                KNOW MORE!
              </h3>
              <p class="text-[9px] color-pureBlack/55 tracking-[0.28em] dark:color-pureWhite/55">
                EXCLUSIVE INSIGHTS • DEEP DIVE
              </p>
            </div>
          </article>

          <article class="lg:col-span-4 space-y-8">
            <h2 class="text-7xl font-black leading-[0.85] tracking-tight">
              {{ newsSectionContent.rightTitle }}
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
              <h3 class="mb-4 text-[10px] font-black tracking-[0.3em]">
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
                <h4 class="text-lg font-bold leading-tight">
                  {{ item.title }}
                </h4>
                <p class="mt-2 text-sm color-pureBlack/70 leading-relaxed dark:color-pureWhite/70">
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
