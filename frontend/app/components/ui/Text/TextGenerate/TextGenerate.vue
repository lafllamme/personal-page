<script lang="ts" setup>
import type { TextGenerateProps } from './TextGenerate.model'
import { useElementVisibility } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, ref, toRefs, watch } from 'vue'
import { TextGenerateDefaultProps } from './TextGenerate.model'

/* props ------------------------------------------------------------------ */
const props = withDefaults(defineProps<TextGenerateProps>(), TextGenerateDefaultProps)
/* emit ------------------------------------------------------------------ */
const emit = defineEmits<{
  (e: 'generate'): void
}>()

const { delay, duration, filter, class: classNames, active } = toRefs(props)

/* visibility (IntersectionObserver) -------------------------------------- */
const el = useTemplateRef('el')
const isMounted = ref(false)
const isVisible = useElementVisibility(el, { threshold: 0.01 }) // runs only in browser

// Ensure component is mounted before allowing visibility to trigger
onMounted(() => {
  // Small delay to ensure IntersectionObserver is initialized
  requestAnimationFrame(() => {
    isMounted.value = true
  })
})

/* words & per-word CSS vars ---------------------------------------------- */
const words = computed(() => props.words.trim().split(/\s+/))
const step = 0.2 // seconds between words

// Track animation completion
const animationComplete = ref(false)
let emitTimeoutId: ReturnType<typeof setTimeout> | null = null

function vars(i: number) {
  return {
    '--tg-delay': `${delay.value / 1000 + i * step}s`,
    '--tg-duration': `${duration.value}s`,
  } as Record<string, string>
}

// Track when animation should start
const shouldAnimate = computed(() => active.value && isMounted.value && isVisible.value)

// Watch for visibility and calculate when animation should complete
watch(shouldAnimate, (visible) => {
  if (!visible || animationComplete.value) {
    if (!visible && emitTimeoutId) {
      clearTimeout(emitTimeoutId)
      emitTimeoutId = null
    }
    return
  }

  const lastWordDelay = (delay.value / 1000) + ((words.value.length - 1) * step)
  const lastWordDuration = duration.value
  const emitTime = (lastWordDelay + lastWordDuration * 0.6) * 1000

  emitTimeoutId = setTimeout(() => {
    animationComplete.value = true
    emit('generate')
  }, emitTime)
})

onBeforeUnmount(() => {
  if (emitTimeoutId)
    clearTimeout(emitTimeoutId)
})
</script>

<template>
  <!-- deterministic root; rendered during SSR -->
  <div
    ref="el"
    :class="useClsx(
      'tg-container md:pr-24',
      'invisible', // Hide by default - prevents flash during SSR/hydration
      shouldAnimate && 'is-visible',
      classNames,
    )"
    aria-hidden="true"
  >
    <span
      v-for="(word, i) in words"
      :key="i"
      :class="useClsx(
        !filter && 'tg-no-blur',
        'bg-clip-text text-transparent',
        'color-sand-12 tg-word inline-block',
      )"
      :data-word="word"
      :style="vars(i)"
    >
      {{ word }}<span v-show="i < words.length - 1">&nbsp;</span>
    </span>
  </div>
  <p class="sr-only">
    {{ props.words }}
  </p>
</template>

<style scoped>
/* ------------------------------------------------------------------------
   1.  The real text (.tg-word) only fades opacity — no blur, no size change
   2.  A pseudo element (::after) duplicates the word, carries the blur halo,
       and fades out synchronously. Because it's absolute-positioned, it
       doesn't influence line-height, so no layout shift.
------------------------------------------------------------------------- */

/* Additional safety: hide container by default - prevents flash during SSR and hydration */
/* UnoCSS 'invisible' class handles the initial hiding, this is a fallback */
.tg-container:not(.is-visible) {
  visibility: hidden !important;
}

/* Ensure container is visible when ready to animate */
.tg-container.is-visible {
  visibility: visible !important;
}

/* main span ------------------------------------------------------------- */
.tg-word {
  position: relative; /* containing block for ::after */
  opacity: 0;
  visibility: hidden; /* prevent flash during hydration */
  animation: tg-text var(--tg-duration) ease forwards;
  animation-delay: var(--tg-delay);
  animation-play-state: paused;
  will-change: opacity;
}

/* blurred copy ---------------------------------------------------------- */
.tg-word::after {
  content: attr(data-word);
  position: absolute;
  inset: 0; /* cover the word exactly */
  opacity: 0;
  filter: blur(10px);
  pointer-events: none;
  will-change: opacity, filter;
}

/* start animations only when visible ----------------------------------- */
.is-visible .tg-word {
  visibility: visible; /* show when ready to animate */
  animation-play-state: running;
}

.is-visible .tg-word::after {
  animation: tg-blur var(--tg-duration) ease forwards;
  animation-delay: var(--tg-delay);
}

/* optional "no-blur" toggle via prop ------------------------------------ */
.tg-no-blur::after {
  display: none !important;
}

/* keyframes ------------------------------------------------------------- */
@keyframes tg-text {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes tg-blur {
  0% {
    opacity: 1;
    filter: blur(10px);
  }
  100% {
    opacity: 0;
    filter: blur(0);
  }
}
</style>
