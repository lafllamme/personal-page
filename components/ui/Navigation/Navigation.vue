<script lang="ts" setup>
import ColorMode from '@/components/ui/ColorMode/ColorMode.vue'
import {
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from 'radix-vue'
import MenuListItem from './Menu/MenuListItem.vue'

const { t } = useI18n()
const currentTrigger = ref('')
</script>

<template>
  <NavigationMenuRoot v-model="currentTrigger" class="relative z-[1] w-full flex justify-center">
    <NavigationMenuList
      class="center m-0 flex list-none rounded-[6px] bg-pureWhite p-1 shadow-[0_2px_10px] shadow-black7A transition-colors duration-900 dark:bg-pureBlack dark:shadow-white-7A"
    >
      <!-- "Learn" menu group -->
      <NavigationMenuItem>
        <NavigationMenuTrigger
          class="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] text-mint-11 font-medium leading-none outline-none hover:bg-mint-3 focus:shadow-[0_0_0_2px] focus:shadow-mint-7"
        >
          {{ t('navigation.learn') }}
          <Icon
            class="relative top-[1px] text-mint-10 transition-transform duration-[150ms] ease-in group-data-[state=open]:-rotate-180"
            icon="ri:arrow-down-s-line"
          />
        </NavigationMenuTrigger>
        <NavigationMenuContent
          class="data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft absolute left-0 top-0 w-full sm:w-auto"
        >
          <ul class="grid m-0 list-none gap-x-[10px] p-[22px] sm:grid-cols-[0.75fr_1fr] sm:w-[500px]">
            <li class="grid row-span-3">
              <NavigationMenuLink as-child>
                <a
                  class="h-full w-full flex flex-col select-none justify-end rounded-[6px] from-cyan-9 to-mint-9 bg-gradient-to-b p-[25px] no-underline outline-none dark:from-cyan-4 dark:to-mint-4 focus:shadow-[0_0_0_2px] focus:shadow-mint-7"
                  href="/"
                >
                  <img alt="Radix Logo" class="w-16" src="https://www.radix-vue.com/logo.svg">
                  <div class="mb-[7px] mt-4 text-[18px] text-pureBlack font-medium leading-[1.2] dark:text-pureWhite">
                    {{ t('navigation.radixTitle') }}
                  </div>
                  <p class="text-[14px] text-gray-11A leading-[1.3] dark:text-gray-9A">
                    {{ t('navigation.radixDesc') }}
                  </p>
                </a>
              </NavigationMenuLink>
            </li>

            <MenuListItem :title="t('navigation.stitches')" href="https://stitches.dev/">
              {{ t('navigation.stitchesDesc') }}
            </MenuListItem>
            <MenuListItem :title="t('navigation.colors')" href="/colors">
              {{ t('navigation.colorsDesc') }}
            </MenuListItem>
            <MenuListItem :title="t('navigation.icons')" href="https://icons.radix-ui.com/">
              {{ t('navigation.iconsDesc') }}
            </MenuListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <!-- "Overview" menu group -->
      <NavigationMenuItem>
        <NavigationMenuTrigger
          class="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] text-mint-11 font-medium leading-none outline-none hover:bg-mint-3 focus:shadow-[0_0_0_2px] focus:shadow-mint-7"
        >
          {{ t('navigation.overview') }}
          <Icon
            class="relative top-[1px] text-mint-10 transition-transform duration-[150ms] ease-in group-data-[state=open]:-rotate-180"
            icon="ri:arrow-down-s-line"
          />
        </NavigationMenuTrigger>
        <NavigationMenuContent
          class="data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft absolute left-0 top-0 w-full sm:w-auto"
        >
          <ul class="grid m-0 list-none gap-x-[10px] p-[22px] sm:grid-flow-col sm:grid-rows-3 sm:w-[600px]">
            <MenuListItem :title="t('navigation.introduction')" href="/docs/primitives/overview/introduction">
              {{ t('navigation.introDesc') }}
            </MenuListItem>
            <MenuListItem :title="t('navigation.gettingStarted')" href="/docs/primitives/overview/getting-started">
              {{ t('navigation.gettingStartedDesc') }}
            </MenuListItem>
            <MenuListItem :title="t('navigation.styling')" href="/docs/primitives/guides/styling">
              {{ t('navigation.stylingDesc') }}
            </MenuListItem>
            <MenuListItem :title="t('navigation.animation')" href="/docs/primitives/guides/animation">
              {{ t('navigation.animationDesc') }}
            </MenuListItem>
            <MenuListItem :title="t('navigation.accessibility')" href="/docs/primitives/overview/accessibility">
              {{ t('navigation.accessibilityDesc') }}
            </MenuListItem>
            <MenuListItem :title="t('navigation.releases')" href="/docs/primitives/overview/releases">
              {{ t('navigation.releasesDesc') }}
            </MenuListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <!-- "Home" link -->
      <NavigationMenuItem>
        <NavigationMenuLink
          class="block select-none rounded-[4px] px-3 py-2 text-[15px] text-mint-11 font-medium leading-none no-underline outline-none hover:bg-mint-3 focus:shadow-[0_0_0_2px] focus:shadow-mint-7"
          @click="navigateTo('/')"
        >
          {{ t('navigation.home') }}
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuIndicator
        class="transition-[all,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn top-full z-[1] h-[10px] flex items-end justify-center overflow-hidden duration-200 data-[state=hidden]:opacity-0"
      >
        <div
          class="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-pureWhite dark:bg-pureBlack"
        />
      </NavigationMenuIndicator>
    </NavigationMenuList>

    <div class="absolute left-0 top-full w-full flex perspective-[2000px] justify-center">
      <NavigationMenuViewport
        class="transition-[width,_height] data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[10px] bg-pureWhite duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)] dark:bg-pureBlack"
      />
    </div>
  </NavigationMenuRoot>
  <ColorMode :class="useClsx('absolute right-2 top-4 md:right-4')" />
</template>

<!-- Inline translations for the navigation component -->
<i18n lang="yaml">
de:
  navigation:
    learn: "Lernen"
    overview: "Überblick"
    home: "Startseite"
    radixTitle: "Radix Primitives"
    radixDesc: "Unstyliert, barrierefreie Komponenten für Vue."
    stitches: "Stitches"
    stitchesDesc: "CSS-in-JS mit erstklassiger Entwicklererfahrung."
    colors: "Farben"
    colorsDesc: "Wunderschöne, durchdachte Farbpaletten mit automatischem Dunkelmodus."
    icons: "Icons"
    iconsDesc: "Ein klares Set von 15x15 Icons, ausgewogen und konsistent."
    introduction: "Einführung"
    introDesc: "Baue hochwertige, zugängliche Design-Systeme und Web-Apps."
    gettingStarted: "Erste Schritte"
    gettingStartedDesc: "Ein schnelles Tutorial, um mit Radix Primitives loszulegen."
    styling: "Styling"
    stylingDesc: "Unstyliert und kompatibel mit jeder Styling-Lösung."
    animation: "Animation"
    animationDesc: "Verwende CSS-Keyframes oder eine Animationsbibliothek deiner Wahl."
    accessibility: "Barrierefreiheit"
    accessibilityDesc: "Getestet in diversen Browsern und unterstützenden Technologien."
    releases: "Veröffentlichungen"
    releasesDesc: "Radix Primitives Releases und deren Änderungsprotokolle."
en:
  navigation:
    learn: "Learn"
    overview: "Overview"
    home: "Home"
    radixTitle: "Radix Primitives"
    radixDesc: "Unstyled, accessible components for Vue."
    stitches: "Stitches"
    stitchesDesc: "CSS-in-JS with best-in-class developer experience."
    colors: "Colors"
    colorsDesc: "Beautiful, thought-out palettes with auto dark mode."
    icons: "Icons"
    iconsDesc: "A crisp set of 15x15 icons, balanced and consistent."
    introduction: "Introduction"
    introDesc: "Build high-quality, accessible design systems and web apps."
    gettingStarted: "Getting started"
    gettingStartedDesc: "A quick tutorial to get you up and running with Radix Primitives."
    styling: "Styling"
    stylingDesc: "Unstyled and compatible with any styling solution."
    animation: "Animation"
    animationDesc: "Use CSS keyframes or any animation library of your choice."
    accessibility: "Accessibility"
    accessibilityDesc: "Tested in a range of browsers and assistive technologies."
    releases: "Releases"
    releasesDesc: "Radix Primitives releases and their changelogs."
fr:
  navigation:
    learn: "Apprendre"
    overview: "Aperçu"
    home: "Accueil"
    radixTitle: "Radix Primitives"
    radixDesc: "Composants non stylisés et accessibles pour Vue."
    stitches: "Stitches"
    stitchesDesc: "CSS-in-JS avec une expérience développeur de premier ordre."
    colors: "Couleurs"
    colorsDesc: "Palettes élégantes et réfléchies avec mode sombre automatique."
    icons: "Icônes"
    iconsDesc: "Un ensemble net d'icônes 15x15, équilibré et cohérent."
    introduction: "Introduction"
    introDesc: "Créez des systèmes de design et des applications web de haute qualité et accessibles."
    gettingStarted: "Démarrage"
    gettingStartedDesc: "Un tutoriel rapide pour démarrer avec Radix Primitives."
    styling: "Style"
    stylingDesc: "Non stylisé et compatible avec toute solution de style."
    animation: "Animation"
    animationDesc: "Utilisez des keyframes CSS ou toute bibliothèque d'animation de votre choix."
    accessibility: "Accessibilité"
    accessibilityDesc: "Testé sur divers navigateurs et technologies d'assistance."
    releases: "Sorties"
    releasesDesc: "Les sorties de Radix Primitives et leurs journaux de modifications."
ja:
  navigation:
    learn: "学ぶ"
    overview: "概要"
    home: "ホーム"
    radixTitle: "Radix Primitives"
    radixDesc: "スタイルがなく、アクセス可能なVueコンポーネント。"
    stitches: "Stitches"
    stitchesDesc: "最高の開発者体験を提供するCSS-in-JS。"
    colors: "カラー"
    colorsDesc: "自動ダークモード対応の美しく洗練されたパレット。"
    icons: "アイコン"
    iconsDesc: "15x15のアイコンセット、バランスが取れて一貫性がある。"
    introduction: "はじめに"
    introDesc: "高品質でアクセス可能なデザインシステムとWebアプリを構築する。"
    gettingStarted: "はじめの一歩"
    gettingStartedDesc: "Radix Primitivesでの迅速なチュートリアル。"
    styling: "スタイリング"
    stylingDesc: "スタイルなしで、どんなスタイリングソリューションとも互換性がある。"
    animation: "アニメーション"
    animationDesc: "CSSキーフレームまたは任意のアニメーションライブラリを使用。"
    accessibility: "アクセシビリティ"
    accessibilityDesc: "様々なブラウザや支援技術でテスト済み。"
    releases: "リリース"
    releasesDesc: "Radix Primitivesのリリースと変更履歴。"
zh:
  navigation:
    learn: "学习"
    overview: "概览"
    home: "首页"
    radixTitle: "Radix Primitives"
    radixDesc: "未经过样式处理且可访问的Vue组件。"
    stitches: "Stitches"
    stitchesDesc: "提供一流开发者体验的CSS-in-JS。"
    colors: "颜色"
    colorsDesc: "精美且深思熟虑的调色板，支持自动暗模式。"
    icons: "图标"
    iconsDesc: "一套15x15的清晰图标，平衡且一致。"
    introduction: "介绍"
    introDesc: "构建高质量、可访问的设计系统和Web应用。"
    gettingStarted: "入门"
    gettingStartedDesc: "快速教程，助你迅速上手Radix Primitives。"
    styling: "样式"
    stylingDesc: "未经过样式处理，兼容任何样式解决方案。"
    animation: "动画"
    animationDesc: "使用CSS关键帧或任何你喜欢的动画库。"
    accessibility: "无障碍"
    accessibilityDesc: "在多种浏览器和辅助技术中经过测试。"
    releases: "发布"
    releasesDesc: "Radix Primitives的发布及其变更日志。"
pt:
  navigation:
    learn: "Aprender"
    overview: "Visão Geral"
    home: "Início"
    radixTitle: "Radix Primitives"
    radixDesc: "Componentes Vue acessíveis e sem estilo."
    stitches: "Stitches"
    stitchesDesc: "CSS-in-JS com experiência de desenvolvedor de primeira classe."
    colors: "Cores"
    colorsDesc: "Paletas bonitas e bem pensadas com modo escuro automático."
    icons: "Ícones"
    iconsDesc: "Um conjunto nítido de ícones 15x15, equilibrado e consistente."
    introduction: "Introdução"
    introDesc: "Construa sistemas de design e aplicativos web de alta qualidade e acessíveis."
    gettingStarted: "Começando"
    gettingStartedDesc: "Um tutorial rápido para começar com Radix Primitives."
    styling: "Estilização"
    stylingDesc: "Sem estilo e compatível com qualquer solução de estilo."
    animation: "Animação"
    animationDesc: "Use keyframes CSS ou qualquer biblioteca de animação de sua escolha."
    accessibility: "Acessibilidade"
    accessibilityDesc: "Testado em diversos navegadores e tecnologias assistivas."
    releases: "Lançamentos"
    releasesDesc: "Lançamentos do Radix Primitives e seus logs de alterações."
es:
  navigation:
    learn: "Aprender"
    overview: "Resumen"
    home: "Inicio"
    radixTitle: "Radix Primitives"
    radixDesc: "Componentes accesibles sin estilo para Vue."
    stitches: "Stitches"
    stitchesDesc: "CSS-in-JS con la mejor experiencia para desarrolladores."
    colors: "Colores"
    colorsDesc: "Paletas hermosas y bien pensadas con modo oscuro automático."
    icons: "Iconos"
    iconsDesc: "Un conjunto nítido de iconos 15x15, equilibrados y consistentes."
    introduction: "Introducción"
    introDesc: "Construye sistemas de diseño y aplicaciones web accesibles y de alta calidad."
    gettingStarted: "Comenzando"
    gettingStartedDesc: "Un tutorial rápido para comenzar con Radix Primitives."
    styling: "Estilizado"
    stylingDesc: "Sin estilos y compatible con cualquier solución de estilizado."
    animation: "Animación"
    animationDesc: "Usa keyframes CSS o cualquier librería de animación de tu elección."
    accessibility: "Accesibilidad"
    accessibilityDesc: "Probado en una variedad de navegadores y tecnologías de asistencia."
    releases: "Lanzamientos"
    releasesDesc: "Lanzamientos de Radix Primitives y sus registros de cambios."
pl:
  navigation:
    learn: "Uczyć się"
    overview: "Przegląd"
    home: "Strona główna"
    radixTitle: "Radix Primitives"
    radixDesc: "Niestylizowane, dostępne komponenty dla Vue."
    stitches: "Stitches"
    stitchesDesc: "CSS-in-JS z najlepszym doświadczeniem deweloperskim."
    colors: "Kolory"
    colorsDesc: "Piękne, przemyślane palety z automatycznym trybem ciemnym."
    icons: "Ikony"
    iconsDesc: "Wyraźny zestaw ikon 15x15, zbalansowany i spójny."
    introduction: "Wprowadzenie"
    introDesc: "Buduj wysokiej jakości, dostępne systemy projektowe i aplikacje webowe."
    gettingStarted: "Rozpoczęcie"
    gettingStartedDesc: "Krótki tutorial, aby szybko rozpocząć pracę z Radix Primitives."
    styling: "Stylizacja"
    stylingDesc: "Brak stylów i kompatybilność z dowolnym rozwiązaniem stylizacji."
    animation: "Animacja"
    animationDesc: "Użyj keyframes CSS lub dowolnej biblioteki animacji według własnego wyboru."
    accessibility: "Dostępność"
    accessibilityDesc: "Testowane w różnych przeglądarkach i technologiach wspomagających."
    releases: "Wydania"
    releasesDesc: "Wydania Radix Primitives i ich logi zmian."
da:
  navigation:
    learn: "Lær"
    overview: "Oversigt"
    home: "Hjem"
    radixTitle: "Radix Primitives"
    radixDesc: "Ustylingsfri, tilgængelige Vue-komponenter."
    stitches: "Stitches"
    stitchesDesc: "CSS-in-JS med førsteklasses udvikleroplevelse."
    colors: "Farver"
    colorsDesc: "Smukke, gennemtænkte farvepaletter med automatisk mørk tilstand."
    icons: "Ikoner"
    iconsDesc: "Et skarpt sæt 15x15 ikoner, afbalanceret og konsistent."
    introduction: "Introduktion"
    introDesc: "Byg høj-kvalitets, tilgængelige designsystemer og webapps."
    gettingStarted: "Kom godt i gang"
    gettingStartedDesc: "En hurtig vejledning til at starte med Radix Primitives."
    styling: "Styling"
    stylingDesc: "Ongestileret og kompatibelt med enhver stylingløsning."
    animation: "Animation"
    animationDesc: "Brug CSS keyframes eller enhver valgfri animationsbibliotek."
    accessibility: "Tilgængelighed"
    accessibilityDesc: "Getest i diverse browsere og assistive teknologier."
    releases: "Releases"
    releasesDesc: "Radix Primitives releases og deres changelogs."
cs:
  navigation:
    learn: "Naučit se"
    overview: "Přehled"
    home: "Domů"
    radixTitle: "Radix Primitives"
    radixDesc: "Neformátované, přístupné komponenty pro Vue."
    stitches: "Stitches"
    stitchesDesc: "CSS-in-JS s nejlepší developerskou zkušeností."
    colors: "Barvy"
    colorsDesc: "Krásné, promyšlené palety s automatickým tmavým režimem."
    icons: "Ikony"
    iconsDesc: "Čistá sada 15x15 ikon, vyvážená a konzistentní."
    introduction: "Úvod"
    introDesc: "Vytvářejte vysoce kvalitní, přístupné designové systémy a webové aplikace."
    gettingStarted: "Začínáme"
    gettingStartedDesc: "Rychlý tutoriál, který vás seznámí s Radix Primitives."
    styling: "Styling"
    stylingDesc: "Neformátované a kompatibilní s jakýmkoli řešením pro styling."
    animation: "Animace"
    animationDesc: "Použijte CSS klíčové snímky nebo libovolnou animační knihovnu."
    accessibility: "Přístupnost"
    accessibilityDesc: "Testováno v různých prohlížečích a pomocných technologiích."
    releases: "Vydání"
    releasesDesc: "Vydání Radix Primitives a jejich změnové logy."
nl:
  navigation:
    learn: "Leren"
    overview: "Overzicht"
    home: "Home"
    radixTitle: "Radix Primitives"
    radixDesc: "Ongestileerde, toegankelijke Vue-componenten."
    stitches: "Stitches"
    stitchesDesc: "CSS-in-JS met eersteklas ontwikkelaarservaring."
    colors: "Kleuren"
    colorsDesc: "Mooie, doordachte kleurenpaletten met automatische donkere modus."
    icons: "Iconen"
    iconsDesc: "Een scherp stel 15x15 iconen, gebalanceerd en consistent."
    introduction: "Introductie"
    introDesc: "Bouw hoogwaardige, toegankelijke designsystemen en webapps."
    gettingStarted: "Aan de slag"
    gettingStartedDesc: "Een snelle tutorial om snel met Radix Primitives te beginnen."
    styling: "Styling"
    stylingDesc: "Ongestileerd en compatibel met elke stylingoplossing."
    animation: "Animatie"
    animationDesc: "Gebruik CSS keyframes of een willekeurige animatielibrary."
    accessibility: "Toegankelijkheid"
    accessibilityDesc: "Getest in diverse browsers en assistieve technologieën."
    releases: "Releases"
    releasesDesc: "Radix Primitives releases en hun changelogs."
el:
  navigation:
    learn: "Μάθε"
    overview: "Επισκόπηση"
    home: "Αρχική"
    radixTitle: "Radix Primitives"
    radixDesc: "Απλοί, προσβάσιμοι Vue components."
    stitches: "Stitches"
    stitchesDesc: "CSS-in-JS με κορυφαία εμπειρία προγραμματιστή."
    colors: "Χρώματα"
    colorsDesc: "Όμορφες, καλοσχεδιασμένες παλέτες με αυτόματο σκοτεινό λειτουργία."
    icons: "Εικονίδια"
    iconsDesc: "Ένα καθαρό σύνολο 15x15 εικονιδίων, ισορροπημένο και συνεπές."
    introduction: "Εισαγωγή"
    introDesc: "Δημιουργήστε συστήματα σχεδίασης και web εφαρμογές υψηλής ποιότητας και προσβασιμότητας."
    gettingStarted: "Ξεκινώντας"
    gettingStartedDesc: "Ένα γρήγορο tutorial για να ξεκινήσετε με τα Radix Primitives."
    styling: "Στυλ"
    stylingDesc: "Απροδιαμορφωμένα και συμβατά με κάθε λύση στυλ."
    animation: "Κίνηση"
    animationDesc: "Χρησιμοποιήστε CSS keyframes ή οποιαδήποτε βιβλιοθήκη animation."
    accessibility: "Προσβασιμότητα"
    accessibilityDesc: "Δοκιμασμένα σε διάφορους περιηγητές και βοηθητικές τεχνολογίες."
    releases: "Εκδόσεις"
    releasesDesc: "Οι εκδόσεις των Radix Primitives και τα log αλλαγών τους."
tr:
  navigation:
    learn: "Öğren"
    overview: "Genel Bakış"
    home: "Ana Sayfa"
    radixTitle: "Radix Primitives"
    radixDesc: "Stilsiz, erişilebilir Vue bileşenleri."
    stitches: "Stitches"
    stitchesDesc: "Birinci sınıf geliştirici deneyimi sunan CSS-in-JS."
    colors: "Renkler"
    colorsDesc: "Güzel, iyi düşünülmüş paletler, otomatik koyu mod desteğiyle."
    icons: "İkonlar"
    iconsDesc: "15x15 boyutlarında net, dengeli ve tutarlı ikon seti."
    introduction: "Tanıtım"
    introDesc: "Yüksek kaliteli, erişilebilir tasarım sistemleri ve web uygulamaları oluşturun."
    gettingStarted: "Başlarken"
    gettingStartedDesc: "Radix Primitives ile hızlıca çalışmaya başlamak için kısa bir eğitim."
    styling: "Stil"
    stylingDesc: "Stilsiz ve herhangi bir stil çözümüyle uyumlu."
    animation: "Animasyon"
    animationDesc: "CSS keyframes veya tercih ettiğiniz herhangi bir animasyon kütüphanesini kullanın."
    accessibility: "Erişilebilirlik"
    accessibilityDesc: "Farklı tarayıcılar ve yardımcı teknolojilerle test edilmiştir."
    releases: "Sürümler"
    releasesDesc: "Radix Primitives sürümleri ve değişiklik günlükleri."
ko:
  navigation:
    learn: "배우기"
    overview: "개요"
    home: "홈"
    radixTitle: "Radix Primitives"
    radixDesc: "스타일 없는, 접근 가능한 Vue 컴포넌트."
    stitches: "Stitches"
    stitchesDesc: "최고의 개발자 경험을 제공하는 CSS-in-JS."
    colors: "색상"
    colorsDesc: "자동 다크 모드 지원을 갖춘 아름답고 세심하게 설계된 팔레트."
    icons: "아이콘"
    iconsDesc: "15x15 아이콘 세트, 균형 잡히고 일관됨."
    introduction: "소개"
    introDesc: "고품질의 접근 가능한 디자인 시스템과 웹 애플리케이션 구축."
    gettingStarted: "시작하기"
    gettingStartedDesc: "Radix Primitives를 사용하여 빠르게 시작하는 튜토리얼."
    styling: "스타일링"
    stylingDesc: "스타일이 없으며, 어떤 스타일링 솔루션과도 호환됨."
    animation: "애니메이션"
    animationDesc: "CSS 키프레임 또는 원하는 애니메이션 라이브러리를 사용."
    accessibility: "접근성"
    accessibilityDesc: "다양한 브라우저와 보조 기술에서 테스트됨."
    releases: "릴리스"
    releasesDesc: "Radix Primitives의 릴리스 및 변경 로그."
uk:
  navigation:
    learn: "Вчитися"
    overview: "Огляд"
    home: "Головна"
    radixTitle: "Radix Primitives"
    radixDesc: "Нестильовані, доступні компоненти для Vue."
    stitches: "Stitches"
    stitchesDesc: "CSS-in-JS з найкращим досвідом для розробників."
    colors: "Кольори"
    colorsDesc: "Красиві, добре продумані палітри з автоматичним темним режимом."
    icons: "Іконки"
    iconsDesc: "Чіткий набір іконок 15x15, збалансований та послідовний."
    introduction: "Вступ"
    introDesc: "Створюйте високоякісні, доступні дизайн-системи та веб-додатки."
    gettingStarted: "Початок"
    gettingStartedDesc: "Швидкий посібник для початку роботи з Radix Primitives."
    styling: "Стилізація"
    stylingDesc: "Нестильовані та сумісні з будь-яким рішенням для стилізації."
    animation: "Анімація"
    animationDesc: "Використовуйте CSS keyframes або будь-яку обрану вами бібліотеку анімації."
    accessibility: "Доступність"
    accessibilityDesc: "Протестовано в різних браузерах та за допомогою допоміжних технологій."
    releases: "Випуски"
    releasesDesc: "Випуски Radix Primitives та їх журнали змін."
</i18n>
