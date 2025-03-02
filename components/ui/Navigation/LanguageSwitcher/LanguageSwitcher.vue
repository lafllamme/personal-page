<script lang="ts" setup>
import type { LanguageSwitcherProps } from './LanguageSwitcher.model'
import { languages } from '@/types/i18n'
import { breakpointsTailwind, onClickOutside, useBreakpoints } from '@vueuse/core'
import { computed, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { LanguageSwitcherDefaults } from './LanguageSwitcher.model'

const props = withDefaults(defineProps<LanguageSwitcherProps>(), LanguageSwitcherDefaults)
const emit = defineEmits<{ (e: 'update:open', state: boolean): void }>()
const { open } = toRefs(props)

// References for container, button, and menu
const container = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)

// Track how the menu was opened: via 'hover' or 'click'
const activationSource = ref<'hover' | 'click' | null>(null)
const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerMD = computed(() => breakpoints.smaller('md').value)

// Timer reference for closing the menu (safe area)
let closeTimer: number | null = null

function startCloseTimer() {
  closeTimer = window.setTimeout(() => {
    emit('update:open', false)
    activationSource.value = null
    closeTimer = null
  }, 300)
}

function cancelCloseTimer() {
  if (closeTimer !== null) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

const { locale, t, setLocale } = useI18n()
const currentLanguageLabel = computed(() => (locale.value || '').toUpperCase())

// Helper to detect mobile devices
function toggleLanguage() {
  cancelCloseTimer()
  if (open.value) {
    emit('update:open', false)
    activationSource.value = null
  }
  else {
    emit('update:open', true)
    activationSource.value = 'click'
  }
  buttonRef.value?.focus()
}

// Adding touchstart to handle mobile taps immediately
function onButtonTouchStart(e: TouchEvent) {
  toggleLanguage()
  // Prevent the click from firing later, which might cause double toggling
  e.preventDefault()
}

function onButtonMouseEnter() {
  cancelCloseTimer()
  if (!open.value) {
    emit('update:open', true)
    activationSource.value = 'hover'
  }
}

function onButtonMouseLeave() {
  if (activationSource.value !== 'click') {
    startCloseTimer()
  }
}

function onMenuMouseEnter() {
  cancelCloseTimer()
}

function onMenuMouseLeave() {
  if (activationSource.value !== 'click') {
    startCloseTimer()
  }
}

function changeLanguage(code: string) {
  setLocale(code)
  emit('update:open', false)
  activationSource.value = null
}

onClickOutside(container, () => {
  emit('update:open', false)
  activationSource.value = null
})

const sortedLanguages = computed(() => {
  const copy = [...languages]
  copy.sort((a, b) => {
    const labelA = t(a.labelKey)
    const labelB = t(b.labelKey)
    return labelA.localeCompare(labelB, locale.value, { sensitivity: 'base' })
  })
  return copy
})
</script>

<template>
  <div
    ref="container"
    class="relative transition-colors duration-900 ease-[cubic-bezier(0.77,0,0.18,1)]"
  >
    <button
      ref="buttonRef"
      :aria-expanded="open"
      :class="useClsx(
        'cursor-pointer hover:text-mint-12 hover:bg-gray-2/50 dark:hover:bg-gray-3/50',
        'flex items-center rounded-full px-2 py-1 antialiased font-700',
        'focus:ring-pureBlack dark:focus:ring-pureWhite focus:outline-none focus:ring-2',
        'ring-offset-pureBlack dark:ring-offset-pureWhite',
        'hover:shadow-md hover:shadow-pureBlack/5 hover:dark:shadow-pureWhite/5',
      )"
      aria-controls="language-menu"
      aria-haspopup="true"
      @click="toggleLanguage"
      @mouseenter="onButtonMouseEnter"
      @mouseleave="onButtonMouseLeave"
      @touchstart="onButtonTouchStart"
      @keydown.esc="emit('update:open', false)"
    >
      <span>{{ currentLanguageLabel }}</span>
      <Icon
        :class="useClsx(open ? 'rotate-180' : 'rotate-0')"
        aria-hidden="true"
        class="ml-1 h-4 w-4 transition-transform duration-300 ease-in-out"
        name="ri:arrow-down-s-line"
      />
    </button>

    <!-- Menu container with vertical growing animation -->
    <div
      id="language-menu"
      ref="menuRef"
      :class="useClsx(
        open ? 'opacity-100 pointer-events-auto scale-y-100' : 'opacity-0 pointer-events-none scale-y-0',
        'origin-top',
        'ring-pureBlack/5 dark:ring-pureWhite/5 ring-1',
        'absolute right-0 mt-2 w-36 rounded-xl shadow-lg',
        'backdrop-blur-md backdrop-saturate-150',
        'bg-pureWhite/10 dark:bg-pureBlack/10',
        'transition-all duration-600 ease-[cubic-bezier(0.77,0,0.18,1)]',
        'focus:outline-none',
      )"
      role="menu"
      tabindex="-1"
      @mouseenter="onMenuMouseEnter"
      @mouseleave="onMenuMouseLeave"
    >
      <div class="overflow-visible py-2">
        <NuxtLinkLocale
          v-for="(lang, index) in sortedLanguages"
          :key="lang.code"
          :class="useClsx(
            'hover:bg-pureWhite/50 hover:dark:bg-pureBlack/50 hover:bg-op-50',
            'hover:text-mint-12',
            'focus:ring-pureBlack dark:focus:ring-pureWhite font-600 antialiased focus:outline-none focus:ring-2 focus:ring-inset',
            'block cursor-pointer px-4 py-2 text-sm font-mono uppercase text-center',
          )"
          :tabindex="open ? 0 : -1"
          role="menuitem"
          @click="changeLanguage(lang.code)"
          @keydown.enter="changeLanguage(lang.code)"
        >
          <span
            :class="useClsx(
              open ? 'opacity-100 translate-y-0 duration-600' : 'opacity-0 translate-y-2 duration-300',
            )"
            :style="{ transitionDelay: open ? `${300 + index * 50}ms` : '10ms' }"
            class="inline-block transition-all ease-out"
          >
            {{ t(lang.labelKey) }}
          </span>
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml">
en:
  languages:
    de: "Deutsch"
    en: "English"
    fr: "Français"
    ja: "日本語"
    zh: "中文"
    pt: "Português"
    es: "Español"
    pl: "Polski"
    da: "Dansk"
    cs: "Čeština"
    nl: "Nederlands"
    el: "Ελληνικά"
    tr: "Türkçe"
    ko: "한국어"
    uk: "Українська"
    ar: "العربية"

de:
  languages:
    de: "Deutsch"
    en: "English"
    fr: "Français"
    ja: "日本語"
    zh: "中文"
    pt: "Português"
    es: "Español"
    pl: "Polski"
    da: "Dansk"
    cs: "Čeština"
    nl: "Nederlands"
    el: "Ελληνικά"
    tr: "Türkçe"
    ko: "한국어"
    uk: "Українська"
    ar: "العربية"

fr:
  languages:
    de: "Deutsch"
    en: "English"
    fr: "Français"
    ja: "日本語"
    zh: "中文"
    pt: "Português"
    es: "Español"
    pl: "Polski"
    da: "Dansk"
    cs: "Čeština"
    nl: "Nederlands"
    el: "Ελληνικά"
    tr: "Türkçe"
    ko: "한국어"
    uk: "Українська"
    ar: "العربية"

ja:
  languages:
    de: "Deutsch"
    en: "English"
    fr: "Français"
    ja: "日本語"
    zh: "中文"
    pt: "Português"
    es: "Español"
    pl: "Polski"
    da: "Dansk"
    cs: "Čeština"
    nl: "Nederlands"
    el: "Ελληνικά"
    tr: "Türkçe"
    ko: "한국어"
    uk: "Українська"
    ar: "العربية"

zh:
  languages:
    de: "Deutsch"
    en: "English"
    fr: "Français"
    ja: "日本語"
    zh: "中文"
    pt: "Português"
    es: "Español"
    pl: "Polski"
    da: "Dansk"
    cs: "Čeština"
    nl: "Nederlands"
    el: "Ελληνικά"
    tr: "Türkçe"
    ko: "한국어"
    uk: "Українська"
    ar: "العربية"

pt:
  languages:
    de: "Deutsch"
    en: "English"
    fr: "Français"
    ja: "日本語"
    zh: "中文"
    pt: "Português"
    es: "Español"
    pl: "Polski"
    da: "Dansk"
    cs: "Čeština"
    nl: "Nederlands"
    el: "Ελληνικά"
    tr: "Türkçe"
    ko: "한국어"
    uk: "Українська"
    ar: "العربية"

es:
  languages:
    de: "Deutsch"
    en: "English"
    fr: "Français"
    ja: "日本語"
    zh: "中文"
    pt: "Português"
    es: "Español"
    pl: "Polski"
    da: "Dansk"
    cs: "Čeština"
    nl: "Nederlands"
    el: "Ελληνικά"
    tr: "Türkçe"
    ko: "한국어"
    uk: "Українська"
    ar: "العربية"

pl:
  languages:
    de: "Deutsch"
    en: "English"
    fr: "Français"
    ja: "日本語"
    zh: "中文"
    pt: "Português"
    es: "Español"
    pl: "Polski"
    da: "Dansk"
    cs: "Čeština"
    nl: "Nederlands"
    el: "Ελληνικά"
    tr: "Türkçe"
    ko: "한국어"
    uk: "Українська"
    ar: "العربية"

da:
  languages:
    de: "Deutsch"
    en: "English"
    fr: "Français"
    ja: "日本語"
    zh: "中文"
    pt: "Português"
    es: "Español"
    pl: "Polski"
    da: "Dansk"
    cs: "Čeština"
    nl: "Nederlands"
    el: "Ελληνικά"
    tr: "Türkçe"
    ko: "한국어"
    uk: "Українська"
    ar: "العربية"

cs:
  languages:
    de: "Deutsch"
    en: "English"
    fr: "Français"
    ja: "日本語"
    zh: "中文"
    pt: "Português"
    es: "Español"
    pl: "Polski"
    da: "Dansk"
    cs: "Čeština"
    nl: "Nederlands"
    el: "Ελληνικά"
    tr: "Türkçe"
    ko: "한국어"
    uk: "Українська"
    ar: "العربية"

nl:
  languages:
    de: "Deutsch"
    en: "English"
    fr: "Français"
    ja: "日本語"
    zh: "中文"
    pt: "Português"
    es: "Español"
    pl: "Polski"
    da: "Dansk"
    cs: "Čeština"
    nl: "Nederlands"
    el: "Ελληνικά"
    tr: "Türkçe"
    ko: "한국어"
    uk: "Українська"
    ar: "العربية"

el:
  languages:
    de: "Deutsch"
    en: "English"
    fr: "Français"
    ja: "日本語"
    zh: "中文"
    pt: "Português"
    es: "Español"
    pl: "Polski"
    da: "Dansk"
    cs: "Čeština"
    nl: "Nederlands"
    el: "Ελληνικά"
    tr: "Türkçe"
    ko: "한국어"
    uk: "Українська"
    ar: "العربية"

tr:
  languages:
    de: "Deutsch"
    en: "English"
    fr: "Français"
    ja: "日本語"
    zh: "中文"
    pt: "Português"
    es: "Español"
    pl: "Polski"
    da: "Dansk"
    cs: "Čeština"
    nl: "Nederlands"
    el: "Ελληνικά"
    tr: "Türkçe"
    ko: "한국어"
    uk: "Українська"
    ar: "العربية"

ko:
  languages:
    de: "Deutsch"
    en: "English"
    fr: "Français"
    ja: "日本語"
    zh: "中文"
    pt: "Português"
    es: "Español"
    pl: "Polski"
    da: "Dansk"
    cs: "Čeština"
    nl: "Nederlands"
    el: "Ελληνικά"
    tr: "Türkçe"
    ko: "한국어"
    uk: "Українська"
    ar: "العربية"

uk:
  languages:
    de: "Deutsch"
    en: "English"
    fr: "Français"
    ja: "日本語"
    zh: "中文"
    pt: "Português"
    es: "Español"
    pl: "Polski"
    da: "Dansk"
    cs: "Čeština"
    nl: "Nederlands"
    el: "Ελληνικά"
    tr: "Türkçe"
    ko: "한국어"
    uk: "Українська"
    ar: "العربية"

ar:
  languages:
    de: "Deutsch"
    en: "English"
    fr: "Français"
    ja: "日本語"
    zh: "中文"
    pt: "Português"
    es: "Español"
    pl: "Polski"
    da: "Dansk"
    cs: "Čeština"
    nl: "Nederlands"
    el: "Ελληνικά"
    tr: "Türkçe"
    ko: "한국어"
    uk: "Українська"
    ar: "العربية"
</i18n>
