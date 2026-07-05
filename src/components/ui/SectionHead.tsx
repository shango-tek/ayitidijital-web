import { Kicker } from './Kicker'

export interface SectionHeadProps {
  kicker: string
  kickerRed?: boolean
  title: string
  sub?: string
  subLang?: string
}

/** Standard section header: kicker + title + optional subtitle. */
export function SectionHead({ kicker, kickerRed = true, title, sub, subLang }: SectionHeadProps) {
  return (
    <div className="section-head">
      <Kicker label={kicker} red={kickerRed} />
      <h2 className="section-title">{title}</h2>
      {sub && (
        <p className="section-sub" lang={subLang}>
          {sub}
        </p>
      )}
    </div>
  )
}
