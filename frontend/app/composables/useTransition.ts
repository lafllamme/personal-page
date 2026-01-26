let transitionTimeout: ReturnType<typeof setTimeout> | null = null

function setBodyTransitionClass(active: boolean) {
  if (!import.meta.client)
    return
  document.body.classList.toggle('is-page-transitioning', active)
}

export function useTransition() {
  const isTransitionActive = useState<boolean>('isPageTransitionActive', () => false)

  function clearTransitionTimeout() {
    if (transitionTimeout) {
      clearTimeout(transitionTimeout)
      transitionTimeout = null
    }
  }

  function setTransitionActive(active: boolean, autoOffMs?: number) {
    isTransitionActive.value = active
    setBodyTransitionClass(active)

    if (!active) {
      clearTransitionTimeout()
      return
    }

    if (autoOffMs && autoOffMs > 0) {
      clearTransitionTimeout()
      transitionTimeout = setTimeout(() => {
        isTransitionActive.value = false
        setBodyTransitionClass(false)
        transitionTimeout = null
      }, autoOffMs)
    }
  }

  function runTransition(durationMs: number) {
    setTransitionActive(true, durationMs)
  }

  function resetTransition() {
    clearTransitionTimeout()
    setTransitionActive(false)
  }

  return {
    isTransitionActive,
    setTransitionActive,
    runTransition,
    clearTransitionTimeout,
    resetTransition,
  }
}
