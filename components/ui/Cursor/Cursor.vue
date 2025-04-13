<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'

interface Props {
  // Arrays of elements and classes to trigger different cursor behaviors
  clickableElements?: string[]
  textElements?: string[]
  clickableClasses?: string[]
  textClasses?: string[]

  // Styling properties
  size?: number
  color?: string
  textColor?: string
  textWidth?: number
  clickScale?: number

  // Minimum height for text cursor
  minTextHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
  // Default arrays for different element types
  clickableElements: () => ['a', 'button', 'input[type=\'submit\']', 'input[type=\'button\']'],
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
    'input[type=\'text\']',
    'input[type=\'email\']',
    'input[type=\'password\']',
    'input[type=\'search\']',
    'input[type=\'tel\']',
    'input[type=\'url\']',
    'textarea',
  ],
  clickableClasses: () => ['cursor-animate-click'],
  textClasses: () => ['cursor-animate-text'],

  // Default styling
  size: 24,
  color: 'white',
  textColor: '#4CBBA5',
  textWidth: 4,
  clickScale: 1.8,

  // Minimum height for text cursor
  minTextHeight: 18,
})

const cursorRef = ref<HTMLElement | null>(null)
const cursorType = ref<'default' | 'click' | 'text'>('default')
const textHeight = ref<number>(0)

onMounted(() => {
  // Function to update cursor position with immediate response
  const updateCursorPosition = (e: MouseEvent) => {
    if (cursorRef.value) {
      // Position exactly at mouse position (no offset)
      cursorRef.value.style.left = `${e.clientX}px`
      cursorRef.value.style.top = `${e.clientY}px`
    }
  }

  // Function to check what element we're hovering over
  const checkElementType = (e: MouseEvent) => {
    const target = e.target as HTMLElement

    // Check if we're hovering over a clickable element
    const isClickable
        = props.clickableElements.some((selector) => {
          return target.matches(selector) || !!target.closest(selector)
        })
        || props.clickableClasses.some((className) => {
          return target.classList.contains(className.replace('.', ''))
        })

    // Check if we're hovering over a text element
    const isText
        = props.textElements.some((selector) => {
          return target.matches(selector) || !!target.closest(selector)
        })
        || props.textClasses.some((className) => {
          return target.classList.contains(className.replace('.', ''))
        })

    // Update cursor type based on what we're hovering over
    if (isClickable) {
      cursorType.value = 'click'
    }
    else if (isText) {
      cursorType.value = 'text'
      // Get the height of the text element for the cursor line height
      const textElement = props.textElements
        .map(selector => (target.matches(selector) ? target : target.closest(selector)))
        .filter(Boolean)[0] as HTMLElement | null

      if (textElement) {
        // Get computed font size and set text height
        const computedStyle = window.getComputedStyle(textElement)
        const fontSize = Number.parseFloat(computedStyle.fontSize)

        // For input fields, use the input height instead of font size
        if (textElement.tagName.toLowerCase() === 'input' || textElement.tagName.toLowerCase() === 'textarea') {
          textHeight.value = Math.max(textElement.clientHeight * 0.8, props.minTextHeight)
        }
        else if (fontSize < 16) {
          // For smaller text, use a higher multiplier to make the line more visible
          textHeight.value = Math.max(fontSize * 1.8, props.minTextHeight)
        }
        else if (fontSize < 24) {
          // For medium text, use a medium multiplier
          textHeight.value = Math.max(fontSize * 1.5, props.minTextHeight)
        }
        else {
          // For large text (headings), use a smaller multiplier
          textHeight.value = Math.max(fontSize * 1.2, props.minTextHeight)
        }
      }
      else {
        textHeight.value = Math.max(props.size * 1.2, props.minTextHeight)
      }
    }
    else {
      cursorType.value = 'default'
    }s
  }

  // Add event listeners with { passive: true } for better performance
  document.addEventListener('mousemove', updateCursorPosition, { passive: true })
  document.addEventListener('mousemove', checkElementType, { passive: true })

  // Remove event listeners on cleanup
  onUnmounted(() => {
    document.removeEventListener('mousemove', updateCursorPosition)
    document.removeEventListener('mousemove', checkElementType)
  })
})
</script>

<template>
  <div
    ref="cursorRef"
    :style="{
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 9999,
      width: cursorType === 'text' ? `${textWidth}px` : `${size}px`,
      height: cursorType === 'text' ? `${textHeight}px` : `${size}px`,
      borderRadius: cursorType === 'text' ? '1px' : '50%',
      backgroundColor: cursorType === 'text' ? textColor : color,
      mixBlendMode: cursorType === 'text' ? 'normal' : 'difference',
      transform: cursorType === 'click' ? `translate(-50%, -50%) scale(${clickScale})` : 'translate(-50%, -50%)',
      transition: 'width 0.2s, height 0.2s, border-radius 0.2s, transform 0.2s, background-color 0.2s',
    }"
  />
</template>

<style>
/* Hide default cursor on all elements when using this component */
:global(html),
:global(body),
:global(*) {
  cursor: none !important;
}
</style>
