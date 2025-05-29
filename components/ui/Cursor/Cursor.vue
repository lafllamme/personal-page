<!-- components/ui/Cursor/Cursor.vue -->
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
  textWidth,
  clickScale,
  minTextHeight,
  forceType,
} = toRefs(props)

const cursorRef = ref<HTMLElement | null>(null)
const cursorType = ref<CursorType>('default')
const textHeight = ref<number>(0)
const hasPointer = ref<boolean>(false)
const firstRender = ref<boolean>(true)

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

// DRY: one place to calculate/set text bar height
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
      // DRY: Only here!
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
    cursorType.value = 'click'
  }
  else if (isText) {
    const textEl = textElements.value
      .map(sel => (target.matches(sel) ? target : target.closest(sel)))
      .filter(Boolean)[0] as HTMLElement | null
    setTextCursor(textEl)
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
