import type { ReactNode } from 'react'
import { BrandGradient } from '../brand/BrandGradient'
import { LanbiMark } from '../brand/LanbiMark'
import { SocialIcon } from '../brand/SocialIcon'
import { PlusGrid, PlusGridItem, PlusGridRow } from '../ui/PlusGrid'

export interface SitemapColumn {
  heading: string
  links: { label: ReactNode; href: string; external?: boolean }[]
}

export interface SocialLink {
  label: string
  href: string
  icon: 'facebook' | 'x' | 'twitter' | 'instagram' | 'whatsapp' | 'linkedin' | 'github'
}

export interface SitemapFooterProps {
  id?: string
  brandName: string
  columns: SitemapColumn[]
  copyright: string
  socials: SocialLink[]
  /** 'radiant' applies the exact Radiant skin (Switzer, warm gradient, black text) */
  variant?: 'radiant'
  /** Override the logo lockup (e.g. Radiant's own logo for the 1:1 clone) */
  logo?: ReactNode
  /** Short blurb shown under the stacked brand mark + name */
  blurb?: string
  /** Optional element (e.g. a marquee) rendered at the top of the footer card */
  marquee?: ReactNode
}


/**
 * Radiant-style footer: gradient frame around a near-white panel, a centered
 * call-to-action, a plus-grid sitemap and a copyright/social bottom row.
 */
export function SitemapFooter({ id, brandName, columns, copyright, socials, variant, logo, blurb, marquee }: SitemapFooterProps) {
  return (
    <footer id={id}>
      <div className={variant === 'radiant' ? 'rf rf-radiant' : 'rf'}>
        <BrandGradient className="rf-bg" />
        <div className="rf-panel" aria-hidden="true" />
        {marquee && <div className="rf-marquee">{marquee}</div>}
        <div className="rf-inner container">
          <PlusGrid className="rf-grid">
            <PlusGridRow>
              <div className="rf-topgrid">
                <div className="rf-logo-cell">
                  <PlusGridItem className="rf-logo-item">
                    <a className="rf-logo" href="#top" aria-label={brandName}>
                      {logo ?? (
                        <>
                          <LanbiMark size={76} className="rf-logo-mark" />
                          <b>{brandName}</b>
                        </>
                      )}
                    </a>
                  </PlusGridItem>
                  {blurb && <p className="rf-logo-blurb">{blurb}</p>}
                </div>
                <div className="rf-cols">
                  {columns.map((col, ci) => (
                    <div key={ci}>
                      <h3 className="rf-col-head">{col.heading}</h3>
                      <ul className="rf-col-links">
                        {col.links.map((link, i) => (
                          <li key={i}>
                            <a href={link.href} rel={link.external ? 'noopener' : undefined}>
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </PlusGridRow>
            <PlusGridRow className="rf-bottom">
              <div>
                <PlusGridItem className="rf-copy-item">
                  <div className="rf-copy">{copyright}</div>
                </PlusGridItem>
              </div>
              <div className="rf-social-wrap">
                <PlusGridItem className="rf-social-item">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label} className="rf-social">
                      <SocialIcon icon={s.icon} className="rf-social-ico" />
                    </a>
                  ))}
                </PlusGridItem>
              </div>
            </PlusGridRow>
          </PlusGrid>
        </div>
      </div>
    </footer>
  )
}
