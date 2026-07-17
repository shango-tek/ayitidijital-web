'use client'

import { RoutePage } from '@/components/pages/RoutePage'
import { useContent } from '@/components/i18n/LocaleProvider'

/**
 * "Sou nou" is a single route that holds the three About items (Vizyon & misyon,
 * Prensip nou yo, Ekip) as anchored sections — so the dropdown links
 * (/sou-nou#vizyon …) scroll to them. Karyè is intentionally omitted (commented
 * out in the nav content) until a Careers page exists.
 */
export default function SouNouPage() {
  const c = useContent()
  const souNou = c.navLinks.find((l) => l.href === '/sou-nou')
  const items = souNou?.children ?? []

  return (
    <RoutePage path="/sou-nou">
      <div className="page-wrap">
        <div className="page-sections">
          {items.map((item) => {
            const id = item.href.split('#')[1]
            return (
              <section key={item.href} id={id} className="page-section">
                <h2>{item.label}</h2>
                <p className="page-lede">{c.heroDescription?.short ?? ''}</p>
              </section>
            )
          })}
        </div>
      </div>
    </RoutePage>
  )
}
