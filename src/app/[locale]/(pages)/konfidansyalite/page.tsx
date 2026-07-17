'use client'

import { useLocale } from '@/components/i18n/LocaleProvider'
import { getLegalContent } from '@/content/legal'
import { LegalPage, LegalSection, LegalBody, LegalDl } from '@/components/pages/LegalPage'

/**
 * Privacy policy — GDPR disclosure for Ayiti Dijital e.V. Wording is a verbatim
 * port; see `src/content/legal`.
 *
 * Reachable at /ht|/fr|/en/konfidansyalite. The previous site's URLs
 * (/confidentialite, /en/privacy, /ht/konfidansyalite) redirect here — see
 * `next.config.ts`.
 */
export default function PrivacyRoute() {
  const { locale } = useLocale()
  const p = getLegalContent(locale).privacy

  return (
    <LegalPage
      eyebrow={p.eyebrow}
      h1={p.h1}
      intro={p.intro}
      lastUpdatedLabel={p.last_updated_label}
      lastUpdatedValue={p.last_updated_value}
      tocTitle={p.toc_title}
      toc={[
        { id: 'summary', number: '01', title: p.summary_title },
        { id: 'controller', number: '02', title: p.controller_title },
        { id: 'data', number: '03', title: p.data_title },
        { id: 'cookies', number: '04', title: p.cookies_title },
        { id: 'rights', number: '05', title: p.rights_title },
        { id: 'hosting', number: '06', title: p.hosting_title },
        { id: 'contact', number: '07', title: p.contact_title },
      ]}
    >
      {/* 01 — the three-line summary */}
      <LegalSection id="summary" number="01" title={p.summary_title} subtitle={p.summary_subtitle}>
        <ul className="grid gap-4 sm:grid-cols-3">
          {p.summary_points.map((point) => (
            <li
              key={point.title}
              className="rounded-card border border-black/[0.08] bg-[#F8FAFD] p-5"
            >
              <p className="font-display font-bold text-primary">{point.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{point.body}</p>
            </li>
          ))}
        </ul>
      </LegalSection>

      {/* 02 — controller */}
      <LegalSection id="controller" number="02" title={p.controller_title}>
        <LegalBody>{p.controller_body}</LegalBody>
        <div className="mt-4">
          <LegalDl rows={[{ label: p.controller_dpo_label, value: p.controller_dpo_value }]} />
        </div>
      </LegalSection>

      {/* 03 — data collected */}
      <LegalSection id="data" number="03" title={p.data_title}>
        <LegalBody>{p.data_body}</LegalBody>
      </LegalSection>

      {/* 04 — cookies + local storage */}
      <LegalSection id="cookies" number="04" title={p.cookies_title}>
        <LegalBody>{p.cookies_intro}</LegalBody>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-black/10">
                {[
                  p.cookies_table_headers.name,
                  p.cookies_table_headers.purpose,
                  p.cookies_table_headers.duration,
                  p.cookies_table_headers.type,
                ].map((h) => (
                  <th
                    key={h}
                    className="py-2.5 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] font-normal text-ink-soft/70"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.cookies_rows.map((row, i) => (
                <tr key={i} className="border-b border-black/[0.06]">
                  <td className="py-3 pr-4 font-medium text-primary">{row.name}</td>
                  <td className="py-3 pr-4 text-ink-soft">{row.purpose}</td>
                  <td className="py-3 pr-4 text-ink-soft">{row.duration}</td>
                  <td className="py-3 pr-4 text-ink-soft">{row.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-soft">{p.cookies_note}</p>
      </LegalSection>

      {/* 05 — GDPR rights */}
      <LegalSection id="rights" number="05" title={p.rights_title}>
        <LegalBody>{p.rights_intro}</LegalBody>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {p.rights_cards.map((card) => (
            <li key={card.title} className="rounded-card border border-black/[0.08] bg-white p-5">
              <span aria-hidden="true" className="font-display text-lg text-gold-deep">
                {card.icon}
              </span>
              <p className="mt-1.5 font-display font-bold text-primary">{card.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{card.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-3xl leading-relaxed text-ink-soft">{p.rights_complaint}</p>
      </LegalSection>

      {/* 06 — hosting */}
      <LegalSection id="hosting" number="06" title={p.hosting_title}>
        <LegalBody>{p.hosting_body}</LegalBody>
      </LegalSection>

      {/* 07 — privacy contact */}
      <LegalSection id="contact" number="07" title={p.contact_title}>
        <LegalBody>{p.contact_body}</LegalBody>
        <a
          href={`mailto:${p.contact_email}`}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-display text-sm font-bold text-primary transition-transform duration-200 hover:-translate-y-0.5"
        >
          {p.contact_email}
        </a>
      </LegalSection>
    </LegalPage>
  )
}
