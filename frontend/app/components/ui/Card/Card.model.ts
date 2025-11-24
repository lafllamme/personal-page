export const CardPropsDefaults: CardProps = {
  id: '',
  title: '',
  author: '',
  description: '',
  date: '',
  image: undefined,
  href: '#',
}

export interface CardProps {
  id: string
  title: string
  description: string
  date: string
  image?: string
  author: string
  href?: string
}
