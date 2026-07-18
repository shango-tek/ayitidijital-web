'use client'

import type { ReactNode } from 'react'
import { useContent } from '@/components/i18n/LocaleProvider'
import { PageHeader } from '@/components/layout/PageHeader'
import type { NavLink } from '@/components/layout/SiteNav'

/**
 * Locale-aware scaffold for the nav sub-routes. Renders the reusable
 * {@link PageHeader} band (heading pulled from the matching navbar entry, so it
 * stays correct across ht / fr / en) followed by the page's own sections in a
 * padded wrap. Pass `subtitle` / `image` to customise the header per page.
 */
export function RoutePage({
  path,
  title: titleProp,
  subtitle,
  image,
  children,
}: {
  /** The locale-less route path, e.g. "/travay-nou" — matched against navLinks. */
  path: string
  /** Header heading. Falls back to the matching navbar entry's label, then the
   *  path. Pass this for routes that are not in the nav (e.g. /soutni). */
  title?: string
  /** Optional supporting sentence in the header; defaults to the hero blurb. */
  subtitle?: string
  /** Optional frosted background photo for this page's header. */
  image?: string
  children?: ReactNode
}) {
  const c = useContent()
  // Search the dropdown children too, not just top-level entries. /prensip and
  // /ekip live under "Sou nou", so a top-level-only lookup fell through to the
  // fallback and printed the raw path — "/prensip" — as the page heading.
  const entry: NavLink | undefined =
    c.navLinks.find((l) => l.href === path) ??
    c.navLinks.flatMap((l) => l.children ?? []).find((child) => child.href === path)
  const title = titleProp ?? entry?.label ?? path

  // Split the heading so the first word gets the italic outlined treatment.
  const [strokeWord, ...rest] = title.split(' ')
  const titleRest = rest.join(' ')

  return (
    <>
      <PageHeader
        label={c.brandName}
        strokeWord={strokeWord}
        titleRest={titleRest}
        subtitle={subtitle ?? c.heroDescription?.short ?? ''}
        image={image}
      />
      {children}
    </>
  )
}
