import { DEFAULT_LOCALE, type Locale } from '../../i18n'
import { ANALYTICS_ENABLED } from '../../lib/analytics'
import ht from './ht.json'
import fr from './fr.json'
import en from './en.json'

/* ------------------------------------------------------------------ *
 * Legal content — Impressum (§ 5 DDG) and privacy policy (GDPR).
 *
 * This is a legal statement by Ayiti Dijital, not site copy. Two rules:
 *
 *  1. Every factual claim here must be TRUE OF THE BUILT SITE. The privacy
 *     policy asserts no cookies, no storage, no analytics and no third-party
 *     requests — that is currently accurate, and it is load-bearing. Adding an
 *     analytics script, an embed, a remote font or a remote <img> makes this
 *     page false. Update the page in the same commit, or don't add the thing.
 *  2. Don't invent facts to fill a gap. A register number we don't have or an
 *     address we haven't confirmed is a worse legal position than an honestly
 *     shorter page. Omit the section instead — that is why there is no register
 *     block (§ 5 Abs. 1 Nr. 4 DDG applies only to registers you are entered in)
 *     and no VAT block (§ 5 Abs. 1 Nr. 6 DDG applies only "sofern vorhanden").
 *
 * Keep `lastUpdatedValue` in step with any change to the wording.
 * ------------------------------------------------------------------ */

export interface LegalRow {
  label: string
  value: string
}

export interface LegalPoint {
  title: string
  body: string
}

/** A block of content within a section. `kind` selects the renderer. */
export type LegalBlock =
  | { kind: 'text'; body: string }
  | { kind: 'note'; body: string }
  | { kind: 'dl'; rows: LegalRow[] }
  | { kind: 'points'; items: LegalPoint[] }
  | { kind: 'email'; value: string }
  /** Sub-label inside a section — groups the identity block of the imprint
   *  ("Vertreten durch", "Kontakt", …) without inventing a second heading level. */
  | { kind: 'subheading'; title: string }
  /**
   * The provider block, as an Impressum is conventionally set: name, legal
   * form, street, postcode + town, country — one per line, no labels. Rendered
   * as a real <address>, which is the element for exactly this.
   */
  | { kind: 'address'; lines: string[] }
  /** Plain stacked lines, e.g. the board members. No labels, no <address>. */
  | { kind: 'lines'; lines: string[] }

export interface LegalSectionContent {
  /** Anchor id — stable across locales so /fr/…#contact and /en/…#contact match. */
  id: string
  number: string
  title: string
  subtitle?: string
  blocks: LegalBlock[]
}

export interface LegalDoc {
  title: string
  description: string
  eyebrow: string
  /** Ends with a period; the first word gets the outlined treatment. */
  h1: string
  /** Opening paragraph, set large. On the privacy policy this is the preamble. */
  lead: string
  /** Further preamble paragraphs under the lead, set as normal prose. */
  intro?: string[]
  lastUpdatedLabel: string
  lastUpdatedValue: string
  tocTitle: string
  /** Labels for the expand/collapse-all control (accordion documents only). */
  expandAllLabel: string
  collapseAllLabel: string
  sections: LegalSectionContent[]
}

/** Consent-banner copy. Only surfaced in cookie mode — see src/lib/analytics.ts. */
export interface ConsentContent {
  title: string
  body: string
  accept: string
  reject: string
  policyLabel: string
}

/** The two truthful wordings for "do you measure anything?". */
export interface AnalyticsWording {
  summaryTitle: string
  summaryBody: string
  sectionTitle: string
  sectionBody: string
}

export interface LegalContent {
  imprint: LegalDoc
  privacy: LegalDoc
  consent: ConsentContent
  analytics: { off: AnalyticsWording; on: AnalyticsWording }
}

const LEGAL: Record<Locale, LegalContent> = {
  ht: ht as LegalContent,
  fr: fr as LegalContent,
  en: en as LegalContent,
}

/**
 * Swap the privacy policy's analytics wording to match what the build actually
 * does. The JSON ships the "no analytics" text because that is today's truth;
 * flip ANALYTICS_ENABLED and the summary point and the "Analytics" section
 * switch to the `analytics.on` wording in every locale, without anyone editing
 * prose at the call site.
 *
 * This exists because the previous policy claimed Plausible for months while no
 * analytics was loaded. Deriving the claim from the same switch that loads the
 * tracker is the only version that cannot rot.
 *
 * `analytics.on` is currently a PLACEHOLDER — no provider has been chosen. Fill
 * it in honestly (who processes the data, where, on what legal basis, and
 * whether anything is stored on the device) in the same commit that turns a
 * provider on.
 */
function withAnalyticsWording(content: LegalContent): LegalContent {
  const wording = ANALYTICS_ENABLED ? content.analytics.on : content.analytics.off

  const privacy: LegalDoc = {
    ...content.privacy,
    sections: content.privacy.sections.map((section) => {
      if (section.id === 'mesure') {
        return {
          ...section,
          title: wording.sectionTitle,
          blocks: [{ kind: 'text', body: wording.sectionBody } as LegalBlock],
        }
      }
      if (section.id === 'en-bref') {
        return {
          ...section,
          blocks: section.blocks.map((b) =>
            b.kind === 'points'
              ? {
                  ...b,
                  items: b.items.map((item, i) =>
                    i === 0 ? { title: wording.summaryTitle, body: wording.summaryBody } : item,
                  ),
                }
              : b,
          ),
        }
      }
      return section
    }),
  }

  return { ...content, privacy }
}

export function getLegalContent(locale: Locale): LegalContent {
  return withAnalyticsWording(LEGAL[locale] ?? LEGAL[DEFAULT_LOCALE])
}
