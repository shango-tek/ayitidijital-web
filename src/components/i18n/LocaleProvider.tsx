'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { getSiteContent, type SiteContent } from '@/content/site'
import { isLocale, localeFromPathname, switchLocalePath, type Locale } from '@/i18n'

interface LocaleContextValue {
  locale: Locale
  content: SiteContent
  setLocale: (next: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

/**
 * Client-side locale state. Switching language swaps the text in place (React
 * re-render) — no route navigation, no RSC reload, no focus reset. The URL and
 * `<html lang>` are synced in an effect (after commit, never during render, so
 * Next's Router isn't updated mid-render), keeping the choice shareable while
 * Next never re-fetches the page.
 *
 * The `[locale]` routes still exist for SEO + correct server render on first
 * load; `initialLocale` seeds this provider from that route.
 */
export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale
  children: ReactNode
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const content = useMemo(() => getSiteContent(locale), [locale])

  // Reflect the chosen language into the URL + <html lang>, after render.
  // Skipped on first mount and after popstate (URL already matches).
  useEffect(() => {
    if (localeFromPathname(window.location.pathname) === locale) return
    window.history.pushState(null, '', switchLocalePath(window.location.pathname, locale))
    document.documentElement.lang = locale
  }, [locale])

  // Browser back/forward → follow the URL.
  useEffect(() => {
    const onPop = () => {
      const fromUrl = localeFromPathname(window.location.pathname)
      if (isLocale(fromUrl)) setLocale(fromUrl)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, content, setLocale }),
    [locale, content],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>')
  return ctx
}

/** Convenience: the current locale's site content. */
export function useContent(): SiteContent {
  return useLocale().content
}
