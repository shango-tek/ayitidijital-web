import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

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
  /** Title — e.g. "Domaines d'action" (a trailing period renders in drapo red). */
  title: string
  subtitle: string
  /** SDG prefix shown on the tile — "ODD" / "SDG". */
  sdgPrefix: string
  items: Domaine[]
}

/* Official UN SDG palette — kept verbatim; the badge colours are meaningful. */
const SDG_COLORS: Record<string, string> = {
  '1': '#E5243B', '2': '#DDA63A', '3': '#4C9F38', '4': '#C5192D', '5': '#FF3A21',
  '6': '#26BDE2', '7': '#FCC30B', '8': '#A21942', '9': '#FD6925', '10': '#DD1367',
  '11': '#FD9D24', '12': '#BF8B2E', '13': '#3F7E44', '14': '#0A97D9', '15': '#56C02B',
  '16': '#00689D', '17': '#19486A',
}
const sdgColor = (sdg: string) => SDG_COLORS[(sdg || '').split('/')[0].trim()] ?? '#6B7280'

/**
 * "Domaines d'action" — SDG-aligned theme cards in the UnternehmerTUM register:
 * a white section, sharp-cornered white cards with a black border, the UN SDG
 * colour badge, a faint watermark index, Albert Sans title and tag chips. Props
 * are unchanged from the Sui version.
 */
export function DomainesGrid({ id, label, title, subtitle, sdgPrefix, items }: DomainesGridProps) {
  const trimmed = title.trimEnd()
  const hasDot = trimmed.endsWith('.')
  const head = hasDot ? trimmed.slice(0, -1) : trimmed
  // Serif-italic accent on the last word, echoing the hero's "Vision / Action".
  const headWords = head.split(' ')
  const headLast = headWords.pop() ?? head
  const headLead = headWords.join(' ')

  return (
    <section id={id} className="bg-tum-paper py-20 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 font-tum text-xs font-bold uppercase tracking-[0.2em] text-tum-ink">
            <span className="h-2.5 w-2.5 bg-drapo-red" aria-hidden="true" />
            {label}
          </span>
          <h2 className="mt-6 max-w-4xl font-tum text-[clamp(2.4rem,5.2vw,4.4rem)] font-black leading-[0.95] tracking-[-0.02em] text-tum-ink">
            {headLead ? `${headLead} ` : ''}
            <span className="font-serif italic font-semibold text-electric">{headLast}</span>
            {hasDot && <span className="text-drapo-red">.</span>}
          </h2>
          <p className="mt-6 max-w-2xl font-tum text-lg leading-relaxed text-tum-muted">{subtitle}</p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-7">
          {items.map((d, i) => {
            const color = sdgColor(d.sdg)
            // Auto-contrast the badge text: the official SDG palette spans
            // light→dark, so pick whichever of ink/white has the higher contrast
            // on each tile (WCAG relative luminance).
            const h = color.replace('#', '')
            const toLin = (n: number) => {
              const c = n / 255
              return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
            }
            const L =
              0.2126 * toLin(parseInt(h.slice(0, 2), 16)) +
              0.7152 * toLin(parseInt(h.slice(2, 4), 16)) +
              0.0722 * toLin(parseInt(h.slice(4, 6), 16))
            const onColor = (L + 0.05) / 0.05 >= 1.05 / (L + 0.05) ? '#0A0A0B' : '#ffffff'
            return (
              <RevealItem key={d.name} className="h-full">
                <article className="group relative h-full overflow-hidden border-4 border-double border-tum-ink bg-tum-paper transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-electric">
                  <div className="relative flex h-full flex-col p-8 lg:p-9">
                    <div className="mb-6 flex items-start justify-between">
                      {/* SDG badge — compact, labelled, in the official SDG colour */}
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5"
                        style={{ backgroundColor: color, color: onColor }}
                        title={`${sdgPrefix} ${d.sdg}`}
                      >
                        <span className="font-tum text-[11px] font-bold uppercase tracking-[0.12em] opacity-90">
                          {sdgPrefix}
                        </span>
                        <span className="font-tum text-base font-black leading-none">{d.sdg}</span>
                      </span>
                      {/* watermark index */}
                      <span
                        aria-hidden="true"
                        className="select-none font-tum text-[4.5rem] font-black leading-none tabular-nums text-tum-ink/[0.06]"
                      >
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="mb-3 font-tum text-2xl font-extrabold leading-tight tracking-tight text-tum-ink lg:text-[1.7rem]">
                      {d.name}
                    </h3>
                    <p className="font-tum text-sm leading-relaxed text-tum-muted">{d.description}</p>

                    {/* hashtag tags — pinned to the bottom */}
                    <div className="mt-auto flex flex-wrap gap-2 pt-6">
                      {d.tags.map((t) => (
                        <span
                          key={t}
                          className="border border-tum-ink/20 px-2.5 py-1 font-tum text-[11px] lowercase tracking-wide text-tum-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
