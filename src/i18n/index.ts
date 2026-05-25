import fr from './fr.json';
import ht from './ht.json';
import en from './en.json';

export type Locale = 'fr' | 'ht' | 'en';
export const DEFAULT_LOCALE: Locale = 'fr';
export const LOCALES: Locale[] = ['fr', 'ht', 'en'];

const dictionaries = { fr, ht, en } as const;
export type Dict = typeof fr;

/**
 * Get the translation dictionary for a locale.
 * Falls back to French if the requested locale dictionary is missing.
 */
export function getDict(locale: Locale | string | undefined): Dict {
  const key = (locale ?? DEFAULT_LOCALE) as Locale;
  return (dictionaries[key] ?? dictionaries[DEFAULT_LOCALE]) as Dict;
}

/**
 * Extract the locale from the current URL pathname.
 * Returns the default locale when no prefix is present.
 */
export function getLocaleFromUrl(url: URL): Locale {
  const segments = url.pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (first && (LOCALES as string[]).includes(first)) {
    return first as Locale;
  }
  return DEFAULT_LOCALE;
}

/**
 * Per-locale route map. Keys are language-agnostic route IDs.
 * Values are the URL path (without leading slash for non-default locales,
 * with leading slash for the default locale because URLs are unprefixed).
 */
type RouteId =
  | 'home'
  | 'projects'
  | 'lexhaiti'
  | 'about'
  | 'transparency'
  | 'support'
  | 'membership'
  | 'contact'
  | 'imprint'
  | 'privacy';

const ROUTE_MAP: Record<Locale, Record<RouteId, string>> = {
  fr: {
    home: '/',
    projects: '/projets',
    lexhaiti: '/projets/lexhaiti',
    about: '/qui-sommes-nous',
    transparency: '/transparence',
    support: '/soutenir',
    membership: '/devenir-membre',
    contact: '/contact',
    imprint: '/mentions-legales',
    privacy: '/confidentialite',
  },
  ht: {
    home: '/ht/',
    projects: '/ht/pwoje',
    lexhaiti: '/ht/pwoje/lexhaiti',
    about: '/ht/kiyes-nou-ye',
    transparency: '/ht/transparans',
    support: '/ht/soutni',
    membership: '/ht/vin-manm',
    contact: '/ht/kontak',
    imprint: '/ht/enfomasyon-legal',
    privacy: '/ht/konfidansyalite',
  },
  en: {
    home: '/en/',
    projects: '/en/projects',
    lexhaiti: '/en/projects/lexhaiti',
    about: '/en/about',
    transparency: '/en/transparency',
    support: '/en/support',
    membership: '/en/become-member',
    contact: '/en/contact',
    imprint: '/en/imprint',
    privacy: '/en/privacy',
  },
};

/**
 * Build a URL for a given route in a given locale.
 */
export function localizedPath(locale: Locale, route: RouteId): string {
  return ROUTE_MAP[locale]?.[route] ?? ROUTE_MAP[DEFAULT_LOCALE][route];
}

/**
 * Map the current pathname to the equivalent URL in another locale.
 * Used by the language switcher to keep the user on the same logical page.
 */
export function alternatePath(currentUrl: URL, targetLocale: Locale): string {
  const currentLocale = getLocaleFromUrl(currentUrl);
  const currentPath = currentUrl.pathname.replace(/\/$/, '') || '/';

  // Find the route ID by matching the current pathname.
  const currentMap = ROUTE_MAP[currentLocale];
  let matchedRoute: RouteId | undefined;
  for (const [route, path] of Object.entries(currentMap) as [RouteId, string][]) {
    const normalized = path.replace(/\/$/, '') || '/';
    if (normalized === currentPath) {
      matchedRoute = route;
      break;
    }
  }

  if (matchedRoute) {
    return localizedPath(targetLocale, matchedRoute);
  }

  // Unknown route → send to the locale's home.
  return localizedPath(targetLocale, 'home');
}

export const ROUTES = ROUTE_MAP;
