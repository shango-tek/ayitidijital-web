'use client'

import { useLocale } from '@/components/i18n/LocaleProvider'
import { getLegalContent } from '@/content/legal'
import { LegalPage, LegalSection, LegalBody, LegalDl } from '@/components/pages/LegalPage'

/**
 * Impressum / mentions légales — statutory disclosure under § 5 TMG for
 * Ayiti Dijital e.V. Wording is a verbatim port; see `src/content/legal`.
 *
 * Reachable at /ht|/fr|/en/enfomasyon-legal. The previous site's URLs
 * (/mentions-legales, /en/imprint, /ht/enfomasyon-legal) redirect here — see
 * `next.config.ts`.
 */
export default function ImprintRoute() {
  const { locale } = useLocale()
  const p = getLegalContent(locale).imprint

  return (
    <LegalPage
      eyebrow={p.eyebrow}
      h1={p.h1}
      intro={p.intro}
      lastUpdatedLabel={p.last_updated_label}
      lastUpdatedValue={p.last_updated_value}
      tocTitle={p.toc_title}
      toc={[
        { id: 'publisher', number: '01', title: p.publisher_title },
        { id: 'representative', number: '02', title: p.representative_title },
        { id: 'contact', number: '03', title: p.contact_title },
        { id: 'responsible', number: '04', title: p.responsible_title },
        { id: 'liability', number: '05', title: p.liability_title },
        { id: 'copyright', number: '06', title: p.copyright_title },
        { id: 'dispute', number: '07', title: p.dispute_title },
      ]}
    >
      <LegalSection id="publisher" number="01" title={p.publisher_title}>
        <LegalDl
          rows={[
            { label: p.publisher_dl.name_label, value: p.publisher_dl.name_value },
            { label: p.publisher_dl.status_label, value: p.publisher_dl.status_value },
            { label: p.publisher_dl.address_label, value: p.publisher_dl.address_value },
            { label: p.publisher_dl.registry_label, value: p.publisher_dl.registry_value },
          ]}
        />
      </LegalSection>

      <LegalSection id="representative" number="02" title={p.representative_title}>
        <LegalDl
          rows={[
            { label: p.representative_dl.name_label, value: p.representative_dl.name_value },
            { label: p.representative_dl.role_label, value: p.representative_dl.role_value },
          ]}
        />
        <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">{p.representative_note}</p>
      </LegalSection>

      <LegalSection id="contact" number="03" title={p.contact_title}>
        <LegalDl
          rows={[
            { label: p.contact_dl.email_label, value: p.contact_dl.email_value },
            { label: p.contact_dl.post_label, value: p.contact_dl.post_value },
          ]}
        />
      </LegalSection>

      <LegalSection
        id="responsible"
        number="04"
        title={p.responsible_title}
        subtitle={p.responsible_subtitle}
      >
        <LegalBody>{p.responsible_body}</LegalBody>
      </LegalSection>

      <LegalSection id="liability" number="05" title={p.liability_title}>
        <LegalBody>{p.liability_body}</LegalBody>
      </LegalSection>

      <LegalSection id="copyright" number="06" title={p.copyright_title}>
        <LegalBody>{p.copyright_body}</LegalBody>
      </LegalSection>

      <LegalSection id="dispute" number="07" title={p.dispute_title}>
        <LegalBody>{p.dispute_body}</LegalBody>
      </LegalSection>
    </LegalPage>
  )
}
