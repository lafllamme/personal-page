<script setup lang="ts">
import { START_LOCATION } from 'vue-router'

const transitionRef = ref<HTMLDivElement | null>(null)
const isAnimating = ref(false)
const isPageTransitionActive = useState('isPageTransitionActive', () => false)
const hasPlayedInitial = ref(false)
const gsapRef = shallowRef<null | typeof import('gsap')['gsap']>(null)
let stopBefore: void | (() => void)
let stopAfter: void | (() => void)
let stopResize: void | (() => void)

async function getGsap() {
  if (!import.meta.client)
    return null

  if (gsapRef.value)
    return gsapRef.value

  const mod = await import('gsap')
  gsapRef.value = mod.gsap
  return gsapRef.value
}

function getColumnCount(transitionEl: HTMLDivElement) {
  const computedStyle = window.getComputedStyle(transitionEl)
  const columnsValue = computedStyle.getPropertyValue('grid-template-columns').trim()

  if (!columnsValue || columnsValue === 'none')
    return 0

  const repeatMatch = columnsValue.match(/repeat\((\d+),/)
  if (repeatMatch)
    return Number(repeatMatch[1])

  return columnsValue.split(' ').length
}

async function buildGrid(options: { keepVisible?: boolean } = {}) {
  const transitionEl = transitionRef.value
  if (!transitionEl || !import.meta.client)
    return

  const computedStyle = window.getComputedStyle(transitionEl)
  const wasHidden = computedStyle.display === 'none'
  if (wasHidden) {
    transitionEl.style.visibility = 'hidden'
    transitionEl.style.display = 'grid'
  }

  const columns = getColumnCount(transitionEl)
  if (!columns) {
    if (wasHidden) {
      transitionEl.style.display = 'none'
      transitionEl.style.visibility = ''
    }
    return
  }

  const blockSize = window.innerWidth / columns
  const rowsNeeded = Math.ceil(window.innerHeight / blockSize)
  transitionEl.style.gridTemplateRows = `repeat(${rowsNeeded}, ${blockSize}px)`

  const totalBlocks = columns * rowsNeeded
  transitionEl.innerHTML = ''

  const fragment = document.createDocumentFragment()
  for (let i = 0; i < totalBlocks; i++) {
    const block = document.createElement('div')
    block.classList.add('transition-block', 'bg-teal-8')
    fragment.appendChild(block)
  }
  transitionEl.appendChild(fragment)

  if (wasHidden && !isAnimating.value && !options.keepVisible) {
    transitionEl.style.display = 'none'
    transitionEl.style.visibility = ''
  }
}

async function playOut() {
  const transitionEl = transitionRef.value
  if (!transitionEl)
    return

  const gsap = await getGsap()
  if (!gsap)
    return

  const blocks = Array.from(transitionEl.querySelectorAll<HTMLElement>('.transition-block'))
  gsap.set(transitionEl, { display: 'grid', visibility: 'visible', pointerEvents: 'auto' })

  return new Promise<void>((resolve) => {
    gsap.fromTo(
      blocks,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 0.001,
        ease: 'linear',
        stagger: { amount: 0.5, from: 'random' },
        onComplete: resolve,
      },
    )
  })
}

async function playIn() {
  const transitionEl = transitionRef.value
  if (!transitionEl)
    return

  const gsap = await getGsap()
  if (!gsap)
    return

  const blocks = Array.from(transitionEl.querySelectorAll<HTMLElement>('.transition-block'))

  return new Promise<void>((resolve) => {
    const timeline = gsap.timeline({
      onStart: () => {
        gsap.set(transitionEl, { display: 'grid', visibility: 'visible', pointerEvents: 'none' })
        gsap.set(transitionEl, { background: 'transparent' })
      },
      onComplete: () => {
        gsap.set(transitionEl, { display: 'none', visibility: 'hidden', pointerEvents: 'none' })
        resolve()
      },
      defaults: { ease: 'linear' },
    })

    timeline.to(
      blocks,
      { opacity: 0, duration: 0.1, stagger: { amount: 0.75, from: 'random' } },
      0.5,
    )
  })
}

onMounted(async () => {
  await getGsap()
  await buildGrid()
  if (!hasPlayedInitial.value) {
    hasPlayedInitial.value = true
    isPageTransitionActive.value = true
    await playIn()
    isPageTransitionActive.value = false
  }

  const router = useRouter()
  stopBefore = router.beforeEach(async (to, from) => {
    const isHashOnlyNavigation = to.path === from.path && to.hash && to.hash !== from.hash
    if (isAnimating.value || from === START_LOCATION || isHashOnlyNavigation)
      return true

    isAnimating.value = true
    isPageTransitionActive.value = true
    await buildGrid({ keepVisible: true })
    await playOut()
    return true
  })

  stopAfter = router.afterEach(async () => {
    await nextTick()
    await playIn()
    isAnimating.value = false
    isPageTransitionActive.value = false
  })

  stopResize = useEventListener(window, 'resize', buildGrid)
})

onBeforeUnmount(() => {
  if (typeof stopBefore === 'function')
    stopBefore()
  if (typeof stopAfter === 'function')
    stopAfter()
  if (typeof stopResize === 'function')
    stopResize()
})
</script>

<template>
  <div
    ref="transitionRef"
    class="transition bg-teal-8"
  />
</template>

<style>
.transition {
  z-index: 100;
  flex-flow: wrap;
  grid-template-columns: repeat(8, 1fr);
  place-content: center;
  place-items: center;
  width: 100%;
  min-height: 100vh;
  display: none;
  position: fixed;
  top: 0%;
  left: 0%;
  right: 0%;
}

.transition-block {
  aspect-ratio: 1;
  width: 100%;
}

@media screen and (max-width: 767px) {
  .transition {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media screen and (max-width: 479px) {
  .transition {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
