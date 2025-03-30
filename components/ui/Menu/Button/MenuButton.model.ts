export interface MenuButtonProps {
  isOpen: boolean
}

export const MenuButtonDefaults: MenuButtonProps = {
  isOpen: false,
}

export interface MenuButtonEmits {
  (event: 'toggle'): void
}
