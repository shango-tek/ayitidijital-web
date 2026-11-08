'use client'

import { useRef, useState } from 'react'
import { submitContact, type ContactOutcome } from '@/lib/contact'
import type { SiteContent } from '@/content/site'

const fieldCls =
  'w-full border-2 border-tum-ink bg-tum-paper px-4 py-3 font-tum text-tum-ink transition-colors placeholder:text-tum-muted/85 focus:border-electric focus:outline-none'
const labelCls = 'mb-2 flex items-baseline gap-2 font-tum text-[11px] font-bold uppercase tracking-[0.16em] text-tum-ink'
const optionalCls = 'font-tum text-[11px] font-medium normal-case tracking-normal text-tum-muted/60'

type Status = { kind: 'idle' | 'sending' } | { kind: 'done'; outcome: ContactOutcome } | { kind: 'error' }

/**
 * The contact form — the only interactive part of /kontak. UnternehmerTUM
 * register: sharp-cornered fields with an electric focus, Albert Sans, an
 * electric submit. Submit logic, field names and outcomes are unchanged.
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
        <p className="font-tum text-2xl font-extrabold leading-snug text-tum-ink">
          {status.outcome === 'sent' ? k.sent : k.handoff}
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => {
              setStatus({ kind: 'idle' })
              formRef.current?.reset()
            }}
            className="inline-flex items-center gap-2.5 border-2 border-tum-ink px-6 py-3 font-tum text-sm font-bold uppercase tracking-wide text-tum-ink transition-colors duration-200 hover:bg-tum-ink hover:text-white"
          >
            {k.again}
          </button>
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

      <p className="font-tum text-sm leading-relaxed text-tum-muted/85">
        {k.formNote}{' '}
        <a
          href={privacyHref}
          className="font-semibold text-electric underline underline-offset-2 transition-colors hover:text-electric-bright"
        >
          {privacyLabel}
        </a>
      </p>

      <button
        type="submit"
        disabled={status.kind === 'sending'}
        className="inline-flex w-full items-center justify-center gap-2.5 bg-electric px-7 py-4 font-tum text-sm font-bold uppercase tracking-wide text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-electric-bright disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status.kind === 'sending' ? k.sending : k.send}
      </button>

      <p aria-live="polite" className="sr-only">
        {status.kind === 'sending' ? k.sending : ''}
      </p>
      {status.kind === 'error' && (
        <p role="alert" className="border-2 border-drapo-red/40 bg-drapo-red/[0.06] px-4 py-3 font-tum text-sm leading-relaxed text-tum-ink">
          {k.error}
        </p>
      )}
    </form>
  )
}
