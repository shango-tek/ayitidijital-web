import type { ReactNode } from 'react'
import { Button } from '../ui/Button'
import type { ButtonVariant } from '../ui/Button'
import { CityRow } from '../ui/CityRow'
import { Kicker } from '../ui/Kicker'

export interface DiasporaCtaAction {
  label: ReactNode
  href: string
  variant: ButtonVariant
  external?: boolean
}

export interface DiasporaCtaProps {
  id?: string
  kicker: string
  title: string
  lead: string
  leadEn?: string
  cities: string[]
  ctas: DiasporaCtaAction[]
}

/** Dark diaspora call-to-action band with spiral watermark and city row. */
export function DiasporaCta({ id, kicker, title, lead, leadEn, cities, ctas }: DiasporaCtaProps) {
  return (
    <section className="diaspora cut-top on-dark" id={id}>
      <img src="/mark-dark.svg" className="diaspora-decor" alt="" aria-hidden="true" />
      <div className="container">
        <div className="diaspora-inner">
          <Kicker label={kicker} />
          <h2>{title}</h2>
          <p className="lead">{lead}</p>
          {leadEn && (
            <p className="lead-en" lang="en">
              {leadEn}
            </p>
          )}
          <CityRow cities={cities} />
          <div className="diaspora-ctas">
            {ctas.map((cta, i) => (
              <Button key={i} variant={cta.variant} href={cta.href} external={cta.external}>
                {cta.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
