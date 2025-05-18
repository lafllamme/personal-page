<!-- components/ui/Cursor/Cursor.vue -->
<script lang="ts" setup>
import type { CursorProps, CursorType } from '@/components/ui/Cursor/Cursor.model'
import { CursorDefaultProps } from '@/components/ui/Cursor/Cursor.model'
/* ──────────────────────────────────────────────────────────
   Props & reactive state
   ────────────────────────────────────────────────────────── */
const props = withDefaults(defineProps<CursorProps>(), CursorDefaultProps)

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
} = toRefs(props)

const cursorRef = ref<HTMLElement | null>(null)
const cursorType = ref<CursorType>('default')
const textHeight = ref<number>(0)
const hasPointer = ref<boolean>(false)
const firstRender = ref<boolean>(true)

const pointerClass = computed(() => (hasPointer.value ? 'has-pointer' : ''))

const { width, height } = useWindowSize()
const isPointer = useMediaQuery('(pointer: fine)')

/* ──────────────────────────────────────────────────────────
   <html> class toggle so the real cursor disappears
   ────────────────────────────────────────────────────────── */
useHead({
  htmlAttrs: {
    class: pointerClass,
  },
})

watchEffect(() => {
  consola.debug('[Pointer] Class =>', pointerClass.value)
  consola.debug('[Pointer] State =>', hasPointer.value)
})

/* ──────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────── */
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

function checkElementType(e: MouseEvent) {
  const target = e.target as HTMLElement

  const isClickable
      = clickableElements.value.some(sel => target.matches(sel) || !!target.closest(sel))
        || clickableClasses.value.some(cls => target.classList.contains(cls.replace('.', '')))

  const isText
      = textElements.value.some(sel => target.matches(sel) || !!target.closest(sel))
        || textClasses.value.some(cls => target.classList.contains(cls.replace('.', '')))

  if (isClickable) {
    cursorType.value = 'click'
  }
  else if (isText) {
    cursorType.value = 'text'

    // work out a sensible height for the bar-style cursor
    const textEl = textElements.value
      .map(sel => (target.matches(sel) ? target : target.closest(sel)))
      .filter(Boolean)[0] as HTMLElement | null

    if (textEl) {
      const fontSize = Number.parseFloat(getComputedStyle(textEl).fontSize)

      if (['input', 'textarea'].includes(textEl.tagName.toLowerCase())) {
        textHeight.value = Math.max(textEl.clientHeight * 0.8, minTextHeight.value)
      }
      else if (fontSize < 16) {
        textHeight.value = Math.max(fontSize * 1.8, minTextHeight.value)
      }
      else if (fontSize < 24) {
        textHeight.value = Math.max(fontSize * 1.5, minTextHeight.value)
      }
      else {
        textHeight.value = Math.max(fontSize * 1.2, minTextHeight.value)
      }
    }
    else {
      textHeight.value = Math.max(size.value * 1.2, minTextHeight.value)
    }
  }
  else {
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
  useEventListener('mousemove', updateCursorPosition, { passive: true })
  useEventListener('mousemove', checkElementType, { passive: true })
}

/* ──────────────────────────────────────────────────────────
   Lifecycle
   ────────────────────────────────────────────────────────── */
onMounted(() => {
  checkCursor()
  centerCursor()
  initListeners()
})
</script>

<template>
  <!-- Teleport ensures the node lives directly under <body>
       and Vue will clean it up automatically on route changes -->
  <Teleport to="body">
    <div
      v-show="hasPointer"
      ref="cursorRef"
      :style="{
        width: cursorType === 'text' ? `${textWidth}px` : `${size}px`,
        height: cursorType === 'text' ? `${textHeight}px` : `${size}px`,
        borderRadius: cursorType === 'text' ? '1px' : '50%',
        backgroundColor: cursorType === 'text' ? textColor : color,
        mixBlendMode: cursorType === 'text' ? 'normal' : 'difference',
        transform: cursorType === 'click'
          ? `translate(-50%, -50%) scale(${clickScale})`
          : 'translate(-50%, -50%)',
        transition:
          'width .2s, height .2s, border-radius .2s, transform .2s, background-color .2s',
      }"
      class="cursor-portal animate-fade-in"
    />
  </Teleport>
</template>

<style>
.cursor-portal {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  transform: translateZ(0);
  will-change: transform;
}

/* Only when .has-pointer is on <html> */
.has-pointer * {
  cursor: none !important;
}
</style>
