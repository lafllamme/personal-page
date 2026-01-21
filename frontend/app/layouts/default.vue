<script setup>
import ScrollTopButton from '@/components/ui/Buttons/ScrollTopButton/ScrollTopButton.vue'
import Footer from '@/components/ui/Footer/Footer.vue'
import OsmoHeader from '@/components/ui/OsmoHeader/OsmoHeader.vue'
import PageContainer from '@/components/ui/Partials/PageContainer/PageContainer.vue'
import TextBand from '@/components/ui/TextBand/TextBand.vue'

const route = useRoute()
const overlayVisible = ref(true)
const pageContainerProps = computed(() => route.meta?.pageContainer ?? {})

let hasMounted = false
let iterationsSinceMount = 0
let totalIterations = 0

onMounted(() => {
  hasMounted = true
  iterationsSinceMount = 0
  totalIterations = 0
})

function handleOverlayIteration() {
  totalIterations += 1

  const isReady = hasMounted
  if (!overlayVisible.value) {
    console.info('[overlay:intro] iteration ignored; overlay already hidden', { totalIterations })
    return
  }

  if (!isReady) {
    console.info('[overlay:intro] iteration received before ready; keep running', { totalIterations })
    return
  }

  iterationsSinceMount += 1

  const shouldHide = iterationsSinceMount >= 1
  console.info('[overlay:intro] iteration handled', {
    totalIterations,
    iterationsSinceMount,
    isReady,
    shouldHide,
  })

  if (!shouldHide)
    return

  overlayVisible.value = false
}
</script>

<template>
  <div class="relative">
    <div v-if="overlayVisible" class="fixed inset-0 z-[9999] overflow-hidden">
      <TextBand
        text="TECNEWS"
        class="pointer-events-none h-full w-full"
        @iteration="handleOverlayIteration"
      />
    </div>
    <!-- Main Content -->
    <div
      :class="useClsx(
        'relative z-10',
        'bg-pureWhite  dark:bg-pureBlack',
        overlayVisible && 'pointer-events-none',
      )"
      :style="overlayVisible ? { visibility: 'hidden' } : {}"
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
