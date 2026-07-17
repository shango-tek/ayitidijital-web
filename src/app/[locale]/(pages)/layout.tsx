'use client'

import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { MobileNav } from '@/components/layout/MobileNav'
import { FlickeringFooter } from '@/components/ui/flickering-footer'
import { MissionMarquee } from '@/components/ui/MissionMarquee'
import { useContent } from '@/components/i18n/LocaleProvider'

/**
 * Shared chrome for every sub-route: the Studio mobile menu, the card-less
 * {@link SiteHeader} (same RadiantNavbar as the hero, no pixel card), the page
 * content, and the site footer. Mirrors HomeView's shell — including the
 * `.mshell` rounded-card wrapper the MobileNav animates against — so behaviour
 * is consistent between the home page and every inner page.
 */
export default function PagesLayout({ children }: { children: ReactNode }) {
  const c = useContent()

  return (
    <>
      <MobileNav />
      <div className="mshell">
        <a className="skip" href="#main">
          {c.skipToContent}
        </a>
        <SiteHeader />
        <main id="main" className="site-main">
          {children}
        </main>
        <FlickeringFooter
          brandName={c.brandName}
          content={c.konbitFooter}
          columns={c.footerColumns}
          copyright={c.footerCopyright}
          socials={c.footerSocials}
          subscribe={{
            placeholder: c.newsletter.email.placeholder,
            button: c.newsletter.button,
            done: c.newsletter.confirm,
          }}
          marquee={<MissionMarquee words={c.marqueeWords} />}
          scrollTopLabel={c.scrollTopLabel}
        />
      </div>
    </>
  )
}
