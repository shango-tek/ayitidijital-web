'use client'

import { HeroPanel } from '@/components/sections/HeroPanel'
import { SilentPrecisionHero } from '@/components/sections/SilentPrecisionHero'
import { Default as NeonButtonDemo } from '@/components/ui/neon-button-demo'
import { LiquidGlassDemo } from '@/components/ui/liquid-glass-demo'
// import { MagicDustDemo } from '@/components/ui/magic-dust-demo' // needs @react-three/fiber + three (not installed) — re-enable after `pnpm add three @react-three/fiber`
import { StatsBand } from '@/components/sections/StatsBand'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { HubPrograms } from '@/components/sections/HubPrograms'
import { DiasporaCta } from '@/components/sections/DiasporaCta'
import { NewsletterSection } from '@/components/sections/NewsletterSection'
import { KonbitFooter } from '@/components/layout/KonbitFooter'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { MobileNav } from '@/components/layout/MobileNav'
import { MissionMarquee } from '@/components/ui/MissionMarquee'
import { useLocale, useContent } from '@/components/i18n/LocaleProvider'
import { langs } from '@/content/site'
import {MagicDustDemo} from "@/components/ui/magic-dust-demo";

/**
 * The home page, rendered from the locale context. Switching language updates
 * the context and re-renders this tree in place — the text swaps, nothing
 * navigates or reloads.
 */
export function HomeView() {
  const { content: c } = useLocale()

  return (
    <>
      {/* Studio-style mobile / tablet menu (< 1024px): floating closed bar +
          navy panel that pushes the rounded-top content card down to reveal it. */}
      <MobileNav />
      <FloatingNav brandName={c.brandName} links={c.navLinks} langs={langs} supportLabel={c.supportLabel} />
      <div className="mshell">
        <a className="skip" href="#main">
          {c.skipToContent}
        </a>
        <main id="main">
        <SilentPrecisionHero 
          brandName={c.brandName}
          links={c.navLinks}
          langs={langs}
          banner={c.heroPanel.banner}
          supportLabel={c.supportLabel}
        />

        <section className="py-12 flex flex-col items-center bg-black/5">
          <div className="max-w-4xl w-full px-6">
             <h2 className="text-2xl font-bold mb-8 text-center text-white/90">Premium Button Collection</h2>
             <LiquidGlassDemo />
             <div className="h-px bg-white/5 my-8" />
             <NeonButtonDemo />
          </div>
        </section>

        {/*<HeroPanel*/}
        {/*  brandName={c.brandName}*/}
        {/*  links={c.navLinks}*/}
        {/*  langs={langs}*/}
        {/*  title={c.heroPanel.title}*/}
        {/*  sub={c.heroPanel.sub}*/}
        {/*  subLang={c.heroPanel.subLang}*/}
        {/*  ctas={c.heroPanel.ctas}*/}
        {/*  supportLabel={c.supportLabel}*/}
        {/*/>*/}

        <StatsBand kicker={c.statsKicker} items={c.stats} cut={false} />
        <ProjectsGrid
          id="pwoje"
          kicker={c.projectsSection.kicker}
          title={c.projectsSection.title}
          sub={c.projectsSection.sub}
          subLang={c.projectsSection.subLang}
          projects={c.projects}
        />
        <HubPrograms
          id="pwogram"
          kicker={c.hubSection.kicker}
          title={c.hubSection.title}
          sub={c.hubSection.sub}
          subLang={c.hubSection.subLang}
          definition={c.hubDefinition}
          programs={c.hubPrograms}
        />
        <DiasporaCta
          id="kominote"
          kicker={c.diaspora.kicker}
          title={c.diaspora.title}
          lead={c.diaspora.lead}
          leadEn={c.diaspora.leadEn}
          cities={c.diaspora.cities}
          ctas={c.diaspora.ctas}
        />

        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-6">
             <MagicDustDemo />
          </div>
        </section>
      </main>
      <NewsletterSection content={c.newsletter} />
      <KonbitFooter
        id="sou-nou"
        brandName={c.brandName}
        content={c.konbitFooter}
        columns={c.footerColumns}
        copyright={c.footerCopyright}
        socials={c.footerSocials}
        subscribe={{ placeholder: c.newsletter.email.placeholder, button: c.newsletter.button, done: c.newsletter.confirm }}
        marquee={<MissionMarquee words={c.marqueeWords} />}
      />
      </div>
    </>
  )
}
