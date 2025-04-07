<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'

// Props for customization
const props = defineProps({
  // Elements that trigger different cursor states
  buttonElements: {
    type: Array,
    default: () => ['button', '.btn', '.cursor-button'],
  },
  linkElements: {
    type: Array,
    default: () => ['a', '.link', '.cursor-link'],
  },
  imageElements: {
    type: Array,
    default: () => ['img', '.image', '.cursor-image'],
  },
  headingElements: {
    type: Array,
    default: () => ['h1', 'h2', 'h3', '.heading', '.cursor-heading'],
  },
  highlightElements: {
    type: Array,
    default: () => ['.highlight', 'span', '.cursor-highlight'],
  },
  // Base cursor size
  cursorSize: {
    type: Number,
    default: 12,
  },
  // Smoothing factor (0-1, higher = more smoothing)
  smoothingFactor: {
    type: Number,
    default: 0.15,
  },
})

// Reactive state
const mousePosition = reactive({ x: 0, y: 0 })
const cursorPosition = reactive({ x: 0, y: 0 })
const cursorVisible = ref(false)
const cursorType = ref(null)
const prevCursorType = ref(null)
const isClicked = ref(false)
const appContainer = ref(null)
const isTouchDevice = ref(false)
const animationFrameId = ref(null)

// Computed styles with smooth movement
const cursorStyle = computed(() => ({
  transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px) translate(-50%, -50%)`,
}))

// Methods
function updateCursorPosition(e) {
  // Store the actual mouse position
  mousePosition.x = e.clientX
  mousePosition.y = e.clientY

  checkHoveredElement(e)
}

// Smooth cursor animation loop
function animateCursor() {
  // Calculate the distance between actual mouse position and cursor
  const dx = mousePosition.x - cursorPosition.x
  const dy = mousePosition.y - cursorPosition.y

  // Apply smoothing - move a percentage of the distance each frame
  cursorPosition.x += dx * props.smoothingFactor
  cursorPosition.y += dy * props.smoothingFactor

  // Continue the animation loop
  animationFrameId.value = requestAnimationFrame(animateCursor)
}

function handleTouchMove(e) {
  if (e.touches && e.touches[0]) {
    const touch = e.touches[0]

    mousePosition.x = touch.clientX
    mousePosition.y = touch.clientY

    checkHoveredElement({
      clientX: touch.clientX,
      clientY: touch.clientY,
      target: document.elementFromPoint(touch.clientX, touch.clientY),
    })
  }
}

function handleMouseEnter() {
  // Fade in the cursor with a smooth transition
  setTimeout(() => {
    cursorVisible.value = true
  }, 50) // Small delay to make it feel more natural
}

function handleMouseLeave() {
  // Fade out the cursor with a smooth transition
  cursorVisible.value = false
}

function handleMouseDown() {
  isClicked.value = true
}

function handleMouseUp() {
  isClicked.value = false
}

function checkHoveredElement(e) {
  const target = e.target
  console.debug('checkHoveredElement', target)

  // Store previous type for transition detection
  prevCursorType.value = cursorType.value

  // Reset state
  cursorType.value = null

  // Check if hovering over specific elements
  if (elementMatchesSelectors(target, props.buttonElements)) {
    cursorType.value = 'button'
  }
  else if (elementMatchesSelectors(target, props.linkElements)) {
    cursorType.value = 'link'
  }
  else if (elementMatchesSelectors(target, props.imageElements)) {
    cursorType.value = 'image'
  }
  else if (elementMatchesSelectors(target, props.headingElements)) {
    cursorType.value = 'heading'
  }
  else if (elementMatchesSelectors(target, props.highlightElements)) {
    cursorType.value = 'highlight'
  }
}

function elementMatchesSelectors(element, selectors) {
  return selectors.some((selector) => {
    // Check if selector is a class
    if (selector.startsWith('.')) {
      return element.classList.contains(selector.substring(1))
    }
    // Check if selector is an element type
    return element.tagName.toLowerCase() === selector.toLowerCase()
  })
}

function detectTouchDevice() {
  isTouchDevice.value = ('ontouchstart' in window)
    || (navigator.maxTouchPoints > 0)
    || (navigator.msMaxTouchPoints > 0)

  // Hide cursor on touch devices by default, show on interaction
  if (isTouchDevice.value) {
    cursorVisible.value = false

    // Add touch start event to show cursor
    document.addEventListener('touchstart', () => {
      setTimeout(() => {
        cursorVisible.value = true
      }, 100)
    })
  }
}

// Lifecycle hooks
onMounted(() => {
  detectTouchDevice()

  // Hide default cursor
  if (appContainer.value) {
    appContainer.value.style.cursor = 'none'
  }

  // Initialize cursor position to center of screen
  mousePosition.x = window.innerWidth / 2
  mousePosition.y = window.innerHeight / 2
  cursorPosition.x = mousePosition.x
  cursorPosition.y = mousePosition.y

  // Start the smooth animation loop
  animationFrameId.value = requestAnimationFrame(animateCursor)

  // Add Inter font (similar to Geist)
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'
  document.head.appendChild(link)
})

onUnmounted(() => {
  // Clean up animation frame
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value)
  }
})
</script>

<template>
  <div>
    <!-- Main application wrapper that tracks mouse movement -->
    <div
      ref="appContainer"
      class="app-container"
      @mousedown="handleMouseDown"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @mousemove="updateCursorPosition"
      @mouseup="handleMouseUp"
      @touchmove="handleTouchMove"
    >
      <!-- Slot for your actual content -->
      <slot />

      <!-- Custom cursor element -->
      <div
        :class="{
          'cursor-visible': cursorVisible,
          'cursor-button-hover': cursorType === 'button',
          'cursor-link-hover': cursorType === 'link',
          'cursor-image-hover': cursorType === 'image',
          'cursor-heading-hover': cursorType === 'heading',
          'cursor-highlight-hover': cursorType === 'highlight',
          'cursor-clicked': isClicked,
        }"
        :style="cursorStyle"
        class="custom-cursor"
      >
        <span v-if="cursorType === 'link'" class="cursor-label">View</span>
        <span v-if="cursorType === 'button'" class="cursor-label">Click</span>
        <span v-if="cursorType === 'image'" class="cursor-label">Zoom</span>

        <!-- Image hover effect elements -->
        <div v-if="cursorType === 'image'" class="cursor-image-effects">
          <div class="cursor-ring" />
          <div class="cursor-ring cursor-ring-delay" />
          <div class="cursor-dots">
            <div class="cursor-dot" />
            <div class="cursor-dot" />
            <div class="cursor-dot" />
            <div class="cursor-dot" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Base styles */
.app-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  cursor: none; /* Hide default cursor */
}

/* Custom cursor styles with smooth movement */
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
  background-color: #333;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform, width, height, opacity;

  /* Slower, smoother transitions for all properties */
  transition:
    width 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    height 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    border 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  /* Start with opacity 0 for smooth entrance */
  opacity: 0;
}

/* Visible state with smooth fade in */
.custom-cursor.cursor-visible {
  opacity: 1;
}

.cursor-label {
  opacity: 0;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: 'Inter', sans-serif;
}

/* Click animation */
.custom-cursor.cursor-clicked {
  transform: translate(calc(var(--x) - 50%), calc(var(--y) - 50%)) scale(0.8) !important;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

/* Button hover state with backdrop filter */
.custom-cursor.cursor-button-hover {
  width: 60px;
  height: 60px;
  mix-blend-mode: normal;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.custom-cursor.cursor-button-hover .cursor-label {
  opacity: 1;
  color: white;
  font-weight: 600;
  transition-delay: 0.2s;
}

/* Link hover state */
.custom-cursor.cursor-link-hover {
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.9);
  mix-blend-mode: difference;
}

.custom-cursor.cursor-link-hover .cursor-label {
  opacity: 1;
  transition-delay: 0.2s;
}

/* Image hover state */
.custom-cursor.cursor-image-hover {
  width: 80px;
  height: 80px;
  background-color: transparent;
  mix-blend-mode: exclusion;
  border: 2px solid rgba(255, 255, 255, 0.8);
}

.custom-cursor.cursor-image-hover .cursor-label {
  opacity: 1;
  font-weight: 600;
  color: white;
  z-index: 2;
  transition-delay: 0.3s;
}

/* Image hover effects container */
.cursor-image-effects {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: visible;
}

/* Animated rings for image hover */
.cursor-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: ringPulse 3s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

.cursor-ring-delay {
  animation-delay: 1.5s;
}

@keyframes ringPulse {
  0% {
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
  100% {
    width: 200%;
    height: 200%;
    opacity: 0;
  }
}

/* Orbiting dots for image hover */
.cursor-dots {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  animation: rotateDots 8s linear infinite;
}

.cursor-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: white;
  border-radius: 50%;
  opacity: 0.8;
}

.cursor-dot:nth-child(1) {
  top: -10px;
  left: calc(50% - 3px);
  animation: dotPulse 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

.cursor-dot:nth-child(2) {
  top: calc(50% - 3px);
  right: -10px;
  animation: dotPulse 2s cubic-bezier(0.16, 1, 0.3, 1) infinite 0.5s;
}

.cursor-dot:nth-child(3) {
  bottom: -10px;
  left: calc(50% - 3px);
  animation: dotPulse 2s cubic-bezier(0.16, 1, 0.3, 1) infinite 1s;
}

.cursor-dot:nth-child(4) {
  top: calc(50% - 3px);
  left: -10px;
  animation: dotPulse 2s cubic-bezier(0.16, 1, 0.3, 1) infinite 1.5s;
}

@keyframes rotateDots {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dotPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.5);
    opacity: 1;
  }
}

/* Heading hover state */
.custom-cursor.cursor-heading-hover {
  width: 40px;
  height: 40px;
  background-color: #fff;
  mix-blend-mode: difference;
}

/* Highlight hover state */
.custom-cursor.cursor-highlight-hover {
  width: 30px;
  height: 30px;
  background-color: #fff;
  mix-blend-mode: difference;
  backdrop-filter: invert(1);
  -webkit-backdrop-filter: invert(1);
}

/* Mobile optimization */
@media (max-width: 768px) {
  .custom-cursor {
    display: none; /* Hide on small screens by default */
  }

  /* Only show on touch interaction */
  .custom-cursor.touch-active {
    display: block;
  }

  /* Restore default cursor on mobile */
  .app-container {
    cursor: auto;
  }
}
</style>
