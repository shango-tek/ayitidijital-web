import { Albert_Sans, Bricolage_Grotesque, Hanken_Grotesk, IBM_Plex_Mono, Caveat, Playfair_Display } from 'next/font/google'

/**
 * Every Google face is instantiated ONCE here and imported where needed.
 *
 * Importing the same `next/font/google` face from more than one module makes
 * Turbopack emit duplicate internal font modules that intermittently fail to
 * resolve during `next build` ("Module not found: …bricolage_grotesque…
 * module.css"), which is why the Vercel build flaked on some commits and passed
 * on others. Centralising the faces means each is built exactly once, so both the
 * root layout and the coming-soon layout share the same resolved modules.
 */

/* House body world — a tight, high-x-height geometric grotesque variable font. */
export const albertSans = Albert_Sans({
  subsets: ['latin'],
  variable: '--font-albert',
  display: 'swap',
})

/* Display face — a contemporary humanist grotesque with real character. */
export const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

export const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hanken',
  display: 'swap',
})

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

/* Handwritten accents in the Konbit footer. */
export const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-caveat',
  display: 'swap',
})

/* Serif italic accent for the hero title. */
export const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['500', '600'],
  variable: '--font-playfair',
  display: 'swap',
})
