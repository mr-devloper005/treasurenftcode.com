import Link from 'next/link'
import { ArrowUpRight, Filter, Search, ShieldCheck, Sparkles, UserRound } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { SITE_CONFIG, getTaskConfig } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'

const pillars = [
  {
    title: 'Readable at a glance',
    body: 'Names, roles, and bios use the same typographic rhythm as the homepage so scanning feels familiar.',
  },
  {
    title: 'Filters without friction',
    body: 'Jump categories when you need focus, or browse everything when you are exploring.',
  },
  {
    title: 'Trust you can see',
    body: 'Cards highlight imagery and context so every profile feels intentional—not like a spreadsheet row.',
  },
] as const

export function SocialProfileDirectoryPage({
  initialPosts,
  normalizedCategory,
}: {
  initialPosts: SitePost[]
  normalizedCategory: string
}) {
  const taskConfig = getTaskConfig('profile')
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = initialPosts.slice(0, 12).map((post, index) => ({
    '@type': 'ListItem' as const,
    position: index + 1,
    url: `${baseUrl}/profile/${post.slug}`,
    name: post.title,
  }))

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fafaf8_0%,#f2f2f0_48%,#ebebe8_100%)] text-neutral-950">
      <NavbarShell />
      <SchemaJsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${taskConfig?.label || 'Profiles'} | ${SITE_CONFIG.name}`,
          url: `${baseUrl}/profile`,
          description: taskConfig?.description,
          hasPart: schemaItems,
        }}
      />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <section className="relative overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white/60 p-8 shadow-[0_28px_80px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#ff4d2e]/10 blur-3xl" aria-hidden />
          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#ff4d2e]/25 bg-[#ff4d2e]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c4351f]">
                <UserRound className="h-3.5 w-3.5" />
                Public directory
              </span>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[2.75rem]">
                Every profile, organized for discovery.
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-600">
                Browse creators, teams, and brands in one calm grid. Use categories when you want a narrower slice, or search the whole site from the header anytime.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ff4d2e] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_36px_rgba(255,77,46,0.32)] transition hover:bg-[#e63e22]"
                >
                  Open search
                  <Search className="h-4 w-4" />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-5 py-2.5 text-sm font-semibold text-neutral-900 backdrop-blur-sm transition hover:border-[#ff4d2e]/30"
                >
                  Claim your profile
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:gap-4">
              {[
                { k: 'Curated list', v: 'Updated regularly' },
                { k: 'Category filters', v: 'Find the right lane' },
                { k: 'Same visual system', v: 'As the homepage' },
              ].map((row) => (
                <div
                  key={row.k}
                  className="rounded-2xl border border-black/[0.06] bg-[#f4f4f2]/90 px-4 py-4 text-left shadow-inner sm:py-3"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">{row.k}</p>
                  <p className="mt-1 text-sm font-semibold text-neutral-900">{row.v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <form
            action="/profile"
            method="get"
            className="h-fit space-y-4 rounded-[1.75rem] border border-black/[0.06] bg-white/65 p-6 shadow-[0_20px_55px_rgba(0,0,0,0.05)] backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              <Filter className="h-4 w-4 text-[#ff4d2e]" />
              Narrow results
            </div>
            <label className="block text-sm font-medium text-neutral-800">Category</label>
            <select
              name="category"
              defaultValue={normalizedCategory}
              className="h-12 w-full rounded-full border border-black/10 bg-white/90 px-4 text-sm text-neutral-900 shadow-inner"
            >
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#0a0a0a] text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Apply filter
            </button>
            <p className="text-xs leading-relaxed text-neutral-500">Filters use a simple GET request—bookmarkable and fast.</p>
          </form>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-[1.5rem] border border-black/[0.06] bg-white/55 p-5 shadow-[0_14px_40px_rgba(0,0,0,0.04)] backdrop-blur-md"
              >
                <ShieldCheck className="h-5 w-5 text-[#ff4d2e]" />
                <h2 className="mt-3 text-base font-semibold text-neutral-950">{p.title}</h2>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-8 flex flex-col gap-3 border-b border-black/[0.06] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c4351f]">Directory feed</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">Profiles live here</h2>
              <p className="mt-2 max-w-lg text-sm text-neutral-600">
                Cards mirror the homepage glass treatment so the experience feels like one product—not a bolted-on list.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-medium text-neutral-600 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#ff4d2e]" />
              Showing {normalizedCategory === 'all' ? 'all categories' : normalizedCategory.replace(/-/g, ' ')}
            </div>
          </div>
          <TaskListClient task="profile" initialPosts={initialPosts} category={normalizedCategory} />
        </section>
      </main>
      <Footer />
    </div>
  )
}
