import { DEFAULT_LOCALE, type Locale } from '../../i18n'
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
  lead: string
  lastUpdatedLabel: string
  lastUpdatedValue: string
  tocTitle: string
  sections: LegalSectionContent[]
}

export interface LegalContent {
  imprint: LegalDoc
  privacy: LegalDoc
}

const LEGAL: Record<Locale, LegalContent> = {
  ht: ht as LegalContent,
  fr: fr as LegalContent,
  en: en as LegalContent,
}

export function getLegalContent(locale: Locale): LegalContent {
  return LEGAL[locale] ?? LEGAL[DEFAULT_LOCALE]
}
