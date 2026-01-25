export interface OsmoMenuItem {
  name: string
  href: string
  badge?: string
  count?: number // For items like "Collection 145"
}

export interface OsmoAvatar {
  src: string
  alt: string
}

export interface OsmoSocialLink {
  name: string
  href: string
  icon: string
}

export const avatars: OsmoAvatar[] = [
  { src: 'https://astrae-blocks.vercel.app/assets/review-1.png', alt: 'Member 1' },
  { src: 'https://astrae-blocks.vercel.app/assets/review-2.png', alt: 'Member 2' },
  { src: 'https://astrae-blocks.vercel.app/assets/review-3.png', alt: 'Member 3' },
  { src: 'https://astrae-blocks.vercel.app/assets/review-4.png', alt: 'Member 4' },
  { src: 'https://astrae-blocks.vercel.app/assets/review-5.png', alt: 'Member 5' },
  { src: 'https://astrae-blocks.vercel.app/assets/review-6.png', alt: 'Member 6' },
  { src: 'https://astrae-blocks.vercel.app/assets/review-7.png', alt: 'Member 7' },
  { src: 'https://astrae-blocks.vercel.app/assets/review-8.png', alt: 'Member 8' },
]

export const ourProducts: OsmoMenuItem[] = [
  { name: 'The Vault', href: '/check' },
  { name: 'Animation Concepts', href: '/about', badge: 'WIP' },
  { name: 'UI Libraries', href: '/blog' },
  { name: 'Daily Brief', href: '/issues' },
]

export const explore: OsmoMenuItem[] = [
  { name: 'Creative Studio', href: '/three' },
  { name: 'Design Lab', href: '/showcase' },
  { name: 'Collection', href: '/login', count: 145 },
  { name: 'Editorial', href: '/demo' },
]

export const easings: OsmoMenuItem[] = [
  { name: 'Trend Reports', href: '/section', badge: 'SOON' },
]

export const socialLinks: OsmoSocialLink[] = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com', icon: 'ri:linkedin-fill' },
  { name: 'Instagram', href: 'https://www.instagram.com', icon: 'ri:instagram-line' },
  { name: 'X', href: 'https://x.com', icon: 'ri:twitter-x-line' },
]

export const marqueeMessage = 'MAKE PIXELS FEEL ALIVE'
