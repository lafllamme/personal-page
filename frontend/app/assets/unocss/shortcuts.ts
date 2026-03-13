import type { UserShortcuts } from 'unocss'
import { badgeShortcuts } from './shortcuts.badge'
import { buttonShortcuts } from './shortcuts.button'
import { iconShortcuts } from './shortcuts.icon'
import { inputShortcuts } from './shortcuts.input'
import { layoutShortcuts } from './shortcuts.layout'
import { linkShortcuts } from './shortcuts.link'
import { typographyShortcuts } from './shortcuts.typography'
import { variantShortcuts } from './shortcuts.variants'

const utilityShortcuts: UserShortcuts = [
  [
    'ts-contrast',
    '[text-shadow:0_0_8px_rgba(0,0,0,0.23),_0_0_16px_rgba(0,0,0,0.12)] dark:[text-shadow:0_0_8px_rgba(255,255,255,0.23),_0_0_16px_rgba(255,255,255,0.12)]',
  ],
]

const mergedShortcuts = [
  ...(badgeShortcuts as any[]),
  ...(buttonShortcuts as any[]),
  ...(iconShortcuts as any[]),
  ...(inputShortcuts as any[]),
  ...(layoutShortcuts as any[]),
  ...(linkShortcuts as any[]),
  ...(typographyShortcuts as any[]),
  ...(variantShortcuts as any[]),
  ...(utilityShortcuts as any[]),
]

export const shortcuts: UserShortcuts = mergedShortcuts as UserShortcuts
