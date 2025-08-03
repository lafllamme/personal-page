export interface ReviewCardProps {
  index: number
  max?: number
  img: string
  name: string
  username: string
  body: string
  customClass?: string
}

export const ReviewCardDefaultProps: ReviewCardProps = {
  index: 0,
  max: 3,
  img: 'https://i.pravatar.cc/150?img=3',
  name: 'John Doe',
  username: 'johndoe',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien lectus. Sed at nunc non nisi efficitur bibendum. Nullam ut ligula nec erat tincidunt varius.',
}
