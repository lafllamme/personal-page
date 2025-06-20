<script lang="ts" setup>
import type { ColorModeProps } from '@/components/ui/ColorMode/ColorMode.model'
import { ColorModeDefaultProps } from '@/components/ui/ColorMode/ColorMode.model'
import Underline from '@/components/ui/Menu/Underline/Underline.vue'
import { useClsx } from '@/composables/useClsx'

const props = withDefaults(defineProps<ColorModeProps>(), ColorModeDefaultProps)
const { variant } = toRefs(props)
const colorMode = useColorMode()
const button = useTemplateRef('button')
const isDark = computed(() => colorMode.value === 'dark')
const isLoading = ref(true)
const isAnimating = ref(false)
const isPressed = ref(false)

function handlePressed(pressed: boolean) {
  isPressed.value = pressed
}

function toggleDarkMode() {
  debounceAnimation()
  handlePressed(true)
}

function debounceAnimation(timeout: number = 1000) {
  if (!isAnimating.value) {
    isAnimating.value = true
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'

    setTimeout(() => {
      isAnimating.value = false
    }, timeout)
  }
}

onMounted(() => {
  isLoading.value = false
})
</script>

<template>
  <template v-if="isLoading">
    <div class="flex items-center">
      <div class="aspect-square size-6 animate-pulse rounded-full bg-gray-4A px-2 md:size-8" />
    </div>
  </template>
  <template v-else>
    <div class="relative flex items-center">
      <button
        ref="button"
        :aria-pressed="isPressed"
        :class="useClsx(
          'peer group focus-visible:ring focus-visible:ring-pureBlack dark:focus-visible:ring-pureWhite',
          'outline-none blur-out z-2 group ring-offset-inherit',
          'theme-toggle transition-colors duration-500',
          isDark && 'theme-toggle--toggled',
          isPressed && 'is-active',
        )"
        aria-label="Toggle theme"
        tabindex="0"
        title="Toggle theme"
        type="button"
        @click="toggleDarkMode"
      >
        <div
          :class="useClsx(
            'rotate-0 delay-100 transition-transform duration-500 media-mouse:hover:rotate-[360deg]',
          )"
        >
          <svg
            :class="useClsx(
              variant && `theme-toggle__${variant}`,
              isDark ? 'color-pureWhite' : 'color-pureBlack',
              'transition-none',
            )"
            aria-hidden="true"
            class="size-6 md:size-8"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <template v-if="!variant || variant === 'expand'">
              <clipPath id="theme-toggle__expand__cutout">
                <path d="M0-11h25a1 1 0 0017 13v30H0Z" />
              </clipPath>
              <g clip-path="url(#theme-toggle__expand__cutout)">
                <circle cx="16" cy="16" r="8.4" />
                <path
                  d="M18.3 3.2c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3S14.7.9 16 .9s2.3 1 2.3 2.3zm-4.6 25.6c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3-1 2.3-2.3 2.3-2.3-1-2.3-2.3zm15.1-10.5c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zM3.2 13.7c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3S.9 17.3.9 16s1-2.3 2.3-2.3zm5.8-7C9 7.9 7.9 9 6.7 9S4.4 8 4.4 6.7s1-2.3 2.3-2.3S9 5.4 9 6.7zm16.3 21c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm2.4-21c0 1.3-1 2.3-2.3 2.3S23 7.9 23 6.7s1-2.3 2.3-2.3 2.4 1 2.4 2.3zM6.7 23C8 23 9 24 9 25.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3 1-2.3 2.3-2.3z"
                />
              </g>
            </template>
            <template v-else-if="variant === 'within'">
              <clipPath id="theme-toggle__within__clip">
                <path d="M0 0h32v32h-32ZM6 16A1 1 0 0026 16 1 1 0 006 16" />
              </clipPath>
              <g clip-path="url(#theme-toggle__within__clip)">
                <path
                  d="M30.7 21.3 27.1 16l3.7-5.3c.4-.5.1-1.3-.6-1.4l-6.3-1.1-1.1-6.3c-.1-.6-.8-.9-1.4-.6L16 5l-5.4-3.7c-.5-.4-1.3-.1-1.4.6l-1 6.3-6.4 1.1c-.6.1-.9.9-.6 1.3L4.9 16l-3.7 5.3c-.4.5-.1 1.3.6 1.4l6.3 1.1 1.1 6.3c.1.6.8.9 1.4.6l5.3-3.7 5.3 3.7c.5.4 1.3.1 1.4-.6l1.1-6.3 6.3-1.1c.8-.1 1.1-.8.7-1.4zM16 25.1c-5.1 0-9.1-4.1-9.1-9.1 0-5.1 4.1-9.1 9.1-9.1s9.1 4.1 9.1 9.1c0 5.1-4 9.1-9.1 9.1z"
                />
              </g>
              <path
                class="theme-toggle__within__circle"
                d="M16 7.7c-4.6 0-8.2 3.7-8.2 8.2s3.6 8.4 8.2 8.4 8.2-3.7 8.2-8.2-3.6-8.4-8.2-8.4zm0 14.4c-3.4 0-6.1-2.9-6.1-6.2s2.7-6.1 6.1-6.1c3.4 0 6.1 2.9 6.1 6.2s-2.7 6.1-6.1 6.1z"
              />
              <path
                class="theme-toggle__within__inner"
                d="M16 9.5c-3.6 0-6.4 2.9-6.4 6.4s2.8 6.5 6.4 6.5 6.4-2.9 6.4-6.4-2.8-6.5-6.4-6.5z"
              />
            </template>
          </svg>
        </div>
      </button>
      <Underline
        class="!-bottom-1.5"
      />
    </div>
  </template>
</template>

<style lang="scss" scoped>
//TODO: add this to UnoCSS Config
.theme-toggle {
  --theme-toggle__expand--duration: 0.9s !important;
  --theme-toggle__within--duration: 0.9s !important;
  animation-timing-function: cubic-bezier(0.66, 0.22, 0.91, 0.93);
}

.blur-out {
  animation: blur-out 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

/**
 * ----------------------------------------
 * animation blur-out
 * ----------------------------------------
 */

@keyframes blur-out {
  0% {
    filter: blur(8px) opacity(0%);
  }
  100% {
    filter: blur(0.01);
  }
}
</style>
