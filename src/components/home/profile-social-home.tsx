import Link from 'next/link'
import { ArrowUpRight, AtSign, BadgeCheck, Layers, Sparkles, UserRound } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { SITE_CONFIG } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    typeof post?.content === 'object' && post?.content && Array.isArray((post.content as { images?: unknown }).images)
      ? (post.content as { images: string[] }).images.find((url: unknown) => typeof url === 'string' && url)
      : null
  const logo =
    typeof post?.content === 'object' && post?.content && typeof (post.content as { logo?: unknown }).logo === 'string'
      ? (post.content as { logo: string }).logo
      : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

const featureBlocks = [
  {
    title: 'Presence that reads fast',
    description: 'Handles, bios, and highlights stay legible so visitors trust the profile in seconds.',
    icon: UserRound,
  },
  {
    title: 'Structured social proof',
    description: 'Badges and cues reinforce authenticity without crowding the layout.',
    icon: BadgeCheck,
  },
  {
    title: 'Modular story blocks',
    description: 'Sections stack like editorial panels so long bios still feel breathable.',
    icon: Layers,
  },
  {
    title: 'Motion with restraint',
    description: 'Lightweight transitions keep scanning smooth on mobile and desktop.',
    icon: Sparkles,
  },
] as const

const partnerMarks = ['AURA', 'FIELD', 'MERIDIAN', 'STUDIO', 'NORTH'] as const

export function ProfileSocialHome({ profilePosts }: { profilePosts: SitePost[] }) {
  const spotlight = profilePosts[0]
  const secondary = profilePosts.slice(1, 4)
  const directory = profilePosts.slice(0, 9)

  return (
    <main className="text-neutral-950">
      <section className="relative overflow-hidden border-b border-black/[0.06] bg-[linear-gradient(180deg,#fafaf8_0%,#f2f2f0_55%,#ecece8_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#ff4d2e]/25 bg-[#ff4d2e]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c4351f]">
                <AtSign className="h-3.5 w-3.5" />
                Next-gen social presence
              </span>
              <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Smarter profiles for a sharper public story.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-neutral-600">{SITE_CONFIG.description}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/profile"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ff4d2e] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(255,77,46,0.35)] transition hover:bg-[#e63e22] hover:shadow-[0_16px_48px_rgba(255,77,46,0.42)]"
                >
                  View profiles
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-6 py-3 text-sm font-semibold text-neutral-900 backdrop-blur-md transition hover:border-[#ff4d2e]/35 hover:bg-white"
                >
                  Claim your space
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {['Always-on presence', 'Public-ready bios', 'Trust-first layout'].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center rounded-full border border-white/60 bg-white/55 px-4 py-2 text-xs font-medium text-neutral-700 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-[#ff4d2e]/12 blur-3xl" aria-hidden />
              <div className="relative rounded-[2rem] border border-black/[0.07] bg-white/60 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {spotlight ? (
                    <Link
                      href={`/profile/${spotlight.slug}`}
                      className="group relative col-span-2 overflow-hidden rounded-[1.5rem] border border-black/[0.05] bg-[#ebebe8] shadow-inner"
                    >
                      <div className="relative aspect-[16/10] w-full">
                        <ContentImage
                          src={getPostImage(spotlight)}
                          alt={spotlight.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-5 sm:p-6">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/80">Spotlight</p>
                          <p className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{spotlight.title}</p>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="col-span-2 rounded-[1.5rem] border border-dashed border-black/10 bg-white/40 p-10 text-center text-sm text-neutral-500">
                      Profiles will appear here when published.
                    </div>
                  )}
                  {secondary.map((post) => (
                    <Link
                      key={post.id}
                      href={`/profile/${post.slug}`}
                      className="overflow-hidden rounded-[1.35rem] border border-black/[0.06] bg-white/80 shadow-[0_16px_40px_rgba(0,0,0,0.05)] transition hover:-translate-y-0.5 hover:border-[#ff4d2e]/25"
                    >
                      <div className="relative aspect-[4/3]">
                        <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <p className="font-semibold text-neutral-900">{post.title}</p>
                        <p className="mt-1 line-clamp-2 text-xs text-neutral-600">{post.summary || 'Public profile'}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/[0.06] bg-[#f2f2f0] py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-4 opacity-80 sm:px-6 lg:px-8">
          {partnerMarks.map((name) => (
            <span key={name} className="text-sm font-semibold uppercase tracking-[0.35em] text-neutral-800">
              {name}
            </span>
          ))}
        </div>
      </section>

      <section className="border-b border-black/[0.06] bg-[#fafaf8] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c4351f]">Why profiles live here</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Built for discovery, not generic feeds.</h2>
            <p className="mt-4 text-sm leading-7 text-neutral-600">
              A calmer directory rhythm keeps identities scannable while still feeling premium and intentional.
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featureBlocks.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="rounded-[1.75rem] border border-black/[0.06] bg-white/65 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[#ff4d2e]/22"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ff4d2e]/12 text-[#ff4d2e]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-neutral-950">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-neutral-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f2f2f0] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">Directory</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">People and brands worth opening.</h2>
            </div>
            <Link href="/profile" className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff4d2e] hover:text-[#c4351f]">
              Browse all
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {directory.length
              ? directory.map((post) => (
                  <TaskPostCard key={post.id} post={post} href={`/profile/${post.slug}`} taskKey="profile" />
                ))
              : (
                <p className="col-span-full rounded-[1.5rem] border border-dashed border-black/10 bg-white/50 p-8 text-center text-sm text-neutral-600">
                  No public profiles yet. Check back soon.
                </p>
              )}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section className="bg-[#0a0a0a] py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Presence starts here</p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl">
              Protection begins where vague bios end.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/65">
              Give every profile a structured story, clearer hierarchy, and a surface that feels authored—not templated.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#ff4d2e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e63e22]"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Member login
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-1 shadow-[0_40px_100px_rgba(0,0,0,0.45)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.85rem] bg-neutral-900">
              {spotlight ? (
                <ContentImage src={getPostImage(spotlight)} alt={spotlight.title} fill className="object-cover opacity-90" />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-white/70">Featured identity</p>
                <p className="mt-2 text-2xl font-semibold">{spotlight?.title || SITE_CONFIG.name}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
