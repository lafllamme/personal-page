export function useOverlay() {
  const introOverlayDone = useState<boolean>('intro-overlay-done', () => false)
  const introOverlayActive = useState<boolean>('intro-overlay-active', () => false)

  const overlayExiting = ref(false)
  const overlayVisible = ref(!introOverlayDone.value)
  const shouldHideContent = computed(() => overlayVisible.value && !overlayExiting.value)

  const bodyRef = ref<HTMLElement | null>(null)
  const isBodyScrollLocked = useScrollLock(bodyRef, false)

  const overlayDurationMs = 2000
  const overlayExitDurationMs = 1000

  const { start: startOverlayExit, stop: stopOverlayExit } = useTimeoutFn(() => {
    overlayExiting.value = true
    startOverlayHide()
  }, overlayDurationMs, { immediate: false })

  const { start: startOverlayHide, stop: stopOverlayHide } = useTimeoutFn(() => {
    overlayVisible.value = false
    introOverlayDone.value = true
    introOverlayActive.value = false
    isBodyScrollLocked.value = false
    document.body.style.cursor = 'default'
    window.scrollTo(0, 0)
  }, overlayExitDurationMs, { immediate: false })

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

  return {
    overlayVisible,
    overlayExiting,
    shouldHideContent,
    introOverlayDone,
    introOverlayActive,
  }
}
