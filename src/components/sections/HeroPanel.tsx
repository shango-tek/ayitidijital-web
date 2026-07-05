import type { ReactNode } from 'react'
import { BrandGradient } from '../brand/BrandGradient'
import { Button } from '../ui/Button'
import type { ButtonVariant } from '../ui/Button'
import { RadiantNavbar } from '../layout/RadiantNavbar'
import type { LangOption } from '../ui/LangSwitcher'
import type { NavLink } from '../layout/SiteNav'

export interface HeroPanelCta {
  label: ReactNode
  href: string
  variant: ButtonVariant
}

export interface HeroPanelProps {
  brandName: string
  links: NavLink[]
  langs: LangOption[]
  /** Radiant-style announcement pill shown inline in the navbar */
  banner?: { label: string; href: string }
  title: ReactNode
  sub: string
  subLang?: string
  ctas: HeroPanelCta[]
  supportLabel?: string
}

/**
 * Radiant-style hero: a rounded gradient panel holding the Radiant navbar, an
 * oversized headline and two CTAs — retinted to the espiral brand.
 */
export function HeroPanel({ brandName, links, langs, banner, title, sub, subLang, ctas, supportLabel }: HeroPanelProps) {
  return (
    <div className="hp">
      <BrandGradient className="hp-bg" />
      <img className="hp-mark" src="/mark-light.svg" alt="" aria-hidden="true" />
      <div className="hp-inner container">
        <RadiantNavbar
          brandName={brandName}
          links={links}
          langs={langs}
          supportLabel={supportLabel}
          banner={
            banner && (
              <a className="rn-banner" href={banner.href}>
                {banner.label}
                <svg className="rn-banner-chev" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )
          }
        />

        <div className="hp-body">
          <h1 className="hp-title">{title}</h1>
          <p className="hp-sub" lang={subLang}>
            {sub}
          </p>
          <div className="hp-ctas">
            {ctas.map((cta, i) => (
              <Button key={i} variant={cta.variant} href={cta.href} pill>
                {cta.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
