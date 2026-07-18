import { SectionHeader } from '../ui/SectionHeader'
import { SectionPanel } from '../ui/SectionPanel'

export interface Domaine {
  name: string
  description: string
  /** SDG number, e.g. "4" (or "16/17" for a pair). */
  sdg: string
  /** Hashtag tags shown at the bottom, e.g. ["#legaltech", "#jistis"]. */
  tags: string[]
}

export interface DomainesGridProps {
  id?: string
  /** Eyebrow — e.g. "Nos thématiques". */
  label: string
  /** Title — e.g. "Domaines d'action" (a gold period is appended). */
  title: string
  subtitle: string
  /** SDG prefix shown on the tile — "ODD" / "SDG". */
  sdgPrefix: string
  items: Domaine[]
}

/* Official UN SDG palette. */
const SDG_COLORS: Record<string, string> = {
  '1': '#E5243B', '2': '#DDA63A', '3': '#4C9F38', '4': '#C5192D', '5': '#FF3A21',
  '6': '#26BDE2', '7': '#FCC30B', '8': '#A21942', '9': '#FD6925', '10': '#DD1367',
  '11': '#FD9D24', '12': '#BF8B2E', '13': '#3F7E44', '14': '#0A97D9', '15': '#56C02B',
  '16': '#00689D', '17': '#19486A',
}
const sdgColor = (sdg: string) => SDG_COLORS[(sdg || '').split('/')[0].trim()] ?? '#6B7280'

/**
 * "Domaines d'action" — SDG-aligned theme cards (React port of the Angular
 * `thematiques` card): a light card with an SDG-colored, labelled tile, a tag
 * chip, a faint watermark index, title and description. Split header, subtitle right.
 */
export function DomainesGrid({ id, label, title, subtitle, sdgPrefix, items }: DomainesGridProps) {
  return (
    <SectionPanel id={id} gate="with-spiral">
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <SectionHeader variant="split" size="md" label={label} title={title} subtitle={subtitle} />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-7">
          {items.map((d, i) => {
            const color = sdgColor(d.sdg)
            return (
              <article
                key={d.name}
                className="group relative overflow-hidden rounded-card border border-black/[0.06] bg-white shadow-[0_20px_60px_-40px_rgba(10,58,96,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
              >
                {/* SDG-tinted radial glow, top-right */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-card"
                  style={{ background: `radial-gradient(ellipse at 90% 0%, ${color}20, transparent 60%)` }}
                />
                <div className="relative flex h-full flex-col p-8 lg:p-9">
                  <div className="mb-6 flex items-start justify-between">
                    {/* SDG badge — compact, labelled so it reads as an SDG */}
                    <span
                      className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-white shadow-sm"
                      style={{ backgroundColor: color }}
                      title={`${sdgPrefix} ${d.sdg}`}
                    >
                      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] opacity-90">
                        {sdgPrefix}
                      </span>
                      <span className="font-display text-base font-extrabold leading-none">{d.sdg}</span>
                    </span>
                    {/* watermark index */}
                    <span
                      aria-hidden="true"
                      className="select-none font-display text-[5rem] font-extrabold leading-none text-primary/[0.05]"
                    >
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mb-3 font-display text-2xl font-extrabold leading-snug tracking-tight text-primary lg:text-[1.7rem]">
                    {d.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-soft">{d.description}</p>

                  {/* hashtag tags — pinned to the bottom */}
                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {d.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-black/10 px-2.5 py-1 font-mono text-[11px] lowercase tracking-wide text-ink-soft"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </SectionPanel>
  )
}
