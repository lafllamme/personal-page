<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import ColorMode from '@/components/ui/ColorMode/ColorMode.vue'
import LanguageSwitcher from '@/components/ui/Navigation/LanguageSwitcher/LanguageSwitcher.vue'
import { avatars, easings, explore, marqueeMessage, ourProducts, socialLinks } from './OsmoHeader.model'
import OsmoLogoMark from './OsmoLogoMark.vue'
import OsmoMenuIcon from './OsmoMenuIcon.vue'

const isScrolled = ref(false)
const colorMode = useColorMode()
const headerTone = useState<'light' | 'dark'>(
  'osmo-header-tone',
  () => (colorMode.value === 'dark' ? 'dark' : 'light'),
)
const isHeaderHidden = useState<boolean>('osmo-header-hidden', () => false)
const isMenuOpen = ref(false)

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

const charStagger = 0.01
const getLabelChars = (label: string) => Array.from(label)
function getCharStaggerStyle(index: number) {
  return {
    transitionDelay: `${index * charStagger}s`,
  }
}

onMounted(() => {
  if (!import.meta.client)
    return

  const updateScrollState = () => {
    isScrolled.value = window.scrollY > 50
  }

  updateScrollState()
  useEventListener(window, 'scroll', updateScrollState, { passive: true })
  useEventListener(document, 'keydown', handleKeydown)
})

watch(colorMode, () => {
  headerTone.value = colorMode.value === 'dark' ? 'dark' : 'light'
})
</script>

<template>
  <div>
    <!-- Main nav container -->
    <nav
      class="osmo-nav"
      :class="[
        isMenuOpen ? 'is--active' : 'is--inactive',
        isScrolled ? 'is--scrolled' : '',
        headerTone === 'dark' ? 'is--dark' : 'is--light',
      ]"
    >
      <!-- Background overlay (click to close) -->
      <div class="osmo-nav__bg" @click="closeMenu" />

      <!-- Nav bar wrapper -->
      <div class="osmo-nav-bar__wrap">
        <div class="osmo-nav-bar__width">
          <div class="osmo-nav-bar">
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
                  class="osmo-nav-menu"
                  :class="[headerFgClass, headerHoverBgClass]"
                  @click="toggleMenu"
                >
                  <OsmoMenuIcon :is-open="isMenuOpen" :tone="headerTone" />
                  <span class="osmo-nav-menu__label">Menu</span>
                </button>
              </div>

              <!-- Logo -->
              <div class="osmo-nav-bar__logo">
                <NuxtLink to="/" class="osmo-nav-logo" aria-label="Go to homepage">
                  <span class="osmo-nav-logo__wordmark" :class="headerFgClass">TECNEWS</span>
                  <OsmoLogoMark class="osmo-nav-logo__icon" />
                </NuxtLink>
              </div>

              <!-- Buttons -->
              <div class="osmo-nav-bar__buttons">
                <!-- Join: visible on all sizes -->
                <NuxtLink
                  to="/join"
                  class="osmo-nav-bar__join-btn"
                >
                  <span>Join</span>
                </NuxtLink>
                <!-- Color Mode Toggle -->
                <ColorMode class="osmo-nav-bar__color-mode" :tone="headerTone" />
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
                        'osmo-nav-bar__bottom-col is--products',
                        headerOutlineClass,
                      )"
                    >
                      <div class="osmo-nav-bar__tag-row">
                        <span :class="useClsx('osmo-eyebrow', headerFgClass)">Our Products</span>
                      </div>
                      <ul class="osmo-nav-bar__ul-big">
                        <li
                          v-for="item in ourProducts"
                          :key="item.name"
                          class="osmo-nav-bar__big-li"
                        >
                          <NuxtLink
                            :to="item.href"
                            :class="useClsx('osmo-nav-bar__big-a osmo-animate-chars', headerFgClass)"
                            @click="closeMenu"
                          >
                            <span class="osmo-animate-chars__text" data-button-animate-chars>
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
                              <span class="osmo-tag is--purple">{{ item.badge }}</span>
                            </span>
                          </NuxtLink>
                          <div class="osmo-line is--nav-transparent" />
                        </li>
                      </ul>
                      <ul class="osmo-nav-bar__small-ul">
                        <li
                          v-for="item in easings"
                          :key="item.name"
                          class="osmo-nav-bar__small-li"
                        >
                          <span :class="useClsx('osmo-nav-bar__small-a', headerFgClass)">
                            <span class="osmo-nav-bar__small-span">{{ item.name }}</span>
                            <span v-if="item.badge" class="osmo-nav-bar__a-tag is--small">
                              <span class="osmo-tag is--muted">{{ item.badge }}</span>
                            </span>
                          </span>
                        </li>
                      </ul>
                    </div>

                    <!-- Column 2: Explore -->
                    <div class="osmo-nav-bar__bottom-col">
                      <div class="osmo-nav-bar__tag-row is--membership">
                        <span :class="useClsx('osmo-eyebrow', headerFgClass)">Explore</span>
                      </div>
                      <ul class="osmo-nav-bar__ul-big">
                        <li
                          v-for="item in explore"
                          :key="item.name"
                          class="osmo-nav-bar__big-li"
                        >
                          <NuxtLink
                            :to="item.href"
                            :class="useClsx('osmo-nav-bar__big-a osmo-animate-chars', headerFgClass)"
                            @click="closeMenu"
                          >
                            <span class="osmo-animate-chars__text" data-button-animate-chars>
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
                        'osmo-nav-bar__bottom-col is--ad hidden xl:flex',
                        headerOutlineClass,
                      )"
                    >
                      <div class="osmo-nav-banner">
                        <div class="osmo-nav-banner__before" />
                        <div class="osmo-nav-banner__content">
                          <div class="osmo-nav-banner__tags">
                            <span class="osmo-tag is--muted">Featured</span>
                            <span class="osmo-tag is--purple">Milestone</span>
                          </div>
                          <div class="osmo-nav-banner__center-content">
                            <div class="osmo-nav-banner__title">
                              <h2 :class="useClsx('osmo-h-m', headerFgClass)">
                                We hit 1700
                                <br>
                                Members!
                              </h2>
                            </div>
                            <div class="osmo-nav-banner__btn">
                              <button class="osmo-button is--light">
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
                      class="osmo-mobile-button is--neutral"
                      @click="closeMenu"
                    >
                      <span>Member Login</span>
                    </NuxtLink>
                    <NuxtLink
                      to="/join"
                      class="osmo-mobile-button is--electric"
                      @click="closeMenu"
                    >
                      <span>Join Osmo</span>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Marquee -->
    <div
      class="osmo-marquee"
      :class="{ 'is--hidden': marqueeHidden }"
    >
      <div class="osmo-marquee__track">
        <span
          v-for="index in 10"
          :key="index"
          class="osmo-marquee__item"
        >
          {{ marqueeMessage }}
          <span class="osmo-marquee__star">✦</span>
        </span>
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
  --osmo-nav-bar-max-width: 40em;
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
  background-color: rgba(0, 0, 0, 0.3);
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
  max-width: var(--size-container, 80rem);
  padding: 1.25em;
  gap: 0.375em;
}

/* ========================= Nav Bar (The Pill) ========================= */
.osmo-nav-bar {
  position: relative;
  width: 100%;
  max-width: var(--osmo-nav-bar-max-width);
  pointer-events: auto;
  border-radius: 0.5em;
  transition: max-width var(--osmo-animation-onehalf) 0.2s;
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

.osmo-nav.is--scrolled .osmo-nav-bar__back {
  inset: 0.1875em;
}

.osmo-nav.is--scrolled.is--active .osmo-nav-bar__back {
  inset: 0;
}

.osmo-nav-bar__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.375em;
  pointer-events: none;
  transition: background-color 0.2s ease;
}

/* Light theme */
.osmo-nav.is--light .osmo-nav-bar__bg {
  background-color: #f4f4f4;
}

/* Dark theme */
.osmo-nav.is--dark .osmo-nav-bar__bg {
  background-color: #201d1d;
}

.osmo-nav-bar__outline {
  position: absolute;
  inset: calc(var(--osmo-stroke-weight) * -1);
  border-radius: 0.4375em;
  pointer-events: none;
  transition: opacity 0.2s ease;
  opacity: 0.08;
}

.osmo-nav.is--light .osmo-nav-bar__outline {
  background-color: rgba(0, 0, 0, 0.1);
}

.osmo-nav.is--dark .osmo-nav-bar__outline {
  background-color: rgba(255, 255, 255, 0.1);
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
  padding-left: 0.625em;
  padding-right: 1em;
  border-radius: 0.125em;
  cursor: pointer;
  background: transparent;
  border: none;
  transition:
    background-color var(--osmo-animation-half),
    gap var(--osmo-animation);
}

.osmo-nav.is--active .osmo-nav-menu {
  gap: 0.1875em;
}

.osmo-nav-menu__label {
  font-size: 1.125em;
  font-weight: 500;
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
  font-family: var(--font-cabinet, 'Cabinet Grotesk', sans-serif);
  font-size: 1.75rem;
  letter-spacing: -0.02em;
  transition:
    transform var(--osmo-animation),
    opacity var(--osmo-animation-half) 0.15s;
  transform: translateY(0) rotate(0.001deg);
  opacity: 1;
}

.osmo-nav.is--scrolled .osmo-nav-logo__wordmark {
  transform: translateY(0.75em) rotate(0.001deg);
  opacity: 0;
}

.osmo-nav.is--scrolled.is--active .osmo-nav-logo__wordmark {
  transform: translateY(0) rotate(0.001deg);
  opacity: 1;
}

.osmo-nav-logo__icon {
  position: absolute;
  width: 1.375em;
  opacity: 0;
  transition:
    transform var(--osmo-animation),
    opacity var(--osmo-animation-half) 0.15s;
  transform: translateY(-0.75em) rotate(0.001deg);
}

.osmo-nav.is--scrolled .osmo-nav-logo__icon {
  transform: translateY(0) rotate(0.001deg);
  opacity: 1;
}

.osmo-nav.is--scrolled.is--active .osmo-nav-logo__icon {
  transform: translateY(-0.75em) rotate(0.001deg);
  opacity: 0;
}

/* ========================= Buttons ========================= */
.osmo-nav-bar__buttons {
  display: flex;
  align-items: center;
  height: 2.5em;
  gap: 0.5em;
}

.osmo-nav-bar__join-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5em;
  padding: 0 1em;
  border-radius: 0.25em;
  background-color: #a1ff62;
  color: #1e1e1e;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.osmo-nav-bar__join-btn:hover {
  background-color: #8ae650;
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

.osmo-nav.is--light .osmo-nav-bar__line {
  background-color: rgba(0, 0, 0, 0.1);
}

.osmo-nav.is--dark .osmo-nav-bar__line {
  background-color: #312e2e;
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
  min-height: 0;
  overflow: hidden;
}

.osmo-nav-bar__bottom-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
  opacity: 0;
  transition:
    transform var(--osmo-animation) 0s,
    opacity var(--osmo-animation) 0s;
}

.osmo-nav-bar__bottom-row > *:nth-child(2) {
  transition:
    transform var(--osmo-animation) 0.075s,
    opacity var(--osmo-animation) 0.075s;
}

.osmo-nav-bar__bottom-row > *:nth-child(3) {
  transition:
    transform var(--osmo-animation) 0.15s,
    opacity var(--osmo-animation) 0.15s;
}

.osmo-nav.is--active .osmo-nav-bar__bottom-row > * {
  transform: translateY(0) rotate(0.001deg);
  opacity: 1;
  transition:
    transform var(--osmo-animation-onehalf) 0.3s,
    opacity var(--osmo-animation-onehalf) 0.3s;
}

.osmo-nav.is--active .osmo-nav-bar__bottom-row > *:nth-child(2) {
  transition:
    transform var(--osmo-animation-onehalf) 0.375s,
    opacity var(--osmo-animation-onehalf) 0.375s;
}

.osmo-nav.is--active .osmo-nav-bar__bottom-row > *:nth-child(3) {
  transition:
    transform var(--osmo-animation-onehalf) 0.45s,
    opacity var(--osmo-animation-onehalf) 0.45s;
}

/* ========================= Bottom Columns ========================= */
.osmo-nav-bar__bottom-col {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2em;
  gap: 1.375em;
}

.osmo-nav-bar__bottom-col.is--products {
  border-radius: 1em;
  backdrop-filter: blur(20px);
}

.osmo-nav.is--light .osmo-nav-bar__bottom-col.is--products {
  background-color: rgba(0, 0, 0, 0.03);
}

.osmo-nav.is--dark .osmo-nav-bar__bottom-col.is--products {
  background-color: rgba(255, 255, 255, 0.05);
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
  font-size: 0.75rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
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
  padding: 1em 0;
  text-decoration: none;
  font-size: 1.5em;
  font-weight: 430;
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
  padding: 0.3125em 0;
  pointer-events: none;
  opacity: 0.6;
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
  margin-left: 0.25em;
  margin-top: -0.75em;
  font-size: 0.5em;
  line-height: 1;
  opacity: 0.5;
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

.osmo-nav.is--dark .osmo-square-button {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.osmo-nav.is--light .osmo-square-button {
  background-color: rgba(0, 0, 0, 0.05);
  color: black;
}

.osmo-square-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.osmo-nav.is--light .osmo-square-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
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
  padding: 1em;
}

.osmo-mobile-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.5em;
  border-radius: 0.375em;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.osmo-mobile-button.is--neutral {
  background-color: #312e2e;
  color: white;
}

.osmo-mobile-button.is--neutral:hover {
  background-color: #3f3c3c;
}

.osmo-mobile-button.is--electric {
  background-color: #a1ff62;
  color: #1e1e1e;
}

.osmo-mobile-button.is--electric:hover {
  background-color: #8ae650;
}

.osmo-line {
  height: var(--osmo-stroke-weight);
}

.osmo-nav.is--dark .osmo-line.is--nav-transparent {
  background-color: rgba(255, 255, 255, 0.1);
}

.osmo-nav.is--light .osmo-line.is--nav-transparent {
  background-color: rgba(0, 0, 0, 0.1);
}

/* ========================= Tags ========================= */
.osmo-tag {
  display: inline-block;
  padding: 0.25em 0.5em;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  border-radius: 0.25em;
}

.osmo-tag.is--purple {
  background-color: #8023fe;
  color: white;
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

.osmo-nav.is--light .osmo-nav-banner {
  background-color: rgba(0, 0, 0, 0.03);
}

.osmo-nav.is--dark .osmo-nav-banner {
  background-color: rgba(255, 255, 255, 0.05);
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
  padding: 2em;
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
  padding-bottom: 2em;
}

.osmo-nav-banner__title {
  text-align: center;
}

.osmo-h-m {
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.1;
}

.osmo-nav-banner__btn {
  display: flex;
  justify-content: center;
  padding-top: 1.5em;
}

.osmo-button {
  height: 2.5em;
  padding: 0 1.25em;
  border: none;
  border-radius: 0.25em;
  font-size: 1rem;
  font-weight: 500;
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
  width: 4em;
  height: 4em;
  margin-left: -2em;
  margin-top: -2em;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #2a2727;
  background-color: #2a2727;
}

.osmo-nav-banner__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ========================= Marquee ========================= */
.osmo-marquee {
  position: fixed;
  top: 5.5rem;
  left: 0;
  right: 0;
  z-index: 30;
  margin: 0 auto;
  max-width: var(--osmo-nav-bar-max-width);
  width: calc(100vw - 40px);
  padding: 0.25em 0;
  border-radius: 0.25em;
  background-color: #01E2B6;
  overflow: hidden;
  transform: translateY(0) scale(1) rotate(0.001deg);
  transition: all var(--osmo-animation);
}

.osmo-marquee.is--hidden {
  transform: translateY(-2em) scale(0.975) rotate(0.001deg);
  pointer-events: none;
}

.osmo-marquee__track {
  display: flex;
  white-space: nowrap;
  animation: osmo-marquee 40s linear infinite;
}

.osmo-marquee__item {
  display: flex;
  align-items: center;
  gap: 1em;
  margin: 0 1em;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  color: #1e1e1e;
}

.osmo-marquee__star {
  color: #1e1e1e;
}

@keyframes osmo-marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
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

  /* When open on mobile, expand to edges */
  .osmo-nav.is--active .osmo-nav-bar__back {
    inset: -0.25em 0;
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

  /* Line separator - closed state has inset, open is edge-to-edge */
  .osmo-nav-bar__line {
    left: 0.5em;
    right: 0.5em;
  }

  .osmo-nav.is--active .osmo-nav-bar__line {
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
    padding-top: 2em;
    padding-bottom: 1em;
  }

  /* Hide Explore label on mobile */
  .osmo-nav-bar__tag-row.is--membership {
    display: none;
  }

  /* Menu item links - smaller padding and font on mobile */
  .osmo-nav-bar__big-a {
    padding-top: 0.8125em;
    padding-bottom: 0.875em;
    font-size: 1.25em;
  }

  /* Hide Easings (small-ul) on mobile */
  .osmo-nav-bar__small-ul {
    display: none;
  }

  /* Hide socials on mobile */
  .osmo-nav-bar__socials {
    display: none;
    padding-top: 0;
  }

  /* Mobile buttons - full width with negative margins to bleed */
  .osmo-nav-bar__mobile-buttons {
    display: flex;
    width: calc(100% + 4em);
    margin-left: -2em;
    margin-bottom: -2em;
    padding-top: 0.5em;
  }

  /* Hide language switcher label on mobile (optional) */
  .osmo-nav-bar__language {
    display: none;
  }

  .osmo-marquee {
    top: 5.5rem;
  }
}

/* Hide Featured card on tablet and below */
@media screen and (max-width: 991px) {
  .osmo-nav-bar__bottom-col.is--ad {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .osmo-marquee {
    top: 6rem;
  }

  /* Hide mobile buttons on desktop */
  .osmo-nav-bar__mobile-buttons {
    display: none;
  }
}
</style>
