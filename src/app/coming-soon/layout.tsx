import type { Metadata, Viewport } from 'next'
import { bricolage, hankenGrotesk, ibmPlexMono, playfair } from '../fonts'
import '../globals.css'
import { negotiateLocale } from '@/lib/negotiate-locale'
import type { Locale } from '@/i18n'

/* The holding page carries its own document, like `not-found.tsx`: the real
   <html> normally lives in `[locale]/layout.tsx`, which this route sits outside
   of. The faces come from ../fonts so each is instantiated once — declaring them
   here as well as there made Turbopack's build flake on the duplicate modules.

   Language is negotiated from the request (same logic as the `/` redirect), so
   the gate greets each visitor in their own language — `<html lang>`, metadata
   and the page copy all agree. */

const META: Record<Locale, { title: string; description: string }> = {
  ht: {
    title: 'Ayiti Dijital — Byento',
    description: 'Ayiti Dijital — Fasonnen Demen Avèk Vizyon & Aksyon. N ap vini byento.',
  },
  fr: {
    title: 'Ayiti Dijital — Bientôt',
    description: "Ayiti Dijital — Façonner l'Avenir avec Vision & Action. Le site arrive bientôt.",
  },
  en: {
    title: 'Ayiti Dijital — Coming soon',
    description: 'Ayiti Dijital — Shaping Tomorrow with Vision & Action. Coming soon.',
  },
}

export const viewport: Viewport = {
  themeColor: '#0E1B4D',
}

export async function generateMetadata(): Promise<Metadata> {
  const m = META[await negotiateLocale()]
  return {
    title: m.title,
    description: m.description,
    // A placeholder should not be indexed as the site's content; the real,
    // indexable pages return the moment the gate is lifted.
    robots: { index: false, follow: false },
    icons: {
      icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
      apple: '/apple-touch-icon.png',
    },
  }
}

export default async function ComingSoonLayout({ children }: { children: React.ReactNode }) {
  const lang = await negotiateLocale()
  return (
    <html
      lang={lang}
      className={`${bricolage.variable} ${hankenGrotesk.variable} ${ibmPlexMono.variable} ${playfair.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
