'use client'

import { RoutePage } from '@/components/pages/RoutePage'
import { useLocale } from '@/components/i18n/LocaleProvider'

/** The Vorstand, as publicly named in the imprint (§ 5 DDG requires it there). */
const BOARD = [
  { name: 'Glory Pierrette', role: { ht: 'Prezidan', fr: 'Président', en: 'Chair' } },
  {
    name: 'Berlens Legagneur',
    role: { ht: 'Vis-prezidan', fr: 'Vice-président', en: 'Deputy chair' },
  },
] as const

const T = {
  ht: { principlesTitle: 'Sa ki gide nou', boardTitle: 'Vorstand la', boardNote: 'Chak manm gen dwa reprezante asosyasyon an pou kont li (§ 26 BGB).' },
  fr: { principlesTitle: 'Ce qui nous guide', boardTitle: 'Le Vorstand', boardNote: 'Chaque membre peut représenter l’association seul (§ 26 BGB).' },
  en: { principlesTitle: 'What guides us', boardTitle: 'The Vorstand', boardNote: 'Each member may represent the association individually (§ 26 BGB).' },
} as const

/**
 * "Sou nou" — the three About anchors (#vizyon, #prensip, #ekip) the nav
 * dropdown points at.
 *
 * Each section previously repeated `heroDescription.short` as filler, which
 * printed the same sentence four times on one page. They now carry real
 * content: the Mission / Vision / Devise pillars, and the board as named in the
 * imprint.
 */
export default function SouNouPage() {
  const { content: c, locale } = useLocale()
  const t = T[locale]
  const [mission, vision, devise] = c.pillars.items

  return (
    <RoutePage path="/sou-nou" subtitle={c.about.lead}>
      <div className="page-wrap">
        <div className="page-sections">
          {/* Vision & mission */}
          <section id="vizyon" className="page-section">
            <h2>{c.about.title.replace(/\.\s*$/, '')}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {[mission, vision].filter(Boolean).map((p) => (
                <div key={p.name}>
                  <h3 className="font-display text-lg font-bold text-primary">{p.name}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{p.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Principles — the devise, plus the pillar framing */}
          <section id="prensip" className="page-section">
            <h2>{t.principlesTitle}</h2>
            {devise ? (
              <p className="page-lede">{devise.body}</p>
            ) : null}
            <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">{c.whatWeDo.subtitle}</p>
          </section>

          {/* Team — the Vorstand, already public in the imprint */}
          <section id="ekip" className="page-section">
            <h2>{t.boardTitle}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {BOARD.map((m) => (
                <div
                  key={m.name}
                  className="rounded-card border border-black/[0.06] bg-white p-6 shadow-[0_20px_60px_-40px_rgba(10,58,96,0.35)]"
                >
                  <p className="font-display text-lg font-bold text-primary">{m.name}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-gold-deep">
                    {m.role[locale]}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft/85">{t.boardNote}</p>
          </section>
        </div>
      </div>
    </RoutePage>
  )
}
