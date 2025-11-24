export interface MenuProps {
  items?: MenuItem[]
}

export interface MenuItem {
  id: number
  title: string
  children?: MenuItem[]
}

export const MenuPropsDefault = {
  /* items: () => [
      {
        id: 1,
        title: 'Technology',
        children: [
          { id: 11, title: 'Gadgets' },
          { id: 12, title: 'Software' },
          { id: 13, title: 'AI & Machine Learning' },
        ],
      },
      {
        id: 2,
        title: 'Business',
        children: [
          { id: 21, title: 'Startups' },
          { id: 22, title: 'Venture Capital' },
          { id: 23, title: 'Market Trends' },
        ],
      },
      {
        id: 3,
        title: 'Science',
        children: [
          { id: 31, title: 'Space' },
          { id: 32, title: 'Environment' },
          { id: 33, title: 'Health' },
        ],
      },
      {
        id: 4,
        title: 'Reviews',
        children: [
          { id: 41, title: 'Smartphones' },
          { id: 42, title: 'Laptops' },
          { id: 43, title: 'Wearables' },
        ],
      },
      {
        id: 5,
        title: 'About',
      },
      {
        id: 6,
        title: 'Contact',
      },
    ], */
}
