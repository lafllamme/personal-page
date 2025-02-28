import type { Item } from '@shared-types'

export interface NavigationItemProps {
  items: Item[]
  tabIndex: number
}

// No need for Partial<> once they're optional
export const NavigationItemDefaults = {
  items: () => [] as Item[], // a fresh array per instance
  tabIndex: 0,
}
