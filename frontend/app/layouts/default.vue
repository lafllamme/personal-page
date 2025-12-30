<script setup>
import ScrollTopButton from '@/components/ui/Buttons/ScrollTopButton/ScrollTopButton.vue'
import Footer from '@/components/ui/Footer/Footer.vue'
import Header from '@/components/ui/Header/Header.vue'
import PageContainer from '@/components/ui/Partials/PageContainer/PageContainer.vue'
import TextBand from '@/components/ui/TextBand/TextBand.vue'

const route = useRoute()
const overlayVisible = useState('intro-overlay-visible', () => true)
const overlayPaused = useState('intro-overlay-paused', () => false)
const overlayStopPending = useState('intro-overlay-stop-pending', () => false)
const overlayHideDelayMs = 300
const { start: startOverlayHide, stop: stopOverlayHide } = useTimeoutFn(
  () => {
    overlayVisible.value = false
    overlayPaused.value = false
  },
  overlayHideDelayMs,
  { immediate: false },
)
const showIntroOverlay = computed(() => overlayVisible.value)
const isHome = computed(() => route.path === '/')

onMounted(() => {
  overlayPaused.value = false
  overlayStopPending.value = !isHome.value
  stopOverlayHide()
})

function handleOverlayIteration() {
  if (!overlayStopPending.value || overlayPaused.value)
    return
  overlayStopPending.value = false
  overlayPaused.value = true
  startOverlayHide()
}
</script>

<template>
  <div class="relative">
    <div
      v-show="showIntroOverlay"
      class="fixed inset-0 z-[9999] overflow-hidden"
    >
      <TextBand
        text="TECNEWS"
        class="pointer-events-none h-full w-full"
        :paused="overlayPaused"
        @iteration="handleOverlayIteration"
      />
    </div>
    <!-- Main Content -->
    <div
      :class="useClsx(
        'relative z-10',
        'transition-colors duration-600 ease-[cubic-bezier(0.33,1,0.68,1)]',
        'bg-pureWhite  dark:bg-pureBlack',
        overlayVisible && 'pointer-events-none',
      )"
      :style="overlayVisible ? { visibility: 'hidden' } : {}"
    >
      <Header />
      <main
        :class="useClsx(
          'pt-[calc(4rem-1px+1rem)] md:pt-[calc(4rem+5px+1.5rem)]',
        )"
      >
        <PageContainer>
          <slot name="default" />
        </PageContainer>
      </main>
      <Footer />
      <ScrollTopButton />
    </div>
  </div>
</template>
