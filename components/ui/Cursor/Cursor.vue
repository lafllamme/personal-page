<script lang="ts" setup>
import type { CursorProps, CursorType } from '@/components/ui/Cursor/Cursor.model'
import { CursorDefaultProps } from '@/components/ui/Cursor/Cursor.model'

const props = withDefaults(defineProps<CursorProps>(), CursorDefaultProps)

const {
  clickableElements,
  clickableClasses,
  textElements,
  textClasses,
  color,
  textColor,
  size,
  minTextHeight,
} = toRefs(props)

const cursorRef = ref<HTMLElement | null>(null)
const cursorType = ref<CursorType>('default')
const textHeight = ref<number>(0)

function handleCursor(mounted: boolean = true) {
  if (mounted && cursorRef.value) {
    document.body.appendChild(cursorRef.value)
  }
  else if (!mounted && cursorRef.value?.parentNode) {
    cursorRef.value.parentNode.removeChild(cursorRef.value)
  }
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

    const textEl = textElements.value
      .map(sel => (target.matches(sel) ? target : target.closest(sel)))
      .filter(Boolean)[0] as HTMLElement | null

    if (textEl) {
      const fontSize = Number.parseFloat(window.getComputedStyle(textEl).fontSize)
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

onMounted(() => {
  handleCursor(true)
  initListeners()
})

onUnmounted(() => {
  handleCursor(false)
})
</script>

<template>
  <div
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
      transition: 'width 0.2s, height 0.2s, border-radius 0.2s, transform 0.2s, background-color 0.2s',
    }"
    class="cursor-portal"
  />
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

/* Hide native cursor globally */
:global(html),
:global(body),
:global(*) {
  cursor: none !important;
}
</style>
