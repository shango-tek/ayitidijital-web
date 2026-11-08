'use client'

import { useEffect, useState } from 'react'
import type { Locale } from '@/i18n'

/**
 * Functional language cookie + a one-time cookie notice.
 *
 * `ad-lang` is a strictly-necessary (functional) cookie: it remembers the locale
 * the visitor is reading so the root `/` redirect can honour their choice on the
 * next visit. Strictly-necessary cookies are exempt from prior consent (§ 25(2)
 * TDDDG / ePrivacy), so this is an *informational* notice, not a consent gate —
 * the audience-measurement consent banner is separate (see CookieBanner).
 *
 * The notice is dismissed once and remembered locally; no tracking, no ads.
 */

const ACK_KEY = 'ad-cookie-ack'

const COPY: Record<Locale, { label: string; body: string; more: string; ok: string }> = {
  fr: {
    label: 'Information sur les cookies',
    body: 'Ce site dépose un petit cookie pour mémoriser votre langue et masquer cet avis. Aucun traçage, aucune publicité.',
    more: 'En savoir plus',
    ok: 'J’ai compris',
  },
  en: {
    label: 'Cookie notice',
    body: 'This site stores a small cookie to remember your language and to hide this notice. No tracking, no ads.',
    more: 'Learn more',
    ok: 'Got it',
  },
  ht: {
    label: 'Enfòmasyon sou cookies',
    body: 'Sit sa a kenbe yon ti cookie pou sonje lang ou epi kache avi sa a. Pa gen swivi, pa gen piblisite.',
    more: 'Aprann plis',
    ok: 'Mwen konprann',
  },
}

export function CookieNotice({ locale }: { locale: Locale }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Remember the current locale for the root redirect (functional cookie).
    try {
      document.cookie = `ad-lang=${locale}; path=/; max-age=31536000; samesite=lax`
    } catch {
      /* cookies blocked — the redirect simply falls back to geo/browser */
    }
    // Show the notice once, until acknowledged.
    try {
      if (!localStorage.getItem(ACK_KEY)) setShow(true)
    } catch {
      /* storage blocked (private mode) — skip the notice rather than loop it */
    }
  }, [locale])

  if (!show) return null
  const c = COPY[locale]

  const dismiss = () => {
    try {
      localStorage.setItem(ACK_KEY, '1')
    } catch {
      /* ignore */
    }
    setShow(false)
  }

  return (
    <div
      role="note"
      aria-label={c.label}
      className="fixed inset-x-2 bottom-2 z-[55] md:inset-x-auto md:bottom-5 md:left-5 md:max-w-sm"
    >
      <div className="rounded-none border border-black/[0.08] bg-white p-5 shadow-[0_30px_80px_-40px_rgba(10,58,96,0.5)]">
        <p className="font-tum text-sm leading-relaxed text-tum-muted">{c.body}</p>
        <div className="mt-4 flex items-center gap-4">
          <a
            href={`/${locale}/konfidansyalite`}
            className="font-tum text-sm font-medium text-electric underline underline-offset-2 transition-colors hover:text-tum-ink"
          >
            {c.more}
          </a>
          <button
            type="button"
            onClick={dismiss}
            className="ml-auto inline-flex items-center justify-center rounded-none bg-tum-ink px-5 py-2.5 font-tum text-sm font-bold text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            {c.ok}
          </button>
        </div>
      </div>
    </div>
  )
}
