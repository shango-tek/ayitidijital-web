'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PlusGrid, PlusGridItem, PlusGridRow } from '../ui/PlusGrid'
import { LanbiMark } from '../brand/LanbiMark'
import { HoverMenu } from '../ui/HoverMenu'
import { Button } from '../ui/Button'
import { useLocale } from '../i18n/LocaleProvider'
import type { LangOption } from '../ui/LangSwitcher'
import type { NavLink } from './SiteNav'
import { switchLocalePath, type Locale } from '../../i18n'

const Chevron = () => (
  <svg className="hm-chev" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export interface RadiantNavbarProps {
  brandName: string
  links: NavLink[]
  langs: LangOption[]
  banner?: ReactNode
  supportHref?: string
  supportLabel?: string
}

/**
 * Radiant-style navbar (PlusGrid row + logo). Every item — links, the "Über
 * uns" hover dropdown, the language hover dropdown and the search icon — is a
 * PlusGrid cell, so the corner "+" marks stay consistent. Support is a
 * standalone CTA (no cell). Collapses to a disclosure menu on mobile.
 */
export function RadiantNavbar({
  brandName,
  links,
  langs,
  banner,
  supportHref = '/soutni',
  supportLabel = 'Sipòte',
}: RadiantNavbarProps) {
  const pathname = usePathname()
  const { locale: active, setLocale } = useLocale()
  const cur = langs.find((o) => o.code === active) ?? langs[0]

  // Prefix internal paths ("/travay-nou", "/sou-nou#ekip") with the active
  // locale so links resolve to "/ht/travay-nou". Hash-only anchors ("#top") and
  // absolute URLs (http…) are left untouched.
  const toHref = (h: string) =>
    h.startsWith('/') ? `/${active}${h}` : h

  return (
    <header className="rn-header">
      <PlusGrid>
        <PlusGridRow className="rn-row">
          <div className="rn-left">
            <PlusGridItem className="rn-logo-item">
              <Link href={`/${active}`} title="Akèy" className="rn-logo-link" aria-label={`${brandName} — Akèy`}>
                <LanbiMark size={58} className="rn-logo-mark" />
                <span className="rn-brand-name">{brandName}</span>
              </Link>
            </PlusGridItem>
            {banner && <div className="rn-banner-wrap">{banner}</div>}
          </div>

          <nav className="rn-desktop" aria-label="Navigasyon prensipal">
            {links.map((l) =>
              l.children && l.children.length ? (
                <PlusGridItem key={l.href} className="rn-link-item">
                  <HoverMenu align="left" trigger={<>{l.label}<Chevron /></>}>
                    {l.children.map((c) => (
                      <Link key={c.href} href={toHref(c.href)} role="menuitem">
                        <span className="hm-dot" aria-hidden="true" />
                        {c.label}
                      </Link>
                    ))}
                  </HoverMenu>
                </PlusGridItem>
              ) : (
                <PlusGridItem key={l.href} className="rn-link-item">
                  <Link href={toHref(l.href)} className="rn-link">
                    {l.label}
                  </Link>
                </PlusGridItem>
              ),
            )}

            <PlusGridItem className="rn-link-item rn-lang-item">
              <HoverMenu
                align="right"
                className="rn-lang"
                triggerAriaLabel="Chwazi lang"
                trigger={
                  <>
                    <span className="rn-lang-cur">{cur.label}</span>
                    <Chevron />
                  </>
                }
              >
                {langs.map((o) => {
                  const target = pathname ? switchLocalePath(pathname, o.code as Locale) : `/${o.code}`
                  return (
                    <a
                      key={o.code}
                      href={target}
                      lang={o.lang}
                      role="menuitem"
                      aria-current={o.code === active ? 'true' : undefined}
                      onClick={(e) => {
                        e.preventDefault()
                        setLocale(o.code as Locale)
                      }}
                    >
                      {o.label}
                    </a>
                  )
                })}
              </HoverMenu>
            </PlusGridItem>

            <Button variant="red" pill size="sm" href={toHref(supportHref)} className="rn-support">
              {supportLabel}
            </Button>
          </nav>
        </PlusGridRow>
      </PlusGrid>
    </header>
  )
}
