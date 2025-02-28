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
  const found = languages.find(l => l.code === locale.value)
  return found ? t(found.labelKey) : ''
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

watch(open, (newVal) => {
  console.debug('open', newVal)
})
</script>

<template>
  <div
    ref="langSwitcher"
    class="relative"
  >
    <button
      :aria-expanded="open"
      :class="useClsx(
        'hover:text-gray-900 dark:hover:text-white',
        'flex items-center rounded-sm',
        'focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2',
      )"
      aria-controls="language-menu"
      aria-haspopup="true"
      @click="toggleLanguage"
      @keydown.esc="open = false"
    >
      <span>{{ currentLanguageLabel }}</span>
      <Icon
        aria-hidden="true"
        class="ml-1 h-4 w-4"
        name="ri:arrow-down-s-line"
      />
    </button>
    <div
      v-show="open"
      id="language-menu"
      :class="useClsx(
        'bg-white/30 dark:bg-black/30 ring-black/5 ring-1',
        'absolute right-0 mt-2 w-36 rounded-md shadow-lg',
        'backdrop-blur-md backdrop-saturate-150',
      )"
      role="menu"
    >
      <div class="py-1">
        <NuxtLinkLocale
          v-for="lang in languages"
          :key="lang.code"
          :class="useClsx(
            'hover:bg-gray-100/50 dark:hover:bg-gray-700/50',
            'focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-inset',
            'block cursor-pointer px-4 py-2 text-sm',
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
    de: "German"
    en: "English"
    fr: "French"
    ja: "Japanese"
    zh: "Chinese"
    pt: "Portuguese"
    es: "Spanish"
    pl: "Polish"
    da: "Danish"
    cs: "Czech"
    nl: "Dutch"
    el: "Greek"
    tr: "Turkish"
    ko: "Korean"
    uk: "Ukrainian"
de:
  languages:
    de: "Deutsch"
    en: "Englisch"
    fr: "Französisch"
    ja: "Japanisch"
    zh: "Chinesisch"
    pt: "Portugiesisch"
    es: "Spanisch"
    pl: "Polnisch"
    da: "Dänisch"
    cs: "Tschechisch"
    nl: "Niederländisch"
    el: "Griechisch"
    tr: "Türkisch"
    ko: "Koreanisch"
    uk: "Ukrainisch"
fr:
  languages:
    de: "Allemand"
    en: "Anglais"
    fr: "Français"
    ja: "Japonais"
    zh: "Chinois"
    pt: "Portugais"
    es: "Espagnol"
    pl: "Polonais"
    da: "Danois"
    cs: "Tchèque"
    nl: "Néerlandais"
    el: "Grec"
    tr: "Turc"
    ko: "Coréen"
    uk: "Ukrainien"
ja:
  languages:
    de: "ドイツ語"
    en: "英語"
    fr: "フランス語"
    ja: "日本語"
    zh: "中国語"
    pt: "ポルトガル語"
    es: "スペイン語"
    pl: "ポーランド語"
    da: "デンマーク語"
    cs: "チェコ語"
    nl: "オランダ語"
    el: "ギリシャ語"
    tr: "トルコ語"
    ko: "韓国語"
    uk: "ウクライナ語"
zh:
  languages:
    de: "德语"
    en: "英语"
    fr: "法语"
    ja: "日语"
    zh: "中文"
    pt: "葡萄牙语"
    es: "西班牙语"
    pl: "波兰语"
    da: "丹麦语"
    cs: "捷克语"
    nl: "荷兰语"
    el: "希腊语"
    tr: "土耳其语"
    ko: "韩语"
    uk: "乌克兰语"
pt:
  languages:
    de: "Alemão"
    en: "Inglês"
    fr: "Francês"
    ja: "Japonês"
    zh: "Chinês"
    pt: "Português"
    es: "Espanhol"
    pl: "Polonês"
    da: "Dinamarquês"
    cs: "Tcheco"
    nl: "Holandês"
    el: "Grego"
    tr: "Turco"
    ko: "Coreano"
    uk: "Ucraniano"
es:
  languages:
    de: "Alemán"
    en: "Inglés"
    fr: "Francés"
    ja: "Japonés"
    zh: "Chino"
    pt: "Portugués"
    es: "Español"
    pl: "Polaco"
    da: "Danés"
    cs: "Checo"
    nl: "Holandés"
    el: "Griego"
    tr: "Turco"
    ko: "Coreano"
    uk: "Ucraniano"
pl:
  languages:
    de: "Niemiecki"
    en: "Angielski"
    fr: "Francuski"
    ja: "Japoński"
    zh: "Chiński"
    pt: "Portugalski"
    es: "Hiszpański"
    pl: "Polski"
    da: "Duński"
    cs: "Czeski"
    nl: "Holenderski"
    el: "Grecki"
    tr: "Turecki"
    ko: "Koreański"
    uk: "Ukraiński"
da:
  languages:
    de: "Tysk"
    en: "Engelsk"
    fr: "Fransk"
    ja: "Japansk"
    zh: "Kinesisk"
    pt: "Portugisisk"
    es: "Spansk"
    pl: "Polsk"
    da: "Dansk"
    cs: "Tjekkisk"
    nl: "Hollandsk"
    el: "Græsk"
    tr: "Tyrkisk"
    ko: "Koreansk"
    uk: "Ukrainsk"
cs:
  languages:
    de: "Němčina"
    en: "Angličtina"
    fr: "Francouzština"
    ja: "Japonština"
    zh: "Čínština"
    pt: "Portugalština"
    es: "Španělština"
    pl: "Polština"
    da: "Dánština"
    cs: "Čeština"
    nl: "Nizozemština"
    el: "Řečtina"
    tr: "Turečtina"
    ko: "Korejština"
    uk: "Ukrajinština"
nl:
  languages:
    de: "Duits"
    en: "Engels"
    fr: "Frans"
    ja: "Japans"
    zh: "Chinees"
    pt: "Portugees"
    es: "Spaans"
    pl: "Pools"
    da: "Deens"
    cs: "Tsjechisch"
    nl: "Nederlands"
    el: "Grieks"
    tr: "Turks"
    ko: "Koreaans"
    uk: "Oekraïens"
el:
  languages:
    de: "Γερμανικά"
    en: "Αγγλικά"
    fr: "Γαλλικά"
    ja: "Ιαπωνικά"
    zh: "Κινέζικα"
    pt: "Πορτογαλικά"
    es: "Ισπανικά"
    pl: "Πολωνικά"
    da: "Δανικά"
    cs: "Τσέχικα"
    nl: "Ολλανδικά"
    el: "Ελληνικά"
    tr: "Τουρκικά"
    ko: "Κορεατικά"
    uk: "Ουκρανικά"
tr:
  languages:
    de: "Almanca"
    en: "İngilizce"
    fr: "Fransızca"
    ja: "Japonca"
    zh: "Çince"
    pt: "Portekizce"
    es: "İspanyolca"
    pl: "Lehçe"
    da: "Danimarkaca"
    cs: "Çekçe"
    nl: "Flemenkçe"
    el: "Yunanca"
    tr: "Türkçe"
    ko: "Korece"
    uk: "Ukraynaca"
ko:
  languages:
    de: "독일어"
    en: "영어"
    fr: "프랑스어"
    ja: "일본어"
    zh: "중국어"
    pt: "포르투갈어"
    es: "스페인어"
    pl: "폴란드어"
    da: "덴마크어"
    cs: "체코어"
    nl: "네덜란드어"
    el: "그리스어"
    tr: "터키어"
    ko: "한국어"
    uk: "우크라이나어"
uk:
  languages:
    de: "Німецька"
    en: "Англійська"
    fr: "Французька"
    ja: "Японська"
    zh: "Китайська"
    pt: "Португальська"
    es: "Іспанська"
    pl: "Польська"
    da: "Данська"
    cs: "Чеська"
    nl: "Нідерландська"
    el: "Грецька"
    tr: "Турецька"
    ko: "Корейська"
    uk: "Українська"
</i18n>
