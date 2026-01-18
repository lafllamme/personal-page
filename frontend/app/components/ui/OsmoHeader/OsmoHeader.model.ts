export interface OsmoMenuItem {
  name: string
  href: string
  badge?: string
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

export const ourProducts: OsmoMenuItem[] = [
  { name: 'Showcase', href: '/showcase', badge: 'New' },
  { name: 'Components', href: '/components' },
  { name: 'Playground', href: '/playground', badge: 'Beta' },
  { name: 'Docs', href: '/docs' },
]

export const easings: OsmoMenuItem[] = [
  { name: 'Spring', href: '/easings/spring', badge: 'Pro' },
  { name: 'Ease In Out', href: '/easings/ease-in-out' },
]

export const explore: OsmoMenuItem[] = [
  { name: 'Community', href: '/community' },
  { name: 'Stories', href: '/stories' },
  { name: 'Events', href: '/events' },
  { name: 'Careers', href: '/careers' },
]

export const avatars: OsmoAvatar[] = [
  { src: 'https://avatar.vercel.sh/ava', alt: 'Member Ava' },
  { src: 'https://avatar.vercel.sh/liam', alt: 'Member Liam' },
  { src: 'https://avatar.vercel.sh/zoe', alt: 'Member Zoe' },
  { src: 'https://avatar.vercel.sh/leo', alt: 'Member Leo' },
  { src: 'https://avatar.vercel.sh/ivy', alt: 'Member Ivy' },
  { src: 'https://avatar.vercel.sh/ella', alt: 'Member Ella' },
  { src: 'https://avatar.vercel.sh/noah', alt: 'Member Noah' },
]

export const socialLinks: OsmoSocialLink[] = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com', icon: 'ri:linkedin-fill' },
  { name: 'Instagram', href: 'https://www.instagram.com', icon: 'ri:instagram-line' },
  { name: 'X', href: 'https://x.com', icon: 'ri:twitter-x-line' },
]

export const marqueeMessage = 'Explore the OSMO Showcase'
