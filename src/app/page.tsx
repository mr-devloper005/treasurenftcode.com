import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BarChart3, FileText, Globe2, Image as ImageIcon, MapPin, ShoppingBag, User } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import type { SitePost } from '@/lib/site-connector'
import { HOME_PAGE_OVERRIDE_ENABLED, HomePageOverride } from '@/overrides/home-page'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

type EnabledTask = (typeof SITE_CONFIG.tasks)[number]
type TaskFeedItem = { task: EnabledTask; posts: SitePost[] }

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: MapPin,
  sbm: ShoppingBag,
  classified: Globe2,
  image: ImageIcon,
  profile: User,
}

function resolveTaskKey(value: unknown, fallback: TaskKey): TaskKey {
  if (value === 'listing' || value === 'classified' || value === 'article' || value === 'image' || value === 'profile' || value === 'sbm') return value
  return fallback
}

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage = typeof post?.content === 'object' && post?.content && Array.isArray((post.content as any).images)
    ? (post.content as any).images.find((url: unknown) => typeof url === 'string' && url)
    : null
  const logo = typeof post?.content === 'object' && post?.content && typeof (post.content as any).logo === 'string'
    ? (post.content as any).logo
    : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

const dummyGallery = [
  { title: 'Editorial Cover', image: 'https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?auto=format&fit=crop&w=800&q=80' },
  { title: 'Studio Poster', image: 'https://images.unsplash.com/photo-1502139214982-d0ad755818d8?auto=format&fit=crop&w=800&q=80' },
  { title: 'Brand Flyer', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80' },
  { title: 'Print Layout', image: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&w=800&q=80' },
] as const

const dummyHeroCards = [
  { title: 'Featured publication', label: 'User', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80' },
  { title: 'Featured publication', label: 'Publication', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80' },
] as const

function ReferenceHome({
  primaryTask,
  featurePosts,
  allPosts,
  enabledTasks,
}: {
  primaryTask?: EnabledTask
  featurePosts: SitePost[]
  allPosts: SitePost[]
  enabledTasks: EnabledTask[]
}) {
  const heroPrimary = featurePosts[0] || allPosts[0]
  const heroSecondary = featurePosts[1] || allPosts[1] || heroPrimary
  const formatCards = allPosts.slice(0, 4)
  const featuredPubs = allPosts.slice(4, 8)

  return (
    <main className="bg-[#e7e7e7] text-[#1f2a3a]">
      <section className="relative overflow-hidden border-b border-black/5 bg-[#ece9e4]">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[16%] bg-[linear-gradient(150deg,#f1f1f1_0%,#f6f6f6_55%,#f0435f_56%,#f0435f_62%,#f1f1f1_63%)] opacity-60" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[20%] bg-[radial-gradient(circle_at_20%_35%,#ff3f66_0%,#ff3f66_28%,transparent_29%),linear-gradient(145deg,#f3f3f3_0%,#f3f3f3_60%,#f04e76_61%,#f04e76_100%)] opacity-75" />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:py-14">
          <div>
            <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-6xl">
              Create.<br />
              Sell.<br />
              Distribute.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#475164]">
              Launch your publication workflow with the same calm, editorial style shown in your reference. Build, publish, and move products faster.
            </p>
            <Link
              href="/login"
              className="mt-7 inline-flex items-center gap-2 border-b border-[#1f2a3a] pb-1 text-xs font-bold uppercase tracking-[0.2em]"
            >
              Get Started
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[heroPrimary, heroSecondary].map((post, index) => {
              const hasRealPost = Boolean(post?.id && post?.slug)
              const fallback = dummyHeroCards[index % dummyHeroCards.length]
              const cardBody = (
                <>
                  <div className="relative h-56 overflow-hidden sm:h-64">
                    <ContentImage
                      src={hasRealPost ? getPostImage(post) : fallback.image}
                      alt={hasRealPost ? post?.title || 'Publication preview' : fallback.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5a6577]">
                      {hasRealPost ? enabledTasks[index]?.label || 'Publication' : fallback.label}
                    </p>
                    <h2 className="mt-2 line-clamp-1 text-lg font-semibold">{hasRealPost ? post?.title || 'Featured publication' : fallback.title}</h2>
                  </div>
                </>
              )

              if (!hasRealPost) {
                return (
                  <div
                    key={`hero-fallback-${index}`}
                    className="group overflow-hidden rounded-[1.35rem] border border-black/10 bg-white shadow-[0_18px_48px_rgba(20,20,20,0.14)]"
                  >
                    {cardBody}
                  </div>
                )
              }

              return (
                <Link
                  key={`${post.id}-hero-${index}`}
                  href={getTaskHref(resolveTaskKey(post.task, 'listing'), post.slug)}
                  className="group overflow-hidden rounded-[1.35rem] border border-black/10 bg-white shadow-[0_18px_48px_rgba(20,20,20,0.14)]"
                >
                  {cardBody}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.03em]">Bring Your Business to Life</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#4c5769]">
            {SITE_CONFIG.name} has a format for every business and personal publishing need, from single-page highlights to rich, multi-page publications.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {formatCards.map((post, index) => {
            const task = enabledTasks[index % Math.max(enabledTasks.length, 1)]
            const Icon = task ? taskIcons[task.key as TaskKey] || FileText : FileText

            return (
              <Link
                key={post.id}
                href={getTaskHref(resolveTaskKey(post.task, 'listing'), post.slug)}
                className="group overflow-hidden rounded-[1.4rem] border border-black/10 bg-white shadow-[0_16px_44px_rgba(22,22,22,0.1)]"
              >
                <div className="relative h-52 overflow-hidden">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.04]" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[#5a6577]">
                    <Icon className="h-4 w-4" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">{task?.label || 'Format'}</span>
                  </div>
                  <h3 className="mt-3 line-clamp-1 text-xl font-semibold">{post.title}</h3>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 border border-[#1f2a3a] px-9 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#1f2a3a] hover:text-white"
          >
            See all formats
          </Link>
        </div>
      </section>

      <section className="border-y border-black/5 bg-[#ececec]">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <BarChart3 className="mx-auto h-11 w-11 text-[#eb3f2a]" />
          <h2 className="mt-6 text-5xl font-semibold tracking-[-0.03em]">Sell Your Publication</h2>
          <p className="mt-5 text-lg leading-8 text-[#4c5769]">
            When you publish with {SITE_CONFIG.name}, you can sell online through your storefront, control customer-facing markup, and ship worldwide from your dashboard.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex border-b border-[#1f2a3a] pb-1 text-xs font-bold uppercase tracking-[0.2em]"
          >
            Learn about selling
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.03em]">Featured Publications</h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {(featuredPubs.length ? featuredPubs.map((post) => ({ title: post.title, image: getPostImage(post) })) : dummyGallery).map((item, index) => (
            <div key={`${item.title}-${index}`} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.1rem] border border-black/10 bg-white shadow-[0_14px_36px_rgba(20,20,20,0.1)]">
                <ContentImage src={item.image} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
              </div>
              <h3 className="mt-4 line-clamp-1 text-base font-semibold">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default async function HomePage() {
  if (HOME_PAGE_OVERRIDE_ENABLED) {
    return <HomePageOverride />
  }

  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const taskFeed: TaskFeedItem[] = (
    await Promise.all(
      enabledTasks.map(async (task) => ({
        task,
        posts: await fetchTaskPosts(task.key, 8, { allowMockFallback: false, fresh: true }),
      }))
    )
  ).filter(({ posts }) => posts.length)

  const primaryTask = enabledTasks[0]
  const allPosts = taskFeed
    .filter((bucket) => bucket.task.key !== 'profile')
    .flatMap((bucket) => bucket.posts)
  const featurePosts = allPosts.slice(0, 2)

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-[#e7e7e7] text-[#1f2a3a]">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      <ReferenceHome primaryTask={primaryTask} featurePosts={featurePosts} allPosts={allPosts} enabledTasks={enabledTasks} />
      <Footer />
    </div>
  )
}
