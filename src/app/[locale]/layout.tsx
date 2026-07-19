import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { Bricolage_Grotesque, Hanken_Grotesk, IBM_Plex_Mono, Caveat, Playfair_Display } from 'next/font/google'
import '../globals.css'
import { LOCALES, isLocale, type Locale } from '../../i18n'
import { getSiteContent } from '@/content/site'
import { getLegalContent } from '@/content/legal'
import { Preloader } from '../../components/layout/Preloader'
import { CookieBanner } from '../../components/ui/CookieBanner'

/* Google fonts the design CSS expects, exposed as CSS variables that
   src/styles/*.css re-map onto --font-display / --font-body / --font-mono. */
/* Display face. Bricolage Grotesque — a contemporary humanist grotesque with
   real character (slightly condensed, quirky terminals), so headings read as
   deliberately set rather than defaulting to the ubiquitous Space Grotesk. */
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hanken',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

/* Handwritten accents in the Konbit footer (column titles, "Rete an kontak !"). */
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-caveat',
  display: 'swap',
})

/* Serif italic accent for the hero title (a real webfont — replaces the fragile
   system `serif` fallback so it renders identically on every device). */
const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['500', '600'],
  variable: '--font-playfair',
  display: 'swap',
})

/* Absolute base for canonical/hreflang/OG URLs. Vercel exposes the deployment
   host but not the production domain, so the canonical origin is explicit. */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ayitidijital.org'

/** Statically render all three locales at build time. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: '#0E1B4D',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const lang: Locale = isLocale(locale) ? locale : 'ht'
  const content = getSiteContent(lang)
  return {
    metadataBase: new URL(SITE_URL),
    title: content.metaTitle,
    description: content.metaDescription,
    manifest: '/site.webmanifest',
    // Three parallel translations of the same pages: without these a crawler
    // reads /ht/sou-nou, /fr/sou-nou and /en/sou-nou as duplicates rather than
    // alternates, and picks one arbitrarily.
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: 'website',
      siteName: content.brandName,
      locale: lang,
      alternateLocale: LOCALES.filter((l) => l !== lang),
      title: content.metaTitle,
      description: content.metaDescription,
      url: `/${lang}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metaTitle,
      description: content.metaDescription,
    },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const lang: Locale = locale

  // suppressHydrationWarning on <html>/<body>: browser extensions (LanguageTool's
  // data-lt-installed, autofill/password helpers' __gcr* ids) inject attributes
  // before React hydrates, which React would otherwise flag as a mismatch. It's
  // not a real mismatch — the server + our client render agree.
  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`${bricolage.variable} ${hankenGrotesk.variable} ${ibmPlexMono.variable} ${caveat.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body id="top" suppressHydrationWarning>
        <Preloader />
        {children}
        {/* Dormant until an analytics provider is configured — see
            src/lib/analytics.ts */}
        <CookieBanner locale={lang} copy={getLegalContent(lang).consent} />
      </body>
    </html>
  )
}
