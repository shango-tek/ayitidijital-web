import { RadiantNavbar } from './RadiantNavbar'
import { langs } from '@/content/site'
import type { SiteContent } from '@/content/site'

/**
 * The plain, card-less page header used on every sub-route (Travay Nou, Sou nou,
 * …). It reuses the exact same {@link RadiantNavbar} the hero renders — only
 * without the SilentPrecisionHero pixel card behind it — so navigation looks and
 * behaves identically across the whole site. Below 1024px it's hidden and the
 * Studio <MobileNav> takes over (see `.site-header .rn-header` in globals.css).
 *
 * A server component: only the handful of strings the navbar needs cross into
 * the client payload, not the content module.
 */
export function SiteHeader({ content: c }: { content: SiteContent }) {
  return (
    <header className="site-header">
      <RadiantNavbar
        brandName={c.brandName}
        links={c.navLinks}
        langs={langs}
        supportLabel={c.supportLabel}
      />
    </header>
  )
}
