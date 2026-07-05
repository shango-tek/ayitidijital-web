import { Fragment } from 'react'
import type { ReactNode } from 'react'
import { SpiralHeroArt } from '../brand/SpiralHeroArt'
import { Button } from '../ui/Button'
import type { ButtonVariant } from '../ui/Button'
import { Kicker } from '../ui/Kicker'
import { PixelSep } from '../ui/PixelSep'

export interface HeroCta {
  label: ReactNode
  href: string
  variant: ButtonVariant
}

export interface HeroBroadcastProps {
  kicker: string
  /** Pass JSX to control line breaks and <em> accents */
  title: ReactNode
  sub: string
  subLang?: string
  ctas: HeroCta[]
  meta: string[]
}

/** Dark navy hero with pixel-dot field, headline, CTAs, meta row and the broadcasting-spiral illustration. */
export function HeroBroadcast({ kicker, title, sub, subLang, ctas, meta }: HeroBroadcastProps) {
  return (
    <section className="hero on-dark">
      <div className="container hero-inner">
        <div>
          <Kicker label={kicker} />
          <h1>{title}</h1>
          <p className="hero-sub" lang={subLang}>
            {sub}
          </p>
          <div className="hero-ctas">
            {ctas.map((cta, i) => (
              <Button key={i} variant={cta.variant} href={cta.href}>
                {cta.label}
              </Button>
            ))}
          </div>
          <p className="hero-meta">
            {meta.map((item, i) => (
              <Fragment key={i}>
                {i > 0 && <PixelSep />}
                {item}
              </Fragment>
            ))}
          </p>
        </div>
        <div className="hero-art">
          <SpiralHeroArt />
        </div>
      </div>
    </section>
  )
}
