<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { AnimatePresence, Motion } from 'motion-v'
import ColorMode from '@/components/ui/ColorMode/ColorMode.vue'
import LanguageSwitcher from '@/components/ui/Navigation/LanguageSwitcher/LanguageSwitcher.vue'
import { avatars, easings, explore, marqueeMessage, ourProducts } from './OsmoHeader.model'
import OsmoLogoMark from './OsmoLogoMark.vue'
import OsmoMenuIcon from './OsmoMenuIcon.vue'
import OsmoScrambleTextButton from './OsmoScrambleTextButton.vue'

const isScrolled = ref(false)

const isMenuOpen = ref(false)
const menuPhase = ref<'closed' | 'width' | 'full'>('closed')
let menuPhaseTimer: ReturnType<typeof setTimeout> | null = null

function clearMenuPhaseTimer() {
  if (menuPhaseTimer) {
    clearTimeout(menuPhaseTimer)
    menuPhaseTimer = null
  }
}

watch(isMenuOpen, (open) => {
  if (!open) {
    menuPhase.value = 'closed'
    return
  }

  menuPhase.value = 'width'
  clearMenuPhaseTimer()
  menuPhaseTimer = setTimeout(() => {
    menuPhase.value = 'full'
  }, 300)
})

function toggleMenu() {
  if (isMenuOpen.value) {
    menuPhase.value = 'width'
    clearMenuPhaseTimer()
    menuPhaseTimer = setTimeout(() => {
      menuPhase.value = 'closed'
      isMenuOpen.value = false
    }, 300)
    return
  }

  isMenuOpen.value = true
}

const marqueeHidden = computed(() => isScrolled.value || isMenuOpen.value)

const avatarPositions = computed(() => {
  const total = Math.max(1, avatars.length - 1)
  const radius = 200
  return avatars.map((avatar, index) => {
    const angle = Math.PI + (index / total) * Math.PI
    return {
      ...avatar,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    }
  })
})

onBeforeUnmount(() => {
  clearMenuPhaseTimer()
})

onMounted(() => {
  if (!import.meta.client)
    return

  const updateScrollState = () => {
    isScrolled.value = window.scrollY > 50
  }

  updateScrollState()
  useEventListener(window, 'scroll', updateScrollState, { passive: true })
})
</script>

<template>
  <div>
    <AnimatePresence>
      <Motion
        as="header"
        class="fixed left-1/2 top-4 z-50 md:top-6"
        :initial="{ x: '-50%', y: -100, opacity: 0 }"
        :animate="{
          x: '-50%',
          y: 0,
          opacity: 1,
          width: isMenuOpen ? 'calc(100% - 40px)' : 'auto',
        }"
        :transition="{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }"
      >
        <Motion
          as="div"
          class="overflow-visible rounded-lg bg-white/10 backdrop-blur-2xl ring-1 ring-pureBlack/20 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.5)] dark:ring-pureWhite/20"
          :animate="{ height: menuPhase === 'full' ? 'auto' : 'auto' }"
          :transition="{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }"
        >
          <div class="sticky top-0 z-50 w-[calc(100vw-40px)] flex items-center justify-between rounded-lg bg-white/10 px-3 py-3 backdrop-blur-2xl md:min-w-[640px] md:w-auto">
            <button
              class="h-10 flex cursor-pointer items-center gap-2 rounded-sm px-2.5 color-pureBlack transition-opacity md:gap-3 hover:bg-[#2D2A2A] md:px-4 dark:color-pureWhite hover:opacity-80"
              @click="toggleMenu"
            >
              <OsmoMenuIcon :is-open="isMenuOpen" />
              <span class="figtree-regular text-sm font-medium md:text-base">Menu</span>
            </button>

            <div class="absolute left-1/2 -translate-x-1/2">
              <AnimatePresence mode="wait">
                <Motion
                  v-if="isScrolled && !isMenuOpen"
                  key="mark"
                  :initial="{ opacity: 0, scale: 0.8, rotate: -180 }"
                  :animate="{ opacity: 1, scale: 1, rotate: 0 }"
                  :exit="{ opacity: 0, scale: 0.8, rotate: 180 }"
                  :transition="{ duration: 0.3 }"
                >
                  <OsmoLogoMark />
                </Motion>
                <Motion
                  v-else
                  key="logo"
                  :initial="{ opacity: 0, y: -10 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :exit="{ opacity: 0, y: 10 }"
                  :transition="{ duration: 0.3 }"
                >
                  <span class="font-cabinet text-3xl color-pureBlack tracking-tight dark:color-pureWhite">TECNEWS</span>
                </Motion>
              </AnimatePresence>
            </div>

            <div class="flex items-center gap-2">
              <OsmoScrambleTextButton
                text="Login"
                class="hidden h-10 rounded-full bg-[#01E2B6] px-4 text-sm color-pureBlack md:block md:text-base"
              />
              <ColorMode class="items-center justify-center" />
              <!--              <OsmoScrambleTextButton
                text="Join"
                class="h-10 rounded-none bg-[#A1FF62] px-4 text-sm text-[#1E1E1E] md:text-base"
              /> -->
            </div>
          </div>

          <AnimatePresence>
            <Motion
              v-if="menuPhase === 'full'"
              key="menu"
              :initial="{ height: 0, opacity: 0 }"
              :animate="{ height: 'auto', opacity: 1 }"
              :exit="{ height: 0, opacity: 0 }"
              :transition="{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }"
              class="border-t-white/10 max-h-[calc(100dvh-36px)] overflow-hidden overflow-y-auto border-t pt-4 md:overflow-y-hidden"
            >
              <div class="font-clash-regular px-6 pb-6 pt-2">
                <div class="grid gap-0 md:grid-cols-2 xl:grid-cols-3 md:gap-12">
                  <Motion
                    class="rounded-xl bg-white/8 p-4 backdrop-blur-xl ring-1 ring-pureBlack/15 md:p-8 dark:ring-pureWhite/15"
                    :initial="{ opacity: 0, y: 20 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ delay: 0.1 }"
                  >
                    <h3 class="figtree-regular mb-2 text-sm color-pureBlack font-300 uppercase dark:color-pureWhite/70">
                      Our Products
                    </h3>
                    <ul>
                      <Motion
                        v-for="(item, index) in ourProducts"
                        :key="item.name"
                        class="border-b border-pureBlack/10 border-solid py-4 last:border-b-0 dark:border-b-pureWhite/10"
                        :initial="{ opacity: 0, x: -10 }"
                        :animate="{ opacity: 1, x: 0 }"
                        :transition="{ delay: 0.15 + index * 0.05 }"
                      >
                        <NuxtLink
                          :to="item.href"
                          class="group w-fit flex items-center gap-2 text-lg color-pureBlack md:text-2xl dark:color-pureWhite"
                        >
                          <span class="relative flex items-center gap-2">
                            {{ item.name }}
                            <span
                              v-if="item.badge"
                              class="rounded bg-[#8023fe] px-1.5 py-0.5 text-sm color-pureBlack dark:color-pureWhite"
                            >
                              {{ item.badge }}
                            </span>
                            <span class="absolute left-0 h-px w-full origin-right scale-x-0 bg-pureBlack transition-transform duration-300 ease-in-out -bottom-1 group-hover:origin-left group-hover:scale-x-100 dark:bg-pureWhite" />
                          </span>
                        </NuxtLink>
                      </Motion>
                    </ul>

                    <div class="mt-8">
                      <NuxtLink
                        v-for="item in easings"
                        :key="item.name"
                        :to="item.href"
                        class="flex items-center gap-2 text-base color-pureBlack md:text-xl dark:color-pureWhite"
                      >
                        {{ item.name }}
                        <span
                          v-if="item.badge"
                          class="rounded bg-[#3F3C3C] px-1.5 py-0.5 text-sm color-pureBlack font-mono dark:color-pureWhite"
                        >
                          {{ item.badge }}
                        </span>
                      </NuxtLink>
                    </div>
                  </Motion>

                  <Motion
                    class="h-full flex flex-col justify-between rounded-xl bg-transparent p-4 md:p-8"
                    :initial="{ opacity: 0, y: 20 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ delay: 0.15 }"
                  >
                    <div>
                      <h3 class="figtree-regular mb-4 text-sm color-pureBlack font-300 uppercase dark:color-pureWhite/70">
                        Explore
                      </h3>
                      <ul>
                        <Motion
                          v-for="(item, index) in explore"
                          :key="item.name"
                          class="border-b border-pureBlack/10 border-solid py-4 last:border-b-0 dark:border-b-pureWhite/10"
                          :initial="{ opacity: 0, x: -10 }"
                          :animate="{ opacity: 1, x: 0 }"
                          :transition="{ delay: 0.2 + index * 0.05 }"
                        >
                          <NuxtLink
                            :to="item.href"
                            class="group w-fit flex items-center gap-2 text-lg color-pureBlack md:text-2xl dark:color-pureWhite"
                          >
                            <span class="relative">
                              {{ item.name }}
                              <span class="absolute left-0 h-px w-full origin-right scale-x-0 bg-pureBlack transition-transform duration-300 ease-in-out -bottom-1 group-hover:origin-left group-hover:scale-x-100 dark:bg-pureWhite" />
                            </span>
                          </NuxtLink>
                        </Motion>
                      </ul>
                    </div>

                    <Motion
                      class="flex items-center justify-start"
                      :initial="{ opacity: 0 }"
                      :animate="{ opacity: 1 }"
                      :transition="{ delay: 0.35 }"
                    >
                      <LanguageSwitcher variant="stepper" tone="osmo" />
                    </Motion>
                  </Motion>

                  <Motion
                    class="relative hidden min-h-[420px] items-center overflow-hidden rounded-xl bg-white/8 p-4 text-center backdrop-blur-xl ring-1 ring-pureBlack/15 xl:block md:p-8 dark:ring-pureWhite/15"
                    :initial="{ opacity: 0, y: 20 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ delay: 0.2 }"
                  >
                    <div class="z-10 mb-8 mt-4 w-full flex justify-center gap-0">
                      <span class="rounded-none bg-[#3F3C3C] px-2 py-1 text-sm color-pureBlack font-medium font-mono uppercase dark:color-pureWhite">
                        Featured
                      </span>
                      <span class="rounded-full bg-[#8023fe] px-2 py-1 text-sm color-pureBlack font-medium uppercase dark:color-pureWhite">
                        Milestone
                      </span>
                    </div>

                    <h4 class="relative z-10 mb-4 text-4xl color-pureBlack font-medium leading-none dark:color-pureWhite">
                      We hit 1600
                      <br>
                      Members!
                    </h4>

                    <button class="z-10 h-10 cursor-pointer rounded-none bg-pureBlack px-4 text-base text-[#1E1E1E] font-medium transition-colors dark:bg-pureWhite">
                      Join them
                    </button>

                    <div class="absolute left-1/2 w-full -bottom-20 -translate-x-1/2">
                      <div
                        v-for="(avatar, index) in avatarPositions"
                        :key="avatar.src"
                        class="absolute left-1/2 top-1/2"
                        :style="{ transform: `translate3d(${avatar.x}px, ${avatar.y}px, 0)` }"
                      >
                        <Motion
                          class="absolute size-20 overflow-hidden border-4 border-[#2A2727] rounded-full bg-[#2A2727] -ml-10 -mt-10 2xl:size-24"
                          :initial="{ opacity: 0, scale: 0 }"
                          :animate="{ opacity: 1, scale: 1 }"
                          :transition="{ delay: 0.3 + index * 0.05, type: 'spring' }"
                        >
                          <NuxtImg
                            :src="avatar.src"
                            :alt="avatar.alt"
                            class="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </Motion>
                      </div>
                    </div>
                  </Motion>
                </div>
              </div>
            </Motion>
          </AnimatePresence>
        </Motion>
      </Motion>
    </AnimatePresence>

    <Motion
      key="osmo-marquee"
      class="fixed left-0 right-0 top-[5.5rem] z-30 mx-auto max-w-[640px] w-[calc(100vw-40px)] overflow-hidden rounded-sm bg-[#01E2B6] py-1 md:top-24"
      :initial="{ opacity: 0, y: -50 }"
      :animate="{
        opacity: marqueeHidden ? 0 : 1,
        y: marqueeHidden ? -30 : 0,
      }"
      :transition="{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }"
      :style="{ pointerEvents: marqueeHidden ? 'none' : 'auto' }"
    >
      <Motion
        class="flex whitespace-nowrap"
        :animate="{ x: [0, -1000] }"
        :transition="{ duration: 40, repeat: Infinity, ease: 'linear' }"
      >
        <span
          v-for="index in 10"
          :key="index"
          class="font-clash-regular mx-4 flex items-center gap-4 text-xs text-[#1E1E1E] uppercase"
        >
          {{ marqueeMessage }}
          <span class="text-[#1E1E1E]">✦</span>
        </span>
      </Motion>
    </Motion>
  </div>
</template>
