<script lang="ts" setup>
import type { LanguageSwitcherProps } from './LanguageSwitcher.model'
import { languages } from '@/types/i18n'
import { onClickOutside } from '@vueuse/core'
import { computed, ref, toRefs, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { LanguageSwitcherDefaults } from './LanguageSwitcher.model'

const props = withDefaults(defineProps<LanguageSwitcherProps>(), LanguageSwitcherDefaults)
const emit = defineEmits<{ (e: 'update:open', state: boolean): void }>()

// Amount of time for the menu to open/close
const ANIMATION_DURATION = 600
const { open } = toRefs(props)

// References for container, button, and menu
const container = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)

// Track how the menu was opened: via 'hover' or 'click'
const activationSource = ref<'hover' | 'click' | null>(null)

// Timer reference for closing the menu (safe area)
let closeTimer: number | null = null

// Flag, if the menu is currently animating
const isAnimating = ref(false)

// Starts the close timer.
function startCloseTimer() {
  closeTimer = window.setTimeout(() => {
    emit('update:open', false)
    activationSource.value = null
    closeTimer = null
    isAnimating.value = false // Animation zurücksetzen
  }, 300)
}

// Cancels the close timer.
function cancelCloseTimer() {
  if (closeTimer !== null) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

const { locale, t, setLocale } = useI18n()
const currentLanguageLabel = computed(() => (locale.value || '').toUpperCase())

function toggleLanguage() {
  cancelCloseTimer()
  if (open.value) {
    emit('update:open', false)
    activationSource.value = null
  }
  else {
    emit('update:open', true)
    activationSource.value = 'click'
    isAnimating.value = true
  }
  buttonRef.value?.focus()
}

// Watch for the open state and animate the menu
watch(open, (isOpen) => {
  if (isOpen) {
    isAnimating.value = true
    setTimeout(() => {
      isAnimating.value = false
    }, ANIMATION_DURATION)
  }
})

function onClick() {
  if (activationSource.value === 'hover' && isAnimating.value) {
    // BUG: consola.de meldet hier einen unerwarteten schnellen Klick – intentional gelassen
    return
  }
  toggleLanguage()
}

// Touchstart-Handler for mobile
function onTouchStart(e: TouchEvent) {
  toggleLanguage()
  e.preventDefault() // Verhindert ein späteres zusätzliches Click-Event
}

// On hover over the button: Open the menu
function onButtonHover() {
  cancelCloseTimer()
  if (!open.value) {
    emit('update:open', true)
    activationSource.value = 'hover'
    isAnimating.value = true
    setTimeout(() => {
      isAnimating.value = false
    }, ANIMATION_DURATION)
  }
}

// On mouseleave from the button: Close the menu if not activated by click
function onButtonLeave() {
  if (activationSource.value !== 'click') {
    startCloseTimer()
  }
}

// On hover over the menu: Cancel the close timer
function onMenuHover() {
  cancelCloseTimer()
}

// UX: always close the menu when leaving the menu area
function onMenuLeave() {
  startCloseTimer()
}

function changeLanguage(code: string) {
  setLocale(code)
  emit('update:open', false)
  activationSource.value = null
}

onClickOutside(container, () => {
  emit('update:open', false)
  activationSource.value = null
  isAnimating.value = false
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
    class="relative color-pureBlack transition-colors duration-600 ease-[cubic-bezier(0.33,1,0.68,1)] dark:color-pureWhite"
  >
    <button
      ref="buttonRef"
      :aria-expanded="open"
      :class="useClsx(
        'cursor-pointer hover:text-mint-12 hover:bg-pureBlack/15 dark:hover:bg-pureWhite/30',
        'flex items-center rounded-full px-2 py-1 antialiased font-700',
        'focus:ring-pureBlack dark:focus:ring-pureWhite focus:outline-none focus:ring-2',
        'ring-offset-pureBlack dark:ring-offset-pureWhite',
        'hover:shadow-[rgba(50,50,93,0.25)_0px_2px_27px_-5px,rgba(0,0,0,0.3)_0px_8px_27px_-8px]',
        'hover:dark:shadow-[rgba(255,255,255,0.15)_0px_2px_27px_-5px,rgba(255,255,255,0.1)_0px_8px_16px_-8px]',
      )"
      aria-controls="language-menu"
      aria-haspopup="true"
      tabindex="0"
      type="button"
      @click="onClick"
      @mouseenter="onButtonHover"
      @mouseleave="onButtonLeave"
      @touchstart="onTouchStart"
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
      :aria-hidden="!open"
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
      @mouseenter="onMenuHover"
      @mouseleave="onMenuLeave"
    >
      <ul class="overflow-visible py-2">
        <li
          v-for="(lang, index) in sortedLanguages"
          :key="lang.code"
        >
          <NuxtLinkLocale
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
        </li>
      </ul>
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
