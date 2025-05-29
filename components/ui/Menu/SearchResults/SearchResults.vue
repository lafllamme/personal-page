<script lang="ts" setup>
import Link from '@/components/ui/Link/Link.vue'
import { useMenu } from '@/stores/menu'

const menuStore = useMenu()
const { searchResults, showResults, showNoResults, searchQuery } = storeToRefs(menuStore)
const { toggleMenu } = menuStore

const { t } = useI18n()

function highlightText(text: string, query: string) {
  if (!query.trim())
    return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part) => {
    if (regex.test(part)) {
      return `<mark class="bg-mint-5/20 color-mint-11 rounded p-0.5">${part}</mark>`
    }
    return part
  }).join('')
}
</script>

<template>
  <div>
    <!-- Search Results -->
    <TransitionGroup
      v-show="showResults"
      appear
      class="space-y-0"
      name="list"
      tag="div"
    >
      <div
        v-for="result in searchResults" :key="result.id"
        class="border-b border-gray-7/30 last:border-b-0"
      >
        <button
          :class="useClsx(
            'w-full flex items-center justify-between px-6 py-5 text-left',
            'text-sm md:text-lg font-medium focus-visible:outline-none',
            'hover:text-white hover:bg-gradient-to-r hover:from-gray-5A/20 hover:to-transparent',
            'transition-colors duration-300 rounded-full group',
            'focus-visible:outline-none focus-visible:bg-gray-4A focus-visible:text-shadow-xl focus-visible:shadow-mint-8/30',
          )"
        >
          <div class="flex items-center justify-between space-x-3">
            <div
              :class="useClsx(
                'rounded-full transition-all duration-300 ease-out h-2 w-2 bg-mint-11/60',
                'group-focus-visible:h-4 group-focus-visible:w-4',
                'group-focus-visible:rotate-45 group-focus-visible:animate-spin',
                'group-focus-visible:border-2 group-focus-visible:border-mint-8 group-focus-visible:border-solid',
                'group-focus-visible:bg-transparent',
              )"
            />

            <span
              class="jetbrains-mono-regular tracking-wide !font-semibold"
              v-html="highlightText(result.title, searchQuery)"
            />
          </div>
        </button>

        <div
          v-if="result.children && result.children.length"
          class="geist-regular animate-in px-6 pb-4 duration-300 slide-in-from-top-3 space-y-2"
        >
          <div
            v-for="child in result.children"
            :key="child.id"
          >
            <Link
              :class="useClsx(
                'flex items-center space-x-3 group',
                'w-full text-left px-4 py-2.5 text-xs md:text-sm',
                'text-gray-10 hover:text-gray-12 focus-visible:text-gray-12',
                'transition-colors tracking-normal duration-200 rounded-full',
              )"
              :to="child.to || '/demo'"
              @click="toggleMenu('toggle')"
            >
              <Icon
                class="h-4 w-4 text-gray-6 transition-colors duration-200 group-focus-visible:color-mint-11A group-hover:color-mint-11A"
                name="ri:arrow-right-line"
              />
              <span v-html="highlightText(child.title, searchQuery)" />
            </Link>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <!-- No Results -->
    <div
      v-show="showNoResults"
      class="flex select-none items-center justify-center p-10 text-center text-gray-10"
    >
      <span>{{ t('no_results') }}<template v-if="searchQuery"> "{{ searchQuery }}"</template></span>
    </div>
  </div>
</template>

<style scoped>
mark {
  background-color: transparent;
  color: inherit;
}

/* Transition for appear/disappear of cards & menu items */
.list-enter-active,
.list-leave-active {
  transition: all 0.45s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.98);
  filter: blur(2px);
}

.list-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

.list-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.97);
  filter: blur(2px);
}

/* Animation for menu items */
.animate-in {
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  animation-fill-mode: both;
}
</style>

<i18n lang="yaml">
de:
  no_results: "Keine Ergebnisse gefunden"
  sections:
    one: "{n} Bereich"
    other: "{n} Bereiche"

en:
  no_results: "No results found"
  sections:
    one: "{n} section"
    other: "{n} sections"

fr:
  no_results: "Aucun résultat trouvé"
  sections:
    one: "{n} section"
    other: "{n} sections"

es:
  no_results: "No se encontraron resultados"
  sections:
    one: "{n} sección"
    other: "{n} secciones"

pt:
  no_results: "Nenhum resultado encontrado"
  sections:
    one: "{n} seção"
    other: "{n} seções"

pl:
  no_results: "Nie znaleziono wyników"
  sections:
    one: "{n} sekcja"
    other: "{n} sekcje"

nl:
  no_results: "Geen resultaten gevonden"
  sections:
    one: "{n} sectie"
    other: "{n} secties"

da:
  no_results: "Ingen resultater fundet"
  sections:
    one: "{n} sektion"
    other: "{n} sektioner"

cs:
  no_results: "Žádné výsledky nenalezeny"
  sections:
    one: "{n} sekce"
    other: "{n} sekce"

el:
  no_results: "Δεν βρέθηκαν αποτελέσματα"
  sections:
    one: "{n} ενότητα"
    other: "{n} ενότητες"

tr:
  no_results: "Sonuç bulunamadı"
  sections:
    one: "{n} bölüm"
    other: "{n} bölüm"

ja:
  no_results: "結果が見つかりません"
  sections:
    one: "{n} セクション"
    other: "{n} セクション"

zh:
  no_results: "未找到结果"
  sections:
    one: "{n} 个部分"
    other: "{n} 个部分"

ko:
  no_results: "결과가 없습니다"
  sections:
    one: "{n}개 섹션"
    other: "{n}개 섹션"

uk:
  no_results: "Результатів не знайдено"
  sections:
    one: "{n} розділ"
    other: "{n} розділів"

ar:
  no_results: "لم يتم العثور على نتائج"
  sections:
    one: "{n} قسم"
    other: "{n} أقسام"
</i18n>
