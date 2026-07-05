import { Kicker } from '../ui/Kicker'

export interface StatItem {
  num: string
  label: string
  sub?: string
  subLang?: string
}

export interface StatsBandProps {
  kicker: string
  items: StatItem[]
  /** Apply the diagonal cut against the previous (dark) section */
  cut?: boolean
  ariaLabel?: string
}

/** Impact numbers band with left-ruled stat blocks. */
export function StatsBand({ kicker, items, cut = true, ariaLabel }: StatsBandProps) {
  return (
    <section className={cut ? 'stats cut-top' : 'stats'} aria-label={ariaLabel ?? kicker}>
      <div className="container">
        <Kicker label={kicker} red />
        <div className="stats-grid">
          {items.map((item) => (
            <div className="stat" key={item.label}>
              <span className="stat-num">{item.num}</span>
              <p className="stat-label">{item.label}</p>
              {item.sub && (
                <p className="stat-sub" lang={item.subLang}>
                  {item.sub}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
