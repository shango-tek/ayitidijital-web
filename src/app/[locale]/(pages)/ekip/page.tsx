'use client'

import { RoutePage } from '@/components/pages/RoutePage'
import { useLocale } from '@/components/i18n/LocaleProvider'

/**
 * The board, as publicly named in the imprint (§ 5 DDG requires it there).
 * Not locale content: these are legal facts about real people, so they live in
 * one place and only the role label is translated.
 */
const BOARD = [
  { name: 'Glory Pierrette', role: { ht: 'Prezidan', fr: 'Président', en: 'Chair' } },
  {
    name: 'Berlens Legagneur',
    role: { ht: 'Vis-prezidan', fr: 'Vice-président', en: 'Deputy chair' },
  },
] as const

/**
 * "Ekip" — the team. Moved off /sou-nou when it earned its own route, so the
 * board is stated once on the site rather than in two places that can drift.
 *
 * Deliberately only the board: everyone else who works on Ayiti Dijital would
 * need their own consent to be listed here (§ 22 KunstUrhG for any photo), so
 * this page grows when real people agree to be on it, not before.
 */
export default function EkipPage() {
  const { content: c, locale } = useLocale()
  const t = c.teamPage

  return (
    <RoutePage path="/ekip" subtitle={t.lead}>
      <section className="bg-white py-16 md:py-20 lg:py-[100px]">
        <div className="mx-auto max-w-[90rem] px-5 md:px-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-deep">
            {t.label}
          </span>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:max-w-4xl">
            {BOARD.map((m) => (
              <article
                key={m.name}
                className="rounded-card border border-black/[0.06] bg-white p-8 shadow-[0_20px_60px_-40px_rgba(10,58,96,0.35)]"
              >
                <h2 className="font-display text-xl font-bold text-primary">{m.name}</h2>
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-gold-deep">
                  {m.role[locale]}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-soft/85">{t.note}</p>
        </div>
      </section>
    </RoutePage>
  )
}
