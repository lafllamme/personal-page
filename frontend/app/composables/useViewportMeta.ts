/**
 * Resolve the effective viewport meta string for the current request/runtime.
 *
 * Why this exists:
 * - iOS Safari auto-zooms focused form controls when their rendered font-size is below 16px.
 * - For this project we intentionally keep smaller visual field sizes in parts of the UI.
 * - Therefore we apply an iOS Safari specific viewport override to suppress focus zoom.
 *
 * Accessibility note:
 * - The iOS Safari override (`maximum-scale=1, user-scalable=no`) reduces zoom freedom.
 * - We keep this behavior scoped to iOS Safari only; all other browsers keep the default viewport.
 */
export function useViewportMeta(defaultViewport: string) {
  const device = useDevice()
  const IOS_SAFARI_NO_ZOOM_VIEWPORT = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'

  const isIosSafari = computed(() => device.isIos && device.isSafari)

  const viewportContent = computed(() => (
    isIosSafari.value ? IOS_SAFARI_NO_ZOOM_VIEWPORT : defaultViewport
  ))

  return {
    isIosSafari,
    viewportContent,
  }
}
