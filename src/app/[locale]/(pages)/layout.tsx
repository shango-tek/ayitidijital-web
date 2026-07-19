import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { MobileNav } from '@/components/layout/MobileNav'
import { FlickeringFooter } from '@/components/ui/flickering-footer'
import { MissionMarquee } from '@/components/ui/MissionMarquee'
import { getSiteContent, langs } from '@/content/site'
import { toLocale } from '@/i18n'

/**
 * Shared chrome for every sub-route: the Studio mobile menu, the card-less
 * {@link SiteHeader} (same RadiantNavbar as the hero, no pixel card), the page
 * content, and the site footer. Mirrors HomeView's shell — including the
 * `.mshell` rounded-card wrapper the MobileNav animates against — so behaviour
 * is consistent between the home page and every inner page.
 *
 * A server component. The content is read here, per locale, and handed to the
 * interactive chrome as props, so only the strings each island actually renders
 * cross into the client payload.
 */
export default async function PagesLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const lang = toLocale(locale)
  const c = getSiteContent(lang)

  return (
    <>
      <MobileNav
        locale={lang}
        brandName={c.brandName}
        links={c.navLinks}
        langs={langs}
        supportLabel={c.supportLabel}
        socials={c.footerSocials}
      />
      <div className="mshell">
        <a className="skip" href="#main">
          {c.skipToContent}
        </a>
        <SiteHeader content={c} />
        <main id="main" className="site-main">
          {children}
        </main>
        <FlickeringFooter
          locale={lang}
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
