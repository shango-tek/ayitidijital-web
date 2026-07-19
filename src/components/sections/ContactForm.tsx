'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { submitContact, type ContactOutcome } from '@/lib/contact'
import type { SiteContent } from '@/content/site'

const fieldCls =
  'w-full rounded-xl border border-black/[0.12] bg-white px-4 py-3 text-ink transition-colors placeholder:text-ink-soft/40 hover:border-black/20 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/15'
const labelCls = 'mb-2 flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft'
const optionalCls = 'font-sans text-[11px] normal-case tracking-normal text-ink-soft/55'

type Status = { kind: 'idle' | 'sending' } | { kind: 'done'; outcome: ContactOutcome } | { kind: 'error' }

/**
 * The contact form — the only interactive part of /kontak, so the only part
 * that ships to the browser. The surrounding channels panel and address block
 * render on the server.
 *
 * The form POSTs to NEXT_PUBLIC_CONTACT_ENDPOINT when configured, and otherwise
 * opens a pre-filled message in the visitor's own mail client. Those are
 * different outcomes and the confirmation says which happened — see
 * `submitContact`.
 */
export function ContactForm({
  copy: k,
  privacyHref,
  privacyLabel,
}: {
  copy: SiteContent['contactPage']
  privacyHref: string
  privacyLabel: string
}) {
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

  if (status.kind === 'done') {
    return (
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
    )
  }

  return (
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
          {privacyLabel}
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
  )
}
