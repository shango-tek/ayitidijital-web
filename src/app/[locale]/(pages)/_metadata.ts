import type { Metadata } from 'next'
import { getSiteContent } from '@/content/site'
import { LOCALES, toLocale } from '@/i18n'

/**
 * Per-page metadata for the nav sub-routes.
 *
 * Until these pages became server components they could not export
 * `generateMetadata` at all, so all twelve routes in a locale shipped the same
 * `<title>` — every sub-page was a duplicate to a crawler. The title is taken
 * from the same navbar entry {@link RoutePage} uses for the visible heading, so
 * the tab and the page agree without a second copy of the string.
 *
 * `languages` is per-path, not per-locale-root: /fr/ekip must point at /en/ekip,
 * not at /en.
 */
export function routeMetadata(path: string, locale: string, fallbackTitle?: string): Metadata {
  const lang = toLocale(locale)
  const c = getSiteContent(lang)

  const entry =
    c.navLinks.find((l) => l.href === path) ??
    c.navLinks.flatMap((l) => l.children ?? []).find((child) => child.href === path)
  const name = fallbackTitle ?? entry?.label ?? path.replace('/', '')
  const title = `${name} — ${c.brandName}`
  const description = c.heroDescription?.short ?? c.metaDescription

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}${path}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}${path}`])),
    },
    openGraph: {
      type: 'article',
      siteName: c.brandName,
      locale: lang,
      alternateLocale: LOCALES.filter((l) => l !== lang),
      title,
      description,
      url: `/${lang}${path}`,
    },
  }
}
