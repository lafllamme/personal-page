<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
import type { CursorProps, CursorType } from '@/components/ui/Cursor/Cursor.model'
import { CursorDefaultProps } from '@/components/ui/Cursor/Cursor.model'

const LazySpinningText = defineAsyncComponent(() =>
  import('@/components/ui/Text/SpinningText/SpinningText.vue'),
)

// TODO: Is the fade duration necessary? It seems unclear in terms of usage.
const props = withDefaults(defineProps<CursorProps>(), CursorDefaultProps) // ms, for fade in/out
const FADE_IN_DELAY = 3000 // 3 seconds!
const FADE_DURATION = 0

const {
  clickableElements,
  clickableClasses,
  textElements,
  textClasses,
  color,
  textColor,
  size,
  textWidth,
  clickScale,
  minTextHeight,
  forceType,
} = toRefs(props)

const cursorRef = ref<HTMLElement | null>(null)
const cursorType = ref<CursorType>('default')
const delayedCursorType = ref<CursorType>('default')
const hasPointer = ref<boolean>(false)
const firstRender = ref<boolean>(true)
const textHeight = ref<number>(0)

// Fade logic
const showSpinningText = ref(false)
let fadeInTimeout: ReturnType<typeof setTimeout> | null = null

const pointerClass = computed(() => (hasPointer.value ? 'has-pointer' : ''))

const { width, height } = useWindowSize()
const isPointer = useMediaQuery('(pointer: fine)')

useHead({
  htmlAttrs: {
    class: pointerClass,
  },
})

function centerCursor() {
  if (firstRender.value && cursorRef.value) {
    cursorRef.value.style.left = `${width.value / 2}px`
    cursorRef.value.style.top = `${height.value / 2}px`
  }
  firstRender.value = false
}

function setCursorStyle(pointer = true) {
  hasPointer.value = pointer
}

function checkCursor() {
  setCursorStyle(isPointer.value)
}

function setTextCursor(el: HTMLElement | null) {
  cursorType.value = 'text'
  const fontSize = el ? Number.parseFloat(getComputedStyle(el).fontSize) : size.value
  textHeight.value = calculateTextBarHeight(
    el,
    fontSize,
    minTextHeight.value,
    size.value,
  )
}

function calculateTextBarHeight(
  el: HTMLElement | null,
  fontSize: number,
  minHeight: number,
  baseSize: number,
) {
  if (!el)
    return Math.max(baseSize * 1.2, minHeight)
  if (['input', 'textarea'].includes(el.tagName.toLowerCase())) {
    return Math.max(el.clientHeight * 1.2, minHeight)
  }
  if (fontSize < 16) {
    return Math.max(fontSize * 2.1, minHeight)
  }
  if (fontSize < 24) {
    return Math.max(fontSize * 1.75, minHeight)
  }
  return Math.max(fontSize * 1.2, minHeight)
}

function checkElementType(e: MouseEvent) {
  const target = e.target as HTMLElement

  // 1. Check force types first
  const forceTypeClass = forceType.value?.find(cls =>
    target.classList.contains(cls) || !!target.closest(`.${cls}`),
  )

  if (forceTypeClass) {
    if (forceTypeClass.includes('default')) {
      cursorType.value = 'default'
    }
    else if (forceTypeClass.includes('click')) {
      cursorType.value = 'click'
    }
    else if (forceTypeClass.includes('text')) {
      const textEl = target.matches(`.${forceTypeClass}`)
        ? target
        : (target.closest(`.${forceTypeClass}`) as HTMLElement | null)
      setTextCursor(textEl)
    }
    else {
      cursorType.value = 'default'
    }
    return
  }

  // 2. Normal detection
  const isClickable
    = clickableElements.value.some(sel => target.matches(sel) || !!target.closest(sel))
      || clickableClasses.value.some(cls =>
        target.classList.contains(cls.replace('.', '')) || !!target.closest(cls),
      )

  const isText
    = textElements.value.some(sel => target.matches(sel) || !!target.closest(sel))
      || textClasses.value.some(cls =>
        target.classList.contains(cls.replace('.', '')) || !!target.closest(cls),
      )

  if (isClickable) {
    if (cursorType.value !== 'click')
      cursorType.value = 'click'
  }
  else if (isText) {
    const textEl = textElements.value
      .map(sel => (target.matches(sel) ? target : target.closest(sel)))
      .filter(Boolean)[0] as HTMLElement | null
    setTextCursor(textEl)
  }
  else {
    if (cursorType.value !== 'default')
      cursorType.value = 'default'
  }
}

function updateCursorPosition(e: MouseEvent) {
  if (cursorRef.value) {
    cursorRef.value.style.left = `${e.clientX}px`
    cursorRef.value.style.top = `${e.clientY}px`
  }
}

function initListeners() {
  if (!isPointer.value)
    return
  const throttledPosition = useThrottleFn(updateCursorPosition, 16)
  const throttledTypeCheck = useThrottleFn(checkElementType, 32)
  useEventListener('mousemove', throttledPosition, { passive: true })
  useEventListener('mousemove', throttledTypeCheck, { passive: true })
}

// ========== FADE/SPINNING TEXT HELPERS ==========

function scheduleSpinningTextFadeIn() {
  if (fadeInTimeout)
    clearTimeout(fadeInTimeout)
  showSpinningText.value = false
  fadeInTimeout = setTimeout(() => {
    showSpinningText.value = true
  }, FADE_IN_DELAY)
}

function hideSpinningTextImmediately() {
  if (fadeInTimeout)
    clearTimeout(fadeInTimeout)
  showSpinningText.value = false
}

// ========== CLICK DELAY HELPERS ==========

let clickDelayTimeout: ReturnType<typeof setTimeout> | null = null

function scheduleDelayedCursorType(newType: CursorType, oldType: CursorType) {
  if (oldType === 'default' && newType === 'click') {
    if (clickDelayTimeout)
      clearTimeout(clickDelayTimeout)
    delayedCursorType.value = 'default'
    clickDelayTimeout = setTimeout(() => {
      delayedCursorType.value = 'click'
    }, FADE_DURATION)
  }
  else {
    if (clickDelayTimeout)
      clearTimeout(clickDelayTimeout)
    delayedCursorType.value = newType
  }
}

// ========== WATCHERS ==========

watch(cursorType, (newType, oldType) => {
  if (newType === 'default') {
    scheduleSpinningTextFadeIn()
  }
  else {
    hideSpinningTextImmediately()
  }
  scheduleDelayedCursorType(newType, oldType!)
}, { immediate: true })

onMounted(() => {
  checkCursor()
  centerCursor()
  initListeners()
})
</script>

<template>
  <Teleport to="body">
    <div
      v-show="hasPointer"
      ref="cursorRef"
      :style="{
        width: delayedCursorType === 'text' ? `${textWidth}px` : `${size}px`,
        height: delayedCursorType === 'text' ? `${textHeight}px` : `${size}px`,
        borderRadius: delayedCursorType === 'text' ? '1px' : '50%',
        backgroundColor: delayedCursorType === 'text' ? textColor : color,
        mixBlendMode: delayedCursorType === 'text' ? 'normal' : 'difference',
        transform: delayedCursorType === 'click'
          ? `translate(-50%, -50%) scale(${clickScale})`
          : 'translate(-50%, -50%)',
        transition:
          'width .2s, height .2s, border-radius .2s, transform .2s, background-color .2s',
      }"
      class="pointer-events-none fixed left-0 top-0 z-9999 translate-z-0 will-change-transform"
      inert
    >
      <!-- Orbit container always present in 'default', only opacity of SpinningText changes -->
      <div
        v-if="cursorType === 'default'"
        :style="{
          width: `${size * 3}px`,
          height: `${size * 3}px`,
        }"
        class="pointer-events-none absolute left-1/2 top-1/2 z-1 -translate-x-1/2 -translate-y-1/2"
      >
        <LazySpinningText
          :class="useClsx(
            'color-pureWhite jetbrains-mono-regular text-lg',
            'mix-blend-difference block w-full h-full leading-[0] antialiased pointer-events-none',
            showSpinningText ? 'spinning-text-fade-in' : 'spinning-text-fade-out',
          )"
          reverse
          text="learn more · read more · code more ·"
        />
      </div>
    </div>
  </Teleport>
</template>

<style>
.spinning-text-fade-in {
  opacity: 1;
  transition: opacity 0.25s cubic-bezier(0.7, 0.3, 0, 1);
}

.spinning-text-fade-out {
  opacity: 0;
  transition: opacity 0.18s cubic-bezier(0.7, 0.3, 0, 1);
}

.has-pointer * {
  cursor: none !important;
}
</style>
