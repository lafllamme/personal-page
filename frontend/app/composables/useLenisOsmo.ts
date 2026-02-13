import type { LenisOptions } from 'lenis'

/**
 * Selectors that must keep native scroll/input behavior.
 * Centralized here so all Lenis guards stay consistent across the app.
 */
const lenisPreventSelectors = [
  '[data-lenis-prevent]',
  '[data-lenis-prevent-wheel]',
  '[data-lenis-prevent-touch]',
  '.o--Widget--widget',
].join(', ')

/**
 * Provides the project-wide Lenis profile modeled after Osmo's scroll feel.
 * Keeps app.vue minimal by encapsulating runtime orchestration in one composable.
 */
export function useLenisOsmo() {
  const lenis = useLenis()
  const gsapRuntime = shallowRef<{
    gsap: (typeof import('gsap'))['default']
    ScrollTrigger: (typeof import('gsap/ScrollTrigger'))['ScrollTrigger']
  } | null>(null)

  /**
   * Osmo-style baseline:
   * - manual RAF via GSAP ticker for deterministic timing with ScrollTrigger
   * - stronger wheel response with short smoothing tail
   */
  const lenisOptions: LenisOptions = {
    autoRaf: false,
    smoothWheel: true,
    syncTouch: false,
    autoResize: true,
    lerp: 0.165,
    wheelMultiplier: 1.25,
    touchMultiplier: 1,
    prevent: node => node.closest(lenisPreventSelectors) !== null,
  }

  let isActive = true

  onMounted(async () => {
    // Lazy-load GSAP on client to keep this composable SSR-safe.
    const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ])
    if (!isActive)
      return

    gsap.registerPlugin(ScrollTrigger)
    // Matches Osmo behavior: smoothes frame jitter without disabling responsiveness.
    gsap.ticker.lagSmoothing(500, 33)
    gsapRuntime.value = { gsap, ScrollTrigger }
  })

  /**
   * Binds Lenis to GSAP only when both are ready.
   * Cleanup runs automatically when Lenis instance changes or component unmounts.
   */
  watch(
    [lenis, gsapRuntime],
    ([instance, runtime], _, onCleanup) => {
      if (!instance || !runtime)
        return

      const { gsap, ScrollTrigger } = runtime
      const unsubscribe = instance.on('scroll', ScrollTrigger.update)
      const tickerCallback = (time: number) => {
        instance.raf(time * 1000)
      }

      gsap.ticker.add(tickerCallback)

      onCleanup(() => {
        unsubscribe()
        gsap.ticker.remove(tickerCallback)
      })
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    isActive = false
  })

  return {
    lenisOptions,
  }
}
