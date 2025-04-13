<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'

interface Props {
  clickableElements?: string[]
  textElements?: string[]
  clickableClasses?: string[]
  textClasses?: string[]
  size?: number
  color?: string
  textColor?: string
  textWidth?: number
  clickScale?: number
  minTextHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
  clickableElements: () => ['a', 'button', 'input[type="submit"]', 'input[type="button"]'],
  textElements: () => [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'span',
    'li',
    'blockquote',
    'input[type="text"]',
    'input[type="email"]',
    'input[type="password"]',
    'input[type="search"]',
    'input[type="tel"]',
    'input[type="url"]',
    'textarea',
  ],
  clickableClasses: () => ['cursor-animate-click'],
  textClasses: () => ['cursor-animate-text'],
  size: 24,
  color: 'white',
  textColor: '#4CBBA5',
  textWidth: 4,
  clickScale: 1.8,
  minTextHeight: 18,
})

const cursorRef = ref<HTMLElement | null>(null)
const cursorType = ref<'default' | 'click' | 'text'>('default')
const textHeight = ref<number>(0)

onMounted(() => {
  if (cursorRef.value) {
    document.body.appendChild(cursorRef.value)
  }

  const updateCursorPosition = (e: MouseEvent) => {
    if (cursorRef.value) {
      cursorRef.value.style.left = `${e.clientX}px`
      cursorRef.value.style.top = `${e.clientY}px`
    }
  }

  const checkElementType = (e: MouseEvent) => {
    const target = e.target as HTMLElement

    const isClickable
        = props.clickableElements.some(sel => target.matches(sel) || !!target.closest(sel))
          || props.clickableClasses.some(cls => target.classList.contains(cls.replace('.', '')))

    const isText
        = props.textElements.some(sel => target.matches(sel) || !!target.closest(sel))
          || props.textClasses.some(cls => target.classList.contains(cls.replace('.', '')))

    if (isClickable) {
      cursorType.value = 'click'
    }
    else if (isText) {
      cursorType.value = 'text'

      const textEl = props.textElements
        .map(sel => (target.matches(sel) ? target : target.closest(sel)))
        .filter(Boolean)[0] as HTMLElement | null

      if (textEl) {
        const fontSize = Number.parseFloat(window.getComputedStyle(textEl).fontSize)
        if (['input', 'textarea'].includes(textEl.tagName.toLowerCase())) {
          textHeight.value = Math.max(textEl.clientHeight * 0.8, props.minTextHeight)
        }
        else if (fontSize < 16) {
          textHeight.value = Math.max(fontSize * 1.8, props.minTextHeight)
        }
        else if (fontSize < 24) {
          textHeight.value = Math.max(fontSize * 1.5, props.minTextHeight)
        }
        else {
          textHeight.value = Math.max(fontSize * 1.2, props.minTextHeight)
        }
      }
      else {
        textHeight.value = Math.max(props.size * 1.2, props.minTextHeight)
      }
    }
    else {
      cursorType.value = 'default'
    }
  }

  document.addEventListener('mousemove', updateCursorPosition, { passive: true })
  document.addEventListener('mousemove', checkElementType, { passive: true })

  onUnmounted(() => {
    document.removeEventListener('mousemove', updateCursorPosition)
    document.removeEventListener('mousemove', checkElementType)

    if (cursorRef.value?.parentNode) {
      cursorRef.value.parentNode.removeChild(cursorRef.value)
    }
  })
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
