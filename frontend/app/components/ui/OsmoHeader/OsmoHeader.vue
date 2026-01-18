<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { AnimatePresence, Motion } from 'motion-v'
import { avatars, easings, explore, marqueeMessage, ourProducts, socialLinks } from './OsmoHeader.model'
import OsmoLogo from './OsmoLogo.vue'
import OsmoLogoMark from './OsmoLogoMark.vue'
import OsmoMenuIcon from './OsmoMenuIcon.vue'
import OsmoScrambleTextButton from './OsmoScrambleTextButton.vue'

const { y } = useWindowScroll({ throttle: 100 })
const isScrolled = computed(() => y.value > 50)

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
  if (!open)
    return

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
</script>

<template>
  <div>
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
      <div class="max-h-[calc(100dvh-36px)] overflow-y-auto rounded-md bg-[#201D1D] md:overflow-y-hidden">
        <div class="sticky top-0 z-50 w-[calc(100vw-40px)] flex items-center justify-between rounded-md bg-[#201D1D] px-3 py-3 md:min-w-[640px] md:w-auto">
          <button
            class="h-10 flex cursor-pointer items-center gap-2 rounded-sm px-2.5 color-pureBlack transition-opacity md:gap-3 hover:bg-[#2D2A2A] md:px-4 dark:color-pureWhite hover:opacity-80"
            @click="toggleMenu"
          >
            <OsmoMenuIcon :is-open="isMenuOpen" />
            <span class="text-sm font-medium md:text-base">Menu</span>
          </button>

          <div class="absolute left-1/2 -translate-x-1/2">
            <AnimatePresence>
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
                <OsmoLogo />
              </Motion>
            </AnimatePresence>
          </div>

          <div class="flex items-center gap-0">
            <OsmoScrambleTextButton
              text="Login"
              class="hidden h-10 rounded-full bg-[#4F4C4C] px-4 text-sm text-[#F4F4F4] md:block md:text-base"
            />
            <OsmoScrambleTextButton
              text="Join"
              class="h-10 rounded-none bg-[#A1FF62] px-4 text-sm text-[#1E1E1E] md:text-base"
            />
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
            class="border-t-white/10 overflow-hidden border-t pt-4"
          >
            <div class="px-6 pb-6 pt-2">
              <div class="grid gap-0 md:grid-cols-2 xl:grid-cols-3 md:gap-12">
                <Motion
                  class="rounded-xl bg-[#2A2727] p-4 md:p-8"
                  :initial="{ opacity: 0, y: 20 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ delay: 0.1 }"
                >
                  <h3 class="mb-2 text-sm color-pureBlack font-mono uppercase dark:color-pureWhite/70">
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
                          <span class="bg-white absolute left-0 h-px w-full origin-right scale-x-0 transition-transform duration-300 ease-in-out -bottom-1 group-hover:origin-left group-hover:scale-x-100" />
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
                    <h3 class="mb-4 text-sm color-pureBlack font-mono uppercase dark:color-pureWhite/70">
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
                            <span class="bg-white absolute left-0 h-px w-full origin-right scale-x-0 transition-transform duration-300 ease-in-out -bottom-1 group-hover:origin-left group-hover:scale-x-100" />
                          </span>
                        </NuxtLink>
                      </Motion>
                    </ul>
                  </div>

                  <Motion
                    class="flex gap-0"
                    :initial="{ opacity: 0 }"
                    :animate="{ opacity: 1 }"
                    :transition="{ delay: 0.35 }"
                  >
                    <NuxtLink
                      v-for="link in socialLinks"
                      :key="link.name"
                      :to="link.href"
                      class="size-12 flex items-center justify-center bg-[#2C2929] text-[#F4F4F4]"
                      :class="link.name === 'Instagram' ? 'rounded-none' : 'rounded-full'"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon :name="link.icon" class="size-5" />
                    </NuxtLink>
                  </Motion>
                </Motion>

                <Motion
                  class="relative hidden min-h-[420px] items-center overflow-hidden rounded-xl bg-[#2A2727] p-4 text-center xl:block md:p-8"
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

                  <button class="bg-white z-10 h-10 cursor-pointer rounded-none px-4 text-base text-[#1E1E1E] font-medium transition-colors">
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
      </div>
    </Motion>

    <Motion
      class="fixed left-0 right-0 top-[5.5rem] z-30 mx-auto max-w-[640px] w-[calc(100vw-40px)] overflow-hidden rounded-sm bg-[#A1FF62] py-1 md:top-24"
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
          class="mx-4 flex items-center gap-4 text-xs text-[#1E1E1E] uppercase"
        >
          {{ marqueeMessage }}
          <span class="text-[#1E1E1E]">✦</span>
        </span>
      </Motion>
    </Motion>
  </div>
</template>
