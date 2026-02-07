<script setup lang="ts">
import { useEventListener, useScroll, useTimeoutFn } from '@vueuse/core'
import { AnimatePresence, Motion } from 'motion-v'
import ColorMode from '@/components/ui/ColorMode/ColorMode.vue'
import LanguageSwitcher from '@/components/ui/Navigation/LanguageSwitcher/LanguageSwitcher.vue'
import LogoMark from './LogoMark.vue'
import { avatars, easings, explore, marqueeMessage, ourProducts, socialLinks } from './OsmoHeader.model'
import OsmoMenuIcon from './OsmoMenuIcon.vue'

const isScrolled = ref(false)
const isHeaderHidden = useState<boolean>('osmo-header-hidden', () => false)
const headerOffset = useState<number>('osmo-header-offset', () => 0)
const isMenuOpen = ref(false)
const menuOpenState = useState<boolean>('osmo-menu-open', () => false)
const navBarRef = ref<HTMLElement | null>(null)
const scrollTarget = ref<Window | null>(null)
const MENU_TRANSITION_FALLBACK_MS = 700
const labelCharsCache = new Map<string, string[]>()
const { start: startMenuFallbackTimeout, stop: stopMenuFallbackTimeout } = useTimeoutFn(() => {
  menuOpenState.value = true
}, MENU_TRANSITION_FALLBACK_MS, { immediate: false })

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

// Close on Escape key
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' || e.key === 'Esc') {
    closeMenu()
  }
}

const marqueeHidden = computed(() => isScrolled.value || isMenuOpen.value || isHeaderHidden.value)

const avatarPositions = computed(() => {
  const total = Math.max(1, avatars.length - 1)
  const radius = 180
  return avatars.map((avatar, index) => {
    const angle = Math.PI + (index / total) * Math.PI
    return {
      ...avatar,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    }
  })
})

const charStagger = 0.01
function getLabelChars(label: string) {
  const cached = labelCharsCache.get(label)
  if (cached)
    return cached
  const chars = Array.from(label)
  labelCharsCache.set(label, chars)
  return chars
}
function getCharStaggerStyle(index: number) {
  return {
    transitionDelay: `${index * charStagger}s`,
  }
}

const { y: scrollY } = useScroll(scrollTarget, { throttle: 100 })
watch(scrollY, (value) => {
  isScrolled.value = value > 50
}, { immediate: true })

onMounted(() => {
  if (!import.meta.client)
    return
  scrollTarget.value = window
  useEventListener(document, 'keydown', handleKeydown)
})

useEventListener(navBarRef, 'transitionend', (event) => {
  if (event.propertyName !== 'max-width')
    return
  if (!isMenuOpen.value)
    return

  stopMenuFallbackTimeout()
  menuOpenState.value = true
})

watch(isMenuOpen, (next) => {
  if (!import.meta.client || !navBarRef.value) {
    stopMenuFallbackTimeout()
    menuOpenState.value = next
    return
  }

  if (!next) {
    stopMenuFallbackTimeout()
    menuOpenState.value = false
    return
  }

  stopMenuFallbackTimeout()
  startMenuFallbackTimeout()
}, { immediate: true })

onBeforeUnmount(() => {
  stopMenuFallbackTimeout()
})
</script>

<template>
  <div
    :style="{
      pointerEvents: isHeaderHidden ? 'none' : undefined,
    }"
  >
    <!-- Main nav container -->
    <nav
      class="osmo-nav"
      :class="[
        isMenuOpen ? 'is--active' : 'is--inactive',
        isScrolled ? 'is--scrolled' : '',
      ]"
      :style="{
        transform: `translateY(${headerOffset}px)`,
        transition: 'transform 0.35s cubic-bezier(0.33, 0, 0.2, 1)',
      }"
    >
      <!-- Background overlay (click to close) -->
      <div class="osmo-nav__bg" @click="closeMenu" />

      <!-- Nav bar wrapper -->
      <div class="osmo-nav-bar__wrap">
        <div class="osmo-nav-bar__width">
          <div ref="navBarRef" class="osmo-nav-bar">
            <!-- Background layers -->
            <div class="osmo-nav-bar__back">
              <div class="osmo-nav-bar__outline" />
              <div class="osmo-nav-bar__bg" />
            </div>

            <!-- Top bar (always visible) -->
            <div class="osmo-nav-bar__top">
              <!-- Menu toggle button -->
              <div class="osmo-nav-bar__menu">
                <button
                  class="osmo-nav-menu color-pureBlack dark:color-pureWhite hover:bg-pureBlack/10 dark:hover:bg-pureWhite/10"
                  @click="toggleMenu"
                >
                  <OsmoMenuIcon :is-open="isMenuOpen" />
                  <span class="osmo-nav-menu__label font-manrope font-500 tracking-tight">Menu</span>
                </button>
              </div>

              <!-- Logo -->
              <div class="osmo-nav-bar__logo">
                <NuxtLink to="/" class="osmo-nav-logo" aria-label="Go to homepage">
                  <AnimatePresence mode="wait">
                    <Motion
                      v-if="isScrolled && !isMenuOpen"
                      key="mark"
                      :initial="{ opacity: 0, scale: 0.8, rotate: -180 }"
                      :animate="{ opacity: 1, scale: 1, rotate: 0 }"
                      :exit="{ opacity: 0, scale: 0.8, rotate: 180 }"
                      :transition="{ duration: 0.3 }"
                    >
                      <LogoMark class="osmo-nav-logo__icon" />
                    </Motion>
                    <Motion
                      v-else
                      key="logo"
                      :initial="{ opacity: 0, y: -10 }"
                      :animate="{ opacity: 1, y: 0 }"
                      :exit="{ opacity: 0, y: 10 }"
                      :transition="{ duration: 0.3 }"
                    >
                      <span class="osmo-nav-logo__wordmark font-cabinet tracking-tight color-pureBlack dark:color-pureWhite">TECNEWS</span>
                    </Motion>
                  </AnimatePresence>
                </NuxtLink>
              </div>

              <!-- Buttons -->
              <div class="osmo-nav-bar__buttons">
                <!-- Color Mode Toggle -->
                <div class="osmo-nav-bar__color-mode">
                  <ColorMode />
                </div>

                <!-- Join Button -->
                <div class="osmo-nav-bar__signup-button">
                  <NuxtLink
                    to="/join"
                    class="osmo-nav-bar__button is--join text-pureBlack dark:text-pureWhite"
                  >
                    <div class="osmo-nav-bar__button-bg bg-[#0bd8b6] dark:bg-[#0aa88f]" />
                    <div class="osmo-nav-bar__button-label-wrap">
                      <div class="osmo-nav-bar__button-label">
                        <span class="font-manrope color-pureBlack font-500 tracking-tight dark:color-pureWhite">Join</span>
                      </div>
                      <div aria-hidden="true" class="osmo-nav-bar__button-label">
                        <span>Join</span>
                      </div>
                    </div>
                  </NuxtLink>
                </div>
              </div>

              <!-- Line separator -->
              <div class="osmo-nav-bar__line" />
            </div>

            <!-- Dropdown content -->
            <div class="osmo-nav-bar__bottom">
              <div class="osmo-nav-bar__bottom-overflow">
                <div class="osmo-nav-bar__bottom-inner">
                  <div class="osmo-nav-bar__bottom-row">
                    <!-- Column 1: Products -->
                    <div
                      :class="useClsx(
                        'osmo-nav-bar__bottom-col is--products ring-pureBlack/20 dark:ring-pureWhite/20',
                      )"
                    >
                      <div class="osmo-nav-bar__tag-row">
                        <span class="osmo-eyebrow space-grotesk-regular color-pureBlack dark:color-pureWhite">Newsroom</span>
                      </div>
                      <ul class="osmo-nav-bar__ul-big">
                        <li
                          v-for="item in ourProducts"
                          :key="item.name"
                          class="osmo-nav-bar__big-li"
                        >
                          <NuxtLink
                            :to="item.href"
                            class="osmo-nav-bar__big-a osmo-animate-chars color-pureBlack dark:color-pureWhite"
                            @click="closeMenu"
                          >
                            <span class="osmo-nav-bar__big-span osmo-animate-chars__text font-clash-regular" data-button-animate-chars>
                              <span
                                v-for="(char, charIndex) in getLabelChars(item.name)"
                                :key="`label-${item.name}-${charIndex}`"
                                class="osmo-animate-chars__char"
                                :style="[
                                  getCharStaggerStyle(charIndex),
                                  char === ' ' ? { whiteSpace: 'pre' } : {},
                                ]"
                              >{{ char }}</span>
                            </span>
                            <span
                              v-if="item.badge"
                              class="osmo-nav-bar__a-tag"
                            >
                              <span :class="useClsx('osmo-tag space-grotesk-regular', item.badge === 'WIP' ? 'is--wip' : 'is--purple')">
                                {{ item.badge }}
                              </span>
                            </span>
                          </NuxtLink>
                          <div class="osmo-line is--nav-transparent" />
                        </li>
                      </ul>
                      <ul class="osmo-nav-bar__small-ul">
                        <li
                          v-for="item in easings"
                          :key="item.name"
                          class="osmo-nav-bar__small-li font-clash-regular"
                        >
                          <span class="osmo-nav-bar__small-a color-pureBlack dark:color-pureWhite">
                            <span class="osmo-nav-bar__small-span">{{ item.name }}</span>
                            <span v-if="item.badge" class="space-grotesk-regular osmo-nav-bar__a-tag is--small">
                              <span class="osmo-tag is--muted">{{ item.badge }}</span>
                            </span>
                          </span>
                        </li>
                      </ul>
                    </div>

                    <!-- Column 2: Explore -->
                    <div class="osmo-nav-bar__bottom-col">
                      <div class="osmo-nav-bar__tag-row is--membership">
                        <span class="osmo-eyebrow space-grotesk-regular color-pureBlack dark:color-pureWhite">Explore</span>
                      </div>
                      <ul class="osmo-nav-bar__ul-big">
                        <li
                          v-for="item in explore"
                          :key="item.name"
                          class="osmo-nav-bar__big-li"
                        >
                          <NuxtLink
                            :to="item.href"
                            class="osmo-nav-bar__big-a osmo-animate-chars color-pureBlack dark:color-pureWhite"
                            @click="closeMenu"
                          >
                            <span class="osmo-nav-bar__big-span osmo-animate-chars__text font-clash-regular" data-button-animate-chars>
                              <span
                                v-for="(char, charIndex) in getLabelChars(item.name)"
                                :key="`label-explore-${item.name}-${charIndex}`"
                                class="osmo-animate-chars__char"
                                :style="[
                                  getCharStaggerStyle(charIndex),
                                  char === ' ' ? { whiteSpace: 'pre' } : {},
                                ]"
                              >{{ char }}</span>
                            </span>
                            <!-- Count badge (like "145" for Collection) -->
                            <span v-if="item.count" class="osmo-nav-bar__big-span-number">{{ item.count }}</span>
                          </NuxtLink>
                          <div class="osmo-line is--nav-transparent" />
                        </li>
                      </ul>
                      <!-- Social Icons -->
                      <div class="osmo-nav-bar__socials">
                        <div class="osmo-button-row">
                          <a
                            v-for="social in socialLinks"
                            :key="social.name"
                            :href="social.href"
                            target="_blank"
                            :aria-label="social.name"
                            class="osmo-square-button"
                          >
                            <Icon :name="social.icon" class="osmo-square-button__icon" />
                          </a>
                        </div>
                      </div>
                      <!-- Mobile: Language Switcher -->
                      <div class="osmo-nav-bar__language md:hidden">
                        <LanguageSwitcher variant="stepper" tone="osmo" />
                      </div>
                    </div>

                    <!-- Column 3: Featured -->
                    <div
                      :class="useClsx(
                        'osmo-nav-bar__bottom-col is--ad hidden xl:flex ring-pureBlack/20 dark:ring-pureWhite/20',
                      )"
                    >
                      <div class="osmo-nav-banner">
                        <div class="osmo-nav-banner__before" />
                        <div class="osmo-nav-banner__content">
                          <div class="osmo-nav-banner__tags">
                            <span class="osmo-tag space-grotesk-regular is--muted">Featured</span>
                            <span class="osmo-tag space-grotesk-regular is--purple">Milestone</span>
                          </div>
                          <div class="osmo-nav-banner__center-content">
                            <div class="osmo-nav-banner__title">
                              <h2 class="osmo-h-m font-500 font-clash-regular color-pureBlack dark:color-pureWhite">
                                We hit 1700
                                <br>
                                Members!
                              </h2>
                            </div>
                            <div class="osmo-nav-banner__btn pb-4">
                              <button class="osmo-button is--light font-manrope">
                                <span>Join them</span>
                              </button>
                            </div>
                          </div>
                          <div class="osmo-nav-banner__avatars">
                            <div
                              v-for="avatar in avatarPositions"
                              :key="avatar.src"
                              class="osmo-nav-banner__avatar"
                              :style="{ transform: `translate3d(${avatar.x}px, ${avatar.y}px, 0)` }"
                            >
                              <NuxtImg
                                :src="avatar.src"
                                :alt="avatar.alt"
                                class="osmo-nav-banner__avatar-img"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Mobile Buttons (visible only on mobile) -->
                  <div class="osmo-nav-bar__mobile-buttons">
                    <NuxtLink
                      to="/login"
                      class="osmo-mobile-button is--neutral bg-pureBlack color-pureWhite dark:bg-pureWhite dark:color-pureBlack"
                      @click="closeMenu"
                    >
                      <div class="osmo-mobile-button__bg" />
                      <div class="osmo-mobile-button__label">
                        <span>Member Login</span>
                      </div>
                    </NuxtLink>
                    <NuxtLink
                      to="/join"
                      class="osmo-mobile-button is--electric"
                      @click="closeMenu"
                    >
                      <div class="osmo-mobile-button__bg" />
                      <div class="osmo-mobile-button__label">
                        <span>Join Osmo</span>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Marquee Wrapper (fixed, uses padding-top like Osmo) -->
    <div
      class="osmo-marquee-wrap"
      :class="{ 'is--hidden': marqueeHidden }"
    >
      <div class="osmo-marquee-wrap__inner">
        <NuxtLink
          to="/showcase"
          class="osmo-marquee bg-[#0bd8b6] text-pureBlack dark:bg-[#0aa88f] dark:text-pureWhite"
        >
          <div class="osmo-marquee__scroll">
            <!-- First list -->
            <div class="osmo-marquee__list">
              <div
                v-for="index in 4"
                :key="`a-${index}`"
                class="font-clash-regular osmo-marquee__item"
              >
                <p class="osmo-marquee__text color-pureBlack dark:color-pureWhite">
                  {{ marqueeMessage }}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 187 187"
                  fill="none"
                  class="osmo-marquee__star fill-pureBlack dark:fill-pureWhite"
                >
                  <path
                    d="M126.049 76.7471L167.276 35.5197L150.805 19.0486L109.577 60.276C107.82 62.0398 104.808 60.7915 104.808 58.3009V0H81.517V70.3375C81.517 76.511 76.511 81.517 70.3375 81.517H0V104.808H58.3009C60.7915 104.808 62.0398 107.82 60.276 109.577L19.0548 150.805L35.5259 167.276L76.7533 126.049C78.5109 124.291 81.5232 125.533 81.5232 128.024V186.324H104.814V115.987C104.814 109.813 109.82 104.808 115.993 104.808H186.331V81.517H128.03C125.539 81.517 124.291 78.5047 126.055 76.7471H126.049Z"
                  />
                </svg>
              </div>
            </div>
            <!-- Second list (duplicate for seamless loop) -->
            <div class="osmo-marquee__list">
              <div
                v-for="index in 4"
                :key="`b-${index}`"
                class="osmo-marquee__item font-clash-regular"
              >
                <p class="osmo-marquee__text color-pureBlack dark:color-pureWhite">
                  {{ marqueeMessage }}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 187 187"
                  fill="none"
                  class="osmo-marquee__star fill-pureBlack dark:fill-pureWhite"
                >
                  <path
                    d="M126.049 76.7471L167.276 35.5197L150.805 19.0486L109.577 60.276C107.82 62.0398 104.808 60.7915 104.808 58.3009V0H81.517V70.3375C81.517 76.511 76.511 81.517 70.3375 81.517H0V104.808H58.3009C60.7915 104.808 62.0398 107.82 60.276 109.577L19.0548 150.805L35.5259 167.276L76.7533 126.049C78.5109 124.291 81.5232 125.533 81.5232 128.024V186.324H104.814V115.987C104.814 109.813 109.82 104.808 115.993 104.808H186.331V81.517H128.03C125.539 81.517 124.291 78.5047 126.055 76.7471H126.049Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style>
/* ========================= CSS Variables (Global) ========================= */
:root {
  --osmo-cubic: cubic-bezier(0.625, 0.05, 0, 1);
  --osmo-duration: 0.6s;
  --osmo-duration-onehalf: 0.9s;
  --osmo-duration-half: 0.3s;
  --osmo-animation: var(--osmo-duration) var(--osmo-cubic);
  --osmo-animation-onehalf: var(--osmo-duration-onehalf) var(--osmo-cubic);
  --osmo-animation-half: var(--osmo-duration-half) var(--osmo-cubic);
  --osmo-nav-bar-height: 4.625em;
  --osmo-nav-bar-max-width: 38em;
  --osmo-size-container: clamp(992px, 100vw, 1920px);
  --osmo-stroke-weight: 1px;
}
</style>

<style scoped>
/* ========================= Main Nav Container ========================= */
.osmo-nav {
  position: fixed;
  inset: 0;
  z-index: 100;
  pointer-events: none;
  opacity: 1;
  visibility: visible;
}

/* ========================= Background Overlay ========================= */
.osmo-nav__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity var(--osmo-animation),
    visibility var(--osmo-animation);
}

.osmo-nav.is--active .osmo-nav__bg {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

/* ========================= Nav Bar Wrapper ========================= */
.osmo-nav-bar__wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--osmo-nav-bar-height);
  display: flex;
  justify-content: center;
}

.osmo-nav-bar__width {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: var(--osmo-size-container);
  padding: 1.3125em;
  gap: 0.39375em;
}

/* ========================= Nav Bar (The Pill) ========================= */
.osmo-nav-bar {
  position: relative;
  width: 100%;
  max-width: var(--osmo-nav-bar-max-width);
  pointer-events: auto;
  border-radius: 0.2625em;
  transition: max-width var(--osmo-animation-onehalf) 0.2s;
}

@media screen and (max-width: 767px) {
  .osmo-nav-bar {
    border-radius: 0.25em;
  }
}

.osmo-nav.is--active .osmo-nav-bar {
  max-width: 100%;
  transition: max-width var(--osmo-animation) 0s;
}

/* ========================= Background Layers ========================= */
.osmo-nav-bar__back {
  position: absolute;
  inset: 0;
  transition: inset var(--osmo-animation);
}

/* Desktop only: shrink on scroll */
@media screen and (min-width: 768px) {
  .osmo-nav.is--scrolled .osmo-nav-bar__back {
    inset: 0.1875em;
  }

  .osmo-nav.is--scrolled.is--active .osmo-nav-bar__back {
    inset: 0;
  }

  /* Enhanced glass effect when scrolled */
  html:not(.dark) .osmo-nav.is--scrolled .osmo-nav-bar__bg {
    backdrop-filter: blur(24px);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
      0 12px 40px rgba(0, 0, 0, 0.08);
  }

  html.dark .osmo-nav.is--scrolled .osmo-nav-bar__bg {
    backdrop-filter: blur(24px);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
      0 12px 40px rgba(0, 0, 0, 0.3);
  }
}

.osmo-nav-bar__bg {
  position: absolute;
  inset: 0;
  border-radius: 0.39375em;
  pointer-events: none;
  backdrop-filter: blur(20px);
  transition: opacity 0.2s ease;
}

html:not(.dark) .osmo-nav .osmo-nav-bar__bg {
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
    0 8px 32px rgba(0, 0, 0, 0.06);
}

html.dark .osmo-nav .osmo-nav-bar__bg {
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
    0 8px 32px rgba(0, 0, 0, 0.2);
}

@media screen and (max-width: 767px) {
  .osmo-nav-bar__bg {
    border-radius: 0.375em;
  }
}

.osmo-nav-bar__outline {
  position: absolute;
  inset: calc(var(--osmo-stroke-weight) * -1);
  border-radius: 0.4375em;
  pointer-events: none;
  backdrop-filter: blur(10px);
  transition: opacity 0.2s ease;
}

html:not(.dark) .osmo-nav .osmo-nav-bar__outline {
  border: 1px solid rgba(0, 0, 0, 0.04);
}

html.dark .osmo-nav .osmo-nav-bar__outline {
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* ========================= Top Bar ========================= */
.osmo-nav-bar__top {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.375em;
  padding: 0.4375em;
}

.osmo-nav-bar__menu {
  height: 2.5em;
  margin-right: auto;
}

.osmo-nav-menu {
  display: flex;
  align-items: center;
  gap: 0.625em;
  height: 100%;
  padding: 0 1em 0 0.625em;
  border-radius: 0.125em;
  cursor: pointer;
  background: transparent;
  border: none;
  transition:
    background-color var(--osmo-animation-half),
    gap var(--osmo-animation);
}

.osmo-nav-menu:hover {
  backdrop-filter: blur(10px);
}

html.dark .osmo-nav .osmo-nav-menu:hover {
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
}

html:not(.dark) .osmo-nav .osmo-nav-menu:hover {
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
}

.osmo-nav.is--active .osmo-nav-menu {
  gap: 0.1875em;
  backdrop-filter: blur(10px);
}

html.dark .osmo-nav.is--active .osmo-nav-menu {
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
}

html:not(.dark) .osmo-nav.is--active .osmo-nav-menu {
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
}

.osmo-nav-menu__label {
  font-size: 1.125em;
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 0.0625em;
}

/* ========================= Logo ========================= */
.osmo-nav-bar__logo {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5em;
}

.osmo-nav-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 0.5em;
  border-radius: 0.5em;
  text-decoration: none;
}

.osmo-nav-logo__wordmark {
  display: block;
  font-size: 1.75rem;
  letter-spacing: -0.02em;
}

.osmo-nav-logo__icon {
  width: 1.375em;
}

/* ========================= Buttons ========================= */
.osmo-nav-bar__buttons {
  display: flex;
  align-items: center;
  height: 2.5em;
  gap: 0.5em;
}

.osmo-nav-bar__signup-button {
  display: flex;
  align-items: center;
  height: 2.5em;
}

.osmo-nav-bar__color-mode {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5em;
}

.osmo-nav-bar__button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5em;
  padding: 0 1.125em 0.0625em;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.2s cubic-bezier(0.625, 0.05, 0, 1);
  cursor: pointer;
}

.osmo-nav-bar__button:hover {
  transform: scale(0.98) rotate(0.001deg);
}

.osmo-nav-bar__button.is--join {
  border-radius: 0.125em;
}

.osmo-nav-bar__button-bg {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  transition: background-color 0.2s ease;
}

.osmo-nav-bar__button.is--join .osmo-nav-bar__button-bg {
  transition: background-color 0.2s ease;
}

.osmo-nav-bar__button-label-wrap {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 1.3em;
  line-height: 1.3;
}

.osmo-nav-bar__button-label {
  display: block;
  line-height: 1;
  white-space: nowrap;
  transition: transform 0.6s cubic-bezier(0.625, 0.05, 0, 1);
}

.osmo-nav-bar__button-label span {
  display: inline-block;
}

.osmo-nav-bar__button-label:nth-child(2) {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(1.3em);
}

.osmo-nav-bar__button:hover .osmo-nav-bar__button-label:nth-child(1) {
  transform: translateY(-1.3em);
}

.osmo-nav-bar__button:hover .osmo-nav-bar__button-label:nth-child(2) {
  transform: translateY(0);
}

.osmo-nav-bar__color-mode {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ========================= Line Separator ========================= */
.osmo-nav-bar__line {
  position: absolute;
  bottom: 0;
  left: 0.5em;
  right: 0.5em;
  height: var(--osmo-stroke-weight);
  opacity: 0;
  transition: opacity var(--osmo-animation) 0s;
}

html:not(.dark) .osmo-nav .osmo-nav-bar__line {
  background: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%);
}

html.dark .osmo-nav .osmo-nav-bar__line {
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%);
}

.osmo-nav.is--active .osmo-nav-bar__line {
  opacity: 1;
  transition: opacity var(--osmo-animation) 0.1s;
}

/* ========================= Bottom Dropdown (CSS Grid Trick!) ========================= */
.osmo-nav-bar__bottom {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: grid-template-rows var(--osmo-animation) 0s;
}

.osmo-nav.is--active .osmo-nav-bar__bottom {
  grid-template-rows: 1fr;
  transition: grid-template-rows var(--osmo-animation-onehalf) 0.3s;
}

.osmo-nav-bar__bottom-overflow {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 10000%;
  overflow: hidden;
}

.osmo-nav-bar__bottom-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(var(--osmo-size-container) - 2.5em);
  max-width: 100%;
  padding: 1.5em;
}

/* ========================= Bottom Row (Staggered Columns) ========================= */
.osmo-nav-bar__bottom-row {
  display: flex;
  width: 100%;
  gap: 1.5em;
}

.osmo-nav-bar__bottom-row > * {
  transform: translateY(2em) rotate(0.001deg);
  transition: transform var(--osmo-animation) 0s;
}

.osmo-nav-bar__bottom-row > *:nth-child(2) {
  transition: transform var(--osmo-animation) 0.075s;
}

.osmo-nav-bar__bottom-row > *:nth-child(3) {
  transition: transform var(--osmo-animation) 0.15s;
}

.osmo-nav.is--active .osmo-nav-bar__bottom-row > * {
  transform: translateY(0) rotate(0.001deg);
  transition: transform var(--osmo-animation-onehalf) 0.3s;
}

.osmo-nav.is--active .osmo-nav-bar__bottom-row > *:nth-child(2) {
  transition: transform var(--osmo-animation-onehalf) 0.375s;
}

.osmo-nav.is--active .osmo-nav-bar__bottom-row > *:nth-child(3) {
  transition: transform var(--osmo-animation-onehalf) 0.45s;
}

/* ========================= Bottom Columns ========================= */
.osmo-nav-bar__bottom-col {
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  width: 100%;
  padding: 2.5em;
  gap: 1.375em;
}

.osmo-nav-bar__bottom-col.is--products {
  border-radius: 1em;
  backdrop-filter: blur(24px);
  border: 1px solid transparent;
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
    0 4px 16px rgba(0, 0, 0, 0.1);
}

html:not(.dark) .osmo-nav .osmo-nav-bar__bottom-col.is--products {
  border-color: rgba(0, 0, 0, 0.08);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 0 rgba(0, 0, 0, 0.03),
    0 4px 16px rgba(0, 0, 0, 0.05);
}

html.dark .osmo-nav .osmo-nav-bar__bottom-col.is--products {
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 0 rgba(0, 0, 0, 0.2),
    0 4px 16px rgba(0, 0, 0, 0.2);
}

.osmo-nav-bar__bottom-col.is--ad {
  padding: 0;
}

/* ========================= Menu Items ========================= */
.osmo-nav-bar__tag-row {
  display: flex;
  opacity: 0.8;
}

.osmo-eyebrow {
  font-size: 0.6875rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0;
}

.osmo-nav-bar__ul-big {
  list-style: none;
  padding: 0;
  margin: 0;
}

.osmo-nav-bar__big-li {
  position: relative;
}

.osmo-nav-bar__big-a {
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 1.0625em;
  padding-bottom: 1.125em;
  text-decoration: none;
}

.osmo-nav-bar__big-span {
  font-size: 1.5em;
  font-weight: 400;
  line-height: 1;
}

.osmo-nav-bar__a-tag {
  padding-top: 0.25em;
  padding-left: 0.625em;
}

.osmo-nav-bar__a-tag.is--small {
  padding-top: 0.125em;
  font-size: 0.8em;
}

.osmo-nav-bar__small-ul {
  margin-top: auto;
  list-style: none;
  padding: 0;
}

.osmo-nav-bar__small-li {
  cursor: not-allowed;
}

.osmo-nav-bar__small-a {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.3125em 0 0.25em;
  pointer-events: none;
  opacity: 0.5;
}

.osmo-nav-bar__small-span {
  font-size: 1em;
  line-height: 1;
}

.osmo-nav-bar__socials {
  margin-top: auto;
  padding-top: 2em;
  display: flex;
}

.osmo-nav-bar__language {
  padding-top: 1em;
}

/* Count badge (e.g., "145" for Collection) */
.osmo-nav-bar__big-span-number {
  display: block;
  position: relative;
  margin-left: 0.25em;
  margin-top: -0.75em;
  font-size: 0.75em;
  line-height: 1;
  color: #312e2e;
}

/* Social Icons Row */
.osmo-button-row {
  display: flex;
  gap: 0.5em;
}

.osmo-square-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5em;
  height: 2.5em;
  border-radius: 9999px;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

html.dark .osmo-nav .osmo-square-button {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: white;
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
    0 2px 8px rgba(0, 0, 0, 0.15);
}

html:not(.dark) .osmo-nav .osmo-square-button {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  color: black;
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
    0 2px 8px rgba(0, 0, 0, 0.03);
}

.osmo-square-button:hover {
  backdrop-filter: blur(12px);
}

html.dark .osmo-nav .osmo-square-button:hover {
  border-color: rgba(255, 255, 255, 0.18);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
    0 4px 12px rgba(0, 0, 0, 0.2);
}

html:not(.dark) .osmo-nav .osmo-square-button:hover {
  border-color: rgba(0, 0, 0, 0.08);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
    0 4px 12px rgba(0, 0, 0, 0.05);
}

.osmo-square-button__icon {
  width: 1.25em;
  height: 1.25em;
}

/* Mobile Buttons (hidden by default, shown in mobile media query) */
.osmo-nav-bar__mobile-buttons {
  display: none;
  flex-direction: column;
  gap: 0.625em;
  width: 100%;
  padding-bottom: 2em;
}

.osmo-mobile-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.5em;
  border-radius: 0.375em;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.2s cubic-bezier(0.625, 0.05, 0, 1);
  cursor: pointer;
}

.osmo-mobile-button:hover {
  transform: scale(0.99) rotate(0.001deg);
}

.osmo-mobile-button__bg {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  backdrop-filter: blur(12px);
  transition:
    background-color 0.2s ease,
    filter 0.2s ease,
    box-shadow 0.2s ease;
}

.osmo-mobile-button.is--neutral .osmo-mobile-button__bg {
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.2);
}

.osmo-mobile-button.is--neutral:hover .osmo-mobile-button__bg {
  background-color: rgba(63, 60, 60, 0.9);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
    0 6px 16px rgba(0, 0, 0, 0.3);
}

.osmo-mobile-button__label {
  position: relative;
  z-index: 1;
}

.osmo-line {
  position: relative;
  width: 100%;
  height: var(--osmo-stroke-weight);
  z-index: 3;
}

.osmo-line.is--nav-transparent {
  opacity: 1;
}

html.dark .osmo-nav .osmo-line.is--nav-transparent {
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.12) 50%, transparent 100%);
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.05);
}

html:not(.dark) .osmo-nav .osmo-line.is--nav-transparent {
  background: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%);
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.03);
}

/* Hide last divider in menu lists */
.osmo-nav-bar__big-li:last-child .osmo-line {
  display: none;
}

/* ========================= Tags ========================= */
.osmo-tag {
  display: inline-block;
  padding: 0.25em 0.375em 0.1875em;
  font-size: 0.6875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0;
  border-radius: 0.125em;
}

.osmo-tag.is--purple {
  background-color: #8023fe;
  color: white;
  border-radius: 9999px;
}

.osmo-tag.is--wip {
  padding: 0.35em 0.6em 0.3em;
  border-radius: 0.125em;
  background-color: #8023fe;
  color: #fff;
  letter-spacing: 0.08em;
}

.osmo-tag.is--muted {
  background-color: #3f3c3c;
  color: white;
}

/* ========================= Featured Banner ========================= */
.osmo-nav-banner {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 1em;
  overflow: hidden;
  backdrop-filter: blur(20px);
}

html:not(.dark) .osmo-nav .osmo-nav-banner {
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
    0 8px 24px rgba(0, 0, 0, 0.06);
}

html.dark .osmo-nav .osmo-nav-banner {
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
    0 8px 24px rgba(0, 0, 0, 0.2);
}

.osmo-nav-banner__before {
  padding-top: 110%;
}

.osmo-nav-banner__content {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2.5em;
}

.osmo-nav-banner__tags {
  display: flex;
  justify-content: center;
  gap: 0.25em;
}

.osmo-nav-banner__center-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
}

.osmo-nav-banner__title {
  text-align: center;
}

.osmo-h-m {
  font-size: clamp(1.75em, 5vw + 0.5em, 2.5em);
  line-height: 1.05;
}

.osmo-nav-banner__btn {
  display: flex;
  justify-content: center;
  padding-top: 1.5em;
}

.osmo-button {
  height: 2.5em;
  padding: 0 1.125em 0.0625em;
  border: none;
  border-radius: 0.125em;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.osmo-button.is--light {
  background-color: #f4f4f4;
  color: #1e1e1e;
}

.osmo-button.is--light:hover {
  background-color: #e0e0e0;
}

.osmo-nav-banner__avatars {
  position: absolute;
  left: 50%;
  bottom: -5em;
  transform: translateX(-50%);
  width: 100%;
}

.osmo-nav-banner__avatar {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 4.5em;
  height: 4.5em;
  margin-left: -2em;
  margin-top: -2em;
  border-radius: 50%;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

html:not(.dark) .osmo-nav .osmo-nav-banner__avatar {
  border: 2px solid rgba(0, 0, 0, 0.12);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.3);
}

html.dark .osmo-nav .osmo-nav-banner__avatar {
  border: 2px solid rgba(255, 255, 255, 0.15);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
}

.osmo-nav-banner__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ========================= Marquee Container ========================= */
.osmo-marquee-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding-top: var(--osmo-nav-bar-height);
  padding-left: 2.5em;
  padding-right: 2.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(0) scale(1) rotate(0.001deg);
  transition: all var(--osmo-animation);
  pointer-events: none;
}

.osmo-marquee-wrap.is--hidden {
  transform: translateY(-3em) scale(0.975) rotate(0.001deg);
  opacity: 0;
}

.osmo-marquee-wrap__inner {
  max-width: var(--osmo-nav-bar-max-width);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.39375em;
}

/* Mobile/Tablet adjustments */
@media screen and (max-width: 767px) {
  .osmo-marquee-wrap {
    padding-left: 0.64em;
    padding-right: 0.64em;
  }

  .osmo-marquee-wrap__inner {
    padding-top: 0;
  }
}

.osmo-marquee {
  pointer-events: auto;
  border-radius: 0.25em;
  flex: none;
  width: 100%;
  height: 1.3125em;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  position: relative;
  overflow: hidden;
  padding: 0;
}

.osmo-marquee__scroll {
  width: var(--osmo-nav-bar-max-width);
  flex: none;
  height: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  overflow: hidden;
}

.osmo-marquee__list {
  flex: none;
  align-items: center;
  display: flex;
  flex-direction: row;
  position: relative;
  animation: osmo-marquee 30s linear infinite;
  background-color: transparent;
  border-radius: 0;
}

.osmo-marquee__item {
  display: flex !important;
  align-items: center;
  flex-direction: row;
  gap: 2em;
  padding-right: 2em;
  padding-left: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  flex: 0;
  background-color: transparent !important;
  border-radius: 0 !important;
  border: none !important;
  box-shadow: none !important;
  margin: 0 !important;
}

@media screen and (max-width: 767px) {
  .osmo-marquee__item {
    gap: 1.5em;
    padding-right: 1.5em;
  }

  .osmo-marquee__star {
    width: 0.44em;
  }
}

.osmo-marquee__text {
  display: block !important;
  font-size: 0.72em;
  font-weight: 400;
  font-variation-settings: 'wght' 460;
  text-transform: uppercase;
  letter-spacing: 0;
  white-space: nowrap;
  margin-top: 0.045em;
  margin-left: 0 !important;
  margin-right: 0 !important;
  margin-bottom: 0 !important;
  padding: 0 !important;
  background-color: transparent !important;
  border-radius: 0 !important;
  border: none !important;
  box-shadow: none !important;
  line-height: 1;
}

@media screen and (max-width: 767px) {
  .osmo-marquee__text {
    font-size: 0.69em;
    margin-top: 0.043em;
  }
}

.osmo-marquee__star {
  display: block;
  width: 0.583em;
  height: auto;
  flex-shrink: 0;
  background-color: transparent;
  border-radius: 0;
  margin: 0;
  padding: 0;
}

@keyframes osmo-marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* ========================= Character Animation ========================= */
.osmo-animate-chars {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0;
  line-height: 1;
  text-decoration: none;
}

.osmo-animate-chars__text {
  white-space: nowrap;
  line-height: 1.3;
}

.osmo-animate-chars [data-button-animate-chars] {
  overflow: hidden;
  position: relative;
  display: inline-block;
}

.osmo-animate-chars [data-button-animate-chars] span {
  display: inline-block;
  position: relative;
  text-shadow: 0px 1.3em currentColor;
  transform: translateY(0em) rotate(0.001deg);
  transition: transform 0.6s cubic-bezier(0.625, 0.05, 0, 1);
}

.osmo-animate-chars:hover [data-button-animate-chars] span {
  transform: translateY(-1.3em) rotate(0.001deg);
}

/* ========================= Responsive (Mobile: max-width 767px) ========================= */
@media screen and (max-width: 767px) {
  /* Nav bar width - edge to edge padding */
  .osmo-nav-bar__width {
    padding: 0;
  }

  /* Nav bar back - creates "pill" look when closed on mobile */
  .osmo-nav-bar__back {
    inset: 0.5em;
  }

  /* When open on mobile, expand with NEGATIVE inset to hide border radius */
  .osmo-nav.is--active .osmo-nav-bar__back {
    inset: -0.25em;
  }

  /* Top bar height */
  .osmo-nav-bar__top {
    height: var(--osmo-nav-bar-height);
    padding: 1em;
  }

  /* Bottom inner - full viewport width, scrollable */
  .osmo-nav-bar__bottom-inner {
    max-height: calc(100dvh - var(--osmo-nav-bar-height));
    width: 100vw;
    padding: 1em 1em 1.25em;
    overflow: scroll;
  }

  /* Line separator - edge-to-edge on mobile when active */
  .osmo-nav-bar__line {
    left: 0;
    right: 0;
  }

  /* Bottom row - vertical stacking, no gap */
  .osmo-nav-bar__bottom-row {
    flex-direction: column;
    gap: 0;
  }

  /* Bottom columns */
  .osmo-nav-bar__bottom-col {
    gap: 1em;
    padding: 1.25em 2.25em 2em;
  }

  .osmo-nav-bar__bottom-col.is--products {
    gap: 0.5em;
    padding: 2em 2.25em 1em;
  }

  /* Hide Explore label on mobile */
  .osmo-nav-bar__tag-row.is--membership {
    display: none;
  }

  /* Menu item links - smaller padding and font on mobile */
  .osmo-nav-bar__big-a {
    padding-top: 0.8125em;
    padding-bottom: 0.875em;
  }

  .osmo-nav-bar__big-span {
    font-size: 1.25em;
    font-weight: 400;
    font-variation-settings: 'wght' 400;
  }

  /* Hide Easings (small-ul) on mobile */
  .osmo-nav-bar__small-ul {
    display: none;
  }

  /* Hide socials on mobile */
  .osmo-nav-bar__socials {
    padding-top: 0;
    display: none;
  }

  /* Mobile buttons - full width with negative margins to bleed */
  .osmo-nav-bar__mobile-buttons {
    display: flex;
    width: 100%;
    margin-bottom: -2em;
    padding-top: 0.5em;
  }

  /* Hide language switcher label on mobile (optional) */
  .osmo-nav-bar__language {
    display: none;
  }
}

/* Hide Featured card on tablet and below */
@media screen and (max-width: 991px) {
  .osmo-nav-bar__bottom-col.is--ad {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  /* Hide mobile buttons on desktop */
  .osmo-nav-bar__mobile-buttons {
    display: none;
  }
}
</style>
.osmo-mobile-button.is--electric .osmo-mobile-button__bg {
  background-color: rgba(11, 216, 182, 0.9);
  border: 1px solid rgba(11, 216, 182, 0.3);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
    0 4px 12px rgba(11, 216, 182, 0.3);
}

.osmo-mobile-button.is--electric:hover .osmo-mobile-button__bg {
  background-color: rgba(138, 230, 80, 0.95);
  border-color: rgba(138, 230, 80, 0.4);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
    0 6px 16px rgba(138, 230, 80, 0.4);
}
.osmo-mobile-button.is--electric {
  color: #1e1e1e;
}
