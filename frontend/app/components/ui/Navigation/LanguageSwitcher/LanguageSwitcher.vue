<script lang="ts" setup>
import type { LanguageSwitcherProps } from './LanguageSwitcher.model'
import { AnimatePresence, Motion } from 'motion-v'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { languages } from '~/types/i18n'
import { LanguageSwitcherDefaults } from './LanguageSwitcher.model'

const props = withDefaults(defineProps<LanguageSwitcherProps>(), LanguageSwitcherDefaults)
const emit = defineEmits<{ (e: 'update:open', state: boolean): void }>()

const { locale, t, setLocale } = useI18n()
const isOsmoTone = computed(() => props.tone === 'osmo')

const sortedLanguages = computed(() => {
  const copy = [...languages]
  copy.sort((a, b) => {
    const labelA = t(a.labelKey)
    const labelB = t(b.labelKey)
    return labelA.localeCompare(labelB, locale.value, { sensitivity: 'base' })
  })
  return copy
})

const currentIndex = computed(() => {
  const index = sortedLanguages.value.findIndex((lang) => lang.code === locale.value)
  return index >= 0 ? index : 0
})
const currentLabel = computed(() => t(sortedLanguages.value[currentIndex.value].labelKey))
const labelChars = computed(() => currentLabel.value.split(''))
const isHovered = ref(false)

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

function setLanguage(code: string) {
  setLocale(code)
  emit('update:open', false)
}

function goNext() {
  const nextIndex = (currentIndex.value + 1) % sortedLanguages.value.length
  setLanguage(sortedLanguages.value[nextIndex].code)
}

function goPrev() {
  const prevIndex = (currentIndex.value - 1 + sortedLanguages.value.length) % sortedLanguages.value.length
  setLanguage(sortedLanguages.value[prevIndex].code)
}

</script>

<template>
  <div
    :class="useClsx(
      'relative flex items-center',
      isOsmoTone ? 'text-[#F4F4F4]' : 'text-pureBlack dark:text-pureWhite',
    )"
  >
    <div
      :class="useClsx(
        'flex items-center gap-1 rounded-sm px-1 py-0.5',
        isOsmoTone ? 'bg-[#2D2A2A]' : 'bg-pureBlack/5 dark:bg-pureWhite/10',
      )"
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        :class="useClsx(
          'size-8 flex items-center justify-center rounded-sm transition-colors',
          isOsmoTone
            ? 'text-[#F4F4F4]/70 hover:text-[#F4F4F4] hover:bg-[#3A3737]'
            : 'text-pureBlack/70 dark:text-pureWhite/70 hover:text-pureBlack dark:hover:text-pureWhite hover:bg-pureBlack/10 dark:hover:bg-pureWhite/10',
        )"
        aria-label="Previous language"
        @click="goPrev"
      >
        <Icon name="ri:arrow-left-line" class="size-4 color-pureBlack dark:color-pureWhite" />
      </button>

      <div
        :class="useClsx(
          'min-w-[6rem] px-2 text-center text-[0.65rem] tracking-[0.3em] uppercase',
          isOsmoTone ? 'figtree-regular' : 'font-baskerville',
        )"
      >
        <AnimatePresence mode="wait">
          <Motion
            :key="locale"
            as="span"
            class="inline-block"
            :initial="{ opacity: 0, y: 6 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: -6 }"
            :transition="{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }"
          >
            <span
              class="relative inline-block h-[1.6em] overflow-hidden"
              @mouseenter="isHovered = true"
              @mouseleave="isHovered = false"
            >
              <Motion
                as="span"
                class="inline-flex"
                :variants="containerVariants"
                initial="hidden"
                :animate="isHovered ? 'visible' : 'exit'"
              >
                <Motion
                  v-for="(char, index) in labelChars"
                  :key="`first-${char}-${index}`"
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
                class="absolute inset-0 inline-flex items-center justify-center"
                :variants="containerVariants"
                initial="hidden"
                :animate="isHovered ? 'visible' : 'exit'"
              >
                <Motion
                  v-for="(char, index) in labelChars"
                  :key="`second-${char}-${index}`"
                  as="span"
                  :variants="charVariants2"
                  class="inline-block"
                  :style="{ display: char === ' ' ? 'inline' : 'inline-block', whiteSpace: 'pre' }"
                >
                  {{ char }}
                </Motion>
              </Motion>
            </span>
          </Motion>
        </AnimatePresence>
      </div>

      <button
        type="button"
        :class="useClsx(
          'size-8 flex items-center justify-center rounded-sm transition-colors',
          isOsmoTone
            ? 'text-[#F4F4F4]/70 hover:text-[#F4F4F4] hover:bg-[#3A3737]'
            : 'text-pureBlack/70 dark:text-pureWhite/70 hover:text-pureBlack dark:hover:text-pureWhite hover:bg-pureBlack/10 dark:hover:bg-pureWhite/10',
        )"
        aria-label="Next language"
        @click="goNext"
      >
        <Icon name="ri:arrow-right-line" class="size-4" />
      </button>
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
