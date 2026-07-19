import './globals.css'
import { NotFound } from '@/components/ui/NotFound'
import { getSiteContent } from '@/content/site'
import { DEFAULT_LOCALE } from '@/i18n'

/**
 * The outermost 404 — for URLs that never reach a valid locale.
 *
 * This is the one a locale-less path lands on: `/travay-nou` matches the
 * `[locale]` segment, fails `isLocale`, and the locale layout calls notFound()
 * before rendering anything — so the boundary has to be above that layout.
 *
 * Which means this file carries its own <html>/<body>. The root layout is a
 * deliberate pass-through (the real document lives in `[locale]/layout.tsx` so
 * it can set `lang` per locale), so nothing else would provide them here, and
 * globals.css has to be imported for Tailwind to apply.
 *
 * There is no locale to read, so it speaks the default one and points home at
 * `/${DEFAULT_LOCALE}`. Every link from here lands inside a real locale, where
 * the language switcher takes over.
 */
export default function RootNotFound() {
  const c = getSiteContent(DEFAULT_LOCALE)
  const n = c.notFound

  return (
    <html lang={DEFAULT_LOCALE}>
      <body>
        <NotFound
          code={n.code}
          title={n.title}
          lead={n.lead}
          homeLabel={n.home}
          homeHref={`/${DEFAULT_LOCALE}`}
          exploreLabel={n.explore}
          exploreHref={`/${DEFAULT_LOCALE}/ekosistem`}
        />
      </body>
    </html>
  )
}
