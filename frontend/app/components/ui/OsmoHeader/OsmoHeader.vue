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
const colorMode = useColorMode()
const headerTone = useState<'light' | 'dark'>(
  'osmo-header-tone',
  () => (colorMode.value === 'dark' ? 'dark' : 'light'),
)
const isHeaderHidden = useState<boolean>('osmo-header-hidden', () => false)
const headerOffset = useState<number>('osmo-header-offset', () => 0)
const hoveredLabel = ref<string | null>(null)

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

const marqueeHidden = computed(() => isScrolled.value || isMenuOpen.value || isHeaderHidden.value)
const headerStyle = computed<Record<string, string>>(() => ({
  pointerEvents: isHeaderHidden.value ? 'none' : 'auto',
}))
const headerFgClass = computed(() => (headerTone.value === 'light' ? 'color-pureBlack' : 'color-pureWhite'))
const headerDividerClass = computed(() => (headerTone.value === 'light' ? 'border-pureBlack/10' : 'border-pureWhite/10'))
const headerOutlineClass = computed(() => (headerTone.value === 'light' ? 'ring-pureBlack/20' : 'ring-pureWhite/20'))
const headerHoverBgClass = computed(() => (headerTone.value === 'light' ? 'hover:bg-pureBlack/10' : 'hover:bg-pureWhite/10'))

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

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.015,
    },
  },
  exit: {
    opacity: 1,
    transition: {
      staggerChildren: 0.015,
    },
  },
}

const charVariants = {
  hidden: { y: 0 },
  visible: {
    y: -30,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    y: 2,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const charVariants2 = {
  hidden: { y: 30 },
  visible: {
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    y: 30,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const getLabelChars = (label: string) => Array.from(label)

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

watch(colorMode, () => {
  headerTone.value = colorMode.value === 'dark' ? 'dark' : 'light'
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
          y: headerOffset,
          opacity: 1,
          width: isMenuOpen ? 'calc(100% - 40px)' : 'auto',
        }"
        :transition="{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }"
        :style="headerStyle"
      >
        <Motion
          as="div"
          :class="useClsx(
            'bg-white/10 overflow-visible rounded-lg shadow-[0_24px_80px_-40px_rgba(0,0,0,0.5)] ring-1 backdrop-blur-2xl',
            headerOutlineClass,
          )"
          :animate="{ height: menuPhase === 'full' ? 'auto' : 'auto' }"
          :transition="{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }"
        >
          <div class="bg-white/10 sticky top-0 z-50 w-[calc(100vw-40px)] flex items-center justify-between rounded-lg px-3 py-3 backdrop-blur-2xl md:min-w-[640px] md:w-auto">
            <button
              :class="useClsx(
                'h-10 flex cursor-pointer items-center gap-2 rounded-sm px-2.5 transition-opacity md:gap-3 md:px-4 hover:opacity-80',
                headerFgClass,
                headerHoverBgClass,
              )"
              @click="toggleMenu"
            >
              <OsmoMenuIcon :is-open="isMenuOpen" :tone="headerTone" />
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
                  <span :class="useClsx('font-cabinet text-3xl tracking-tight', headerFgClass)">TECNEWS</span>
                </Motion>
              </AnimatePresence>
            </div>

            <div class="flex items-center gap-2">
              <OsmoScrambleTextButton
                text="Login"
                :class="useClsx(
                  'hidden h-10 rounded-full bg-[#01E2B6] px-4 text-sm md:block md:text-base',
                  headerFgClass,
                )"
              />
              <ColorMode class="items-center justify-center" :tone="headerTone" />
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
              :class="useClsx(
                'max-h-[calc(100dvh-36px)] overflow-hidden overflow-y-auto border-t pt-4 md:overflow-y-hidden',
                headerDividerClass,
              )"
            >
              <div class="font-clash-regular px-6 pb-6 pt-2">
                <div class="grid gap-0 md:grid-cols-2 xl:grid-cols-3 md:gap-12">
                  <Motion
                    :class="useClsx(
                      'bg-white/8 rounded-xl p-4 ring-1 backdrop-blur-xl md:p-8',
                      headerOutlineClass,
                    )"
                    :initial="{ opacity: 0, y: 20 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ delay: 0.1 }"
                  >
                    <h3 :class="useClsx('figtree-regular mb-2 text-sm font-300 uppercase', headerFgClass)">
                      Our Products
                    </h3>
                    <ul>
                      <Motion
                        v-for="(item, index) in ourProducts"
                        :key="item.name"
                        :class="useClsx(
                          'border-b border-solid py-4 last:border-b-0',
                          headerDividerClass,
                        )"
                        :initial="{ opacity: 0, x: -10 }"
                        :animate="{ opacity: 1, x: 0 }"
                        :transition="{ delay: 0.15 + index * 0.05 }"
                      >
                        <NuxtLink
                          :to="item.href"
                          :class="useClsx(
                            'group w-fit flex items-center gap-2 text-lg md:text-2xl',
                            headerFgClass,
                          )"
                          @mouseenter="hoveredLabel = item.name"
                          @mouseleave="hoveredLabel = null"
                        >
                          <span class="relative flex items-center gap-2">
                            <span class="relative inline-block h-[1.4em] overflow-hidden">
                              <Motion
                                as="span"
                                class="inline-flex"
                                :variants="containerVariants"
                                initial="hidden"
                                :animate="hoveredLabel === item.name ? 'visible' : 'exit'"
                              >
                                <Motion
                                  v-for="(char, charIndex) in getLabelChars(item.name)"
                                  :key="`first-${item.name}-${charIndex}`"
                                  as="span"
                                  :variants="charVariants"
                                  class="inline-block"
                                  :style="{ display: char === ' ' ? 'inline' : 'inline-block', whiteSpace: 'pre' }"
                                >
                                  {{ char }}
                                </Motion>
                              </Motion>
                              <Motion
                                as="span"
                                class="absolute inset-0 inline-flex items-center"
                                :variants="containerVariants"
                                initial="hidden"
                                :animate="hoveredLabel === item.name ? 'visible' : 'exit'"
                              >
                                <Motion
                                  v-for="(char, charIndex) in getLabelChars(item.name)"
                                  :key="`second-${item.name}-${charIndex}`"
                                  as="span"
                                  :variants="charVariants2"
                                  class="inline-block"
                                  :style="{ display: char === ' ' ? 'inline' : 'inline-block', whiteSpace: 'pre' }"
                                >
                                  {{ char }}
                                </Motion>
                              </Motion>
                            </span>
                            <span
                              v-if="item.badge"
                              :class="useClsx(
                                'rounded bg-[#8023fe] px-1.5 py-0.5 text-sm',
                                headerFgClass,
                              )"
                            >
                              {{ item.badge }}
                            </span>
                          </span>
                        </NuxtLink>
                      </Motion>
                    </ul>

                    <div class="mt-8">
                      <NuxtLink
                        v-for="item in easings"
                        :key="item.name"
                        :to="item.href"
                        :class="useClsx(
                          'flex items-center gap-2 text-base md:text-xl',
                          headerFgClass,
                        )"
                        @mouseenter="hoveredLabel = item.name"
                        @mouseleave="hoveredLabel = null"
                      >
                        <span class="relative inline-block h-[1.2em] overflow-hidden">
                          <Motion
                            as="span"
                            class="inline-flex"
                            :variants="containerVariants"
                            initial="hidden"
                            :animate="hoveredLabel === item.name ? 'visible' : 'exit'"
                          >
                            <Motion
                              v-for="(char, charIndex) in getLabelChars(item.name)"
                              :key="`first-easing-${item.name}-${charIndex}`"
                              as="span"
                              :variants="charVariants"
                              class="inline-block"
                              :style="{ display: char === ' ' ? 'inline' : 'inline-block', whiteSpace: 'pre' }"
                            >
                              {{ char }}
                            </Motion>
                          </Motion>
                          <Motion
                            as="span"
                            class="absolute inset-0 inline-flex items-center"
                            :variants="containerVariants"
                            initial="hidden"
                            :animate="hoveredLabel === item.name ? 'visible' : 'exit'"
                          >
                            <Motion
                              v-for="(char, charIndex) in getLabelChars(item.name)"
                              :key="`second-easing-${item.name}-${charIndex}`"
                              as="span"
                              :variants="charVariants2"
                              class="inline-block"
                              :style="{ display: char === ' ' ? 'inline' : 'inline-block', whiteSpace: 'pre' }"
                            >
                              {{ char }}
                            </Motion>
                          </Motion>
                        </span>
                        <span
                          v-if="item.badge"
                          :class="useClsx(
                            'rounded bg-[#3F3C3C] px-1.5 py-0.5 text-sm font-mono',
                            headerFgClass,
                          )"
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
                      <h3 :class="useClsx('figtree-regular mb-4 text-sm font-300 uppercase', headerFgClass)">
                        Explore
                      </h3>
                      <ul>
                        <Motion
                          v-for="(item, index) in explore"
                          :key="item.name"
                          :class="useClsx(
                            'border-b border-solid py-4 last:border-b-0',
                            headerDividerClass,
                          )"
                          :initial="{ opacity: 0, x: -10 }"
                          :animate="{ opacity: 1, x: 0 }"
                          :transition="{ delay: 0.2 + index * 0.05 }"
                        >
                          <NuxtLink
                            :to="item.href"
                            :class="useClsx(
                              'group w-fit flex items-center gap-2 text-lg md:text-2xl',
                              headerFgClass,
                            )"
                            @mouseenter="hoveredLabel = item.name"
                            @mouseleave="hoveredLabel = null"
                          >
                            <span class="relative inline-block h-[1.4em] overflow-hidden">
                              <Motion
                                as="span"
                                class="inline-flex"
                                :variants="containerVariants"
                                initial="hidden"
                                :animate="hoveredLabel === item.name ? 'visible' : 'exit'"
                              >
                                <Motion
                                  v-for="(char, charIndex) in getLabelChars(item.name)"
                                  :key="`first-explore-${item.name}-${charIndex}`"
                                  as="span"
                                  :variants="charVariants"
                                  class="inline-block"
                                  :style="{ display: char === ' ' ? 'inline' : 'inline-block', whiteSpace: 'pre' }"
                                >
                                  {{ char }}
                                </Motion>
                              </Motion>
                              <Motion
                                as="span"
                                class="absolute inset-0 inline-flex items-center"
                                :variants="containerVariants"
                                initial="hidden"
                                :animate="hoveredLabel === item.name ? 'visible' : 'exit'"
                              >
                                <Motion
                                  v-for="(char, charIndex) in getLabelChars(item.name)"
                                  :key="`second-explore-${item.name}-${charIndex}`"
                                  as="span"
                                  :variants="charVariants2"
                                  class="inline-block"
                                  :style="{ display: char === ' ' ? 'inline' : 'inline-block', whiteSpace: 'pre' }"
                                >
                                  {{ char }}
                                </Motion>
                              </Motion>
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
                    :class="useClsx(
                      'bg-white/8 relative hidden min-h-[420px] items-center overflow-hidden rounded-xl p-4 text-center ring-1 backdrop-blur-xl xl:block md:p-8',
                      headerOutlineClass,
                    )"
                    :initial="{ opacity: 0, y: 20 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ delay: 0.2 }"
                  >
                    <div class="z-10 mb-8 mt-4 w-full flex justify-center gap-0">
                      <span :class="useClsx('rounded-none bg-[#3F3C3C] px-2 py-1 text-sm font-medium font-mono uppercase', headerFgClass)">
                        Featured
                      </span>
                      <span :class="useClsx('rounded-full bg-[#8023fe] px-2 py-1 text-sm font-medium uppercase', headerFgClass)">
                        Milestone
                      </span>
                    </div>

                    <h4 :class="useClsx('relative z-10 mb-4 text-4xl font-medium leading-none', headerFgClass)">
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
