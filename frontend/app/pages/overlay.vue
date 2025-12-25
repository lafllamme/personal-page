<script lang="ts" setup>
import { ref } from 'vue'
import OverlayText from '@/components/ui/Overlay/OverlayText.vue'

const showOverlay = ref(true)
const overlayKey = ref(0)

function handleComplete() {
  showOverlay.value = false
}

function replayOverlay() {
  showOverlay.value = true
  overlayKey.value += 1
}
</script>

<template>
  <div class="relative min-h-screen color-pureBlack dark:color-pureWhite">
    <div class="mx-auto max-w-4xl px-6 py-16">
      <div class="flex items-center justify-between gap-6">
        <div>
          <h1 class="font-prata text-4xl tracking-tight">
            Overlay Text Preview
          </h1>
          <p class="text-black/70 mt-2 text-base">
            Click the overlay to dismiss. Use replay to restart the animation.
          </p>
        </div>
        <button
          type="button"
          class="hover:bg-black/80 rounded-full px-5 py-2 text-sm font-semibold transition"
          @click="replayOverlay"
        >
          Replay overlay
        </button>
      </div>

      <div class="border-black/10 bg-white/70 mt-16 border rounded-3xl p-10 shadow-sm">
        <p class="text-black/75 text-lg leading-relaxed">
          This page is a sandbox to test the overlay animation without affecting the main home route.
        </p>
      </div>
    </div>

    <OverlayText
      v-if="showOverlay"
      :key="overlayKey"
      :on-complete="handleComplete"
    />
  </div>
</template>
