import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Hanken_Grotesk, IBM_Plex_Mono, Playfair_Display } from 'next/font/google'
import '../globals.css'

/* The holding page carries its own document, like `not-found.tsx`: the root
   layout is a pass-through and the real <html> normally lives in
   `[locale]/layout.tsx`, which this route sits outside of. Fonts are loaded
   here so the placeholder wears the brand's type, not a system fallback. */
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], weight: ['500', '700', '800'], variable: '--font-bricolage', display: 'swap' })
const hanken = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-hanken', display: 'swap' })
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['500'], variable: '--font-ibm-plex-mono', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], style: ['italic'], weight: ['500'], variable: '--font-playfair', display: 'swap' })

export const viewport: Viewport = {
  themeColor: '#0E1B4D',
}

export const metadata: Metadata = {
  title: 'Ayiti Dijital — Byento',
  description: 'La lambi résonne, le konbit numérique commence. Le site arrive bientôt.',
  // A placeholder should not be indexed as the site's content; the real,
  // indexable pages return the moment the gate is lifted.
  robots: { index: false, follow: false },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/apple-touch-icon.png',
  },
}

export default function ComingSoonLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${bricolage.variable} ${hanken.variable} ${mono.variable} ${playfair.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
