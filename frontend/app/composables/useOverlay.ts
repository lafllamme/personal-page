interface UseOverlayOptions {
  manageLifecycle?: boolean
}

export function useOverlay(options: UseOverlayOptions = {}) {
  const { manageLifecycle = true } = options
  const introOverlayDone = useState<boolean>('intro-overlay-done', () => false)
  const introOverlayActive = useState<boolean>('intro-overlay-active', () => false)

  const overlayExiting = ref(false)
  const overlayVisible = ref(!introOverlayDone.value)
  const shouldHideContent = computed(() => overlayVisible.value && !overlayExiting.value)

  const bodyRef = ref<HTMLElement | null>(null)
  const isBodyScrollLocked = useScrollLock(bodyRef, false)

  const overlayDurationMs = 2000
  const overlayExitDurationMs = 1000
  // Headline starts during overlay exit animation (after exit slide delay) to show full slide motion
  // Overlay exit slide: delay 200ms, duration 800ms (starts at 2200ms, ends at 3000ms)
  // Headline should start around 2200-2300ms to run parallel and show full slide animation
  // Updated delay: 350ms (increased from 200ms for better timing)
  const headlineStartDelayMs = 350

  // Track when headline should start (starts during overlay exit animation)
  const headlineShouldStart = ref(false)

  function handleOverlayComplete() {
    headlineShouldStart.value = true
    overlayVisible.value = false
    introOverlayDone.value = true
    introOverlayActive.value = false
    isBodyScrollLocked.value = false
    document.body.style.cursor = 'default'
    window.scrollTo(0, 0)
  }

  // Fallback: if animation callback doesn't fire, trigger after exit duration
  const { start: startOverlayHide, stop: stopOverlayHide } = useTimeoutFn(() => {
    if (!headlineShouldStart.value) {
      handleOverlayComplete()
    }
  }, overlayExitDurationMs, { immediate: false })

  const { start: startOverlayExit, stop: stopOverlayExit } = useTimeoutFn(() => {
    overlayExiting.value = true
    // Start headline animation with small delay after exit begins (parallel to overlay exit animation)
    setTimeout(() => {
      headlineShouldStart.value = true
    }, headlineStartDelayMs)
    // Start fallback timeout when exit begins
    startOverlayHide()
  }, overlayDurationMs, { immediate: false })

  if (manageLifecycle) {
    watch(overlayVisible, (value) => {
      introOverlayActive.value = value
    }, { immediate: true })

    onMounted(() => {
      if (!import.meta.client)
        return
      if (introOverlayDone.value) {
        overlayVisible.value = false
        overlayExiting.value = false
        introOverlayActive.value = false
        headlineShouldStart.value = true
        return
      }
      bodyRef.value = document.body
      isBodyScrollLocked.value = true
      document.body.style.cursor = 'wait'
      startOverlayExit()
    })

    onBeforeUnmount(() => {
      stopOverlayExit()
      stopOverlayHide()
      isBodyScrollLocked.value = false
    })
  }

  // Function to manually trigger headline animation (useful when navigating back to home)
  function triggerHeadlineAnimation() {
    headlineShouldStart.value = true
  }

  // Expose startOverlayExit for manual control when manageLifecycle is false
  return {
    overlayVisible,
    overlayExiting,
    shouldHideContent,
    introOverlayDone,
    introOverlayActive,
    headlineShouldStart: computed(() => headlineShouldStart.value),
    handleOverlayComplete,
    startOverlayExit,
    triggerHeadlineAnimation,
  }
}
