export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'tn5q8x2m4v',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Treasure NFT Code',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Profile discovery platform',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A profile-first platform for identity, creator presence, and social discovery.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'treasurenftcode.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://treasurenftcode.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

