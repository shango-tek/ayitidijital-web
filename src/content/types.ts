/* ------------------------------------------------------------------ *
 * The content model.
 *
 * These shapes describe the *data* the site is built from — nav links,
 * language options, footer columns, stats, projects and so on. They were
 * extracted out of the view components that originally declared them so
 * that the content layer (`site.tsx`) no longer has to import from
 * `components/` just to describe its own data. Components consume these
 * types; the content does not depend on any component that renders it.
 *
 * The one exception is `ButtonVariant`, which is a genuine presentational
 * token owned by the Button primitive, so it is imported rather than
 * duplicated here.
 * ------------------------------------------------------------------ */

import type { ReactNode } from 'react'
import type { ButtonVariant } from '@/components/ui/Button'

export interface NavLink {
  label: string
  href: string
  /** Optional sub-items — renders the link as a hover dropdown. */
  children?: NavLink[]
}

export interface LangOption {
  code: string
  label: string
  /** BCP-47 tag for the lang attribute, e.g. 'ht', 'fr', 'en' */
  lang: string
  href?: string
  /** Full language name shown in the dropdown, e.g. 'Kreyòl' */
  name?: string
}

export interface SitemapColumn {
  heading: string
  links: { label: ReactNode; href: string; external?: boolean }[]
}

export interface SocialLink {
  label: string
  href: string
  icon: 'facebook' | 'x' | 'twitter' | 'instagram' | 'whatsapp' | 'linkedin' | 'github'
}

export interface HeroCta {
  label: ReactNode
  href: string
  variant: ButtonVariant
}

export interface StatItem {
  num: string
  label: string
  sub?: string
  subLang?: string
}

export interface Project {
  icon: ReactNode
  chip: string
  title: string
  kr: string
  tr?: string
  trLang?: string
  link: { label: string; href: string }
}

export interface HubDefinition {
  word: string
  pron: string
  body: string
  tr: string
  trLang?: string
}

export interface HubProgram {
  title: string
  kr: string
  en: string
}

export interface DiasporaCtaAction {
  label: ReactNode
  href: string
  variant: ButtonVariant
  external?: boolean
}
