'use client'

import { useEffect, useState } from 'react'
import { SilentPrecisionHero } from '@/components/sections/SilentPrecisionHero'
import { AboutBento } from '@/components/sections/AboutBento'
import { WorkOverview } from '@/components/sections/WorkOverview'
import { SpiralGalaxy } from '@/components/ui/spiral-galaxy'
import { EcosystemCarousel } from '@/components/sections/EcosystemCarousel'
import { DomainesGrid } from '@/components/sections/DomainesGrid'
import { JournalSection } from '@/components/sections/JournalSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { PasseALaction } from '@/components/sections/PasseALaction'
import { NewsletterSection } from '@/components/sections/NewsletterSection'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { MobileNav } from '@/components/layout/MobileNav'
import { MissionMarquee } from '@/components/ui/MissionMarquee'
import { FlickeringFooter } from '@/components/ui/flickering-footer'
import { useLocale } from '@/components/i18n/LocaleProvider'
import { langs } from '@/content/site'

/**
 * The home page. Section order mirrors the Ayiti Dijital landing flow:
 * hero → kinetic spiral → impact → what-we-do → ecosystem (+ end-row CTA) →
 * community → newsletter → footer. Switching language re-renders in place.
 */
export function HomeView() {
  const { content: c, locale } = useLocale()

  // The spiral is a heavy canvas moment — great with a mouse on a wide screen,
  // but a continuous starfield rAF is a poor, battery-hungry fit on touch
  // devices, and the sequence is composed for a landscape stage.
  //
  // Width alone was not enough: iPad Pro 12.9" in PORTRAIT is exactly 1024px
  // wide, so it passed a bare `min-width: 1024px` and got the whole thing.
  // Three conditions, all required:
  //   min-width  — enough room for the stage at all
  //   landscape  — excludes every tablet held upright, whatever its width
  //   hover/fine — excludes touch entirely (a touchscreen laptop still reports
  //                a fine pointer for its mouse, so those keep it)
  //
  // KEEP IN SYNC with the `spiral:` custom variant in globals.css, which moves
  // the warm SectionPanel between EcosystemCarousel and DomainesGrid depending
  // on whether this section is here to break the page.
  const [showSpiral, setShowSpiral] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(
      '(min-width: 1024px) and (orientation: landscape) and (hover: hover) and (pointer: fine)',
    )
    const update = () => setShowSpiral(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <>
      {/* Studio-style mobile / tablet menu (< 1024px) + desktop floating nav */}
      <MobileNav />
      <FloatingNav brandName={c.brandName} links={c.navLinks} langs={langs} supportLabel={c.supportLabel} />

      <div className="mshell">
        <a className="skip" href="#main">
          {c.skipToContent}
        </a>
        <main id="main">
          {/* Hero */}
          <SilentPrecisionHero
            brandName={c.brandName}
            links={c.navLinks}
            langs={langs}
            banner={c.heroPanel.banner}
            supportLabel={c.supportLabel}
            title={c.heroTitle}
            description={c.heroDescription}
          />

          {/* About — bento: intro (badge + headline + lead + CTA) on the left,
              Mission / Vision / Devise cards + a photo on the right */}
          <AboutBento
            id="apropo"
            badge={c.about.label}
            title={c.about.title}
            strokeWord={c.about.strokeWord}
            lead={c.about.lead}
            cta={c.about.cta}
            ctaHref={`/${locale}/sou-nou`}
            pillars={c.pillars.items}
            photo="/pillars/mission.webp"
            photoAlt={c.about.imageAlt}
          />

          {/* What we do — Bati / Enkibe / Konekte overview + end-row CTA */}
          <WorkOverview
            id="travay-nou"
            label={c.whatWeDo.label}
            strokeWord={c.whatWeDo.strokeWord}
            titleRest={c.whatWeDo.titleRest}
            subtitle={c.whatWeDo.subtitle}
            cards={c.whatWeDo.cards.map((card, i) => ({
              ...card,
              href:
                [`/${locale}/travay-nou`, `/${locale}/ekosistem`, `/${locale}/kominote`][i] ??
                `/${locale}/travay-nou`,
            }))}
            outro={c.whatWeDo.outro}
            viewAll={c.whatWeDo.viewAll}
            viewAllHref={`/${locale}/travay-nou`}
          />

          {/* Spiral galaxy — 3D starfield + word-spiral + ambient word-field, fused.
              Desktop landscape only — see showSpiral above. Where it IS shown it
              doubles as the page's mid-page dark break, which is why the warm
              panel moves to a different section when it is absent. */}
          {showSpiral && <SpiralGalaxy words={c.marqueeWords} centerWords={c.spiralCenterWords} />}

          {/* Explore our ecosystem — incubated-projects carousel (white bg) */}
          <EcosystemCarousel
            id="ekosistem"
            label={c.ecosystem.label}
            strokeWord={c.ecosystem.strokeWord}
            titleRest={c.ecosystem.titleRest}
            subtitle={c.ecosystem.subtitle}
            outro={c.ecosystem.outro}
            viewAll={c.ecosystem.viewAll}
            viewAllHref={`/${locale}/travay-nou`}
            projects={c.ecosystem.projects.map((p) => ({
              ...p,
              // Each project's own slug (from its image filename) → its anchor on
              // the ecosystem page, so six distinct projects don't all open the
              // same URL.
              href: `/${locale}/ekosistem#${p.image.split('/').pop()?.replace(/\.\w+$/, '') ?? ''}`,
            }))}
          />

          {/* Domaines d'action — thematic areas as gold numbered cards */}
          <DomainesGrid
            id="domenn"
            label={c.domaines.label}
            title={c.domaines.title}
            subtitle={c.domaines.subtitle}
            sdgPrefix={c.domaines.sdgPrefix}
            items={c.domaines.items}
          />

          {/* Le Journal — blog teaser */}
          <JournalSection
            id="jounal"
            label={c.journal.label}
            strokeWord={c.journal.strokeWord}
            titleRest={c.journal.titleRest}
            subtitle={c.journal.subtitle}
            readMore={c.journal.readMore}
            viewAll={c.journal.viewAll}
            // /jounal was never a route — these four links 404'd. The news page
            // is /nouvel; each post anchors to its card there.
            viewAllHref={`/${locale}/nouvel`}
            posts={c.journal.posts.map((p, i) => ({ ...p, href: `/${locale}/nouvel#post-${i + 1}` }))}
          />

          {/* Newsletter — full-width rounded card, sits right under the journal */}
          <NewsletterSection content={c.newsletter} />

          {/* FAQ */}
          <FaqSection
            id="faq"
            label={c.faq.label}
            strokeWord={c.faq.strokeWord}
            titleRest={c.faq.titleRest}
            subtitle={c.faq.subtitle}
            items={c.faq.items}
          />

          {/* Passe à l'action — final dual CTA */}
          <PasseALaction
            id="aksyon"
            label={c.action.label}
            title={c.action.title}
            subtitle={c.action.subtitle}
            fundKreyol={c.action.fundKreyol}
            fundTitle={c.action.fundTitle}
            fundDesc={c.action.fundDesc}
            fundButton={c.action.fundButton}
            fundHref={`/${locale}/soutni`}
            codeKreyol={c.action.codeKreyol}
            codeTitle={c.action.codeTitle}
            codeDesc={c.action.codeDesc}
            codeButton={c.action.codeButton}
            codeHref={`/${locale}/kominote`}
          />
        </main>

        {/* Footer */}
        <FlickeringFooter
          brandName={c.brandName}
          content={c.konbitFooter}
          columns={c.footerColumns}
          copyright={c.footerCopyright}
          socials={c.footerSocials}
          subscribe={{ placeholder: c.newsletter.email.placeholder, button: c.newsletter.button, done: c.newsletter.confirm }}
          marquee={<MissionMarquee words={c.marqueeWords} />}
          scrollTopLabel={c.scrollTopLabel}
        />
      </div>
    </>
  )
}
