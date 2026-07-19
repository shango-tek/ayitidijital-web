'use client'

import { useEffect, useState } from 'react'
import type { getLegalContent } from '@/content/legal'
import { CONSENT_REQUIRED, readConsent, writeConsent } from '@/lib/analytics'
import type { Locale } from '@/i18n'

type ConsentCopy = ReturnType<typeof getLegalContent>['consent']

/**
 * Consent banner. Appears ONLY in cookie mode (see src/lib/analytics.ts) and
 * only until the visitor has chosen — in the default cookieless setup nothing
 * is stored on the device, so there is nothing to consent to and no banner.
 *
 * Deliberately not the usual pattern:
 *
 *  - "Reject" sits beside "Accept" with the SAME visual weight, on the first
 *    layer. An accept-only banner (or a greyed-out reject) is a deceptive
 *    design under EDPB Guidelines 03/2022 and German DSK guidance, and consent
 *    collected that way is not valid.
 *  - There is no dismiss "×". Closing a banner must not be readable as consent,
 *    and a close affordance that silently means "no" only confuses; two plain
 *    choices are clearer and safer.
 *
 * The banner is provider-agnostic: it records the choice and announces it via
 * `ad-consent-change`. Whichever tracker we add listens for that and must stay
 * inert until the choice is 'granted' — loading it first and asking after is
 * not consent.
 */
export function CookieBanner({ locale, copy: c }: { locale: Locale; copy: ConsentCopy }) {
  const [decided, setDecided] = useState(true) // assume decided → render nothing until checked

  useEffect(() => {
    if (!CONSENT_REQUIRED) return
    setDecided(readConsent() !== null)
  }, [])

  if (!CONSENT_REQUIRED || decided) return null

  const choose = (choice: 'granted' | 'denied') => {
    writeConsent(choice) // persists + emits `ad-consent-change` for the tracker
    setDecided(true)
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={c.title}
      className="fixed inset-x-2 bottom-2 z-[60] md:inset-x-auto md:bottom-5 md:left-5 md:max-w-lg"
    >
      <div className="rounded-card border border-black/[0.08] bg-white p-6 shadow-[0_30px_80px_-40px_rgba(10,58,96,0.5)] md:p-7">
        <p className="font-display text-lg font-bold text-primary">{c.title}</p>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{c.body}</p>

        <a
          href={`/${locale}/konfidansyalite`}
          className="mt-3 inline-block text-sm font-medium text-gold-deep underline underline-offset-2 transition-colors hover:text-primary"
        >
          {c.policyLabel}
        </a>

        {/* Equal weight, both real choices. */}
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => choose('granted')}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-gold px-6 py-3 font-display text-sm font-bold text-primary transition-transform duration-200 hover:-translate-y-0.5"
          >
            {c.accept}
          </button>
          <button
            type="button"
            onClick={() => choose('denied')}
            className="inline-flex flex-1 items-center justify-center rounded-full border-2 border-primary/25 px-6 py-3 font-display text-sm font-bold text-primary transition-colors duration-200 hover:border-primary/60 hover:bg-primary/[0.04]"
          >
            {c.reject}
          </button>
        </div>
      </div>
    </div>
  )
}
