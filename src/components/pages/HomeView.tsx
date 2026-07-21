import { SilentPrecisionHero } from '@/components/sections/SilentPrecisionHero'
import { AboutBento } from '@/components/sections/AboutBento'
import { WorkOverview } from '@/components/sections/WorkOverview'
import { EcosystemCarousel } from '@/components/sections/EcosystemCarousel'
import { DomainesGrid } from '@/components/sections/DomainesGrid'
import { JournalSection } from '@/components/sections/JournalSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { PasseALaction } from '@/components/sections/PasseALaction'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { MobileNav } from '@/components/layout/MobileNav'
import { MissionMarquee } from '@/components/ui/MissionMarquee'
import { ScrollTopFab } from '@/components/ui/ScrollTopFab'
import { FlickeringFooter } from '@/components/ui/flickering-footer'
import { langs, type SiteContent } from '@/content/site'
import type { Locale } from '@/i18n'

/**
 * The home page. Section order mirrors the Ayiti Dijital landing flow:
 * hero → impact → what-we-do → ecosystem (+ end-row CTA) → thematics →
 * journal → faq → call to action → footer.
 *
 * A server component: the content arrives as a prop from the route, so none of
 * this markup or the content module reaches the browser. Interactivity lives in
 * the sections that need it, not here.
 */
export function HomeView({ content: c, locale }: { content: SiteContent; locale: Locale }) {
  return (
    <>
      {/* Studio-style mobile / tablet menu (< 1024px) + desktop floating nav */}
      <MobileNav
        locale={locale}
        brandName={c.brandName}
        links={c.navLinks}
        langs={langs}
        supportLabel={c.supportLabel}
        socials={c.footerSocials}
      />

      {/* Back to top — tablet portrait only, from the end of "what we do" until
          the footer (which carries its own) comes into view. */}
      <ScrollTopFab afterId="travay-nou" label={c.scrollTopLabel} />
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

          {/* Explore our ecosystem — incubated-projects carousel (sand panel) */}
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
          locale={locale}
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
