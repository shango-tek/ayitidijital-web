'use client'

import { useEffect, useState } from 'react'
import { Cookie, ChevronDown } from 'lucide-react'
import type { getLegalContent } from '@/content/legal'
import { ANALYTICS_ENABLED, readConsent, writeConsent } from '@/lib/analytics'
import type { Locale } from '@/i18n'

type CookieConsentCopy = ReturnType<typeof getLegalContent>['cookieConsent']

/**
 * Cookie consent — a first-visit corner card plus an honest preferences panel.
 *
 * What it actually does on this site today:
 *  - Sets `ad-lang` (functional): remembers the locale the visitor is reading so
 *    the root `/` redirect can honour their choice next time. Strictly necessary,
 *    exempt from prior consent (§ 25(2) TDDDG / ePrivacy) — hence an *informational*
 *    card, not a blocking consent gate.
 *  - Lists the real strictly-necessary cookies/storage keys (ad-lang,
 *    ad-cookie-ack, ad-consent) so the panel matches the privacy policy exactly.
 *  - Offers an Analytics toggle wired to the shared consent seam
 *    (readConsent/writeConsent → `ad-consent-change`). It is DORMANT: no analytics
 *    provider is configured (ANALYTICS_ENABLED === false), so the toggle only
 *    records a preference for the day one is added. The card says so plainly.
 *
 * The opt-in *gate* for a tracker that writes to the device lives separately in
 * CookieBanner (surfaces only when CONSENT_REQUIRED); the two are reconciled when
 * a provider is actually turned on.
 */

const ACK_KEY = 'ad-cookie-ack'

export function CookieConsent({ locale, copy: c }: { locale: Locale; copy: CookieConsentCopy }) {
  const [show, setShow] = useState(false)
  const [prefsOpen, setPrefsOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    // Remember the current locale for the root redirect (functional cookie).
    try {
      document.cookie = `ad-lang=${locale}; path=/; max-age=31536000; samesite=lax`
    } catch {
      /* cookies blocked — the redirect simply falls back to geo/browser */
    }
    // Reflect any earlier analytics choice in the toggle.
    setAnalytics(readConsent() === 'granted')
    // Show the card once, until acknowledged.
    try {
      if (!localStorage.getItem(ACK_KEY)) setShow(true)
    } catch {
      /* storage blocked (private mode) — skip the card rather than loop it */
    }
  }, [locale])

  if (!show) return null

  const dismiss = () => {
    try {
      localStorage.setItem(ACK_KEY, '1')
    } catch {
      /* ignore */
    }
    setShow(false)
  }

  const toggleAnalytics = () => {
    const next = !analytics
    setAnalytics(next)
    // Persisted now; a provider added later honours it via `ad-consent-change`.
    writeConsent(next ? 'granted' : 'denied')
  }

  return (
    <div
      role="region"
      aria-label={c.panelTitle}
      className="fixed inset-x-2 bottom-2 z-[55] md:inset-x-auto md:bottom-5 md:left-5 md:w-[26rem] md:max-w-[calc(100vw-2.5rem)]"
    >
      <div className="rounded-none border border-black/[0.08] bg-white shadow-[0_30px_80px_-40px_rgba(10,58,96,0.5)]">
        {/* Header / message */}
        <div className="flex items-start gap-3.5 p-5">
          <span
            aria-hidden="true"
            className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-none bg-electric/10 text-electric ring-1 ring-electric/20"
          >
            <Cookie className="size-5" strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <p className="font-display text-base font-bold text-tum-ink">{c.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-tum-muted">{c.body}</p>
          </div>
        </div>

        {/* Preferences panel */}
        {prefsOpen && (
          <div className="border-t border-black/[0.06] px-5 py-4">
            {/* Strictly necessary — always on, expandable to the real inventory */}
            <div className="border border-black/[0.08]">
              <button
                type="button"
                onClick={() => setDetailOpen((v) => !v)}
                aria-expanded={detailOpen}
                className="flex w-full items-center gap-2 px-3.5 py-3 text-left"
              >
                <ChevronDown
                  className={`size-4 shrink-0 text-tum-muted transition-transform duration-200 motion-reduce:transition-none ${
                    detailOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
                <span className="font-display text-sm font-bold text-tum-ink">{c.necessaryTitle}</span>
                <span className="ml-auto text-xs font-semibold uppercase tracking-wide text-tum-muted">
                  {c.necessaryStatus}
                </span>
              </button>
              {detailOpen && (
                <dl className="space-y-3 border-t border-black/[0.06] px-3.5 py-3">
                  {c.cookies.map((cookie) => (
                    <div key={cookie.name}>
                      <dt className="font-mono text-xs font-semibold text-tum-ink">{cookie.name}</dt>
                      <dd className="mt-0.5 text-xs leading-relaxed text-tum-muted">
                        {cookie.purpose}{' '}
                        <span className="text-tum-muted/80">
                          ({c.lifetimeLabel}: {cookie.lifetime})
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            {/* Analytics — a real toggle, dormant until a provider is wired */}
            <div className="mt-2.5 border border-black/[0.08] px-3.5 py-3">
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-bold text-tum-ink">{c.analyticsTitle}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={analytics}
                  aria-label={c.analyticsTitle}
                  onClick={toggleAnalytics}
                  className={`ml-auto inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 motion-reduce:transition-none ${
                    analytics ? 'bg-electric' : 'bg-tum-ink/20'
                  }`}
                >
                  <span
                    className={`size-5 rounded-full bg-white shadow-sm transition-transform duration-200 motion-reduce:transition-none ${
                      analytics ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-tum-muted">{c.analyticsBody}</p>
              {!ANALYTICS_ENABLED && (
                <p className="mt-1 text-xs font-medium leading-relaxed text-electric">{c.analyticsDormant}</p>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 border-t border-black/[0.06] px-5 py-4">
          <a
            href={`/${locale}/konfidansyalite`}
            className="text-sm font-medium text-electric underline underline-offset-2 transition-colors hover:text-tum-ink"
          >
            {c.policyLabel}
          </a>
          <button
            type="button"
            onClick={() => setPrefsOpen((v) => !v)}
            aria-expanded={prefsOpen}
            className="ml-auto inline-flex items-center justify-center rounded-none border-2 border-tum-ink/25 px-4 py-2.5 font-display text-sm font-bold text-tum-ink transition-colors duration-200 hover:border-tum-ink/60 hover:bg-tum-ink/[0.04]"
          >
            {c.prefs}
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="inline-flex items-center justify-center rounded-none bg-electric px-5 py-2.5 font-display text-sm font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
          >
            {prefsOpen ? c.save : c.ok}
          </button>
        </div>
      </div>
    </div>
  )
}
