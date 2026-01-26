<script setup lang="ts">
import { useScrollLock } from '@vueuse/core'
import ScrollTopButton from '@/components/ui/Buttons/ScrollTopButton/ScrollTopButton.vue'
import Footer from '@/components/ui/Footer/Footer.vue'
import OsmoHeader from '@/components/ui/OsmoHeader/OsmoHeader.vue'
import OverlayText from '@/components/ui/Overlay/OverlayText.vue'
import PageContainer from '@/components/ui/Partials/PageContainer/PageContainer.vue'

const route = useRoute()
const overlayExiting = ref(false)
const shouldHideContent = computed(() => overlayVisible.value && !overlayExiting.value)
const pageContainerProps = computed(() => route.meta?.pageContainer ?? {})
const bodyRef = ref<HTMLElement | null>(null)
const isBodyScrollLocked = useScrollLock(bodyRef, false)
const overlayDone = useState<boolean>('intro-overlay-done', () => false)
const overlayVisible = ref(!overlayDone.value)
const overlayDurationMs = 2000
const overlayExitDurationMs = 1000
const { start: startOverlayExit, stop: stopOverlayExit } = useTimeoutFn(() => {
  overlayExiting.value = true
  startOverlayHide()
}, overlayDurationMs, { immediate: false })
const { start: startOverlayHide, stop: stopOverlayHide } = useTimeoutFn(() => {
  overlayVisible.value = false
  overlayDone.value = true
  isBodyScrollLocked.value = false
  document.body.style.cursor = 'default'
  window.scrollTo(0, 0)
}, overlayExitDurationMs, { immediate: false })

onMounted(() => {
  if (!import.meta.client)
    return
  if (overlayDone.value) {
    overlayVisible.value = false
    overlayExiting.value = false
    return
  }
  bodyRef.value = document.body
  isBodyScrollLocked.value = true
  document.body.style.cursor = 'wait'
  startOverlayExit()
})

onBeforeUnmount(() => {
  stopOverlayExit()
  stopOverlayHide()
  isBodyScrollLocked.value = false
})
</script>

<template>
  <div class="relative">
    <OverlayText
      v-if="overlayVisible"
      :is-exiting="overlayExiting"
    />
    <!-- Main Content -->
    <div
      :class="useClsx(
        'relative z-10 page-transition-root',
        'bg-pureWhite  dark:bg-pureBlack',
        shouldHideContent && 'pointer-events-none',
      )"
      :style="shouldHideContent ? { visibility: 'hidden' } : {}"
    >
      <OsmoHeader />
      <main
        :class="useClsx(
          'pt-[var(--header-height)]',
        )"
      >
        <PageContainer v-bind="pageContainerProps">
          <slot name="default" />
        </PageContainer>
      </main>
      <Footer />
      <ScrollTopButton />
    </div>
  </div>
</template>
