import { SectionHeader } from '../ui/SectionHeader'
import { SectionCTA } from '../ui/SectionCTA'

export interface WorkCard {
  label: string
  title: string
  body: string
  cta: string
  href: string
}

export interface WorkOverviewProps {
  id?: string
  label: string
  strokeWord: string
  titleRest: string
  subtitle: string
  cards: WorkCard[]
  outro: string
  viewAll: string
  viewAllHref: string
}

/**
 * "What we do" overview — split section header (outline word + rest, dots eyebrow,
 * lead on the right), three Bati / Enkibe / Konekte pillar cards (dark gridded
 * panel with a watermark number + Kreyòl label, then title / body / gold CTA),
 * and the section end-row CTA.
 */
export function WorkOverview({
  id,
  label,
  strokeWord,
  titleRest,
  subtitle,
  cards,
  outro,
  viewAll,
  viewAllHref,
}: WorkOverviewProps) {
  return (
    <section id={id} className="bg-white py-16 md:py-20 lg:py-[100px]">
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <SectionHeader
          variant="split"
          size="md"
          label={label}
          strokeWord={strokeWord}
          title={titleRest}
          subtitle={subtitle}
        />

        {/* Three pillar cards. Three-up everywhere except a tablet held upright,
            where thirds of a ~700px column are too narrow for the card's stacked
            label / title / body: two on the first row, the third spanning the
            full width beneath them. */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-16 lg:gap-8 tablet-portrait:grid-cols-2">
          {cards.map((card, i) => (
            <a
              key={card.label}
              href={card.href}
              className={`group relative flex min-h-[23rem] flex-col overflow-hidden rounded-card bg-gradient-to-br from-[#152c78] to-[var(--color-primary-deep)] p-8 shadow-[0_30px_70px_-45px_rgba(10,20,60,0.65)] ring-1 ring-white/[0.08] transition-transform duration-300 hover:-translate-y-1.5 md:min-h-[25rem] md:p-9${
                // The spanning card is twice as wide, so the 25rem floor built
                // for a narrow column leaves it half empty — its label sits at
                // the top and `mt-auto` pins the rest to the bottom, so the
                // slack all lands in the middle as one big hole.
                i === 2 ? ' tablet-portrait:col-span-2 tablet-portrait:min-h-[18rem]' : ''
              }`}
            >
              {/* soft top-light for depth (replaces the grid) */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    'radial-gradient(115% 80% at 12% -5%, rgba(255,255,255,0.12), rgba(255,255,255,0) 55%)',
                }}
              />
              {/* gold glow — grows in on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 left-6 h-48 w-48 rounded-full bg-gold/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
              {/* watermark number */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-0 select-none font-display text-[8rem] font-extrabold leading-none text-white/[0.05]"
              >
                0{i + 1}
              </span>

              {/* content */}
              <span className="relative flex flex-1 flex-col">
                <span className="font-mono text-sm uppercase tracking-[0.26em] text-gold">
                  {card.label}
                </span>
                <h3 className="mt-auto pt-14 font-display text-2xl font-extrabold leading-tight tracking-tight text-white">
                  {card.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/75">{card.body}</p>
                <span className="mt-7 inline-flex items-center gap-2 font-display text-sm font-bold text-gold">
                  {card.cta}
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </a>
          ))}
        </div>

        {/* section end row */}
        <div className="mt-14 lg:mt-20">
          <SectionCTA caption={outro} linkLabel={viewAll} link={viewAllHref} tone="light" />
        </div>
      </div>
    </section>
  )
}
