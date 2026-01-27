import { useLenis } from 'lenis/vue'

interface HeaderVisibilityOptions {
  sectionRef: Ref<HTMLElement | null>
  buffer?: number
  offsetPadding?: number
}

export function useHeaderVisibility(options: HeaderVisibilityOptions) {
  const {
    sectionRef,
    buffer = 6,
    offsetPadding = 16,
  } = options

  const headerHidden = useState<boolean>('osmo-header-hidden', () => false)
  const headerOffset = useState<number>('osmo-header-offset', () => 0)
  const colorMode = useColorMode()
  const headerTone = useState<'light' | 'dark'>(
    'osmo-header-tone',
    () => (colorMode.value === 'dark' ? 'dark' : 'light'),
  )

  let headerRaf = 0

  function getHeaderOffset(): number {
    if (!import.meta.client)
      return 0

    const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-height').trim()
    const parsed = Number.parseFloat(raw)
    return Number.isFinite(parsed) ? parsed + offsetPadding : 96
  }

  function applyHeaderVisibility(atBoundary: boolean) {
    headerHidden.value = atBoundary
    headerOffset.value = atBoundary ? -getHeaderOffset() : 0
    headerTone.value = colorMode.value === 'dark' ? 'dark' : 'light'
  }

  function updateHeaderVisibility() {
    const section = sectionRef.value
    if (!section) {
      applyHeaderVisibility(false)
      return
    }

    const rect = section.getBoundingClientRect()
    const height = getHeaderOffset()
    const atBoundary = rect.top <= height - buffer && rect.bottom > 0
    applyHeaderVisibility(atBoundary)
  }

  function scheduleUpdate() {
    if (headerRaf)
      return

    headerRaf = requestAnimationFrame(() => {
      headerRaf = 0
      updateHeaderVisibility()
    })
  }

  useLenis(() => {
    scheduleUpdate()
  })

  onMounted(() => {
    scheduleUpdate()
  })

  watch(colorMode, () => {
    scheduleUpdate()
  })

  useEventListener(window, 'resize', scheduleUpdate, { passive: true })

  onBeforeUnmount(() => {
    if (headerRaf) {
      cancelAnimationFrame(headerRaf)
      headerRaf = 0
    }
    applyHeaderVisibility(false)
  })

  return {
    scheduleUpdate,
    updateHeaderVisibility,
  }
}
