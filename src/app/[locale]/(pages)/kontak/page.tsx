'use client'

import { useState } from 'react'
import { RoutePage } from '@/components/pages/RoutePage'
import { useLocale } from '@/components/i18n/LocaleProvider'
import { submitContact } from '@/lib/contact'

/**
 * "Kontak" — the page the FAQ has been promising in all three languages
 * ("écrivez-nous via la page Contact") while the footer only ever offered a
 * mailto:.
 *
 * The form is real. With no endpoint configured it opens a pre-filled message
 * in the visitor's own mail client, which is not a degraded mode: nothing
 * reaches our servers, so there is nothing to collect or disclose. Wire
 * NEXT_PUBLIC_CONTACT_ENDPOINT and it POSTs instead — at which point the
 * privacy policy's "Formulaires" section has to be updated in the same change,
 * because then the site really is collecting.
 *
 * The address stays listed next to it: some people would rather use their own
 * mail client directly, and a form is not a reason to hide the address.
 *
 * No phone number — none has ever been supplied, and inventing one on a page
 * that sits beside the statutory pages is not an option.
 */
const EMAIL = 'contact@ayitidijital.org'
const POST = ['Ayiti Dijital', 'Ursberger Str. 15', '81673 München', 'Deutschland']

const field =
  'w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink transition-colors placeholder:text-ink-soft/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/15'
const label = 'mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft'

export default function KontakPage() {
  const { content: c, locale } = useLocale()
  const k = c.contactPage
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setState('sending')
    try {
      await submitContact({
        firstName: String(data.get('firstName') ?? '').trim(),
        lastName: String(data.get('lastName') ?? '').trim(),
        email: String(data.get('email') ?? '').trim(),
        message: String(data.get('message') ?? '').trim(),
      })
      setState('sent')
    } catch {
      setState('idle') // leave the form up with its values so it can be retried
    }
  }

  return (
    <RoutePage path="/kontak" subtitle={k.lead}>
      <section className="bg-white py-16 md:py-20 lg:py-[100px]">
        <div className="mx-auto max-w-[90rem] px-5 md:px-10">
          <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr] lg:items-start">
            {/* ── The form ─────────────────────────────────────────────── */}
            <div className="rounded-card border border-black/[0.08] bg-white p-8 shadow-[0_20px_60px_-40px_rgba(10,58,96,0.35)] md:p-10">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-deep">
                {k.formLabel}
              </h2>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={label} htmlFor="firstName">
                      {k.firstName}{' '}
                      <span className="normal-case tracking-normal text-ink-soft/60">
                        ({k.optional})
                      </span>
                    </label>
                    <input id="firstName" name="firstName" type="text" autoComplete="given-name" className={field} />
                  </div>
                  <div>
                    <label className={label} htmlFor="lastName">
                      {k.lastName}{' '}
                      <span className="normal-case tracking-normal text-ink-soft/60">
                        ({k.optional})
                      </span>
                    </label>
                    <input id="lastName" name="lastName" type="text" autoComplete="family-name" className={field} />
                  </div>
                </div>

                <div>
                  <label className={label} htmlFor="email">
                    {k.emailField}
                  </label>
                  <input id="email" name="email" type="email" required autoComplete="email" className={field} />
                </div>

                <div>
                  <label className={label} htmlFor="message">
                    {k.message}
                  </label>
                  <textarea id="message" name="message" required rows={6} className={`${field} resize-y`} />
                </div>

                <p className="text-sm leading-relaxed text-ink-soft/85">
                  {k.formNote}{' '}
                  <a
                    href={`/${locale}/konfidansyalite`}
                    className="font-medium text-gold-deep underline underline-offset-2 transition-colors hover:text-primary"
                  >
                    {c.newsletter.privacy.label}
                  </a>
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={state !== 'idle'}
                    className="btn btn-red rounded-full px-7 py-3 font-display text-[15px] font-bold disabled:opacity-70"
                  >
                    {state === 'sending' ? k.sending : state === 'sent' ? k.sent : k.send}
                  </button>
                  {state === 'sent' && (
                    <span role="status" className="text-sm font-medium text-ink-soft">
                      {k.sent}
                    </span>
                  )}
                </div>
              </form>
            </div>

            {/* ── The channels, kept visible next to the form ──────────── */}
            <div className="flex flex-col gap-4">
              <article className="rounded-card bg-primary p-8">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
                  {k.emailLabel}
                </h2>
                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-3 inline-block font-display text-[clamp(1.15rem,2.2vw,1.5rem)] font-extrabold leading-tight tracking-tight text-white underline decoration-gold/40 underline-offset-[6px] transition-colors hover:decoration-gold"
                >
                  {EMAIL}
                </a>
              </article>

              <article className="rounded-card border border-black/[0.08] bg-white p-8 shadow-[0_20px_60px_-40px_rgba(10,58,96,0.35)]">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-deep">
                  {k.postLabel}
                </h2>
                <address className="mt-3 not-italic leading-relaxed text-ink-soft">
                  {POST.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </article>

              <article className="rounded-card bg-sand p-8">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-deep">
                  {k.legalLabel}
                </h2>
                <p className="mt-3 leading-relaxed text-ink-soft">{k.legalBody}</p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  <a
                    href={`/${locale}/enfomasyon-legal`}
                    className="font-display text-sm font-bold text-primary underline decoration-gold-deep/40 underline-offset-4 transition-colors hover:text-gold-deep"
                  >
                    {c.footerColumns
                      .flatMap((col) => col.links)
                      .find((l) => l.href.includes('enfomasyon-legal'))?.label ?? 'Impressum'}
                  </a>
                  <a
                    href={`/${locale}/konfidansyalite`}
                    className="font-display text-sm font-bold text-primary underline decoration-gold-deep/40 underline-offset-4 transition-colors hover:text-gold-deep"
                  >
                    {c.newsletter.privacy.label}
                  </a>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </RoutePage>
  )
}
