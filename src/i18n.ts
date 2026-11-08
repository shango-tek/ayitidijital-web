/**
 * Central i18n config.
 *
 * Locale ids are BCP-47 tags used directly in the URL (`/ht`, `/fr`, `/en`)
 * and on `<html lang>`. Note the Kreyòl locale id is `'ht'` — the display
 * label stays "HT" (see `langs` in content/site).
 */
export const LOCALES = ['ht', 'fr', 'en'] as const

export type Locale = (typeof LOCALES)[number]

/**
 * The locale `/` redirects to, and the fallback for an unrecognised segment.
 * French — it is the widest-reach language for the site's audience, and it is
 * what ayitidijital.org served before the Next.js rebuild.
 */
export const DEFAULT_LOCALE: Locale = 'fr'

/** Type guard: is `value` one of the supported locales? */
export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value)
}

/**
 * Coerce an arbitrary path segment to a Locale, falling back to the default.
 * Used by the language switcher to read the active locale off the URL.
 */
export function toLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE
}

/** The active locale for a pathname, e.g. `/fr/foo` → `'fr'`. */
export function localeFromPathname(pathname: string): Locale {
  const first = pathname.split('/').filter(Boolean)[0]
  return toLocale(first)
}

/**
 * Rewrites `pathname` to point at `target` locale by swapping the leading
 * locale segment. `/fr/pwoje` + `en` → `/en/pwoje`; `/` + `en` → `/en`.
 */
export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split('/').filter(Boolean)
  if (isLocale(segments[0])) {
    segments[0] = target
  } else {
    segments.unshift(target)
  }
  return '/' + segments.join('/')
}
