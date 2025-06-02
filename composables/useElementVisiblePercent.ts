import type { Ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { computed, ref, unref, watch } from 'vue'

export function useElementVisiblePercent(
  target: Ref<HTMLElement | null | undefined> | HTMLElement,
  percent: number = 50,
) {
  const intersectionRatio = ref(0)
  const hasBeenVisible = ref(false)

  // Ensure the target is a ref
  const targetRef = ref(unref(target)) as Ref<HTMLElement | null | undefined>

  useIntersectionObserver(
    targetRef,
    ([entry]) => {
      intersectionRatio.value = entry?.intersectionRatio ?? 0
    },
    {
      threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    },
  )

  const isVisible = computed(() => intersectionRatio.value >= percent / 100)

  watch(isVisible, (val) => {
    if (val) {
      consola.debug('[useElementVisiblePercent] Element is visible', targetRef.value)
      hasBeenVisible.value = true
    }
  })

  return { isVisible, hasBeenVisible }
}
