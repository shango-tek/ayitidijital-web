import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { albertSans, bricolage, hankenGrotesk, ibmPlexMono, caveat, playfair } from '../fonts'
import '../globals.css'
import { LOCALES, isLocale, type Locale } from '../../i18n'
import { getSiteContent } from '@/content/site'
import { getLegalContent } from '@/content/legal'
import { SmoothScroll } from '../../components/ui/SmoothScroll'
import { ScrollFX } from '../../components/ui/ScrollFX'
import { CookieBanner } from '../../components/ui/CookieBanner'
import { CookieConsent } from '../../components/ui/CookieConsent'
import { AyitiMark } from '../../components/brand/AyitiMark'

/* Google fonts the design CSS expects, exposed as CSS variables that
   src/styles/*.css re-map onto --font-display / --font-body / --font-mono. */
/* Typefaces live in ../fonts so each Google face is instantiated once (see the
   note there) — importing the same face in two layouts broke the Turbopack build. */

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
      className={`${albertSans.variable} ${bricolage.variable} ${hankenGrotesk.variable} ${ibmPlexMono.variable} ${caveat.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body id="top" suppressHydrationWarning>
        {/* Server-rendered boot loader: it ships in the HTML, so it is in the very
            first painted frame and the hero can never appear before it. The inline
            script below runs the count-up, the logo's flight into the header and the removal; on a
            non-genuine arrival (in-app or back/forward navigation) it hides the
            loader before paint. No React state, no hydration handoff — the loader
            is just HTML + one script. */}
        <div id="preloader" aria-hidden="true" suppressHydrationWarning>
          <div className="pl-panel pl-panel-left precision-grain" />
          <div className="pl-panel pl-panel-right precision-grain" />
          {/* the Ayiti Dijital mark draws itself (pure CSS, so it runs from the first painted
              frame); at speed .5 it completes in ~1.2 s, before it flies into the header logo at 1.34 s */}
          <div className="pl-mark">
            <AyitiMark size={220} motion="intro" speed={0.5} hover={false} />
          </div>
          <div className="pl-progress">
            {/* The inline script animates these, so they legitimately differ from
                the server HTML at hydration — tell React not to flag it. */}
            <span className="pl-bar" suppressHydrationWarning />
            <span className="pl-pct" suppressHydrationWarning>
              0%
            </span>
          </div>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var p=document.getElementById('preloader');if(!p)return;var g;try{var n=performance.getEntriesByType('navigation')[0];if(n&&n.type==='reload')g=true;else if(n&&n.type==='back_forward')g=false;else{try{g=!document.referrer||new URL(document.referrer).origin!==location.origin}catch(e){g=true}}}catch(e){g=true}if(!g){p.style.display='none';return}p.style.display='block';var F=1200,H=140,s=Date.now(),b=p.querySelector('.pl-bar'),c=p.querySelector('.pl-pct');(function k(){var x=Math.min(100,(Date.now()-s)/F*100);if(b)b.style.transform='scaleX('+(x/100)+')';if(c)c.textContent=Math.round(x)+'%';if(x<100)requestAnimationFrame(k)})();setTimeout(function(){var m=p.querySelector('.pl-mark .ad-mark'),t=null,L=document.querySelectorAll('.rn-logo-link .ad-mark,.mnav-logo .ad-mark');for(var i=0;i<L.length;i++){var r=L[i].getBoundingClientRect();if(r.width>0&&r.bottom>0&&r.top<innerHeight){t=L[i];break}}var q=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;if(m&&t&&!q&&m.animate){var a=m.getBoundingClientRect(),z=t.getBoundingClientRect();var dx=z.left+z.width/2-(a.left+a.width/2),dy=z.top+z.height/2-(a.top+a.height/2),k=z.width/a.width;p.setAttribute('data-flying','');p.setAttribute('data-leaving','');document.documentElement.setAttribute('data-logo-landing','');var an=m.animate([{transform:'none'},{transform:'translate('+dx+'px,'+dy+'px) scale('+k+')'}],{duration:700,easing:'cubic-bezier(.65,0,.35,1)',fill:'forwards'});an.onfinish=function(){document.documentElement.removeAttribute('data-logo-landing');p.style.display='none'}}else{p.setAttribute('data-leaving','');setTimeout(function(){p.style.display='none'},650)}},F+H)})();",
          }}
        />
        <SmoothScroll />
        <ScrollFX />
        {children}
        {/* Dormant until an analytics provider is configured — see
            src/lib/analytics.ts */}
        <CookieBanner locale={lang} copy={getLegalContent(lang).consent} />
        {/* Functional language cookie + a one-time, on-brand cookie card with an
            honest preferences panel (strictly-necessary inventory + dormant
            analytics toggle). */}
        <CookieConsent locale={lang} copy={getLegalContent(lang).cookieConsent} />
      </body>
    </html>
  )
}
