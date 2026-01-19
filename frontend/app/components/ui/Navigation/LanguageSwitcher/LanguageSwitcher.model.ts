export interface LanguageSwitcherProps {
  open?: boolean
  variant?: 'stepper'
  tone?: 'default' | 'osmo'
}

export const LanguageSwitcherDefaults: LanguageSwitcherProps = {
  open: false,
  variant: 'stepper',
  tone: 'default',
}
