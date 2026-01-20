<script setup>
import ScrollTopButton from '@/components/ui/Buttons/ScrollTopButton/ScrollTopButton.vue'
import Footer from '@/components/ui/Footer/Footer.vue'
import OsmoHeader from '@/components/ui/OsmoHeader/OsmoHeader.vue'
import PageContainer from '@/components/ui/Partials/PageContainer/PageContainer.vue'
import TextBand from '@/components/ui/TextBand/TextBand.vue'

const route = useRoute()
const overlayVisible = ref(true)
const shouldStopOnIteration = ref(false)
const pageContainerProps = computed(() => route.meta?.pageContainer ?? {})

onMounted(() => {
  shouldStopOnIteration.value = true
})

function handleOverlayIteration() {
  if (!shouldStopOnIteration.value)
    return
  shouldStopOnIteration.value = false
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
