import type { Locale } from '../../i18n'
import ht from './ht.json'
import fr from './fr.json'
import en from './en.json'

/* ------------------------------------------------------------------ *
 * Legal content — Impressum (§ 5 TMG) and privacy policy (GDPR).
 *
 * The JSON files in this directory are a VERBATIM port of the dictionaries
 * that served these pages on the previous (Astro) site. The wording is a
 * legal statement by Ayiti Dijital e.V. — do not paraphrase, summarise, or
 * "improve" it. Edit the JSON only with the association's approval, and keep
 * `last_updated_value` in step with any change.
 *
 * Key names stay snake_case to mirror the source dictionaries 1:1, so the
 * port stays auditable against the old repo.
 * ------------------------------------------------------------------ */

export interface LegalLabelValue {
  label: string
  value: string
}

export interface ImprintContent {
  title: string
  description: string
  eyebrow: string
  h1: string
  intro: string
  last_updated_label: string
  last_updated_value: string
  toc_title: string
  publisher_title: string
  publisher_dl: {
    name_label: string
    name_value: string
    status_label: string
    status_value: string
    address_label: string
    address_value: string
    registry_label: string
    registry_value: string
  }
  representative_title: string
  representative_dl: {
    name_label: string
    name_value: string
    role_label: string
    role_value: string
  }
  representative_note: string
  contact_title: string
  contact_dl: {
    email_label: string
    email_value: string
    post_label: string
    post_value: string
  }
  responsible_title: string
  responsible_subtitle: string
  responsible_body: string
  liability_title: string
  liability_body: string
  copyright_title: string
  copyright_body: string
  dispute_title: string
  dispute_body: string
}

export interface PrivacyContent {
  title: string
  description: string
  eyebrow: string
  h1: string
  intro: string
  last_updated_label: string
  last_updated_value: string
  toc_title: string
  summary_title: string
  summary_subtitle: string
  summary_points: { title: string; body: string }[]
  controller_title: string
  controller_body: string
  controller_dpo_label: string
  controller_dpo_value: string
  data_title: string
  data_body: string
  cookies_title: string
  cookies_intro: string
  cookies_table_headers: { name: string; purpose: string; duration: string; type: string }
  cookies_rows: { name: string; purpose: string; duration: string; type: string }[]
  cookies_note: string
  rights_title: string
  rights_intro: string
  rights_cards: { icon: string; title: string; body: string }[]
  rights_complaint: string
  hosting_title: string
  hosting_body: string
  contact_title: string
  contact_body: string
  contact_email: string
}

export interface LegalContent {
  imprint: ImprintContent
  privacy: PrivacyContent
}

const LEGAL: Record<Locale, LegalContent> = {
  ht: ht as LegalContent,
  fr: fr as LegalContent,
  en: en as LegalContent,
}

export function getLegalContent(locale: Locale): LegalContent {
  return LEGAL[locale] ?? LEGAL.ht
}
