export const TrendingCardPropsDefaults: TrendingCardProps = {
  id: '',
  title: '',
  author: '',
  description: '',
  date: '',
  image: undefined,
  href: '#',
}

export interface TrendingCardProps {
  id: string
  title: string
  description: string
  date: string
  image?: string
  author: string
  href?: string
}
