import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight, HeartHandshake, Layers, Target } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { mockTeamMembers } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/about',
    title: `About ${SITE_CONFIG.name}`,
    description: `Learn how ${SITE_CONFIG.name} helps people and brands present a clearer public profile and social presence.`,
  })
}

const metrics = [
  { label: 'Profile-first', value: '100%', hint: 'Every surface ladders to identity' },
  { label: 'Design system', value: 'One', hint: 'Shared color, type, and motion' },
  { label: 'Focus', value: 'Calm', hint: 'Fewer tabs, clearer hierarchy' },
] as const

const beliefs = [
  {
    title: 'Presence should feel authored',
    body: 'We treat every public page like a portfolio moment—room for story, imagery, and proof—not a cramped social widget.',
    icon: Layers,
  },
  {
    title: 'Discovery without noise',
    body: 'Search and directory views stay lightweight so visitors can scan fast, then commit when a profile resonates.',
    icon: Target,
  },
  {
    title: 'Trust in the open',
    body: 'Clear bios, structured metadata, and consistent cards help people decide who to follow, hire, or collaborate with.',
    icon: HeartHandshake,
  },
] as const

const timeline = [
  { year: '2024', title: 'Foundation', text: 'We set out to unify fragmented profile pages into one calm directory experience.' },
  { year: '2025', title: 'Refinement', text: 'Typography, glass surfaces, and coral accents became the signature of the product.' },
  { year: '2026', title: 'Today', text: `${SITE_CONFIG.name} focuses purely on social profiles—fast to browse, easy to share.` },
] as const

const partners = ['NORTH', 'AURA', 'FIELD', 'MERIDIAN', 'STUDIO'] as const

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fafaf8_0%,#f2f2f0_50%,#ebebe8_100%)] text-neutral-950">
      <NavbarShell />

      <main>
        <section className="border-b border-black/[0.06] bg-[linear-gradient(180deg,#ffffff_0%,#f4f4f2_100%)] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ff4d2e]/25 bg-[#ff4d2e]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c4351f]">
              Our story
            </span>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[3.25rem]">
              A platform built around public identity—not every content type at once.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-600">
              {SITE_CONFIG.name} exists so creators, teams, and brands can be found through a single, coherent profile directory.
              We stripped the noise of mixed feeds and kept the experience editorial, warm, and easy to scan.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-[#ff4d2e] px-6 text-white shadow-[0_12px_36px_rgba(255,77,46,0.32)] hover:bg-[#e63e22]">
                <Link href="/profile" className="inline-flex items-center gap-2">
                  Browse profiles
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-black/15 bg-white/70 backdrop-blur-sm">
                <Link href="/contact">Talk with us</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-black/[0.06] bg-[#f2f2f0] py-10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-14 gap-y-5 px-4 opacity-85 sm:px-6 lg:px-8">
            {partners.map((name) => (
              <span key={name} className="text-xs font-semibold uppercase tracking-[0.38em] text-neutral-800">
                {name}
              </span>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-5 sm:grid-cols-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-[1.75rem] border border-black/[0.06] bg-white/65 p-6 text-center shadow-[0_18px_50px_rgba(0,0,0,0.05)] backdrop-blur-md"
              >
                <p className="text-3xl font-semibold tracking-tight text-neutral-950">{m.value}</p>
                <p className="mt-2 text-sm font-semibold text-neutral-900">{m.label}</p>
                <p className="mt-1 text-xs text-neutral-500">{m.hint}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-black/[0.06] bg-[#fafaf8] py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c4351f]">How we think</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Principles that shape every screen.</h2>
              <p className="mt-5 text-sm leading-7 text-neutral-600">
                From the homepage to search results, we use the same off-white canvas, coral accents, and glass cards so the
                product feels intentional—never like a theme swap.
              </p>
            </div>
            <div className="space-y-4">
              {beliefs.map(({ title, body, icon: Icon }) => (
                <div
                  key={title}
                  className="rounded-[1.5rem] border border-black/[0.06] bg-white/70 p-5 shadow-[0_14px_40px_rgba(0,0,0,0.04)] backdrop-blur-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff4d2e]/12 text-[#ff4d2e]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-neutral-950">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-neutral-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c4351f]">Timeline</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">Where we are headed</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {timeline.map((item) => (
              <div key={item.year} className="relative rounded-[1.75rem] border border-black/[0.06] bg-white/60 p-6 backdrop-blur-md">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff4d2e]">{item.year}</span>
                <h3 className="mt-3 text-lg font-semibold text-neutral-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-neutral-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-black/[0.06] bg-[#f2f2f2] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">People behind the product</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">Meet the team</h2>
                <p className="mt-2 max-w-lg text-sm text-neutral-600">
                  A small group obsessed with profile clarity, performance, and humane defaults.
                </p>
              </div>
              <Button asChild variant="outline" className="w-fit rounded-full border-black/15 bg-white/80">
                <Link href="/team">Full team directory</Link>
              </Button>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mockTeamMembers.map((member) => (
                <div
                  key={member.id}
                  className="rounded-[1.75rem] border border-black/[0.06] bg-white/70 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-[#ff4d2e]/25"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border border-black/[0.08]">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-neutral-950">{member.name}</p>
                      <p className="text-xs text-neutral-500">{member.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-neutral-600">{member.bio}</p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-wider text-neutral-400">{member.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0a0a0a] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">Next step</p>
              <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">Ready to put your profile on stage?</h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/65">
                Join the directory, keep your story consistent with the homepage look, and make it easier for people to say yes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-[#ff4d2e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e63e22]"
              >
                Create account
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
