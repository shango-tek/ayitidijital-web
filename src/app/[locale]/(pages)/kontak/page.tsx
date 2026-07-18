'use client'

import { useRef, useState } from 'react'
import { RoutePage } from '@/components/pages/RoutePage'
import { Button } from '@/components/ui/Button'
import { useLocale } from '@/components/i18n/LocaleProvider'
import { submitContact, type ContactOutcome } from '@/lib/contact'

/**
 * "Kontak" — the page the FAQ has been promising in all three languages while
 * the footer only ever offered a mailto:.
 *
 * Design notes, because two of them are rules rather than taste:
 *
 *  - The submit is NAVY, not red. The navbar carries a red "Soutni" button on
 *    every page, and red on this site is one-per-view — two of them and neither
 *    reads as the primary action. Navy is the standard-action variant.
 *  - The channels are one sand panel with hairline rows, not three stacked
 *    cards. Three shadowed boxes competed with the form for attention; the form
 *    is what the page is for.
 *
 * The form is real: it POSTs to NEXT_PUBLIC_CONTACT_ENDPOINT when one is
 * configured, and otherwise opens a pre-filled message in the visitor's own
 * mail client. Those are different outcomes and the confirmation says which
 * happened — "we have your message" would be false after a handoff, and the
 * visitor would only find out when nobody replied.
 */
const EMAIL = 'contact@ayitidijital.org'
const POST = ['Ayiti Dijital', 'Ursberger Str. 15', '81673 München', 'Deutschland']

const fieldCls =
  'w-full rounded-xl border border-black/[0.12] bg-white px-4 py-3 text-ink transition-colors placeholder:text-ink-soft/45 hover:border-black/20 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/15'
const labelCls = 'mb-2 flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft'
const optionalCls = 'font-sans text-[11px] normal-case tracking-normal text-ink-soft/55'

type Status = { kind: 'idle' | 'sending' } | { kind: 'done'; outcome: ContactOutcome } | { kind: 'error' }

export default function KontakPage() {
  const { content: c, locale } = useLocale()
  const k = c.contactPage
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setStatus({ kind: 'sending' })
    try {
      const outcome = await submitContact({
        firstName: String(data.get('firstName') ?? '').trim(),
        lastName: String(data.get('lastName') ?? '').trim(),
        email: String(data.get('email') ?? '').trim(),
        message: String(data.get('message') ?? '').trim(),
      })
      setStatus({ kind: 'done', outcome })
    } catch {
      // Keep the values so the message is not lost — the error tells them the
      // address to use instead, and they can copy their text out of the field.
      setStatus({ kind: 'error' })
    }
  }

  const done = status.kind === 'done'
  const privacyHref = `/${locale}/konfidansyalite`
  const imprintLabel =
    c.footerColumns.flatMap((col) => col.links).find((l) => l.href.includes('enfomasyon-legal'))?.label ?? 'Impressum'

  return (
    // /kontak is reached from the footer rather than the nav, so RoutePage has
    // no entry to take a heading from — pass it explicitly.
    <RoutePage path="/kontak" title={k.label} subtitle={k.lead}>
      <section className="bg-white py-16 md:py-20 lg:py-[100px]">
        <div className="mx-auto max-w-[90rem] px-5 md:px-10">
          <div className="grid gap-4 lg:grid-cols-[1.45fr_1fr] lg:items-start">
            {/* ── The form: the reason the page exists, so it leads ─────── */}
            <div className="rounded-card border border-black/[0.08] bg-white p-8 shadow-[0_20px_60px_-40px_rgba(10,58,96,0.35)] md:p-10">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-deep">
                {k.formLabel}
              </h2>

              {done ? (
                /* The form is replaced rather than left standing — a filled-in
                   form under a confirmation invites an accidental duplicate. */
                /* role=status so this is announced when it replaces the form —
                   the live region that was inside the form goes away with it. */
                <div className="mt-6" role="status">
                  <p className="font-display text-xl font-bold leading-snug text-primary">
                    {status.outcome === 'sent' ? k.sent : k.handoff}
                  </p>
                  <div className="mt-6">
                    <Button
                      variant="gold-outline"
                      pill
                      type="button"
                      onClick={() => {
                        setStatus({ kind: 'idle' })
                        formRef.current?.reset()
                      }}
                    >
                      {k.again}
                    </Button>
                  </div>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate={false} className="mt-6 flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls} htmlFor="firstName">
                        {k.firstName}
                        <span className={optionalCls}>{k.optional}</span>
                      </label>
                      <input id="firstName" name="firstName" type="text" autoComplete="given-name" className={fieldCls} />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="lastName">
                        {k.lastName}
                        <span className={optionalCls}>{k.optional}</span>
                      </label>
                      <input id="lastName" name="lastName" type="text" autoComplete="family-name" className={fieldCls} />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="email">
                      {k.emailField}
                    </label>
                    <input id="email" name="email" type="email" required autoComplete="email" className={fieldCls} />
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="message">
                      {k.message}
                    </label>
                    <textarea id="message" name="message" required rows={7} className={`${fieldCls} resize-y`} />
                  </div>

                  {/* What pressing the button will actually do, said before it is
                      pressed rather than explained afterwards. */}
                  <p className="text-sm leading-relaxed text-ink-soft/85">
                    {k.formNote}{' '}
                    <a
                      href={privacyHref}
                      className="font-medium text-gold-deep underline underline-offset-2 transition-colors hover:text-primary"
                    >
                      {c.newsletter.privacy.label}
                    </a>
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <Button variant="navy" pill type="submit" arrow disabled={status.kind === 'sending'}>
                      {status.kind === 'sending' ? k.sending : k.send}
                    </Button>
                  </div>

                  {/* Announced, not just displayed. */}
                  <p aria-live="polite" className="sr-only">
                    {status.kind === 'sending' ? k.sending : ''}
                  </p>
                  {status.kind === 'error' && (
                    <p role="alert" className="rounded-xl border border-accent/30 bg-accent/[0.06] px-4 py-3 text-sm leading-relaxed text-ink">
                      {k.error}
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* ── Other ways through: one panel, hairline rows ──────────── */}
            <aside className="rounded-card bg-sand p-8 md:p-10">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-deep">
                {k.emailLabel}
              </h2>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-2 inline-block break-all font-display text-lg font-bold text-primary underline decoration-gold-deep/40 underline-offset-4 transition-colors hover:text-gold-deep"
              >
                {EMAIL}
              </a>

              <hr className="my-7 border-black/[0.09]" />

              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-deep">
                {k.postLabel}
              </h2>
              <address className="mt-2 not-italic leading-relaxed text-ink-soft">
                {POST.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              <hr className="my-7 border-black/[0.09]" />

              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-deep">
                {k.legalLabel}
              </h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{k.legalBody}</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                <a
                  href={`/${locale}/enfomasyon-legal`}
                  className="font-display text-sm font-bold text-primary underline decoration-gold-deep/40 underline-offset-4 transition-colors hover:text-gold-deep"
                >
                  {imprintLabel}
                </a>
                <a
                  href={privacyHref}
                  className="font-display text-sm font-bold text-primary underline decoration-gold-deep/40 underline-offset-4 transition-colors hover:text-gold-deep"
                >
                  {c.newsletter.privacy.label}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </RoutePage>
  )
}
