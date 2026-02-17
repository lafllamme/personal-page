import type { UserShortcuts } from 'unocss'
import { buttonShortcuts } from './shortcuts.button'
import { variantShortcuts } from './shortcuts.variants'

const utilityShortcuts: UserShortcuts = [
  [
    'ts-contrast',
    '[text-shadow:0_0_8px_rgba(0,0,0,0.23),_0_0_16px_rgba(0,0,0,0.12)] dark:[text-shadow:0_0_8px_rgba(255,255,255,0.23),_0_0_16px_rgba(255,255,255,0.12)]',
  ],
]

const mergedShortcuts = [
  ...(buttonShortcuts as any[]),
  ...(variantShortcuts as any[]),
  ...(utilityShortcuts as any[]),
]

export const shortcuts: UserShortcuts = mergedShortcuts as UserShortcuts
