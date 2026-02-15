<script setup lang="ts">
import ScrollTopButton from '@/components/ui/Buttons/ScrollTopButton/ScrollTopButton.vue'
import DsContainer from '@/components/ui/DesignSystem/DsContainer.vue'
import Footer from '@/components/ui/Footer/Footer.vue'
import OsmoHeader from '@/components/ui/OsmoHeader/OsmoHeader.vue'
import OverlayText from '@/components/ui/Overlay/OverlayText.vue'

const { overlayExiting, overlayVisible, shouldHideContent } = useOverlay()
</script>

<template>
  <div class="relative">
    <OverlayText
      v-if="overlayVisible"
      :is-exiting="overlayExiting"
    />
    <div
      :class="useClsx(
        'relative z-10 page-transition-root',
        'bg-pureWhite dark:bg-pureBlack',
        shouldHideContent && 'pointer-events-none',
      )"
      :style="shouldHideContent ? { visibility: 'hidden' } : {}"
    >
      <OsmoHeader />
      <main class="pt-[var(--header-height)]">
        <DsContainer>
          <slot name="default" />
        </DsContainer>
      </main>
      <Footer />
      <ScrollTopButton />
    </div>
  </div>
</template>
