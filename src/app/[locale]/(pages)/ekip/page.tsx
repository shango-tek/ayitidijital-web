'use client'

import { RoutePage } from '@/components/pages/RoutePage'
import { useLocale } from '@/components/i18n/LocaleProvider'

/**
 * The people behind Ayiti Dijital, in two groups that are deliberately not
 * merged.
 *
 * The Vorstand is vertretungsberechtigt under § 26 BGB and is named in the
 * imprint because § 5 DDG requires it. Coordination is not: it carries no power
 * of representation, and it is not an imprint matter. Listing all three under
 * one heading would put the § 26 note over a person it does not apply to — so
 * the groups stay apart and the note sits with the Vorstand.
 */
const VORSTAND = [
  { name: 'Glory Pierrette', role: { ht: 'Prezidan', fr: 'Président', en: 'Chair' } },
  {
    name: 'Berlens Legagneur',
    role: { ht: 'Vis-prezidan', fr: 'Vice-président', en: 'Deputy chair' },
  },
] as const

const COORDINATION = [
  {
    name: 'Corvil D. Telsaint',
    role: { ht: 'Koòdonatè', fr: 'Coordonnateur', en: 'Coordinator' },
  },
] as const

type Member = { name: string; role: Record<'ht' | 'fr' | 'en', string> }

function MemberCard({ member, locale }: { member: Member; locale: 'ht' | 'fr' | 'en' }) {
  return (
    <article className="rounded-card border border-black/[0.06] bg-white p-8 shadow-[0_20px_60px_-40px_rgba(10,58,96,0.35)]">
      <h3 className="font-display text-xl font-bold text-primary">{member.name}</h3>
      <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-gold-deep">
        {member.role[locale]}
      </p>
    </article>
  )
}

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

          {/* Vorstand */}
          <h2 className="mt-10 font-display text-2xl font-extrabold tracking-tight text-primary lg:mt-14">
            {t.boardLabel}
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:max-w-4xl">
            {VORSTAND.map((m) => (
              <MemberCard key={m.name} member={m} locale={locale} />
            ))}
          </div>

          {/* Coordination — its own heading, so the § 26 note below the board
              does not read as covering it. */}
          <h2 className="mt-12 font-display text-2xl font-extrabold tracking-tight text-primary lg:mt-16">
            {t.coordinationLabel}
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:max-w-4xl">
            {COORDINATION.map((m) => (
              <MemberCard key={m.name} member={m} locale={locale} />
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-soft/85">{t.note}</p>
        </div>
      </section>
    </RoutePage>
  )
}
