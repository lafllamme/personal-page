export function useVisibilityObserver(refList: Ref, visibleList: Ref, threshold = 25) {
  onMounted(() => {
    // if we have a single element, we can use it directly
    if (refList.value && !Array.isArray(refList.value)) {
      const { hasBeenVisible } = useElementVisiblePercent(refList.value, threshold)
      watch(
        hasBeenVisible,
        (visible) => {
          if (visible)
            visibleList.value = true
        },
        { immediate: true },
      )
      return
    }

    refList.value?.forEach((el: HTMLElement, idx: number) => {
      if (el) {
        const { hasBeenVisible } = useElementVisiblePercent(el, threshold)
        watch(
          hasBeenVisible,
          (visible) => {
            if (visible)
              visibleList.value[idx] = true
          },
          { immediate: true },
        )
      }
    })
  })
}
