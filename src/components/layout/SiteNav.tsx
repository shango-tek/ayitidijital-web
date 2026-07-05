import { LanbiLogo } from '../brand/LanbiLogo'
import { Button } from '../ui/Button'
import { LangSwitcher } from '../ui/LangSwitcher'
import type { LangOption } from '../ui/LangSwitcher'

export interface NavLink {
  label: string
  href: string
  /** Optional sub-items — renders the link as a hover dropdown. */
  children?: NavLink[]
}

export interface SiteNavProps {
  brandName: string
  brandHref?: string
  brandAriaLabel?: string
  links: NavLink[]
  langs: LangOption[]
  currentLang: string
  cta: { label: string; href: string }
}

/** Sticky dark navigation bar: logo, links, language switcher, membership CTA. */
export function SiteNav({
  brandName,
  brandHref = '#top',
  brandAriaLabel,
  links,
  langs,
  currentLang,
  cta,
}: SiteNavProps) {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a className="brand" href={brandHref} aria-label={brandAriaLabel ?? brandName}>
          <LanbiLogo tone="sand" />
          <span className="brand-name">{brandName}</span>
        </a>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <LangSwitcher options={langs} current={currentLang} />
        <Button variant="sand" size="sm" href={cta.href} className="nav-cta">
          {cta.label}
        </Button>
      </div>
    </header>
  )
}
