<script lang="ts" setup>
import type { LanguageSwitcherProps } from './LanguageSwitcher.model'
import { languages } from '@/types/i18n'
import { onClickOutside } from '@vueuse/core'
import { LanguageSwitcherDefaults } from './LanguageSwitcher.model'

const props = withDefaults(defineProps<LanguageSwitcherProps>(), LanguageSwitcherDefaults)

// Toggle language dropdown
// define an emit when the language is changed
const emit = defineEmits<{
  (e: 'update:open', state: boolean): void
}>()

const { open } = toRefs(props)

const langSwitcher = ref<HTMLElement | null>(null)
const { locale, t, setLocale } = useI18n()

const currentLanguageLabel = computed(() => {
  return (locale.value || '').toUpperCase()
})

function toggleLanguage() {
  // open.value = !open.value
  console.debug('[Toggle] Language, Open ?', open.value)
  emit('update:open', !open.value)
}

function changeLanguage(code: string) {
  // Set the locale to the selected language
  setLocale(code)
  // Close the dropdown
  open.value = false
  emit('update:open', false)
}

// Close dropdown when clicking outside
onClickOutside(langSwitcher, () => {
  if (open.value) {
    open.value = false
    emit('update:open', false)
  }
})

const sortedLanguages = computed(() => {
  // Make a shallow copy so we don’t mutate the original array
  const copy = [...languages]

  // Sort by their translated label
  copy.sort((a, b) => {
    const labelA = t(a.labelKey)
    const labelB = t(b.labelKey)
    // Compare them with localeCompare for proper alphabetical sorting
    return labelA.localeCompare(labelB, locale.value, { sensitivity: 'base' })
  })

  return copy
})

watch(open, (newVal) => {
  console.debug('open', newVal)
})
</script>

<template>
  <div
    ref="langSwitcher"
    class="relative transition-colors duration-900 ease-[cubic-bezier(0.77,0,0.18,1)]"
  >
    <button
      :aria-expanded="open"
      :class="useClsx(
        'hover:text-mint-12 hover:bg-gray-2/50 dark:hover:bg-gray-3/50',
        'flex items-center rounded-full px-2 py-1 antialiased font-700',
        'focus:ring-pureBlack dark:focus:ring-pureWhite focus:outline-none focus:ring-2 ',
        'ring-offset-pureBlack dark:ring-offset-pureWhite ',
        'hover:shadow-md hover:shadow-pureBlack/5 hover:dark:shadow-pureWhite/5',
      )"
      aria-controls="language-menu"
      aria-haspopup="true"
      @click="toggleLanguage"
      @mouseenter="toggleLanguage"
      @keydown.esc="open = false"
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
      :class="useClsx(
        'ring-pureBlack/5 dark:ring-pureWhite/5 ring-1',
        'absolute right-0 mt-2 w-36 rounded-xl shadow-lg',
        'backdrop-blur-md backdrop-saturate-150',
        'bg-pureWhite/10 dark:bg-pureBlack/10',

      )"
      role="menu"
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
