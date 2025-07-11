<script lang="ts" setup>
import { useMenu } from '@/stores/menu'

const menuStore = useMenu()
const hasInputFocus = ref(false)
const { t } = useI18n()

const translationSection = computed(() => {
  const n = menuStore.searchResults?.length || 0
  return t(`sections.${n === 1 ? 'one' : 'other'}`, { n })
})
</script>

<template>
  <div class="mb-10 mt-10">
    <div
      class="relative flex items-center border rounded-3xl border-solid px-4 py-2 color-pureBlack dark:color-pureWhite"
    >
      <input
        id="search"
        v-model="menuStore.searchQuery"
        :class="useClsx(
          'geist-regular peer tracking-normal',
          'w-full bg-transparent rounded-sm',
          'text-md placeholder:color-gray-10',
          'focus:outline-none focus:ring-0',
        )"
        type="search"
        @blur="hasInputFocus = false"
        @focus="hasInputFocus = true"
      >
      <label
        v-show="!menuStore.searchQuery"
        :class="useClsx(
          hasInputFocus && 'slide-out-blurred-top',
          'color-gray-10 peer-focus:color-mint-8 transition-all duration-300 ease-out',
          'pointer-events-none absolute left-4 top-1/2 transform',
          'peer-focus:top-4 -translate-y-1/2 animation-fill-forwards peer-focus:text-xs peer-focus:-translate-y-2',
        )"
        for="search"
      >
        {{ t('search') }}
      </label>
      <div class="pointer-events-none">
        <div class="relative h-8 w-8">
          <Icon
            :class="{ 'opacity-0 scale-95': hasInputFocus, 'opacity-100 scale-100': !hasInputFocus }"
            class="absolute h-full w-full transition-all duration-300 ease-out"
            name="ri:search-line"
          />
          <Icon
            :class="{ 'opacity-100 scale-100': hasInputFocus, 'opacity-0 scale-95': !hasInputFocus }"
            class="absolute h-full w-full transition-all duration-300 ease-out"
            name="ri:search-2-fill"
          />
        </div>
      </div>
    </div>

    <!-- Search Results Info -->
    <div v-if="menuStore.searchQuery" class="mt-2 flex items-center justify-between text-xs">
      <span class="text-gray-10">
        {{
          menuStore.showResults
            ? t('results_found', { n: menuStore.searchResults?.length || 0 })
            : t('no_results')
        }}
      </span>
      <span
        v-if="menuStore.showResults"
        class="border border-mint-7/30 rounded-full bg-mint-5/20 px-2 py-0.5 text-xs color-mint-11 font-medium"
      >
        {{ translationSection }}
      </span>
    </div>
  </div>
</template>

<i18n lang="yaml">
de:
  search: "Suchen"
  results_found: "{n} Ergebnisse gefunden"
  no_results: "Keine Ergebnisse gefunden"
  sections:
    one: "{n} Bereich"
    other: "{n} Bereiche"

en:
  search: "Search"
  results_found: "{n} results found"
  no_results: "No results found"
  sections:
    one: "{n} section"
    other: "{n} sections"

fr:
  search: "Rechercher"
  results_found: "{n} résultats trouvés"
  no_results: "Aucun résultat trouvé"
  sections:
    one: "{n} section"
    other: "{n} sections"

es:
  search: "Buscar"
  results_found: "{n} resultados encontrados"
  no_results: "No se encontraron resultados"
  sections:
    one: "{n} sección"
    other: "{n} secciones"

pt:
  search: "Pesquisar"
  results_found: "{n} resultados encontrados"
  no_results: "Nenhum resultado encontrado"
  sections:
    one: "{n} seção"
    other: "{n} seções"

pl:
  search: "Szukaj"
  results_found: "Znaleziono {n} wyników"
  no_results: "Nie znaleziono wyników"
  sections:
    one: "{n} sekcja"
    other: "{n} sekcje"

nl:
  search: "Zoeken"
  results_found: "{n} resultaten gevonden"
  no_results: "Geen resultaten gevonden"
  sections:
    one: "{n} sectie"
    other: "{n} secties"

da:
  search: "Søg"
  results_found: "{n} resultater fundet"
  no_results: "Ingen resultater fundet"
  sections:
    one: "{n} sektion"
    other: "{n} sektioner"

cs:
  search: "Hledat"
  results_found: "Nalezeno {n} výsledků"
  no_results: "Žádné výsledky nenalezeny"
  sections:
    one: "{n} sekce"
    other: "{n} sekce"

el:
  search: "Αναζήτηση"
  results_found: "Βρέθηκαν {n} αποτελέσματα"
  no_results: "Δεν βρέθηκαν αποτελέσματα"
  sections:
    one: "{n} ενότητα"
    other: "{n} ενότητες"

tr:
  search: "Ara"
  results_found: "{n} sonuç bulundu"
  no_results: "Sonuç bulunamadı"
  sections:
    one: "{n} bölüm"
    other: "{n} bölüm"

ja:
  search: "検索"
  results_found: "{n}件の結果"
  no_results: "結果が見つかりません"
  sections:
    one: "{n} セクション"
    other: "{n} セクション"

zh:
  search: "搜索"
  results_found: "找到{n}个结果"
  no_results: "未找到结果"
  sections:
    one: "{n} 个部分"
    other: "{n} 个部分"

ko:
  search: "검색"
  results_found: "{n}개의 결과"
  no_results: "결과가 없습니다"
  sections:
    one: "{n}개 섹션"
    other: "{n}개 섹션"

uk:
  search: "Пошук"
  results_found: "Знайдено {n} результатів"
  no_results: "Результатів не знайдено"
  sections:
    one: "{n} розділ"
    other: "{n} розділів"

ar:
  search: "بحث"
  results_found: "تم العثور على {n} نتيجة"
  no_results: "لم يتم العثور على نتائج"
  sections:
    one: "{n} قسم"
    other: "{n} أقسام"
</i18n>
