<script lang="ts" setup>
import type { TextGenerateProps } from './TextGenerate.model'
import { useElementVisibility } from '@vueuse/core'
import { computed, ref, toRefs } from 'vue'
import { TextGenerateDefaultProps } from './TextGenerate.model'

/**
 * • deterministic markup => zero hydration diff
 * • starts only once the block enters the viewport (IntersectionObserver)
 * • optional blur toggle, fully driven by props
 */

const props = withDefaults(defineProps<TextGenerateProps>(), TextGenerateDefaultProps)
const { delay, duration, filter, class: classNames } = toRefs(props)

const el = ref<HTMLElement | null>(null)
const isVisible = useElementVisibility(el)

const words = computed(() => props.words.trim().split(/\s+/))
const step = 0.2 // s between words; extract to prop if you need

function vars(index: number) {
  return {
    '--tg-delay': `${(delay.value / 1000) + index * step}s`,
    '--tg-duration': `${duration.value}s`,
  } as Record<string, string>
}
</script>

<template>
  <ClientOnly>
    <!-- one root, deterministic class list  -->
    <div
      ref="el"
      :class="useClsx('leading-snug tracking-wide', classNames, { 'is-visible': isVisible })"
    >
      <span
        v-for="(word, i) in words"
        :key="i"
        :class="{ 'tg-no-blur': !filter }"
        :style="vars(i)"
        class="tg-word inline-block"
      >
        {{ word }}<span v-if="i < words.length - 1">&nbsp;</span>
      </span>
    </div>
  </ClientOnly>
</template>

<style scoped>
/* base state rendered on the server */
.tg-word {
  opacity: 0;
  animation: tg-fade var(--tg-duration) ease forwards;
  animation-delay: var(--tg-delay);
  animation-play-state: paused;
}

/* released on the client when element ≥1 px enters the viewport */
.is-visible .tg-word {
  animation-play-state: running;
}

.tg-no-blur {
  filter: none !important;
}

@keyframes tg-fade {
  0% {
    opacity: 0;
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    filter: blur(0);
  }
}
</style>
