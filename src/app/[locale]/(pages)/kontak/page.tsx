'use client'

import { useRef, useState } from 'react'
import { Mail, MapPin, Scale } from 'lucide-react'
import { RoutePage } from '@/components/pages/RoutePage'
import { Button } from '@/components/ui/Button'
import { useLocale } from '@/components/i18n/LocaleProvider'
import { submitContact, type ContactOutcome } from '@/lib/contact'

/**
 * "Kontak" — split panel: the channels on a sand ground, the form on white,
 * inside one rounded card so the split reads as this site's material rather
 * than a full-bleed band.
 *
 * There is no phone row. The reference layout has one; we do not have a number,
 * none has ever been supplied, and this page sits beside the statutory pages
 * where an invented one would be worst. The form still offers a phone FIELD —
 * that number belongs to the visitor, not to us.
 *
 * The submit is navy, not red: the navbar carries a red "Soutni" on every page
 * and red here is one-per-view.
 *
 * The form POSTs to NEXT_PUBLIC_CONTACT_ENDPOINT when configured, and otherwise
 * opens a pre-filled message in the visitor's own mail client. Those are
 * different outcomes and the confirmation says which happened.
 */
const EMAIL = 'contact@ayitidijital.org'
const POST = ['Ayiti Dijital', 'Ursberger Str. 15', '81673 München', 'Deutschland']

const fieldCls =
  'w-full rounded-xl border border-black/[0.12] bg-white px-4 py-3 text-ink transition-colors placeholder:text-ink-soft/40 hover:border-black/20 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/15'
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
        phone: String(data.get('phone') ?? '').trim(),
        message: String(data.get('message') ?? '').trim(),
      })
      setStatus({ kind: 'done', outcome })
    } catch {
      setStatus({ kind: 'error' })
    }
  }

  const privacyHref = `/${locale}/konfidansyalite`
  const imprintLabel =
    c.footerColumns.flatMap((col) => col.links).find((l) => l.href.includes('enfomasyon-legal'))?.label ?? 'Impressum'

  return (
    <RoutePage path="/kontak" title={k.label} subtitle={k.lead}>
      <section className="bg-white px-2 py-16 md:py-20 lg:py-[100px]">
        <div className="mx-auto max-w-[90rem]">
          <div className="grid overflow-hidden rounded-feature lg:grid-cols-[0.9fr_1.1fr]">
            {/* ── Channels ─────────────────────────────────────────────── */}
            <div className="bg-sand p-8 md:p-12 lg:p-14">
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-primary">
                {k.label}
              </h2>
              <p className="mt-4 max-w-sm leading-relaxed text-ink-soft">{k.lead}</p>

              <ul className="mt-10 flex flex-col gap-7">
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-[0_10px_30px_-18px_rgba(10,58,96,0.5)]">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft/70">
                      {k.emailLabel}
                    </p>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="mt-1 block break-all font-display font-bold text-primary underline decoration-gold-deep/40 underline-offset-4 transition-colors hover:text-gold-deep"
                    >
                      {EMAIL}
                    </a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-[0_10px_30px_-18px_rgba(10,58,96,0.5)]">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft/70">
                      {k.postLabel}
                    </p>
                    <address className="mt-1 not-italic leading-relaxed text-ink">
                      {POST.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-[0_10px_30px_-18px_rgba(10,58,96,0.5)]">
                    <Scale className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft/70">
                      {k.legalLabel}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
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
                  </div>
                </li>
              </ul>
            </div>

            {/* ── Form ─────────────────────────────────────────────────── */}
            <div className="border border-black/[0.07] bg-white p-8 md:p-12 lg:border-l-0 lg:p-14">
              {status.kind === 'done' ? (
                <div role="status" className="flex h-full flex-col justify-center">
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
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                    <label className={labelCls} htmlFor="phone">
                      {k.phoneField}
                      <span className={optionalCls}>{k.optional}</span>
                    </label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldCls} />
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="message">
                      {k.message}
                    </label>
                    <textarea id="message" name="message" required rows={6} className={`${fieldCls} resize-y`} />
                  </div>

                  <p className="text-sm leading-relaxed text-ink-soft/85">
                    {k.formNote}{' '}
                    <a
                      href={privacyHref}
                      className="font-medium text-gold-deep underline underline-offset-2 transition-colors hover:text-primary"
                    >
                      {c.newsletter.privacy.label}
                    </a>
                  </p>

                  <Button
                    variant="navy"
                    pill
                    type="submit"
                    disabled={status.kind === 'sending'}
                    className="w-full justify-center"
                  >
                    {status.kind === 'sending' ? k.sending : k.send}
                  </Button>

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
          </div>
        </div>
      </section>
    </RoutePage>
  )
}
