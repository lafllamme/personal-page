export type IconAlignment = 'left' | 'right'
export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'tertiary'
export type RadiusType = 'default' | 'half'
export type BadgeSize = 'small' | 'medium' | 'large'

export interface ArticleBadgeProps {
  title: string
  variant: BadgeVariant
  align?: IconAlignment
  radiusType?: RadiusType
  size?: BadgeSize
}

export const ArticleBadgePropsDefaults: ArticleBadgeProps = {
  variant: 'default',
  title: 'Rising',
  align: 'left',
  radiusType: 'default',
}
