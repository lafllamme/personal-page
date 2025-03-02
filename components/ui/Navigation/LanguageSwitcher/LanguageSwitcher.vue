<script lang="ts" setup>
import type { LanguageSwitcherProps } from './LanguageSwitcher.model'
import { languages } from '@/types/i18n'
import { onClickOutside } from '@vueuse/core'
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

// Timer reference for closing the menu (safe area)
let closeTimer: number | null = null

// Start a close timer when mouse leaves (applies for both click and hover activations)
function startCloseTimer() {
  closeTimer = window.setTimeout(() => {
    emit('update:open', false)
    activationSource.value = null
    closeTimer = null
  }, 300) // 300ms delay gives the user a safe area to re-enter
}

// Cancel any scheduled close
function cancelCloseTimer() {
  if (closeTimer !== null) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

const { locale, t, setLocale } = useI18n()
const currentLanguageLabel = computed(() => (locale.value || '').toUpperCase())

// Toggle the menu on button click.
// Whether the menu was opened via click or hover, clicking toggles it.
function toggleLanguage() {
  cancelCloseTimer() // cancel any pending close action
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

// When mouse enters the button, cancel any close timer and open if not already open.
function onButtonMouseEnter() {
  cancelCloseTimer()
  if (!open.value) {
    emit('update:open', true)
    activationSource.value = 'hover'
  }
}

// When mouse leaves the button, start the close timer.
function onButtonMouseLeave() {
  startCloseTimer()
}

// When mouse enters the menu, cancel the close timer.
function onMenuMouseEnter() {
  cancelCloseTimer()
}

// When mouse leaves the menu, start the close timer.
function onMenuMouseLeave() {
  startCloseTimer()
}

// Change language and close the menu.
function changeLanguage(code: string) {
  setLocale(code)
  emit('update:open', false)
  activationSource.value = null
}

// Close the menu if clicking outside the entire container.
onClickOutside(container, () => {
  emit('update:open', false)
  activationSource.value = null
})

// Sort languages alphabetically based on their translated label.
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
  <!-- Container that wraps both the button and dropdown.
       Mouseenter/mouseleave events are attached to both elements to allow a safe area. -->
  <div
    ref="container"
    class="relative transition-colors duration-900 ease-[cubic-bezier(0.77,0,0.18,1)]"
  >
    <button
      ref="buttonRef"
      :aria-expanded="open"
      :class="useClsx(
        'hover:text-mint-12 hover:bg-gray-2/50 dark:hover:bg-gray-3/50',
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
    <!-- Always render the menu; toggle its visibility using opacity classes -->
    <div
      id="language-menu"
      ref="menuRef"
      :class="useClsx(
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        'ring-pureBlack/5 dark:ring-pureWhite/5 ring-1',
        'absolute right-0 mt-2 w-36 rounded-xl shadow-lg',
        'backdrop-blur-md backdrop-saturate-150',
        'bg-pureWhite/10 dark:bg-pureBlack/10',
        'transition-opacity duration-300',
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
          role="menuitem"
          tabindex="0"
          @click="changeLanguage(lang.code)"
          @keydown.enter="changeLanguage(lang.code)"
        >
          <span
            :class="useClsx(
              open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
            )"
            :style="{ transitionDelay: open ? `${300 + index * 50}ms` : '0ms' }"
            class="inline-block transition-all duration-600 ease-out"
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
