import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, LifeBuoy, Mail, MessageCircle, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/contact',
    title: `Contact ${SITE_CONFIG.name}`,
    description: `Reach ${SITE_CONFIG.name} for profile support, partnerships, and product questions.`,
  })
}

const lanes = [
  {
    icon: MessageCircle,
    title: 'Profile & presence',
    body: 'Questions about public bios, media, verification cues, or how your card appears in the directory.',
  },
  {
    icon: LifeBuoy,
    title: 'Technical help',
    body: 'Login on this device, saved session, search behavior—we respond with concrete next steps.',
  },
  {
    icon: Sparkles,
    title: 'Partnerships',
    body: 'Press, integrations, or co-branded discovery—tell us what you are building and your timeline.',
  },
] as const

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fafaf8_0%,#f2f2f0_55%,#ebebe8_100%)] text-neutral-950">
      <NavbarShell />

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <section className="mb-12 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ff4d2e]/25 bg-[#ff4d2e]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c4351f]">
            Contact
          </span>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">Let&apos;s talk about your public profile.</h1>
          <p className="mt-5 text-base leading-8 text-neutral-600">
            Share enough context for us to route your note quickly. We read every message and reply with the same calm tone you see across the site.
          </p>
        </section>

        <section className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div className="space-y-4">
            {lanes.map((lane) => (
              <div
                key={lane.title}
                className="rounded-[1.75rem] border border-black/[0.06] bg-white/60 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] backdrop-blur-md"
              >
                <lane.icon className="h-5 w-5 text-[#ff4d2e]" />
                <h2 className="mt-4 text-lg font-semibold text-neutral-950">{lane.title}</h2>
                <p className="mt-2 text-sm leading-7 text-neutral-600">{lane.body}</p>
              </div>
            ))}

            <div className="rounded-[1.75rem] border border-black/[0.06] bg-[#0a0a0a] p-6 text-white">
              <Mail className="h-5 w-5 text-[#ff4d2e]" />
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Direct line</p>
              <p className="mt-2 text-lg font-semibold">hello@{SITE_CONFIG.domain}</p>
              <p className="mt-2 text-sm text-white/65">We typically respond within two business days.</p>
              <Link href="/help" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#ff4d2e] hover:text-[#ff7a62]">
                Visit help center
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/[0.08] bg-white/75 p-8 shadow-[0_28px_80px_rgba(0,0,0,0.07)] backdrop-blur-xl sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">Send a message</h2>
            <p className="mt-2 text-sm text-neutral-600">All fields are required so we can reply with substance.</p>
            <form className="mt-8 grid gap-4">
              <input
                className="h-12 rounded-full border border-black/10 bg-white/90 px-4 text-sm text-neutral-950 shadow-inner placeholder:text-neutral-500"
                placeholder="Your name"
                name="name"
                autoComplete="name"
              />
              <input
                className="h-12 rounded-full border border-black/10 bg-white/90 px-4 text-sm text-neutral-950 shadow-inner placeholder:text-neutral-500"
                placeholder="Email address"
                name="email"
                type="email"
                autoComplete="email"
              />
              <input
                className="h-12 rounded-full border border-black/10 bg-white/90 px-4 text-sm text-neutral-950 shadow-inner placeholder:text-neutral-500"
                placeholder="Topic (e.g. profile visibility, partnership)"
                name="topic"
              />
              <textarea
                className="min-h-[168px] rounded-[1.25rem] border border-black/10 bg-white/90 px-4 py-3 text-sm text-neutral-950 shadow-inner placeholder:text-neutral-500"
                placeholder="Tell us what you need, links to your profile, and any deadlines."
                name="message"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#ff4d2e] px-6 text-sm font-semibold text-white shadow-[0_12px_36px_rgba(255,77,46,0.32)] transition hover:bg-[#e63e22]"
              >
                Send message
              </button>
            </form>
            <p className="mt-6 text-xs leading-relaxed text-neutral-500">
              Prefer email? Use hello@{SITE_CONFIG.domain} directly. Wire this form to your API or help desk when you connect the stack.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
