import type { ReactNode } from 'react'
import { LanbiLogo } from '../brand/LanbiLogo'

export interface FooterLink {
  label: ReactNode
  href: string
  external?: boolean
}

export interface FooterColumn {
  title: string
  ariaLabel: string
  links: FooterLink[]
}

export interface SiteFooterProps {
  id?: string
  brandName: string
  tag: string
  note: string
  columns: FooterColumn[]
  bottomLeft: string
  bottomRight: string
}

/** Dark footer: brand block, link columns, legal bottom line. */
export function SiteFooter({ id, brandName, tag, note, columns, bottomLeft, bottomRight }: SiteFooterProps) {
  return (
    <footer className="footer" id={id}>
      <div className="container">
        <div className="foot-grid">
          <div>
            <a className="foot-brand" href="#top">
              <LanbiLogo tone="sand" size={46} />
              <b>{brandName}</b>
            </a>
            <p className="foot-tag">{tag}</p>
            <p className="foot-note">{note}</p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.ariaLabel}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} rel={link.external ? 'noopener' : undefined}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="foot-bottom">
          <span>{bottomLeft}</span>
          <span>{bottomRight}</span>
        </div>
      </div>
    </footer>
  )
}
