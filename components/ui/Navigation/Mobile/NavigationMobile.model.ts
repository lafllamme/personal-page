import type { Item } from '@shared-types'

export interface NavigationProps {
  items: Item[]
  open: boolean
}

export const NavigationDefaults = {
  items: () => [] as Item[],
  open: false,
}
