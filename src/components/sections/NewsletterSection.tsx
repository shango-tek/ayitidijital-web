'use client'

import { useState } from 'react'
import { LanbiMark } from '../brand/LanbiMark'
import { SectionHeader } from '../ui/SectionHeader'
import { useLocale } from '../i18n/LocaleProvider'
import type { NewsletterContent } from '@/content/site'

export interface NewsletterSectionProps {
  id?: string
  content: NewsletterContent
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const inputCls =
  'w-full rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-white/45 transition-colors focus:border-gold/70 focus:bg-white/[0.06] focus:outline-none'
const labelCls = 'mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-white/45'

/**
 * Newsletter — a full-width dark navy card (same inset + 2rem-radius language as
 * the hero / spiral cards) that breaks the page's white flow. Editorial heading
 * + brand mark on the left, name/email form on the right, gold submit. The submit
 * is a mock (no backend) — wire it to a real provider (Mailchimp / Buttondown…).
 */
export function NewsletterSection({ id = 'enfolet', content }: NewsletterSectionProps) {
  const [done, setDone] = useState(false)
  const { locale } = useLocale()
  // Authored locale-less in content (`/konfidansyalite`); routes live under `/[locale]`.
  const privacyHref = content.privacy.href.startsWith('/')
    ? `/${locale}${content.privacy.href}`
    : content.privacy.href

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get('email') ?? '').trim()
    if (!email) return
    // TODO: POST to a real newsletter service.
    setDone(true)
  }

  return (
    <section id={id} aria-label="Newsletter" className="bg-white px-2 py-6 md:py-8">
      {/* Full-width dark card — inset a hair off the viewport edge, like the hero card */}
      <div className="relative overflow-hidden rounded-feature bg-gradient-to-br from-[#16297a] via-primary to-[#0a1436] py-14 md:py-16 lg:py-[4.5rem]">
        {/* brand watermark + warm glow */}
        <LanbiMark
          size={620}
          className="pointer-events-none absolute -right-28 top-1/2 hidden -translate-y-1/2 opacity-[0.06] md:block"
        />
        <span aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        {/* inner hairline — same edge detail as the hero card */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-feature shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />

        <div className="relative mx-auto grid max-w-[90rem] items-center gap-12 px-5 md:px-10 lg:grid-cols-2 lg:gap-16">
          {/* Copy — shared section header (stacked: eyebrow → title → lead, left) */}
          <div>
            <SectionHeader
              variant="stacked"
              size="md"
              onDark
              label={content.kicker}
              title={content.title}
              subtitle={content.body}
            />
            <a
              href={privacyHref}
              className="mt-4 inline-block text-sm text-white/70 underline decoration-white/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              {content.privacy.label}
            </a>
          </div>

          {/* Form */}
          <div>
            {done ? (
              <p
                role="status"
                className="flex items-center gap-3 rounded-2xl border border-gold/30 bg-gold/10 px-6 py-5 font-display text-lg font-semibold text-white"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-primary">
                  <Arrow />
                </span>
                {content.confirm}
              </p>
            ) : (
              <form onSubmit={handleSubmit} suppressHydrationWarning>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className={labelCls}>{content.firstName.label}</span>
                    <input
                      name="firstName"
                      className={inputCls}
                      suppressHydrationWarning
                      placeholder={content.firstName.placeholder}
                      autoComplete="given-name"
                    />
                  </label>
                  <label>
                    <span className={labelCls}>{content.lastName.label}</span>
                    <input
                      name="lastName"
                      className={inputCls}
                      suppressHydrationWarning
                      placeholder={content.lastName.placeholder}
                      autoComplete="family-name"
                    />
                  </label>
                </div>
                <label className="mt-4 block">
                  <span className={labelCls}>{content.email.label}</span>
                  <input
                    type="email"
                    name="email"
                    required
                    className={inputCls}
                    suppressHydrationWarning
                    placeholder={content.email.placeholder}
                    autoComplete="email"
                  />
                </label>
                <p className="mt-4 text-xs leading-relaxed text-white/55">{content.consent}</p>
                <button
                  type="submit"
                  className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-gold px-7 py-3.5 font-display text-sm font-bold text-primary transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {content.button}
                  <Arrow />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
