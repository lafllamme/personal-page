import type { Ref } from 'vue'
import { onMounted, ref, watch } from 'vue'

export function useVisibilityObserver(
  refList: Ref<HTMLElement | HTMLElement[] | null>,
  visibleList: Ref<boolean[] | boolean>,
  threshold = 25,
  isDynamic = false,
) {
  // ⬇ dynamic flag(s) – created only if caller asks for them
  const dynamicRef
    = isDynamic
      ? (Array.isArray(refList.value) ? ref([] as boolean[]) : ref(false))
      : undefined

  onMounted(() => {
    // ── single element ──────────────────────────────────────────────────
    if (refList.value && !Array.isArray(refList.value)) {
      const { hasBeenVisible, isVisible }
        = useElementVisiblePercent(refList.value, threshold)

      watch(
        hasBeenVisible,
        (visible) => {
          if (visible)
            visibleList.value = true // ← original logic
        },
        { immediate: true },
      )

      if (isDynamic && dynamicRef) {
        watch(
          isVisible,
          now => (dynamicRef.value as boolean) = now, // ← dynamic
          { immediate: true },
        )
      }
      return
    }

    // ── list of elements ────────────────────────────────────────────────
    refList.value?.forEach((el: HTMLElement, idx: number) => {
      if (!el)
        return
      const { hasBeenVisible, isVisible }
        = useElementVisiblePercent(el, threshold)

      watch(
        hasBeenVisible,
        (visible) => {
          if (visible)
            (visibleList.value as boolean[])[idx] = true
        },
        { immediate: true },
      )

      if (isDynamic && dynamicRef) {
        watch(
          isVisible,
          (now) => {
            (dynamicRef.value as boolean[])[idx] = now
          },
          { immediate: true },
        )
      }
    })
  })

  // ── expose current-visibility ref only when requested ────────────────
  return isDynamic ? dynamicRef as Ref : undefined
}
