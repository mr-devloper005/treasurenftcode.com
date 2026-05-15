import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight, BookOpenText, Printer, Store, Workflow } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/about',
    title: `About ${SITE_CONFIG.name}`,
    description: `Learn how ${SITE_CONFIG.name} helps you create, sell, and distribute publication-ready products with a clean modern workflow.`,
  })
}

const pillars = [
  {
    title: 'Create with structure',
    body: 'Start from clear format lanes and transform ideas into publication-ready output with minimal setup overhead.',
    icon: BookOpenText,
  },
  {
    title: 'Sell from one dashboard',
    body: 'Control pricing, storefront visibility, and fulfillment workflows without switching between disconnected tools.',
    icon: Store,
  },
  {
    title: 'Distribute at scale',
    body: 'Move from single pieces to broader campaigns while maintaining a consistent editorial presentation.',
    icon: Workflow,
  },
] as const

const timeline = [
  {
    step: '01',
    title: 'Format-first foundation',
    text: 'We designed the product around practical publication formats so output feels intentional from day one.',
  },
  {
    step: '02',
    title: 'Commerce-ready publishing',
    text: 'The experience evolved beyond layout into storefront and delivery support for real business outcomes.',
  },
  {
    step: '03',
    title: 'Unified create-to-sell flow',
    text: `${SITE_CONFIG.name} now combines creation, selling, and distribution into one calm and focused surface.`,
  },
] as const

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#e7e7e7] text-[#1f2a3a]">
      <NavbarShell />

      <main>
        <section className="relative overflow-hidden border-b border-black/5 bg-[#ece9e4] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[22%] bg-[radial-gradient(circle_at_30%_20%,#f46086_0%,#f46086_35%,transparent_36%),linear-gradient(145deg,#f3f3f3_0%,#f3f3f3_62%,#f04e76_63%,#f04e76_100%)] opacity-75" />
          <div className="mx-auto max-w-7xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#1f2a3a] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
              About {SITE_CONFIG.name}
            </span>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[3.25rem]">
              A publishing platform built to help you create, sell, and distribute without friction.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#4c5769]">
              We focus on practical publishing outcomes: strong format surfaces, better presentation, and a cleaner path from idea to customer-ready product.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full bg-[#1f2a3a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#111827]"
              >
                Get started
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#1f2a3a]/25 bg-white/80 px-6 py-3 text-sm font-semibold text-[#1f2a3a]"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-semibold tracking-[-0.03em]">What drives the product</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#4c5769]">
              Every major decision is tied to one goal: publishing that looks better, works faster, and converts more reliably.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map(({ title, body, icon: Icon }) => (
              <div key={title} className="rounded-[1.5rem] border border-black/10 bg-white p-6 shadow-[0_16px_44px_rgba(22,22,22,0.1)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f2f4f7] text-[#1f2a3a]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#4c5769]">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-black/5 bg-[#ececec]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <Printer className="h-10 w-10 text-[#eb3f2a]" />
                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em]">From first draft to shipped publication</h2>
                <p className="mt-5 text-base leading-8 text-[#4c5769]">
                  The platform is intentionally designed so creative and operational steps stay connected, reducing handoff delays and visual inconsistency.
                </p>
              </div>
              <div className="space-y-4">
                {timeline.map((item) => (
                  <div key={item.step} className="rounded-[1.25rem] border border-black/10 bg-white p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5a6577]">Step {item.step}</p>
                    <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#4c5769]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#1f2a3a] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">Start now</p>
              <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                Ready to build your next publication?
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/70">
                Sign in and move from concept to a polished, sellable format with one consistent workflow.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1f2a3a] transition hover:bg-[#f3f4f6]"
              >
                Get started
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Learn more
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
