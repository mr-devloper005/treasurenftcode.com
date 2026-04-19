import type { SiteRecipe } from '@/design/factory/recipe-types'

export const SITE_RECIPE: SiteRecipe = {
  productFamily: 'curation',
  themePack: 'curation-library',
  homepageTemplate: 'image-profile-home',
  navbarTemplate: 'compact-bar',
  footerTemplate: 'minimal-footer',
  motionPack: 'minimal',
  primaryTask: 'profile',
  enabledTasks: ['profile'],
  taskTemplates: {
    profile: 'profile-business',
  },
  manualOverrides: {
    navbar: false,
    footer: false,
    homePage: false,
    taskListPage: false,
    taskDetailPage: false,
    taskCard: false,
    contactPage: false,
    loginPage: false,
    registerPage: false,
  },
}


