import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Search } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG } from '@/lib/site-config'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { buildPageMetadata } from '@/lib/seo'

export const revalidate = 3

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>
}): Promise<Metadata> {
  const resolved = (await searchParams) || {}
  const q = (resolved.q || '').trim()
  return buildPageMetadata({
    path: '/search',
    title: q ? `Search: ${q}` : 'Search',
    description: q
      ? `Results for “${q}” across ${SITE_CONFIG.name}.`
      : `Search public profiles and posts on ${SITE_CONFIG.name}.`,
  })
}

const matchText = (value: string, query: string) => value.toLowerCase().includes(query)

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')

const compactText = (value: unknown) => {
  if (typeof value !== 'string') return ''
  return stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase()
}

const tips = [
  'Try a handle, city, or niche keyword.',
  'Use quotes in your own workflow when you wire server-side search.',
  'Profile cards match the homepage glass style.',
] as const

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>
}) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined,
  )
  const posts =
    feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.flatMap((t) => getMockPostsForTask(t.key))

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === 'object' ? post.content : {}
    const typeText = compactText((content as { type?: unknown }).type)
    if (typeText === 'comment') return false
    const description = compactText((content as { description?: unknown }).description)
    const body = compactText((content as { body?: unknown }).body)
    const excerpt = compactText((content as { excerpt?: unknown }).excerpt)
    const categoryText = compactText((content as { category?: unknown }).category)
    const tags = Array.isArray(post.tags) ? post.tags.join(' ') : ''
    const tagsText = compactText(tags)
    const derivedCategory = categoryText || tagsText
    if (category && !derivedCategory.includes(category)) return false
    if (task && typeText && typeText !== task) return false
    if (!normalized.length) return true
    return (
      matchText(compactText(post.title || ''), normalized) ||
      matchText(compactText(post.summary || ''), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    )
  })

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24)

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fafaf8_0%,#f2f2f0_50%,#ebebe8_100%)] text-neutral-950">
      <NavbarShell />

      <main>
        <section className="border-b border-black/[0.06] bg-[linear-gradient(180deg,#ffffff_0%,#f4f4f2_100%)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#ff4d2e]/25 bg-[#ff4d2e]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c4351f]">
                  Discovery
                </span>
                <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">Search the whole surface.</h1>
                <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-600">
                  {query
                    ? `Showing matches for “${query}” with the same coral and glass language as the homepage.`
                    : 'Start typing to filter profiles and posts. Until then, we surface a fresh slice of the feed below.'}
                </p>
              </div>
              <form action="/search" className="rounded-[1.75rem] border border-black/[0.06] bg-white/70 p-5 shadow-[0_20px_55px_rgba(0,0,0,0.06)] backdrop-blur-md sm:p-6">
                <input type="hidden" name="master" value="1" />
                {category ? <input type="hidden" name="category" value={category} /> : null}
                {task ? <input type="hidden" name="task" value={task} /> : null}
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Query</label>
                <div className="relative mt-2">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <Input
                    name="q"
                    defaultValue={query}
                    placeholder="Names, topics, locations…"
                    className="h-12 rounded-full border-black/10 bg-white/95 pl-11 pr-4 text-neutral-950 shadow-inner"
                  />
                </div>
                <Button type="submit" className="mt-4 w-full rounded-full bg-[#ff4d2e] text-white hover:bg-[#e63e22] sm:w-auto sm:px-8">
                  Run search
                </Button>
              </form>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Shortcuts:</span>
              <Link
                href="/profile"
                className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-medium text-neutral-800 transition hover:border-[#ff4d2e]/35"
              >
                Profiles
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-medium text-neutral-800 transition hover:border-[#ff4d2e]/35"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 rounded-full border border-transparent px-3 py-1.5 text-xs font-semibold text-[#ff4d2e] hover:text-[#c4351f]"
              >
                Need help?
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 border-b border-black/[0.06] pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c4351f]">Results</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                {results.length ? `${results.length} match${results.length === 1 ? '' : 'es'}` : 'No matches yet'}
              </h2>
            </div>
            <ul className="max-w-md space-y-2 text-xs text-neutral-600">
              {tips.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff4d2e]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {results.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((post) => {
                const postTask = getPostTaskKey(post)
                const href = postTask ? buildPostUrl(postTask, post.slug) : `/posts/${post.slug}`
                return <TaskPostCard key={post.id} post={post} href={href} taskKey={postTask || undefined} />
              })}
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-black/15 bg-white/50 p-12 text-center backdrop-blur-sm">
              <p className="text-base font-medium text-neutral-800">No matching posts yet.</p>
              <p className="mt-2 text-sm text-neutral-600">Try another keyword or browse the profile directory.</p>
              <Button asChild className="mt-6 rounded-full bg-[#0a0a0a] text-white hover:bg-neutral-800">
                <Link href="/profile">Open profiles</Link>
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
