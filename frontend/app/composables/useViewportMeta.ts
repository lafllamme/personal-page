/**
 * Resolve the effective viewport meta string for the current request/runtime.
 *
 * Why this exists:
 * - iOS browsers can auto-zoom focused form controls when rendered font-size is below 16px.
 * - This includes Safari and third-party iOS browsers (e.g. Firefox/Chrome on iOS),
 *   because they are WebKit-based on iOS.
 * - For this project we intentionally keep smaller visual field sizes in parts of the UI.
 * - Therefore we apply an iOS-only viewport override to suppress focus zoom.
 *
 * Accessibility note:
 * - The iOS override (`maximum-scale=1, user-scalable=no`) reduces zoom freedom.
 * - We keep this behavior scoped to iOS only; all other platforms keep the default viewport.
 */
export function useViewportMeta(defaultViewport: string) {
  const device = useDevice()
  const isIos = computed(() => device.isIos)
  const IOS_NO_ZOOM_VIEWPORT = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'

  const viewportContent = computed(() => (
    isIos.value ? IOS_NO_ZOOM_VIEWPORT : defaultViewport
  ))

  return {
    isIos,
    viewportContent,
  }
}
