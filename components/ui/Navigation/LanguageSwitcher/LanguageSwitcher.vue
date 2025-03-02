<script lang="ts" setup>
import type { LanguageSwitcherProps } from './LanguageSwitcher.model'
import { languages } from '@/types/i18n'
import { onClickOutside, useDebounceFn } from '@vueuse/core'
import { computed, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { LanguageSwitcherDefaults } from './LanguageSwitcher.model'

const props = withDefaults(defineProps<LanguageSwitcherProps>(), LanguageSwitcherDefaults)

// Define emit for language menu state changes.
const emit = defineEmits<{
  (e: 'update:open', state: boolean): void
}>()

const { open } = toRefs(props)

const langSwitcher = ref<HTMLElement | null>(null)
const langSwitcherButton = ref<HTMLButtonElement | null>(null)
const languageMenu = ref<HTMLElement | null>(null)

// Local state to keep track of how the menu was activated
const activationSource = ref<'hover' | 'click' | null>(null)
// Flag to temporarily ignore hover events after a click.
const ignoreHover = ref(false)
const resetIgnoreHover = useDebounceFn(() => {
  ignoreHover.value = false
}, 200)

const { locale, t, setLocale } = useI18n()
const currentLanguageLabel = computed(() => (locale.value || '').toUpperCase())

// Toggle menu when the button is clicked.
function toggleLanguage() {
  consola.info('[LanguageSwitcher] Click => Toggle language menu')
  // Set flag to ignore any hover events for a short time.
  ignoreHover.value = true
  resetIgnoreHover()

  if (open.value) {
    // If open, close it.
    emit('update:open', false)
    activationSource.value = null
  }
  else {
    // Otherwise open it and mark the activation as a click.
    emit('update:open', true)
    activationSource.value = 'click'
  }
  langSwitcherButton.value?.focus()
}

// Open the menu on hover if not already open or if we're not ignoring hover events.
function openLanguage() {
  consola.info('[LanguageSwitcher] Mouse Enter => Open language menu')
  if (!open.value && !ignoreHover.value) {
    emit('update:open', true)
    activationSource.value = 'hover'
  }
  langSwitcherButton.value?.focus()
}

// If the menu was opened by hover, close it on mouse leave.
function closeLanguage() {
  consola.info('[LanguageSwitcher] Mouse Leave from menu')
  if (activationSource.value === 'hover') {
    emit('update:open', false)
    activationSource.value = null
  }
}

// Change language and close the menu.
function changeLanguage(code: string) {
  setLocale(code)
  emit('update:open', false)
  activationSource.value = null
}

// Close the menu when clicking outside of the entire switcher.
onClickOutside(langSwitcher, () => {
  if (open.value) {
    emit('update:open', false)
    activationSource.value = null
  }
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
  <div
    ref="langSwitcher"
    class="relative transition-colors duration-900 ease-[cubic-bezier(0.77,0,0.18,1)]"
  >
    <button
      ref="langSwitcherButton"
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
      @mouseenter="openLanguage"
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
    <div
      v-show="open"
      id="language-menu"
      ref="languageMenu"
      :class="useClsx(
        'ring-pureBlack/5 dark:ring-pureWhite/5 ring-1',
        'absolute right-0 mt-2 w-36 rounded-xl shadow-lg',
        'backdrop-blur-md backdrop-saturate-150',
        'bg-pureWhite/10 dark:bg-pureBlack/10',
        'focus:outline-none',
      )"
      role="menu"
      tabindex="-1"
      @mouseleave="closeLanguage"
    >
      <div class="overflow-visible py-2">
        <NuxtLinkLocale
          v-for="lang in sortedLanguages"
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
          {{ t(lang.labelKey) }}
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
