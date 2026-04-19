import { defineSiteTheme } from '@/config/site.theme.defaults'

export const SITE_THEME = defineSiteTheme({
  shell: 'editorial',
  hero: {
    variant: 'spotlight-split',
    eyebrow: 'Next-gen social presence',
  },
  home: {
    layout: 'editorial-rhythm',
    primaryTask: 'profile',
    featuredTaskKeys: ['profile'],
  },
  navigation: {
    variant: 'editorial',
  },
  footer: {
    variant: 'editorial',
  },
  cards: {
    listing: 'listing-elevated',
    article: 'editorial-feature',
    image: 'studio-panel',
    profile: 'profile-glass',
    classified: 'catalog-grid',
    pdf: 'catalog-grid',
    sbm: 'editorial-feature',
    social: 'profile-glass',
    org: 'catalog-grid',
    comment: 'editorial-feature',
  },
})
