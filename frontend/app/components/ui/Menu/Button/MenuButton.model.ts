export interface MenuButtonProps {
  forceOpen?: boolean
}

export const MenuButtonDefaults: MenuButtonProps = {
  forceOpen: false,
}

export interface MenuButtonEmits {
  (event: 'toggle'): void
}
