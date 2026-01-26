<script setup lang="ts">
import ScrollTopButton from '@/components/ui/Buttons/ScrollTopButton/ScrollTopButton.vue'
import Footer from '@/components/ui/Footer/Footer.vue'
import OsmoHeader from '@/components/ui/OsmoHeader/OsmoHeader.vue'
import OverlayText from '@/components/ui/Overlay/OverlayText.vue'
import PageContainer from '@/components/ui/Partials/PageContainer/PageContainer.vue'

const route = useRoute()
const { overlayExiting, overlayVisible, shouldHideContent } = useOverlay()
const pageContainerProps = computed(() => route.meta?.pageContainer ?? {})
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
