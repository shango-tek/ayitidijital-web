import type { Metadata, Viewport } from 'next'
import { bricolage, hankenGrotesk, ibmPlexMono, playfair } from '../fonts'
import '../globals.css'

/* The holding page carries its own document, like `not-found.tsx`: the real
   <html> normally lives in `[locale]/layout.tsx`, which this route sits outside
   of. The faces come from ../fonts so each is instantiated once — declaring them
   here as well as there made Turbopack's build flake on the duplicate modules. */

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
      className={`${bricolage.variable} ${hankenGrotesk.variable} ${ibmPlexMono.variable} ${playfair.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
