<script lang="ts" setup>
// Lazy hydration components for better performance

import OverlayText from '@/components/ui/Overlay/OverlayText.vue'
import RibbonDebug from '@/components/ui/RibbonDebug/RibbonDebug.vue'

const LazyFeaturedSection = defineLazyHydrationComponent(
  'visible',
  () => import('@/components/ui/Blog/FeaturedSection/FeaturedSection.vue'),
)

const LazyBlogLayout = defineLazyHydrationComponent(
  'visible',
  () => import('@/components/ui/Blog/Layout/BlogLayout.vue'),
)

const LazyInteractiveButton = defineLazyHydrationComponent(
  'idle',
  () => import('@/components/ui/Buttons/InteractiveButton/InteractiveButton.vue'),
)

const LazyRippleButton = defineLazyHydrationComponent(
  'idle',
  () => import('@/components/ui/Buttons/RippleButton/RippleButton.vue'),
)

const LazySkewMarquee = defineLazyHydrationComponent(
  'visible',
  () => import('@/components/ui/Section/SkewMarquee/SkewMarquee.vue'),
)

const LazyTextGenerate = defineLazyHydrationComponent(
  'idle',
  () => import('@/components/ui/Text/TextGenerate/TextGenerate.vue'),
)

const { t } = useI18n()

useHead({
  title: t('head.title'),
  meta: [
    { name: 'description', content: t('head.description') },
    { name: 'keywords', content: t('head.keywords') },
  ],
})

const { height: viewportHeight } = useWindowSize()
const heroRibbonHeight = computed(() => {
  const base = Math.round(viewportHeight.value * 0.6)
  return Math.max(360, Math.min(base, 720))
})

function handleClick() {
  // navigate to /blog page
  navigateTo('/blog')
}

const animate = ref(false)
const overlaySeen = useState('intro-overlay-seen', () => false)
const overlayCanComplete = ref(false)
const overlayActive = computed(() => !overlaySeen.value)

function handleGenerateComplete() {
  animate.value = true
}

function handleOverlayComplete() {
  overlaySeen.value = true
}

function handleRibbonReady() {
  overlayCanComplete.value = true
}
</script>

<template>
  <div>
    <OverlayText
      v-if="!overlaySeen"
      :can-complete="overlayCanComplete"
      :on-complete="handleOverlayComplete"
    />
    <div
      :class="useClsx(
        'relative mb-12 min-h-[360px] flex flex-col items-center overflow-visible md:min-h-[520px] md:flex-row',
        overlayActive && 'opacity-0 pointer-events-none',
        !overlayActive && 'opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]',
      )"
    >
      <div class="absolute inset-0 z-0">
        <div class="absolute left-1/2 top-1/2 max-w-none w-screen -translate-x-1/2 -translate-y-1/2">
          <div class="mx-auto max-w-none w-[130%]">
            <RibbonDebug
              :full="false"
              :height="heroRibbonHeight"
              allow-overflow
              @ready="handleRibbonReady"
            />
          </div>
        </div>
      </div>

      <!-- Text Wrapper -->
      <div class="relative z-10 w-full text-center <sm:mt-6 md:mt-12 md:w-1/2 space-y-4 md:text-left md:space-y-8">
        <h1
          :class="useClsx(
            'font-prata text-6vh md:text-[clamp(1.75rem,7vw,8rem)] 2xl:max-w-4xl text-balance animate-clip-circle md:text-balance',
            'dark:text-pureWhite !font-bold',
            'text-pureBlack leading-tight tracking-tight antialiased',
          )"
        >
          {{ t('hero.headline') }}
        </h1>
        <LazyTextGenerate
          :class="useClsx(
            'max-w-3xl 2xl:max-w-4xl md:text-justify',
            'text-wrap text-[clamp(1rem,2vw,1.5rem)]',
            'font-light leading-normal tracking-normal font-manrope',
          )"
          :delay="0.8"
          :duration="1.1"
          :words="t('hero.text')"
          :hydrate-on-idle="500"
          @generate="handleGenerateComplete"
        />
        <div
          :class="useClsx(
            'transition-colors duration-600 ease-[cubic-bezier(0.33,1,0.68,1)]',
            'bg-none lg:text-xl sm:text-lg',
            '!min-w-3/4 md:justify-start',
            'max-[400px]:text-sm text-base flex justify-center gap-4 whitespace-nowrap',
            animate ? 'opacity-100 animate-fade-in' : 'opacity-0',
          )"
        >
          <LazyInteractiveButton
            :text="t('buttons.latest')"
            :hydrate-on-idle="1000"
            @click="handleClick"
          />
          <LazyRippleButton
            :text="t('buttons.subscribe')"
            :hydrate-on-idle="1000"
          />
        </div>
      </div>
    </div>
    <LazyFeaturedSection
      :hydrate-on-visible="{ rootMargin: '100px' }"
    />
    <LazyBlogLayout
      :hydrate-on-visible="{ rootMargin: '100px' }"
    />
    <div class="mb-12 mt-6 md:mb-32 md:mt-12">
      <LazySkewMarquee
        :hydrate-on-visible="{ rootMargin: '150px' }"
      />
    </div>
  </div>
</template>

<i18n lang="yaml">
de:
  head:
    title: "TecNews – Animation News"
    description: "Lies stilvoll über die neuesten Animation-News."
    keywords: "animation, news, neueste, stil, TecNews"
  hero:
    headline: "Die Zukunft von Tech ist da"
    text: "Erkunde das Neueste aus Tech, AI und Entwicklung. Bleib mit Einblicken von Branchenexpert:innen vorn dabei."
  buttons:
    latest: "Neueste Artikel"
    subscribe: "Abonniere uns"

en:
  head:
    title: "TecNews – Animation News"
    description: "Read about latest news in animations with style."
    keywords: "animation, news, latest, style, TecNews"
  hero:
    headline: "The Future of Tech is Here"
    text: "Exploring the cutting edge of Tech, AI, and development. Stay ahead with insights from industry experts."
  buttons:
    latest: "Latest Articles"
    subscribe: "Subscribe to us"

fr:
  head:
    title: "TecNews – Actualités Animation"
    description: "Découvrez les dernières actualités sur l’animation avec style."
    keywords: "animation, actualités, dernières, style, TecNews"
  hero:
    headline: "Le futur de la Tech est là"
    text: "Explorez les dernières avancées en Tech, AI et développement. Restez à la pointe grâce aux experts du secteur."
  buttons:
    latest: "Derniers articles"
    subscribe: "Abonnez-vous"

es:
  head:
    title: "TecNews – Noticias de Animación"
    description: "Lee sobre las últimas noticias en animación con estilo."
    keywords: "animación, noticias, últimas, estilo, TecNews"
  hero:
    headline: "El futuro de la Tech está aquí"
    text: "Explora lo último en Tech, AI y desarrollo. Mantente a la vanguardia con las ideas de expertos del sector."
  buttons:
    latest: "Últimos artículos"
    subscribe: "Suscríbete"

pt:
  head:
    title: "TecNews – Notícias de Animação"
    description: "Leia sobre as últimas notícias em animações com estilo."
    keywords: "animação, notícias, últimas, estilo, TecNews"
  hero:
    headline: "O futuro da Tech já chegou"
    text: "Explorando o que há de mais avançado em Tech, AI e desenvolvimento. Fique à frente com insights de especialistas do setor."
  buttons:
    latest: "Últimos Artigos"
    subscribe: "Assine"

pl:
  head:
    title: "TecNews – Nowości Animacyjne"
    description: "Czytaj najnowsze wiadomości o animacjach ze stylem."
    keywords: "animacja, wiadomości, najnowsze, styl, TecNews"
  hero:
    headline: "Przyszłość Tech już jest tutaj"
    text: "Odkrywaj najnowsze osiągnięcia w Tech, AI i rozwoju. Bądź na bieżąco z wiedzą ekspertów branżowych."
  buttons:
    latest: "Najnowsze artykuły"
    subscribe: "Subskrybuj nas"

nl:
  head:
    title: "TecNews – Animatie Nieuws"
    description: "Lees het laatste nieuws over animaties in stijl."
    keywords: "animatie, nieuws, laatste, stijl, TecNews"
  hero:
    headline: "De toekomst van Tech is hier"
    text: "Ontdek de nieuwste ontwikkelingen in Tech, AI en ontwikkeling. Blijf voorop met inzichten van experts uit de sector."
  buttons:
    latest: "Laatste artikelen"
    subscribe: "Abonneer"

da:
  head:
    title: "TecNews – Animerede Nyheder"
    description: "Læs de seneste nyheder om animationer med stil."
    keywords: "animation, nyheder, seneste, stil, TecNews"
  hero:
    headline: "Fremtiden for Tech er her"
    text: "Udforsk det nyeste inden for Tech, AI og udvikling. Hold dig foran med indsigter fra brancheeksperter."
  buttons:
    latest: "Seneste artikler"
    subscribe: "Abonner"

cs:
  head:
    title: "TecNews – Novinky z animace"
    description: "Přečtěte si nejnovější zprávy o animacích ve stylu."
    keywords: "animace, novinky, nejnovější, styl, TecNews"
  hero:
    headline: "Budoucnost Tech je tady"
    text: "Prozkoumejte nejnovější v Tech, AI a vývoji. Získejte náskok díky náhledu od odborníků z oboru."
  buttons:
    latest: "Nejnovější články"
    subscribe: "Odebírat"

el:
  head:
    title: "TecNews – Νέα Κινουμένων Σχεδίων"
    description: "Διαβάστε για τα τελευταία νέα στα κινούμενα σχέδια με στυλ."
    keywords: "κινούμενα σχέδια, νέα, τελευταία, στυλ, TecNews"
  hero:
    headline: "Το μέλλον της Tech είναι εδώ"
    text: "Εξερευνήστε τις τελευταίες εξελίξεις στην Tech, AI και ανάπτυξη. Μείνετε μπροστά με πληροφορίες από ειδικούς του κλάδου."
  buttons:
    latest: "Τελευταία άρθρα"
    subscribe: "Εγγραφείτε"

tr:
  head:
    title: "TecNews – Animasyon Haberleri"
    description: "Animasyonlardaki en son haberleri stil ile okuyun."
    keywords: "animasyon, haberler, en son, stil, TecNews"
  hero:
    headline: "Tech’in Geleceği Burada"
    text: "Tech, AI ve gelişimin en yenisini keşfet. Sektör uzmanlarının öngörüleriyle önde ol."
  buttons:
    latest: "Son Makaleler"
    subscribe: "Bize abone ol"

# Non-European languages use native "technology" and native/borrowed "AI"
ja:
  head:
    title: "TecNews – アニメーションニュース"
    description: "最新のアニメーションニュースをスタイリッシュに読もう。"
    keywords: "アニメーション, ニュース, 最新, スタイル, TecNews"
  hero:
    headline: "テクノロジーの未来はここに"
    text: "テクノロジー、AI、開発の最先端を探る。業界専門家の洞察で先を行こう。"
  buttons:
    latest: "最新記事"
    subscribe: "購読する"

zh:
  head:
    title: "TecNews – 动画新闻"
    description: "用风格阅读最新动画新闻。"
    keywords: "动画, 新闻, 最新, 风格, TecNews"
  hero:
    headline: "科技的未来已到来"
    text: "探索科技、AI和开发的前沿动态。通过行业专家的见解走在前列。"
  buttons:
    latest: "最新文章"
    subscribe: "订阅我们"

ko:
  head:
    title: "TecNews – 애니메이션 뉴스"
    description: "최신 애니메이션 뉴스를 스타일리시하게 읽어보세요."
    keywords: "애니메이션, 뉴스, 최신, 스타일, TecNews"
  hero:
    headline: "기술의 미래가 여기에 있습니다"
    text: "기술, AI, 개발의 최첨단을 탐험하세요. 업계 전문가의 인사이트로 앞서가세요."
  buttons:
    latest: "최신 기사"
    subscribe: "구독하기"

uk:
  head:
    title: "TecNews – Новини анімації"
    description: "Читайте про останні новини в анімації зі стилем."
    keywords: "анімація, новини, останні, стиль, TecNews"
  hero:
    headline: "Майбутнє технологій вже тут"
    text: "Досліджуйте передові технології, AI та розробку. Будьте попереду з порадами експертів галузі."
  buttons:
    latest: "Останні статті"
    subscribe: "Підписатися"

ar:
  head:
    title: "TecNews – أخبار الرسوم المتحركة"
    description: "اقرأ آخر أخبار الرسوم المتحركة بأناقة."
    keywords: "رسوم متحركة, أخبار, أحدث, أناقة, TecNews"
  hero:
    headline: "مستقبل التقنية هنا"
    text: "استكشف أحدث ما في التقنية والذكاء الاصطناعي والتطوير. كن في المقدمة مع رؤى الخبراء."
  buttons:
    latest: "أحدث المقالات"
    subscribe: "اشترك معنا"
</i18n>
