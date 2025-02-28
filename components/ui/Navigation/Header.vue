<script lang="ts" setup>
import ColorMode from '@/components/ui/ColorMode/ColorMode.vue'
import { onClickOutside, useEventListener, useWindowScroll, useWindowSize } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { computed, ref, watch } from 'vue'

// Menu items
const menuItems = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const { width } = useWindowSize()

// State variables
const isMenuOpen = ref(false)
const isLangDropdownOpen = ref(false)
const isVisible = ref(true)
const headerRef = ref<HTMLElement | null>(null)
const langDropdownRef = ref<HTMLElement | null>(null)
// Use VueUse composable for scroll
const { y: scrollY } = useWindowScroll()
const scrollThreshold = computed(() => width.value * 0.1)

// Watch scrollY for show/hide behavior (optional)
watch(scrollY, (currentScrollY, previousScrollY) => {
  if (currentScrollY < scrollThreshold.value) {
    isVisible.value = true
  }
  else {
    isVisible.value = currentScrollY <= previousScrollY
  }
})

// Use i18n composable
const { locale, t, setLocale } = useI18n()

// Language options using translation keys (die Keys werden aus dem YAML-Block bezogen)
const languages = [
  { code: 'de', labelKey: 'languages.de' },
  { code: 'en', labelKey: 'languages.en' },
  { code: 'fr', labelKey: 'languages.fr' },
  { code: 'ja', labelKey: 'languages.ja' },
  { code: 'zh', labelKey: 'languages.zh' },
  { code: 'pt', labelKey: 'languages.pt' },
  { code: 'es', labelKey: 'languages.es' },
  { code: 'pl', labelKey: 'languages.pl' },
  { code: 'da', labelKey: 'languages.da' },
  { code: 'cs', labelKey: 'languages.cs' },
  { code: 'nl', labelKey: 'languages.nl' },
  { code: 'el', labelKey: 'languages.el' },
  { code: 'tr', labelKey: 'languages.tr' },
  { code: 'ko', labelKey: 'languages.ko' },
  { code: 'uk', labelKey: 'languages.uk' },
]

// Compute current language label based on active locale
const currentLanguageLabel = computed(() => {
  const found = languages.find(lang => lang.code === locale.value)
  return found ? t(found.labelKey) : ''
})

// Toggle menu with focus trap for accessibility
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    isLangDropdownOpen.value = false
  }
}

// Toggle language dropdown
function toggleLangDropdown() {
  isLangDropdownOpen.value = !isLangDropdownOpen.value
  if (isLangDropdownOpen.value) {
    isMenuOpen.value = false
  }
}

// Change language: update i18n locale
function changeLanguage(code: string) {
  locale.value = code
  setLocale(code)
  isLangDropdownOpen.value = false
}

// Close dropdown when clicking outside
onClickOutside(langDropdownRef, () => {
  isLangDropdownOpen.value = false
})

// Close menu and dropdowns on escape key
useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    isMenuOpen.value = false
    isLangDropdownOpen.value = false
  }
})

// Handle focus trap for mobile menu
const { activate, deactivate } = useFocusTrap(headerRef)
watch(isMenuOpen, (newVal) => {
  newVal ? activate() : deactivate()
})
</script>

<template>
  <div>
    <!-- Header with glassmorphism & scroll behavior -->
    <header
      ref="headerRef"
      :class="[isVisible ? 'translate-y-0' : '-translate-y-full']"
      class="fixed left-0 top-0 z-50 w-full transition-transform duration-500 ease-in-out"
      role="banner"
    >
      <div class="border-b border-gray-5 border-solid backdrop-blur-[8px] backdrop-saturate-150 dark:border-gray-4">
        <div class="mx-auto px-4 py-2 lg:px-8 md:py-3 sm:px-6">
          <div class="flex items-center justify-between">
            <!-- Logo -->
            <div class="flex items-center">
              <NuxtLink
                aria-label="Brand homepage"
                class="ntialiased rounded-sm text-xl font-bold tracking-tight md:text-3xl focus:outline-none focus:ring-2 focus:ring-offset-2"
                to="/"
              >
                <span class="text-pureBlack dark:text-pureWhite">Tec</span>
                <span class="text-fg text-mint-8">News</span>
              </NuxtLink>
            </div>

            <!-- Right side menu items -->
            <div class="flex items-center gap-6">
              <!-- Language Switcher -->
              <div ref="langDropdownRef" class="relative">
                <button
                  :aria-expanded="isLangDropdownOpen"
                  aria-controls="language-menu"
                  aria-haspopup="true"
                  class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:ring-blue-500 flex items-center rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                  @click="toggleLangDropdown"
                  @keydown.esc="isLangDropdownOpen = false"
                >
                  <span>{{ currentLanguageLabel }}</span>
                  <Icon aria-hidden="true" class="ml-1 h-4 w-4" name="ri:arrow-down-s-line" />
                </button>
                <div
                  v-show="isLangDropdownOpen"
                  id="language-menu"
                  class="bg-white/30 dark:bg-black/30 ring-black/5 absolute right-0 mt-2 w-36 rounded-md shadow-lg ring-1 backdrop-blur-md backdrop-saturate-150"
                  role="menu"
                >
                  <div class="py-1">
                    <NuxtLinkLocale
                      v-for="lang in languages"
                      :key="lang.code"
                      class="text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 focus:ring-blue-500 block cursor-pointer px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-inset"
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

              <!-- Dark Mode Toggle & Burger Menu -->
              <ColorMode />
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Menu (Slide down) -->
      <div
        id="mobile-menu"
        :class="[isMenuOpen ? 'max-h-96' : 'max-h-0']"
        aria-labelledby="mobile-menu-button"
        class="bg-white/30 dark:bg-black/30 overflow-hidden backdrop-blur-md backdrop-saturate-150 transition-all duration-300"
      >
        <div class="mx-auto max-w-7xl px-4 py-4">
          <nav class="flex flex-col gap-4">
            <NuxtLinkLocale
              v-for="(item, index) in menuItems"
              :key="index"
              :tabindex="isMenuOpen ? 0 : -1"
              :to="item.href"
              class="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 focus:ring-blue-500 rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              {{ item.label }}
            </NuxtLinkLocale>
          </nav>
        </div>
      </div>
    </header>

    <!-- Skip to content link for keyboard users -->
    <NuxtLinkLocale
      class="focus:bg-white focus:text-black focus:ring-blue-500 sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:p-4 focus:outline-none focus:ring-2"
      to="#main-content"
    >
      Skip to content
    </NuxtLinkLocale>
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
